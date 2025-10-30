'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Logo({ 
  size = 'medium', 
  animated = false, 
  className = '' 
}) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-32 h-32 md:w-40 md:h-40'
  }

  const LogoComponent = () => (
    <div className={`${sizeClasses[size]} ${className} relative flex-shrink-0`}>
      <Image
        src="/images/logo.png"
        alt="A2A X402 Logo"
        fill
        className="object-contain"
        priority={size === 'hero'}
      />
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.05,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 }
        }}
        transition={{ duration: 0.5 }}
      >
        <LogoComponent />
      </motion.div>
    )
  }

  return <LogoComponent />
}