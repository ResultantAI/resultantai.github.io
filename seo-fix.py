#!/usr/bin/env python3
"""
ResultantAI SEO Fix Script
Fixes all Ahrefs-reported issues:
- Generates comprehensive sitemap.xml
- Adds canonical tags
- Adds Open Graph + Twitter card meta tags
- Fixes duplicate content issues
"""

import os
import re
from datetime import datetime
from pathlib import Path
from html.parser import HTMLParser

BASE_DOMAIN = "https://resultantai.com"
SITE_ROOT = Path("/Users/cj/resultantai.github.io")

# Pages to exclude from sitemap
EXCLUDE_PATTERNS = [
    "_footer-template.html",
    ".adleg_template_footer.html",
    "test-demo.html",
    "chatbot-integration-snippet.html",
    "logistics-ticketing-OLD.html",
    "reddit-landing-white.html",  # Duplicate
]

# Duplicate pages that need canonical tags pointing to main versions
DUPLICATES = {
    "new-site/index.html": "/",
    "new-site/gateway.html": "/gateway.html",
    "new-site/propane.html": "/propane.html",
    "new-site/solutions.html": "/solutions.html",
    "new-site/solutions-agencies.html": "/solutions-agencies.html",
    "new-site/solutions-b2b.html": "/solutions-b2b.html",
    "new-site/solutions-field-services.html": "/solutions-field-services.html",
    "new-site/case-studies.html": "/case-studies.html",
}

class TitleExtractor(HTMLParser):
    """Extract page title from HTML"""
    def __init__(self):
        super().__init__()
        self.in_title = False
        self.title = ""

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data

def get_page_title(html_path):
    """Extract title from HTML file"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
            parser = TitleExtractor()
            parser.feed(content)
            return parser.title.strip() or "ResultantAI"
    except:
        return "ResultantAI"

def get_page_description(html_path):
    """Extract meta description from HTML file"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'<meta\s+name="description"\s+content="([^"]+)"', content, re.IGNORECASE)
            if match:
                return match.group(1)
            return "ResultantAI - Revenue Systems for Service Businesses. AI automation that pays for itself."
    except:
        return "ResultantAI - Revenue Systems for Service Businesses"

def find_all_html_files():
    """Find all HTML files to include in sitemap"""
    html_files = []

    for root, dirs, files in os.walk(SITE_ROOT):
        # Skip node_modules and hidden directories
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']

        for file in files:
            if file.endswith('.html'):
                rel_path = os.path.relpath(os.path.join(root, file), SITE_ROOT)

                # Skip excluded files
                if any(pattern in rel_path for pattern in EXCLUDE_PATTERNS):
                    continue

                html_files.append(rel_path)

    return sorted(html_files)

def generate_sitemap():
    """Generate comprehensive sitemap.xml"""
    html_files = find_all_html_files()

    sitemap_content = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
'''

    for html_file in html_files:
        # Convert file path to URL
        if html_file == "index.html":
            url_path = "/"
        elif html_file.endswith("/index.html"):
            url_path = "/" + html_file.replace("/index.html", "/")
        else:
            url_path = "/" + html_file.replace(".html", "")

        # Determine priority and changefreq
        if html_file == "index.html":
            priority = "1.0"
            changefreq = "daily"
        elif "blog/" in html_file:
            priority = "0.8"
            changefreq = "weekly"
        elif any(x in html_file for x in ["demo/", "work/", "tools/"]):
            priority = "0.6"
            changefreq = "monthly"
        elif "gateway" in html_file or "calculator" in html_file:
            priority = "0.9"
            changefreq = "weekly"
        else:
            priority = "0.7"
            changefreq = "monthly"

        # Last modified date
        file_path = SITE_ROOT / html_file
        try:
            mtime = datetime.fromtimestamp(file_path.stat().st_mtime)
            lastmod = mtime.strftime("%Y-%m-%d")
        except:
            lastmod = datetime.now().strftime("%Y-%m-%d")

        sitemap_content += f'''  <url>
    <loc>{BASE_DOMAIN}{url_path}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>
'''

    sitemap_content += '</urlset>\n'

    # Write sitemap
    sitemap_path = SITE_ROOT / "sitemap.xml"
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap_content)

    print(f"✅ Generated sitemap.xml with {len(html_files)} URLs")
    return len(html_files)

def add_meta_tags_to_page(html_path, canonical_url=None):
    """Add canonical, Open Graph, and Twitter card meta tags to a page"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if already has canonical tag (don't modify twice)
        if 'rel="canonical"' in content:
            return False

        # Get page info
        title = get_page_title(html_path)
        description = get_page_description(html_path)

        # Determine canonical URL
        if canonical_url is None:
            rel_path = str(html_path.relative_to(SITE_ROOT))
            if rel_path == "index.html":
                canonical_url = BASE_DOMAIN + "/"
            elif rel_path.endswith("/index.html"):
                canonical_url = BASE_DOMAIN + "/" + rel_path.replace("/index.html", "/")
            else:
                canonical_url = BASE_DOMAIN + "/" + rel_path.replace(".html", "")
        else:
            canonical_url = BASE_DOMAIN + canonical_url

        # Build meta tags
        meta_tags = f'''
  <!-- SEO -->
  <link rel="canonical" href="{canonical_url}">

  <!-- Open Graph -->
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:site_name" content="ResultantAI">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{description}">
'''

        # Insert meta tags after <head> tag
        if '<head>' in content:
            content = content.replace('<head>', '<head>' + meta_tags, 1)
        elif '<HEAD>' in content:
            content = content.replace('<HEAD>', '<HEAD>' + meta_tags, 1)
        else:
            # Can't find head tag, skip
            return False

        # Write back
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)

        return True

    except Exception as e:
        print(f"❌ Error processing {html_path}: {e}")
        return False

def fix_all_pages():
    """Add meta tags to all HTML pages"""
    html_files = find_all_html_files()
    fixed_count = 0

    for html_file in html_files:
        html_path = SITE_ROOT / html_file

        # Check if it's a duplicate page
        canonical_target = DUPLICATES.get(html_file)

        if add_meta_tags_to_page(html_path, canonical_target):
            fixed_count += 1
            if canonical_target:
                print(f"  📄 {html_file} → canonical to {canonical_target}")
            else:
                print(f"  📄 {html_file}")

    print(f"\n✅ Added meta tags to {fixed_count} pages")
    return fixed_count

def create_404_page():
    """Create a proper 404 page"""
    content = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Page Not Found | ResultantAI</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      text-align: center;
      max-width: 600px;
    }
    h1 {
      font-size: 120px;
      font-weight: 900;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 32px;
      margin-bottom: 20px;
      color: #e0e0e0;
    }
    p {
      font-size: 18px;
      color: #b0b0b0;
      margin-bottom: 40px;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      padding: 15px 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>
      The page you're looking for doesn't exist or has been moved.<br>
      Let's get you back on track.
    </p>
    <a href="/" class="btn">Go to Homepage</a>
  </div>
</body>
</html>'''

    with open(SITE_ROOT / "404.html", 'w') as f:
        f.write(content)

    print("✅ Created 404.html page")

def main():
    """Run all SEO fixes"""
    print("🚀 ResultantAI SEO Fix Script")
    print("=" * 50)

    print("\n📊 Step 1: Generating comprehensive sitemap.xml...")
    url_count = generate_sitemap()

    print("\n🏷️  Step 2: Adding meta tags to all pages...")
    fixed_count = fix_all_pages()

    print("\n❌ Step 3: Creating 404 page...")
    create_404_page()

    print("\n" + "=" * 50)
    print("✨ SEO Fix Complete!")
    print(f"   • {url_count} URLs in sitemap")
    print(f"   • {fixed_count} pages updated with meta tags")
    print(f"   • 404 page created")
    print("\nNext steps:")
    print("   1. Review changes with: git diff")
    print("   2. Commit and push to deploy")
    print("   3. Submit sitemap to Google Search Console")

if __name__ == "__main__":
    main()
