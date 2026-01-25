/* ============================================================================
   VIEW TOGGLE COMPONENT
   For Solutions Hub page (Outcome / Industry / Challenge views)
   ============================================================================ */

function initViewToggle() {
  const toggles = document.querySelectorAll('[data-view-toggle]');
  const views = document.querySelectorAll('[data-view]');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetView = toggle.dataset.viewToggle;

      // Update active states for toggles
      toggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');

      // Update active states for views
      views.forEach(v => {
        v.classList.remove('active');
        v.style.display = 'none';
        if (v.dataset.view === targetView) {
          v.classList.add('active');
          v.style.display = 'block';
        }
      });
    });
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initViewToggle);
