# ResultantAI Site — Claude Code Briefing

**Repo:** `resultantai.github.io` → GitHub Pages → `resultantai.com`
**Stack:** Static HTML/CSS/JS. Nav is **inline in every HTML file** — no shared components. Changes must be propagated manually.
**Design gold standard:** `voice-ai/index.html` — dark, modern, inline CSS, bg-grid, scrolled nav, reveal animations, accordion FAQ, cta-inner block, full footer grid. Migrate any legacy page to this pattern on touch.
**Legacy pages** (to upgrade when touched): `logistics.html`, `cpa.html`, `staffing.html`, `healthcare-scheduling.html`, and any page using external `css/styles.css`.

---

## BEFORE ANY PASS: Immediate Manual Action Required

**Revoke the Anthropic API key in `.env` now.** The key `sk-ant-api03-IKPve...` was found in `.env` which is not tracked by git — but bots scan GitHub for committed keys in minutes. Before running any pass:

1. Go to `console.anthropic.com` → API Keys → revoke it now, today.
2. Run `git log --all --oneline -- .env` to confirm it was never committed. If it appears in any commit, `.gitignore` does not fix the history — you must rotate the key AND consider the history exposed.
3. Do this before the June 11–14 API gap, not during it.

This is not a Pass 1 sub-bullet. It is a prerequisite to everything else.

---

## Current Git State (as of 2026-06-10)

Latest commit on main: `5f04a77` — removed internal docs, fixed pricing CTAs.

**PR #220 already merged** (May 17, 2026 — Round 2 Ahrefs fixes: meta description on blog/concrete-calculator, logistics-ticketing-OLD placeholder divs).

**Untracked files that need gitignore entries:**
- `ResultantAI • Agent Project Meta-Instructions (1).md`
- `ai-content-tagging/`, `ai-data-pipeline/`, `ai-proposal-generator/`, `document-ai/`

Add to `.gitignore` before any commit: `*.pdf`, `*Meta-Instructions*`, and confirm these directories are dev-only artifacts.

---

## Priority Queue

Work top-down. Do not skip a tier to do lower-priority work.

### TIER 1 — Blocking (do first, always)
1. ~~**Merge PR #220**~~ — Done (merged May 17, 2026).
2. **Favicons** — `favicon.svg`, `favicon.png`, and `apple-touch-icon.png` do not exist. Add them. Schema `logo` also points at `/assets/logo.png` (404) — fix to `/images/logo-white.svg` or whichever file exists.
3. **OG/Twitter images** — 3 pages reference jpg files that don't exist; 3 pages (incl. homepage) have no `og:image`. All declare `summary_large_image` with no `twitter:image` tag. Create one canonical OG image (1200×630) and wire across all pages. **Also delete the second `og:url` block on `logistics.html`, `cpa.html`, and `staffing.html`** — each has two conflicting `og:url` tags; scrapers may pick the wrong `.html` URL.

### TIER 2 — Performance
4. **Lazy chatbot on service pages** — `logistics.html`, `cpa.html`, `staffing.html` load chatbot CSS+JS eagerly. Port the lazy-load pattern from `index.html` (scroll/mousemove/touchstart trigger). **Note: `chatbot-integration-snippet.html` documents the eager pattern and includes batch `sed` commands to propagate it — update that snippet to the lazy-load pattern or it will undo this work in a future session.**
5. **Dead script cleanup** — `roi-calculator.js` and `tabs.js` are loaded in `index.html` (at the bottom of `<body>`, not in `<head>`) but there is no calculator or tabs UI on that page. Remove those two script tags from `index.html`.
6. **Hero LCP fix** — Hero elements start `opacity:0` and only reveal after IntersectionObserver + 0.6s transition. Add `noscript` fallback + consider setting initial opacity to 1 on LCP elements only.

### TIER 3 — Messaging & Conversion (AIDB-driven — see strategy section)
7. **Replace generic CTAs with diagnostic CTAs** — Cold traffic pages (`index.html`, `logistics.html`, `cpa.html`, `staffing.html`, `solutions.html`): replace "Contact Us" / "Book a Call" with "Get Your Agent Readiness Audit" pointing to `/agent-readiness-audit/`. **Warm pages (`pricing/index.html`, case studies): keep direct booking as the primary CTA; add the audit as a secondary option below it.** Do not add friction to visitors who are already evaluating.
8. **Messaging shift: augmentation over automation** — Replace "automate your workflow" framing with "AI as reasoning partner" framing. KPMG research signal: highest-impact AI users treat AI as a collaborative reasoning partner, not a tool. Update hero copy on homepage and top service pages. Particularly important on `cpa.html`, `staffing.html`, `healthcare-voice-ai.html` where the replacement fear is highest.
9. **Token cost framing** — Add cost-efficiency proof points to service pages. The market signal is "cost-effective scale over cutting-edge capabilities." Service pages should cite cost reduction percentages and token efficiency, not just speed.
10. **Build/Buy/Borrow section** — Add a decision framework section to `pricing/index.html` or `services/` that maps client situations to Build (custom agent), Buy (platform integration), or Borrow (managed service) recommendations. This matches the KPMG framework that enterprise buyers now expect consultants to use.
11. **Nav cleanup** — Remove "AI Gateway (Cost Control)" from Solutions dropdown and "AI Gateway" from footer. It appears inline in every HTML file — grep for `AI Gateway` and `gateway.html` links before touching nav. Do not remove `gateway.html` itself (external links may point to it), just remove nav entries.
12. **llms.txt** — This file is the first thing AI crawlers ingest (robots.txt explicitly invites them). It currently: positions ResultantAI as "AI Automation for Field Service Businesses" (wrong), promotes AI Gateway as flagship product (being removed in Pass 5), quotes $10,000/month pricing (being replaced in Pass 5), and links to the `chris4642/ai-gateway-founding-partner` HubSpot URL that was just purged from the service pages. Update in this pass: remove AI Gateway, update positioning to match new homepage copy, update pricing to match new tiers. **Also update `README.md`** — still describes field-service framing and "No CDNs, self-hosted for performance" while the site loads Google Fonts and Tailwind CDN.

### TIER 4 — New Pages
13. **Agent Readiness Audit page** — Build `/agent-readiness-audit/index.html` using the voice-ai design pattern **before** Pass 3 CTAs go live (the CTAs link here). This is hypothesis #23 from the pipeline: a 30-minute audit deliverable as lead magnet for mid-market prospects. Page should explain the 3-part framework (use case identification, org readiness score, quick-win recommendations), have a strong diagnostic CTA, and link from homepage + services nav.
14. **Pricing page rebuild** — Currently promotes AI Gateway. Replace with Build/Buy/Borrow framework. Three tiers: Diagnostic (free audit), Implementation (project-based, $2.5K–$15K), Managed (retainer, $3K+/mo). Remove all AI Gateway references.

### TIER 5 — Design Migration
15. Upgrade `logistics.html`, `cpa.html`, `staffing.html`, and `healthcare-scheduling.html` to voice-ai design system (inline CSS, dark theme, reveal animations). Do one page at a time. Test mobile after each.
    - **`healthcare-scheduling.html` is priority** — it loads `<script src="https://cdn.tailwindcss.com">` synchronously in `<head>` at line 35. That is the Tailwind Play CDN: ~300KB render-blocking, compiles CSS in browser at runtime. Tailwind's own docs say never use it in production. This is likely the slowest page on the site.

### TIER 6 — SEO (ongoing)
16. After each content change, check: title length (50-60 chars), meta description (120-155 chars), OG tags, canonical. Use Ahrefs export CSVs at `~/Downloads/ahrefs-*.csv` — UTF-16 tab-delimited, parse with Python `encoding='utf-16'`, `delimiter='\t'`.

---

## Strategic Direction (From #oc-aidb-digest + Podcast)

These are not nice-to-haves. They are the market signals that should drive every copy and page decision.

**Signal 1 — The subsidy era is over (10/10 episode, June 8 digest)**
Clients now face usage-based pricing. Token scarcity is real. ResultantAI's differentiation is cost-effective scale, not raw capability. Every service page should answer: "How does this reduce cost-per-inference or cost-per-outcome?" Add ROI framing (cost reduction %, time-to-value) to every case study and hero stat.

**Signal 2 — Diagnostic-first closes faster (hypothesis #52)**
Mid-market enterprises respond faster when the sales motion leads with constraints, not capabilities. Replace abstract "learn more" CTAs with specific diagnostic offers on cold traffic pages. The Agent Readiness Audit (hyp #23) is the vehicle. Site CTAs should say what the prospect gets immediately, not what they'll eventually buy. On warm pages (pricing, case studies), keep direct booking primary.

**Signal 3 — AI as reasoning partner, not tool (KPMG, 9/10)**
The KPMG research finding: highest-impact AI users treat AI as a collaborative reasoning partner. This is a messaging unlock. Replace "automate X" with "augment your team's judgment on X."

**Signal 4 — Interactive > static (June 8 digest, hypotheses on Codex Sites)**
Case studies and reports that are static PDFs lose. Interactive outputs (shareable links, drill-down data, live calculations) win. Short term: embed the ROI calculator into relevant service pages. Medium term: convert case studies to interactive before/after comparisons.

**Signal 5 — Top-down adoption (exec-first, 9/10 signal)**
Executive AI usage drives org-wide adoption. Homepage and above-the-fold content should speak to the C-suite. Stat blocks should lead with business outcomes (revenue impact, cost avoidance), not engineering metrics (API calls, uptime).

**Signal 6 — Build/Buy/Borrow is now the client mental model (KPMG)**
Enterprise clients are already being trained on this decision matrix by KPMG, McKinsey, and the vendors themselves. ResultantAI should own this language before clients arrive with it. Adding a Build/Buy/Borrow section to pricing positions us as strategic advisors, not just implementers.

---

## Technical Constraints (Do Not Violate)

- Nav is **inline HTML in every file** — no templating, no partials. Always grep before assuming a nav change is local.
- `images/logistics/` contains only a README.md — no images. Do not reference paths under it.
- `js/ab-router.js` was deleted — do not re-add or reference.
- Ahrefs CSVs: UTF-16 tab-delimited. Parse with `encoding='utf-16'`, `csv.reader(f, delimiter='\t')`.
- Demo pages in `demo/` should have `<meta name="robots" content="noindex, nofollow">` — already done in Round 1. Verify if adding new demo pages.
- GitHub Pages serves from root. No build step. Filenames and paths are case-sensitive.
- `chatbot-integration-snippet.html` documents the **eager** chatbot load pattern. Do not use it as a reference. Use `index.html`'s lazy-load block instead.

---

## Files Claude Code May Need

| What you're doing | Files to read first |
|---|---|
| Any nav change | `index.html` lines 1-80 (nav pattern), then grep `AI Gateway` across all `.html` |
| CTA copy | `voice-ai/index.html` (cta-inner pattern), `index.html` CTA block |
| Design migration | `voice-ai/index.html` (full file — design system reference) |
| SEO/meta | `about/index.html`, `contact-us/index.html` (already fixed — use as pattern) |
| Favicon wiring | `index.html` `<head>` block |
| Chatbot lazy-load | `index.html` lazy-load script block (bottom of `<body>`) — NOT `chatbot-integration-snippet.html` |
| Pricing rebuild | `pricing/index.html`, `voice-ai/index.html` |
| New landing page | `aeo-geo-audit/index.html` (most recent LP — use as template) |
| OG image wiring | `index.html` OG block + any page needing og:image |
| llms.txt update | `llms.txt`, `index.html` hero copy (match positioning) |

---

## Loop Strategy

**Pass order matters.** Pass 3 (CTA rewrite) links to `/agent-readiness-audit/` — that page must exist first. Run Pass 4 before Pass 3, or Pass 3 CTAs ship 404s.

Run these passes in sequence. Each pass is a focused Claude Code session.

**Pass 1 — Gitignore + Snippet Cleanup (15 min)** ✅ COMPLETE (2026-06-10)
- PR #220 was already merged (May 17)
- Fixed `.gitignore`: replaced quoted `"ResultantAI • Agent Project Meta-Instructions (1).md"` entry (quotes made it a no-op) with glob `ResultantAI*Meta-Instructions*.md`; fixed `Export LinkedIn posts.pdf` escape
- Updated `chatbot-integration-snippet.html` to lazy-load pattern; removed eager CSS-in-head + sync JS pattern and batch `sed` commands
- Committed new LP directories: `ai-content-tagging/`, `ai-data-pipeline/`, `ai-proposal-generator/`, `document-ai/`
- Updated CLAUDE.md to reflect PR #220 already merged
Exit condition met: `git status` clean. Snippet no longer documents eager pattern.

**Pass 2 — Asset Repair (30 min)**
Goal: Zero 404s on favicons and OG images. No duplicate OG blocks.
- Generate `favicon.svg` from `images/logo-white.svg` (inline SVG, link tag); also produce `favicon.png` and `apple-touch-icon.png`
- Create a 1200×630 OG image (dark bg, white logo, tagline) — save as `images/og-default.jpg`
- Wire favicon + OG across all top-level pages (`index.html`, service pages, pricing, about, contact-us)
- On `logistics.html`, `cpa.html`, `staffing.html`: delete the second `og:url` block (each has two conflicting tags)
- Remove the unused `roi-calculator.js` and `tabs.js` script tags from `index.html` (they are at the bottom of `<body>`, not `<head>`)
Exit: Ahrefs "missing favicon" and "missing og:image" issues resolved. No page has two `og:url` tags.

**Pass 4 — Agent Readiness Audit Page (45 min)** ← Run before Pass 3
Goal: `/agent-readiness-audit/` exists before any CTA points to it.
- Build `/agent-readiness-audit/index.html` in voice-ai design system
- 3-section page: What is the audit / What you get / How to book
- Embed ROI framing (30 min delivery, 3 quick wins, zero cost to start)
- CTA books a call via `/resultantai/discovery` HubSpot link
- Add to nav under Solutions dropdown
Exit: Page live at `/agent-readiness-audit/`. Linked from nav.

**Pass 3 — Messaging Reframe (60 min)** ← Run after Pass 4
Goal: Every cold-traffic page reflects AIDB market signals. llms.txt is current.
- Homepage hero: swap "automate" language → "reasoning partner" language
- Homepage stat block: add cost-reduction % and time-to-value stats (pull from case studies)
- Cold traffic pages (`index.html`, `logistics.html`, `cpa.html`, `staffing.html`, `solutions.html`): replace generic CTAs → "Get Your Agent Readiness Audit" linking to `/agent-readiness-audit/`
- Warm pages (`pricing/index.html`, case studies): keep "Book a Call" as primary CTA; add "Or start with a free Agent Readiness Audit →" as secondary below it
- Add one sentence of cost-efficiency framing to each service page hero subheadline
- **Update `llms.txt`**: remove AI Gateway, update positioning to match new homepage copy, update pricing to match new tiers, replace `chris4642/ai-gateway-founding-partner` booking link with `/resultantai/discovery`
- **Update `README.md`**: remove field-service framing; remove "No CDNs, self-hosted for performance" claim
Exit: No cold-traffic CTA says only "Contact Us" or "Learn More." `llms.txt` contains zero AI Gateway mentions and pricing matches `/pricing/`. `README.md` reflects current positioning.

**Pass 5 — Pricing Rebuild (45 min)**
Goal: Remove AI Gateway promotion, add Build/Buy/Borrow framework.
- Three tiers: Diagnostic (free audit), Implementation (project-based, $2.5K–$15K), Managed (retainer, $3K+/mo)
- Add a decision matrix: "Should you Build, Buy, or Borrow?" — 3 columns, 4 criteria rows
- Remove all AI Gateway references from page and from nav (grep `gateway` in nav blocks across all HTML files)
- **Re-check `llms.txt`** after pricing change: confirm pricing in llms.txt still matches this page
Exit: Pricing page has no AI Gateway mention. Nav Solutions dropdown updated. `llms.txt` pricing consistent with page.

**Pass 6 — Design Migration: healthcare-scheduling.html (45 min)** ← Priority in Tier 5
Goal: Eliminate the Tailwind Play CDN render-blocker.
- Read `healthcare-scheduling.html` line 35 — remove `<script src="https://cdn.tailwindcss.com">` from `<head>`
- Migrate page to voice-ai design system (inline CSS replaces Tailwind utility classes)
- Mobile test (simulate 375px viewport)
- Apply lazy chatbot pattern, Pass 3 CTA standard
Exit: No Tailwind CDN reference. Page uses inline CSS only. Lighthouse perf score ≥ 80.

**Pass 7 — Design Migration: logistics.html (60 min)**
Same as Pass 6 template. Rewrite to voice-ai design system, lazy chatbot, Pass 3 CTAs, mobile test.
Exit: logistics.html visually matches voice-ai/index.html quality. Lighthouse perf score ≥ 80.

**Pass 8 — Design Migration: cpa.html + staffing.html (60 min)**
Same as Pass 7 but for two pages. Do sequentially.

**Pass 9 — SEO Sweep (30 min)**
Goal: Sitemap is clean. All canonical tags present. No stale Ahrefs issues.
- **Purge sitemap.xml**: remove `logistics-ticketing-OLD`, `test-demo`, `portal-demo`, and all nine `/demo/` URLs
- Add missing canonical tag to `case-study-beaver-pumice.html`
- Spot-check all remaining pages: titles (50-60 chars), meta descriptions (120-155 chars), canonical present
- Verify all blog posts have correct publish dates in schema markup
Exit: Sitemap contains zero OLD/demo/test URLs. `case-study-beaver-pumice.html` has canonical. Ahrefs "issues" count reduced ≥50% from current baseline.

---

## How to Run the Loop

In any Claude Code session on this repo, start with:
```
/read CLAUDE.md
```
Then state which Pass you're running. Claude Code will execute that pass and stop at the exit condition.

For automated/scheduled runs, use the `/schedule` skill to create a remote trigger (e.g., Pass 9 SEO sweep weekly).

**Kill switch:** If a pass produces broken HTML or layout regressions, revert with `git checkout HEAD -- <file>` before pushing. Never force-push main.
