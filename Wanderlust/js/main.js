/* ═══════════════════════════════════════════════════════════════
   WANDERLUST — SHARED JAVASCRIPT v4.0 (ENHANCED)
   Black & White Premium Theme | Indian Travel
═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Loading Screen ──────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2100);
    document.body.style.overflow = 'hidden';
  }

  /* ─── Custom Cursor ───────────────────────────────── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });
    (function animCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animCursor);
    })();
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ─── Scroll Progress Bar ─────────────────────────── */
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = Math.min((scrolled / total) * 100, 100) + '%';
    }, { passive: true });
  }

  /* ─── Navigation — Sticky ─────────────────────────── */
  const nav    = document.getElementById('mainNav');
  const burger = document.getElementById('navBurger');
  const drawer = document.getElementById('navDrawer');

  if (nav && !nav.classList.contains('solid')) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('[data-close]').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', e => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Highlight active nav link by current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__drawer-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const hPage = href.split('/').pop();
    if (hPage === currentPage || (currentPage === '' && hPage === 'index.html') ||
        (currentPage === 'index.html' && hPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── Theme Toggle ─────────────────────────────────── */
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // Load saved preference or default dark
  const savedTheme = localStorage.getItem('wl-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('wl-theme', theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ─── Scroll Reveal ───────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(el => revObs.observe(el));

  /* ─── Animated Stats Counter ──────────────────────── */
  function animateCounter(el, target, duration = 2000) {
    const isLarge = target >= 1000;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val  = Math.floor(ease * target);
      el.textContent = isLarge ? val.toLocaleString() : val;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isLarge ? target.toLocaleString() : target;
    }
    requestAnimationFrame(step);
  }

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-target]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.target));
        });
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stat-item, .stat-card').forEach(c => counterObs.observe(c));

  /* ─── Back to Top ─────────────────────────────────── */
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Smooth Scroll (anchor links) ───────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── Hero Parallax ───────────────────────────────── */
  const heroBgImg = document.querySelector('.hero__bg img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBgImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  /* ─── Chat Widget ─────────────────────────────────── */
  const chatFab  = document.getElementById('chatFab');
  const chatBox  = document.getElementById('chatBox');
  const chatMsgs = document.getElementById('chatMsgs');
  const chatInp  = document.getElementById('chatInput');
  const chatClose= document.getElementById('chatCloseBtn');
  const chatSend = document.getElementById('chatSendBtn');

  if (chatFab && chatBox) {
    chatFab.addEventListener('click', () => chatBox.classList.toggle('open'));
    if (chatClose) chatClose.addEventListener('click', () => chatBox.classList.remove('open'));

    const botResponses = {
      book:    "Excellent choice! Visit our <a href='contact.html' style='color:var(--white);text-decoration:underline'>Contact page</a> or fill our booking form. We respond within 24 hours.",
      rajasthan: "Rajasthan is magical — golden forts, desert safaris at Sam Sand Dunes, and the Blue City of Jodhpur. Our Royal Rajasthan package starts from ₹45,000/person.",
      kerala:  "Kerala — God's Own Country! Houseboat stays on backwaters, Ayurvedic retreats, and spice plantation walks. From ₹32,000/person for 7 days.",
      deal:    "Our most popular package is the Golden Triangle (Delhi–Agra–Jaipur) at ₹28,000/person for 6 nights, including hotels, guides, and transport.",
      india:   "We cover India's crown jewels: Rajasthan, Kerala, Himachal, Goa, Northeast, Kashmir, and more — bespoke itineraries crafted for every taste.",
      default: "Great question! Our travel experts would love to design your perfect Indian journey. Would you like to <a href='contact.html' style='color:var(--white);text-decoration:underline'>send an enquiry</a>?"
    };

    function getBotReply(msg) {
      const m = msg.toLowerCase();
      if (m.includes('book') || m.includes('reserve')) return botResponses.book;
      if (m.includes('rajasthan') || m.includes('jaipur') || m.includes('fort')) return botResponses.rajasthan;
      if (m.includes('kerala') || m.includes('backwater') || m.includes('south')) return botResponses.kerala;
      if (m.includes('deal') || m.includes('price') || m.includes('cost') || m.includes('₹') || m.includes('cheap')) return botResponses.deal;
      if (m.includes('india') || m.includes('destination') || m.includes('where')) return botResponses.india;
      return botResponses.default;
    }

    function addMsg(html, type = 'bot') {
      const d = document.createElement('div');
      d.className = 'chat-msg ' + (type === 'user' ? 'user-msg' : '');
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      d.innerHTML = type === 'user'
        ? `<div class="chat-bubble-user">${html}</div><div class="chat-time right">${now}</div>`
        : `<div class="chat-bubble-bot">${html}</div><div class="chat-time">${now}</div>`;
      chatMsgs.appendChild(d);
      chatMsgs.scrollTop = chatMsgs.scrollHeight;
    }

    function sendMsg() {
      if (!chatInp) return;
      const msg = chatInp.value.trim();
      if (!msg) return;
      addMsg(msg, 'user');
      chatInp.value = '';
      setTimeout(() => addMsg(getBotReply(msg), 'bot'), 900);
    }

    if (chatSend) chatSend.addEventListener('click', sendMsg);
    if (chatInp)  chatInp.addEventListener('keypress', e => { if (e.key === 'Enter') sendMsg(); });
    document.querySelectorAll('.chat-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        addMsg(btn.textContent, 'user');
        setTimeout(() => addMsg(getBotReply(btn.textContent), 'bot'), 900);
      });
    });
  }

  /* ─── Lightbox ────────────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg    = document.getElementById('lbImg');
    const lbCap    = document.getElementById('lbCaption');
    const lbPkg    = document.getElementById('lbPackage');
    const lbPriceEl= document.getElementById('lbPrice');
    const lbClose  = document.getElementById('lbClose');
    const lbPrev   = document.getElementById('lbPrev');
    const lbNext   = document.getElementById('lbNext');
    const allCards = Array.from(document.querySelectorAll('[data-lightbox]'));
    let currentIdx = 0;

    function openLB(i) {
      currentIdx = i;
      const card = allCards[i];
      lbImg.src  = card.dataset.lightbox;
      if (lbCap)   lbCap.textContent    = card.dataset.caption || '';
      if (lbPkg)   lbPkg.textContent    = card.dataset.package || '';
      if (lbPriceEl) lbPriceEl.textContent = card.dataset.price  || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLB() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    function navLB(dir) {
      currentIdx = (currentIdx + dir + allCards.length) % allCards.length;
      lbImg.style.opacity = '0';
      setTimeout(() => {
        const card = allCards[currentIdx];
        lbImg.src = card.dataset.lightbox;
        if (lbCap) lbCap.textContent = card.dataset.caption || '';
        if (lbPkg) lbPkg.textContent = card.dataset.package || '';
        if (lbPriceEl) lbPriceEl.textContent = card.dataset.price || '';
        lbImg.style.opacity = '1';
      }, 200);
    }

    allCards.forEach((c, i) => c.addEventListener('click', () => openLB(i)));
    if (lbClose) lbClose.addEventListener('click', closeLB);
    if (lbPrev)  lbPrev.addEventListener('click', () => navLB(-1));
    if (lbNext)  lbNext.addEventListener('click', () => navLB(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLB();
      if (e.key === 'ArrowLeft')   navLB(-1);
      if (e.key === 'ArrowRight')  navLB(1);
    });
  }

  /* ─── Gallery Filter ──────────────────────────────── */
  const filterBtns = document.querySelectorAll('.gf-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.display = match ? 'block' : 'none';
      });
    });
  });

  /* ─── FAQ Accordion ───────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const a    = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ─── Contact / Book Now Form Handling ────────────── */
  function handleFormSubmit(form, successId) {
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const original  = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.textContent = 'Sending…'; submitBtn.disabled = true; }

      const data = new FormData(form);
      const body = Object.fromEntries(data.entries());

      // Send via Formspree (configured endpoint below)
      // Replace YOUR_FORM_ID with actual Formspree ID after setup
      try {
        const res = await fetch('https://formspree.io/f/xpwrydze', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...body, _replyto: body.email, _subject: 'Wanderlust Enquiry: ' + (body.subject || body.package || 'New Lead') })
        });

        const successEl = document.getElementById(successId);
        if (res.ok) {
          if (successEl) { successEl.style.display = 'block'; }
          form.reset();
        } else {
          if (successEl) {
            successEl.style.display = 'block';
            successEl.textContent = 'Oops! Something went wrong. Please email us at sawarkarkhushi93@gmail.com';
          }
        }
      } catch {
        const successEl = document.getElementById(successId);
        if (successEl) {
          successEl.style.display = 'block';
          successEl.textContent = 'Message could not be sent. Please email sawarkarkhushi93@gmail.com directly.';
        }
      }

      if (submitBtn) { submitBtn.textContent = original; submitBtn.disabled = false; }
    });
  }

  handleFormSubmit(document.getElementById('contactForm'), 'contactSuccess');
  handleFormSubmit(document.getElementById('bookForm'), 'bookSuccess');

  /* ─── Scroll Progress (per-page sections) ────────── */
  const sections = document.querySelectorAll('[data-section]');
  if (sections.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.dataset.section; });
      document.querySelectorAll('.nav__link').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    }, { passive: true });
  }

}); // end DOMContentLoaded


/* ─── Trip Cost Calculator ────────────────────────── */
function initCalculator() {
  const btn = document.getElementById('calcBtn');
  if (!btn) return;

  const rates = {
    accom: {
      budget: { india: 800, sea: 1200, europe: 2500, americas: 2200, himalaya: 900, goa: 1500 },
      mid:    { india: 3000, sea: 4500, europe: 8000, americas: 7000, himalaya: 2500, goa: 5000 },
      luxury: { india: 10000, sea: 14000, europe: 24000, americas: 20000, himalaya: 8000, goa: 18000 }
    },
    food: {
      budget: { india: 400, sea: 800, europe: 2000, americas: 1800, himalaya: 350, goa: 600 },
      mid:    { india: 1500, sea: 2500, europe: 5000, americas: 4000, himalaya: 1200, goa: 2200 },
      luxury: { india: 5000, sea: 8000, europe: 12000, americas: 10000, himalaya: 4000, goa: 7000 }
    },
    flights: { india: 4500, sea: 18000, europe: 55000, americas: 75000, himalaya: 3500, goa: 3000 }
  };

  btn.addEventListener('click', () => {
    const style   = document.getElementById('cStyle').value;
    const region  = document.getElementById('cRegion').value;
    const days    = parseInt(document.getElementById('cDays').value) || 7;
    const people  = parseInt(document.getElementById('cPeople').value) || 2;
    const flights = document.getElementById('cFlights').value;
    const acts    = parseInt(document.getElementById('cActivities').value) || 0;

    const accom   = rates.accom[style][region] * days * people;
    const food    = rates.food[style][region] * days * people;
    const actT    = acts * days * people;
    const flightT = flights === 'yes' ? rates.flights[region] * people : 0;
    const total   = accom + food + actT + flightT;
    const pp      = Math.round(total / people);

    const placeholder = document.getElementById('resultPlaceholder');
    const content     = document.getElementById('resultContent');
    if (placeholder) placeholder.style.display = 'none';
    if (content) content.style.display = 'block';

    const rTotal = document.getElementById('rTotal');
    const rPer   = document.getElementById('rPer');
    const rBreak = document.getElementById('rBreakdown');

    const fmt = n => '₹' + n.toLocaleString('en-IN');

    if (rTotal) rTotal.textContent = fmt(total);
    if (rPer)   rPer.textContent   = fmt(pp) + ' per person · ' + days + ' days';
    if (rBreak) rBreak.innerHTML = `
      <div class="result-row"><span class="rrl">🏨 Accommodation</span><span class="rrv">${fmt(accom)}</span></div>
      <div class="result-row"><span class="rrl">🍽️ Food & Dining</span><span class="rrv">${fmt(food)}</span></div>
      <div class="result-row"><span class="rrl">🎯 Activities</span><span class="rrv">${fmt(actT)}</span></div>
      <div class="result-row"><span class="rrl">✈️ Flights / Transport</span><span class="rrv">${fmt(flightT)}</span></div>
    `;
  });
}

/* ─── v6 ADDITIONS ──────────────────────────────────── */

/* Floating Dark/Light Mode Toggle (separate from nav) */
(function initFloatingTheme() {
  const fab = document.getElementById('themeFab');
  if (!fab) return;
  const htmlEl = document.documentElement;
  const saved = localStorage.getItem('wl-theme') || 'dark';
  htmlEl.setAttribute('data-theme', saved);
  fab.addEventListener('click', () => {
    const cur = htmlEl.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('wl-theme', next);
  });
})();

/* Package selector for booking form */
(function initBookingPkg() {
  document.querySelectorAll('.book-pkg-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.book-pkg-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
})();

/* EmailJS Form Handler */
function initEmailJS() {
  // EmailJS must be loaded on pages that use forms
  if (typeof emailjs === 'undefined') return;
  emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // ← Replace with your EmailJS public key

  function sendEmail(form, serviceId, templateId, successId) {
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Client-side validation
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('form-error');
          valid = false;
        } else {
          field.classList.remove('form-error');
        }
      });
      if (!valid) return;

      const submitBtn = form.querySelector('[type="submit"]');
      const original = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.textContent = 'Sending…'; submitBtn.disabled = true; }

      const params = {};
      new FormData(form).forEach((v, k) => params[k] = v);

      emailjs.send(serviceId, templateId, params)
        .then(() => {
          const el = document.getElementById(successId);
          if (el) { el.style.display = 'block'; }
          form.reset();
          document.querySelectorAll('.book-pkg-card').forEach(c => c.classList.remove('selected'));
        })
        .catch(() => {
          const el = document.getElementById(successId);
          if (el) { el.textContent = '⚠ Could not send. Please email sawarkarkhushi93@gmail.com directly.'; el.style.display = 'block'; }
        })
        .finally(() => {
          if (submitBtn) { submitBtn.textContent = original; submitBtn.disabled = false; }
        });
    });
  }

  sendEmail(document.getElementById('enquiryForm'),  'YOUR_SERVICE_ID', 'YOUR_ENQUIRY_TEMPLATE_ID',  'enquirySuccess');
  sendEmail(document.getElementById('bookingForm'), 'YOUR_SERVICE_ID', 'YOUR_BOOKING_TEMPLATE_ID', 'bookingSuccess');
}

document.addEventListener('DOMContentLoaded', initEmailJS);
