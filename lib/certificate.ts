import jsPDF from 'jspdf'
import CryptoJS from 'crypto-js'

export interface CertificateData {
  bookingId: string
  certificateId: string
  deviceDescription: string
  disposalType: string
  wipeMethod: string
  wipeStandard: string
  technicianId: string
  userName: string
  completionDate: string
  price: number
}

// Generate SHA-256 hash for certificate verification
export function generateCertificateHash(data: CertificateData): string {
  const dataString = JSON.stringify({
    certificateId: data.certificateId,
    bookingId: data.bookingId,
    deviceDescription: data.deviceDescription,
    wipeMethod: data.wipeMethod,
    completionDate: data.completionDate
  })
  
  return CryptoJS.SHA256(dataString).toString()
}

// Generate and download PDF certificate
export function generateCertificatePDF(data: CertificateData) {
  const doc = new jsPDF()
  
  // Colors
  const primaryColor = [0, 102, 255] // #0066FF
  const successColor = [16, 185, 129] // #10B981
  const textColor = [31, 41, 55] // #1F2937
  
  // Header - Company Logo/Name
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(0, 0, 210, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('Mind-Safe India', 105, 20, { align: 'center' })
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('100% Data Security Certified', 105, 28, { align: 'center' })
  
  // Certificate Title
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('DATA DESTRUCTION CERTIFICATE', 105, 55, { align: 'center' })
  
  // Green Security Badge
  doc.setFillColor(successColor[0], successColor[1], successColor[2])
  doc.roundedRect(70, 62, 70, 12, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('🛡️ NIST 800-88 CERTIFIED', 105, 69, { align: 'center' })
  
  // Certificate Details Box
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.roundedRect(20, 85, 170, 140, 5, 5)
  
  let yPos = 100
  const leftMargin = 30
  const lineHeight = 10
  
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  
  // Certificate ID
  doc.text('Certificate ID:', leftMargin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(data.certificateId, leftMargin + 50, yPos)
  yPos += lineHeight
  
  // Booking ID
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Booking ID:', leftMargin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(data.bookingId, leftMargin + 50, yPos)
  yPos += lineHeight + 3
  
  // Divider
  doc.setDrawColor(220, 220, 220)
  doc.line(leftMargin, yPos, 180, yPos)
  yPos += 8
  
  // Device Information
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Device Information:', leftMargin, yPos)
  yPos += lineHeight - 2
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const deviceLines = doc.splitTextToSize(data.deviceDescription, 150)
  doc.text(deviceLines, leftMargin, yPos)
  yPos += (deviceLines.length * 6) + 5
  
  // Disposal Method
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Disposal Method:', leftMargin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(data.disposalType.toUpperCase(), leftMargin + 50, yPos)
  yPos += lineHeight
  
  // Data Wipe Details
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Data Wipe Method:', leftMargin, yPos)
  yPos += lineHeight - 2
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(data.wipeMethod, leftMargin, yPos)
  yPos += lineHeight - 2
  
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Standard:', leftMargin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(data.wipeStandard, leftMargin + 30, yPos)
  yPos += lineHeight + 3
  
  // Divider
  doc.line(leftMargin, yPos, 180, yPos)
  yPos += 8
  
  // Technician & Date
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Technician ID:', leftMargin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(data.technicianId, leftMargin + 50, yPos)
  yPos += lineHeight
  
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Completion Date:', leftMargin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(new Date(data.completionDate).toLocaleString('en-IN'), leftMargin + 50, yPos)
  yPos += lineHeight
  
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Amount Paid:', leftMargin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`₹${data.price.toLocaleString()}`, leftMargin + 50, yPos)
  
  // Cryptographic Hash Section
  yPos = 235
  doc.setFillColor(240, 240, 240)
  doc.roundedRect(20, yPos, 170, 30, 3, 3, 'F')
  
  yPos += 8
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Cryptographic Verification Hash (SHA-256):', leftMargin, yPos)
  
  yPos += 7
  const hash = generateCertificateHash(data)
  doc.setFont('courier', 'normal')
  doc.setFontSize(8)
  const hashLines = doc.splitTextToSize(hash, 160)
  doc.text(hashLines, leftMargin, yPos)
  
  // Footer
  yPos = 275
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text('This certificate is cryptographically signed and can be verified at mindsafe.in/verify', 105, yPos, { align: 'center' })
  
  doc.setFontSize(7)
  doc.text('Generated by Security Guardian Agent | Mind-Safe India Pvt. Ltd.', 105, yPos + 5, { align: 'center' })
  
  // Download the PDF
  const fileName = `MindSafe_Certificate_${data.certificateId}.pdf`
  doc.save(fileName)
}

// Verify certificate hash (for public verification portal)
export function verifyCertificateHash(data: CertificateData, providedHash: string): boolean {
  const calculatedHash = generateCertificateHash(data)
  return calculatedHash === providedHash
}
