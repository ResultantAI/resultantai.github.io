/**
 * ResultantAI Theme Toggle
 * =========================
 * Switches between light and dark mode
 * Saves preference to localStorage
 */

(function() {
  'use strict';

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Apply theme on page load
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }

  function initThemeToggle() {
    // Create theme toggle button
    createThemeToggle();

    // Set up event listener
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  }

  function createThemeToggle() {
    // Check if toggle already exists
    if (document.getElementById('theme-toggle')) {
      return;
    }

    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');

    toggle.innerHTML = `
      <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <span class="theme-label">${currentTheme === 'light' ? 'Dark' : 'Light'} Mode</span>
    `;

    document.body.appendChild(toggle);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);

    // Update button label
    const label = document.querySelector('.theme-label');
    if (label) {
      label.textContent = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
    }

    // Optional: Log for debugging
    console.log(`Theme switched to: ${newTheme}`);
  }

  // Expose toggle function globally for testing
  window.toggleTheme = toggleTheme;

})();
