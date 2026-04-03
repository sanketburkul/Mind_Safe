import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mind-Safe India',
  description: 'Secure e-waste disposal with AI agents',
  manifest: '/manifest.json',
  themeColor: '#0066FF',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script src="/opencv-loader.js" strategy="beforeInteractive" />
        <Script 
          src="https://docs.opencv.org/4.8.0/opencv.js" 
          strategy="afterInteractive"
        />
        {/* Mapbox GL JS */}
        <link 
          href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css" 
          rel="stylesheet" 
        />
        <Script 
          src="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
