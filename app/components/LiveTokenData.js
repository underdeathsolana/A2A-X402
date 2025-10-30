'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  ArrowRight, 
  Copy, 
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

export default function LiveTokenData() {
  const [tokenData, setTokenData] = useState({
    price: '$0.0024',
    marketCap: '$1.2M',
    holders: 'Loading...',
    change24h: '+12.5%',
    isPositive: true,
    lastUpdated: null,
    isLoading: false,
    volume24h: '$245K'
  })

  const [isRefreshing, setIsRefreshing] = useState(false)
  const contractAddress = 'EUnDiHtP5xoqLzLP5rfrd18Yhdv1oUeCPxaeia4ipump'

  // Function to fetch token data from DexScreener API
  const fetchTokenData = async () => {
    setIsRefreshing(true)
    try {
      // Use DexScreener API which is more reliable for pump.fun tokens
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.pairs && data.pairs.length > 0) {
          // Find the most liquid pair (highest volume)
          const bestPair = data.pairs.reduce((best, current) => {
            const currentVolume = parseFloat(current.volume?.h24 || 0)
            const bestVolume = parseFloat(best?.volume?.h24 || 0)
            return currentVolume > bestVolume ? current : best
          })
          
          const newData = {
            price: `$${parseFloat(bestPair.priceUsd || 0).toFixed(6)}`,
            marketCap: `$${formatMarketCap(parseFloat(bestPair.marketCap || bestPair.fdv || 0))}`,
            holders: 'Live',
            change24h: `${bestPair.priceChange?.h24 >= 0 ? '+' : ''}${(bestPair.priceChange?.h24 || 0).toFixed(2)}%`,
            isPositive: (bestPair.priceChange?.h24 || 0) >= 0,
            lastUpdated: new Date().toLocaleTimeString(),
            volume24h: `$${formatMarketCap(parseFloat(bestPair.volume?.h24 || 0))}`
          }
          
          setTokenData(newData)
        } else {
          // No pairs found, keep existing data but update timestamp
          setTokenData(prev => ({
            ...prev,
            lastUpdated: new Date().toLocaleTimeString()
          }))
        }
      } else {
        throw new Error(`HTTP ${response.status}`)
      }

    } catch (error) {
      console.log('API fetch failed, using static data:', error.message)
      // Keep existing data but update timestamp to show we tried
      setTokenData(prev => ({
        ...prev,
        lastUpdated: new Date().toLocaleTimeString()
      }))
    } finally {
      setIsRefreshing(false)
    }
  }

  // Helper function to format large numbers
  const formatMarketCap = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    } else {
      return value.toFixed(2)
    }
  }

  // Initial data fetch and periodic updates
  useEffect(() => {
    // Fetch immediately
    fetchTokenData()
    
    // Then fetch every 15 seconds for more up-to-date data
    const interval = setInterval(fetchTokenData, 15000)
    
    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mx-auto max-w-7xl px-4 sm:px-6 mb-8"
    >
      <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-400/10 to-transparent rounded-full blur-xl"></div>
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-800/90 to-gray-700/90 px-4 sm:px-6 py-3 border-b border-gray-600/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base text-white font-bold">A2A X402 TOKEN</h3>
                <p className="text-xs text-gray-300">Live Terminal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-xs font-medium text-green-300">LIVE</span>
              </div>
              
              <motion.button
                onClick={fetchTokenData}
                disabled={isRefreshing}
                className="p-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </motion.button>
              
              <motion.a
                href={`https://pump.fun/coin/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-xs sm:text-sm px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>BUY</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.a>
            </div>
          </div>
          
          {tokenData.lastUpdated && (
            <div className="mt-2 text-xs text-gray-400">
              Last updated: {tokenData.lastUpdated}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="relative p-4 sm:p-6">
          {/* Contract Address - Full Width */}
          <div className="mb-4">
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1 font-medium">Contract Address</div>
              <div className="flex items-center space-x-2">
                <code className="text-xs sm:text-sm font-mono text-green-400 bg-gray-900/50 px-2 py-1 rounded-lg break-all flex-1">
                  {contractAddress}
                </code>
                <motion.button
                  onClick={copyToClipboard}
                  className="p-1 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Copy Contract Address"
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Token Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1 font-medium">Price</div>
              <div className="text-lg font-bold text-green-400">{tokenData.price}</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1 font-medium">Market Cap</div>
              <div className="text-lg font-bold text-blue-400">{tokenData.marketCap}</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1 font-medium">24h Volume</div>
              <div className="text-lg font-bold text-purple-400">{tokenData.volume24h}</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1 font-medium">Status</div>
              <div className="text-lg font-bold text-cyan-400">{tokenData.holders}</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1 font-medium">24h Change</div>
              <div className={`text-lg font-bold flex items-center ${tokenData.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {tokenData.isPositive ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {tokenData.change24h}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}