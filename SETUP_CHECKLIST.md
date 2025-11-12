# 📋 Backend Setup Checklist

Use this checklist to ensure everything is properly set up for the ChatGPT backend integration.

## ✅ Prerequisites

- [ ] Node.js installed (v14 or higher)
- [ ] npm installed
- [ ] OpenAI account created
- [ ] OpenAI API key obtained from https://platform.openai.com/api-keys
- [ ] Credits available in OpenAI account

## ✅ Installation Steps

### Step 1: Navigate to Server Directory
```bash
cd server
```
- [ ] Successfully navigated to `server` folder

### Step 2: Install Dependencies
```bash
npm install
```
- [ ] All packages installed successfully
- [ ] No critical errors in installation
- [ ] `node_modules` folder created

Expected packages:
- [ ] express
- [ ] openai
- [ ] cors
- [ ] dotenv
- [ ] express-session
- [ ] nodemon (dev)

### Step 3: Create Environment File
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```
- [ ] `.env` file created in `server` directory
- [ ] File is not empty

### Step 4: Configure Environment Variables

Edit `server/.env` and set:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_MODEL=gpt-3.5-turbo
PORT=5000
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=your-random-secret-key
NODE_ENV=development
```

- [ ] `OPENAI_API_KEY` set with real API key (starts with `sk-`)
- [ ] `OPENAI_MODEL` configured (gpt-3.5-turbo or gpt-4)
- [ ] `PORT` set (default: 5000)
- [ ] `FRONTEND_URL` matches your React app URL
- [ ] `SESSION_SECRET` changed from default
- [ ] `NODE_ENV` set to development

### Step 5: Start the Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] See message: "Server is running on port 5000"
- [ ] No "OPENAI_API_KEY is not set" error
- [ ] No port conflict errors

## ✅ Testing

### Test 1: Health Check

**Open browser or use curl:**
```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{"status":"OK","message":"Server is running"}
```

- [ ] Returns status 200
- [ ] JSON response received
- [ ] Status is "OK"

### Test 2: Send Test Message

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Hello, how are you?\"}"
```

**Expected response:**
```json
{
  "user": "Hello, how are you?",
  "ai": "I'm doing great...",
  "timestamp": "2025-11-08T..."
}
```

- [ ] Returns status 200
- [ ] Contains `user` field
- [ ] Contains `ai` field with response
- [ ] Contains `timestamp` field
- [ ] AI response is relevant to message

### Test 3: Get History

```bash
curl http://localhost:5000/api/chat/history
```

- [ ] Returns conversation history
- [ ] Shows previous messages

### Test 4: Clear History

```bash
curl -X DELETE http://localhost:5000/api/chat/history
```

- [ ] Returns success message
- [ ] Conversation history cleared

## ✅ Integration with Frontend

### Setup React App

- [ ] React app is installed (`npm install` in root)
- [ ] React app can start (`npm start`)
- [ ] React app opens at http://localhost:3000

### Configure API Connection

**Option 1: Add proxy to package.json**
```json
{
  "proxy": "http://localhost:5000"
}
```
- [ ] Proxy added to root `package.json`
- [ ] React app restarted

**Option 2: Use environment variable**

Create `.env` in React app root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```
- [ ] `.env` file created
- [ ] Variable set correctly
- [ ] React app restarted

### Test Frontend-Backend Connection

- [ ] Both servers running (React + Node)
- [ ] No CORS errors in browser console
- [ ] Can send message from UI
- [ ] Receives AI response in UI
- [ ] Conversation history maintained

## ✅ Verification

### Server Logs
Check terminal for:
- [ ] No error messages
- [ ] Successful request logs
- [ ] No authentication errors

### Browser Console
Check for:
- [ ] No CORS errors
- [ ] No 401 errors
- [ ] No 500 errors
- [ ] Successful API responses

### OpenAI Dashboard
Check at https://platform.openai.com/usage:
- [ ] API calls are being logged
- [ ] Credits are being used
- [ ] No quota exceeded errors

## ✅ Documentation Review

- [ ] Read `SETUP_INSTRUCTIONS.md`
- [ ] Read `server/README.md`
- [ ] Understand API endpoints
- [ ] Know how to get conversation history
- [ ] Know how to clear history

## ✅ Common Issues Resolved

### Issue: "OPENAI_API_KEY is not set"
- [ ] Verified `.env` file exists in `server/` directory
- [ ] Checked API key is correctly set
- [ ] Restarted server after changing `.env`

### Issue: "Invalid OpenAI API key"
- [ ] Verified API key at OpenAI dashboard
- [ ] Ensured key starts with `sk-`
- [ ] Checked account has credits
- [ ] Confirmed key is not revoked

### Issue: CORS errors
- [ ] Set correct `FRONTEND_URL` in `.env`
- [ ] Using `credentials: 'include'` in fetch
- [ ] Both servers on correct ports

### Issue: Port already in use
- [ ] Changed `PORT` in `.env`
- [ ] Killed process using port 5000
- [ ] Restarted server

### Issue: Session not persisting
- [ ] Cookies enabled in browser
- [ ] Using `credentials: 'include'`
- [ ] `SESSION_SECRET` is set

## ✅ Production Readiness (Optional)

For production deployment:
- [ ] Changed `SESSION_SECRET` to random string
- [ ] Set `NODE_ENV=production`
- [ ] Enabled HTTPS
- [ ] Updated CORS to production URL
- [ ] Added rate limiting
- [ ] Set up logging
- [ ] Configured environment on hosting platform
- [ ] Tested with production API key

## ✅ Final Checks

- [ ] ✅ Backend server runs without errors
- [ ] ✅ Health check endpoint works
- [ ] ✅ Can send messages and get AI responses
- [ ] ✅ Conversation context is maintained
- [ ] ✅ Multiple sessions work independently
- [ ] ✅ Frontend can connect to backend
- [ ] ✅ No CORS issues
- [ ] ✅ All tests pass
- [ ] ✅ Documentation reviewed
- [ ] ✅ Ready for development

---

## 🎉 Success Criteria

If you can check all these boxes, your ChatGPT backend is fully set up:

✅ Server starts successfully  
✅ Health check returns OK  
✅ Can send message and receive AI response  
✅ Conversation memory works  
✅ No errors in logs  
✅ Frontend can connect  
✅ Full conversation flow works  

**Status:** [ ] Ready to use!

---

## 📞 Need Help?

If you're stuck on any step:

1. Check the error message in terminal
2. Review `SETUP_INSTRUCTIONS.md`
3. Check `server/README.md` for API docs
4. Review `BACKEND_INTEGRATION.md` for technical details
5. Verify environment variables in `.env`
6. Check OpenAI dashboard for API issues

---

**Last Updated:** November 8, 2025  
**Version:** 1.0.0
