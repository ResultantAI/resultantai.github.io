# ResultantAI Website Chatbot

AI-powered chatbot for ResultantAI.com using Claude API with industry detection, page-aware context, and conversation management.

## Features

- **Industry Detection**: Automatically detects visitor's industry (propane, concrete, field services, agencies, B2B, trucking)
- **Page-Aware Context**: Customizes responses based on which page the visitor is viewing
- **Conversation Persistence**: Stores conversation history in localStorage
- **Mobile Responsive**: Works seamlessly on desktop and mobile
- **HubSpot Integration**: Automatically suggests booking calls when appropriate
- **UTM Tracking**: Captures utm_source and utm_campaign parameters

## Architecture

### Backend (Python + Flask)
- `chatbot.py` - Main chatbot logic using Claude API
- `server.py` - Flask server with `/chat` endpoint
- Uses Anthropic's Claude API (claude-sonnet-4-5-20250929)

### Frontend (JavaScript + CSS)
- `js/chatbot.js` - Chatbot widget logic
- `css/chatbot.css` - Chatbot styling matching ResultantAI design system

## Installation

### 1. Backend Setup

#### Install Dependencies

```bash
cd /Users/cj/resultantai.github.io

# Install required Python packages
pip install anthropic flask flask-cors

# Or use requirements.txt if you have one
pip install -r requirements.txt
```

#### Configure Environment Variables

Create or update `.env` file:

```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your Anthropic API key
nano .env
```

Add your API key:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MODEL_NAME=claude-sonnet-4-5-20250929
MAX_TOKENS=2048
```

#### Test Backend Locally

```bash
# Start the Flask server
python server.py

# In another terminal, test the chatbot endpoint
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "We need a propane delivery system",
    "conversation_history": [],
    "page_context": {
      "page_type": "propane",
      "url": "https://resultantai.com/propane.html"
    }
  }'
```

Expected response:
```json
{
  "response": "Paper tickets are one of the biggest revenue leaks...",
  "detected_industry": "propane",
  "should_offer_booking": true,
  "booking_url": "https://meetings.hubspot.com/resultantai/paper-to-digital",
  "timestamp": "2026-01-26T..."
}
```

### 2. Frontend Setup

#### Add to HTML Pages

Add these lines to the `<head>` section of **all** HTML pages:

```html
<!-- Chatbot Styles -->
<link rel="stylesheet" href="/css/chatbot.css">
```

Add this line just before the closing `</body>` tag:

```html
<!-- Chatbot Widget -->
<script src="/js/chatbot.js"></script>
```

#### Example: Update index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ResultantAI</title>

  <!-- Existing styles -->
  <link rel="stylesheet" href="css/styles.css">

  <!-- ADD CHATBOT STYLES -->
  <link rel="stylesheet" href="css/chatbot.css">
</head>
<body>

  <!-- Your page content -->

  <!-- Existing scripts -->
  <script src="js/main.js"></script>

  <!-- ADD CHATBOT SCRIPT -->
  <script src="js/chatbot.js"></script>
</body>
</html>
```

### 3. Deploy Backend

#### Option A: Deploy to Production Server

1. Update API endpoint in `js/chatbot.js`:

```javascript
const CONFIG = {
  apiEndpoint: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/chat'
    : 'https://api.resultantai.com/chat', // <-- Update this URL
  // ...
};
```

2. Deploy Flask server to your production environment (AWS, DigitalOcean, Heroku, etc.)

3. Configure CORS in `server.py` if needed (already set to allow all origins)

#### Option B: Use Serverless (AWS Lambda, Vercel, etc.)

You can adapt `chatbot.py` to work with serverless functions. Example for AWS Lambda:

```python
import json
from chatbot import chat

def lambda_handler(event, context):
    """AWS Lambda handler for chatbot"""
    try:
        body = json.loads(event['body'])
        result = chat(body)

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }
```

## Configuration

### Page Type Detection

The chatbot automatically detects page type based on URL:

| URL Contains | Page Type | Welcome Message |
|-------------|-----------|----------------|
| `/propane` | propane | "Looking at propane delivery systems?..." |
| `/logistics` or `/trucking` | logistics | "Interested in trucking and logistics..." |
| `/field-services` | field-services | "Checking out our field services solutions?..." |
| `/agencies` | agencies | "Looking at solutions for marketing agencies?..." |
| `/b2b` | b2b | "Interested in scaling your B2B service business?..." |
| `/case-studies` | case-studies | "These case studies show real results..." |
| `/gateway` | gateway | "AI Gateway helps agencies and SaaS companies..." |
| Default | homepage | "Hey there. I can help you figure out..." |

### Customizing Welcome Messages

Edit `chatbot.py` to customize welcome messages:

```python
WELCOME_MESSAGES = {
    'propane': "Your custom propane message here",
    'logistics': "Your custom logistics message here",
    # ... add more
}
```

Also update `js/chatbot.js` for consistency:

```javascript
const welcomeMessages = {
  propane: "Your custom propane message here",
  logistics: "Your custom logistics message here",
  // ... add more
};
```

### Industry Detection Keywords

Edit the `detect_industry()` function in `chatbot.py` to add/modify keywords:

```python
def detect_industry(message: str, conversation_history: List[Dict[str, str]], page_type: str) -> str:
    message_lower = message.lower()

    if any(word in message_lower for word in ['propane', 'fuel', 'heating oil']):
        return 'propane'

    # Add your custom keywords
    if 'your_keyword' in message_lower:
        return 'your_industry'

    # ...
```

### Booking Logic

The chatbot suggests booking a call when it detects interest signals. Customize in `chatbot.py`:

```python
def should_offer_booking(message: str, assistant_response: str) -> bool:
    interest_signals = [
        'interested', 'how much', 'pricing', 'cost',
        'demo', 'call', 'next step'
        # Add more signals
    ]
    # ...
```

## Usage

### For Visitors

1. Click the green chat button in the bottom-right corner
2. Type a message or question
3. The chatbot responds based on their industry and page context
4. When appropriate, the chatbot offers a "Book a Call" button
5. Conversation persists across page navigation (stored in localStorage)

### For Developers

#### Clear Chat History (Console)

```javascript
clearChatHistory();
```

#### Check Conversation State

```javascript
// Open browser console and check localStorage
localStorage.getItem('resultant_chat_history');
```

#### Test Different Page Contexts

Navigate to different pages and the chatbot will adjust its context:
- `/propane.html` → Propane-specific responses
- `/agencies.html` → Agency-specific responses
- etc.

## API Reference

### POST /chat

Endpoint for chatbot conversations.

**Request:**

```json
{
  "message": "We need help with propane delivery",
  "conversation_history": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hey there..."}
  ],
  "page_context": {
    "url": "https://resultantai.com/propane.html",
    "page_type": "propane",
    "utm_source": "google",
    "utm_campaign": "propane_spring_2026"
  }
}
```

**Response:**

```json
{
  "response": "Paper tickets are one of the biggest revenue leaks...",
  "detected_industry": "propane",
  "should_offer_booking": true,
  "booking_url": "https://meetings.hubspot.com/resultantai/paper-to-digital",
  "timestamp": "2026-01-26T12:34:56.789Z"
}
```

**Error Response:**

```json
{
  "error": "Anthropic API error: ...",
  "error_type": "api_error",
  "timestamp": "2026-01-26T12:34:56.789Z"
}
```

## Troubleshooting

### Chatbot Not Appearing

1. Check browser console for JavaScript errors
2. Verify `chatbot.js` and `chatbot.css` are loading:
   - Open DevTools → Network tab
   - Look for `chatbot.js` and `chatbot.css`
3. Check CSS specificity conflicts

### API Connection Errors

1. Verify Flask server is running: `http://localhost:5000/health`
2. Check CORS settings in `server.py`
3. Verify API endpoint URL in `js/chatbot.js`
4. Check Anthropic API key in `.env`

### Conversation Not Persisting

1. Check browser localStorage (DevTools → Application → Local Storage)
2. Verify `resultant_chat_history` key exists
3. Check for localStorage quota errors in console

### Styling Issues

1. Verify CSS variables are defined in `styles.css`
2. Check for CSS conflicts with existing styles
3. Test in different browsers

## Customization

### Change Color Scheme

Edit `css/chatbot.css`:

```css
.chat-toggle {
  background: linear-gradient(135deg, #your-color, #your-color-light);
}
```

### Change Avatar

Edit `js/chatbot.js`:

```javascript
const avatar = role === 'user' ? 'U' : 'R'; // Change 'R' to anything
```

Or replace with an image:

```javascript
messageEl.innerHTML = `
  <img src="/images/avatar.png" class="message-avatar" alt="Avatar">
  <div class="message-content">
    ${formattedContent}
  </div>
`;
```

### Add Analytics Tracking

Track chatbot interactions:

```javascript
// In sendMessage() function, add:
if (window.gtag) {
  gtag('event', 'chatbot_message', {
    'event_category': 'Chatbot',
    'event_label': pageContext.page_type,
  });
}
```

## Security Considerations

1. **API Key Protection**: Never expose your Anthropic API key in frontend code. Always call via backend.
2. **Rate Limiting**: Consider adding rate limiting to prevent API abuse
3. **Input Validation**: Sanitize user inputs before processing
4. **CORS**: Configure CORS appropriately for production

## Performance Optimization

1. **Lazy Loading**: Chatbot loads asynchronously and doesn't block page render
2. **Conversation Trimming**: Limits stored history to last 20 messages
3. **Caching**: Consider caching common responses on the backend
4. **CDN**: Host static assets (CSS/JS) on CDN in production

## Future Enhancements

Potential improvements:

- [ ] Add typing animation for assistant responses
- [ ] Support file uploads (PDFs, screenshots)
- [ ] Add quick reply buttons
- [ ] Integrate with CRM (HubSpot, Salesforce)
- [ ] Add sentiment analysis
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Analytics dashboard

## Support

For issues or questions:
- Email: support@resultantai.com
- GitHub Issues: [your-repo]/issues

## License

Copyright © 2026 ResultantAI. All rights reserved.
