(function () {
  var match = document.cookie.match(/(?:^|; )ab_variant=([ab])/);
  var variant = match ? match[1] : null;
  if (!variant) return;

  var el = document.querySelector('[data-ab-page]');
  var page = el ? el.getAttribute('data-ab-page') : null;
  if (!page) return;

  window.__abVariant = variant;
  window.__abPage = page;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'ab_test',
    ab_variant: variant,
    ab_page: page
  });
})();
