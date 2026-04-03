// Realistic market pricing database for common devices
export const devicePricing = {
  // Smartphones
  'iphone 15': { base: 45000, max: 55000 },
  'iphone 14': { base: 35000, max: 42000 },
  'iphone 13': { base: 28000, max: 35000 },
  'iphone 12': { base: 22000, max: 28000 },
  'iphone 11': { base: 16000, max: 22000 },
  'iphone x': { base: 12000, max: 16000 },
  'iphone 8': { base: 8000, max: 12000 },
  'iphone 7': { base: 5000, max: 8000 },
  'iphone 6': { base: 3000, max: 5000 },
  
  'samsung s24': { base: 40000, max: 50000 },
  'samsung s23': { base: 32000, max: 40000 },
  'samsung s22': { base: 25000, max: 32000 },
  'samsung s21': { base: 18000, max: 25000 },
  'samsung s20': { base: 14000, max: 18000 },
  'samsung a54': { base: 15000, max: 20000 },
  'samsung a34': { base: 10000, max: 15000 },
  'samsung m': { base: 6000, max: 12000 },
  
  'oneplus 12': { base: 30000, max: 38000 },
  'oneplus 11': { base: 24000, max: 30000 },
  'oneplus 10': { base: 18000, max: 24000 },
  'oneplus 9': { base: 14000, max: 18000 },
  'oneplus nord': { base: 8000, max: 14000 },
  
  'pixel 8': { base: 28000, max: 35000 },
  'pixel 7': { base: 20000, max: 26000 },
  'pixel 6': { base: 14000, max: 20000 },
  
  'xiaomi': { base: 5000, max: 15000 },
  'redmi': { base: 3000, max: 10000 },
  'realme': { base: 4000, max: 12000 },
  'oppo': { base: 5000, max: 15000 },
  'vivo': { base: 5000, max: 15000 },
  
  // Laptops
  'macbook pro m3': { base: 80000, max: 120000 },
  'macbook pro m2': { base: 60000, max: 90000 },
  'macbook pro m1': { base: 45000, max: 70000 },
  'macbook air m2': { base: 50000, max: 70000 },
  'macbook air m1': { base: 35000, max: 55000 },
  'macbook 2019': { base: 25000, max: 40000 },
  'macbook 2018': { base: 20000, max: 32000 },
  'macbook 2017': { base: 15000, max: 25000 },
  
  'dell xps': { base: 30000, max: 60000 },
  'dell inspiron': { base: 15000, max: 35000 },
  'dell latitude': { base: 20000, max: 45000 },
  
  'hp pavilion': { base: 15000, max: 35000 },
  'hp envy': { base: 25000, max: 50000 },
  'hp elitebook': { base: 20000, max: 45000 },
  
  'lenovo thinkpad': { base: 18000, max: 45000 },
  'lenovo ideapad': { base: 12000, max: 30000 },
  'lenovo legion': { base: 35000, max: 70000 },
  
  'asus rog': { base: 40000, max: 80000 },
  'asus vivobook': { base: 15000, max: 35000 },
  'asus zenbook': { base: 30000, max: 60000 },
  
  // Tablets
  'ipad pro': { base: 35000, max: 60000 },
  'ipad air': { base: 25000, max: 40000 },
  'ipad': { base: 15000, max: 30000 },
  'ipad mini': { base: 18000, max: 32000 },
  
  'samsung tab s9': { base: 25000, max: 40000 },
  'samsung tab s8': { base: 18000, max: 30000 },
  'samsung tab a': { base: 8000, max: 15000 },
  
  // Smartwatches
  'apple watch ultra': { base: 35000, max: 50000 },
  'apple watch series 9': { base: 20000, max: 32000 },
  'apple watch series 8': { base: 16000, max: 25000 },
  'apple watch se': { base: 12000, max: 18000 },
  
  'samsung galaxy watch': { base: 8000, max: 18000 },
  'fitbit': { base: 3000, max: 8000 },
  
  // Storage Devices - Hard Drives
  'hdd 4tb': { base: 3000, max: 5000 },
  'hdd 2tb': { base: 2000, max: 3500 },
  'hdd 1tb': { base: 1000, max: 2000 },
  'hdd 500gb': { base: 500, max: 1200 },
  'external hard drive': { base: 1500, max: 4000 },
  'seagate': { base: 1500, max: 4000 },
  'western digital': { base: 1500, max: 4000 },
  'wd': { base: 1500, max: 4000 },
  
  // Storage Devices - SSDs
  'ssd 2tb': { base: 8000, max: 15000 },
  'ssd 1tb': { base: 4000, max: 8000 },
  'ssd 512gb': { base: 2500, max: 5000 },
  'ssd 256gb': { base: 1500, max: 3000 },
  'nvme': { base: 3000, max: 8000 },
  'samsung ssd': { base: 3000, max: 10000 },
  'crucial': { base: 2000, max: 6000 },
  
  // Storage Devices - USB/Flash Drives
  'usb drive': { base: 200, max: 1000 },
  'flash drive': { base: 200, max: 1000 },
  'pendrive': { base: 200, max: 1000 },
  'memory card': { base: 300, max: 1500 },
  'sd card': { base: 300, max: 1500 },
  
  // Storage Devices - Other
  'nas': { base: 5000, max: 20000 },
  'network storage': { base: 5000, max: 20000 },
  'raid': { base: 8000, max: 30000 },
  'server': { base: 15000, max: 60000 },
  
  // Default fallbacks
  'phone': { base: 2000, max: 8000 },
  'smartphone': { base: 3000, max: 10000 },
  'laptop': { base: 10000, max: 30000 },
  'tablet': { base: 5000, max: 15000 },
  'watch': { base: 2000, max: 8000 },
  'computer': { base: 8000, max: 25000 },
  'hard drive': { base: 1000, max: 4000 },
  'storage': { base: 1000, max: 5000 },
  'drive': { base: 800, max: 4000 },
}

// Condition multipliers
export const conditionMultipliers = {
  'excellent': 0.95,
  'very good': 0.85,
  'good': 0.75,
  'fair': 0.60,
  'poor': 0.40,
  'damaged': 0.30,
  'broken': 0.20,
  'cracked': 0.65,
  'scratched': 0.70,
  'mint': 1.0,
  'like new': 0.90,
}

// Storage multipliers (for phones/laptops)
export const storageMultipliers = {
  '32gb': 0.7,
  '64gb': 0.8,
  '128gb': 0.9,
  '256gb': 1.0,
  '512gb': 1.15,
  '1tb': 1.3,
  '2tb': 1.5,
}

export async function estimateDevicePriceFromAPI(description: string): Promise<{
  basePrice: number
  negotiatedPrice: number
  reasoning: string[]
  confidence: string
}> {
  try {
    const response = await fetch('/api/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    })
    
    const data = await response.json()
    
    if (data.success) {
      // Add negotiation bonus (2-5% for certified wipe)
      const negotiationBonus = Math.floor(data.basePrice * (0.02 + Math.random() * 0.03))
      const negotiatedPrice = data.basePrice + negotiationBonus
      
      const reasoning = [
        ...data.reasoning,
        `Negotiation bonus: +₹${negotiationBonus.toLocaleString()} for certified data wipe`
      ]
      
      return {
        basePrice: data.basePrice,
        negotiatedPrice,
        reasoning,
        confidence: data.confidence
      }
    }
    
    // Fallback to local estimation
    return estimateDevicePrice(description)
  } catch (error) {
    console.error('API pricing failed, using fallback:', error)
    return estimateDevicePrice(description)
  }
}

export function estimateDevicePrice(description: string): {
  basePrice: number
  negotiatedPrice: number
  reasoning: string[]
} {
  const desc = description.toLowerCase()
  const reasoning: string[] = []
  
  // Find matching device
  let matchedDevice = null
  let matchedKey = ''
  
  for (const [key, pricing] of Object.entries(devicePricing)) {
    if (desc.includes(key)) {
      matchedDevice = pricing
      matchedKey = key
      break
    }
  }
  
  // If no match, use generic fallback
  if (!matchedDevice) {
    if (desc.includes('phone') || desc.includes('mobile')) {
      matchedDevice = devicePricing['phone']
      matchedKey = 'phone'
    } else if (desc.includes('laptop') || desc.includes('notebook')) {
      matchedDevice = devicePricing['laptop']
      matchedKey = 'laptop'
    } else if (desc.includes('tablet') || desc.includes('ipad')) {
      matchedDevice = devicePricing['tablet']
      matchedKey = 'tablet'
    } else if (desc.includes('watch')) {
      matchedDevice = devicePricing['watch']
      matchedKey = 'watch'
    } else if (desc.includes('hard drive') || desc.includes('hdd') || desc.includes('storage')) {
      matchedDevice = devicePricing['hard drive']
      matchedKey = 'storage device'
    } else if (desc.includes('ssd')) {
      matchedDevice = devicePricing['ssd 256gb']
      matchedKey = 'ssd'
    } else if (desc.includes('usb') || desc.includes('flash') || desc.includes('pendrive')) {
      matchedDevice = devicePricing['usb drive']
      matchedKey = 'usb drive'
    } else {
      // Complete fallback
      matchedDevice = { base: 1000, max: 5000 }
      matchedKey = 'electronic device'
    }
  }
  
  reasoning.push(`Identified as: ${matchedKey}`)
  
  // Start with base price
  let price = matchedDevice.base
  
  // Apply condition multiplier
  let conditionMultiplier = 0.75 // default
  for (const [condition, multiplier] of Object.entries(conditionMultipliers)) {
    if (desc.includes(condition)) {
      conditionMultiplier = multiplier
      reasoning.push(`Condition: ${condition} (${Math.round(multiplier * 100)}% of value)`)
      break
    }
  }
  
  price = price * conditionMultiplier
  
  // Apply storage multiplier
  for (const [storage, multiplier] of Object.entries(storageMultipliers)) {
    if (desc.includes(storage)) {
      price = price * multiplier
      reasoning.push(`Storage: ${storage.toUpperCase()} (+${Math.round((multiplier - 1) * 100)}%)`)
      break
    }
  }
  
  // Damage penalties
  if (desc.includes('crack') || desc.includes('broken screen')) {
    price = price * 0.85
    reasoning.push('Screen damage detected (-15%)')
  }
  
  if (desc.includes('battery issue') || desc.includes('poor battery')) {
    price = price * 0.90
    reasoning.push('Battery issues noted (-10%)')
  }
  
  if (desc.includes('water damage')) {
    price = price * 0.70
    reasoning.push('Water damage detected (-30%)')
  }
  
  // Ensure price is within reasonable bounds
  price = Math.max(matchedDevice.base * 0.2, Math.min(price, matchedDevice.max))
  
  // Round to nearest 100
  const basePrice = Math.round(price / 100) * 100
  
  // Negotiation bonus (2-8% increase for certified wipe)
  const negotiationBonus = Math.floor(basePrice * (0.02 + Math.random() * 0.06))
  const negotiatedPrice = basePrice + negotiationBonus
  
  reasoning.push(`Base offer: ₹${basePrice.toLocaleString()}`)
  reasoning.push(`Negotiated +₹${negotiationBonus.toLocaleString()} for certified data wipe`)
  
  return {
    basePrice,
    negotiatedPrice,
    reasoning
  }
}

export interface DisposalOption {
  type: 'resell' | 'reuse' | 'recycle'
  price: number
  title: string
  description: string
  benefits: string[]
  dataWipeIncluded: boolean
}

export async function calculateDisposalOptions(description: string): Promise<DisposalOption[]> {
  // Use API-based pricing for more accurate results
  const baseEstimate = await estimateDevicePriceFromAPI(description)
  const basePrice = baseEstimate.negotiatedPrice
  
  return [
    {
      type: 'resell',
      price: basePrice,
      title: 'Resell',
      description: 'Device will be securely wiped and sold to another user',
      benefits: [
        'Highest value for your device',
        'Device gets a second life',
        'Reduces e-waste',
        'NIST 800-88 certified data wipe'
      ],
      dataWipeIncluded: true
    },
    {
      type: 'reuse',
      price: Math.round(basePrice * 0.75),
      title: 'Reuse (Parts)',
      description: 'Device broken down into parts, materials recovered',
      benefits: [
        'Good value for damaged devices',
        'Parts reused in repairs',
        'Material recovery',
        'Complete data destruction'
      ],
      dataWipeIncluded: true
    },
    {
      type: 'recycle',
      price: Math.round(basePrice * 0.70),
      title: 'Recycle',
      description: 'Device recycled for raw materials (metals, plastics)',
      benefits: [
        'Environmentally responsible',
        'Precious metals recovered',
        'Zero landfill waste',
        'Physical destruction + data wipe'
      ],
      dataWipeIncluded: true
    }
  ]
}
