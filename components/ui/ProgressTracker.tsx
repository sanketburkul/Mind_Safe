'use client'

import { useState, useEffect } from 'react'
import { generateCertificatePDF, CertificateData } from '@/lib/certificate'
import LiveTracking from './LiveTracking'

interface Milestone {
  id: string
  title: string
  description: string
  icon: string
  status: 'completed' | 'active' | 'pending'
  timestamp?: string
}

interface Props {
  bookingDetails: any
  selectedOption: any
}

export default function ProgressTracker({ bookingDetails, selectedOption }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 'pricing',
      title: 'Pricing Confirmed',
      description: `₹${selectedOption.price.toLocaleString()} - ${selectedOption.title}`,
      icon: '💰',
      status: 'completed',
      timestamp: new Date().toISOString()
    },
    {
      id: 'booking',
      title: 'Booking Confirmed',
      description: `ID: ${bookingDetails.bookingId}`,
      icon: '✓',
      status: 'completed',
      timestamp: bookingDetails.scheduledTime
    },
    {
      id: 'slot',
      title: 'Slot Scheduled',
      description: new Date(bookingDetails.estimatedArrival).toLocaleDateString('en-IN', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      icon: '📅',
      status: 'completed',
      timestamp: bookingDetails.scheduledTime
    },
    {
      id: 'tracking',
      title: 'Technician En Route',
      description: `Assigned: ${bookingDetails.technicianId}`,
      icon: '🚚',
      status: 'active',
      timestamp: undefined
    },
    {
      id: 'datawipe',
      title: '100% Data Wipe Session',
      description: bookingDetails.dataWipeDetails.method,
      icon: '🛡️',
      status: 'pending',
      timestamp: undefined
    },
    {
      id: 'certificate',
      title: 'Certificate Generated',
      description: `Cert ID: ${bookingDetails.dataWipeDetails.certificateId}`,
      icon: '📜',
      status: 'pending',
      timestamp: undefined
    },
    {
      id: 'payment',
      title: 'Payment Transfer',
      description: `₹${selectedOption.price.toLocaleString()} to your account`,
      icon: '💸',
      status: 'pending',
      timestamp: undefined
    }
  ])

  // Simulate progress for demo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < milestones.length - 1) {
          const newStep = prev + 1
          setMilestones(current => 
            current.map((m, idx) => {
              if (idx < newStep) return { ...m, status: 'completed' as const, timestamp: m.timestamp || new Date().toISOString() }
              if (idx === newStep) return { ...m, status: 'active' as const }
              return m
            })
          )
          return newStep
        }
        return prev
      })
    }, 8000) // Progress every 8 seconds for demo

    return () => clearInterval(timer)
  }, [milestones.length])

  const handleDownloadCertificate = () => {
    const certificateData: CertificateData = {
      bookingId: bookingDetails.bookingId,
      certificateId: bookingDetails.dataWipeDetails.certificateId,
      deviceDescription: 'Device information', // You can pass this from props if needed
      disposalType: selectedOption.title,
      wipeMethod: bookingDetails.dataWipeDetails.method,
      wipeStandard: bookingDetails.dataWipeDetails.standard,
      technicianId: bookingDetails.technicianId,
      userName: 'User', // You can pass this from booking form if needed
      completionDate: new Date().toISOString(),
      price: selectedOption.price
    }

    generateCertificatePDF(certificateData)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'active': return 'bg-blue-500 animate-pulse'
      case 'pending': return 'bg-gray-300'
      default: return 'bg-gray-300'
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-700'
      case 'active': return 'text-blue-700'
      case 'pending': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  // User location (you can get this from browser geolocation or booking form)
  const userLocation = { lat: 28.6139, lng: 77.2090 } // Default: New Delhi

  return (
    <div className="space-y-4">
      {/* Show Live Tracking when technician is en route */}
      {milestones[3]?.status === 'active' && (
        <LiveTracking 
          bookingDetails={bookingDetails} 
          userLocation={userLocation}
        />
      )}

      {/* Header Card */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm opacity-90">Booking ID</div>
            <div className="text-xl font-bold tracking-wider">{bookingDetails.bookingId}</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Amount</div>
            <div className="text-2xl font-bold">₹{selectedOption.price.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-xs opacity-90 mb-1">Current Status</div>
          <div className="font-semibold">{milestones[currentStep]?.title}</div>
        </div>
      </div>

      {/* Data Security Highlight */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🔒</div>
          <div className="flex-1">
            <div className="font-bold text-lg">100% Data Security Guaranteed</div>
            <div className="text-sm opacity-90">NIST 800-88 Certified Wipe in Progress</div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white rounded-lg p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Journey Progress</h3>
        
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${getStatusColor(milestone.status)} flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                  {milestone.status === 'completed' ? '✓' : milestone.icon}
                </div>
                {index < milestones.length - 1 && (
                  <div className={`w-0.5 h-12 ${milestone.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className={`font-semibold ${getStatusTextColor(milestone.status)}`}>
                  {milestone.title}
                  {milestone.status === 'active' && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      In Progress
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">{milestone.description}</div>
                {milestone.timestamp && (
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(milestone.timestamp).toLocaleString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                )}

                {/* Special highlights for data wipe */}
                {milestone.id === 'datawipe' && milestone.status === 'active' && (
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="text-sm font-semibold text-green-900">Data Wipe in Progress</div>
                    </div>
                    <div className="space-y-1 text-xs text-green-800">
                      <div>• Multi-pass overwriting active</div>
                      <div>• Cryptographic erasure initiated</div>
                      <div>• Zero data recovery possible</div>
                    </div>
                  </div>
                )}

                {milestone.id === 'datawipe' && milestone.status === 'completed' && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    ✓ Data permanently destroyed - Certificate ready
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Updates Card */}
      {currentStep < milestones.length - 1 && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="text-xl">ℹ️</div>
            <div className="flex-1">
              <div className="font-semibold text-blue-900 text-sm mb-1">
                Live Updates
              </div>
              <div className="text-xs text-blue-800">
                You'll receive real-time notifications at each milestone. 
                Your data security is our top priority throughout the process.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Card */}
      {currentStep === milestones.length - 1 && (
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg p-6 shadow-lg text-center">
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="text-2xl font-bold mb-2">Process Complete!</h3>
          <p className="text-green-50 mb-4">
            Your device has been securely processed and payment transferred.
          </p>
          <button 
            onClick={handleDownloadCertificate}
            className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            📄 Download Certificate
          </button>
        </div>
      )}

      {/* Security Reminder */}
      <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🛡️</div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 text-sm mb-1">
              Your Data is Protected
            </div>
            <div className="text-xs text-gray-600">
              Every step is monitored by our Security Guardian Agent. 
              You'll receive a cryptographically signed certificate proving 
              100% data destruction.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
