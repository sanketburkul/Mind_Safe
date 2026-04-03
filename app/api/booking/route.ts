import { NextRequest, NextResponse } from 'next/server'

export interface BookingRequest {
  deviceInfo: {
    description: string
    image?: string
  }
  disposalOption: {
    type: 'resell' | 'reuse' | 'recycle'
    price: number
  }
  userInfo: {
    name: string
    phone: string
    address: string
    pincode: string
  }
  dataWipePreference: {
    onSite: boolean
    urgency: 'standard' | 'express'
  }
}

export interface BookingResponse {
  success: boolean
  bookingId: string
  scheduledTime: string
  technicianId: string
  estimatedArrival: string
  dataWipeDetails: {
    method: string
    standard: string
    certificateId: string
  }
  message: string
}

// Simulated available time slots
function getAvailableSlots() {
  const now = new Date()
  const slots = []
  
  // Generate slots for next 2 hours (every 15 minutes)
  for (let i = 1; i <= 8; i++) {
    const slotTime = new Date(now.getTime() + (i * 15 * 60 * 1000))
    slots.push({
      time: slotTime.toISOString(),
      available: Math.random() > 0.3 // 70% slots available
    })
  }
  
  return slots
}

// Simulated technician assignment
function assignTechnician(pincode: string) {
  const technicians = [
    { id: 'TECH001', name: 'Rajesh Kumar', rating: 4.8, distance: '2.3 km' },
    { id: 'TECH002', name: 'Priya Sharma', rating: 4.9, distance: '1.8 km' },
    { id: 'TECH003', name: 'Amit Patel', rating: 4.7, distance: '3.1 km' },
    { id: 'TECH004', name: 'Sneha Reddy', rating: 4.9, distance: '1.5 km' },
  ]
  
  // Return closest technician
  return technicians[Math.floor(Math.random() * technicians.length)]
}

// Generate unique booking ID
function generateBookingId() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `MS-${timestamp}-${random}`.toUpperCase()
}

// Generate certificate ID
function generateCertificateId() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 9)
  return `CERT-${timestamp}-${random}`.toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json()
    
    // Validate required fields
    if (!body.deviceInfo || !body.disposalOption || !body.userInfo) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Assign technician based on location
    const technician = assignTechnician(body.userInfo.pincode)
    
    // Calculate arrival time
    const now = new Date()
    const arrivalDays = body.dataWipePreference.urgency === 'express' ? 1 : 5
    const estimatedArrival = new Date(now.getTime() + (arrivalDays * 24 * 60 * 60 * 1000))
    
    // Generate booking details
    const bookingId = generateBookingId()
    const certificateId = generateCertificateId()
    
    // Determine data wipe method based on disposal type
    let wipeMethod = 'NIST 800-88 Multi-Pass Overwrite'
    if (body.disposalOption.type === 'recycle') {
      wipeMethod = 'Physical Destruction + NIST 800-88'
    }
    
    const response: BookingResponse = {
      success: true,
      bookingId,
      scheduledTime: now.toISOString(),
      technicianId: technician.id,
      estimatedArrival: estimatedArrival.toISOString(),
      dataWipeDetails: {
        method: wipeMethod,
        standard: 'NIST 800-88 Rev. 1',
        certificateId
      },
      message: `Booking confirmed! ${technician.name} will arrive in ${arrivalDays} ${arrivalDays === 1 ? 'day' : 'days'}.`
    }
    
    return NextResponse.json(response, { status: 200 })
    
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch available slots
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const pincode = searchParams.get('pincode')
    
    if (!pincode) {
      return NextResponse.json(
        { success: false, message: 'Pincode required' },
        { status: 400 }
      )
    }
    
    const slots = getAvailableSlots()
    const availableSlots = slots.filter(slot => slot.available)
    
    return NextResponse.json({
      success: true,
      pincode,
      availableSlots: availableSlots.map(slot => slot.time),
      message: `${availableSlots.length} slots available in your area`
    })
    
  } catch (error) {
    console.error('Slots fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
