# Quick Start Guide

## Installation & Setup

### Step 1: Navigate to server directory
```bash
cd server
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Create environment file
```bash
# Copy the example file
copy .env.example .env

# Or on Mac/Linux:
# cp .env.example .env
```

### Step 4: Configure your OpenAI API Key

Edit the `.env` file and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_MODEL=gpt-3.5-turbo
PORT=5000
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=change-this-to-random-string
```

**Get your API key:** https://platform.openai.com/api-keys

### Step 5: Start the server

**Development mode (recommended):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
Server is running on port 5000
Frontend URL: http://localhost:3000
```

## Test the API

### Test 1: Health Check
Open your browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

### Test 2: Send a Message
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Hello, how are you?\"}"
```

Expected response:
```json
{
  "user": "Hello, how are you?",
  "ai": "I'm doing great, thank you for asking! How can I help you today?",
  "timestamp": "2025-11-08T10:30:00.000Z"
}
```

## Integrate with React Frontend

### Option 1: Add to package.json proxy

In your React app's `package.json`, add:
```json
{
  "proxy": "http://localhost:5000"
}
```

Then in your code:
```javascript
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ message: 'Hello!' })
})
```

### Option 2: Use environment variable

Create `.env` in your React app root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Then use:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

fetch(`${API_URL}/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ message: 'Hello!' })
})
```

## Update Your MainChat Component

Add this to your `MainChat.js`:

```javascript
// Add at the top of the file
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Replace the handleSend function
const handleSend = async () => {
  if (inputValue.trim()) {
    // Add user message to UI
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim()
    };
    
    if (onSendMessage) {
      onSendMessage(inputValue.trim());
    }
    
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Send to ChatGPT API
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          message: inputValue.trim(),
          characterContext: {
            name: character.name,
            personality: character.personality,
            greeting: character.greeting
          }
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Add AI response to messages
        const aiMessage = {
          id: Date.now() + 1,
          type: 'character',
          content: data.ai
        };
        if (onSendMessage) {
          // This would need to be modified to accept AI responses
          // You might need to create a separate handler
        }
      } else {
        console.error('API Error:', data.error);
      }
      
    } catch (error) {
      console.error('Network Error:', error);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  }
};
```

## Troubleshooting

### Server won't start
- Check if port 5000 is already in use
- Make sure you're in the `server` directory
- Verify all dependencies are installed: `npm install`

### "OPENAI_API_KEY is not set"
- Make sure `.env` file exists in `server` directory
- Check that the API key is correctly set in `.env`
- Restart the server after changing `.env`

### CORS errors in browser
- Ensure `FRONTEND_URL` in `.env` matches your React app URL
- Add `credentials: 'include'` to all fetch requests
- Check browser console for specific CORS error

### "Invalid OpenAI API key"
- Verify your API key at https://platform.openai.com/api-keys
- Make sure the key starts with `sk-`
- Check if you have credits in your OpenAI account

## Running Both Servers

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

Backend runs on: http://localhost:5000
Frontend runs on: http://localhost:3000

## Next Steps

1. ✅ Backend is running
2. ✅ Test with curl or Postman
3. 🔄 Integrate with React frontend
4. 🔄 Update MainChat component
5. 🔄 Test the full flow

Need help? Check `server/README.md` for detailed documentation!
