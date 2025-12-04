/**
 * ResultantAI Website Tracking
 * Handles Google Analytics 4 events via Google Tag Manager
 */

// Track page views (automatically sent by GA4)
window.dataLayer = window.dataLayer || [];

/**
 * Track custom events
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Event parameters
 */
function trackEvent(eventName, eventParams = {}) {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      'event': eventName,
      ...eventParams
    });
    console.log('[Tracking]', eventName, eventParams);
  }
}

/**
 * Track button clicks
 */
function setupButtonTracking() {
  // Track CTA button clicks
  document.querySelectorAll('[data-track-cta]').forEach(button => {
    button.addEventListener('click', function() {
      const ctaName = this.getAttribute('data-track-cta') || this.textContent.trim();
      const ctaLocation = this.closest('section')?.id || 'unknown';

      trackEvent('cta_click', {
        'cta_name': ctaName,
        'cta_location': ctaLocation,
        'cta_text': this.textContent.trim()
      });
    });
  });

  // Track demo request buttons
  document.querySelectorAll('[href*="demo"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('demo_request_click', {
        'link_text': this.textContent.trim(),
        'link_url': this.href
      });
    });
  });

  // Track gateway signup buttons
  document.querySelectorAll('[href*="gateway.resultantai.com"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('gateway_signup_click', {
        'link_text': this.textContent.trim()
      });
    });
  });

  // Track contact buttons
  document.querySelectorAll('[href*="contact"], [href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('contact_click', {
        'contact_method': this.href.startsWith('mailto:') ? 'email' : 'form',
        'link_text': this.textContent.trim()
      });
    });
  });
}

/**
 * Track form submissions
 */
function setupFormTracking() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const formName = this.id || this.name || 'unnamed_form';

      trackEvent('form_submit', {
        'form_name': formName,
        'form_location': window.location.pathname
      });
    });
  });
}

/**
 * Track scroll depth
 */
function setupScrollTracking() {
  const scrollDepths = [25, 50, 75, 90, 100];
  const triggered = {};

  window.addEventListener('scroll', function() {
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;

    scrollDepths.forEach(depth => {
      if (scrollPercentage >= depth && !triggered[depth]) {
        triggered[depth] = true;
        trackEvent('scroll_depth', {
          'scroll_percentage': depth,
          'page_path': window.location.pathname
        });
      }
    });
  });
}

/**
 * Track outbound links
 */
function setupOutboundLinkTracking() {
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.addEventListener('click', function() {
        trackEvent('outbound_link_click', {
          'link_url': this.href,
          'link_text': this.textContent.trim(),
          'link_domain': new URL(this.href).hostname
        });
      });
    }
  });
}

/**
 * Track video interactions (if any)
 */
function setupVideoTracking() {
  document.querySelectorAll('video').forEach(video => {
    let videoPlayed = false;

    video.addEventListener('play', function() {
      if (!videoPlayed) {
        videoPlayed = true;
        trackEvent('video_play', {
          'video_title': this.title || this.src,
          'video_location': window.location.pathname
        });
      }
    });

    video.addEventListener('ended', function() {
      trackEvent('video_complete', {
        'video_title': this.title || this.src,
        'video_location': window.location.pathname
      });
    });
  });
}

/**
 * Initialize all tracking
 */
function initTracking() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setupButtonTracking();
      setupFormTracking();
      setupScrollTracking();
      setupOutboundLinkTracking();
      setupVideoTracking();
    });
  } else {
    setupButtonTracking();
    setupFormTracking();
    setupScrollTracking();
    setupOutboundLinkTracking();
    setupVideoTracking();
  }

  // Track page load time
  window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    trackEvent('page_load_time', {
      'load_time_ms': loadTime,
      'page_path': window.location.pathname
    });
  });
}

// Auto-initialize
initTracking();

// Export for manual tracking
window.trackEvent = trackEvent;
