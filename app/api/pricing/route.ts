import { NextRequest, NextResponse } from 'next/server'

interface PricingResult {
  basePrice: number
  marketPrice: number
  source: string
  confidence: 'high' | 'medium' | 'low'
  reasoning: string[]
}

// Simulate web search for device pricing
// In production, integrate with Google Custom Search API or web scraping
async function searchDevicePrice(description: string): Promise<PricingResult> {
  try {
    // Extract device info from description
    const lowerDesc = description.toLowerCase()
    
    // For demo, we'll use intelligent estimation
    // In production, this would call Google Custom Search API
    
    let basePrice = 5000
    let confidence: 'high' | 'medium' | 'low' = 'medium'
    const reasoning: string[] = []
    
    // Detect device type
    if (lowerDesc.includes('iphone')) {
      const models = {
        '15': 55000,
        '14': 42000,
        '13': 35000,
        '12': 28000,
        '11': 22000,
        'x': 16000,
        '8': 12000,
        '7': 8000,
        '6': 5000
      }
      
      for (const [model, price] of Object.entries(models)) {
        if (lowerDesc.includes(model)) {
          basePrice = price
          confidence = 'high'
          reasoning.push(`iPhone ${model} current market price: ₹${price.toLocaleString()}`)
          break
        }
      }
    } else if (lowerDesc.includes('samsung')) {
      const models = {
        's24': 50000,
        's23': 40000,
        's22': 32000,
        's21': 25000,
        's20': 18000,
        'a54': 20000,
        'a34': 15000,
        'm': 12000
      }
      
      for (const [model, price] of Object.entries(models)) {
        if (lowerDesc.includes(model)) {
          basePrice = price
          confidence = 'high'
          reasoning.push(`Samsung ${model.toUpperCase()} market price: ₹${price.toLocaleString()}`)
          break
        }
      }
    } else if (lowerDesc.includes('macbook')) {
      if (lowerDesc.includes('m3')) {
        basePrice = 120000
      } else if (lowerDesc.includes('m2')) {
        basePrice = 90000
      } else if (lowerDesc.includes('m1')) {
        basePrice = 70000
      } else {
        basePrice = 40000
      }
      confidence = 'high'
      reasoning.push(`MacBook current resale value: ₹${basePrice.toLocaleString()}`)
    } else if (lowerDesc.includes('laptop')) {
      basePrice = 25000
      confidence = 'medium'
      reasoning.push('Generic laptop estimated value: ₹25,000')
    } else if (lowerDesc.includes('ssd')) {
      if (lowerDesc.includes('1tb')) basePrice = 6000
      else if (lowerDesc.includes('512gb')) basePrice = 4000
      else if (lowerDesc.includes('256gb')) basePrice = 2500
      else basePrice = 3000
      confidence = 'medium'
      reasoning.push(`SSD market price: ₹${basePrice.toLocaleString()}`)
    } else if (lowerDesc.includes('hard drive') || lowerDesc.includes('hdd')) {
      if (lowerDesc.includes('2tb')) basePrice = 3000
      else if (lowerDesc.includes('1tb')) basePrice = 1800
      else basePrice = 1200
      confidence = 'medium'
      reasoning.push(`HDD market price: ₹${basePrice.toLocaleString()}`)
    }
    
    // Apply condition adjustments
    if (lowerDesc.includes('excellent') || lowerDesc.includes('mint')) {
      basePrice = Math.round(basePrice * 0.95)
      reasoning.push('Excellent condition: 95% of market value')
    } else if (lowerDesc.includes('good')) {
      basePrice = Math.round(basePrice * 0.75)
      reasoning.push('Good condition: 75% of market value')
    } else if (lowerDesc.includes('fair') || lowerDesc.includes('scratch')) {
      basePrice = Math.round(basePrice * 0.65)
      reasoning.push('Fair condition with scratches: 65% of market value')
    } else if (lowerDesc.includes('damaged') || lowerDesc.includes('broken')) {
      basePrice = Math.round(basePrice * 0.40)
      reasoning.push('Damaged condition: 40% of market value')
    } else {
      basePrice = Math.round(basePrice * 0.70)
      reasoning.push('Average condition: 70% of market value')
    }
    
    // Storage adjustments
    if (lowerDesc.includes('512gb') || lowerDesc.includes('512 gb')) {
      basePrice = Math.round(basePrice * 1.15)
      reasoning.push('512GB storage: +15% value')
    } else if (lowerDesc.includes('256gb') || lowerDesc.includes('256 gb')) {
      basePrice = Math.round(basePrice * 1.0)
      reasoning.push('256GB storage: standard value')
    } else if (lowerDesc.includes('128gb') || lowerDesc.includes('128 gb')) {
      basePrice = Math.round(basePrice * 0.90)
      reasoning.push('128GB storage: -10% value')
    } else if (lowerDesc.includes('64gb') || lowerDesc.includes('64 gb')) {
      basePrice = Math.round(basePrice * 0.80)
      reasoning.push('64GB storage: -20% value')
    }
    
    // Damage penalties
    if (lowerDesc.includes('crack') || lowerDesc.includes('broken screen')) {
      basePrice = Math.round(basePrice * 0.85)
      reasoning.push('Screen damage: -15% value')
    }
    
    if (lowerDesc.includes('battery issue') || lowerDesc.includes('poor battery')) {
      basePrice = Math.round(basePrice * 0.90)
      reasoning.push('Battery issues: -10% value')
    }
    
    // Round to nearest 100
    basePrice = Math.round(basePrice / 100) * 100
    
    reasoning.push(`Final estimated value: ₹${basePrice.toLocaleString()}`)
    reasoning.push('Based on current market trends and device condition')
    
    return {
      basePrice,
      marketPrice: basePrice,
      source: 'Market Analysis',
      confidence,
      reasoning
    }
    
  } catch (error) {
    console.error('Pricing error:', error)
    return {
      basePrice: 5000,
      marketPrice: 5000,
      source: 'Fallback Estimate',
      confidence: 'low',
      reasoning: ['Unable to fetch market price, using fallback estimate']
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { description } = body
    
    if (!description) {
      return NextResponse.json(
        { error: 'Device description is required' },
        { status: 400 }
      )
    }
    
    // Simulate API delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const pricingResult = await searchDevicePrice(description)
    
    return NextResponse.json({
      success: true,
      ...pricingResult,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Pricing API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
