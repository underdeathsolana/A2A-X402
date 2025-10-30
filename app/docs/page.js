'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, Search, BookOpen, Terminal, Code, Zap, 
  ChevronRight, ExternalLink, Copy, Check, GitBranch,
  Database, Settings, Shield, Cpu, Network, Wallet
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const documentation = {
    'getting-started': {
      title: 'Getting Started',
      icon: <Zap className="w-5 h-5" />,
      content: {
        overview: `
# Getting Started with A2A X402

A2A (Agent-to-Agent) X402 is a revolutionary payment protocol built on Solana that enables seamless, autonomous transactions between AI agents.

## What is A2A X402?

A2A X402 combines the HTTP 402 Payment Required status code with Solana's high-performance blockchain to create a standardized way for AI agents to automatically handle payment transactions.

### Key Features

- **Instant Payments**: Sub-second transaction processing on Solana
- **AI-Native**: Designed specifically for AI agent interactions
- **Low Fees**: Minimal transaction costs on Solana network
- **Developer Friendly**: Simple SDK and comprehensive tooling
- **Secure**: Built-in security features and audit trails

## Quick Installation

\`\`\`bash
# Install the A2A SDK
npm install @a2a/x402-sdk

# Or using yarn
yarn add @a2a/x402-sdk
\`\`\`

## Your First A2A Payment

\`\`\`javascript
import { A2AClient } from '@a2a/X402-sdk'

// Initialize client
const client = new A2AClient({
  network: 'devnet', // or 'mainnet'
  privateKey: process.env.SOLANA_PRIVATE_KEY
})

// Create a payment
const payment = await client.createPayment({
  recipient: 'Bs7D8zq7cKk5J4vN8fK2X9gH3pL6mR4eT8wQ5sA9cB2x',
  amount: 0.01, // SOL
  memo: 'AI service payment'
})

console.log('Payment ID:', payment.signature)
\`\`\`
        `
      }
    },
    'solana-rpc': {
      title: 'Solana RPC Methods',
      icon: <Database className="w-5 h-5" />,
      content: {
        overview: `
# Solana RPC Methods

Interact with Solana nodes directly using JSON RPC API via HTTP and WebSocket methods.

## Configuring State Commitment

For preflight checks and transaction processing, Solana nodes choose which bank state to query based on a commitment requirement set by the client.

### Commitment Levels

- **\`finalized\`** - Most recent block confirmed by supermajority (recommended for production)
- **\`confirmed\`** - Most recent block voted on by supermajority (recommended for balance queries)  
- **\`processed\`** - Most recent block (may still be skipped by cluster)

\`\`\`javascript
// Example with different commitment levels
const connection = new Connection(
  'https://api.mainnet-beta.solana.com',
  'confirmed' // commitment level
)
\`\`\`

## Core RPC Methods

### getAccountInfo

\`\`\`javascript
const accountInfo = await connection.getAccountInfo(
  new PublicKey('Bs7D8zq7cKk5J4vN8fK2X9gH3pL6mR4eT8wQ5sA9cB2x'),
  'confirmed'
)
\`\`\`

### getBalance  

\`\`\`javascript
const balance = await connection.getBalance(
  new PublicKey('Bs7D8zq7cKk5J4vN8fK2X9gH3pL6mR4eT8wQ5sA9cB2x')
)
console.log('Balance:', balance / LAMPORTS_PER_SOL, 'SOL')
\`\`\`

### sendTransaction

\`\`\`javascript
const signature = await connection.sendTransaction(transaction, [payer], {
  skipPreflight: false,
  preflightCommitment: 'processed'
})
\`\`\`
        `
      }
    },
    'x402-cli': {
      title: 'X402 CLI Reference',
      icon: <Terminal className="w-5 h-5" />,
      content: {
        overview: `
# X402 CLI Documentation

The X402 Command Line Interface provides powerful tools for managing A2A payments and agent configuration.

## Installation

\`\`\`bash
# Install globally via npm
npm install -g @a2a/x402-cli

# Verify installation
x402 --version
\`\`\`

## Authentication

\`\`\`bash
# Login with API key
x402 auth login --api-key your_api_key

# Check auth status
x402 auth status
\`\`\`

## Core Commands

### Project Management

\`\`\`bash
# Initialize new A2A project
x402 init my-agent-app

# Generate project scaffold
x402 generate --template express-agent
\`\`\`

### Payment Operations

\`\`\`bash
# Create payment request
x402 payment create --amount 0.01 --recipient Bs7D8...cB2x

# Check payment status
x402 payment status --id payment_123
\`\`\`
        `
      }
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(text)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const sections = Object.keys(documentation)
  const currentDoc = documentation[activeSection]

  const renderContent = (content) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-white mb-6">{line.substring(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold text-white mb-4 mt-8">{line.substring(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold text-white mb-3 mt-6">{line.substring(4)}</h3>
        }
        if (line.startsWith('```')) {
          const isClosing = line === '```'
          if (isClosing) return null
          
          const language = line.substring(3) || 'bash'
          const codeBlock = []
          let i = index + 1
          
          while (i < content.split('\n').length) {
            const nextLine = content.split('\n')[i]
            if (nextLine === '```') break
            codeBlock.push(nextLine)
            i++
          }
          
          const code = codeBlock.join('\n')
          
          return (
            <div key={index} className="relative bg-gray-900 rounded-lg border border-gray-700 mb-4 overflow-hidden">
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                <span className="text-sm text-gray-300">{language}</span>
                <button
                  onClick={() => copyToClipboard(code)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === code ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-gray-300">{code}</code>
              </pre>
            </div>
          )
        }
        
        if (line.trim() === '') return <br key={index} />
        
        // Handle list items
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-gray-300 mb-2 ml-4">
              {line.substring(2)}
            </li>
          )
        }
        
        // Regular paragraphs
        if (line.trim()) {
          return <p key={index} className="text-gray-300 mb-4 leading-relaxed">{line}</p>
        }
        
        return null
      })
      .filter(Boolean)
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Documentation floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`doc-${i}`}
            className="absolute w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-white/5"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {i % 4 === 0 && <FileText className="w-8 h-8 text-purple-300/30" />}
              {i % 4 === 1 && <Code className="w-8 h-8 text-blue-300/30" />}
              {i % 4 === 2 && <BookOpen className="w-8 h-8 text-cyan-300/30" />}
              {i % 4 === 3 && <Terminal className="w-8 h-8 text-teal-300/30" />}
            </div>
          </motion.div>
        ))}

        {/* Interactive gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Documentation connecting lines */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${10 + (i * 15)}%`}
              y1={`${30 + (i % 2) * 40}%`}
              x2={`${25 + (i * 15)}%`}
              y2={`${50 + (i % 2) * 20}%`}
              stroke="url(#docGradient)"
              strokeWidth="1"
              opacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
          <defs>
            <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center space-x-6 mb-8"
          >
            <Logo size="large" animated />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">Documentation</span>
              </h1>
              <p className="text-xl text-white/70">
                Complete guide to A2A X402 development
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Interface */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            
            {/* Sidebar */}
            <motion.div 
              className="w-80 glass-effect rounded-2xl border border-white/20 p-6 h-fit sticky top-32"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-purple"
                />
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {sections.map((sectionId) => {
                  const section = documentation[sectionId]
                  const isActive = activeSection === sectionId
                  
                  return (
                    <motion.button
                      key={sectionId}
                      onClick={() => setActiveSection(sectionId)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left
                        ${isActive 
                          ? 'bg-gradient-to-r from-brand-purple to-brand-blue text-white' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {section.icon}
                      <span className="font-medium">{section.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </motion.button>
                  )
                })}
              </nav>

              {/* External Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-white font-medium mb-4">External Resources</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Solana Docs', url: 'https://docs.solana.com', icon: <ExternalLink className="w-4 h-4" /> },
                    { name: 'Solana RPC', url: 'https://solana.com/docs/rpc', icon: <Database className="w-4 h-4" /> },
                    { name: 'GitHub Repo', url: '#', icon: <GitBranch className="w-4 h-4" /> }
                  ].map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
                    >
                      {link.icon}
                      <span className="text-sm">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              className="flex-1 glass-effect rounded-2xl border border-white/20 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* Content Header */}
              <div className="bg-gray-800/50 border-b border-white/10 p-6">
                <div className="flex items-center space-x-3">
                  {currentDoc.icon}
                  <h2 className="text-2xl font-bold text-white">{currentDoc.title}</h2>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="prose prose-invert max-w-none">
                      {renderContent(currentDoc.content.overview)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  )
}