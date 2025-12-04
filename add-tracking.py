#!/usr/bin/env python3
"""
Add Google Analytics and Tag Manager tracking to all HTML pages
"""

import os
import re
from pathlib import Path

# Tracking snippets
GTM_HEAD = """
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WBGJ9J8X');</script>
  <!-- End Google Tag Manager -->

  <!-- Tracking Script -->
  <script src="/js/tracking.js" defer></script>
"""

GTM_BODY = """  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WBGJ9J8X"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

"""

SEARCH_CONSOLE = '  <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE">\n'

def add_tracking_to_file(filepath):
    """Add tracking code to an HTML file"""
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has GTM
    if 'GTM-WBGJ9J8X' in content:
        print(f"  ✓ Already has tracking - skipping")
        return False

    modified = False

    # Add Search Console verification after description meta tag (if not present)
    if 'google-site-verification' not in content:
        # Find description meta tag
        desc_pattern = r'(<meta name="description"[^>]*>)'
        if re.search(desc_pattern, content):
            content = re.sub(
                desc_pattern,
                r'\1\n\n  <!-- Google Search Console Verification -->\n' + SEARCH_CONSOLE,
                content,
                count=1
            )
            modified = True

    # Add GTM head script before </head>
    if '</head>' in content:
        content = content.replace('</head>', GTM_HEAD + '</head>', 1)
        modified = True

    # Add GTM body noscript after <body>
    body_pattern = r'(<body[^>]*>)'
    if re.search(body_pattern, content):
        content = re.sub(
            body_pattern,
            r'\1\n' + GTM_BODY,
            content,
            count=1
        )
        modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Added tracking code")
        return True
    else:
        print(f"  ✗ Could not add tracking (unexpected HTML structure)")
        return False

def main():
    """Add tracking to all HTML files"""
    base_dir = Path(__file__).parent
    html_files = list(base_dir.rglob('*.html'))

    print(f"Found {len(html_files)} HTML files\n")

    updated = 0
    skipped = 0
    failed = 0

    for html_file in html_files:
        result = add_tracking_to_file(html_file)
        if result is True:
            updated += 1
        elif result is False:
            skipped += 1
        else:
            failed += 1

    print(f"\n{'='*50}")
    print(f"Summary:")
    print(f"  Updated: {updated}")
    print(f"  Skipped (already has tracking): {skipped}")
    print(f"  Failed: {failed}")
    print(f"{'='*50}")

if __name__ == '__main__':
    main()
