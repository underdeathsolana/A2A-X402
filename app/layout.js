import { Inter } from 'next/font/google'
import './globals.css'
import BackgroundPattern from './components/BackgroundPattern'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://a2a-X402.vercel.app'),
  title: 'A2A X402 | Agent-to-Agent Payment Utility',
  description: 'Revolutionary token utility for AI agents to autonomously pay for API access, data feeds, and premium services',
  keywords: 'A2A Token, X402, AI Agent Payment, Solana, DeFi, API Access',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'A2A X402 | Agent-to-Agent Payment Utility',
    description: 'Revolutionary token utility for AI agents to autonomously pay for API access, data feeds, and premium services',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A2A X402 | Agent-to-Agent Payment Utility',
    description: 'Revolutionary token utility for AI agents to autonomously pay for API access, data feeds, and premium services',
    images: ['/images/logo.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundPattern />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}