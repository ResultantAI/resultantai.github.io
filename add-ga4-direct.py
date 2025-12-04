#!/usr/bin/env python3
"""
Add direct Google Analytics 4 tracking to all HTML pages
This ensures GA4 works immediately without waiting for GTM configuration
"""

import os
import re
from pathlib import Path

GA4_SCRIPT = """
  <!-- Google Analytics 4 (Direct) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-DY95GS9YX5"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-DY95GS9YX5');
  </script>
  <!-- End Google Analytics 4 -->

"""

def add_ga4_to_file(filepath):
    """Add GA4 direct script to an HTML file"""
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has direct GA4
    if 'G-DY95GS9YX5' in content and 'gtag/js' in content:
        print(f"  ✓ Already has GA4 direct - skipping")
        return False

    # Add GA4 before GTM
    gtm_pattern = r'(\s*<!-- Google Tag Manager -->)'
    if re.search(gtm_pattern, content):
        content = re.sub(
            gtm_pattern,
            GA4_SCRIPT + r'\1',
            content,
            count=1
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Added GA4 direct tracking")
        return True
    else:
        print(f"  ✗ No GTM found - cannot add GA4")
        return False

def main():
    """Add GA4 to all HTML files"""
    base_dir = Path(__file__).parent
    html_files = list(base_dir.rglob('*.html'))

    print(f"Found {len(html_files)} HTML files\n")

    updated = 0
    skipped = 0
    failed = 0

    for html_file in html_files:
        result = add_ga4_to_file(html_file)
        if result is True:
            updated += 1
        elif result is False:
            skipped += 1
        else:
            failed += 1

    print(f"\n{'='*50}")
    print(f"Summary:")
    print(f"  Updated: {updated}")
    print(f"  Skipped: {skipped}")
    print(f"  Failed: {failed}")
    print(f"{'='*50}")

if __name__ == '__main__':
    main()
