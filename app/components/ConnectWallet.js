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
  Zap,
  ChevronDown,
  X
} from 'lucide-react'

export default function ConnectWallet({ className = "" }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [balance, setBalance] = useState(0)
  const [copied, setCopied] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState(null)
  const [error, setError] = useState("")

  // Available wallets
  const wallets = [
    {
      name: 'Phantom',
      icon: '👻',
      adapter: 'phantom',
      downloadUrl: 'https://phantom.app/',
      isInstalled: () => typeof window !== 'undefined' && window.solana && window.solana.isPhantom
    },
    {
      name: 'Solflare',
      icon: '🌞',
      adapter: 'solflare',
      downloadUrl: 'https://solflare.com/',
      isInstalled: () => typeof window !== 'undefined' && window.solflare && window.solflare.isSolflare
    },
    {
      name: 'Backpack',
      icon: '🎒',
      adapter: 'backpack',
      downloadUrl: 'https://www.backpack.app/',
      isInstalled: () => typeof window !== 'undefined' && window.backpack && window.backpack.isBackpack
    }
  ]

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkWalletConnection()
  }, [])

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showWalletModal && !event.target.closest('.wallet-modal')) {
        setShowWalletModal(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showWalletModal])

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Helper function to wait for wallet to load
  const waitForWallet = (walletType, timeout = 3000) => {
    return new Promise((resolve) => {
      const check = () => {
        switch (walletType) {
          case 'phantom':
            return window.solana && window.solana.isPhantom
          case 'solflare':
            return window.solflare && window.solflare.isSolflare
          case 'backpack':
            return window.backpack && window.backpack.isBackpack
          default:
            return false
        }
      }

      if (check()) {
        resolve(true)
        return
      }

      const startTime = Date.now()
      const interval = setInterval(() => {
        if (check() || Date.now() - startTime > timeout) {
          clearInterval(interval)
          resolve(check())
        }
      }, 100)
    })
  }

  const checkWalletConnection = async () => {
    try {
      // Check Phantom
      if (typeof window !== 'undefined' && window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect({ onlyIfTrusted: true })
        if (response.publicKey) {
          setIsConnected(true)
          setWalletAddress(response.publicKey.toString())
          setConnectedWallet('phantom')
          await getBalance(response.publicKey.toString())
          return
        }
      }

      // Check Solflare
      if (typeof window !== 'undefined' && window.solflare && window.solflare.isSolflare) {
        try {
          const response = await window.solflare.connect({ onlyIfTrusted: true })
          if (response.publicKey) {
            setIsConnected(true)
            setWalletAddress(response.publicKey.toString())
            setConnectedWallet('solflare')
            await getBalance(response.publicKey.toString())
            return
          }
        } catch (error) {
          // Solflare not connected
        }
      }

      // Check Backpack
      if (typeof window !== 'undefined' && window.backpack && window.backpack.isBackpack) {
        try {
          const response = await window.backpack.connect({ onlyIfTrusted: true })
          if (response.publicKey) {
            setIsConnected(true)
            setWalletAddress(response.publicKey.toString())
            setConnectedWallet('backpack')
            await getBalance(response.publicKey.toString())
            return
          }
        } catch (error) {
          // Backpack not connected
        }
      }
    } catch (error) {
      console.log('No wallet connected')
    }
  }

  const connectWallet = async (walletType = null) => {
    setIsConnecting(true)
    setError("")
    
    try {
      if (!walletType) {
        // Show wallet selection modal
        setShowWalletModal(true)
        setIsConnecting(false)
        return
      }

      let walletAdapter = null
      let response = null

      // Wait for wallet to be available
      const isWalletAvailable = await waitForWallet(walletType)
      
      if (!isWalletAvailable) {
        const wallet = wallets.find(w => w.adapter === walletType)
        window.open(wallet.downloadUrl, '_blank')
        throw new Error(`${wallet.name} wallet not installed. Redirecting to download page.`)
      }

      switch (walletType) {
        case 'phantom':
          walletAdapter = window.solana
          break
        case 'solflare':
          walletAdapter = window.solflare
          break
        case 'backpack':
          walletAdapter = window.backpack
          break
        default:
          throw new Error('Unsupported wallet type')
      }

      if (!walletAdapter) {
        throw new Error('Wallet adapter not found')
      }

      response = await walletAdapter.connect()

      if (response && response.publicKey) {
        setIsConnected(true)
        setWalletAddress(response.publicKey.toString())
        setConnectedWallet(walletType)
        setShowWalletModal(false)
        await getBalance(response.publicKey.toString())
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      setError(error.message || 'Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      switch (connectedWallet) {
        case 'phantom':
          if (window.solana) {
            await window.solana.disconnect()
          }
          break
        case 'solflare':
          if (window.solflare) {
            await window.solflare.disconnect()
          }
          break
        case 'backpack':
          if (window.backpack) {
            await window.backpack.disconnect()
          }
          break
      }
      
      setIsConnected(false)
      setWalletAddress("")
      setBalance(0)
      setConnectedWallet(null)
      setShowDropdown(false)
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  const getBalance = async (address) => {
    try {
      // Mock balance for demo - in real app, fetch from Solana RPC
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockBalance = Math.random() * 100
      setBalance(mockBalance)
    } catch (error) {
      console.error('Failed to get balance:', error)
      setBalance(0)
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
      <>
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
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </motion.button>

        {/* Wallet Selection Modal */}
        <AnimatePresence>
          {showWalletModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowWalletModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="wallet-modal bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
                  <button
                    onClick={() => setShowWalletModal(false)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                )}

                <div className="space-y-3">
                  {wallets.map((wallet) => (
                    <motion.button
                      key={wallet.adapter}
                      onClick={() => connectWallet(wallet.adapter)}
                      disabled={isConnecting}
                      className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300 flex items-center justify-between disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{wallet.icon}</span>
                        <div className="text-left">
                          <span className="text-white font-medium block">{wallet.name}</span>
                          {isConnecting && (
                            <span className="text-xs text-purple-400">Connecting...</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isConnecting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"
                          />
                        ) : wallet.isInstalled() ? (
                          <span className="text-green-400 text-sm">Installed</span>
                        ) : (
                          <span className="text-gray-400 text-sm">Not Installed</span>
                        )}
                        <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                <p className="text-gray-400 text-sm mt-4 text-center">
                  Don't have a wallet? Click on any wallet to download.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
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
                  <span className="text-white font-semibold">
                    {wallets.find(w => w.adapter === connectedWallet)?.name || 'Wallet'} Connected
                  </span>
                </div>
                <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                  <span className="text-lg">{wallets.find(w => w.adapter === connectedWallet)?.icon || '💼'}</span>
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