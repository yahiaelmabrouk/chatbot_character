# 🚀 5-Minute Quick Start Guide

Follow these steps to get your ChatGPT backend running in 5 minutes!

---

## 📦 STEP 1: Install Dependencies (1 minute)

Open a terminal and navigate to the server directory:

```bash
cd server
npm install
```

**Wait for installation to complete...**

✅ You should see: `added X packages`

---

## 🔑 STEP 2: Get OpenAI API Key (2 minutes)

1. **Go to:** https://platform.openai.com/api-keys
2. **Sign in** (or create account)
3. **Click:** "Create new secret key"
4. **Copy** the key (starts with `sk-`)
5. **Save it** - you'll need it in the next step!

⚠️ **Important:** Keep this key secret! Never commit it to GitHub.

---

## ⚙️ STEP 3: Configure Environment (30 seconds)

In the `server` directory:

**Windows:**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

**Open `.env` file and add your API key:**

```env
OPENAI_API_KEY=sk-paste-your-actual-key-here
OPENAI_MODEL=gpt-3.5-turbo
PORT=5000
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=change-this-to-something-random
NODE_ENV=development
```

**Save the file!**

---

## 🚀 STEP 4: Start the Server (10 seconds)

```bash
npm run dev
```

✅ You should see:
```
Server is running on port 5000
Frontend URL: http://localhost:3000
```

🎉 **Backend is running!**

---

## ✅ STEP 5: Test It! (30 seconds)

### Test 1: Health Check

**Open another terminal** and run:

```bash
curl http://localhost:5000/api/health
```

✅ Expected: `{"status":"OK","message":"Server is running"}`

### Test 2: Send a Message

```bash
curl -X POST http://localhost:5000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"Hello!\"}"
```

✅ Expected: AI response in JSON format

---

## 🎨 STEP 6: Connect to React Frontend (optional)

### Option A: Using Proxy (Recommended)

In your **root** `package.json`, add:

```json
{
  "proxy": "http://localhost:5000"
}
```

### Option B: Using Environment Variable

Create `.env` in **root** directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Start React app** (in a new terminal):

```bash
npm start
```

---

## 🎯 You're Done!

Your ChatGPT backend is now:

✅ **Installed** - All dependencies ready  
✅ **Configured** - API key set up  
✅ **Running** - Server on port 5000  
✅ **Tested** - API endpoints working  
✅ **Connected** - Ready for frontend  

---

## 🔥 Quick Reference

### Start Backend Server
```bash
cd server
npm run dev
```

### Start Frontend
```bash
npm start
```

### Test API
```bash
curl http://localhost:5000/api/health
```

---

## 🐛 Troubleshooting

### "OPENAI_API_KEY is not set"
→ Check `.env` file exists in `server/` folder  
→ Verify API key is correctly set  
→ Restart server

### "Port 5000 already in use"
→ Change PORT in `.env` to 3001  
→ Restart server

### CORS errors
→ Check `FRONTEND_URL` in `.env` matches React URL  
→ Use `credentials: 'include'` in fetch requests

---

## 📚 Next Steps

1. ✅ Backend is running
2. 📖 Read [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) for full docs
3. 🔧 Integrate with your React components
4. 🎨 Customize character personalities
5. 🚀 Build awesome AI conversations!

---

## 🎊 Ready to Chat!

Your AI chatbot backend is live and ready to serve intelligent conversations!

**Backend:** http://localhost:5000  
**Frontend:** http://localhost:3000  

Happy coding! 🚀
