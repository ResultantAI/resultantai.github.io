# Google Analytics & Tag Manager Setup Guide
**Website:** resultantai.com
**Date:** December 4, 2025

---

## ✅ What's Already Done

All HTML pages (13 files) now have:
- ✅ Google Tag Manager (GTM) container: `GTM-WBGJ9J8X`
- ✅ Google Analytics 4 (GA4) measurement ID: `G-DY95GS9YX5`
- ✅ Google Search Console verification placeholder
- ✅ Custom event tracking script (`/js/tracking.js`)

---

## 🎯 Next Steps

### 1. Configure Google Tag Manager

**Action Required:** Add GA4 to your GTM container

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Open container `GTM-WBGJ9J8X` for `www.resultantai.com`
3. Click **"Tags"** → **"New"**
4. Name: `GA4 - Configuration`
5. Tag Configuration:
   - Choose **"Google Analytics: GA4 Configuration"**
   - Measurement ID: `G-DY95GS9YX5`
6. Triggering: **"All Pages"**
7. Click **"Save"**
8. Click **"Submit"** → **"Publish"**

---

### 2. Verify Google Analytics 4

**Action Required:** Confirm GA4 is receiving data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select property with Measurement ID `G-DY95GS9YX5`
3. Navigate to **"Reports"** → **"Realtime"**
4. Open your website: https://www.resultantai.com
5. You should see yourself as an active user
6. Check that page views are being tracked

**Expected Events:**
- `page_view` - Automatic
- `cta_click` - Button clicks
- `demo_request_click` - Demo buttons
- `contact_click` - Contact/email links
- `form_submit` - Form submissions
- `scroll_depth` - 25%, 50%, 75%, 90%, 100%
- `outbound_link_click` - External links
- `video_play` / `video_complete` - Video interactions

---

### 3. Set Up Google Search Console

**Action Required:** Get your verification code

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click **"Add Property"**
3. Enter: `https://www.resultantai.com`
4. Choose verification method: **"HTML tag"**
5. Copy the verification code (looks like: `abcdef1234567890`)
6. Update all HTML pages:
   - Find: `<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE">`
   - Replace `YOUR_VERIFICATION_CODE_HERE` with your actual code
7. Commit and push changes to GitHub
8. Return to Search Console and click **"Verify"**

**Quick Update Command:**
```bash
cd /Users/cj/resultantai.github.io
find . -name "*.html" -type f -exec sed -i '' 's/YOUR_VERIFICATION_CODE_HERE/YOUR_ACTUAL_CODE/g' {} +
git add .
git commit -m "Add Google Search Console verification"
git push
```

---

### 4. Submit Sitemap to Search Console

**Action Required:** Help Google index your site

1. In Google Search Console, go to **"Sitemaps"** (left sidebar)
2. Enter: `https://www.resultantai.com/sitemap.xml`
3. Click **"Submit"**

**Note:** You already have `sitemap.xml` in your root directory.

---

## 📊 Tracking Implementation Details

### Custom Events Tracking

The `/js/tracking.js` script automatically tracks:

| Event | Trigger | Parameters |
|-------|---------|------------|
| `cta_click` | Any element with `data-track-cta` attribute | `cta_name`, `cta_location`, `cta_text` |
| `demo_request_click` | Links containing "demo" | `link_text`, `link_url` |
| `gateway_signup_click` | Links to gateway.resultantai.com | `link_text` |
| `contact_click` | Contact links or mailto links | `contact_method`, `link_text` |
| `form_submit` | All form submissions | `form_name`, `form_location` |
| `scroll_depth` | User scrolls 25%, 50%, 75%, 90%, 100% | `scroll_percentage`, `page_path` |
| `outbound_link_click` | External website links | `link_url`, `link_text`, `link_domain` |
| `video_play` | Video starts playing | `video_title`, `video_location` |
| `video_complete` | Video finishes | `video_title`, `video_location` |
| `page_load_time` | Page finishes loading | `load_time_ms`, `page_path` |

### Add Custom Tracking to Buttons

To track specific CTA buttons, add the `data-track-cta` attribute:

```html
<button data-track-cta="Get Started">Get Started</button>
<a href="/demo" data-track-cta="Request Demo">Request Demo</a>
```

### Manual Event Tracking

You can track custom events manually:

```javascript
// Example: Track successful form submission
window.trackEvent('lead_generated', {
  'form_name': 'Contact Form',
  'lead_source': 'Website',
  'lead_value': 1000
});
```

---

## 🔧 GTM Configuration Recommendations

### Recommended Tags to Add in GTM:

1. **Facebook Pixel** (if using Facebook Ads)
2. **LinkedIn Insight Tag** (if using LinkedIn Ads)
3. **Hotjar** or **Microsoft Clarity** (heatmaps/session recording)
4. **Google Ads Conversion Tracking** (if running ads)

### Recommended Triggers to Create:

1. **Form Submission** - Fire on `form_submit` event
2. **CTA Clicks** - Fire on `cta_click` event
3. **Demo Requests** - Fire on `demo_request_click` event
4. **Deep Scroll** - Fire on `scroll_depth` event when percentage = 75

### Recommended Variables to Create:

1. **Page Path** - Built-in variable
2. **Click Text** - Built-in variable
3. **Form Name** - Event parameter: `form_name`
4. **CTA Name** - Event parameter: `cta_name`

---

## 🎨 GA4 Custom Reports to Create

### 1. Conversion Funnel
Track: Homepage → Services → Contact → Demo Request

### 2. Engagement Report
- Average scroll depth
- Video completion rate
- Time on page
- Page views per session

### 3. Traffic Sources Report
- Organic vs Paid
- Top referring domains
- Social media traffic

### 4. CTA Performance
- Which CTAs get the most clicks
- CTA click-through rate by page
- Best performing CTA locations

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] GTM container loads on all pages
- [ ] GA4 receives pageviews in Realtime report
- [ ] Custom events appear in GA4 DebugView
- [ ] Search Console verification successful
- [ ] Sitemap submitted and indexed
- [ ] No JavaScript errors in browser console
- [ ] Tracking works on mobile devices
- [ ] Tracking works with ad blockers (GTM bypasses some)

---

## 🐛 Troubleshooting

### GTM Not Loading
- Check browser console for errors
- Verify GTM container ID: `GTM-WBGJ9J8X`
- Clear browser cache
- Check if ad blocker is interfering

### GA4 Not Receiving Data
- Verify GTM tag is published
- Check GA4 Measurement ID: `G-DY95GS9YX5`
- Use GA4 DebugView mode (add `?debug_mode=true` to URL)
- Wait 24-48 hours for data to appear in standard reports

### Custom Events Not Firing
- Open browser console to see tracking logs
- Check `tracking.js` loaded successfully
- Verify elements have correct attributes (`data-track-cta`)
- Use GTM Preview mode to debug

---

## 📞 Support

For tracking issues:
1. Check browser console for JavaScript errors
2. Use [Google Tag Assistant](https://tagassistant.google.com/)
3. Enable GTM Preview mode to debug tag firing
4. Use GA4 DebugView to see events in real-time

---

## 📝 Files Modified

All tracking implementation files:
- `index.html` - Main homepage (manually updated)
- `about/index.html`
- `contact-us/index.html`
- `pricing/index.html`
- `services/index.html`
- `gateway/index.html`
- `demo/hubspot_shopify/index.html`
- `demo/gallery/index.html`
- `reddit/index.html`
- `reddit/one-key/index.html`
- `reddit/bill-shock/index.html`
- `reddit/reddit-landing-white.html`
- `tools/make-validator.html`
- `js/tracking.js` - Custom event tracking (NEW)

**Total:** 13 HTML pages + 1 JavaScript file

---

**Setup Date:** December 4, 2025
**Status:** ✅ Code implemented, pending GA4/GTM/Search Console configuration
