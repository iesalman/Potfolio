# Eyad Seleman — Full-Stack MEAN Stack Developer Portfolio

A production-grade, animated, dark-themed portfolio website designed and architected for **Eyad Seleman**, showcasing end-to-end expertise across **MongoDB, Express.js, Angular, and Node.js**.

---

## 🎨 Visual Identity & Color System
The application strictly adheres to the requested custom dark palette:
- `#DBD8E3` — Light lavender (primary text & light accents)
- `#5C5470` — Muted purple (secondary accents & borders)
- `#352F44` — Deep purple (cards, glassmorphic surfaces & containers)
- `#2A2438` — Main deep dark background

---

## 🏗️ Project Architecture

```
Portfolio/
├── client/                      # React 18 + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Preloader.tsx        # Branded loading sequence with ES monogram & progress
│   │   │   ├── BackgroundCanvas.tsx # Interactive constellation & glowing gradient blobs
│   │   │   ├── CustomCursor.tsx     # Smooth desktop cursor with magnetic hover glow
│   │   │   ├── Navbar.tsx           # Floating glassmorphic navbar with active scroll spy
│   │   │   ├── Hero.tsx             # Interactive MEAN terminal, code execution & CTAs
│   │   │   ├── About.tsx            # Engineering philosophy, security focus & highlight cards
│   │   │   ├── Education.tsx        # CIS Degree 2026 & NTI Accelerator timeline
│   │   │   ├── Experience.tsx       # NTI & Freelance career achievements & tech tags
│   │   │   ├── Skills.tsx           # Categorized interactive matrix (Frontend, Backend, DB, Security)
│   │   │   ├── Projects.tsx         # CineScope, NexusMart, TaskFlow with interactive live simulators
│   │   │   ├── ProjectModal.tsx     # Deep-dive architecture inspector for each project
│   │   │   ├── Testimonials.tsx     # 2-column responsive cards for mentors & clients
│   │   │   ├── Services.tsx         # 4 specialized full-stack service cards
│   │   │   ├── Contact.tsx          # Contact coordinates + API-connected form
│   │   │   ├── Footer.tsx           # Branding, back-to-top button & copyright
│   │   │   └── Icons.tsx            # Inline SVG icons (GitHub, LinkedIn)
│   │   ├── data/
│   │   │   └── portfolioData.ts     # Central structured data store
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css                # Custom scrollbars, glassmorphism & Tailwind styles
│   ├── index.html                   # SEO metadata, OpenGraph tags, Google Fonts
│   └── vite.config.ts               # Proxy configuration to backend API
├── server/                      # Node.js + Express.js Backend API
│   ├── src/
│   │   └── index.js                 # Express server, CORS, rate limiting, sanitization, honeypot
│   ├── data/
│   │   └── messages.json            # Local message storage fallback when SMTP is unconfigured
│   └── .env.example                 # Environment variables template (SMTP & Server)
└── package.json                 # Unified monorepo management scripts
```

---

## 🚀 Running the Project

### 1. Run Both Frontend and Backend Concurrently
```bash
npm run dev
```
- **Frontend (Client):** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`

### 2. Run Independently
```bash
# Start backend server with auto-reload:
npm run server:dev

# Start client development server:
npm run client:dev
```

### 3. Production Build
```bash
npm run build
```

---

## 🛡️ Security & Backend Features
- **Honeypot Anti-Spam:** Silent rejection of automated bot submissions.
- **Rate Limiting:** Protects `/api/contact` (max 5 requests per 15 minutes per IP).
- **Input Sanitization & Validation:** Prevents XSS and malicious payloads.
- **Fail-Safe Email Dispatch:** Uses Nodemailer if SMTP is configured, otherwise persists inquiries safely to `server/data/messages.json`.
