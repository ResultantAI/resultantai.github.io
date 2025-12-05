# ResultantAI Gateway - Marketing Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue.svg)](https://resultantai.github.io)
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fresultantai.github.io)](https://resultantai.github.io)

**AI Gateway marketing website and landing pages.** Built for developers, agencies, and builders who need predictable AI API pricing with multi-provider support.

🌐 **Live Site:** [resultantai.github.io](https://resultantai.github.io)

---

## 📁 Repository Structure

This repository contains the complete marketing website for AI Gateway, a unified API for OpenAI, Anthropic Claude, and Google Gemini.

```
resultantai.github.io/
├── index.html                    # Homepage
├── gateway/
│   └── index.html               # Main gateway landing page
├── pricing/
│   └── index.html               # Pricing tiers and Founding Partner offer
├── blog/
│   ├── index.html               # Blog hub page
│   ├── llm-cost-optimization-guide.html
│   ├── intelligent-llm-routing-guide.html
│   ├── llm-pricing-comparison-2025.html
│   ├── openai-vs-anthropic-cost-comparison.html
│   ├── per-client-billing-agencies.html
│   └── prevent-ai-bill-shock-makecom.html
├── compare/
│   ├── index.html               # Comparison hub
│   ├── direct-api.html          # vs Direct API
│   ├── portkey.html             # vs Portkey
│   ├── helicone.html            # vs Helicone
│   └── litellm.html             # vs LiteLLM
├── reddit/
│   ├── index.html               # Bill Shock landing page
│   ├── bill-shock/
│   │   └── index.html           # Interactive cost calculator
│   └── one-key/
│       └── index.html           # Developer-focused SDK page
├── js/
│   └── tracking.js              # Analytics and event tracking
└── sitemap.xml                  # SEO sitemap
```

---

## 🎯 What is AI Gateway?

AI Gateway is a unified API that provides:

- **Flat-rate pricing:** $99/month includes 3M tokens (no surprises)
- **Multi-provider support:** OpenAI, Claude, Gemini through one API key
- **Intelligent routing:** Automatically select cheapest model for each task (40-50% savings)
- **Per-client tracking:** Built-in cost tracking for agencies
- **Budget controls:** Spending caps, alerts, and automatic kill switches
- **Automatic failover:** Zero downtime when providers go down

**Target Audience:**
- Agencies managing multiple client AI costs
- Developers building AI-powered products
- Make.com/Zapier users preventing bill shock
- SaaS companies needing predictable LLM pricing

---

## 🚀 Key Pages

### Landing Pages

1. **[Gateway Landing Page](/gateway/index.html)**
   - Main product landing page
   - Founding Partner offer ($499/year, 58% off)
   - Social proof and trust signals
   - Email capture form with Make.com integration

2. **[Pricing Page](/pricing/index.html)**
   - 6 pricing tiers (Free, Starter, Pro, Agency, Scale, Enterprise)
   - Founding Partner section with social proof
   - Feature comparison table
   - FAQ section

3. **[Homepage](/index.html)**
   - Product overview
   - Feature highlights
   - Social proof elements

### Reddit Campaign Landing Pages

1. **[Bill Shock Page](/reddit/index.html)**
   - Focused on preventing unexpected AI bills
   - Minimal design, fast load
   - Tracking: `source: 'reddit-billshock'`

2. **[Bill Shock Calculator](/reddit/bill-shock/index.html)**
   - Interactive cost predictor slider
   - Real-time savings calculation
   - Email capture with calculator results

3. **[One-Key Page](/reddit/one-key/index.html)**
   - Developer-focused SDK messaging
   - Code examples and integrations
   - "One API key. Every AI provider."

### Content Marketing

**Blog Posts** (6 published):
- [LLM Cost Optimization Guide](/blog/llm-cost-optimization-guide.html)
- [Intelligent LLM Routing Guide](/blog/intelligent-llm-routing-guide.html)
- [LLM Pricing Comparison 2025](/blog/llm-pricing-comparison-2025.html)
- [OpenAI vs Anthropic: Cost Comparison](/blog/openai-vs-anthropic-cost-comparison.html)
- [Per-Client Billing for Agencies](/blog/per-client-billing-agencies.html)
- [Prevent AI Bill Shock with Make.com](/blog/prevent-ai-bill-shock-makecom.html)

**Comparison Pages** (5 published):
- [AI Gateway vs Direct API](/compare/direct-api.html)
- [AI Gateway vs Portkey](/compare/portkey.html)
- [AI Gateway vs Helicone](/compare/helicone.html)
- [AI Gateway vs LiteLLM](/compare/litellm.html)

---

## 🔧 Technical Stack

### Frontend
- **Framework:** Static HTML/CSS/JavaScript (GitHub Pages)
- **Styling:** Custom CSS with CSS variables, Tailwind CSS (pricing page)
- **Fonts:** Space Grotesk (headings), DM Sans (body)
- **Design:** Dark theme (#0a0d12 background), emerald accent (#10b981)

### Analytics & Tracking
- **Google Analytics 4:** G-DY95GS9YX5
- **Google Tag Manager:** GTM-WBGJ9J8X
- **Reddit Pixel:** a2_htj8d1flphh9
- **Custom Events:** CTA clicks, form submissions, scroll depth
- **Tracking Script:** `/js/tracking.js` (comprehensive event tracking)

### Integrations
- **Form Submissions:** Make.com webhook
  - Endpoint: `https://hook.us2.make.com/n8deqd9mfxcqxeoe19j0etwfxnuq12pa`
  - Payload includes: email, use_case, source, landing_page, variant, UTM params
- **Scheduling:** HubSpot Meetings (Founding Partner calls)
- **SEO:** Schema.org markup (FAQPage, Product, Organization)

### Form Tracking Fields

All forms submit with:
```javascript
{
  email: "user@example.com",
  use_case: "agency|saas|nocode|internal|other",
  source: "gateway-founding-partner|reddit-billshock|reddit-onekey",
  landing_page: "gateway|bill-shock|one-key|billing",
  variant: "social-proof-v1|dark",
  utm_source: "...",
  utm_medium: "...",
  utm_campaign: "...",
  utm_content: "...",
  utm_term: "...",
  timestamp: "2024-12-04T...",
  page_url: "https://...",
  referrer: "https://..."
}
```

---

## 🎨 Design System

### Colors
```css
--bg: #0a0d12          /* Dark background */
--card: #111820         /* Card backgrounds */
--border: #1e2a3a      /* Borders */
--text: #94a3b8        /* Body text */
--text-bright: #e2e8f0 /* Headings */
--accent: #10b981      /* Emerald green (primary CTA) */
--danger: #ef4444      /* Red (urgency elements) */
```

### Typography
- **Headings:** Space Grotesk (700 weight)
- **Body:** DM Sans (400 regular, 500 medium, 600 semibold)
- **Code/Monospace:** Monaco, monospace

### Components
- **Badges:** Pill-shaped with accent glow background
- **Forms:** Dark cards with emerald focus states
- **Buttons:** Emerald background, hover lift effect
- **FAQ:** Collapsible accordion with + icon toggle

---

## 📊 Conversion Optimization

### Current Strategy (Professional, Trust-Focused)

**What We Do:**
- ✅ Subtle urgency banner (no countdown timer)
- ✅ Social proof ("Join 25+ Founding Partners")
- ✅ Clear price anchoring ($499/year vs $1,188)
- ✅ Professional CTAs ("Get Started" vs "Claim Now")
- ✅ Value-focused messaging (14-day trial, no credit card)

**What We Avoid:**
- ❌ Countdown timers (27+ days doesn't create urgency)
- ❌ Fake scarcity ("Only 12 spots" that never changes)
- ❌ Excessive emojis and urgency signals
- ❌ "Guru course" marketing patterns
- ❌ Aggressive sales language

**Reasoning:**
Our ICP (developers, agency owners) is highly skeptical of marketing tactics. They pattern-match urgency overload to scams. Professional, trust-building design converts better than aggressive urgency.

---

## 🚀 Deployment

### GitHub Pages Configuration

This site is hosted on **GitHub Pages** and automatically deploys from the `main` branch.

**Deployment Process:**
1. Push changes to `main` branch
2. GitHub Actions builds and deploys automatically
3. Live at: https://resultantai.github.io
4. Custom domain (if configured): https://resultantai.com

**Build Time:** ~2-3 minutes after push

### Local Development

```bash
# Clone repository
git clone https://github.com/ResultantAI/resultantai.github.io.git
cd resultantai.github.io

# Start local server (Python)
python -m http.server 8000

# Or use Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"

# View site
open http://localhost:8000
```

---

## 📈 SEO & Performance

### SEO Features
- ✅ Google Search Console verification
- ✅ Canonical URLs on all pages
- ✅ Schema.org structured data (FAQPage, Product, Organization)
- ✅ Comprehensive sitemap.xml (268 URLs)
- ✅ Meta descriptions on all pages
- ✅ humans.txt and robots.txt
- ✅ AI-quotable definitions for LLM discovery
- ⚠️ Open Graph tags (partial - needs expansion)
- ⚠️ Twitter Card markup (missing on most pages)

### Performance
- **Load Time:** < 2 seconds (static HTML, minimal JS)
- **Page Size:** ~50-100KB per page (no heavy frameworks)
- **Mobile-Friendly:** Responsive design with viewport meta tag
- **Accessibility:** ARIA labels, semantic HTML, keyboard navigation

### AI Discovery (AISEO)
All pages include AI-quotable definitions:
- "What is an LLM Gateway?"
- "What is Intelligent LLM Routing?"
- "What is AI Bill Shock?"

These are structured with Schema.org DefinedTerm markup for AI search engines (Perplexity, Claude, ChatGPT).

---

## 🧪 Testing

### Pre-Deployment Checklist

Before merging to `main`:
- [ ] All forms submit correctly to Make.com webhook
- [ ] Reddit Pixel fires Lead event on form submission
- [ ] Google Analytics tracks PageView events
- [ ] All internal links work (no 404s)
- [ ] Mobile responsive on iPhone/Android
- [ ] Dark theme displays correctly
- [ ] Countdown timers removed (professional approach)
- [ ] Social proof numbers are accurate
- [ ] Tracking variant matches current A/B test

### Form Testing

```bash
# Test payload structure
# Open browser console on /gateway/index.html
# Submit form and check Network tab for webhook payload

Expected payload:
{
  "email": "test@example.com",
  "use_case": "agency",
  "source": "gateway-founding-partner",
  "landing_page": "gateway",
  "variant": "social-proof-v1",
  "utm_source": "reddit",
  "timestamp": "2024-12-04T...",
  "page_url": "https://resultantai.github.io/gateway/",
  "referrer": ""
}
```

---

## 📝 Content Guidelines

### Voice & Tone
- **Professional, not salesy:** We're building for skeptical developers
- **Technical, not fluffy:** Specific numbers, clear comparisons
- **Transparent, not hypey:** Honest about limitations and trade-offs
- **Helpful, not pushy:** Educate first, sell second

### Messaging Framework

**Problem:**
- Unpredictable AI bills (OpenAI jumped from $47 to $312)
- Managing multiple API keys (OpenAI, Claude, Gemini)
- No per-client cost tracking for agencies

**Solution:**
- Flat-rate pricing ($99/month includes 3M tokens)
- One API key for all providers
- Built-in per-client tracking

**Proof:**
- 25+ Founding Partners (social proof)
- 40-50% cost savings (intelligent routing)
- $689/year savings (price locked forever)

---

## 🛠️ Maintenance

### Regular Updates

**Monthly:**
- Update social proof numbers ("25+ Founding Partners" → "50+")
- Review and refresh blog content for SEO
- Check for broken links (dead competitor sites, etc.)
- Update pricing if plans change

**Quarterly:**
- Refresh comparison pages (competitor pricing changes)
- Update LLM pricing tables (model costs change frequently)
- Review Google Analytics for top-performing content
- A/B test new landing page variants

**Annually:**
- Update copyright year in footers
- Refresh testimonials and case studies
- Review and update technical documentation
- Archive outdated blog posts

---

## 🤝 Contributing

### Quick Edits
- Fix typos → Edit directly in GitHub web interface → Commit to `main`
- Update pricing → Edit `/pricing/index.html` → Commit
- Add blog post → Create new HTML in `/blog/` → Update index

### Major Changes (Use Pull Requests)
1. Create new branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally (http://localhost:8000)
4. Commit with descriptive message
5. Push: `git push origin feature/your-feature`
6. Open PR on GitHub
7. Review, merge to `main`

### Branch Naming
- `feature/` - New features (landing pages, blog posts)
- `fix/` - Bug fixes (broken links, typos)
- `update/` - Content updates (pricing, social proof numbers)
- `redesign/` - Visual/UX changes

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🏢 About ResultantAI

**ResultantAI** builds AI Gateway - the unified API for OpenAI, Anthropic, and Google.

**Product:**
- Flat-rate AI pricing ($99/month)
- Multi-provider support (one API key)
- Intelligent routing (40-50% savings)
- Per-client tracking (for agencies)
- Budget controls and failover

**Team:**
- Founded 2024
- Bootstrapped (no VC)
- Remote-first

**Contact:**
- Website: [resultantai.github.io](https://resultantai.github.io)
- Email: chris@resultantai.com
- GitHub: [@ResultantAI](https://github.com/ResultantAI)

---

## 🔗 Links

- **Live Site:** [resultantai.github.io](https://resultantai.github.io)
- **Documentation:** [Gateway Docs](/gateway)
- **Pricing:** [Pricing Page](/pricing)
- **Blog:** [Content Library](/blog)
- **Comparisons:** [vs Competitors](/compare)

---

**Built with ❤️ by ResultantAI** | **Powered by Claude AI** | **MIT Licensed**

*Transparent AI pricing. No surprises.*
