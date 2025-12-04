# AI Gateway

> **Stop guessing your AI bill.** One API for OpenAI, Claude, Gemini. Flat monthly pricing with tokens included.

AI Gateway is a unified LLM proxy that routes requests to multiple AI providers through a single endpoint. Get cost controls, usage tracking, automatic failover, and intelligent routing—all with predictable, token-inclusive pricing.

**🚀 Free Beta Access:** [Join the waitlist](https://resultantai.com/gateway)

---

## Why AI Gateway?

### The Problem

- **Unpredictable costs:** OpenAI bill jumped from $47 to $312 overnight. One viral feature, no warning.
- **Multiple API keys:** Managing OpenAI, Claude, Gemini separately—each with different billing.
- **No per-client tracking:** Can't tell which clients are profitable without manual work.
- **Bill shock:** A single misconfigured Make.com scenario can drain $200+ in minutes.

### The Solution

AI Gateway provides:

✅ **$99/mo flat rate** with 3M tokens included—predictable costs before you ship
✅ **One API key** for OpenAI + Claude + Gemini—unified access to all providers
✅ **Per-client tracking** with CSV export—invoice clients in seconds
✅ **Budget caps & kill switches** at 80%/90%/100%—prevent runaway costs
✅ **Intelligent routing** to cheaper models—40-50% cost savings automatically
✅ **Automatic failover**—if OpenAI goes down, requests route to Claude seamlessly

---

## Quick Start

### 1. Get your API key
Sign up at [resultantai.com/gateway](https://resultantai.com/gateway) and copy your API key from the dashboard.

### 2. Switch from OpenAI (2 lines of code)

**Python:**
```python
from openai import OpenAI

client = OpenAI(
    api_key="your-ai-gateway-key",  # Replace with AI Gateway key
    base_url="https://gateway.resultantai.com/v1"  # Add this line
)

# Your existing code works unchanged
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

**Node.js:**
```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: "your-ai-gateway-key",  // Replace with AI Gateway key
  baseURL: "https://gateway.resultantai.com/v1"  // Add this line
});

// Your existing code works unchanged
const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello!" }]
});
```

**Make.com / Zapier:**
```
HTTP Module:
- URL: https://gateway.resultantai.com/v1/chat/completions
- Method: POST
- Headers: Authorization: Bearer your-ai-gateway-key
- Body: {"model": "gpt-4o", "messages": [...]}
```

That's it. **5 minutes to migrate.** Zero code rewrite.

---

## Features

### 🛡️ Budget Protection

Set monthly spending caps and get alerts at 80%/90% usage. Requests automatically pause at 100% to prevent surprise bills.

```python
# Tag requests with budget tracking
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[...],
    extra_headers={"X-Client-ID": "acme-corp"}  # Track per-client costs
)
```

### 🔄 Automatic Failover

When OpenAI goes down (happens monthly), AI Gateway automatically fails over to Anthropic or Google within milliseconds. Your app stays up.

- GPT-4o → Claude 3.5 Sonnet
- GPT-4o-mini → Claude Haiku
- Transparent failover—same API response format

### 🎯 Intelligent Routing

AI Gateway analyzes each request and routes to the cheapest model that can handle it:

- Simple tasks (classification, extraction) → GPT-4o-mini ($0.15/1M tokens)
- Complex reasoning → Claude Sonnet ($3/1M tokens)
- **Result:** 40-50% cost savings at 100% quality parity

```python
# Enable intelligent routing
response = client.chat.completions.create(
    model="auto",  # Gateway selects optimal model
    messages=[...]
)
```

### 📊 Per-Client Tracking

Track costs by client, project, or feature:

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[...],
    extra_headers={
        "X-Client-ID": "client-123",
        "X-Project": "chatbot"
    }
)
```

Export usage by client from dashboard → Add markup → Invoice. Done in 30 seconds.

### 🌍 Multi-Provider Support

One API key, all providers:

```python
# OpenAI
model="gpt-4o"

# Anthropic
model="claude-3-5-sonnet-20241022"

# Google
model="gemini-1.5-pro"
```

No need to manage separate API keys or learn different SDKs.

---

## Pricing

### Pro Plan: $99/month

✅ 3 million tokens included
✅ Intelligent routing (40-50% savings)
✅ Budget caps & spending alerts
✅ Per-client tracking & CSV export
✅ Automatic failover across providers
✅ OpenAI-compatible API
✅ Email support

**Overage:** $35 per additional 1M tokens

### Enterprise: Custom

For teams using 10M+ tokens/month:
- Volume discounts
- Bring-your-own-keys (use your own provider credits)
- Custom SLA & dedicated support
- Single sign-on (SSO)

[View full pricing →](https://resultantai.com/pricing)

---

## Use Cases

### 1. **Agencies Billing Clients**

Track AI costs per client automatically. Export monthly usage, apply your markup, and invoice—all in 30 seconds.

**Before AI Gateway:**
Manually tag requests → Query provider dashboards → Reconcile 3 different bills → Calculate markup → Invoice
**Time:** 2-3 hours/month per client

**With AI Gateway:**
Dashboard → Export CSV by client → Send invoice
**Time:** 30 seconds per client

### 2. **No-Code Automation (Make.com, Zapier)**

Prevent runaway costs in automation workflows. One misconfigured loop can drain $200+ in minutes without protection.

**AI Gateway protects you:**
- Budget caps per scenario
- Real-time usage monitoring
- Auto-pause at spending limit

### 3. **SaaS Products with AI Features**

Offer AI features to users without worrying about viral spikes bankrupting you.

**Example:** AI writing assistant
- Set $500/month budget cap
- Get alerts at $400 (80%)
- Requests auto-pause at $500
- Never wake up to a $3,000 surprise bill

### 4. **Multi-Model Applications**

Use the best model for each task without managing multiple API keys:

- Customer support: GPT-4o-mini (cheap, fast)
- Code generation: Claude Sonnet (best quality)
- Data extraction: GPT-4o-mini (95%+ accuracy)

One API, automatic routing, unified tracking.

---

## Comparison

### vs Portkey

| Feature | AI Gateway | Portkey |
|---------|------------|---------|
| Pricing model | $99/mo with 3M tokens | $49/mo + provider costs |
| Real cost (3M tokens) | $99 | $49 + $7.50 = $56.50 |
| Intelligent routing | ✓ Built-in | ✓ Config required |
| Tokens included | ✓ 3M | ✕ Pay separately |
| Setup time | 5 minutes | 15-30 minutes |

**Winner:** AI Gateway for predictable pricing, Portkey for 10M+ tokens/month

[Full comparison →](https://resultantai.com/compare/portkey)

### vs Helicone

| Feature | AI Gateway | Helicone |
|---------|------------|----------|
| Focus | Cost management | Observability |
| Budget caps | ✓ | ✕ |
| Intelligent routing | ✓ | ✕ |
| Request logging | Basic | ✓ Comprehensive |
| Can use together? | Yes! | Yes! |

**Use both:** AI Gateway for routing + cost control, Helicone for detailed analytics

[Full comparison →](https://resultantai.com/compare/helicone)

### vs Direct API

| Feature | Direct API | AI Gateway |
|---------|-----------|------------|
| Setup | 5 minutes | 5 minutes |
| Budget protection | ✕ | ✓ |
| Automatic failover | ✕ | ✓ |
| Per-client tracking | ✕ Manual | ✓ Built-in |
| Cost (3M tokens) | $7.50 | $99 (includes safety) |
| Bill shock risk | High | Eliminated |

**Use AI Gateway when:** Spending $50+/month OR need budget protection OR billing clients

[Full comparison →](https://resultantai.com/compare/direct-api)

---

## ROI Calculator

**Scenario:** Agency using 3M tokens/month, billing 5 clients

### Without AI Gateway
- Provider cost: $7.50/month (3M tokens at $2.50/1M)
- Time tracking per client: 2 hours/month × 5 clients = 10 hours
- Billable rate: $100/hour
- **Total cost:** $7.50 + (10 × $100) = $1,007.50/month

### With AI Gateway
- AI Gateway: $99/month (includes 3M tokens)
- Time tracking per client: 30 seconds × 5 clients = 2.5 minutes
- Billable rate: $100/hour
- **Total cost:** $99 + $4 = $103/month

**Monthly savings:** $904.50
**ROI:** 904% 🚀

---

## FAQ

### How do I prevent AI bill shock?

AI Gateway prevents bill shock through budget alerts, spending caps, and automatic kill switches. Set a monthly limit, get notified at 80% usage, and automatically pause requests at 100%.

### What's the cheapest LLM for classification tasks?

GPT-4o-mini at $0.15/1M input tokens. AI Gateway can automatically route classification tasks to GPT-4o-mini, saving 20-30x compared to GPT-4o.

### How do I track AI costs per client?

Tag requests with a client ID header. AI Gateway tracks usage and costs per client automatically. Export to CSV for invoicing.

```python
extra_headers={"X-Client-ID": "client-123"}
```

### Does AI Gateway work with Make.com?

Yes. Use the HTTP module to call AI Gateway's API instead of OpenAI directly. You get budget controls, per-scenario tracking, and automatic failover.

### Is AI Gateway compatible with the OpenAI SDK?

100% compatible. AI Gateway implements the OpenAI API specification. Just change the `base_url`—your existing code works unchanged.

### What happens when OpenAI goes down?

AI Gateway automatically fails over to Claude or Gemini within milliseconds. Your requests continue working with zero downtime.

### Can I use my own API keys?

Yes, on Enterprise plans. Provide your own OpenAI/Anthropic/Google keys and AI Gateway handles routing, monitoring, and failover while billing goes to your provider accounts.

---

## Support

- **Documentation:** [docs.resultantai.com](https://resultantai.com/docs) *(coming soon)*
- **Email:** chris@resultantai.com
- **Status page:** [status.resultantai.com](https://status.resultantai.com) *(coming soon)*

---

## Roadmap

### Q1 2025
- ✅ Multi-provider routing (OpenAI, Anthropic, Google)
- ✅ Budget caps & spending alerts
- ✅ Per-client tracking
- ✅ Intelligent routing
- ✅ Automatic failover
- 🔄 Prompt caching
- 🔄 Streaming support for all providers

### Q2 2025
- Custom routing rules (route by prompt pattern)
- A/B testing (split traffic between models)
- Webhook alerts (budget, downtime, performance)
- Team collaboration (shared dashboards)

### Q3 2025
- Self-hosted option (on-premise deployment)
- Advanced analytics (latency P50/P95/P99)
- Prompt management & versioning
- Rate limiting per client

---

## License

AI Gateway is proprietary software. See [LICENSE](LICENSE) for details.

---

## Contributing

AI Gateway is not open source, but we welcome:
- Bug reports
- Feature requests
- Documentation improvements

Please open an issue or email chris@resultantai.com.

---

## About ResultantAI

ResultantAI builds tools for developers and agencies using LLMs. Our mission: make AI costs predictable and manageable.

**Other products:**
- AI Gateway (this project)
- *(More coming soon)*

---

**Get started:** [resultantai.com/gateway](https://resultantai.com/gateway)
**Questions?** chris@resultantai.com

---

⭐ If you find AI Gateway useful, star this repo and share with your team!
