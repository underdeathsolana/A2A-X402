'use client'

import { motion } from 'framer-motion'
import { Play, ArrowRight, CheckCircle, Loader2, Wallet } from 'lucide-react'
import Logo from './Logo'
import ConnectWallet from './ConnectWallet'

export default function HeroSection() {
  return (
    <section className="relative px-6 py-20 min-h-screen flex items-center">
      {/* Floating logo particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-16 h-16"
        >
          <Logo size="large" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            x: [0, -15, 0],
            rotate: [0, -8, 0],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-32 left-16 w-12 h-12"
        >
          <Logo size="medium" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0],
            opacity: [0.08, 0.25, 0.08]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          className="absolute top-1/2 left-1/4 w-14 h-14"
        >
          <Logo size="medium" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Hero Logo with Enhanced Integration */}
          <motion.div 
            className="flex justify-center mb-12 relative"
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <div className="relative">
              {/* Multi-layered glow effects for depth */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.4, 0.15],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-8 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 rounded-full blur-3xl opacity-20"
              />
              
              <motion.div
                animate={{ 
                  scale: [1.1, 1, 1.1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [360, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -inset-4 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan rounded-full blur-2xl opacity-30"
              />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -inset-2 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-full blur-xl"
              />

              {/* Logo container with glass morphism */}
              <motion.div
                whileHover={{ 
                  scale: 1.08,
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
                className="relative p-6 bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl"></div>
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent rounded-t-3xl"></div>
                
                {/* Logo with enhanced positioning */}
                <div className="relative z-10">
                  <Logo size="hero" animated glowEffect />
                </div>
                
                {/* Orbiting particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      rotate: 360,
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 0.9, 0.3],
                    }}
                    transition={{
                      rotate: {
                        duration: 6 + (i * 0.5),
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2 + (i * 0.3),
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      opacity: {
                        duration: 2 + (i * 0.3),
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    transformOrigin={`${40 + (i * 10)}px 0px`}
                  />
                ))}
                
                {/* Floating sparkles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{
                      top: `${15 + (i * 8)}%`,
                      left: `${10 + (i * 7)}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      x: [0, Math.sin(i) * 10, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 3 + (i * 0.2),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Main Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <motion.span 
                className="gradient-text block mb-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Agent-to-Agent
              </motion.span>
              <motion.span 
                className="text-white block"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Payment Revolution
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              The first autonomous payment token designed for AI agents to seamlessly 
              pay for API access, data feeds, and premium services without human intervention.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mb-16"
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="relative inline-block">
                {/* Button glow effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan rounded-2xl blur-xl opacity-50"
                />
                
                <button
                  onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                  className="relative overflow-hidden px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan text-white hover:shadow-2xl border-2 border-white/20 hover:border-white/40"
                >
                  {/* Button background animation */}
                  <motion.div
                    animate={{ 
                      x: ['-100%', '100%']
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  
                  <span className="flex items-center relative z-10">
                    <Play className="w-6 h-6 mr-3" />
                    Watch Live Demo
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </span>
                </button>
              </div>
              
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 glass-effect text-white hover:bg-white/15 border-2 border-white/20 hover:border-white/40"
              >
                Learn More
              </button>
            </div>
            
            {/* Wallet Connection Section */}
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center space-x-2 text-white/80">
                <Wallet className="w-5 h-5" />
                <span className="font-medium">Connect your Solana wallet to get started</span>
              </div>
              <ConnectWallet className="text-sm px-6 py-3" />
            </motion.div>
            
            <motion.p 
              className="text-white/60 mt-6 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              Interactive terminal simulation
            </motion.p>
          </motion.div>

          {/* Stats/Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="glass-effect p-6 rounded-xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold gradient-text mb-2"
              >
                &lt;1s
              </motion.div>
              <p className="text-white/80">Payment Speed</p>
            </div>
            
            <div className="glass-effect p-6 rounded-xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-3xl font-bold gradient-text mb-2"
              >
                24/7
              </motion.div>
              <p className="text-white/80">Autonomous Operation</p>
            </div>
            
            <div className="glass-effect p-6 rounded-xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="text-3xl font-bold gradient-text mb-2"
              >
                Zero
              </motion.div>
              <p className="text-white/80">Human Intervention</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}