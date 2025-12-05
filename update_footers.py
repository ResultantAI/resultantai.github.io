#!/usr/bin/env python3
"""Quick script to update footer template in remaining case study pages"""

import re

# Read the footer CSS and HTML from adleg (our template)
with open('/Users/cj/resultantai.github.io/work/adleg/index.html', 'r') as f:
    adleg_content = f.read()

# Extract footer CSS (from line 318 onwards)
footer_css_match = re.search(r'(    /\* Footer \*/\s+\.footer \{.*?}\s+)\s+@media', adleg_content, re.DOTALL)
footer_css = footer_css_match.group(1).strip() if footer_css_match else ""

# Extract media query footer styles
media_footer_match = re.search(r'(@media.*?\{[^}]*?\.footer \{.*?flex-wrap: wrap;\s+}\s+})', adleg_content, re.DOTALL)
media_footer = media_footer_match.group(1) if media_footer_match else ""

# Extract footer HTML
footer_html_match = re.search(r'(<footer class="footer">.*?</footer>)', adleg_content, re.DOTALL)
footer_html = footer_html_match.group(1) if footer_html_match else ""

print("Extracted footer CSS length:", len(footer_css))
print("Extracted media query length:", len(media_footer))
print("Extracted footer HTML length:", len(footer_html))

# Pages to update
pages = [
    '/Users/cj/resultantai.github.io/work/hera-j/index.html',
    '/Users/cj/resultantai.github.io/work/wayne-conn/index.html'
]

for page_path in pages:
    with open(page_path, 'r') as f:
        content = f.read()

    # Replace old footer CSS
    content = re.sub(
        r'footer \{\s+border-top:.*?}\s*\n\s*\n',
        footer_css + '\n\n',
        content,
        flags=re.DOTALL
    )

    # Add media query footer styles before the closing } of @media block
    if '@media (max-width: 768px)' in content:
        # Find the media block and add footer styles before its closing brace
        content = re.sub(
            r'(@media.*?padding: 40px 24px;\s+}\s+)(})',
            r'\1.footer {\n        padding: 48px 0 24px;\n      }\n      .footer__grid {\n        grid-template-columns: 1fr;\n        gap: 32px;\n      }\n      .footer__social {\n        flex-wrap: wrap;\n      }\n    \2',
            content,
            flags=re.DOTALL
        )

    # Replace old footer HTML
    content = re.sub(
        r'<footer>.*?</footer>',
        footer_html,
        content,
        flags=re.DOTALL
    )

    with open(page_path, 'w') as f:
        f.write(content)

    print(f"Updated: {page_path}")

print("Done!")
