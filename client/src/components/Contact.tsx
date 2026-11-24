import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Hidden honeypot field
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.links.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side quick check
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus('error');
      setFeedbackMessage('Please enter your name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus('error');
      setFeedbackMessage('Please enter at least 10 characters detailing your inquiry.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Your inquiry was delivered successfully! Eyad will follow up shortly.');
        setFormData({ name: '', email: '', message: '', honeypot: '' });

        // Trigger celebratory confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#DBD8E3', '#5C5470', '#352F44']
        });
      } else {
        setStatus('error');
        setFeedbackMessage(data.message || 'Unable to submit your inquiry. Please verify your details and try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setFeedbackMessage('Network or server connection issue. Please ensure the backend server is active or reach out via direct email.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#2A2438]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352F44] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            DIRECT COMMUNICATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#DBD8E3] tracking-tight">
            Let's Build Something Great Together
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#DBD8E3]/75 font-light">
            Looking for a dedicated MEAN Stack Developer for your team or upcoming web project? Reach out directly and let's discuss how I can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact & Location Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#5C5470]/40 space-y-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Contact Coordinates
              </h3>

              {/* Location Pill */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#2A2438] border border-[#5C5470]/30">
                <div className="p-2.5 rounded-lg bg-[#352F44] border border-[#5C5470] text-[#DBD8E3] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#5C5470]">Location</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {PERSONAL_INFO.location}
                  </p>
                  <p className="text-xs text-[#DBD8E3]/70 font-mono mt-1">
                    Available for Remote & On-Site Roles
                  </p>
                </div>
              </div>

              {/* Direct Email with Copy Button */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#2A2438] border border-[#5C5470]/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#352F44] border border-[#5C5470] text-[#DBD8E3] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-mono uppercase text-[#5C5470]">Direct Email</h4>
                    <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-[220px]">
                      {PERSONAL_INFO.links.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[#352F44] hover:bg-[#5C5470] text-[#DBD8E3] transition-colors border border-[#5C5470]/50"
                  title="Copy email address"
                >
                  {emailCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Channels Strip */}
              <div className="pt-4 border-t border-[#5C5470]/30">
                <h4 className="text-xs font-mono uppercase text-[#5C5470] mb-3">
                  Professional Profiles (Placeholders)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#2A2438] border border-[#5C5470]/40 hover:border-[#DBD8E3] transition-colors flex items-center gap-2.5 text-xs text-[#DBD8E3] font-mono group"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#DBD8E3] group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#2A2438] border border-[#5C5470]/40 hover:border-[#DBD8E3] transition-colors flex items-center gap-2.5 text-xs text-[#DBD8E3] font-mono group"
                  >
                    <GithubIcon className="w-4 h-4 text-[#DBD8E3] group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Notice */}
            <div className="p-4 rounded-xl bg-[#352F44]/50 border border-[#5C5470]/30 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <p className="text-xs font-mono text-[#DBD8E3]/80">
                Open to full-time engineering appointments, contract architecture, and freelance MVP sprints.
              </p>
            </div>

          </div>

          {/* Right Column: Fully Functional Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-10 border border-[#5C5470]/40 shadow-2xl relative">
              
              <h3 className="text-xl font-bold text-white mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs font-mono text-[#5C5470] mb-6">
                Direct REST API Dispatch • Sanitized & Protected
              </p>

              {/* Status Alert Banner */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-start gap-3 text-xs text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Message Dispatched Successfully</strong>
                    <span className="mt-0.5 leading-relaxed block">{feedbackMessage}</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-start gap-3 text-xs text-rose-200">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Validation Error</strong>
                    <span className="mt-0.5 leading-relaxed block">{feedbackMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field - invisible to real humans, traps bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website-field">Leave empty:</label>
                  <input
                    type="text"
                    id="website-field"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-[#DBD8E3] uppercase tracking-wider mb-2">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#2A2438] border border-[#5C5470]/60 text-white placeholder-[#5C5470] text-sm focus:outline-none focus:border-[#DBD8E3] focus:ring-1 focus:ring-[#DBD8E3] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-[#DBD8E3] uppercase tracking-wider mb-2">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#2A2438] border border-[#5C5470]/60 text-white placeholder-[#5C5470] text-sm focus:outline-none focus:border-[#DBD8E3] focus:ring-1 focus:ring-[#DBD8E3] transition-all"
                    />
                  </div>
                </div>

                {/* Project / Inquiry Details */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#DBD8E3] uppercase tracking-wider mb-2">
                    Project / Inquiry Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Describe your architectural needs, project timeline, or role requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#2A2438] border border-[#5C5470]/60 text-white placeholder-[#5C5470] text-sm focus:outline-none focus:border-[#DBD8E3] focus:ring-1 focus:ring-[#DBD8E3] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] font-mono text-[#5C5470]">
                  Rate limited per IP • Sanitized & protected against automated spam
                </p>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
