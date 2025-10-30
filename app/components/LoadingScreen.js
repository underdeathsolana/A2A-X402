'use client'

import { motion } from 'framer-motion'
import Logo from './Logo'

export default function LoadingScreen({ isVisible = true }) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-brand-purple/20"
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-blue/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-brand-purple/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-brand-cyan/20 rounded-full blur-xl"
        />
      </div>

      {/* Main logo animation */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1
          }}
          className="mb-8"
        >
          <Logo size="hero" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">A2A X402</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-md">
            Agent-to-Agent Payment Revolution
          </p>
        </motion.div>

        {/* Loading animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <div className="flex space-x-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 0.6,
                repeat: Infinity,
                delay: 0
              }}
              className="w-3 h-3 bg-brand-blue rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 0.6,
                repeat: Infinity,
                delay: 0.2
              }}
              className="w-3 h-3 bg-brand-purple rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 0.6,
                repeat: Infinity,
                delay: 0.4
              }}
              className="w-3 h-3 bg-brand-cyan rounded-full"
            />
          </div>
          <motion.span 
            className="text-white/60 ml-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity
            }}
          >
            Loading...
          </motion.span>
        </motion.div>
      </div>

      {/* Bottom brand text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-white/40 text-sm">
          Powered by Solana Blockchain
        </p>
      </motion.div>
    </motion.div>
  )
}