# MIGRATION PLAN — ResultantAI Marketing Site
**Status:** PROPOSED — awaiting approval before any changes
**Date:** 2026-07-12
**Repo:** `/Users/cj/resultantai.github.io`

---

## Phase 2A: Immediate Red-Priority Fixes (no approval needed per audit brief)

These are corrections to existing content, not structural changes. No redirects needed.

| File | Change | Priority |
|------|--------|----------|
| `index.html:408` | Replace "Engineer with 3 years deploying AI systems..." with: "Chris Mott spent 15+ years in B2B GTM and RevOps at companies like EVERFI and Metadata.io. He built the systems he used to buy." | CRITICAL |
| `index.html:24,73,184,339,345,395` | Retire "+$5K/mo", "60% missed calls to 100% capture". Replace with "$6,285 captured in 2 weeks" and "18 missed calls/week to zero". | CRITICAL |
| `index.html:95` | Update AggregateRating reviewBody — remove "+$5K/month in 60 days" and "40% after-hours" claims | CRITICAL |
| `index.html:201` | Remove "Trusted by B2B companies, healthcare practices, and marketing agencies." — replace with real client name strip or delete | HIGH |
| `case-studies.html` | Fix meta description — remove concatenated "today.'ve helped..." string | CRITICAL |
| `newsletter-thanks.html` | Fix meta description — remove "today.'re subscribed..." concatenation | HIGH |
| `work/index.html:515,523` | Remove "$17K+ Revenue Generated" and "100% Success Rate" from stats section | CRITICAL |
| `llms.txt:101` | Fix dead booking link: replace `chris4642/ai-gateway-founding-partner` with `resultantai/quick-chat-30` | CRITICAL |

---

## Phase 2B: URL Consolidation (301 redirects) — NEEDS APPROVAL

### Case Study System: /work/ → /case-studies/

Current state: Two parallel case study systems (/work/ with 3 entries, /case-studies/ as index-only).
Target: Single system at `/case-studies/{client-slug}/`.

| Current URL | New URL | Notes |
|-------------|---------|-------|
| `/work/wayne-conn/` | `/case-studies/wayne-conn/` | Direct migration |
| `/work/adleg/` | `/case-studies/adleg/` | Direct migration |
| `/work/hera-j/` | `/case-studies/hometown-cap/` OR `/case-studies/jami-consulting/` | **Chris: confirm client display name** |
| `/work/cisionvision.html` | 301 → `/case-studies/hometown-cap/` | Same engagement as hera-j |
| `/work/honcho.html` | 301 → `/case-studies/hometown-cap/` | Same engagement as hera-j |
| `/work/wayne-conn.html` | 301 → `/case-studies/wayne-conn/` | Legacy .html in /work/ |
| `/work/` (index) | 301 → `/case-studies/` | Retire /work/ index |
| `/case-study-beaver-pumice.html` | 301 → `/case-studies/beaver-pumice/` | Root .html → new canonical |

**New case study pages to build (Phase 3):**
- `/case-studies/beaver-pumice/` — currently `case-study-beaver-pumice.html` (no canonical path)
- `/case-studies/visionary-ai-seniors-rising/` — new, healthcare flagship
- `/case-studies/hometown-cap/` (or `/jami-consulting/`) — consolidate hera-j
- `/case-studies/legion-public-affairs/` — new
- `/case-studies/zenagen/` — new
- `/case-studies/agile-hr-analytics/` — new
- `/case-studies/studio-fp/` — new

### Legacy Root .html Pages — 301 or Delete

| Legacy URL | Action | 301 Target |
|------------|--------|------------|
| `/solutions.html` | 301 | `/` (homepage covers all services) |
| `/gateway.html` | 301 | `/gateway/` |
| `/case-studies.html` | 301 | `/case-studies/` |
| `/case-study-beaver-pumice.html` | 301 | `/case-studies/beaver-pumice/` |
| `/logistics.html` | 301 | `/lp/b2b-automation/` |
| `/cpa.html` | 301 | `/lp/b2b-automation/` |
| `/staffing.html` | 301 | `/lp/b2b-automation/` |
| `/solutions-agencies.html` | 301 | `/lp/agency-automation/` |
| `/solutions-b2b.html` | 301 | `/lp/b2b-automation/` |
| `/solutions-field-services.html` | 301 | `/voice-ai/` |
| `/healthcare-scheduling.html` | 301 | `/lp/voice-ai/` |
| `/healthcare-voice-ai.html` | 301 | `/lp/voice-ai/` |
| `/concrete.html` | 301 | `/` (or delete if no traffic) |
| `/concrete-calculator.html` | 301 | `/` (or delete if no traffic) |
| `/propane.html` | 301 | `/` (or delete if no traffic) |
| `/logistics-ticketing-OLD.html` | DELETE | — |
| `/paper-to-digital.html` | 301 | `meetings.hubspot.com/resultantai/quick-chat-30?source=paper-to-digital` |
| `/paper-to-digital-short.html` | 301 | same as above |
| `/winter-readiness.html` | Keep as-is or delete | Check traffic first |
| `/roi-calculator.html` | 301 | `/voice-roi-calculator` |
| `/automation-assessment.html` | Keep (lead gen tool) or integrate into LPs | Decide before 301 |

**Internal tools (noindex, keep at current paths):**
- `/test-demo.html`, `/portal-demo.html`, `/audit.html`, `/chatbot-integration-snippet.html`
- `/404.html`
- `/newsletter-thanks.html` (fix meta bug; keep noindex)

**A/B test variants (archive or delete):**
- `/index-b.html`, `/index-control.html` — delete after confirming test is closed
- `/new-site/` directory — delete or password-protect (staging content)

### Booking Link Redirects

| Old Link | 301 Target |
|----------|------------|
| `/discovery` | `https://cal.com/chris-mott-eebyqs/30min?source=discovery` |
| `/paper-to-digital` | `https://cal.com/chris-mott-eebyqs/30min?source=paper-to-digital` |

---

## Phase 2C: Pricing Page Rebuild — NEEDS APPROVAL

**Current:** `/pricing/index.html` promotes AI Gateway tokens ($49/mo, 5M tokens) — wrong product, wrong audience.

**Target:** Services pricing for B2B clients:

| Tier | Product | Price |
|------|---------|-------|
| Voice AI Starter | Single-location deployment, 24/7 call handling | $997/mo |
| Voice AI Growth | Multi-location, CRM integration, custom routing | $1,997/mo |
| Voice AI Enterprise | HIPAA-compliant, white-label, BAA included | $3,497/mo |
| Automation Project | Custom workflow automation, scoped per engagement | $5,000-$25,000 |
| Retainer | Ongoing optimization + support | $1,500-$3,000/mo |
| AEO/GEO Authority Audit | Fixed-price 14-day audit + distribution plan | $4,500 flat |

**Gateway pricing:** Move to `/gateway/pricing/` as a separate sub-page for that product.

**FAQ alignment:** FAQ currently says "$2,500-$5,000 setup" — reconcile with pricing page before publishing. One pricing story per offer.

---

## Phase 2D: Footer and Nav Unification — NEEDS APPROVAL

**Scope:** Propagate the current-generation nav (Solutions dropdown + full link set) to all legacy .html pages that currently have simplified nav.

**Pages needing nav update:**
- `case-studies.html` (has `solutions.html`, `gateway.html` links)
- `solutions-agencies.html`, `solutions-b2b.html`, `solutions-field-services.html`
- `logistics.html`, `cpa.html`, `staffing.html`, `healthcare-*.html`
- All legacy root .html files not already 301'd

**Copyright:** Confirm all pages show 2026. (Audit found modern pages are 2026; legacy pages not fully checked.)

---

## Phase 2E: llms.txt Full Rewrite — AFTER PRICING PAGE IS LIVE

**Dependency:** Must reflect the new pricing page and case study structure before rewriting.

**Sections to replace:**
1. Title: `# ResultantAI — AI Systems for B2B Revenue Operations`
2. About: B2B GTM/RevOps positioning, 15+ year founder background
3. Services: Voice AI, B2B Automation, Agency White-Label, AEO/GEO Audit
4. Verticals: Healthcare, Home Services, Agencies, B2B/SaaS, Industrial, Financial Services
5. Case Studies: All canonical URLs after migration
6. Pricing: Accurate tier prices per pricing rebuild
7. Blog: Keep existing blog links, add new posts
8. Contact: Fix booking link to `quick-chat-30`
9. Key Facts: Update to B2B positioning

---

## Phase 3: Case Study Rebuild (after Phase 2 approval and execution)

| Case Study | Status | Verified Metrics | New URL |
|------------|--------|------------------|---------|
| Wayne Conn Plumbing | Exists, metrics need update | $6,285/2wks, 18/wk→0, 18-day payback, 20min→10sec | `/case-studies/wayne-conn/` |
| Adleg Marketing | Exists, metrics correct | 97% time savings, 3-4/wk→40/wk, 4 clients in 30 days | `/case-studies/adleg/` |
| Jami / HometownCap | Exists as /work/hera-j/, name is internal | 3X leads, 75% manual time reduction, doc collection 5d→1.5d | `/case-studies/{slug TBD}/` |
| Beaver Pumice | Exists at root .html, no nav link | 5min→30sec, ~$500/wk→0, 5-wk payback, retainer active | `/case-studies/beaver-pumice/` |
| VisionaryAI / Seniors Rising | Does not exist yet | $21,500 build, monthly retainer since Mar 2026, HIPAA-compliant — PULL live metrics from client reporting | `/case-studies/seniors-rising/` |
| Legion Public Affairs | Does not exist yet | Signal alert pipeline (LegiScan + Meta Ads Library) | `/case-studies/legion-public-affairs/` |
| Zenagen / NRI | Does not exist yet | 5-agent command center, content pipeline | `/case-studies/zenagen/` |
| Agile HR Analytics | Does not exist yet | 2,000 contacts/month B2B outbound — VERIFY before publishing | `/case-studies/agile-hr-analytics/` |
| Studio FP | Does not exist yet | Notion Operations Hub | `/case-studies/studio-fp/` |

**Index page:** `/case-studies/` — rebuild with filter tabs:
- Healthcare
- Home Services
- Agencies
- B2B/SaaS
- Industrial
- Financial Services

Each card links to vertical-specific LP above the fold. Deep-link anchors on each case study for Sales Navigator outreach.

---

## Phase 4: AEO/GEO + Outreach-Readiness Layer

| Task | Status | Notes |
|------|--------|-------|
| `/aeo-geo-audit/` landing page | EXISTS — check if current version matches canonical brief | Verify tiers, pricing, CTA |
| FAQPage JSON-LD on all LP FAQ blocks | Missing | Add to `/lp/voice-ai/`, `/lp/b2b-automation/`, `/lp/agency-automation/`, `/aeo-geo-audit/` |
| Service schema on each LP | Partial | Add missing LPs |
| Organization schema sitewide | Partial | Inject in site-wide header include |
| Article schema on blog posts | Incomplete | Add `author`, `datePublished` fields |
| llms.txt | Completely rewrite | See Phase 2E above |
| UTM anchor targets on case studies | Missing | Add `id=""` targets for Sales Navigator deep links |
| Per-page OG images | All use generic default | Generate per-page images in Phase 4 |
| Remove "100% Success Rate" | On `/work/index.html` | Done in Phase 2A |
| Replace "Trusted by..." | On `index.html` | Replace with named client strip or delete |

---

## Security Pre-Pass Gate (before any commit)

- [ ] No API keys, tokens, or credentials in changed files
- [ ] No client PII or confidential data in case study copy (Seniors Rising: HIPAA-protected, no PHI in case study)
- [ ] No confidential internal project codenames (hera-j slug removed in Phase 2B)
- [ ] All client quotes: permission confirmed before publishing (verify Adleg, Jami, Seniors Rising)
- [ ] AHA case study: AHA is a closed client — confirm they've approved any public reference
- [ ] Studio FP / Frankie Presser: confirm case study publication is okay given closed settlement

---

## Open Questions for Chris Before Phase 2 Execution

1. **MCA/HometownCap slug:** What should the public case study URL and display name be? `/case-studies/hometown-cap/` or `/case-studies/jami-consulting/`?
2. **"20+ Systems Deployed" claim:** What is the actual current count? Verify before keeping or retiring.
3. **AHA case study:** Did AHA give written permission to be referenced publicly?
4. **Studio FP:** Can this be a public case study given the closed settlement?
5. **Seniors Rising live metrics:** Pull call volume / booking conversion data from Retell AI dashboard before populating the case study.
6. **Adleg pull quote:** Current site has "The automation delivers professional audits faster than we could have imagined." Canonical registry from Upwork — confirm this is the approved public quote.
7. **Pricing page:** Confirm the Voice AI tier prices ($997/$1,997/$3,497) match current sales pricing before publishing.
8. **FAQ "$2,500-$5,000 setup" language:** Retire or reframe to match new tier pricing?
9. **`/winter-readiness.html`:** Keep (SEO traffic), 301, or delete?
10. **`/automation-assessment.html`:** Integrate into LPs or keep as standalone lead gen?
