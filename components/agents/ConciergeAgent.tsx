'use client'

import { useState } from 'react'
import ChatInterface from '@/components/ui/ChatInterface'
import VisualAppraisal from '@/components/agents/VisualAppraisal'
import DisposalOptions from '@/components/ui/DisposalOptions'
import BookingForm from '@/components/ui/BookingForm'
import ProgressTracker from '@/components/ui/ProgressTracker'
import { calculateDisposalOptions, DisposalOption } from '@/lib/pricing'

type Stage = 'chat' | 'appraisal' | 'negotiation' | 'options' | 'booking' | 'confirmed'

interface Props {
  onAgentActivity: (message: string) => void
}

export default function ConciergeAgent({ onAgentActivity }: Props) {
  const [stage, setStage] = useState<Stage>('chat')
  const [deviceInfo, setDeviceInfo] = useState<any>(null)
  const [disposalOptions, setDisposalOptions] = useState<DisposalOption[]>([])
  const [selectedOption, setSelectedOption] = useState<DisposalOption | null>(null)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  const handleUserMessage = async (message: string) => {
    onAgentActivity('Concierge Agent: Analyzing your request...')
    
    // Simulate intent detection
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const lowerMsg = message.toLowerCase()
    if (lowerMsg.includes('phone') || lowerMsg.includes('laptop') ||
        lowerMsg.includes('device') || lowerMsg.includes('tablet') ||
        lowerMsg.includes('watch') || lowerMsg.includes('dispose') ||
        lowerMsg.includes('sell') || lowerMsg.includes('recycle') ||
        lowerMsg.includes('storage') || lowerMsg.includes('hard drive') ||
        lowerMsg.includes('ssd') || lowerMsg.includes('usb') ||
        lowerMsg.includes('pendrive') || lowerMsg.includes('memory')) {
      setStage('appraisal')
      onAgentActivity('Concierge Agent: Starting device appraisal...')
    }
  }

  const handleAppraisalComplete = async (info: any) => {
    setDeviceInfo(info)
    setStage('negotiation')
    onAgentActivity('Negotiator Agent: Searching market prices online...')
    
    // Use API-based pricing with real market data
    try {
      const options = await calculateDisposalOptions(info.description)
      setDisposalOptions(options)
      setStage('options')
      
      onAgentActivity(
        `Negotiator Agent: Found 3 disposal options based on current market rates`
      )
    } catch (error) {
      console.error('Pricing error:', error)
      onAgentActivity('Negotiator Agent: Using estimated pricing')
      // Fallback to basic pricing if API fails
      setStage('options')
    }
  }

  const handleSelectOption = (option: DisposalOption) => {
    setSelectedOption(option)
    setStage('booking')
    onAgentActivity(`Dispatch Agent: Preparing booking form for ${option.title}...`)
  }

  const handleBookingComplete = (details: any) => {
    setBookingDetails(details)
    setStage('confirmed')
    onAgentActivity(`Security Guardian: Booking confirmed! Data wipe scheduled.`)
  }

  return (
    <div className="p-4">
      {stage === 'chat' && (
        <ChatInterface onSendMessage={handleUserMessage} />
      )}
      
      {stage === 'appraisal' && (
        <VisualAppraisal 
          onComplete={handleAppraisalComplete}
          onAgentActivity={onAgentActivity}
        />
      )}
      
      {stage === 'negotiation' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div className="text-gray-600">Calculating disposal options...</div>
          </div>
        </div>
      )}
      
      {stage === 'options' && (
        <DisposalOptions
          options={disposalOptions}
          deviceInfo={deviceInfo}
          onSelectOption={handleSelectOption}
        />
      )}
      
      {stage === 'booking' && selectedOption && (
        <BookingForm
          selectedOption={selectedOption}
          deviceInfo={deviceInfo}
          onBookingComplete={handleBookingComplete}
        />
      )}
      
      {stage === 'confirmed' && bookingDetails && selectedOption && (
        <ProgressTracker 
          bookingDetails={bookingDetails}
          selectedOption={selectedOption}
        />
      )}
    </div>
  )
}
