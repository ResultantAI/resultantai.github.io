# Stripe Products Specification for ResultantAI

## Product Catalog

### AI Gateway - Subscription Products

#### 1. Free Tier
- **Name**: AI Gateway - Free
- **Price**: $0/month
- **Billing**: N/A (free tier, no Stripe product needed)
- **Features**:
  - 100K tokens/month
  - All AI providers
  - Basic dashboard
  - 7-day logs
  - Community support

#### 2. Starter Tier
- **Name**: AI Gateway - Starter
- **Price**: $29/month
- **Billing**: Monthly recurring
- **Features**:
  - 500K tokens/month
  - All providers
  - Email support (24hr)
  - 30-day logs

#### 3. Pro Tier ⭐ (Most Popular)
- **Name**: AI Gateway - Pro
- **Price**: $99/month
- **Billing**: Monthly recurring
- **Features**:
  - 3M tokens/month
  - Unlimited clients
  - Per-client tracking
  - Priority support (4hr)
  - 60-day logs

#### 4. Agency Tier
- **Name**: AI Gateway - Agency
- **Price**: $249/month
- **Billing**: Monthly recurring
- **Features**:
  - 10M tokens/month
  - Everything in Pro
  - White-label dashboard
  - Client portal access
  - 90-day logs

#### 5. Scale Tier
- **Name**: AI Gateway - Scale
- **Price**: $499/month
- **Billing**: Monthly recurring
- **Features**:
  - 25M tokens/month
  - Everything in Agency
  - PII scrubbing
  - 99.9% SLA
  - 1-year logs

#### 6. Enterprise Tier
- **Name**: AI Gateway - Enterprise
- **Price**: Custom (contact sales)
- **Billing**: Custom
- **Features**:
  - Custom tokens
  - Everything in Scale
  - HIPAA BAA / SOC2
  - Data residency
  - Dedicated support

#### 7. Founding Partner (Special Offer)
- **Name**: AI Gateway - Founding Partner
- **Price**: $499/year ($41.58/month)
- **Billing**: Annual (one-time payment)
- **Features**: All Pro features
- **Special**: Price locked forever, saves $689/year vs monthly Pro

---

### Services - One-Time Products

#### 8. Paper to Digital - Base Package
- **Name**: Paper to Digital System
- **Price**: $2,500
- **Billing**: One-time
- **Delivery**: 48 hours
- **Includes**:
  - Custom digital intake form
  - Auto-generated PDF tickets
  - Real-time dashboard
  - Searchable history
  - 30-min training
  - 30 days support

#### 9. Paper to Digital - QuickBooks Sync Add-on
- **Name**: Paper to Digital - QuickBooks Integration
- **Price**: $1,500
- **Billing**: One-time add-on
- **Requires**: Base package

#### 10. Paper to Digital - Scale Integration Add-on
- **Name**: Paper to Digital - Scale Integration
- **Price**: $1,000
- **Billing**: One-time add-on
- **Requires**: Base package

#### 11. Paper to Digital - Signature Capture Add-on
- **Name**: Paper to Digital - Signature Capture
- **Price**: $750
- **Billing**: One-time add-on
- **Requires**: Base package

#### 12. Paper to Digital - Multi-Location Add-on
- **Name**: Paper to Digital - Multi-Location
- **Price**: $1,000 per site
- **Billing**: One-time add-on (quantity-based)
- **Requires**: Base package

---

### Services - Professional Services

#### 13. Voice Agent - Basic
- **Name**: Voice Agent - Basic Implementation
- **Price**: $2,500
- **Billing**: One-time
- **Delivery**: 2-3 weeks
- **Includes**:
  - Natural conversation AI
  - Real-time objection handling
  - CRM integration
  - Call recording + transcription

#### 14. Voice Agent - Full System
- **Name**: Voice Agent - Full System
- **Price**: Starting at $5,000
- **Billing**: One-time (custom quote)
- **Delivery**: 2-4 weeks

#### 15. Automation System - Basic
- **Name**: Automation System - Single Workflow
- **Price**: $3,500
- **Billing**: One-time
- **Delivery**: 5-7 days
- **Includes**: One workflow, fully built and documented

#### 16. Automation System - Full
- **Name**: Automation System - Full Implementation
- **Price**: Starting at $5,000
- **Billing**: One-time (custom quote)
- **Delivery**: 1-2 weeks

#### 17. AI Safety & Compliance
- **Name**: AI Safety & Compliance Implementation
- **Price**: Starting at $6,000
- **Billing**: One-time (custom quote)
- **Delivery**: 30 days
- **Includes**:
  - PII detection & redaction
  - Sentiment & safety routing
  - Immutable audit trails
  - SOC 2 preparation

---

### Quick Wins - Professional Services

#### 18. Workflow Audit
- **Name**: Workflow Audit
- **Price**: $2,500
- **Billing**: One-time
- **Delivery**: 3-5 days
- **Includes**: Process mapping, automation opportunities, prioritized roadmap

#### 19. AI Integration
- **Name**: AI Integration - Single Use Case
- **Price**: $4,000
- **Billing**: One-time
- **Delivery**: 1 week
- **Includes**: Add AI to existing workflow (classification, summarization, extraction, or generation)

---

## Stripe Product IDs to Set (Environment Variables)

```bash
# AI Gateway Subscriptions (Monthly Recurring)
STRIPE_PRICE_STARTER_MONTHLY=price_xxx
STRIPE_PRICE_PRO_MONTHLY=price_xxx
STRIPE_PRICE_AGENCY_MONTHLY=price_xxx
STRIPE_PRICE_SCALE_MONTHLY=price_xxx

# AI Gateway - Founding Partner (Annual)
STRIPE_PRICE_FOUNDING_PARTNER_ANNUAL=price_xxx

# Paper to Digital
STRIPE_PRICE_PAPER_TO_DIGITAL_BASE=price_xxx
STRIPE_PRICE_PAPER_TO_DIGITAL_QUICKBOOKS=price_xxx
STRIPE_PRICE_PAPER_TO_DIGITAL_SCALE=price_xxx
STRIPE_PRICE_PAPER_TO_DIGITAL_SIGNATURE=price_xxx
STRIPE_PRICE_PAPER_TO_DIGITAL_MULTILOCATION=price_xxx

# Voice Agents
STRIPE_PRICE_VOICE_AGENT_BASIC=price_xxx
STRIPE_PRICE_VOICE_AGENT_FULL=price_xxx

# Automation Systems
STRIPE_PRICE_AUTOMATION_SINGLE=price_xxx
STRIPE_PRICE_AUTOMATION_FULL=price_xxx

# AI Safety & Compliance
STRIPE_PRICE_AI_SAFETY_COMPLIANCE=price_xxx

# Quick Wins
STRIPE_PRICE_WORKFLOW_AUDIT=price_xxx
STRIPE_PRICE_AI_INTEGRATION=price_xxx
```

---

## Product Metadata Recommendations

For each Stripe product, add these metadata fields:

```json
{
  "category": "gateway|services|quick-wins",
  "tier": "starter|pro|agency|scale|enterprise",
  "tokens_included": "500000|3000000|10000000|25000000",
  "support_sla": "24hr|4hr|dedicated",
  "log_retention_days": "7|30|60|90|365",
  "features": "per_client_tracking,white_label,pii_scrubbing",
  "delivery_timeline": "48hrs|1-2weeks|2-4weeks",
  "support_included_days": "14|30"
}
```

---

## Notes for Stripe Setup

1. **Subscription Products**: Set up with `recurring` billing interval
2. **One-Time Products**: Set up with `one_time` billing
3. **Add-ons**: Mark as "add-on" in metadata, reference parent product ID
4. **Enterprise/Custom**: Consider not creating a Stripe product, handle via custom invoicing
5. **Founding Partner**: Set up annual billing with metadata `special_offer: true`

---

## Recommended Product Structure in Stripe

```
AI Gateway (Product)
├── Starter - $29/mo (Price)
├── Pro - $99/mo (Price)
├── Agency - $249/mo (Price)
├── Scale - $499/mo (Price)
└── Founding Partner - $499/yr (Price)

Paper to Digital System (Product)
├── Base Package - $2,500 (Price)
├── QuickBooks Add-on - $1,500 (Price)
├── Scale Integration - $1,000 (Price)
├── Signature Capture - $750 (Price)
└── Multi-Location - $1,000/site (Price)

Voice Agent (Product)
├── Basic - $2,500 (Price)
└── Full System - Starting at $5,000 (Price - custom)

Automation System (Product)
├── Single Workflow - $3,500 (Price)
└── Full Implementation - Starting at $5,000 (Price - custom)

AI Safety & Compliance (Product)
└── Implementation - Starting at $6,000 (Price - custom)

Professional Services - Quick Wins (Product)
├── Workflow Audit - $2,500 (Price)
└── AI Integration - $4,000 (Price)
```
