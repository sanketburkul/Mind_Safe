'use client'

import { useState, useEffect } from 'react'

interface TechnicianLocation {
  lat: number
  lng: number
  timestamp: string
}

interface Props {
  bookingDetails: any
  userLocation: { lat: number; lng: number }
}

export default function LiveTracking({ bookingDetails, userLocation }: Props) {
  const [technicianLocation, setTechnicianLocation] = useState<TechnicianLocation>({
    lat: userLocation.lat + 0.02, // Start 2km away
    lng: userLocation.lng + 0.02,
    timestamp: new Date().toISOString()
  })
  const [distance, setDistance] = useState(2.5)
  const [eta, setEta] = useState(15)

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Simulate technician movement (for demo)
  useEffect(() => {
    const interval = setInterval(() => {
      setTechnicianLocation(prev => {
        // Move technician closer to user location
        const newLat = prev.lat + (userLocation.lat - prev.lat) * 0.1
        const newLng = prev.lng + (userLocation.lng - prev.lng) * 0.1
        
        const newDistance = calculateDistance(newLat, newLng, userLocation.lat, userLocation.lng)
        setDistance(newDistance)
        setEta(Math.max(1, Math.round(newDistance * 6))) // ~6 min per km

        return {
          lat: newLat,
          lng: newLng,
          timestamp: new Date().toISOString()
        }
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [userLocation])

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm opacity-90">Technician Status</div>
            <div className="text-xl font-bold">En Route to You</div>
          </div>
          <div className="text-4xl animate-bounce">🚚</div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-xs opacity-90">Distance</div>
            <div className="text-2xl font-bold">{distance.toFixed(1)} km</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-xs opacity-90">ETA</div>
            <div className="text-2xl font-bold">{eta} min</div>
          </div>
        </div>
      </div>

      {/* Technician Info */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {bookingDetails.technicianId.split('-')[1]?.substring(0, 2).toUpperCase() || 'TC'}
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900">Technician {bookingDetails.technicianId}</div>
            <div className="text-sm text-gray-600">Certified Data Wipe Specialist</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-semibold">4.9</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">500+ devices processed</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition">
              📞 Call
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition">
              💬 Chat
            </button>
          </div>
        </div>
      </div>

      {/* Live Map - Simple CSS Version */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-semibold">Live Tracking</span>
          </div>
          <span className="text-xs opacity-90">Updated {new Date(technicianLocation.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        
        {/* Simple Map Container */}
        <div className="w-full h-96 bg-gradient-to-br from-green-50 via-blue-50 to-gray-50 relative overflow-hidden">
          {/* Grid pattern for map feel */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-gray-400"></div>
              ))}
            </div>
          </div>

          {/* Roads/Streets */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 opacity-30"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-300 opacity-30"></div>
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300 opacity-20"></div>
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300 opacity-20"></div>

          {/* Buildings/Landmarks */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gray-400 opacity-20 rounded"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-gray-400 opacity-20 rounded"></div>
          <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-gray-400 opacity-20 rounded"></div>
          <div className="absolute top-2/3 right-1/3 w-7 h-7 bg-gray-400 opacity-20 rounded"></div>

          {/* Route line between markers */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1="70%"
              y1="70%"
              x2={`${70 - (distance / 2.5) * 50}%`}
              y2={`${70 - (distance / 2.5) * 50}%`}
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray="10,5"
              opacity="0.5"
            />
          </svg>

          {/* Your Location Marker (Green) */}
          <div 
            className="absolute transition-all duration-300"
            style={{ 
              left: '70%', 
              top: '70%',
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="relative">
              {/* Pulsing circle */}
              <div className="absolute -inset-4 bg-green-400 rounded-full opacity-20 animate-ping"></div>
              {/* Marker pin */}
              <div className="relative bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">📍</span>
              </div>
              {/* Label */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md whitespace-nowrap text-xs font-semibold text-green-700">
                Your Location
              </div>
            </div>
          </div>

          {/* Technician Location Marker (Blue) - Animated */}
          <div 
            className="absolute transition-all duration-1000 ease-linear"
            style={{ 
              left: `${70 - (distance / 2.5) * 50}%`, 
              top: `${70 - (distance / 2.5) * 50}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="relative">
              {/* Pulsing circle */}
              <div className="absolute -inset-4 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
              {/* Marker pin */}
              <div className="relative bg-blue-500 w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
                <span className="text-white text-lg">🚚</span>
              </div>
              {/* Label */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow-md whitespace-nowrap text-xs">
                <div className="font-semibold text-blue-700">Technician</div>
                <div className="text-gray-600">{distance.toFixed(1)} km away</div>
              </div>
              {/* Direction arrow */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-blue-500 text-2xl animate-pulse">
                ↓
              </div>
            </div>
          </div>

          {/* Distance indicator */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
            <div className="text-center">
              <div className="text-xs text-gray-600">Distance</div>
              <div className="text-lg font-bold text-blue-600">{distance.toFixed(1)} km</div>
            </div>
          </div>

          {/* Zoom controls (decorative) */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="bg-white w-10 h-10 rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition">
              <span className="text-xl font-bold">+</span>
            </button>
            <button className="bg-white w-10 h-10 rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition">
              <span className="text-xl font-bold">−</span>
            </button>
          </div>

          {/* Compass (decorative) */}
          <div className="absolute top-4 right-4 bg-white w-12 h-12 rounded-full shadow-md flex items-center justify-center">
            <div className="text-red-500 font-bold text-lg">N</div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-around text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Technician</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-gray-700">Route</span>
          </div>
        </div>
      </div>

      {/* Journey Updates */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-3">Recent Updates</h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="text-lg">📍</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">Technician on the way</div>
              <div className="text-xs text-gray-600">Currently {distance.toFixed(1)} km away from your location</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(technicianLocation.timestamp).toLocaleTimeString('en-IN')}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="text-lg">✓</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">Technician assigned</div>
              <div className="text-xs text-gray-600">Certified specialist assigned to your booking</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(bookingDetails.scheduledTime).toLocaleTimeString('en-IN')}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="text-lg">✓</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">Booking confirmed</div>
              <div className="text-xs text-gray-600">Your pickup has been scheduled</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(bookingDetails.scheduledTime).toLocaleTimeString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Info */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="text-xl">🛡️</div>
          <div className="flex-1">
            <div className="font-semibold text-blue-900 text-sm mb-1">
              Safety First
            </div>
            <div className="text-xs text-blue-800">
              Our technicians are verified, background-checked, and carry proper identification. 
              You can track their location in real-time for your safety and peace of mind.
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 text-sm">Need Help?</div>
            <div className="text-xs text-gray-600">Our support team is available 24/7</div>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}
