'use client'

import { useState } from 'react'
import { DisposalOption } from '@/lib/pricing'

interface Props {
  selectedOption: DisposalOption
  deviceInfo: any
  onBookingComplete: (bookingDetails: any) => void
}

export default function BookingForm({ selectedOption, deviceInfo, onBookingComplete }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    onSiteWipe: true,
    urgency: 'standard' as 'standard' | 'express'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceInfo: {
            description: deviceInfo.description,
            image: deviceInfo.image
          },
          disposalOption: {
            type: selectedOption.type,
            price: selectedOption.price
          },
          userInfo: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            pincode: formData.pincode
          },
          dataWipePreference: {
            onSite: formData.onSiteWipe,
            urgency: formData.urgency
          }
        })
      })

      const data = await response.json()

      if (data.success) {
        onBookingComplete(data)
      } else {
        setError(data.message || 'Booking failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Selected Option Summary */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg p-5 shadow-lg">
        <div className="text-sm opacity-90 mb-1">Selected Option</div>
        <div className="text-xl font-bold mb-1">{selectedOption.title}</div>
        <div className="text-3xl font-bold">₹{selectedOption.price.toLocaleString()}</div>
      </div>

      {/* Data Wipe Guarantee */}
      <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
            ✓
          </div>
          <div>
            <div className="font-bold text-green-900">100% Data Wipe Included</div>
            <div className="text-xs text-green-700">NIST 800-88 Certified</div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 mb-3">Pickup Details</h3>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="10-digit mobile number"
            pattern="[0-9]{10}"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Address *
          </label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
            placeholder="Complete address with landmark"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode *
          </label>
          <input
            type="text"
            required
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="6-digit pincode"
            pattern="[0-9]{6}"
          />
        </div>

        {/* Data Wipe Options */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Data Wipe Preference
          </label>
          
          <div className="space-y-2">
            <label className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary">
              <input
                type="radio"
                name="wipeLocation"
                checked={formData.onSiteWipe}
                onChange={() => setFormData({ ...formData, onSiteWipe: true })}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">On-Site Data Wipe</div>
                <div className="text-xs text-gray-600">Technician wipes data at your location (Recommended)</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary">
              <input
                type="radio"
                name="wipeLocation"
                checked={!formData.onSiteWipe}
                onChange={() => setFormData({ ...formData, onSiteWipe: false })}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Facility Data Wipe</div>
                <div className="text-xs text-gray-600">Device wiped at secure facility</div>
              </div>
            </label>
          </div>
        </div>

        {/* Urgency */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pickup Schedule
          </label>
          
          <div className="space-y-2">
            <label className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary">
              <input
                type="radio"
                name="urgency"
                checked={formData.urgency === 'express'}
                onChange={() => setFormData({ ...formData, urgency: 'express' })}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 flex items-center gap-2">
                  Express (1 Day)
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Priority</span>
                </div>
                <div className="text-xs text-gray-600">Next day pickup with data wipe</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary">
              <input
                type="radio"
                name="urgency"
                checked={formData.urgency === 'standard'}
                onChange={() => setFormData({ ...formData, urgency: 'standard' })}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Standard (5-6 Days)</div>
                <div className="text-xs text-gray-600">Regular pickup schedule</div>
              </div>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-success text-white py-4 rounded-lg font-semibold text-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Booking...' : 'Confirm Booking & Schedule Data Wipe'}
        </button>

        {/* Security Note */}
        <div className="text-xs text-gray-500 text-center">
          🔒 Your data will be wiped using NIST 800-88 standard with cryptographic certificate
        </div>
      </form>
    </div>
  )
}
