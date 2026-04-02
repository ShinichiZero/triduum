/**
 * Triduum Breviary — Navigation Script
 * Single-page tab switching; no page reloads.
 */
(function () {
  'use strict';

  const DAYS = ['holy-thursday', 'good-friday', 'holy-saturday'];

  function activate(dayId) {
    // Panels
    DAYS.forEach(function (id) {
      const panel = document.getElementById(id);
      if (panel) panel.classList.toggle('active', id === dayId);
    });

    // Nav buttons
    document.querySelectorAll('.day-nav button').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.day === dayId);
      btn.setAttribute('aria-selected', btn.dataset.day === dayId ? 'true' : 'false');
    });

    // Update URL hash without scrolling
    history.replaceState(null, '', '#' + dayId);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Wire up nav buttons
    document.querySelectorAll('.day-nav button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activate(btn.dataset.day);
      });
    });

    // Honour URL hash, default to first day
    const hash = (location.hash || '').replace('#', '');
    const initial = DAYS.includes(hash) ? hash : DAYS[0];
    activate(initial);
  });
})();
