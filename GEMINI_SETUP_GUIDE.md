# Gemini AI Chatbot Setup Guide

## ✅ What's Already Done

Your chatbot is fully integrated with Google Gemini AI! The code is complete and ready to use.

## 🔑 Get Your Gemini API Key

1. **Visit Google AI Studio**
   - Go to: https://makersuite.google.com/app/apikey
   - Or: https://aistudio.google.com/app/apikey

2. **Sign in with Google Account**
   - Use any Google account (Gmail)

3. **Create API Key**
   - Click "Create API Key"
   - Select "Create API key in new project" (or use existing project)
   - Copy the generated API key

## 🛠️ Setup Steps

### Step 1: Create Environment File

Create a file named `.env.local` in your project root (same folder as `package.json`):

```bash
# In your terminal (Git Bash on Windows):
touch .env.local
```

Or simply create the file manually in your code editor.

### Step 2: Add Your API Key

Open `.env.local` and add:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the API key you copied from Google AI Studio.

Example:
```env
GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🎉 That's It!

Your chatbot will now use Gemini AI to answer questions intelligently!

## 🧪 Test Your Chatbot

1. Open your website: http://localhost:3000
2. Click the floating chatbot button (bottom-right, bouncing robot 🤖)
3. Try asking:
   - "What devices do you accept?"
   - "How does data wipe work?"
   - "Tell me about your pricing"
   - "What is NIST 800-88?"
   - Any other question!

## 🔄 Fallback Behavior

If the API key is missing or there's an error:
- Chatbot automatically uses predefined responses
- Still functional, just less intelligent
- No errors shown to users

## 📊 Features

✅ Intelligent responses using Gemini AI
✅ Conversation history (last 5 messages)
✅ Context about Mind-Safe services
✅ Fallback responses if API unavailable
✅ Error handling
✅ Real-time chat interface

## 🔒 Security Notes

- `.env.local` is automatically ignored by Git (in `.gitignore`)
- Never commit API keys to version control
- API key is only used server-side (secure)

## 💰 Pricing

- Gemini API has a generous free tier
- 60 requests per minute
- Perfect for development and demos
- Check: https://ai.google.dev/pricing

## 🐛 Troubleshooting

### Chatbot gives generic responses
- Check if `.env.local` exists
- Verify API key is correct
- Restart dev server

### API errors in console
- Check API key validity
- Verify internet connection
- Check Google AI Studio for quota

### Environment variable not loading
- File must be named `.env.local` exactly
- Must be in project root
- Restart dev server after creating

## 📝 Current Implementation

The chatbot knows about:
- Mind-Safe services and process
- Pricing options (Resell/Reuse/Recycle)
- Data security (NIST 800-88)
- Accepted devices
- Pickup scheduling
- Certificate generation

It can answer ANY question, but will relate answers back to Mind-Safe services when relevant.

## 🚀 Next Steps (Optional)

Want to enhance further?
- Add web search capability
- Integrate with booking system
- Add voice input/output
- Multi-language support
- Analytics tracking

---

Need help? The chatbot code is in:
- `/app/api/chatbot/route.ts` - API endpoint
- `/components/chatbot/FloatingChatbot.tsx` - UI component
