/* ============================================================================
   RESULTANTAI MAIN JAVASCRIPT
   Version: 2.0
   ============================================================================ */

// Scroll reveal animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}

// Navigation scroll effect
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav__links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

// Initialize all functions on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavScroll();
  initSmoothScroll();
  initMobileMenu();

  console.log('ResultantAI website loaded successfully');
});
