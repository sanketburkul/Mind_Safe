'use client'

import { useState, useRef, useEffect } from 'react'

interface Props {
  onCapture: (imageData: string) => void
  onCancel: () => void
}

declare global {
  interface Window {
    cv: any
    opencvReady: boolean
  }
}

export default function OpenCVCamera({ onCapture, onCancel }: Props) {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState('')
  const [streaming, setStreaming] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    // Check if OpenCV is ready
    const checkOpenCV = () => {
      if (window.opencvReady && window.cv) {
        setIsReady(true)
        startCamera()
      } else {
        // Wait for OpenCV to load
        window.addEventListener('opencv-ready', () => {
          setIsReady(true)
          startCamera()
        })
      }
    }

    checkOpenCV()

    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          setStreaming(true)
        }
      }
    } catch (err: any) {
      console.error('Camera error:', err)
      setError(err.message || 'Could not access camera')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setStreaming(false)
  }

  const captureWithOpenCV = () => {
    if (!videoRef.current || !canvasRef.current || !window.cv || !streaming) {
      alert('Camera not ready')
      return
    }

    try {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas size
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Use OpenCV for image processing
      const src = window.cv.imread(canvas)
      const dst = new window.cv.Mat()

      // Apply image enhancements
      // 1. Convert to grayscale and back for better contrast
      window.cv.cvtColor(src, dst, window.cv.COLOR_RGBA2RGB)
      
      // 2. Apply slight sharpening
      const kernel = window.cv.matFromArray(3, 3, window.cv.CV_32F, [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
      ])
      window.cv.filter2D(dst, dst, window.cv.CV_8U, kernel)

      // Write processed image back to canvas
      window.cv.imshow(canvas, dst)

      // Get image data
      const imageData = canvas.toDataURL('image/jpeg', 0.9)

      // Cleanup OpenCV matrices
      src.delete()
      dst.delete()
      kernel.delete()

      // Stop camera and return image
      stopCamera()
      onCapture(imageData)

    } catch (err) {
      console.error('Capture error:', err)
      alert('Failed to capture. Please try again.')
    }
  }

  const handleCancel = () => {
    stopCamera()
    onCancel()
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Capture Device Photo</h3>

        {/* Video Preview */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-4" style={{ minHeight: '300px' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-auto"
            style={{ display: 'block', maxHeight: '400px', objectFit: 'cover' }}
          />
          
          {!streaming && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-3"></div>
                <div className="text-sm">
                  {isReady ? 'Starting camera...' : 'Loading OpenCV...'}
                </div>
              </div>
            </div>
          )}

          {/* Camera guide overlay */}
          {streaming && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-4 border-2 border-white border-dashed rounded-lg opacity-50"></div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm text-blue-800">
          <div className="font-medium mb-1">📸 Tips for best results:</div>
          <ul className="text-xs space-y-1 ml-4">
            <li>• Ensure good lighting</li>
            <li>• Keep device within the frame</li>
            <li>• Hold camera steady</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={captureWithOpenCV}
            disabled={!streaming}
            className="flex-1 bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <span>📸</span>
            <span>{streaming ? 'Capture Photo' : 'Loading...'}</span>
          </button>
          <button
            onClick={handleCancel}
            className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
