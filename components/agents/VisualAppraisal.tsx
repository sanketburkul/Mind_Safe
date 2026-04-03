'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import OpenCV camera to avoid SSR issues
const OpenCVCamera = dynamic(() => import('@/components/camera/OpenCVCamera'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg p-6 shadow-sm text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-3"></div>
      <div className="text-gray-600">Loading camera...</div>
    </div>
  )
})

interface Props {
  onComplete: (info: any) => void
  onAgentActivity: (message: string) => void
}

export default function VisualAppraisal({ onComplete, onAgentActivity }: Props) {
  const [mode, setMode] = useState<'select' | 'camera' | 'describe'>('select')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [deviceDescription, setDeviceDescription] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCameraCapture = (imageData: string) => {
    setCapturedImage(imageData)
    setMode('describe')
    onAgentActivity('Visual Appraisal Agent: Photo captured! Please describe your device.')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string)
        setMode('describe')
        onAgentActivity('Visual Appraisal Agent: Image uploaded! Please describe your device.')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitDescription = async () => {
    if (!deviceDescription.trim()) {
      alert('Please enter a device description')
      return
    }

    setAnalyzing(true)
    onAgentActivity('Visual Appraisal Agent: Processing your device information...')

    await new Promise(resolve => setTimeout(resolve, 1500))
    
    onAgentActivity('Visual Appraisal Agent: Device information received!')
    
    const deviceInfo = {
      description: deviceDescription,
      image: capturedImage,
      basePrice: 10000
    }

    setAnalyzing(false)
    onComplete(deviceInfo)
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    setDeviceDescription('')
    setMode('select')
  }

  return (
    <div className="space-y-4">
      {/* Selection Mode */}
      {mode === 'select' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Device Information</h2>
          
          <div className="space-y-3">
            <button
              onClick={() => setMode('camera')}
              className="w-full bg-primary text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <span>📷</span>
              <span>Capture Photo with Camera</span>
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gray-100 text-gray-900 py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition"
            >
              <span>📁</span>
              <span>Upload from Device</span>
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Camera Mode with OpenCV */}
      {mode === 'camera' && (
        <OpenCVCamera
          onCapture={handleCameraCapture}
          onCancel={() => setMode('select')}
        />
      )}

      {/* Describe Mode */}
      {mode === 'describe' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Device Details</h2>
          
          <div className="space-y-4">
            {capturedImage && (
              <div className="relative">
                <img 
                  src={capturedImage} 
                  alt="Device" 
                  className="w-full rounded-lg border-2 border-gray-200"
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
                <button
                  onClick={retakePhoto}
                  className="absolute top-2 right-2 bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm shadow-lg hover:bg-gray-100 flex items-center gap-1"
                >
                  <span>🔄</span>
                  <span>Retake</span>
                </button>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your device *
              </label>
              <textarea
                value={deviceDescription}
                onChange={(e) => setDeviceDescription(e.target.value)}
                placeholder="e.g., iPhone 13, 128GB, minor screen scratches, good battery life"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={4}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1">
                Include: model, storage, condition, any damage
              </p>
            </div>
            
            <button
              onClick={handleSubmitDescription}
              disabled={analyzing || !deviceDescription.trim()}
              className="w-full bg-success text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition"
            >
              {analyzing ? 'Processing...' : 'Continue to Pricing →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
