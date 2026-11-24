# Eyad Seleman — Full-Stack MEAN Stack Developer Portfolio

A pure **HTML5, CSS3, and Vanilla JavaScript (ES6+)** portfolio website for **Eyad Seleman**, ready to host directly on **GitHub Pages** with zero build steps or backend dependencies.

---

## 🎨 Color Palette
- `#DBD8E3` — Light lavender (primary text & accents)
- `#5C5470` — Muted purple (secondary accents & borders)
- `#352F44` — Deep purple (cards & glassmorphic surfaces)
- `#2A2438` — Main dark background

---

## 📁 Project Structure
```text
Portfolio/
├── index.html      # Complete semantic HTML5 portfolio
├── css/
│   └── styles.css  # Custom CSS3 design system, responsive layouts & animations
├── js/
│   └── main.js     # Interactive terminal, simulators, <dialog> modal, form validation & canvas
├── robots.txt      # Search engine crawler configuration
└── README.md       # Project documentation
```

---

## 🚀 Deploy on GitHub Pages
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy static HTML/CSS/JS portfolio"
   git push origin main
   ```
2. Open your repository on GitHub → **Settings** → **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then click **Save**.
4. Your portfolio will be live immediately at `https://<your-username>.github.io/<repo-name>/`.

---

## 📬 Contact Form Configuration
The contact form validates inputs cleanly and opens the visitor's email client pre-filled (`mailto:`) by default. To send submissions silently without opening an email client, add your free [Formspree](https://formspree.io/) or [Web3Forms](https://web3forms.com/) endpoint in `js/main.js` (`FORM_ENDPOINT`).
