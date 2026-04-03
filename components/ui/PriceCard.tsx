'use client'

interface Props {
  price: number
  deviceInfo: any
  negotiationDetails?: any
  onBook: () => void
}

export default function PriceCard({ price, deviceInfo, negotiationDetails, onBook }: Props) {
  return (
    <div className="space-y-4">
      {/* Price Card */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg p-6 shadow-lg">
        <div className="text-sm opacity-90 mb-1">Best Offer Secured</div>
        <div className="text-4xl font-bold mb-4">₹{price.toLocaleString()}</div>
        
        <div className="bg-white/20 rounded-lg p-3 mb-4">
          <div className="text-sm opacity-90">Device Details</div>
          <div className="text-sm mt-1">{deviceInfo.description}</div>
        </div>

        {negotiationDetails && (
          <div className="text-sm opacity-90">
            💡 Negotiated +₹{(negotiationDetails.negotiatedPrice - negotiationDetails.basePrice).toLocaleString()} 
            based on certified data wipe guarantee
          </div>
        )}
      </div>

      {/* Negotiation Breakdown */}
      {negotiationDetails && negotiationDetails.reasoning && (
        <div className="bg-white rounded-lg p-4">
          <div className="text-sm font-semibold text-gray-700 mb-2">
            How we calculated your price:
          </div>
          <div className="space-y-1">
            {negotiationDetails.reasoning.map((reason: string, index: number) => (
              <div key={index} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={onBook}
        className="w-full bg-success text-white py-4 rounded-lg font-semibold text-lg shadow-sm"
      >
        Book 10-Minute Pickup
      </button>

      {/* Trust Badges */}
      <div className="bg-white rounded-lg p-4">
        <div className="text-xs text-gray-500 mb-2">Included with pickup:</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500">✓</span>
            <span>NIST 800-88 Certified Data Wipe</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500">✓</span>
            <span>Cryptographic Proof Certificate</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500">✓</span>
            <span>Environmental Impact Report</span>
          </div>
        </div>
      </div>
    </div>
  )
}
