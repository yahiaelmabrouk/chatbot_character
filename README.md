# AI Character Chatbot with ChatGPT Integration

A React-based character chatbot application with integrated OpenAI ChatGPT backend for real-time AI conversations.

## 🌟 Features

- 🎭 **Character-based Chat Interface** - Interactive chat with customizable AI characters
- 🤖 **OpenAI ChatGPT Integration** - Real-time AI responses using GPT-3.5-turbo or GPT-4
- 💾 **Session-based Memory** - Conversations maintain context across multiple messages
- 👥 **Multi-user Support** - Isolated conversation histories per user session
- 🎨 **Modern UI** - Clean, responsive React interface
- 🔒 **Secure Backend** - Environment-based configuration with proper security practices

## 📁 Project Structure

```
chatbottt/
├── src/                          # React frontend
│   ├── components/               # React components
│   │   ├── MainChat.js          # Main chat interface
│   │   ├── Sidebar.js           # Character selection
│   │   └── ChatToggle.js        # Chat toggle button
│   └── contexts/                # React contexts
│       └── ThemeContext.js      # Theme management
│
├── server/                       # Node.js backend
│   ├── index.js                 # Express server
│   ├── controllers/             # Request handlers
│   ├── routes/                  # API routes
│   ├── services/                # OpenAI integration
│   └── README.md               # Backend documentation
│
├── SETUP_INSTRUCTIONS.md        # Quick start guide
├── BACKEND_INTEGRATION.md       # Technical documentation
├── IMPLEMENTATION_SUMMARY.md    # What was implemented
└── ARCHITECTURE.md             # System architecture
```

## 🚀 Quick Start

### Frontend (React App)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Install and run:**
```bash
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Backend (ChatGPT API Server)

**Navigate to server and install:**
```bash
cd server
npm install
```

**Configure environment:**
```bash
copy .env.example .env
# Edit .env and add your OpenAI API key
```

**Start the server:**
```bash
npm run dev
```

The API will run at [http://localhost:5000](http://localhost:5000)

📚 **For detailed backend setup, see:** [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

## 📖 Documentation

- **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Quick start guide for backend setup
- **[BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)** - Complete technical documentation
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What was implemented
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture diagrams
- **[server/README.md](server/README.md)** - API endpoint documentation

## 🔑 Getting Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and add it to `server/.env`

## 📡 API Endpoints

The backend provides these endpoints:

- `GET /api/health` - Health check
- `POST /api/chat` - Send message and get AI response
- `GET /api/chat/history` - Get conversation history
- `DELETE /api/chat/history` - Clear conversation history

See [server/README.md](server/README.md) for detailed API documentation.

## 🎯 Frontend Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 🎨 Frontend Technologies

- **React 19** - UI framework
- **React Icons** - Icon library
- **Context API** - State management

## 🔧 Backend Technologies

- **Node.js + Express** - Web server
- **OpenAI SDK** - ChatGPT integration
- **express-session** - Session management
- **CORS** - Cross-origin support
- **dotenv** - Environment configuration

## 🔒 Security Features

- ✅ API keys stored in environment variables
- ✅ CORS configured for specific origins
- ✅ Session-based authentication
- ✅ HTTP-only cookies
- ✅ Input validation
- ✅ Error sanitization

## 🧪 Testing the Backend

```bash
# Health check
curl http://localhost:5000/api/health

# Send a message
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!"}'
```

Or import `server/ChatGPT_API_Tests.postman_collection.json` into Postman.

## 🚧 Troubleshooting

### Backend Issues

**"OPENAI_API_KEY is not set"**
- Ensure `.env` file exists in `server/` directory
- Verify API key is correctly set
- Restart the server

**CORS errors**
- Check `FRONTEND_URL` in `server/.env` matches your React app URL
- Use `credentials: 'include'` in fetch requests

**Port already in use**
- Change `PORT` in `server/.env`

See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for more troubleshooting.

## 📚 Learn More

### React

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

### OpenAI

- [OpenAI API documentation](https://platform.openai.com/docs)
- [OpenAI Node.js SDK](https://github.com/openai/openai-node)

## 🎁 Complete Package

This project includes a **complete backend integration** with comprehensive documentation.

### � Documentation Guide

**→ See [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for complete documentation guide**

### 📖 Quick Links

| File | Description | Lines |
|------|-------------|-------|
| [QUICK_START.md](QUICK_START.md) | ⚡ 5-minute setup guide | 191 |
| [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) | 📋 Detailed setup steps | 259 |
| [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) | ✅ Interactive checklist | 413 |
| [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) | 🔧 Technical documentation | 672 |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 🏗️ System architecture | 282 |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | 📊 What was built | 454 |
| [PACKAGE_OVERVIEW.md](PACKAGE_OVERVIEW.md) | 📦 Complete overview | 437 |
| [server/README.md](server/README.md) | 📡 API reference | 542 |

**Total:** 3,374+ lines of code and documentation

- 📚 **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Complete documentation guide
- ⚡ **[QUICK_START.md](QUICK_START.md)** - 5-minute setup
- 📋 **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Detailed setup
- 📡 **[server/README.md](server/README.md)** - API documentation
- 🔧 **[BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)** - Technical details
- ⚛️ **[server/INTEGRATION_GUIDE.js](server/INTEGRATION_GUIDE.js)** - React integration

## 💡 What's Included

### Backend Server (1,103 lines)
- ✅ Express.js API server
- ✅ OpenAI ChatGPT integration
- ✅ Session-based conversation memory
- ✅ Multi-user support
- ✅ Error handling & validation
- ✅ CORS & security setup

### Documentation (2,271 lines)
- ✅ Setup guides (3)
- ✅ API documentation
- ✅ Architecture diagrams
- ✅ Integration examples
- ✅ Troubleshooting guides
- ✅ Testing resources

### Testing Tools
- ✅ Postman collection
- ✅ cURL examples
- ✅ React integration hooks

## 🏆 Features

- 🤖 **Real-time AI conversations** with GPT-3.5-turbo or GPT-4
- 💾 **Session-based memory** maintains conversation context
- 👥 **Multi-user ready** with isolated conversation histories
- 🎭 **Character support** for role-playing AI personalities
- 🔒 **Production-ready** with security best practices
- 📡 **RESTful API** with clean JSON responses
- 🌐 **Frontend-agnostic** works with any client

## ⚡ Quick Setup

```bash
# 1. Install backend dependencies
cd server
npm install

# 2. Configure environment
copy .env.example .env
# Edit .env and add your OpenAI API key

# 3. Start backend
npm run dev

# 4. Test it
curl http://localhost:5000/api/health
```

**That's it!** Full setup guide: [QUICK_START.md](QUICK_START.md)

## 📞 Support

- **Setup issues?** → [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)
- **API questions?** → [server/README.md](server/README.md)
- **Integration help?** → [server/INTEGRATION_GUIDE.js](server/INTEGRATION_GUIDE.js)
- **Errors?** → Check troubleshooting section in any guide

## 📝 License

ISC

---

## 📚 Additional Resources

### Create React App

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Bundle Analysis](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
