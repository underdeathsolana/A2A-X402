'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Bot, 
  CreditCard, 
  Shield, 
  Rocket, 
  ChevronRight, 
  Play,
  CheckCircle,
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Copy
} from 'lucide-react'
import Footer from './components/Footer'
import Logo from './components/Logo'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import TerminalSimulation from './components/TerminalSimulation'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Agent Integration",
      description: "Seamlessly integrate with any AI bot or agent for autonomous payments"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Instant payments powered by Solana blockchain technology"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Trustless",
      description: "No login required, fully decentralized payment system"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Universal Access",
      description: "Access premium APIs, data feeds, and AI models globally"
    }
  ]

  const useCases = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Feed Access",
      price: "50 A2A",
      description: "Real-time market data and analytics"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "AI Model Access",
      price: "150 A2A",
      description: "Premium GPT-4, Claude, and custom models"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "API Premium Tier",
      price: "402 A2A",
      description: "Unlimited API calls and advanced features"
    }
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/30 to-blue-950/30"></div>
        
        {/* Dynamic Gradient Orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x / 50,
            y: mousePosition.y / 50,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-brand-cyan/15 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x / 80,
            y: -mousePosition.y / 80,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          style={{ right: '15%', top: '40%' }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x / 100,
            y: mousePosition.y / 100,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          style={{ left: '60%', bottom: '20%' }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-purple/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <Navbar />
      
      {/* Main Content with proper spacing for fixed navbar */}
      <div className="pt-24 relative z-10" id="home">

      {/* SOON Contract Terminal */}
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
                <motion.a
                  href="https://pump.fun/coin/EUnDiHtP5xoqLzLP5rfrd18Yhdv1oUeCPxaeia4ipump"
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
          </div>
          
          {/* Content */}
          <div className="relative p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="col-span-2 sm:col-span-1 lg:col-span-2">
                <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                  <div className="text-xs text-gray-400 mb-1 font-medium">Contract Address</div>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-green-400 bg-gray-900/50 px-2 py-1 rounded-lg">
                      SOON123...bcdef
                    </code>
                    <motion.button
                      onClick={() => navigator.clipboard.writeText('SOON1234567890abcdef')}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Copy className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                <div className="text-xs text-gray-400 mb-1 font-medium">Price</div>
                <div className="text-lg font-bold text-green-400">$0.0024</div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                <div className="text-xs text-gray-400 mb-1 font-medium">Market Cap</div>
                <div className="text-lg font-bold text-blue-400">$1.2M</div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                <div className="text-xs text-gray-400 mb-1 font-medium">Holders</div>
                <div className="text-lg font-bold text-cyan-400">1,247</div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                <div className="text-xs text-gray-400 mb-1 font-medium">24h Change</div>
                <div className="text-lg font-bold text-green-400">+12.5%</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="px-6 py-20 relative z-10" id="features">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Why Choose <span className="gradient-text">A2A X402</span>?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Built specifically for the age of autonomous AI agents, 
              our token provides seamless, trustless payments for digital services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="text-accent-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="px-6 py-20" id="demo">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="gradient-text">Live Terminal</span> Demo
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Watch an AI agent autonomously discover, select, and pay for premium services in real-time.
            </p>
          </motion.div>
          
          <TerminalSimulation />
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-20" id="pricing">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="gradient-text">Use Cases</span> & Pricing
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From data feeds to AI models, A2A X402 powers the future of autonomous digital commerce.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-primary-400 group-hover:scale-110 transition-transform duration-300">
                    {useCase.icon}
                  </div>
                  <span className="text-accent-400 font-bold text-lg">{useCase.price}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{useCase.title}</h3>
                <p className="text-white/70 mb-6">{useCase.description}</p>
                <div className="flex items-center text-primary-400 group-hover:text-accent-400 transition-colors">
                  <span className="text-sm font-semibold">Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect p-12 rounded-3xl"
          >
            <div className="flex justify-center mb-6">
              <Logo size="xl" animated />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Power Your AI Agents?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join the future of autonomous digital payments. Get X402 tokens and 
              enable your AI agents to operate independently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-cyan text-white rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Try Live Demo
              </button>
              <a 
                href="/docs"
                className="px-8 py-4 glass-effect text-white rounded-xl font-bold hover:bg-white/15 transition-colors text-center"
              >
                View Documentation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </div>
    </main>
  )
}