# System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                              │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   React UI   │  │  WordPress   │  │  Any Client  │           │
│  │              │  │              │  │              │           │
│  │  MainChat.js │  │   PHP App    │  │  Vue/Angular │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │
│         │                 │                 │                     │
└─────────┼─────────────────┼─────────────────┼─────────────────────┘
          │                 │                 │
          │  HTTP/JSON      │                 │
          │  (with cookies) │                 │
          ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         MIDDLEWARE LAYER                            │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    EXPRESS SERVER                            │ │
│  │                   (Port 5000)                                │ │
│  │                                                              │ │
│  │  ┌────────────┐  ┌─────────────┐  ┌────────────────────┐  │ │
│  │  │   CORS     │  │   Session   │  │   Body Parser      │  │ │
│  │  │  Middleware│  │  Middleware │  │   (JSON)           │  │ │
│  │  └────────────┘  └─────────────┘  └────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌───────────────────────────────────────────────────────┐ │ │
│  │  │              ROUTING LAYER                            │ │ │
│  │  │                                                        │ │ │
│  │  │  GET  /api/health         → Health Check             │ │ │
│  │  │  POST /api/chat           → Send Message             │ │ │
│  │  │  GET  /api/chat/history   → Get History              │ │ │
│  │  │  DELETE /api/chat/history → Clear History            │ │ │
│  │  └───────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CONTROLLER LAYER                               │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │              chatController.js                               │ │
│  │                                                              │ │
│  │  • sendMessage()     - Process chat requests                │ │
│  │  • getHistory()      - Retrieve conversation                │ │
│  │  • clearHistory()    - Reset conversation                   │ │
│  │                                                              │ │
│  │  • Input validation                                         │ │
│  │  • Error handling                                           │ │
│  │  • Session management                                       │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                                 │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │              openaiService.js                                │ │
│  │                                                              │ │
│  │  • getChatCompletion() - Call OpenAI API                    │ │
│  │  • isConfigured()      - Check API key                      │ │
│  │                                                              │ │
│  │  • OpenAI SDK integration                                   │ │
│  │  • Model configuration                                      │ │
│  │  • Response processing                                      │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              │ HTTPS/TLS
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL API LAYER                             │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │              OpenAI ChatGPT API                              │ │
│  │              (api.openai.com)                                │ │
│  │                                                              │ │
│  │  Models:                                                     │ │
│  │  • gpt-3.5-turbo   (Fast, cost-effective)                  │ │
│  │  • gpt-4           (Advanced, higher cost)                  │ │
│  │  • gpt-4-turbo     (Balanced)                               │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                      SESSION STORAGE                                │
│                                                                     │
│  Session ID: abc123                                                │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ conversationHistory: [                                        │ │
│  │   { role: "system", content: "You are Sakura..." },          │ │
│  │   { role: "user", content: "Hello" },                        │ │
│  │   { role: "assistant", content: "Hi! How can I help?" },     │ │
│  │   { role: "user", content: "Tell me about yourself" },       │ │
│  │   { role: "assistant", content: "I'm Sakura..." }            │ │
│  │ ]                                                             │ │
│  │ Expires: 24 hours                                             │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  Session ID: xyz789                                                │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ conversationHistory: [                                        │ │
│  │   { role: "user", content: "Hi there" },                     │ │
│  │   { role: "assistant", content: "Hello!" }                   │ │
│  │ ]                                                             │ │
│  │ Expires: 24 hours                                             │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                           DATA FLOW
═══════════════════════════════════════════════════════════════════════

1. User types message in React UI
   ↓
2. Frontend sends POST /api/chat with message + character context
   ↓
3. Express server receives request with session cookie
   ↓
4. CORS middleware validates origin
   ↓
5. Session middleware loads user's conversation history
   ↓
6. chatController validates input
   ↓
7. Add user message to conversation history
   ↓
8. openaiService calls OpenAI API with full history
   ↓
9. OpenAI ChatGPT processes conversation and generates response
   ↓
10. AI response received
   ↓
11. Add AI response to conversation history
   ↓
12. Save session with updated history
   ↓
13. Return JSON: { user: "...", ai: "...", timestamp: "..." }
   ↓
14. Frontend receives response and displays AI message
   ↓
15. Conversation continues with full context preserved


═══════════════════════════════════════════════════════════════════════
                        SECURITY LAYERS
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│ Layer 1: ENVIRONMENT SECURITY                                       │
│  • API keys in .env file (not in code)                             │
│  • .env excluded from version control                              │
│  • Environment-specific configuration                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ Layer 2: NETWORK SECURITY                                           │
│  • CORS restricts allowed origins                                  │
│  • HTTP-only cookies (XSS protection)                              │
│  • Secure cookies in production (HTTPS)                            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ Layer 3: INPUT VALIDATION                                           │
│  • Message content validation                                      │
│  • Type checking                                                   │
│  • Empty string rejection                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ Layer 4: ERROR HANDLING                                             │
│  • Sanitized error messages                                        │
│  • No internal details exposed                                     │
│  • Proper HTTP status codes                                        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ Layer 5: SESSION ISOLATION                                          │
│  • Per-user conversation history                                   │
│  • Session-based access control                                    │
│  • Automatic session expiration                                    │
└─────────────────────────────────────────────────────────────────────┘
```

## File Dependencies

```
index.js
  ├── requires: express, cors, dotenv, express-session
  ├── imports: ./routes/chat
  └── provides: HTTP server on port 5000

routes/chat.js
  ├── requires: express
  ├── imports: ../controllers/chatController
  └── provides: API route definitions

controllers/chatController.js
  ├── imports: ../services/openaiService
  ├── uses: req.session from express-session
  └── provides: sendMessage, getHistory, clearHistory

services/openaiService.js
  ├── requires: openai SDK
  ├── uses: process.env.OPENAI_API_KEY
  └── provides: getChatCompletion, isConfigured
```

## Configuration Flow

```
.env.example
  └── Copy to → .env
                  ├── OPENAI_API_KEY → openaiService.js
                  ├── OPENAI_MODEL → openaiService.js
                  ├── PORT → index.js
                  ├── FRONTEND_URL → CORS config
                  └── SESSION_SECRET → express-session
```
