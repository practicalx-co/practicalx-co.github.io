/* ============================================================
   PRACTICALX — NAVIGATION
   Scroll behavior, active states, mobile bar.
   ============================================================ */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const mobileBarItems = document.querySelectorAll('.mobile-bar-item');

  // ── SCROLL BEHAVIOR ──
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // ── MOBILE BAR ACTIVE STATE ──
  function setActiveMobileItem() {
    const path = window.location.pathname;
    mobileBarItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href && path.includes(href) && href !== '/') {
        item.classList.add('active');
      } else if (href === '/' && (path === '/' || path === '/index.html')) {
        item.classList.add('active');
      }
    });
  }

  setActiveMobileItem();

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
