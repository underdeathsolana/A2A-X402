'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  LogOut, 
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react'

export default function ConnectWallet({ className = "" }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [balance, setBalance] = useState(0)
  const [copied, setCopied] = useState(false)

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect({ onlyIfTrusted: true })
        if (response.publicKey) {
          setIsConnected(true)
          setWalletAddress(response.publicKey.toString())
          await getBalance(response.publicKey.toString())
        }
      }
    } catch (error) {
      console.log('No wallet connected')
    }
  }

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      if (typeof window !== 'undefined' && window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect()
        setIsConnected(true)
        setWalletAddress(response.publicKey.toString())
        await getBalance(response.publicKey.toString())
      } else {
        // Redirect to Phantom download if not installed
        window.open('https://phantom.app/', '_blank')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      if (window.solana) {
        await window.solana.disconnect()
      }
      setIsConnected(false)
      setWalletAddress("")
      setBalance(0)
      setShowDropdown(false)
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  const getBalance = async (address) => {
    try {
      // Mock balance for demo - in real app, fetch from Solana RPC
      const mockBalance = Math.random() * 100
      setBalance(mockBalance)
    } catch (error) {
      console.error('Failed to get balance:', error)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatAddress = (address) => {
    if (!address) return ""
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const formatBalance = (balance) => {
    return balance.toFixed(4)
  }

  if (!isConnected) {
    return (
      <motion.button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`
          px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold 
          hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2
          disabled:opacity-50 disabled:cursor-not-allowed ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isConnecting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
            <span className="hidden sm:inline">Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
          </>
        )}
      </motion.button>
    )
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`
          px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold 
          hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm">{formatAddress(walletAddress)}</span>
      </motion.button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Wallet Connected</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                  <Zap className="w-3 h-3 text-yellow-300" />
                  <span className="text-xs text-white">Solana</span>
                </div>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="p-4 space-y-4">
              {/* Address */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Address</label>
                <div className="flex items-center justify-between mt-1 p-2 bg-gray-800 rounded-lg">
                  <code className="text-sm text-white font-mono">{formatAddress(walletAddress)}</code>
                  <button
                    onClick={copyAddress}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Balance */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Balance</label>
                <div className="mt-1 p-2 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">{formatBalance(balance)} SOL</span>
                    <span className="text-sm text-gray-400">~${(balance * 150).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => window.open(`https://solscan.io/account/${walletAddress}`, '_blank')}
                  className="flex items-center justify-center space-x-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">View on Solscan</span>
                </button>
                
                <button
                  onClick={disconnectWallet}
                  className="flex items-center justify-center space-x-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Disconnect</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}