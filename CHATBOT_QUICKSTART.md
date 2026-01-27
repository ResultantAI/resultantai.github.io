# ResultantAI Chatbot - Quick Start Guide

Get your chatbot running in 5 minutes!

## Prerequisites

- Python 3.8+
- Anthropic API key ([get one here](https://console.anthropic.com/settings/keys))
- Modern web browser

---

## 1. Backend Setup (2 minutes)

### Install dependencies:
```bash
cd /Users/cj/resultantai.github.io
pip install anthropic flask flask-cors
```

### Add your API key:
```bash
# Create .env file
echo "ANTHROPIC_API_KEY=sk-ant-api03-YOUR-KEY-HERE" > .env
```

### Test the backend:
```bash
# Run test suite
python test_chatbot.py

# Should see: ✅ All tests passed!
```

---

## 2. Start the Server (30 seconds)

```bash
python server.py
```

You should see:
```
Starting Resultant AI API Server on port 5000...
Available endpoints:
  GET  http://localhost:5000/health
  POST http://localhost:5000/chat
```

Leave this terminal open!

---

## 3. Add to Your Website (1 minute)

Open any HTML file (e.g., `index.html`) and add:

**In the `<head>` section:**
```html
<link rel="stylesheet" href="/css/chatbot.css">
```

**Before the closing `</body>` tag:**
```html
<script src="/js/chatbot.js"></script>
```

### Example:
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="stylesheet" href="/css/chatbot.css">  <!-- ADD THIS -->
</head>
<body>
  <h1>Welcome</h1>

  <script src="/js/main.js"></script>
  <script src="/js/chatbot.js"></script>  <!-- ADD THIS -->
</body>
</html>
```

---

## 4. Test It! (1 minute)

1. Open your HTML file in a browser:
   ```bash
   open index.html
   # or
   python -m http.server 8000
   # then visit http://localhost:8000
   ```

2. Look for the green chat button in the bottom-right corner

3. Click it and type: "We need a propane delivery system"

4. You should get a response about propane systems!

---

## 5. Add to All Pages (30 seconds)

Run this script to add the chatbot to ALL HTML files:

```bash
cd /Users/cj/resultantai.github.io

# Backup first (recommended)
cp -r . ../resultantai-backup

# Add to all HTML files
for file in *.html; do
  if ! grep -q "chatbot.css" "$file"; then
    sed -i '' '/<\/head>/i\
  <link rel="stylesheet" href="/css/chatbot.css">\
' "$file"
  fi
  if ! grep -q "chatbot.js" "$file"; then
    sed -i '' '/<\/body>/i\
  <script src="/js/chatbot.js"></script>\
' "$file"
  fi
done

echo "✅ Chatbot added to all HTML files!"
```

---

## Troubleshooting

### "API connection failed"
- ✅ Check Flask server is running
- ✅ Check API key in `.env`
- ✅ Check browser console for errors

### "Chatbot button not showing"
- ✅ Check `chatbot.css` loaded (DevTools → Network)
- ✅ Check `chatbot.js` loaded (DevTools → Network)
- ✅ Check browser console for JavaScript errors

### "Empty responses"
- ✅ Check Anthropic API key is valid
- ✅ Check Flask server logs for errors
- ✅ Test endpoint: `curl http://localhost:5000/health`

---

## Next Steps

- 📖 Read full documentation: `CHATBOT_README.md`
- 🚀 Deploy to production: `CHATBOT_IMPLEMENTATION_SUMMARY.md`
- 🎨 Customize styling: `css/chatbot.css`
- 🧠 Adjust AI behavior: `chatbot.py`

---

## Quick Commands

```bash
# Start server
python server.py

# Run tests
python test_chatbot.py

# Check API health
curl http://localhost:5000/health

# Test chat endpoint
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "conversation_history": [], "page_context": {"page_type": "homepage"}}'

# Clear chat history in browser console
clearChatHistory()
```

---

## Need Help?

- 📧 Email: support@resultantai.com
- 📖 Full docs: `CHATBOT_README.md`
- 🐛 Troubleshooting: See "Troubleshooting" section in `CHATBOT_README.md`

---

**That's it! Your chatbot is now live.** 🎉

Try these test messages:
- "We run a propane delivery business"
- "How much does it cost?"
- "Can you help with marketing agency automation?"
- "We're looking for a concrete dispatch system"
