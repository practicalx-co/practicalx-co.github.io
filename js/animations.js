/* ============================================================
   PRACTICALX — ANIMATIONS
   Scroll-triggered reveal animations.
   ============================================================ */

(function () {
  'use strict';

  // ── INTERSECTION OBSERVER FOR SCROLL REVEALS ──
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback — show all if no IntersectionObserver support
    revealElements.forEach(el => el.classList.add('revealed'));
  }

})();
