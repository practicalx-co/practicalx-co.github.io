/* ============================================================
   PRACTICALX — PROGRESS
   Series progress bar animation.
   Update SERIES_PROGRESS below each day.
   ============================================================ */

(function () {
  'use strict';

  // ── UPDATE THIS DAILY ──
  const SERIES_CURRENT_DAY = 9;
  const SERIES_TOTAL_DAYS  = 30;

  // ── CALCULATE PERCENTAGE ──
  const pct = Math.round((SERIES_CURRENT_DAY / SERIES_TOTAL_DAYS) * 100);

  // ── UPDATE PROGRESS BARS ──
  const fills   = document.querySelectorAll('.progress-fill');
  const counts  = document.querySelectorAll('.progress-count');

  window.addEventListener('load', () => {
    setTimeout(() => {
      fills.forEach(fill => {
        fill.style.width = pct + '%';
      });
      counts.forEach(count => {
        count.textContent = 'Day ' + String(SERIES_CURRENT_DAY).padStart(2, '0') + ' / ' + SERIES_TOTAL_DAYS;
      });
    }, 600);
  });

})();
