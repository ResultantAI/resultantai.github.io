# PHASE 1 AUDIT — ResultantAI Marketing Site
**Repo:** `/Users/cj/resultantai.github.io`
**Date:** 2026-07-12
**Total HTML files:** ~182

---

## 1. PAGE INVENTORY

| URL | Title | Meta Description | H1 | Footer Gen | Booking Link | Copyright |
|-----|-------|------------------|----|------------|--------------|-----------|
| `/` | ResultantAI — AI Systems for B2B Revenue Operations | AI systems for B2B revenue operations. CRM automation, voice AI agents, and white-label agency tools. +$5K/mo captured. 97% time savings. 18-day payback. | We Build the Systems That Run Your Revenue | 2026 | quick-chat-30 | 2026 |
| `/about/` | About ResultantAI — AI Systems for B2B Revenue Operations | Chris Mott | (meta: "generated over $3M in pipeline") | About — no H1 found | 2026 | quick-chat-30 | 2026 |
| `/pricing/` | AI Gateway Pricing — 5M Tokens at $49/mo | AI gateway pricing starting at $49/mo... | (AI Gateway product page, wrong positioning) | 2026 | quick-chat-30 | 2026 |
| `/faq/` | FAQ — ResultantAI | AI Voice Agents & Automation | (FAQ page) | 2026 | quick-chat-30 | 2026 |
| `/case-studies` (root .html) | Case Studies — Real Results | "...across industries today.'ve helped..." BUG | Real Systems. Real Results. | 2026 | quick-chat-30 | 2026 |
| `/work/` | (portfolio index) | "97% time savings, 3X leads, $17K+ revenue generated. See our portfolio..." | (3 case studies listed) | 2026 | quick-chat-30 | 2026 |
| `/work/wayne-conn/` | 18 Missed Calls to Zero | Wayne Conn Plumbing case study, $6,285 in 2 weeks | 18 Missed Calls to Zero: How Wayne Conn... | 2026 | (not found) | 2026 |
| `/work/adleg/` | 90 Minutes to 2 Minutes | Adleg, eliminated 97% manual work, 4 clients in 30 days | 90 Minutes to 2 Minutes: How Adleg 10X'd... | 2026 | (not found) | 2026 |
| `/work/hera-j/` | 3X Qualified Leads | Jami Consulting case study | 3X Qualified Leads Without Hiring | 2026 | (not found) | 2026 |
| `/work/cisionvision.html` | (legacy .html in /work/) | (not checked) | (unknown) | unknown | unknown | unknown |
| `/work/honcho.html` | (legacy .html in /work/) | (not checked) | (unknown) | unknown | unknown | unknown |
| `/work/wayne-conn.html` | (legacy .html in /work/) | (not checked) | (unknown) | unknown | unknown | unknown |
| `/voice-ai/` | Voice AI for Service Businesses | Voice AI agents that answer calls 24/7... | (hero-based structure) | 2026 | quick-chat-30 | 2026 |
| `/contact-us/` | Contact Us — ResultantAI | (not extracted) | (contact page) | 2026 | quick-chat-30 | 2026 |
| `/lp/b2b-automation/` | (B2B Automation LP) | CRM automation, outbound pipeline systems... | (LP structure) | 2026 | quick-chat-30 | 2026 |
| `/lp/voice-ai/` | (Voice AI LP) | Voice AI agents for professional services... | (LP structure) | 2026 | quick-chat-30 | 2026 |
| `/lp/agency-automation/` | (Agency Automation LP) | White-label AI automation for agencies... | (LP structure) | 2026 | quick-chat-30 | 2026 |
| `/lp/construction/` through `/lp/tree-services/` | (Vertical LPs x9) | Field service vertical pages | (LP structure) | 2026 | quick-chat-30 | 2026 |
| `/lp/dental/` | (Dental LP) | (LP structure) | (LP structure) | 2026 | quick-chat-30 | 2026 |
| `/aeo-geo-audit/` | AEO/GEO Authority Audit | Fixed-price 14-day AEO/GEO audit... $4,500 | (LP structure) | 2026 | quick-chat-30 | 2026 |
| `/gateway/` (or gateway.html) | AI Gateway — Predictable AI Costs | Save 60-80% on AI spend | (product page) | 2026 | quick-chat-30 | 2026 |
| `/blog/` | (Blog index) | Blog listing | (Blog listing) | 2026 | quick-chat-30 | 2026 |
| `/compare/helicone.html` etc. | (Comparison pages) | vs Helicone, Portkey, LiteLLM, Direct API | (compare structure) | unknown | unknown | unknown |

**LEGACY ROOT .HTML FILES (confirmed present):**
- `solutions.html`
- `gateway.html`
- `case-studies.html` (has meta description bug)
- `case-study-beaver-pumice.html`
- `logistics.html`
- `cpa.html`
- `staffing.html`
- `solutions-agencies.html`
- `solutions-b2b.html`
- `solutions-field-services.html`
- `healthcare-scheduling.html`
- `healthcare-voice-ai.html`
- `concrete.html`
- `concrete-calculator.html`
- `propane.html`
- `logistics-ticketing-OLD.html`
- `paper-to-digital.html`
- `paper-to-digital-short.html`
- `winter-readiness.html`
- `roi-calculator.html`
- `voice-roi-calculator.html`
- `automation-assessment.html`
- `index-b.html` / `index-control.html` (A/B test variants, not linked)
- `audit.html`, `portal-demo.html`, `test-demo.html`, `chatbot-integration-snippet.html` (internal tools)
- `newsletter-thanks.html` (has meta bug)
- `404.html`

---

## 2. INTERNAL LINK MAP — ISSUES

### Legacy .html file links still in navigation
- `case-studies.html` nav uses `solutions.html` and `gateway.html` (not `/solutions/` or `/gateway/`)
- Affects all pages using the legacy nav include

### Broken / outdated links
| Source File | Bad Link | Correct Path | Severity |
|-------------|----------|--------------|----------|
| `llms.txt` line 101 | `meetings.hubspot.com/chris4642/ai-gateway-founding-partner` | `meetings.hubspot.com/resultantai/quick-chat-30` | CRITICAL |
| `llms.txt` | `/case-study-beaver-pumice` | `/case-studies/beaver-pumice/` (after migration) | HIGH |
| `llms.txt` | `/work/hera-j/` | `/case-studies/hometown-cap/` or `/case-studies/jami-consulting/` (TBD) | HIGH |
| `llms.txt` | Entire "Industry Verticals" section | Remove field service verticals, replace with B2B verticals | HIGH |
| `sitemap.xml` | `/test-demo` (noindex in robots.txt) | Remove from sitemap | MEDIUM |
| `sitemap.xml` | `/newsletter-thanks` (noindex) | Remove from sitemap | MEDIUM |
| `sitemap.xml` | `/logistics-ticketing-OLD.html` | Remove from sitemap | MEDIUM |
| Various | `/discovery` booking path | 301 → `quick-chat-30` | MEDIUM |
| Various | `/paper-to-digital` booking path | 301 → `quick-chat-30` | MEDIUM |
| `compare/*.html` | `.html` extension in hrefs | Canonical path without `.html` | LOW |

### Orphan pages (no inbound internal links)
- `/new-site/` directory (entire staging section, should be deleted or noindexed)
- `/demo/` subdirectories (intentional exclusion from nav, but in sitemap)
- `/index-b.html`, `/index-control.html` (A/B variants)
- `/portal-demo.html`, `/audit.html`, `/test-demo.html`
- `/cisionvision.html`, `/honcho.html` under `/work/` (legacy .html case studies)
- `/case-study-beaver-pumice.html` (root-level, not linked from /work/ or /case-studies/)

---

## 3. CLAIMS REGISTRY

Claims marked RETIRE should be replaced with the canonical values before any Phase 2 changes.

### Wayne Conn Plumbing (Home Services / Voice AI)

| Claim | Value | Files | Canonical? |
|-------|-------|-------|------------|
| Revenue captured | "+$5K/month" | `index.html` lines 184, 339, 395; meta description; trust bar; multiple LPs | **RETIRE** — use $6,285/2wks |
| Revenue captured | "$6,285 in 2 weeks" | `work/wayne-conn/index.html` throughout | KEEP |
| Missed calls | "60% missed calls to 100% capture" | `index.html` line 345; multiple LPs | **RETIRE** — use "18 missed calls/week to zero" |
| Missed calls | "18 missed calls per week to zero" | `work/wayne-conn/index.html` | KEEP |
| Payback period | "18-day payback" | `index.html`; `work/wayne-conn/` | KEEP |
| Response time | "20 min to 10 sec" | `work/wayne-conn/index.html` | KEEP |
| Review body (JSON-LD) | "Went from missing 40% of after-hours calls to capturing every lead. +$5K/month in 60 days." | `index.html` line 95 | **RETIRE** — inconsistent with case study |

**Conflict:** Homepage uses +$5K/mo (60-day figure). Case study page uses $6,285/2wks. These are different time windows and different dollar amounts. Canonical registry selects $6,285/2 weeks.

### MCA Voice System (Financial Services / Voice AI)
**NOTE: /work/hera-j/, /work/honcho.html, and /work/cisionvision.html all appear to be the same engagement. Confirm client display name with Chris (HometownCap vs Jami Consulting) before publishing.**

| Claim | Value | Files | Canonical? |
|-------|-------|-------|------------|
| Daily call volume | "200+ outbound calls/day" | TBD (pull from client reporting) | PENDING — do not publish until verified |
| Lead volume | "3X qualified lead volume" | `work/hera-j/index.html` title | KEEP |
| Manual time reduction | "75% reduction in manual calling time" | TBD | PENDING |
| Document collection | "5 days to 1.5 days" | TBD | PENDING |
| Slug | `/work/hera-j/` | (internal codename) | **301 → new public slug** |

### VisionaryAI / AZ Seniors Rising (Healthcare / Voice AI)
No page exists yet. Approved for publication per canonical registry. Pull call volume from client reporting before including numbers.

### Beaver Pumice (Industrial / Custom Software)
**NOTE:** Currently at `/case-study-beaver-pumice.html` (root, no canonical path, not in nav). Needs migration.

| Claim | Value | Files | Canonical? |
|-------|-------|-------|------------|
| Ticket time | "5+ min to 30 seconds" | `case-study-beaver-pumice.html` | KEEP |
| Lost ticket cost | "~$500/week to zero" | `case-study-beaver-pumice.html` | KEEP |
| Office data entry | "2+ hrs/day eliminated" | `case-study-beaver-pumice.html` | KEEP |
| Payback period | "5-week payback" | `case-study-beaver-pumice.html` | KEEP |
| "Why didn't we do this 5 years ago?" | Pull quote | `case-study-beaver-pumice.html` | **RETIRE** unless independently verifiable |
| Lucas quote (Upwork) | "The truck loading and dispatch system is exactly what we needed..." | Canonical registry | KEEP (source: verified Upwork review) |
| Retainer status | 12-month maintenance retainer, active | Memory (not on site yet) | ADD as trust signal |

### Adleg Marketing Agency (Agency / AI Automation)

| Claim | Value | Files | Canonical? |
|-------|-------|-------|------------|
| Time savings | "97% time savings (90 min to 2 min)" | `work/adleg/` throughout; homepage | KEEP |
| Audit volume | "40 audits/week (was 3-4/week)" | `solutions-agencies.html`, `case-studies.html`, `new-site/` | KEEP — 40 confirmed, 50 never found |
| Client closings | "4 clients closed in first month" | `work/adleg/` meta | KEEP |
| Hours reclaimed | "~29 hours/month" | Canonical registry | PENDING — not found on site, ADD |
| Cost per audit | "$1.50" | `work/adleg/` stats | KEEP if verified |
| Quote (Tyler York) | "The automation delivers professional audits faster than we could have imagined..." | `work/adleg/` | KEEP |

### Sitewide Aggregate Claims

| Claim | Value | Files | Action |
|-------|-------|-------|--------|
| "100% Success Rate" | — | `work/index.html` line 523 | **RETIRE ENTIRELY** |
| "$17K+ Revenue Generated" | — | `work/index.html` line 515; `work/` OG description | **RETIRE ENTIRELY** |
| "Trusted by B2B companies, healthcare practices, and marketing agencies." | — | `index.html` line 201 | **RETIRE** — replace with real client name strip or delete |
| "20+ Systems Deployed" | — | `index.html` trust bar | **VERIFY with Chris before keeping** |
| "2,000 contacts/month" for AHA | — | `index.html` | **FLAG** — no case study page, AHA is closed client |
| "$3M in pipeline" | — | `about/index.html` meta | **FLAG** — needs source verification |

---

## 4. META DESCRIPTION BUGS

| File | Bug | Exact Text |
|------|-----|------------|
| `/case-studies.html` | Concatenated string | `"...across industries today.'ve helped service businesses..."` |
| `/newsletter-thanks.html` | Concatenated string | `"...Start optimizing your workflow with exclusive features today.'re subscribed..."` |
| `/pricing/index.html` | Wrong product | Title + meta describe AI Gateway ($49/mo tokens) — entire page is wrong positioning |
| `/about/index.html` | Unverified claim | Meta claims "$3M in pipeline" — needs source |
| `/index.html` | Retire claim in meta | "+$5K/mo captured" in meta description — retire per canonical registry |

---

## 5. STRUCTURED DATA / SCHEMA GAPS

| Schema Type | Pages Present | Critical Gaps |
|-------------|---------------|---------------|
| Organization | `index.html`, `about/` | Missing on most pages |
| AggregateRating | `index.html` only | Embedded Wayne Conn review cites "60% after-hours calls" — retire |
| Service | `voice-ai/`, some LPs | Missing on most LPs and case study pages |
| FAQPage | `faq/index.html` only | Missing on LP FAQ blocks (/lp/voice-ai/, /lp/b2b-automation/, aeo-geo-audit/) |
| Article | 2 blog posts partial | Missing `author` + `datePublished` on several |
| BreadcrumbList | 10+ pages | Good coverage on /work/ and /faq/ |
| Review/AggregateRating | `index.html` only | Should be on case study pages |
| LocalBusiness | None | N/A for online-only services |

**Key schema issues:**
- AggregateRating on homepage uses retiring claim ("60% after-hours calls, +$5K/month") — must update with canonical Wayne Conn metrics
- No FAQPage schema on LP pages despite FAQ sections being present in HTML
- No Service schema on `/lp/b2b-automation/` or `/lp/agency-automation/`
- Case study pages under `/work/` have no Article or Review schema

---

## 6. SEO FILES STATUS

| File | Status | Issues |
|------|--------|--------|
| `robots.txt` | Present | Correctly blocks `/new-site/`, `/test-demo.html`, `/newsletter-thanks.html` |
| `sitemap.xml` | Present but stale | Includes 9 noindex/demo URLs; missing new case study paths |
| `llms.txt` | Present but completely wrong | Wrong positioning ("Field Service Businesses"), wrong booking link, outdated pricing ($10K/mo Voice AI, $5K/mo automation), outdated product list (AI Gateway first), wrong verticals list, wrong case study URLs |
| Canonical tags | 143/182 files | Good coverage on modern pages; missing on some legacy .html files |
| OG images | 121/182 files | All point to `/images/og-default.jpg` — verify file exists; all pages use same generic image (no per-page OG) |

**llms.txt specific issues (line numbers):**
- Line 1: Title says "AI Automation for Field Service Businesses" — retire
- Lines 7-22: AI Gateway Platform listed as primary product — retire
- Lines 24-38: Workflow Automation listed as standalone ($5K/mo) — restructure
- Lines 40-45: AI Dispatch as a product — retire
- Lines 47-57: Industry Verticals (9 field service trades) — retire all, replace with B2B verticals
- Lines 59-75: Competitive positioning vs Helicone/Portkey/LiteLLM — remove or demote
- Line 101: Dead booking link — fix
- Lines 103-106: "Field Service Businesses", "30% drive time reduction" — retire
- Pricing section: "$10,000/month Voice AI, $5,000/month Workflow" — completely wrong

---

## 7. PERFORMANCE FLAGS

| Issue | File | Severity |
|-------|------|----------|
| Tailwind Play CDN (sync, ~300KB, compiles at runtime) | `healthcare-scheduling.html` | CRITICAL |
| GTM in `<head>` (render-blocking before async loads) | 36 HTML files | MEDIUM |
| No WebP/AVIF image optimization | Sitewide | MEDIUM |
| Eager chatbot CSS+JS load | `logistics.html`, `cpa.html`, `staffing.html` (noted in CLAUDE.md) | LOW |
| Google Fonts CDN (2 weights, render-blocking on slow connections) | `work/adleg/index.html` + others | LOW |

---

## 8. NAVIGATION CONSISTENCY ISSUES

| Nav Element | Modern Pages | Legacy .html Pages |
|-------------|-------------|-------------------|
| Solutions dropdown (5 items) | Present | Absent |
| Pricing link → `/pricing/` | Present | Absent |
| FAQ link | Present | Absent |
| Case Studies link | Present (→ `/case-studies`) | Links to `solutions.html` / `gateway.html` |
| Booking CTA | `quick-chat-30` | `quick-chat-30` (consistent) |
| `.html` hrefs in nav | None | `solutions.html`, `gateway.html` |

**Root cause:** Legacy .html pages use a hard-coded simplified nav; they are not on the nav include system.

---

## 9. POSITIONING LANGUAGE VIOLATIONS

| Violation | File | Line | Action |
|-----------|------|------|--------|
| "Engineer with 3 years deploying AI systems..." (founder bio) | `index.html` | 408 | Replace with 15+ year B2B GTM/RevOps bio |
| "Field Service Businesses" (positioning) | `llms.txt` | 1 | Replace entire file |
| "AI Gateway Platform" as primary product | `llms.txt` | 8 | Replace |
| "service businesses" (target audience) | Various legacy pages | Multiple | Update on page by page basis |
| "AI Automation for Field Service" | `llms.txt` | 1 | Replace |
| "$10,000/month" Voice AI pricing | `llms.txt` | pricing section | Replace |
| Old booking link | `llms.txt` | 101 | Fix immediately |
| "Built with AI. Run by humans." | Homepage + 92 files | Footer | CORRECT — keep |
| "AI Systems for B2B Revenue Operations" | Homepage title, meta | Page level | CORRECT — propagate to llms.txt |

**Confirmed correct on homepage:** Tagline "Built with AI. Run by humans." appears 92 times. Core positioning "AI Systems for B2B Revenue Operations" on homepage. All primary booking links point to `quick-chat-30`.

---

## PRIORITY FIXES (before Phase 2)

### Red — Block on
1. **Fix meta description on `case-studies.html`** — "today.'ve helped" concatenation bug
2. **Fix `llms.txt` booking link** — dead link indexed by AI crawlers (`chris4642/ai-gateway-founding-partner`)
3. **Fix founder bio on `index.html:408`** — "Engineer with 3 years" violates canonical brief; replace with 15+ year B2B GTM/RevOps at EVERFI and Metadata.io
4. **Retire "+$5K/mo" and "60% missed calls" on homepage** — update to $6,285/2wks, 18/week per canonical registry
5. **Retire homepage AggregateRating JSON-LD review body** — still says "+$5K/month in 60 days" and "missing 40% of after-hours calls"
6. **Remove "100% Success Rate" and "$17K+ Revenue Generated" from `/work/index.html`**

### Orange — Fix in Phase 2
7. **Rewrite `llms.txt` entirely** — wrong positioning, product list, verticals, pricing, booking link
8. **Rewrite `/pricing/index.html`** — currently AI Gateway tokens page; needs Voice AI tiers ($997/$1,997/$3,497), automation project ranges, retainer tiers, AEO/GEO audit
9. **Fix `newsletter-thanks.html` meta bug**
10. **Remove healthcare-scheduling.html Tailwind CDN**
11. **Update sitemap.xml** — remove noindex pages, add new /case-studies/* paths post-migration

### Yellow — Phase 3+
12. Schema: FAQPage on LP pages, Service schema on all LPs
13. OG images: per-page custom images
14. Delete or archive `/new-site/` directory
15. Navigation audit: propagate full dropdown nav to all pages
