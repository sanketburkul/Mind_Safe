'use client'

import { useState } from 'react'

interface Props {
  onSendMessage: (message: string) => void
}

export default function ChatInterface({ onSendMessage }: Props) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        {/* Data Security Badge */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-3 mb-4 flex items-center gap-3">
          <div className="text-2xl">🛡️</div>
          <div className="flex-1">
            <div className="font-bold">100% Data Security</div>
            <div className="text-xs opacity-90">NIST 800-88 Certified Wipe</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Welcome to Mind-Safe</h2>
        <p className="text-gray-600 mb-6">
          Secure disposal for phones, laptops, tablets, storage devices & more with certified data destruction.
        </p>
        
        {/* Quick Action Button */}
        <button
          onClick={() => onSendMessage('I want to dispose a device')}
          className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg mb-4"
        >
          Securely Dispose a Device
        </button>
        
        {/* Or Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
        
        {/* Chat Input */}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., I have an old laptop..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Supported Devices */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-700 mb-3">We Accept:</div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span>📱</span>
            <span>Smartphones</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💻</span>
            <span>Laptops</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💾</span>
            <span>Hard Drives</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔌</span>
            <span>SSDs</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📀</span>
            <span>USB Drives</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⌚</span>
            <span>Smartwatches</span>
          </div>
        </div>
      </div>

      {/* Key Features - Highlighted */}
      <div className="grid grid-cols-3 gap-4">
        {/* Feature 1: Eco-Friendly */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-5xl mb-3">♻️</div>
          <div className="text-white font-bold text-lg">Eco-Friendly</div>
          <div className="text-green-100 text-xs mt-1">Sustainable Disposal</div>
        </div>

        {/* Feature 2: 100% Secure */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-5xl mb-3">🔒</div>
          <div className="text-white font-bold text-lg">100% Secure</div>
          <div className="text-blue-100 text-xs mt-1">NIST 800-88 Certified</div>
        </div>

        {/* Feature 3: Fast Pickup */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-5xl mb-3">⚡</div>
          <div className="text-white font-bold text-lg">1-Day Pickup</div>
          <div className="text-yellow-100 text-xs mt-1">Express Service</div>
        </div>
      </div>
    </div>
  )
}
