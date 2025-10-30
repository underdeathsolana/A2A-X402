'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Loader2,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react'

export default function PaymentDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [balance, setBalance] = useState(1250.50)
  const [transactions, setTransactions] = useState([])

  const demoSteps = [
    {
      id: 'select-service',
      title: 'AI Agent Selects Service',
      description: 'Agent identifies need for premium API access',
      icon: <Bot className="w-6 h-6" />,
      action: 'Service Required: Premium Data Feed'
    },
    {
      id: 'check-balance',
      title: 'Check Token Balance',
      description: 'Verify sufficient X402 tokens available',
      icon: <DollarSign className="w-6 h-6" />,
      action: `Balance: ${balance} A2A Tokens ✓`
    },
    {
      id: 'initiate-payment',
      title: 'Initiate Payment',
      description: 'Agent automatically triggers payment transaction',
      icon: <Zap className="w-6 h-6" />,
      action: 'Sending 402 A2A to service provider...'
    },
    {
      id: 'confirm-transaction',
      title: 'Transaction Confirmation',
      description: 'Solana blockchain confirms the payment',
      icon: <Shield className="w-6 h-6" />,
      action: 'Transaction confirmed on Solana'
    },
    {
      id: 'access-granted',
      title: 'Service Access Granted',
      description: 'API key received, agent can now access premium features',
      icon: <CheckCircle className="w-6 h-6" />,
      action: 'Access Token: abc123...xyz789'
    }
  ]

  const serviceOptions = [
    {
      name: 'Premium Data Feed',
      price: 402,
      description: 'Real-time market data with advanced analytics',
      duration: '24 hours',
      popular: true
    },
    {
      name: 'AI Model Access',
      price: 150,
      description: 'GPT-4 and Claude API access',
      duration: '12 hours',
      popular: false
    },
    {
      name: 'Basic API Tier',
      price: 50,
      description: 'Standard rate limits and basic features',
      duration: '6 hours',
      popular: false
    }
  ]

  const [selectedService, setSelectedService] = useState(serviceOptions[0])

  const startDemo = async () => {
    setCurrentStep(0)
    setIsProcessing(true)
    setTransactions([])

    // Simulate the payment flow
    for (let i = 0; i < demoSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setCurrentStep(i + 1)
      
      if (i === 2) { // Payment step
        setBalance(prev => prev - selectedService.price)
        const newTransaction = {
          id: Date.now(),
          type: 'payment',
          amount: selectedService.price,
          service: selectedService.name,
          status: 'pending',
          timestamp: new Date().toLocaleTimeString()
        }
        setTransactions(prev => [newTransaction, ...prev])
        
        // Update transaction status
        setTimeout(() => {
          setTransactions(prev => prev.map(tx => 
            tx.id === newTransaction.id 
              ? { ...tx, status: 'confirmed' }
              : tx
          ))
        }, 1000)
      }
    }

    setIsProcessing(false)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsProcessing(false)
    setBalance(1250.50)
    setTransactions([])
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Live Payment Demo</span>
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Watch how AI agents autonomously pay for services using X402 tokens
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Service Selection & Controls */}
          <div className="space-y-6">
            {/* Service Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Select Service</h3>
              <div className="space-y-4">
                {serviceOptions.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => !isProcessing && setSelectedService(service)}
                    className={`
                      p-4 rounded-xl cursor-pointer transition-all duration-300 border-2
                      ${selectedService.name === service.name
                        ? 'border-accent-400 bg-accent-400/10'
                        : 'border-white/20 hover:border-white/40 bg-white/5'
                      }
                      ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-bold text-white">{service.name}</h4>
                        {service.popular && (
                          <span className="px-2 py-1 bg-accent-400 text-black text-xs rounded-full font-bold">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-accent-400 font-bold text-lg">{service.price} A2A</div>
                        <div className="text-white/60 text-sm">{service.duration}</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Demo Controls */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-4">Demo Controls</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={startDemo}
                  disabled={isProcessing}
                  className={`
                    flex-1 px-6 py-4 rounded-xl font-bold text-white transition-all duration-300
                    ${isProcessing
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-accent-500 to-primary-600 hover:scale-105 hover:shadow-lg'
                    }
                  `}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Bot className="w-5 h-5 mr-2" />
                      Start AI Payment
                    </span>
                  )}
                </button>
                <button
                  onClick={resetDemo}
                  disabled={isProcessing}
                  className="px-6 py-4 rounded-xl font-bold text-white glass-effect hover:bg-white/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Demo
                </button>
              </div>
              
              {/* Balance Display */}
              <div className="mt-4 p-4 bg-dark-900 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Agent Balance:</span>
                  <span className="text-accent-400 font-bold text-lg">{balance.toFixed(2)} A2A</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Payment Flow Visualization */}
          <div className="space-y-6">
            {/* Payment Steps */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Payment Flow</h3>
              <div className="space-y-4">
                {demoSteps.map((step, index) => {
                  const isActive = currentStep > index
                  const isCurrent = currentStep === index + 1
                  const isPending = currentStep < index + 1

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{ 
                        opacity: isActive || isCurrent ? 1 : 0.5,
                        scale: isCurrent ? 1.02 : 1
                      }}
                      className={`
                        p-4 rounded-xl border-2 transition-all duration-500
                        ${isActive ? 'border-green-400 bg-green-400/10' : 
                          isCurrent ? 'border-accent-400 bg-accent-400/10' :
                          'border-white/20 bg-white/5'}
                      `}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center
                          ${isActive ? 'bg-green-400 text-black' :
                            isCurrent ? 'bg-accent-400 text-black' :
                            'bg-white/20 text-white/60'}
                        `}>
                          {isActive ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : isCurrent && isProcessing ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            step.icon
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-1">{step.title}</h4>
                          <p className="text-white/70 text-sm mb-2">{step.description}</p>
                          <AnimatePresence>
                            {(isActive || isCurrent) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2"
                              >
                                <div className="px-3 py-2 bg-dark-900 rounded-lg">
                                  <code className="text-green-400 text-sm">{step.action}</code>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-4">Transaction History</h3>
              {transactions.length === 0 ? (
                <p className="text-white/60 text-center py-8">No transactions yet. Start the demo to see payments in action.</p>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-dark-900 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-white font-semibold">{tx.service}</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-white/60 text-sm">{tx.timestamp}</span>
                            <div className={`
                              px-2 py-1 rounded-full text-xs font-bold
                              ${tx.status === 'confirmed' ? 'bg-green-400 text-black' : 'bg-yellow-400 text-black'}
                            `}>
                              {tx.status.toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <span className="text-red-400 font-bold">-{tx.amount} A2A</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}