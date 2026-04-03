'use client'

import { DisposalOption } from '@/lib/pricing'

interface Props {
  options: DisposalOption[]
  deviceInfo: any
  onSelectOption: (option: DisposalOption) => void
}

export default function DisposalOptions({ options, deviceInfo, onSelectOption }: Props) {
  return (
    <div className="space-y-4">
      {/* Data Security Badge */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🛡️</div>
          <div>
            <div className="font-bold text-lg">100% Data Security Guaranteed</div>
            <div className="text-sm opacity-90">NIST 800-88 Certified Data Wipe on all options</div>
          </div>
        </div>
      </div>

      {/* Device Info */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm text-gray-500 mb-1">Your Device</div>
        <div className="text-gray-900">{deviceInfo.description}</div>
      </div>

      {/* Title */}
      <div className="text-center py-2">
        <h2 className="text-xl font-bold text-gray-900">Choose Disposal Method</h2>
        <p className="text-sm text-gray-600 mt-1">All options include certified data destruction</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.type}
            onClick={() => onSelectOption(option)}
            className="w-full bg-white rounded-lg p-5 shadow-sm border-2 border-gray-200 hover:border-primary transition-all text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{option.title}</h3>
                  {option.type === 'resell' && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Best Value</span>}
                  {option.type === 'recycle' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Eco-Friendly</span>}
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-primary">₹{option.price.toLocaleString()}</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-1.5 mb-3">
              {option.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Data Wipe Badge */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600 font-medium">100% Data Wipe Certified</span>
            </div>
          </button>
        ))}
      </div>

      {/* Security Info */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="text-xl">🔒</div>
          <div className="flex-1">
            <div className="font-semibold text-blue-900 text-sm mb-1">
              Why 100% Data Security Matters
            </div>
            <div className="text-xs text-blue-800 space-y-1">
              <p>• Military-grade NIST 800-88 multi-pass overwriting</p>
              <p>• Cryptographic erasure for SSDs and flash storage</p>
              <p>• Digitally signed certificate of destruction</p>
              <p>• Zero chance of data recovery by any means</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
