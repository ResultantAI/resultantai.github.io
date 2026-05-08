# MCA Voice Agent Demo - Deployment Guide

Complete guide for deploying and presenting the MCA Voice Agent demo to prospects.

---

## =Ë Table of Contents

1. [Pre-Demo Preparation](#pre-demo-preparation)
2. [Deployment Options](#deployment-options)
3. [Demo Environment Setup](#demo-environment-setup)
4. [Presentation Checklist](#presentation-checklist)
5. [Technical Requirements](#technical-requirements)
6. [Troubleshooting](#troubleshooting)
7. [Follow-Up Process](#follow-up-process)

---

## <¯ Pre-Demo Preparation

### Research Your Prospect

Before the demo, gather the following information:

- **Current lead volume**: How many leads/day do they process?
- **Current process**: Manual qualification, call center, or mixed?
- **Pain points**: What are their biggest challenges?
- **Tech stack**: What CRM and tools do they use?
- **Decision makers**: Who will be on the call?
- **Budget authority**: Can they make purchase decisions?

### Customize the Demo

1. **Update stats with prospect data**:
   - Calculate their specific ROI
   - Use their industry terminology
   - Reference their lead volume

2. **Prepare relevant scenarios**:
   - Match their typical customer profile
   - Include their common objections
   - Use familiar business types

3. **Set expectations**:
   - Email agenda 24 hours before
   - Confirm attendees and roles
   - Share any pre-demo materials

---

## =€ Deployment Options

### Option 1: Local Demo (Recommended for In-Person)

**Best for**: In-person meetings, trade shows, conferences

**Steps**:
1. Download demo files to laptop
2. Open `index.html` in browser
3. No internet required (after initial load)
4. Full control over presentation pace

**Pros**:
- No dependency on internet
- Fastest load times
- Complete control

**Cons**:
- Must have demo files locally
- Manual updates required

---

### Option 2: GitHub Pages (Recommended for Remote)

**Best for**: Video calls, email sharing, self-service

**Steps**:

1. **Push to GitHub**:
   ```bash
   cd /Users/cj/mca-voice-agent-demo
   git remote add origin https://github.com/ResultantAI/mca-voice-agent-demo.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to "Pages" section
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Click "Save"

3. **Access demo**:
   - URL: `https://resultantai.github.io/mca-voice-agent-demo/`
   - Share link with prospects
   - Accessible 24/7

**Pros**:
- Easy to share
- Always available
- Professional hosting
- Free

**Cons**:
- Requires internet
- Public repository (unless private)

---

### Option 3: Custom Domain

**Best for**: Enterprise prospects, branded experience

**Steps**:

1. **Deploy to GitHub Pages** (see Option 2)

2. **Configure custom domain**:
   - Add CNAME file to repository:
     ```
     demo.resultantai.com
     ```

3. **Update DNS**:
   - Add CNAME record pointing to: `resultantai.github.io`

4. **Enable HTTPS**:
   - Check "Enforce HTTPS" in GitHub Pages settings

**Pros**:
- Professional branding
- Memorable URL
- Enhanced credibility

**Cons**:
- Requires domain access
- DNS propagation time
- Slight additional setup

---

### Option 4: Netlify/Vercel (Alternative)

**Best for**: Advanced features, analytics tracking

**Netlify Setup**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd /Users/cj/mca-voice-agent-demo
netlify deploy --prod
```

**Vercel Setup**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Users/cj/mca-voice-agent-demo
vercel --prod
```

**Pros**:
- Advanced analytics
- A/B testing capabilities
- Form handling
- Better performance

**Cons**:
- Additional platform to manage
- May require account setup

---

## =¥ Demo Environment Setup

### Hardware Requirements

**Minimum**:
- Laptop with 8GB RAM
- Reliable internet connection (if using hosted version)
- External monitor (for in-person demos)
- Quality speakers or headphones

**Recommended**:
- 16GB+ RAM for smooth multitasking
- Backup internet connection (mobile hotspot)
- Presentation remote/clicker
- Professional microphone for video calls

### Software Requirements

**Required**:
- Modern web browser (Chrome recommended)
- Zoom/Teams/Google Meet (for remote demos)
- Email client for follow-up

**Recommended**:
- Screen recording software (Loom, OBS)
- Note-taking app
- CRM access for immediate follow-up
- Calculator for ROI discussions

### Browser Setup

1. **Before the demo**:
   ```bash
   # Clear browser cache
   # Close unnecessary tabs
   # Disable notifications
   # Bookmark demo URL
   # Test audio/video
   ```

2. **Chrome settings**:
   - Zoom level: 100% or 125% (test readability)
   - Disable auto-translate
   - Enable hardware acceleration
   - Clear downloads bar

3. **Privacy mode** (optional):
   - Use incognito window
   - No bookmarks visible
   - Clean presentation

---

##  Presentation Checklist

### 24 Hours Before

- [ ] Confirm meeting time and attendees
- [ ] Test demo on target device
- [ ] Prepare customized ROI calculations
- [ ] Review prospect's business/website
- [ ] Prepare 2-3 relevant case studies
- [ ] Charge laptop and backup devices
- [ ] Download demo files (if local)
- [ ] Test screen sharing
- [ ] Prepare follow-up materials

### 1 Hour Before

- [ ] Close all unnecessary applications
- [ ] Disable notifications (Slack, email, etc.)
- [ ] Test internet connection
- [ ] Open demo in browser
- [ ] Join meeting 5 minutes early
- [ ] Have water nearby
- [ ] Set phone to silent
- [ ] Position lighting/camera
- [ ] Test microphone levels

### During Demo

- [ ] **Intro (2 min)**: Set context and agenda
- [ ] **Pain points (3 min)**: Discuss current challenges
- [ ] **Stats comparison (3 min)**: Show before/after metrics
- [ ] **Live demo (10 min)**: Walk through scenarios
- [ ] **ROI discussion (5 min)**: Calculate their savings
- [ ] **Q&A (5 min)**: Address concerns
- [ ] **Next steps (2 min)**: Set follow-up meeting

### After Demo

- [ ] Send thank you email (within 1 hour)
- [ ] Share demo link for their review
- [ ] Send ROI calculation document
- [ ] Schedule follow-up call
- [ ] Update CRM with notes
- [ ] Send relevant case studies
- [ ] Add to nurture sequence

---

## =' Technical Requirements

### For Presenters

| Component | Requirement | Notes |
|-----------|-------------|-------|
| Browser | Chrome 90+, Firefox 88+, Safari 14+ | Chrome recommended |
| Internet | 10 Mbps+ download | 25+ Mbps for video calls |
| Display | 1920x1080 minimum | Higher resolution better |
| Audio | Built-in or external speakers | Test before demo |
| Microphone | Clear audio required | Headset recommended |

### For Prospects (Viewing)

| Component | Requirement | Notes |
|-----------|-------------|-------|
| Browser | Any modern browser | Mobile responsive |
| Internet | 5 Mbps+ download | Basic browsing speed |
| Display | Any size | Optimized for mobile |
| Audio | Optional | For video scenarios |

---

## <¬ Demo Flow (30-Minute Version)

### Opening (2 minutes)
```
"Today I'll show you how [Prospect Company] can:
- Process 10x more leads with the same team
- Reduce qualification costs by 99%
- Capture 100% of after-hours opportunities
- Scale without adding headcount

Does that sound valuable? Great, let's dive in..."
```

### Stats Comparison (3 minutes)
```
"Let me show you the transformation. Currently, you're
processing about [X] leads per day manually, right?

[Point to BEFORE stats]
This is the typical manual process - 15-20 minutes per
lead, $35-50 cost, limited capacity.

[Point to AFTER stats]
Here's what happens with AI - 2-3 minutes per lead,
$0.21 cost, unlimited scale. Let me show you how..."
```

### Live Scenarios (10 minutes)
```
"Let's walk through a few real-world scenarios:

Scenario 1: Qualified Restaurant Owner
- Watch how the AI builds rapport
- Extracts all qualification criteria
- Makes intelligent routing decision

[Play scenario, narrate key moments]

Scenario 2: Unqualified New Business
- See how it handles objections
- Maintains professional tone
- Sets future follow-up

[Continue through 2-3 scenarios]
```

### ROI Calculation (5 minutes)
```
"Now let's talk about your specific numbers:

Current: [X] leads/day × $40 = $[Y]/month
With AI: [X] leads/day × $0.21 = $[Z]/month

Monthly savings: $[Savings]
Annual savings: $[Annual]

Plus you can now handle [Additional] more leads without
adding staff. That's $[Revenue Opportunity] in additional
funding volume..."
```

### Q&A (5 minutes)
Common questions to prepare for:
- Integration with existing CRM?
- Training time required?
- Handling complex scenarios?
- Compliance and regulations?
- Implementation timeline?
- Support and maintenance?

### Close (2 minutes)
```
"Based on what we've discussed:
- You'd save $[X]/year in qualification costs
- Process [Y] more leads daily
- Capture after-hours opportunities worth $[Z]

Typical ROI timeline is 2-3 weeks.

I'd like to propose a pilot program starting [Date].
We'll run 20% of your leads through the AI for 2 weeks,
measure results, then scale from there.

Can we schedule 30 minutes next week to discuss the
implementation plan?"
```

---

## = Troubleshooting

### Common Issues

**Demo won't load**:
- Check internet connection
- Clear browser cache
- Try incognito/private mode
- Use different browser
- Fallback to local version

**Audio not playing**:
- Check system volume
- Verify browser audio permissions
- Test with different browser
- Use backup device

**Screen sharing issues**:
- Restart screen share
- Share single tab vs entire screen
- Close bandwidth-heavy applications
- Use lower video quality

**Slow performance**:
- Close unnecessary tabs
- Restart browser
- Check available RAM
- Disable browser extensions

### Backup Plans

**Plan A**: Live hosted demo
**Plan B**: Local demo files
**Plan C**: Pre-recorded video walkthrough
**Plan D**: Static screenshots + narration

Always have Plan B ready!

---

## =ç Follow-Up Process

### Immediate Follow-Up (Within 1 Hour)

**Email Template**:
```
Subject: MCA Voice Agent Demo - Next Steps for [Company]

Hi [Name],

Thank you for your time today. As discussed, here's your
personalized ROI summary:

Current Costs: $[X]/month
AI-Powered Costs: $[Y]/month
Annual Savings: $[Z]

Additional capacity: [N] more leads/day
Revenue opportunity: $[Amount]/month

Access the demo anytime: [Demo Link]

I've also attached:
- Case study: [Similar Company]
- Implementation timeline
- Technical integration guide

Let's schedule our implementation planning call for
[Proposed Date/Time]. Please confirm if that works.

Best regards,
[Your Name]
```

### Day 2-3 Follow-Up

- Send relevant case study
- Share customer testimonial video
- Provide technical documentation
- Offer trial/pilot program

### Week 1 Follow-Up

- Check if they've reviewed materials
- Address any new questions
- Present pilot program proposal
- Discuss timeline and pricing

### Ongoing Nurture

- Monthly check-ins
- Share product updates
- Provide industry insights
- Offer competitive intelligence

---

## =Ê Success Metrics

Track these metrics for each demo:

- **Attendance**: Who showed up vs invited?
- **Engagement**: Questions asked, interaction level
- **Duration**: Full demo or cut short?
- **Next steps**: Meeting scheduled?
- **Timeline**: When do they need solution?
- **Budget**: Qualified or research phase?

### Demo Performance Goals

- **Conversion to next meeting**: 60%+
- **Pilot program acceptance**: 30%+
- **Time to close**: 4-6 weeks
- **Average deal size**: $[Target]

---

## <¯ Tips for Success

### Do's
 Practice the demo 3+ times before presenting
 Customize stats and scenarios to prospect
 Focus on their pain points, not features
 Use their terminology and language
 Have ROI calculator ready
 Set clear next steps
 Follow up within 24 hours

### Don'ts
L Wing the demo without preparation
L Talk more than prospect
L Show features they don't need
L Dismiss objections or concerns
L Rush through Q&A
L End without scheduling next call
L Forget to send follow-up materials

---

## =Þ Support Contacts

### Technical Issues
- Email: support@resultantai.com
- Phone: (555) 555-1234
- Slack: #demo-support

### Sales Support
- Demo questions: sales@resultantai.com
- Pricing: pricing@resultantai.com
- Custom demos: solutions@resultantai.com

---

**Ready to close more deals?**

Remember: This demo is about solving their problems, not showing off technology.
Focus on ROI, pain points, and outcomes.

Good luck! =€
