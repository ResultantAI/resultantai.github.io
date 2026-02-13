# ResultantAI - Revenue Systems for Service Businesses

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue.svg)](https://resultantai.com)
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fresultantai.com)](https://resultantai.com)

Revenue systems for service businesses. We build AI systems that recover revenue lost to missed calls, paper tickets, and manual work.

🌐 **Live Site:** [resultantai.com](https://resultantai.com)

---

## What We Build

AI automation systems that pay for themselves in weeks:

- **Voice AI Receptionists** - Answer 100% of calls, book appointments, reduce no-shows
- **Digital Dispatch Systems** - Replace paper tickets with real-time mobile coordination
- **Revenue Recovery Tools** - Capture missed revenue from calls, tickets, and manual processes

**Industries Served:**
- Healthcare (Medical, Dental, Specialty Practices)
- HVAC / Plumbing / Home Services
- Propane & Fuel Delivery
- Ready-Mix Concrete
- Logistics & Freight

---

## Repository Structure

```
resultantai.github.io/
├── index.html                          # Homepage
├── voice-roi-calculator.html           # Voice Agent ROI Calculator
├── healthcare-voice-ai.html            # Healthcare AI landing page
├── propane.html                        # Propane dispatch landing page
├── concrete.html                       # Concrete dispatch landing page
├── logistics.html                      # Logistics & freight page
├── gateway.html                        # AI Gateway (cost control)
├── case-studies.html                   # Customer case studies
├── roi-calculator/                     # ROI calculator React app assets
│   └── assets/                        # Compiled JS/CSS bundles
├── demo/
│   ├── logistics-demo-interactive/    # Live logistics dispatch demo
│   └── propane-demo/                  # Live propane dispatch demo
├── blog/                              # SEO-optimized content
│   ├── index.html                     # Blog hub
│   ├── propane-dispatch-roi/          # Propane ROI guide
│   ├── propane-emergency-calls/       # Emergency call handling
│   ├── concrete-dispatch-software/    # Concrete automation
│   └── ... (20+ vertical-specific guides)
├── css/
│   └── styles.css                     # Design system (emerald green accent)
├── js/
│   └── main.js                        # Scroll effects, nav, utilities
└── sitemap.xml                        # SEO sitemap
```

---

## Key Features

### Voice Agent ROI Calculator

**Live:** [resultantai.com/voice-roi-calculator](https://resultantai.com/voice-roi-calculator)

Interactive calculator that helps businesses quantify revenue lost from missed calls:
- 8-step industry-specific quiz
- Real-time ROI calculations
- Free analysis + $29 premium report with implementation roadmap
- Stripe checkout integration
- Separate backend API (Vercel serverless functions)

**Tech Stack:**
- Frontend: React 18 + Vite (178KB bundle)
- Backend: Vercel serverless functions
- Payment: Stripe Checkout
- API Repo: [github.com/ResultantAI/roi-calculator](https://github.com/ResultantAI/roi-calculator)

### Interactive Demos

**Logistics Dispatch:** [resultantai.com/demo/logistics-demo-interactive](https://resultantai.com/demo/logistics-demo-interactive)
- Full working prototype
- 9 different views (Dashboard, Create Ticket, Active Loads, Driver App, etc.)
- Mobile-responsive design
- No backend required (pure frontend demo)

**Propane Dispatch:** [resultantai.com/demo/propane-demo](https://resultantai.com/demo/propane-demo)
- Customer portal, tank monitoring, emergency call handling
- Industry-specific workflows
- Interactive customer cards and tank clusters

### Healthcare Voice AI

**Live:** [resultantai.com/healthcare-voice-ai](https://resultantai.com/healthcare-voice-ai)

HIPAA-compliant AI receptionist landing page:
- Transparent pricing (setup + monthly support)
- Research-backed stats ($150K/year lost to no-shows)
- EHR integration (Epic, Athena, eClinicalWorks)
- No contact info (all CTAs → HubSpot scheduling)

---

## Design System

**Brand Colors:**
- Primary Background: `#0f172a` (dark navy)
- Secondary Background: `#0a0f1a` (darker navy)
- Accent: `#10b981` (emerald green)
- Text Primary: `#f1f5f9` (off-white)
- Text Secondary: `#94a3b8` (slate gray)

**Typography:**
- Sans: Inter (400, 500, 600, 700, 800, 900)
- Mono: JetBrains Mono (400, 500, 600)

**Components:**
- Cards: `#151d2e` background, rounded corners, hover effects
- Buttons: Emerald gradient (`#10b981` → `#059669`)
- Navigation: Sticky header with backdrop blur
- Grid Background: Subtle emerald grid overlay

---

## SEO Strategy

### Content Pillars

1. **Vertical-Specific ROI Guides**
   - Propane dispatch ROI
   - Concrete dispatch automation
   - HVAC voice AI
   - Medical practice automation

2. **Problem-Solution Content**
   - Emergency call handling (propane)
   - No-show reduction (healthcare)
   - Paper ticket elimination (construction)

3. **Competitive Positioning**
   - "Best alternative to [competitor]"
   - Feature comparison pages
   - Transparent pricing vs. enterprise-only

### Internal Linking

- All orphan pages now have navigation paths
- Blog posts link to relevant landing pages
- Case studies link to product pages
- Footer navigation on all pages

---

## Analytics & Tracking

**HubSpot Integration:**
- All CTAs route to HubSpot meeting scheduler
- Lead capture forms on ROI calculator
- Email sequences triggered on form submission

**Event Tracking:**
- Page views
- Button clicks
- Form submissions
- Demo interactions
- Calculator completions

---

## Deployment

**Hosting:** GitHub Pages (automatic deployment on push to `main`)

**Custom Domain:** resultantai.com (DNS via CloudFlare)

**SSL:** Automatic via GitHub Pages

**Build Process:**
- Static HTML/CSS/JS (no build step for main site)
- ROI Calculator: Vite build → `/roi-calculator/assets/`
- Demos: Vite build → `/demo/[demo-name]/`

**Deployment Workflow:**
1. Create feature branch
2. Make changes
3. Push to GitHub
4. Create PR
5. Merge to `main`
6. GitHub Pages auto-deploys (30-60 seconds)

---

## External Dependencies

**Fonts:**
- Google Fonts (Inter, JetBrains Mono)
- ROI Calculator: IBM Plex Sans, IBM Plex Mono, Instrument Serif

**APIs:**
- HubSpot (meeting scheduling, forms)
- Stripe (ROI calculator payments)
- Vercel (ROI calculator backend)

**CDNs:**
- None (self-hosted for performance)

---

## Contributing

This is the public marketing website for ResultantAI. Internal development documentation is in private repos.

**Public Issues Welcome:**
- Typos and content errors
- Broken links
- Mobile responsiveness issues
- Accessibility improvements

**Not Accepting:**
- Feature requests (use internal roadmap)
- Design changes (maintain brand consistency)
- Copy rewrites (internal marketing team owns messaging)

---

## License

MIT License - See LICENSE file for details

Website content © 2026 ResultantAI. All rights reserved.

---

## Contact

**ResultantAI**
Revenue systems for service businesses.
Built with AI. Run by humans.

- **Website:** [resultantai.com](https://resultantai.com)
- **ROI Calculator:** [resultantai.com/voice-roi-calculator](https://resultantai.com/voice-roi-calculator)
- **Case Studies:** [resultantai.com/case-studies](https://resultantai.com/case-studies)
- **Blog:** [resultantai.com/blog](https://resultantai.com/blog)
- **Book a Demo:** [meetings.hubspot.com/resultantai](https://meetings.hubspot.com/resultantai/paper-to-digital)

---

## Related Repositories

- **ROI Calculator Backend:** [github.com/ResultantAI/roi-calculator](https://github.com/ResultantAI/roi-calculator)
- **Beaver Pumice System:** Private (customer deployment)
- **Clawdbot System:** Private (internal operations)
