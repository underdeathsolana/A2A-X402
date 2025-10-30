'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, 
  Play, 
  Square, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Bot,
  Wallet
} from 'lucide-react'

export default function TerminalSimulation() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [output, setOutput] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const terminalRef = useRef(null)

  const simulationSteps = [
    {
      command: '> Initializing A2A X402 Agent...',
      output: [
        '🤖 AI Agent Starting...',
        '📡 Connecting to Solana Network...',
        '✅ Connection Established',
        '💰 Wallet Balance: 1,250.50 A2A Tokens'
      ],
      delay: 1000,
      type: 'info'
    },
    {
      command: '> Scanning for Premium Services...',
      output: [
        '🔍 Searching available APIs...',
        '📊 Found: Premium Data Feed Service',
        '💎 Service: GPT-4 API Access', 
        '🚀 Service: Real-time Market Analytics',
        '💡 Selecting optimal service...'
      ],
      delay: 1500,
      type: 'info'
    },
    {
      command: '> Service Selected: Premium API Access',
      output: [
        '🎯 Target: Premium Data Feed',
        '💰 Cost: 402 A2A Tokens',
        '⏱️  Duration: 24 hours',
        '🔒 Security: Multi-sig verification',
        '✨ Initiating autonomous payment...'
      ],
      delay: 1200,
      type: 'warning'
    },
    {
      command: '> Processing Payment Transaction...',
      output: [
        '🔐 Generating transaction signature...',
        '📝 Transaction Hash: 0x7a8b9c2d...',
        '⛓️  Broadcasting to Solana blockchain...',
        '⏳ Waiting for confirmation...',
        '✅ Transaction Confirmed!'
      ],
      delay: 2000,
      type: 'success'
    },
    {
      command: '> Payment Successful - Access Granted',
      output: [
        '🎉 Payment completed successfully!',
        '🔑 API Key received: ak_live_4f8a2b...',
        '📈 Premium features unlocked',
        '💰 Remaining balance: 848.50 A2A',
        '🤖 Agent ready for autonomous operation!'
      ],
      delay: 1000,
      type: 'success'
    }
  ]

  const startSimulation = async () => {
    setIsRunning(true)
    setCurrentStep(0)
    setOutput([])
    setIsComplete(false)

    for (let i = 0; i < simulationSteps.length; i++) {
      const step = simulationSteps[i]
      
      // Add command
      setOutput(prev => [...prev, {
        type: 'command',
        text: step.command,
        timestamp: new Date().toLocaleTimeString()
      }])

      await new Promise(resolve => setTimeout(resolve, 800))

      // Add output lines with animation
      for (let j = 0; j < step.output.length; j++) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setOutput(prev => [...prev, {
          type: step.type,
          text: step.output[j],
          timestamp: new Date().toLocaleTimeString()
        }])
      }

      setCurrentStep(i + 1)
      await new Promise(resolve => setTimeout(resolve, step.delay))
    }

    setIsComplete(true)
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setOutput([])
    setIsComplete(false)
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Terminal Header */}
      <div className="bg-dark-800 rounded-t-2xl p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center space-x-2 text-white/70">
              <Terminal className="w-4 h-4" />
              <span className="font-mono text-sm">A2A-Agent-Terminal v2.0.0</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={startSimulation}
              disabled={isRunning}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${isRunning 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-brand-purple hover:bg-brand-blue text-white hover:scale-105'}
              `}
            >
              {isRunning ? (
                <>
                  <Square className="w-4 h-4" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Demo</span>
                </>
              )}
            </button>
            
            <button
              onClick={resetSimulation}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="bg-dark-900 rounded-b-2xl min-h-[500px] max-h-[600px] overflow-y-auto font-mono text-sm" ref={terminalRef}>
        <div className="p-6">
          {/* Welcome Message */}
          <div className="text-brand-cyan mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="w-5 h-5" />
              <span>Welcome to A2A X402 Agent Terminal</span>
            </div>
            <div className="text-white/60 text-xs mb-4">
              Autonomous AI Agent Payment System - Live Demo Environment
            </div>
            <div className="text-white/40 text-xs">
              {isComplete ? '✅ Demo completed successfully!' : 
               isRunning ? '🤖 Agent is processing...' : 
               '💡 Click "Start Demo" to watch an AI agent autonomously pay for premium services'}
            </div>
          </div>

          {/* Terminal Output */}
          <AnimatePresence>
            {output.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-2 ${
                  line.type === 'command' ? 'text-white font-bold' :
                  line.type === 'success' ? 'text-green-400' :
                  line.type === 'warning' ? 'text-yellow-400' :
                  line.type === 'error' ? 'text-red-400' :
                  'text-white/80'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <span className="text-white/40 text-xs min-w-[60px]">
                    {line.timestamp}
                  </span>
                  <span className="flex-1">{line.text}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Cursor */}
          {isRunning && (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center space-x-2 mt-4"
            >
              <span className="text-white/40 text-xs">
                {new Date().toLocaleTimeString()}
              </span>
              <span className="text-white">▊</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-dark-800 px-6 py-3 rounded-b-2xl border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isComplete ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : isRunning ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4 text-brand-cyan" />
                </motion.div>
              ) : (
                <Terminal className="w-4 h-4 text-white/60" />
              )}
              <span className="text-white/70">
                {isComplete ? 'Demo Complete' : 
                 isRunning ? 'Processing...' : 
                 'Ready'}
              </span>
            </div>
            
            <div className="text-white/60">
              Step {currentStep}/{simulationSteps.length}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-white/60">
            <Wallet className="w-4 h-4" />
            <span>Balance: {isComplete ? '848.50' : '1,250.50'} A2A</span>
          </div>
        </div>
      </div>
    </div>
  )
}