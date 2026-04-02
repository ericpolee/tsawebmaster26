import type { Metadata } from 'next'
import { Lora, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lora = Lora({ 
  subsets: ["latin"],
  variable: '--font-lora',
  display: 'swap',
})

const caveat = Caveat({ 
  subsets: ["latin"],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Neighborly - Your Community Resource Hub',
  description: 'Discover local resources, nonprofits, events, and services in your community. Connect with neighbors and find the help you need.',
  keywords: 'community, resources, nonprofits, local services, events, neighborhood',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${caveat.variable}`}>
      <body className="font-serif antialiased min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
