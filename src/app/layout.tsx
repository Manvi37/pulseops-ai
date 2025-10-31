import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PulseOps AI',
  description: 'Intelligent MSP and IT management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}