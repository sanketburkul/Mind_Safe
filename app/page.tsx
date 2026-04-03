'use client'

import { useState } from 'react'
import ConciergeAgent from '@/components/agents/ConciergeAgent'
import AgentToast from '@/components/ui/AgentToast'
import FloatingChatbot from '@/components/chatbot/FloatingChatbot'

export default function Home() {
  const [agentActivity, setAgentActivity] = useState<string>('')

  return (
    <main className="min-h-screen flex bg-gray-50">
      {/* Main Content Area - Takes most of the screen */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Mind-Safe India</h1>
              <p className="text-xs text-gray-500">Secure • Fast • Sustainable</p>
            </div>
            <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
              <span>🔒</span>
              <span>100% Secure</span>
            </div>
          </div>
        </header>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <ConciergeAgent onAgentActivity={setAgentActivity} />
          </div>
        </div>

        {/* Agent Activity Toast */}
        {agentActivity && <AgentToast message={agentActivity} />}
      </div>

      {/* Floating AI Chatbot */}
      <FloatingChatbot />
    </main>
  )
}
