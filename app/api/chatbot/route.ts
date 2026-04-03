import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

const SYSTEM_CONTEXT = `You are an AI assistant for Mind-Safe India, a secure e-waste disposal service.

ABOUT MIND-SAFE:
- Secure e-waste disposal with 100% data security
- NIST 800-88 certified data wipe
- Cryptographic certificates
- Real-time market pricing

SERVICES:
1. Resell: Full value (device refurbished)
2. Reuse: 75% value (parts recovered)
3. Recycle: 70% value (materials recovered)
All include 100% data wipe

PROCESS:
1. Describe/photo device
2. Get instant pricing
3. Choose option
4. Book pickup (1 day or 5-6 days)
5. NIST 800-88 wipe
6. Get certificate
7. Receive payment

DEVICES: Phones, Laptops, Tablets, HDDs, SSDs, USB drives, Smartwatches

Be helpful and friendly. Answer any question, but relate back to Mind-Safe services when relevant.`

async function generateAIResponse(message: string, history: Message[]): Promise<string> {
  if (!genAI) {
    return generateFallbackResponse(message)
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const conversationHistory = history.slice(-5).map(msg => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n')

    const prompt = `${SYSTEM_CONTEXT}\n\nConversation:\n${conversationHistory}\n\nUser: ${message}\n\nAssistant:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini API error:', error)
    return generateFallbackResponse(message)
  }
}

function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.match(/^(hi|hello|hey)/)) {
    return 'Hello! 👋 I\'m your AI assistant. I can help with device disposal, pricing, data security, or answer any questions you have!'
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return 'Our pricing is market-based! We offer:\n\n💰 Resell - Full value\n🔧 Reuse - 75% value\n♻️ Recycle - 70% value\n\nAll include 100% data wipe. Tell me your device for a quote!'
  }

  if (lowerMessage.includes('safe') || lowerMessage.includes('security')) {
    return '🛡️ 100% Data Security!\n\n✓ NIST 800-88 certified\n✓ Multi-pass overwriting\n✓ Cryptographic erasure\n✓ Signed certificate\n\nYour data is completely unrecoverable!'
  }

  if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
    return 'Simple process:\n\n1. Describe device\n2. Get pricing\n3. Choose option\n4. Book pickup\n5. Data wipe\n6. Get certificate\n7. Receive payment\n\nReady to start?'
  }

  return 'I\'m here to help! I can:\n\n• Guide device disposal\n• Explain pricing\n• Answer security questions\n• Help with booking\n• Answer any questions\n\nWhat would you like to know?'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, history = [] } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const response = await generateAIResponse(message, history)

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Chatbot API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
