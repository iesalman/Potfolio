/* ==========================================================================
   Eyad Seleman Portfolio — Clean Modular Vanilla JavaScript (ES6+)
   ========================================================================== */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FORM_ENDPOINT = ''; // Optional: add Formspree / Web3Forms URL here

  /* ----------------------------------------------------------------------
     1. Navigation Scroll State, Active Spy & Mobile Drawer
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
  navLinks.forEach((link) => link.addEventListener('click', () => setDrawer(false)));

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
     2. Scroll Reveal
     ---------------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '120px 0px', threshold: 0.01 });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------------------
     3. Hero System Blueprint Inspector (Real Project Specs)
     ---------------------------------------------------------------------- */
  const blueprints = {
    nawa: {
      stack: 'Angular 21 • Express 5 • MongoDB • JWT',
      auth: 'Manager JWT Guard + localStorage Cart',
      i18n: 'Bilingual EN / AR (Automatic LTR / RTL)',
      routes: [
        { verb: 'GET', path: '/api/items?category=&search=' },
        { verb: 'POST', path: '/api/orders (Phone Checkout)' },
        { verb: 'POST', path: '/api/admin/items (JWT Protected)' }
      ]
    },
    store: {
      stack: 'Node.js • Express 5 • EJS • Bootstrap 5',
      auth: 'JWT + HttpOnly Cookies (3 RBAC Roles)',
      i18n: 'MVC Server Views + 13-Point Test Suite',
      routes: [
        { verb: 'POST', path: '/api/users/signin (Owner/Manager)' },
        { verb: 'GET', path: '/api/reports/orders (KPIs)' },
        { verb: 'PATCH', path: '/api/orders/:id/status' }
      ]
    },
    hotel: {
      stack: 'Node.js • Express 5 • Mongoose • Joi',
      auth: 'Per-Room Mutex Concurrency Lock',
      i18n: '100 Rooms • Overlap & Billing Guard',
      routes: [
        { verb: 'GET', path: '/api/v1/rooms/available' },
        { verb: 'POST', path: '/api/v1/bookings (Atomic Mutex)' },
        { verb: 'GET', path: '/api/v1/dashboard/summary' }
      ]
    }
  };

  const bpBody = document.getElementById('blueprint-body');
  const bpTabs = document.querySelectorAll('.bp-tab');

  const renderBlueprint = (key) => {
    const bp = blueprints[key];
    if (!bp || !bpBody) return;
    bpBody.innerHTML = `
      <div>
        <div class="bp-row"><span class="bp-label">Stack</span><span class="bp-value">${bp.stack}</span></div>
        <div class="bp-row"><span class="bp-label">Security</span><span class="bp-value">${bp.auth}</span></div>
        <div class="bp-row"><span class="bp-label">Design</span><span class="bp-value">${bp.i18n}</span></div>
      </div>
      <div class="bp-endpoints">
        <span style="font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;margin-bottom:0.15rem;">Verified Endpoints</span>
        ${bp.routes.map((r) => {
          const cls = r.verb === 'GET' ? 'verb-get' : r.verb === 'PATCH' ? 'verb-patch' : 'verb-post';
          return `<div class="bp-route"><span class="http-verb ${cls}">${r.verb}</span><span>${r.path}</span></div>`;
        }).join('')}
      </div>
    `;
  };

  bpTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      bpTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      renderBlueprint(tab.dataset.bp || 'nawa');
    });
  });
  renderBlueprint('nawa');

  /* ----------------------------------------------------------------------
     4. Project 1 Interactive Simulator: Nawa Market (Real Seed Catalog)
     ---------------------------------------------------------------------- */
  const nawaItems = [
    { en: 'Orange Juice 1L', ar: 'عصير برتقال 1 لتر', cat: 'Drinks', price: 45 },
    { en: 'Black Tea 100 bags', ar: 'شاي أسود 100 فتلة', cat: 'Drinks', price: 60 },
    { en: 'Potato Chips', ar: 'رقائق بطاطس', cat: 'Snacks', price: 25 },
    { en: 'Chocolate Biscuits', ar: 'بسكويت شوكولاتة', cat: 'Snacks', price: 30 }
  ];

  let nawaLang = 'en';
  let nawaCat = 'All';
  let nawaCart = 1;

  const nawaScreen = document.getElementById('nawa-screen');
  const nawaGrid = document.getElementById('nawa-grid');
  const nawaLangBtn = document.getElementById('nawa-lang-btn');
  const nawaBrandText = document.getElementById('nawa-brand-text');
  const nawaCartPill = document.getElementById('nawa-cart-pill');
  const nawaFooterNote = document.getElementById('nawa-footer-note');
  const nawaCatBtns = document.querySelectorAll('#nawa-cats .nawa-pill-btn');

  const renderNawa = () => {
    if (!nawaGrid || !nawaScreen) return;
    const isAr = nawaLang === 'ar';
    nawaScreen.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    if (nawaBrandText) nawaBrandText.textContent = isAr ? 'نوا ماركت' : 'Nawa Market';
    if (nawaLangBtn) nawaLangBtn.textContent = isAr ? 'EN / LTR' : 'AR / RTL';
    if (nawaCartPill) nawaCartPill.textContent = isAr ? `السلة (${nawaCart})` : `Cart (${nawaCart})`;
    if (nawaFooterNote) nawaFooterNote.textContent = isAr ? 'حفظ السلة والمفضلة تلقائياً' : 'localStorage Cart & Favorites Active';

    const filtered = nawaItems.filter((i) => nawaCat === 'All' || i.cat === nawaCat);
    nawaGrid.replaceChildren();
    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'nawa-item';
      const catLabel = isAr ? (item.cat === 'Drinks' ? 'مشروبات' : 'سناكس') : item.cat;
      card.innerHTML = `
        <span>${catLabel}</span>
        <strong>${isAr ? item.ar : item.en}</strong>
        <div class="nawa-price-row">
          <strong style="color:#c96849;">${item.price} EGP</strong>
          <button type="button" class="nawa-pill-btn">${isAr ? '+ أضف' : '+ Add'}</button>
        </div>
      `;
      card.querySelector('button').addEventListener('click', () => {
        nawaCart += 1;
        renderNawa();
      });
      nawaGrid.append(card);
    });
  };

  nawaLangBtn?.addEventListener('click', () => {
    nawaLang = nawaLang === 'en' ? 'ar' : 'en';
    renderNawa();
  });

  nawaCatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      nawaCat = btn.dataset.cat || 'All';
      nawaCatBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      renderNawa();
    });
  });
  renderNawa();

  /* ----------------------------------------------------------------------
     5. Project 2 Interactive Simulator: Simple Shop Management System
     ---------------------------------------------------------------------- */
  const shopRoles = [
    'Role: Shop Owner (Full Access)',
    'Role: Item Manager (Catalog & Photos)',
    'Role: Order Manager (Orders & Status)'
  ];
  let shopRoleIdx = 0;
  const shopOrders = [
    { id: '#ORD-104', item: 'MacBook Pro 14 M3 Chip', status: 'Pending' },
    { id: '#ORD-103', item: 'iPhone 15 Pro Max 256GB', status: 'In Progress' },
    { id: '#ORD-102', item: 'Sony WH-1000XM5 Headphones', status: 'Completed' }
  ];

  const shopRoleBadge = document.getElementById('shop-role-badge');
  const shopRoleToggle = document.getElementById('shop-role-toggle');
  const shopOrdersList = document.getElementById('shop-orders-list');

  shopRoleToggle?.addEventListener('click', () => {
    shopRoleIdx = (shopRoleIdx + 1) % shopRoles.length;
    if (shopRoleBadge) shopRoleBadge.textContent = shopRoles[shopRoleIdx];
  });

  const renderShopOrders = () => {
    if (!shopOrdersList) return;
    shopOrdersList.replaceChildren();
    shopOrders.forEach((o) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'shop-order-btn';
      const cls = o.status === 'Completed' ? 'mvc-completed' : o.status === 'In Progress' ? 'mvc-progress' : 'mvc-pending';
      btn.innerHTML = `
        <span><strong style="margin-right:0.35rem;">${o.id}</strong>${o.item}</span>
        <span class="badge-mvc ${cls}">${o.status}</span>
      `;
      btn.addEventListener('click', () => {
        o.status = o.status === 'Pending' ? 'In Progress' : o.status === 'In Progress' ? 'Completed' : 'Pending';
        renderShopOrders();
      });
      shopOrdersList.append(btn);
    });
  };
  renderShopOrders();

  /* ----------------------------------------------------------------------
     6. Project 3 Interactive Simulator: Pato Place Restaurant
     ---------------------------------------------------------------------- */
  const patoViews = {
    home: `
      <div class="pato-hero-box">
        <span style="font-size:0.72rem;color:#fca5a5;letter-spacing:0.15em;text-transform:uppercase;">Welcome to</span>
        <h4 style="font-size:1.45rem;font-weight:800;letter-spacing:0.08em;margin-block:0.35rem;">PATO PLACE</h4>
        <p style="font-size:0.76rem;color:#d6d3d1;">Authentic Italian &amp; Mediterranean dining experience with curated seasonal dishes.</p>
      </div>
    `,
    menu: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.55rem;">
        <div style="padding:0.65rem;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);">
          <strong style="font-size:0.78rem;display:block;">Starters &amp; Mains</strong>
          <span style="font-size:0.68rem;color:#a8a29e;">Organized dishes &amp; pricing</span>
        </div>
        <div style="padding:0.65rem;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);">
          <strong style="font-size:0.78rem;display:block;">Chef Specials</strong>
          <span style="font-size:0.68rem;color:#a8a29e;">Lunch, Dinner &amp; Drinks</span>
        </div>
      </div>
    `,
    reservation: `
      <div style="padding:0.8rem;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;gap:0.45rem;">
        <strong style="font-size:0.8rem;color:#fca5a5;">Table Reservation</strong>
        <span style="font-size:0.72rem;color:#d6d3d1;">Date • Time • Party Size (2–8 Guests)</span>
        <span style="font-family:var(--font-mono);font-size:0.68rem;color:#10b981;">✓ Responsive Booking Form Layout</span>
      </div>
    `
  };

  const patoStage = document.getElementById('pato-stage');
  const patoPageUrl = document.getElementById('pato-page-url');
  const patoTabs = document.querySelectorAll('#pato-tabs .pato-tab');

  const renderPato = (view) => {
    if (patoStage) patoStage.innerHTML = patoViews[view] || patoViews.home;
    if (patoPageUrl) patoPageUrl.textContent = view === 'home' ? 'index.html' : `${view}.html`;
  };

  patoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      patoTabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      renderPato(tab.dataset.pato || 'home');
    });
  });
  renderPato('home');

  /* ----------------------------------------------------------------------
     7. Skills Filter Tabs
     ---------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-group-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      skillCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ----------------------------------------------------------------------
     8. Native <dialog> Architecture Modal (All 5 Real Projects)
     ---------------------------------------------------------------------- */
  const projectDetails = {
    nawa: {
      title: 'Nawa Market — System Architecture',
      category: 'MEAN E-Commerce',
      description: 'Bilingual (English & Arabic) e-commerce storefront and manager dashboard built with Angular 21, Node.js, Express 5, and MongoDB.',
      frontend: 'Angular 21 standalone components, Signals, lazy routes, RTL/LTR TranslatePipe, and localStorage cart/favorites.',
      backend: 'Node.js & Express 5 REST API with public catalog/order endpoints and protected manager CRUD routes.',
      database: 'MongoDB & Mongoose models for Users, Categories, Items (with stock tracking), and Orders.',
      security: 'JWT Bearer authentication guarding all /api/admin/* endpoints and bcryptjs password hashing.',
      features: [
        'Automatic English LTR & Arabic RTL interface switching',
        'Public search, category filtering, item details, favorites & phone-based checkout',
        'Manager dashboard for categories, inventory stock quantities & order status (opened / closed)'
      ]
    },
    store: {
      title: 'Simple Shop Management System — Architecture',
      category: 'Express MVC + EJS',
      description: 'Centralized retail inventory and order management portal engineered with Express 5 MVC, MongoDB, EJS, and Bootstrap 5.',
      frontend: 'Server-rendered EJS views with Bootstrap 5 responsive tables, KPI cards, and role-aware navigation.',
      backend: 'Modular Express 5 controllers (auth, category, product, order, report, user) + Multer photo upload.',
      database: 'MongoDB with Mongoose schemas storing product categories, line items, and full order status history.',
      security: 'JWT + cookie-parser sessions with 3 RBAC roles: Shop Owner, Item Manager, and Order Manager.',
      features: [
        'Order lifecycle workflow: Pending → In Progress → Completed / Cancelled',
        'Executive KPI dashboard + Category & Daily Order performance reports',
        'Verified by a 13-point automated endpoint test suite & Postman collection'
      ]
    },
    pato: {
      title: 'Pato Place Restaurant — Architecture',
      category: 'Multi-Page Web',
      description: 'Responsive multi-page restaurant platform showcasing visual branding, dining menus, gallery, and table reservation flow.',
      frontend: 'Semantic HTML5 pages (Home, Menu, Reservation, Gallery, About, Blog, Contact) with custom CSS3 & Bootstrap.',
      backend: 'Static multi-page architecture deployable directly on any CDN or GitHub Pages.',
      database: 'Static structured menu & gallery assets with Lightbox and Slick carousel integration.',
      security: 'Clean semantic markup and cross-browser responsive layout validation.',
      features: [
        'Interactive hero slider and responsive off-canvas navigation drawer',
        'Structured Menu and Table Reservation page layouts',
        'Photo Gallery with Lightbox modal previews'
      ]
    },
    hotel: {
      title: 'Hotel Management Dashboard API — Architecture',
      category: 'Backend REST API',
      description: 'Production-ready RESTful backend for a 100-room hotel booking system with concurrency locks and automated integration tests.',
      frontend: 'Designed for dashboard consumption with standardized ApiResponse envelopes & Postman collection.',
      backend: 'Domain-driven MVC in Node.js & Express 5 with per-room in-process mutex locks preventing double-booking.',
      database: 'MongoDB/Mongoose Room & Booking models with date-overlap queries and server-side price calculations.',
      security: 'Strict Joi validation schemas on payloads/params/queries and centralized operational ApiError handling.',
      features: [
        'Per-room mutex lock prevents race conditions during concurrent bookings',
        'Server-side totalNights, totalPrice, remainingAmount & paymentStatus calculation',
        'Automated E2E integration test suite (tests/api.test.js) & 100-room database seeder'
      ]
    },
    movies: {
      title: 'Movies Discovery & CRUD Platform — Architecture',
      category: 'Express + MongoDB CRUD',
      description: 'Cinema catalog web app with genre filtering, latest 20 releases sorting, poster previews, and full CRUD lifecycle.',
      frontend: 'EJS templates with search bar, genre pill filters (Action, Drama, Comedy), and live poster upload preview.',
      backend: 'Express 5 router & controllers handling index, details, create, update, delete, and Multer uploads.',
      database: 'MongoDB queries sorting releases descending by year with genre indexing.',
      security: 'Server-side form handling and clean fallback placeholders for missing thumbnails.',
      features: [
        'Filter latest 20 movies by Action, Drama, Comedy, or All Recent',
        'Supports both external poster URLs and local Multer image uploads',
        'Full Create, Read, Update, and Delete workflow'
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
          <p style="font-size:0.94rem;color:var(--text-secondary);line-height:1.65;">${data.description}</p>
          <div class="dialog-arch-grid">
            <div class="surface-card" style="padding:1rem;"><strong style="font-family:var(--font-mono);font-size:0.76rem;color:var(--accent-light);">Frontend</strong><p style="font-size:0.82rem;color:var(--text-secondary);margin-top:0.3rem;">${data.frontend}</p></div>
            <div class="surface-card" style="padding:1rem;"><strong style="font-family:var(--font-mono);font-size:0.76rem;color:var(--accent-light);">Backend</strong><p style="font-size:0.82rem;color:var(--text-secondary);margin-top:0.3rem;">${data.backend}</p></div>
            <div class="surface-card" style="padding:1rem;"><strong style="font-family:var(--font-mono);font-size:0.76rem;color:var(--accent-light);">Database</strong><p style="font-size:0.82rem;color:var(--text-secondary);margin-top:0.3rem;">${data.database}</p></div>
            <div class="surface-card" style="padding:1rem;"><strong style="font-family:var(--font-mono);font-size:0.76rem;color:var(--accent-light);">Security &amp; Reliability</strong><p style="font-size:0.82rem;color:var(--text-secondary);margin-top:0.3rem;">${data.security}</p></div>
          </div>
          <div>
            <h2 style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.55rem;">Verified Capabilities</h2>
            <ul class="project-bullets" style="margin-top:0;">
              ${data.features.map((f) => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        `;
      }
      dialog.showModal();
    });
  });

  // Fallback for browsers without <dialog closedby="any">
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
     9. Contact Form Validation, Copy Email & Real Mailto Dispatch
     ---------------------------------------------------------------------- */
  const CONTACT_EMAIL = 'esalman547@gmail.com';
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
      if (contactForm.querySelector('#website-hp')?.value.trim()) return;

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
            showStatus('error', 'Unable to send message right now. Please email esalman547@gmail.com directly.');
          }
        } catch {
          showStatus('error', 'Network error while sending. Please email esalman547@gmail.com directly.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      } else {
        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        showStatus('success', `Opening your email client to send directly to ${CONTACT_EMAIL}.`);
      }
    });
  }

  /* ----------------------------------------------------------------------
     10. Back to Top & Copyright Year
     ---------------------------------------------------------------------- */
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
