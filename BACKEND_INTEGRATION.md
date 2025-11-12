# ChatGPT Backend Integration - Complete Documentation

## 🎯 Overview

This backend API provides a production-ready integration with OpenAI's ChatGPT API, featuring:

- **Real-time AI conversations** using GPT-4 or GPT-3.5-turbo
- **Session-based memory** for contextual multi-turn conversations
- **Multi-user support** with isolated conversation histories
- **Frontend-agnostic design** compatible with React, WordPress, or any client
- **Robust error handling** with comprehensive error messages
- **RESTful API** with clean JSON responses

---

## 📁 Project Structure

```
server/
├── index.js                          # Main Express server
├── package.json                      # Dependencies & scripts
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── README.md                         # Detailed documentation
├── INTEGRATION_GUIDE.js              # React integration examples
├── ChatGPT_API_Tests.postman_collection.json  # Postman tests
├── controllers/
│   └── chatController.js             # Request handlers
├── routes/
│   └── chat.js                       # API routes
└── services/
    └── openaiService.js              # OpenAI API wrapper
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

This installs:
- `express` - Web server framework
- `openai` - Official OpenAI SDK
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management
- `express-session` - Session management
- `nodemon` - Development auto-reload (dev dependency)

### 2. Configure Environment

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `.env`:
```env
OPENAI_API_KEY=sk-your-actual-openai-api-key
OPENAI_MODEL=gpt-3.5-turbo
PORT=5000
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=random-secret-key-change-in-production
NODE_ENV=development
```

**Get API Key:** https://platform.openai.com/api-keys

### 3. Start Server

```bash
# Development (auto-reload on changes)
npm run dev

# Production
npm start
```

Server runs on: `http://localhost:5000`

---

## 📡 API Endpoints

### 1️⃣ Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

### 2️⃣ Send Message

```http
POST /api/chat
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "characterContext": {
    "name": "Sakura",
    "personality": "Sweet and cheerful",
    "greeting": "Hello Master! ♥"
  }
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | Yes | User's message |
| `characterContext` | object | No | Character info for roleplay |

**Success Response (200):**
```json
{
  "user": "Hello, how are you?",
  "ai": "I'm doing great, thank you for asking! How can I help you today?",
  "timestamp": "2025-11-08T10:30:00.000Z"
}
```

**Error Responses:**
```json
// 400 - Invalid input
{
  "error": "Invalid input",
  "message": "Message is required and must be a non-empty string"
}

// 401 - API key error
{
  "error": "API Authentication Error",
  "message": "Invalid OpenAI API key"
}

// 429 - Rate limit
{
  "error": "Rate Limit Exceeded",
  "message": "Too many requests. Please try again later."
}

// 500 - Server error
{
  "error": "Internal Server Error",
  "message": "Failed to process chat message"
}
```

---

### 3️⃣ Get Conversation History

```http
GET /api/chat/history
```

**Response:**
```json
{
  "history": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help you?"
    }
  ],
  "messageCount": 2
}
```

---

### 4️⃣ Clear Conversation History

```http
DELETE /api/chat/history
```

**Response:**
```json
{
  "success": true,
  "message": "Conversation history cleared"
}
```

---

## 🔧 Technical Implementation

### Session Management

Sessions are managed using `express-session`:

```javascript
// Each user gets a unique session
// Sessions persist for 24 hours
// Conversations are isolated per session
// Session ID is stored in cookies

// Session structure:
{
  conversationHistory: [
    { role: 'system', content: '...' },
    { role: 'user', content: '...' },
    { role: 'assistant', content: '...' }
  ]
}
```

### Conversation Context

The system maintains full conversation context:

1. **System message** (optional): Sets character personality
2. **User messages**: All user inputs
3. **Assistant messages**: All AI responses

This allows ChatGPT to reference previous messages naturally.

### Error Handling

Comprehensive error handling for:
- Invalid inputs
- API authentication issues
- Rate limiting
- Network errors
- OpenAI service outages

---

## 💻 Frontend Integration

### React Example

```javascript
// Using fetch
const sendMessage = async (message) => {
  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // IMPORTANT for sessions
    body: JSON.stringify({ message })
  });
  
  const data = await response.json();
  return data;
};
```

### Using Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // IMPORTANT for sessions
});

const response = await api.post('/chat', { 
  message: 'Hello!' 
});
```

### WordPress/PHP Example

```php
<?php
$ch = curl_init('http://localhost:5000/api/chat');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'message' => 'Hello from WordPress!'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$data = json_decode($response, true);

echo $data['ai']; // AI response
?>
```

---

## 🔒 Security Best Practices

### ✅ Implemented

- ✅ Environment variables for sensitive data
- ✅ CORS configured for specific origins
- ✅ Input validation on all endpoints
- ✅ Error messages don't expose internals
- ✅ HTTP-only cookies for sessions
- ✅ Session expiration (24 hours)

### 🔜 Recommended for Production

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/chat', limiter);
```

```javascript
// Request logging
const morgan = require('morgan');
app.use(morgan('combined'));
```

```javascript
// Security headers
const helmet = require('helmet');
app.use(helmet());
```

---

## 🧪 Testing

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Send message
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!"}'

# Get history
curl http://localhost:5000/api/chat/history

# Clear history
curl -X DELETE http://localhost:5000/api/chat/history
```

### Using Postman

Import `ChatGPT_API_Tests.postman_collection.json` into Postman for ready-to-use test requests.

---

## 🎛️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `OPENAI_API_KEY` | OpenAI API key | - | ✅ Yes |
| `OPENAI_MODEL` | Model (gpt-4, gpt-3.5-turbo) | gpt-3.5-turbo | ❌ No |
| `PORT` | Server port | 5000 | ❌ No |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 | ❌ No |
| `SESSION_SECRET` | Session encryption key | auto-generated | ⚠️ Yes in prod |
| `NODE_ENV` | Environment | development | ❌ No |

### Supported Models

| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| `gpt-3.5-turbo` | Fast | Low | General chat, quick responses |
| `gpt-4` | Slower | High | Complex reasoning, accuracy |
| `gpt-4-turbo` | Medium | Medium | Balance of speed & capability |

---

## 🐛 Troubleshooting

### Server won't start

**Problem:** Port 5000 already in use

**Solution:**
```bash
# Change PORT in .env
PORT=3001
```

### API key error

**Problem:** "Invalid OpenAI API key"

**Solution:**
1. Verify key at https://platform.openai.com/api-keys
2. Ensure key starts with `sk-`
3. Check OpenAI account has credits
4. Restart server after changing `.env`

### CORS errors

**Problem:** CORS policy blocking requests

**Solution:**
1. Set correct `FRONTEND_URL` in `.env`
2. Use `credentials: 'include'` in fetch
3. Use `withCredentials: true` in axios
4. Enable cookies in browser

### Session not persisting

**Problem:** Conversation history resets

**Solution:**
1. Ensure cookies are enabled
2. Use `credentials: 'include'` in requests
3. Check `SESSION_SECRET` is set
4. Verify HTTPS in production

### Rate limiting

**Problem:** "Rate Limit Exceeded"

**Solution:**
1. Wait a few minutes
2. Check OpenAI usage limits
3. Upgrade OpenAI plan if needed
4. Implement request queuing

---

## 📈 Performance Optimization

### Response Time

- Average response: 2-5 seconds
- Depends on: Model, message length, API load

### Recommendations

1. **Use gpt-3.5-turbo** for faster responses
2. **Limit conversation history** to last 10 messages
3. **Implement caching** for common queries
4. **Add loading indicators** in frontend
5. **Stream responses** (future enhancement)

---

## 🔄 Next Steps

### Current Features ✅
- [x] OpenAI ChatGPT integration
- [x] Session-based conversation memory
- [x] Multi-user support
- [x] Error handling
- [x] CORS configuration
- [x] Environment configuration
- [x] API documentation

### Future Enhancements 🚀
- [ ] Response streaming (SSE)
- [ ] Rate limiting middleware
- [ ] Request logging
- [ ] User authentication
- [ ] Database persistence
- [ ] Admin dashboard
- [ ] Analytics & monitoring
- [ ] WebSocket support

---

## 📞 Support

For issues or questions:
1. Check `server/README.md`
2. Review `SETUP_INSTRUCTIONS.md`
3. Test with Postman collection
4. Check server logs for errors

---

## 📄 License

ISC

---

**Created:** November 8, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
