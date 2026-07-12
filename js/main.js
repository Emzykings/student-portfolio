// =========================================================
// main.js
// Shared behaviour across every page: mobile navigation toggle
// and dynamic footer year. Loaded on every page before any
// page-specific script (planner.js, contact.js).
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  setFooterYear();
});

/**
 * Handles opening/closing the mobile navigation menu, and closes
 * it automatically once a link is clicked (better mobile UX than
 * leaving the menu open after navigating).
 */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Event delegation: one listener on the parent <ul>, instead of
  // attaching a click handler to every single <a> inside it.
  links.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Fills in the current year in the footer automatically, so it
 * never goes stale.
 */
function setFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}