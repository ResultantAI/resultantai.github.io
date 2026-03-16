(function () {
  var page = document.currentScript && document.currentScript.getAttribute('data-ab-page');
  if (!page) return;

  var match = document.cookie.match(/(?:^|; )ab_variant=([ab])/);
  var variant;

  if (match) {
    variant = match[1];
  } else {
    variant = Math.random() < 0.5 ? 'a' : 'b';
    var expires = new Date(Date.now() + 30 * 864e5).toUTCString();
    document.cookie = 'ab_variant=' + variant + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  window.__abVariant = variant;

  // First visit redirect for variant B (subsequent visits handled by Vercel rewrites)
  if (!match && variant === 'b') {
    var map = {
      homepage: '/index-b',
      b2b: '/lp/b2b-automation/index-b',
      'voice-ai': '/lp/voice-ai/index-b',
      agency: '/lp/agency-automation/index-b'
    };
    if (map[page]) window.location.replace(map[page]);
  }
})();
