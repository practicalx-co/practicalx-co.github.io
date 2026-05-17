/* ============================================================
   PRACTICALX — DEEP DIVE JAVASCRIPT
   Reading progress bar, sticky author nav, config loader.
   All deep dive pages reference this file.
   ============================================================ */

(function () {
  'use strict';

  // ── LOAD SITE CONFIG ──
  async function loadConfig() {
    try {
      const response = await fetch('/site.config.json');
      if (!response.ok) throw new Error('Config not found');
      return await response.json();
    } catch (error) {
      console.warn('Could not load site config:', error);
      return null;
    }
  }

  // ── READING PROGRESS BAR ──
  function initProgressBar() {
    const bar = document.getElementById('readingProgress');
    if (!bar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = Math.min(progress, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ── STICKY NAV ──
  function initStickyNav(config) {
    const nav = document.getElementById('ddNav');
    const hero = document.querySelector('.dd-hero');
    if (!nav || !hero) return;

    // Populate nav from config if available
    if (config) {
      const navName = nav.querySelector('.dd-nav-name');
      const navCta = nav.querySelector('.dd-nav-cta');
      if (navName) navName.textContent = config.site.name;
      if (navCta && config.author.linkedin) {
        navCta.href = config.author.linkedin;
      }
    }

    // Show nav after scrolling past hero
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            nav.classList.add('visible');
          } else {
            nav.classList.remove('visible');
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(hero);
  }

  // ── AUTHOR BIO LOADER ──
  function populateAuthorBio(config) {
    if (!config) return;

    const bioElements = document.querySelectorAll('[data-author-field]');
    bioElements.forEach(el => {
      const field = el.getAttribute('data-author-field');
      switch (field) {
        case 'name':
          el.textContent = config.author.name;
          break;
        case 'role':
          el.textContent = config.author.role;
          break;
        case 'tagline':
          el.textContent = config.author.tagline;
          break;
        case 'linkedin-href':
          el.href = config.author.linkedin;
          break;
        case 'series-href':
          el.href = config.site.seriesUrl;
          break;
        case 'series-name':
          el.textContent = config.site.series;
          break;
      }
    });

    // Populate nav author name
    const navAuthor = document.getElementById('navAuthorName');
    if (navAuthor) navAuthor.textContent = config.author.name;
  }

  // ── SCROLL REVEAL ──
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || elements.length === 0) {
      elements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  // ── ESTIMATED READ TIME ──
  function calculateReadTime() {
    const body = document.querySelector('.dd-body');
    const display = document.getElementById('readTime');
    if (!body || !display) return;

    const text = body.innerText || body.textContent;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // 200 wpm reading speed
    display.textContent = minutes + ' min read';
  }

  // ── INIT ──
  async function init() {
    const config = await loadConfig();

    initProgressBar();
    initStickyNav(config);
    populateAuthorBio(config);
    initScrollReveal();
    calculateReadTime();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
