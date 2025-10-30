'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Logo({ 
  size = 'medium', 
  animated = false, 
  className = '',
  glowEffect = false
}) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48'
  }

  const LogoComponent = () => (
    <div className={`${sizeClasses[size]} ${className} relative flex-shrink-0`}>
      {/* Logo shadow/glow effect for better integration */}
      {glowEffect && (
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-full blur-lg"
        />
      )}
      
      {/* Enhanced logo container */}
      <div className="relative w-full h-full">
        <Image
          src="/images/logo.png"
          alt="A2A X402 Logo"
          fill
          className={`object-contain drop-shadow-2xl ${size === 'hero' ? 'filter brightness-110 contrast-110' : ''}`}
          priority={size === 'hero'}
        />
        
        {/* Subtle overlay gradient for better background integration */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-full pointer-events-none"></div>
      </div>
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ 
          scale: size === 'hero' ? 1.08 : 1.1,
          rotate: [0, -3, 3, 0],
          y: -5,
          transition: { 
            duration: 0.4,
            ease: "easeOut"
          }
        }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut"
        }}
      >
        <LogoComponent />
      </motion.div>
    )
  }

  return <LogoComponent />
}