'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-brand-purple/10" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-brand-cyan/15 to-brand-teal/15 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-emerald/10 to-brand-blue/10 rounded-full blur-3xl"
      />
      
      {/* Floating logo watermarks */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          opacity: [0.03, 0.07, 0.03]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-32 h-32 opacity-5"
      >
        <Image
          src="/images/logo.png"
          alt="A2A Logo Watermark"
          fill
          className="object-contain"
        />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -3, 0],
          opacity: [0.02, 0.06, 0.02]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-1/3 left-1/3 w-24 h-24 opacity-5"
      >
        <Image
          src="/images/logo.png"
          alt="A2A Logo Watermark"
          fill
          className="object-contain"
        />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 2, 0],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8
        }}
        className="absolute top-2/3 right-1/3 w-28 h-28 opacity-5"
      >
        <Image
          src="/images/logo.png"
          alt="A2A Logo Watermark"
          fill
          className="object-contain"
        />
      </motion.div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}