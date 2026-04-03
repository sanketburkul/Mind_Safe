# Chatbot Test Questions

Test your Gemini AI chatbot with these questions to see how well it responds!

## 🎯 Mind-Safe Specific Questions

### About Services
- "What services do you offer?"
- "How does Mind-Safe work?"
- "What makes you different from other e-waste companies?"
- "Do you really wipe data 100%?"

### Pricing Questions
- "How much will I get for my iPhone 13?"
- "What's the difference between resell, reuse, and recycle?"
- "Why is resell price higher than recycle?"
- "How do you calculate pricing?"

### Security Questions
- "Is my data really safe?"
- "What is NIST 800-88?"
- "How do you ensure data is completely erased?"
- "Can someone recover my deleted photos?"
- "What happens to my personal information?"

### Device Questions
- "What devices do you accept?"
- "Can I dispose of my old hard drive?"
- "Do you take broken phones?"
- "What about USB drives and SSDs?"

### Process Questions
- "How long does pickup take?"
- "What happens after I book?"
- "When do I get paid?"
- "How do I track my device?"
- "What is the certificate you provide?"

## 🌍 General Knowledge Questions

### Technology
- "What is e-waste?"
- "Why is e-waste dangerous?"
- "What metals are in smartphones?"
- "How are electronics recycled?"

### Environmental
- "What's the environmental impact of e-waste?"
- "How does recycling help the planet?"
- "What happens to e-waste in landfills?"

### Random Questions (Test AI Capability)
- "What's the capital of France?"
- "Explain quantum computing"
- "Who won the World Cup in 2022?"
- "What's the weather like today?"
- "Tell me a joke"

## 🧪 Conversation Flow Tests

### Multi-turn Conversation
1. "Hi, I have an old laptop"
2. "It's a Dell Inspiron from 2018"
3. "How much can I get?"
4. "What about data security?"
5. "How do I book pickup?"

### Context Retention
1. "I want to dispose my phone"
2. "It's an iPhone 12"
3. "What's the resell price?" (should remember it's iPhone 12)
4. "And the recycle price?" (should still remember)

## ✅ Expected Behavior

### With Gemini API Key
- Intelligent, contextual responses
- Remembers conversation history
- Can answer ANY question
- Relates answers back to Mind-Safe when relevant
- Natural, conversational tone

### Without API Key (Fallback)
- Predefined responses for common questions
- Still helpful but less flexible
- Limited to programmed responses
- Still functional for basic queries

## 🎨 UI Features to Test

- Click floating button (bottom-right)
- Send messages with Enter key
- Loading animation while AI thinks
- Timestamps on messages
- Scroll behavior with many messages
- Close and reopen chat (history persists)

## 📊 What to Look For

✅ Responses are relevant and accurate
✅ Chatbot remembers previous messages
✅ Handles typos and informal language
✅ Provides helpful information
✅ Relates general questions to Mind-Safe services
✅ Professional yet friendly tone
✅ Quick response time (1-3 seconds)

## 🐛 Common Issues

### Generic Responses Only
- API key not set or incorrect
- Check `.env.local` file
- Restart dev server

### Slow Responses
- Normal for first request (cold start)
- Should be faster after that
- Check internet connection

### Error Messages
- Check browser console (F12)
- Verify API key is valid
- Check Google AI Studio quota

---

Have fun testing! The chatbot should handle all these questions intelligently. 🤖✨
