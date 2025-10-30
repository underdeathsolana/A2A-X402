'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, Bot, FileText, Terminal, Wallet, Code, Map } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import Logo from './Logo'
import ConnectWallet from './ConnectWallet'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { id: 'home', label: 'Home', icon: <Zap className="w-4 h-4" />, href: '#home', type: 'scroll' },
    { id: 'features', label: 'Features', icon: <Bot className="w-4 h-4" />, href: '#features', type: 'scroll' },
    { id: 'demo', label: 'Live Demo', icon: <Terminal className="w-4 h-4" />, href: '#demo', type: 'scroll' },
    { id: 'ide', label: 'IDE A2A', icon: <Code className="w-4 h-4" />, href: '/ide', type: 'page' },
    { id: 'roadmap', label: 'Roadmap', icon: <Map className="w-4 h-4" />, href: '/roadmap', type: 'page' },
    { id: 'pricing', label: 'Pricing', icon: <Wallet className="w-4 h-4" />, href: '#pricing', type: 'scroll' },
    { id: 'docs', label: 'Docs', icon: <FileText className="w-4 h-4" />, href: '/docs', type: 'page' }
  ]

  // Update active section based on current pathname
  useEffect(() => {
    if (pathname === '/') {
      setActiveSection('home')
    } else if (pathname === '/ide') {
      setActiveSection('ide')
    } else if (pathname === '/roadmap') {
      setActiveSection('roadmap')
    } else if (pathname === '/docs') {
      setActiveSection('docs')
    }
  }, [pathname])

  const handleNavigation = (item) => {
    if (item.type === 'page') {
      router.push(item.href)
      setActiveSection(item.id)
    } else if (item.type === 'scroll') {
      if (pathname !== '/') {
        router.push('/')
        setTimeout(() => {
          const element = document.getElementById(item.id)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        const element = document.getElementById(item.id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(item.id)
        }
      }
    }
    setIsOpen(false)
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="max-w-7xl mx-auto">
        {/* Desktop & Mobile Container */}
        <div className="glass-effect rounded-2xl px-6 py-4 border border-white/20">
          <div className="flex justify-between items-center">
            
            {/* Logo & Brand */}
            <motion.div 
              className="flex items-center space-x-4 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('home')}
            >
              <Logo size="medium" animated />
              <div>
                <span className="text-xl font-bold text-white">A2A X402</span>
                <div className="text-xs text-white/60">Agent Payment Protocol</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm
                    ${activeSection === item.id 
                      ? 'bg-gradient-to-r from-brand-purple to-brand-blue text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Wallet & CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <ConnectWallet />
              <motion.button
                onClick={() => router.push('/ide')}
                className="px-4 py-2.5 bg-gradient-to-r from-brand-purple to-brand-cyan text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 border border-white/20 text-sm"
                whileHover={{ 
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)"
                }}
              >
                Launch IDE
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4"
            >
              <div className="glass-effect rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigation(item)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300
                        ${activeSection === item.id 
                          ? 'bg-gradient-to-r from-brand-purple to-brand-blue text-white' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                        }
                      `}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                  
                  {/* Mobile Wallet & CTA */}
                  <div className="mt-4 space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                    >
                      <ConnectWallet className="w-full justify-center" />
                    </motion.div>
                    
                    <motion.button
                      onClick={() => router.push('/ide')}
                      className="w-full px-6 py-4 bg-gradient-to-r from-brand-purple to-brand-cyan text-white rounded-xl font-bold text-center border border-white/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (navItems.length + 1) * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Launch A2A IDE
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}