'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Github, 
  Twitter, 
  MessageCircle,
  Mail,
  ExternalLink,
  Heart,
  Send
} from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Live Demo', href: '#demo' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Documentation', href: '/docs' }
    ],
    developers: [
      { name: 'API Reference', href: '/docs#api' },
      { name: 'Code Examples', href: '/docs#examples' },
      { name: 'Integration Guide', href: '/docs#integration' },
      { name: 'Terminal Demo', href: '#demo' }
    ],
    technology: [
      { name: 'Solana Blockchain', href: '#tech' },
      { name: 'AI Agent Protocol', href: '#tech' },
      { name: 'Payment Processing', href: '#tech' },
      { name: 'Security Features', href: '#tech' }
    ],
    resources: [
      { name: 'Whitepaper', href: '#resources' },
      { name: 'Use Cases', href: '#features' },
      { name: 'Token Economics', href: '#pricing' },
      { name: 'Roadmap', href: '#roadmap' }
    ]
  }

  const socialLinks = [
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: 'https://x.com/A2AX402XYZ',
      name: 'Twitter'
    },
    { 
      icon: <Send className="w-5 h-5" />, 
      href: 'https://t.me/A2ax402Bot',
      name: 'Telegram'
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      href: 'mailto:a2ax402xyz@gmail.com',
      name: 'Email'
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      href: '#features',
      name: 'Features'
    }
  ]

  return (
    <footer className="relative px-6 py-20 border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <Logo size="large" />
              <span className="text-2xl font-bold text-white">A2A X402</span>
            </div>
            <p className="text-white/70 mb-8 leading-relaxed">
              Revolutionizing digital commerce with autonomous AI agent payments. 
              Built on Solana for lightning-fast, trustless transactions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-6">Product</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Developers Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-6">Developers</h3>
            <ul className="space-y-4">
              {footerLinks.developers.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-primary-400 transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Technology Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-6">Technology</h3>
            <ul className="space-y-4">
              {footerLinks.technology.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-6">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="glass-effect p-6 md:p-8 rounded-2xl mb-16"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Stay Updated with X402
            </h3>
            <p className="text-white/70 mb-6 text-sm md:text-base">
              Get the latest updates on new features, partnerships, and the future of AI agent payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent-400 transition-colors text-sm md:text-base"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-accent-500 to-primary-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-6 md:pt-8"
        >
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-6">
              <p className="text-white/60 text-xs md:text-sm text-center md:text-left">
                © 2025 A2A X402 Protocol. All rights reserved.
              </p>
              <div className="flex justify-center md:justify-start items-center space-x-4 text-xs md:text-sm">
                <a href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-end space-x-2 text-white/60 text-xs md:text-sm">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>for the future of AI</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}