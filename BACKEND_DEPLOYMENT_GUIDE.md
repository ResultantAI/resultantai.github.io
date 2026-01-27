# Backend Deployment Guide - ResultantAI Chatbot

## Quick Deploy to Render.com (Recommended - FREE)

Render.com offers a free tier perfect for the chatbot API. No credit card required!

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (easiest option)
3. Authorize Render to access your repositories

### Step 2: Deploy Web Service

1. Click **"New +"** → **"Web Service"**

2. **Connect Repository**:
   - Select `ResultantAI/resultantai.github.io`
   - Click **"Connect"**

3. **Configure Service**:
   ```
   Name: resultantai-chatbot-api
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: (leave blank)
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn server:app
   ```

4. **Select Plan**:
   - Choose **"Free"** plan ($0/month)
   - Note: Free tier spins down after 15 min of inactivity (takes ~30s to wake up)

5. **Add Environment Variables**:
   Click **"Advanced"** → **"Add Environment Variable"**

   Add these variables:
   ```
   ANTHROPIC_API_KEY = sk-ant-api03-YOUR-KEY-HERE
   MODEL_NAME = claude-sonnet-4-5-20250929
   MAX_TOKENS = 2048
   PORT = 10000
   ```

   ⚠️ Replace `sk-ant-api03-YOUR-KEY-HERE` with your actual Anthropic API key from https://console.anthropic.com/settings/keys

6. **Create Web Service**:
   - Click **"Create Web Service"**
   - Render will automatically deploy your backend

### Step 3: Wait for Deployment

- Watch the logs as it deploys
- Should complete in 2-3 minutes
- Look for: `Starting Resultant AI API Server on port 10000...`

### Step 4: Get Your API URL

Once deployed, you'll see:
```
Your service is live at https://resultantai-chatbot-api.onrender.com
```

Copy this URL! You'll need it for the next step.

### Step 5: Test Your Backend

Test the health endpoint:
```bash
curl https://resultantai-chatbot-api.onrender.com/health
```

Should return:
```json
{
  "status": "healthy",
  "service": "resultant-ai-api",
  "scripts_available": {
    "chatbot": true
  }
}
```

Test the chat endpoint:
```bash
curl -X POST https://resultantai-chatbot-api.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "We need a propane delivery system",
    "conversation_history": [],
    "page_context": {"page_type": "propane"}
  }'
```

Should return a chatbot response!

---

## Alternative: Deploy to Heroku

If you prefer Heroku (requires credit card, $5/month minimum):

### Step 1: Install Heroku CLI

```bash
brew install heroku
heroku login
```

### Step 2: Create Heroku App

```bash
cd /Users/cj/resultantai.github.io
heroku create resultantai-chatbot-api
```

### Step 3: Set Environment Variables

```bash
heroku config:set ANTHROPIC_API_KEY=sk-ant-api03-YOUR-KEY-HERE
heroku config:set MODEL_NAME=claude-sonnet-4-5-20250929
heroku config:set MAX_TOKENS=2048
```

Replace `sk-ant-api03-YOUR-KEY-HERE` with your actual API key.

### Step 4: Deploy

```bash
git push heroku main
```

### Step 5: Test

```bash
heroku open
curl https://resultantai-chatbot-api.herokuapp.com/health
```

---

## After Backend Deployment

Once your backend is live, update the frontend:

### Update chatbot.js

Edit `js/chatbot.js` line 20:

```javascript
const CONFIG = {
  apiEndpoint: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/chat'
    : 'https://resultantai-chatbot-api.onrender.com/chat', // <-- UPDATE THIS
  storageKey: 'resultant_chat_history',
  maxHistoryLength: 20,
};
```

Replace `resultantai-chatbot-api.onrender.com` with your actual backend URL.

### Commit and Push

```bash
git checkout -b update-chatbot-api-endpoint
git add js/chatbot.js
git commit -m "Update chatbot API endpoint to production backend"
git push -u origin update-chatbot-api-endpoint
gh pr create --title "Update Chatbot API Endpoint" --body "Points chatbot to production backend API" --base main
gh api repos/ResultantAI/resultantai.github.io/pulls/119/merge -X PUT -f merge_method=squash
```

---

## Monitoring Your Backend

### Render.com Dashboard

- View logs: Dashboard → Your Service → Logs
- See metrics: Dashboard → Your Service → Metrics
- Check status: Dashboard → Your Service

### Check API Health

```bash
curl https://your-backend-url.onrender.com/health
```

### View Logs

On Render:
- Go to your service dashboard
- Click "Logs" tab
- See real-time logs

On Heroku:
```bash
heroku logs --tail
```

---

## Troubleshooting

### Backend Not Responding

1. Check Render dashboard for errors
2. View logs for Python errors
3. Verify environment variables are set
4. Test health endpoint

### API Key Error

```
ANTHROPIC_API_KEY not found in environment
```

Solution: Re-add environment variable in Render dashboard.

### CORS Errors in Browser

If you see CORS errors, verify `server.py` has:

```python
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"]
    }
})
```

### Free Tier Spin-Down

Render free tier spins down after 15 minutes of inactivity.

First message may take 20-30 seconds as it wakes up. This is normal!

To avoid: Upgrade to paid plan ($7/month) for always-on.

---

## Cost Breakdown

### Render.com
- **Free Tier**: $0/month (spins down after inactivity)
- **Starter**: $7/month (always on, 512MB RAM)
- **Pro**: $25/month (more resources)

### Heroku
- **Eco**: $5/month (spins down)
- **Basic**: $7/month (always on)
- **Standard**: $25+/month

### Anthropic API
- **Claude Sonnet 4.5**:
  - Input: $3 per 1M tokens
  - Output: $15 per 1M tokens
- **Estimated**: ~$210/month for 100 conversations/day

### Total Monthly Cost
- **Free**: $0 hosting + $210 AI = **$210/month**
- **Always-on**: $7 hosting + $210 AI = **$217/month**

---

## Upgrade to Paid Plan (Optional)

If you want always-on (no spin-down):

1. Go to Render dashboard
2. Click your service
3. Settings → Plan
4. Upgrade to **Starter** ($7/month)
5. Confirm

---

## Security Best Practices

✅ **DO**:
- Keep API key in environment variables
- Use HTTPS for all requests
- Monitor API usage
- Set rate limits (future enhancement)

❌ **DON'T**:
- Commit API keys to Git
- Expose backend URL publicly without rate limiting
- Use DEBUG=true in production

---

## Next Steps

Once backend is deployed:

1. ✅ Test health endpoint
2. ✅ Test chat endpoint with curl
3. ✅ Update frontend API endpoint
4. ✅ Test chatbot on website
5. ✅ Monitor logs for first few days
6. 📊 Set up usage tracking (optional)

---

## Support

Need help?
- Render Docs: https://render.com/docs
- Heroku Docs: https://devcenter.heroku.com
- Email: support@resultantai.com
