import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');
const messagesFile = path.join(dataDir, 'messages.json');

// Ensure data directory and messages file exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
}

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting behind reverse proxies
app.set('trust proxy', 1);

// Middleware
app.use(express.json({ limit: '50kb' }));
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    process.env.CLIENT_URL || ''
  ].filter(Boolean),
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Rate limiting for contact form: max 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact inquiries from this IP. Please wait 15 minutes before trying again.'
  }
});

// Basic HTML sanitization function
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'Eyad Seleman Portfolio API'
  });
});

// Contact endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message, honeypot } = req.body;

    // Honeypot spam defense: if bot fills this hidden field, silently reject
    if (honeypot && String(honeypot).trim() !== '') {
      console.warn('Spam submission detected via honeypot.');
      // Return fake success to confuse bots without doing work
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been received.'
      });
    }

    // Input Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        field: 'name',
        message: 'Please provide a valid name (at least 2 characters).'
      });
    }

    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        field: 'email',
        message: 'Please provide a valid email address.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        field: 'email',
        message: 'The email address format is invalid.'
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        field: 'message',
        message: 'Please provide inquiry details of at least 10 characters.'
      });
    }

    if (message.length > 3000) {
      return res.status(400).json({
        success: false,
        field: 'message',
        message: 'Message exceeds maximum length of 3000 characters.'
      });
    }

    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedMessage = sanitize(message);

    const submission = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      receivedAt: new Date().toISOString(),
      ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    };

    // Store in local JSON database
    try {
      const currentData = JSON.parse(fs.readFileSync(messagesFile, 'utf-8') || '[]');
      currentData.unshift(submission);
      // Keep last 100 messages to prevent unbounded file growth
      if (currentData.length > 100) currentData.length = 100;
      fs.writeFileSync(messagesFile, JSON.stringify(currentData, null, 2));
    } catch (fsErr) {
      console.error('Failed to write message to local storage:', fsErr);
    }

    // Check if SMTP is configured
    const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

    if (isSmtpConfigured) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const recipient = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;

      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: sanitizedEmail,
        subject: `New Portfolio Inquiry from ${sanitizedName}`,
        text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}\n\nSent: ${submission.receivedAt}`,
        html: `
          <div style="font-family: sans-serif; background: #2A2438; color: #DBD8E3; padding: 24px; border-radius: 8px;">
            <h2 style="color: #DBD8E3; border-bottom: 1px solid #5C5470; padding-bottom: 8px;">New Portfolio Inquiry</h2>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: #DBD8E3;">${sanitizedEmail}</a></p>
            <p><strong>Date:</strong> ${new Date(submission.receivedAt).toLocaleString()}</p>
            <div style="background: #352F44; border-left: 4px solid #5C5470; padding: 16px; margin-top: 16px; border-radius: 4px;">
              <p style="white-space: pre-wrap; margin: 0; color: #DBD8E3;">${sanitizedMessage}</p>
            </div>
          </div>
        `
      });

      return res.status(200).json({
        success: true,
        delivery: 'email_dispatched',
        message: 'Thank you! Your message has been sent directly to Eyad Seleman.'
      });
    } else {
      // SMTP not configured - gracefully stored in server logs
      console.log(`[Contact Submission] Received from ${sanitizedName} (${sanitizedEmail}): ${sanitizedMessage.substring(0, 50)}...`);
      return res.status(200).json({
        success: true,
        delivery: 'recorded',
        message: 'Thank you, Eyad has received your message and will get back to you shortly!'
      });
    }

  } catch (error) {
    console.error('Contact endpoint error:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while sending your message. Please try again later.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Eyad Seleman Portfolio Backend listening on port ${PORT}`);
});
