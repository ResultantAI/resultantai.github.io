/* ============================================================================
   TAB SWITCHER COMPONENT
   ============================================================================ */

function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPanel = tab.dataset.tab;

        // Update active states for tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active states for panels
        panels.forEach(p => {
          p.classList.remove('active');
          if (p.dataset.panel === targetPanel) {
            p.classList.add('active');
          }
        });
      });
    });
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initTabs);
