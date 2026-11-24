/* ==========================================================================
   Eyad Seleman Portfolio — Pure Vanilla JavaScript (ES6+)
   ========================================================================== */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CONTACT_EMAIL = 'eyad.seleman.dev@placeholder.com';
  // Optional: Add a Formspree or Web3Forms endpoint here for direct static form submission
  const FORM_ENDPOINT = '';

  /* ----------------------------------------------------------------------
     1. Preloader
     ---------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloader-fill');
  const preloaderPercent = document.getElementById('preloader-percent');

  if (preloader) {
    if (prefersReducedMotion) {
      preloader.classList.add('is-hidden');
    } else {
      let progress = 0;
      const timer = setInterval(() => {
        progress = Math.min(progress + Math.floor(Math.random() * 18) + 8, 100);
        if (preloaderFill) preloaderFill.style.width = `${progress}%`;
        if (preloaderPercent) preloaderPercent.textContent = `${progress}%`;
        if (progress >= 100) {
          clearInterval(timer);
          setTimeout(() => preloader.classList.add('is-hidden'), 180);
        }
      }, 55);
    }
  }

  /* ----------------------------------------------------------------------
     2. Background Particle Constellation Canvas
     ---------------------------------------------------------------------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);
      const count = Math.min(Math.floor((width * height) / 24000), 50);
      const particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        a: Math.random() * 0.35 + 0.12
      }));

      let mouseX = -9999;
      let mouseY = -9999;

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      if (!prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        }, { passive: true });
      }

      const draw = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!prefersReducedMotion) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const d = Math.hypot(dx, dy);
            if (d < 110 && d > 0) {
              p.x -= (dx / d) * 0.35;
              p.y -= (dy / d) * 0.35;
            }
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(219, 216, 227, ${p.a})`;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(92, 84, 112, ${(1 - dist / 110) * 0.16})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }

        if (!prefersReducedMotion) {
          requestAnimationFrame(draw);
        }
      };

      draw();
    }
  }

  /* ----------------------------------------------------------------------
     3. Custom Desktop Cursor
     ---------------------------------------------------------------------- */
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch && !prefersReducedMotion) {
    const glow = document.querySelector('.cursor-glow');
    const ring = document.querySelector('.cursor-ring');
    const dot = document.querySelector('.cursor-dot');
    let cx = -100, cy = -100, tx = -100, ty = -100;

    window.addEventListener('mousemove', (e) => {
      cx = e.clientX;
      cy = e.clientY;
      document.body.classList.add('cursor-active');
      const interactive = e.target.closest('a, button, input, textarea, [role="button"]');
      document.body.classList.toggle('cursor-hover', Boolean(interactive));
    }, { passive: true });

    document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));

    const updateCursor = () => {
      tx += (cx - tx) * 0.18;
      ty += (cy - ty) * 0.18;
      if (dot) dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      if (glow) glow.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      requestAnimationFrame(updateCursor);
    };
    requestAnimationFrame(updateCursor);
  }

  /* ----------------------------------------------------------------------
     4. Navbar Scroll State, Scroll Spy & Mobile Drawer
     ---------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-close');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  const setDrawer = (open) => {
    if (!mobileDrawer || !navToggle) return;
    mobileDrawer.classList.toggle('is-open', open);
    mobileDrawer.setAttribute('aria-hidden', String(!open));
    navToggle.setAttribute('aria-expanded', String(open));
  };

  navToggle?.addEventListener('click', () => setDrawer(true));
  mobileClose?.addEventListener('click', () => setDrawer(false));
  mobileBackdrop?.addEventListener('click', () => setDrawer(false));

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('is-open')) {
      setDrawer(false);
      navToggle?.focus();
    }
  });

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });

  const sections = document.querySelectorAll('main > section[id]');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach((sec) => spyObserver.observe(sec));

  /* ----------------------------------------------------------------------
     5. Scroll Reveal Animations (IntersectionObserver)
     ---------------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------------------
     6. Hero Interactive MEAN Terminal
     ---------------------------------------------------------------------- */
  const snippets = {
    mean: `// Architecture: MEAN Stack High-Performance Pipeline
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MeanPipelineService {
  private readonly API_URL = '/api/v1/workloads';
  constructor(private http: HttpClient) {}

  executeSecureWorkflow(payload: Payload): Observable<Response> {
    return this.http.post<Response>(this.API_URL, payload);
  }
}`,
    api: `// Express.js + Mongoose REST Controller
import express from 'express';
import { authenticateJWT, checkRole } from '../middleware/auth';
import { MediaModel } from '../models/Media';

const router = express.Router();
router.post('/pipeline/deploy', authenticateJWT, checkRole(['Admin']), async (req, res) => {
  const project = await MediaModel.create({ ...req.body, status: 'Active' });
  return res.status(201).json({ status: 'success', data: project });
});`,
    auth: `// Enterprise JWT & RBAC Route Guard (OWASP Top 10)
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() && auth.hasRole(route.data['roles'])
    ? true : router.createUrlTree(['/auth/login']);
};`
  };

  let activeTab = 'mean';
  const codeEl = document.getElementById('terminal-code-content');
  const termTabs = document.querySelectorAll('.term-tab');
  const copyCodeBtn = document.getElementById('copy-code-btn');
  const runCodeBtn = document.getElementById('run-code-btn');
  const termOutput = document.getElementById('terminal-output');

  if (codeEl) codeEl.textContent = snippets[activeTab];

  termTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeTab = tab.dataset.tab || 'mean';
      termTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      if (codeEl) codeEl.textContent = snippets[activeTab];
    });
  });

  copyCodeBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(snippets[activeTab]);
      copyCodeBtn.textContent = '✓ Copied';
      setTimeout(() => { copyCodeBtn.textContent = 'Copy'; }, 1800);
    } catch {
      copyCodeBtn.textContent = 'Copy';
    }
  });

  runCodeBtn?.addEventListener('click', () => {
    if (!termOutput) return;
    termOutput.classList.remove('is-visible');
    setTimeout(() => {
      termOutput.classList.add('is-visible');
    }, 280);
  });

  /* ----------------------------------------------------------------------
     7. Skills Category Filter
     ---------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillGroups = document.querySelectorAll('.skill-group');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      skillGroups.forEach((group) => {
        const show = filter === 'all' || group.dataset.category === filter;
        group.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ----------------------------------------------------------------------
     8. Projects Interactive Simulators
     ---------------------------------------------------------------------- */
  // CineScope Simulator
  const movies = [
    { title: 'Inception Protocol', genre: 'Action', rating: '8.8', year: '2024' },
    { title: 'The Chrono Valley', genre: 'Drama', rating: '8.4', year: '2025' },
    { title: 'Quantum Heist', genre: 'Comedy', rating: '7.9', year: '2025' },
    { title: 'Cyber Pulse', genre: 'Action', rating: '8.2', year: '2026' }
  ];
  let selectedGenre = 'All';
  const cineGrid = document.getElementById('cine-grid');
  const cineSearch = document.getElementById('cine-search');
  const cineTabs = document.querySelectorAll('#cine-tabs .sim-tab');

  const renderMovies = () => {
    if (!cineGrid) return;
    const query = (cineSearch?.value || '').toLowerCase();
    const list = movies.filter((m) => (selectedGenre === 'All' || m.genre === selectedGenre) && m.title.toLowerCase().includes(query));
    cineGrid.replaceChildren();
    if (!list.length) {
      const empty = document.createElement('p');
      empty.style.cssText = 'grid-column: 1 / -1; font-size: 0.75rem; color: var(--text-muted); text-align: center; padding: 1rem;';
      empty.textContent = 'No matching titles found.';
      cineGrid.append(empty);
      return;
    }
    list.forEach((m) => {
      const card = document.createElement('div');
      card.className = 'sim-item';
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:0.64rem;color:var(--text-muted);">
          <span>${m.year}</span><span style="color:var(--amber);">★ ${m.rating}</span>
        </div>
        <strong style="display:block;color:#fff;font-size:0.78rem;margin-top:0.2rem;"></strong>
        <span style="font-family:var(--font-mono);font-size:0.64rem;color:rgba(219,216,227,0.65);">${m.genre}</span>
      `;
      card.querySelector('strong').textContent = m.title;
      cineGrid.append(card);
    });
  };

  cineTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      selectedGenre = tab.dataset.genre || 'All';
      cineTabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      renderMovies();
    });
  });
  cineSearch?.addEventListener('input', renderMovies);
  renderMovies();

  // NexusMart Simulator
  let cartCount = 2;
  let adminMode = false;
  const cartBadge = document.getElementById('nexus-cart-count');
  const roleBtn = document.getElementById('nexus-role-btn');
  const roleLabel = document.getElementById('nexus-role-label');

  document.querySelectorAll('.add-cart-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      cartCount += 1;
      if (cartBadge) cartBadge.textContent = `🛒 ${cartCount} items`;
    });
  });

  roleBtn?.addEventListener('click', () => {
    adminMode = !adminMode;
    roleBtn.textContent = adminMode ? 'Admin Mode (RBAC)' : 'Customer Mode';
    roleBtn.classList.toggle('is-active', adminMode);
    if (roleLabel) roleLabel.textContent = adminMode ? 'RBAC Guard: Admin Inventory Access' : 'JWT Bearer Token Attached';
  });

  // TaskFlow Simulator
  const tasks = [
    { title: 'Implement JWT Refresh Token Hook', status: 'In Progress', priority: 'High' },
    { title: 'Optimize MongoDB Compound Index', status: 'Done', priority: 'Medium' },
    { title: 'Angular Reactive Form Schema', status: 'Backlog', priority: 'High' }
  ];
  const taskListEl = document.getElementById('taskflow-list');

  const renderTasks = () => {
    if (!taskListEl) return;
    taskListEl.replaceChildren();
    tasks.forEach((task) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sim-task';
      const badgeClass = task.status === 'Done' ? 'status-done' : task.status === 'In Progress' ? 'status-progress' : 'status-backlog';
      btn.innerHTML = `
        <div>
          <div style="color:#fff;font-size:0.78rem;font-weight:500;"></div>
          <span style="font-family:var(--font-mono);font-size:0.64rem;color:var(--text-muted);">Priority: ${task.priority}</span>
        </div>
        <span class="status-badge ${badgeClass}">${task.status}</span>
      `;
      btn.querySelector('div > div').textContent = task.title;
      btn.addEventListener('click', () => {
        task.status = task.status === 'Backlog' ? 'In Progress' : task.status === 'In Progress' ? 'Done' : 'Backlog';
        renderTasks();
      });
      taskListEl.append(btn);
    });
  };
  renderTasks();

  /* ----------------------------------------------------------------------
     9. Native <dialog> Architecture Modal (Guided by modern-web-guidance)
     ---------------------------------------------------------------------- */
  const projectDetails = {
    cinescope: {
      title: 'CineScope — System Architecture',
      category: 'Media / Entertainment',
      description: 'A dynamic media discovery web application featuring category filtering (Action, Drama, Comedy), a showcase of recent releases, thumbnail previews, and full CRUD functionality for managing titles, genres, cast details, and release years.',
      frontend: 'Angular Single Page Application with RxJS observables & modular components',
      backend: 'Node.js & Express.js REST API with modular controllers and middleware',
      database: 'MongoDB with Mongoose schemas, text search indices, and validation rules',
      security: 'JWT protected admin mutation routes, payload sanitization, and CORS controls',
      features: [
        'Dynamic categorization & filtering (Action, Drama, Comedy)',
        'Curated showcase of recent releases with thumbnail previews',
        'Full CRUD operations for titles, genres, cast details, and release years'
      ]
    },
    nexusmart: {
      title: 'NexusMart — System Architecture',
      category: 'E-Commerce / Retail',
      description: 'An end-to-end online store with JWT user authentication, dynamic product search and filtering, shopping cart state management, and a protected admin dashboard for inventory control.',
      frontend: 'Angular reactive forms with custom validators, route guards, and HTTP interceptors',
      backend: 'Express.js backend with bcrypt password hashing, auth guards, and async handlers',
      database: 'MongoDB normalized schemas for Users, Products, and Order History',
      security: 'JWT Bearer authentication, RBAC admin guards, rate limiting, and sanitization',
      features: [
        'JWT user authentication & role-based access control',
        'Dynamic product search, filtering, and RxJS cart state management',
        'Protected admin dashboard for inventory control'
      ]
    },
    taskflow: {
      title: 'TaskFlow — System Architecture',
      category: 'Productivity / SaaS',
      description: 'A productivity SPA enabling teams to create, assign, and track tasks across statuses using Angular reactive forms, route guards, and RESTful API endpoints.',
      frontend: 'Angular SPA with reactive forms, route guards, and shared RxJS services',
      backend: 'Node.js/Express service architecture with centralized error handling',
      database: 'MongoDB collections with object references for team assignments',
      security: 'Token authentication, route interception, and role verification',
      features: [
        'Create, assign, and track tasks across workflow statuses',
        'Angular reactive forms with instant client-side validation',
        'Route guards and RESTful API endpoints'
      ]
    }
  };

  const dialog = document.getElementById('project-dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogCategory = document.getElementById('dialog-category');
  const dialogBody = document.getElementById('dialog-body');

  document.querySelectorAll('.open-project-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const data = projectDetails[btn.dataset.project];
      if (!data || !dialog) return;
      if (dialogTitle) dialogTitle.textContent = data.title;
      if (dialogCategory) dialogCategory.textContent = data.category;
      if (dialogBody) {
        dialogBody.innerHTML = `
          <p style="font-size:0.95rem;color:rgba(219,216,227,0.9);font-weight:300;">${data.description}</p>
          <div class="dialog-arch-grid">
            <div class="glass-card" style="padding:1rem;"><strong style="font-family:var(--font-mono);font-size:0.78rem;color:#fff;">Frontend Client</strong><p style="font-size:0.8rem;margin-top:0.35rem;">${data.frontend}</p></div>
            <div class="glass-card" style="padding:1rem;"><strong style="font-family:var(--font-mono);font-size:0.78rem;color:#fff;">Backend API</strong><p style="font-size:0.8rem;margin-top:0.35rem;">${data.backend}</p></div>
            <div class="glass-card" style="padding:1rem;"><strong style="font-family:var(--font-mono);font-size:0.78rem;color:#fff;">Database Modeling</strong><p style="font-size:0.8rem;margin-top:0.35rem;">${data.database}</p></div>
            <div class="glass-card" style="padding:1rem;"><strong style="font-family:var(--font-mono);font-size:0.78rem;color:#fff;">Security &amp; Auth</strong><p style="font-size:0.8rem;margin-top:0.35rem;">${data.security}</p></div>
          </div>
          <div>
            <h2 style="font-family:var(--font-mono);font-size:0.74rem;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.65rem;">Key Capabilities</h2>
            <div style="display:flex;flex-direction:column;gap:0.45rem;">
              ${data.features.map((f) => `<div style="font-size:0.86rem;">✓ ${f}</div>`).join('')}
            </div>
          </div>
        `;
      }
      dialog.showModal();
    });
  });

  // Fallback for browsers without native <dialog closedby="any"> (e.g. Safari)
  if (dialog && !('closedBy' in HTMLDialogElement.prototype)) {
    let pressedOutside = false;
    const isOutside = (e) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    dialog.addEventListener('pointerdown', (e) => { pressedOutside = isOutside(e); });
    dialog.addEventListener('pointerup', (e) => { if (pressedOutside && isOutside(e)) dialog.close(); });
  }

  /* ----------------------------------------------------------------------
     10. Contact Form Validation & ARIA Sync (Guided by modern-web-guidance)
     ---------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  copyEmailBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      copyEmailBtn.textContent = '✓ Copied';
      setTimeout(() => { copyEmailBtn.textContent = 'Copy'; }, 1800);
    } catch {
      copyEmailBtn.textContent = 'Copy';
    }
  });

  if (contactForm) {
    const controls = contactForm.querySelectorAll('input[name]:not([name="honeypot"]), textarea[name]');
    const dirtyState = new WeakMap();
    const supportsUserInvalid = CSS.supports('selector(:user-invalid)');

    const linkError = (el, shown) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
      else el.removeAttribute('aria-describedby');
    };

    const syncControl = (el, forceShow = false) => {
      const valid = el.validity.valid;
      const state = dirtyState.get(el) || { interacted: false, blurred: false };
      if (forceShow) {
        state.interacted = true;
        state.blurred = true;
        dirtyState.set(el, state);
      }
      const shouldFlag = supportsUserInvalid ? el.matches(':user-invalid') : (!valid && state.interacted && state.blurred);
      if (!supportsUserInvalid && state.interacted && state.blurred) {
        el.classList.toggle('user-invalid-fallback', !valid);
        el.classList.toggle('user-valid-fallback', valid);
      }
      el.setAttribute('aria-invalid', shouldFlag ? 'true' : 'false');
      linkError(el, shouldFlag);
    };

    controls.forEach((el) => {
      el.setAttribute('aria-invalid', 'false');
      el.addEventListener('blur', () => {
        const state = dirtyState.get(el) || { interacted: false, blurred: false };
        state.blurred = true;
        dirtyState.set(el, state);
        if (state.interacted) syncControl(el);
      });
      el.addEventListener('input', () => {
        const state = dirtyState.get(el) || { interacted: false, blurred: false };
        state.interacted = true;
        dirtyState.set(el, state);
        if (state.blurred || el.getAttribute('aria-invalid') === 'true') syncControl(el);
      });
    });

    const showStatus = (type, message) => {
      if (!formStatus) return;
      formStatus.className = `form-status ${type === 'success' ? 'is-success' : 'is-error'}`;
      formStatus.textContent = message;
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const hp = contactForm.querySelector('#website-hp')?.value.trim();
      if (hp) return; // Silent honeypot rejection

      let firstInvalid = null;
      controls.forEach((el) => {
        if (!el.validity.valid) {
          syncControl(el, true);
          if (!firstInvalid) firstInvalid = el;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        showStatus('error', 'Please fix the highlighted fields before sending.');
        return;
      }

      const name = contactForm.querySelector('#contact-name').value.trim();
      const email = contactForm.querySelector('#contact-email').value.trim();
      const message = contactForm.querySelector('#contact-message').value.trim();

      if (FORM_ENDPOINT) {
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) submitBtn.disabled = true;
        try {
          const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name, email, message })
          });
          if (res.ok) {
            showStatus('success', 'Thank you! Your message has been sent.');
            contactForm.reset();
            controls.forEach((el) => {
              el.classList.remove('user-invalid-fallback', 'user-valid-fallback');
              el.setAttribute('aria-invalid', 'false');
              linkError(el, false);
            });
          } else {
            showStatus('error', 'Could not deliver message right now. Please try direct email.');
          }
        } catch {
          showStatus('error', 'Network error while sending. Please use direct email.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      } else {
        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        showStatus('success', 'Opening your default email client with your message pre-filled.');
      }
    });
  }

  /* ----------------------------------------------------------------------
     11. Back to Top & Copyright Year
     ---------------------------------------------------------------------- */
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
