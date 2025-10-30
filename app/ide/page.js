'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, Play, Square, Download, Upload, Settings, 
  FileText, Package, Zap, Code, CheckCircle, AlertCircle,
  Info, Trash2, RefreshCw, Copy, ExternalLink 
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

export default function IDEPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'info', text: '🚀 A2A X402 Development Environment', timestamp: new Date() },
    { type: 'system', text: 'Welcome to A2A IDE - Agent-to-Agent Payment Development Platform', timestamp: new Date() },
    { type: 'success', text: 'Terminal initialized successfully', timestamp: new Date() },
    { type: 'info', text: 'Type "help" to see available commands', timestamp: new Date() }
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [installedPackages, setInstalledPackages] = useState([
    { name: '@solana/web3.js', version: '1.87.6', status: 'installed' },
    { name: 'next', version: '14.0.0', status: 'installed' },
    { name: 'react', version: '18.2.0', status: 'installed' }
  ])
  const [activeTab, setActiveTab] = useState('terminal')
  const [soonContractData, setSoonContractData] = useState({
    address: 'SOON1234567890abcdef',
    price: 0.0024,
    marketCap: '$1.2M',
    holders: 1247,
    liquidity: '$156K'
  })
  const terminalRef = useRef(null)
  const inputRef = useRef(null)

  // Mouse tracking for dynamic background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput])

  // Focus input when tab changes to terminal
  useEffect(() => {
    if (activeTab === 'terminal' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [activeTab])

  const addOutput = (text, type = 'output') => {
    setTerminalOutput(prev => [...prev, {
      text,
      type,
      timestamp: new Date()
    }])
  }

  const simulatePackageInstall = async (packageName) => {
    setIsProcessing(true)
    
    // Simulate npm install process
    const steps = [
      `$ npm install ${packageName}`,
      `📦 Installing ${packageName}...`,
      `⬇️  Downloading package from registry...`,
      `🔧 Resolving dependencies...`,
      `✅ Package ${packageName} installed successfully`
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800))
      addOutput(step, step.startsWith('$') ? 'command' : step.startsWith('✅') ? 'success' : 'info')
    }

    // Add to installed packages if not exists
    if (!installedPackages.find(pkg => pkg.name === packageName)) {
      setInstalledPackages(prev => [...prev, {
        name: packageName,
        version: '1.0.0',
        status: 'installed'
      }])
    }

    setIsProcessing(false)
  }

  const simulateSolanaCommand = async (command) => {
    setIsProcessing(true)
    
    const solanaCommands = {
      'solana --version': {
        output: 'solana-cli 1.16.15 (src:36af529e; feat:3949673893)',
        type: 'success'
      },
      'solana config get': {
        output: `Config File: ~/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com
WebSocket URL: wss://api.devnet.solana.com/
Keypair Path: ~/.config/solana/id.json
Commitment: confirmed`,
        type: 'info'
      },
      'solana balance': {
        output: '2.5 SOL',
        type: 'success'
      },
      'solana address': {
        output: 'Bs7D8zq7cKk5J4vN8fK2X9gH3pL6mR4eT8wQ5sA9cB2x',
        type: 'success'
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const result = solanaCommands[command]
    if (result) {
      addOutput(`$ ${command}`, 'command')
      addOutput(result.output, result.type)
    } else {
      addOutput(`$ ${command}`, 'command')
      addOutput(`Command not found. Available commands: ${Object.keys(solanaCommands).join(', ')}`, 'error')
    }

    setIsProcessing(false)
  }

  const processCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    if (!trimmedCmd) return

    addOutput(`$ ${cmd}`, 'command')

    if (trimmedCmd === 'help') {
      const helpText = `Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Package Management:
  npm install <package>    - Install npm package
  npm list                 - List installed packages
  yarn add <package>       - Install with Yarn

🔗 Solana CLI:
  solana --version         - Check Solana CLI version
  solana config get        - Show current configuration
  solana balance          - Check wallet balance
  solana address          - Show wallet address

🛠️  Development:
  clear                   - Clear terminal
  ls                      - List files
  pwd                     - Show current directory
  help                    - Show this help

🚀 A2A Commands:
  a2a init                - Initialize A2A project
  a2a deploy              - Deploy to Solana
  a2a test                - Run tests`
      addOutput(helpText, 'info')
      return
    }

    if (trimmedCmd === 'clear') {
      setTerminalOutput([{
        type: 'system',
        text: 'Terminal cleared',
        timestamp: new Date()
      }])
      return
    }

    if (trimmedCmd === 'ls') {
      addOutput('package.json  src/  components/  pages/  public/', 'info')
      return
    }

    if (trimmedCmd === 'pwd') {
      addOutput('/workspace/a2a-x402', 'info')
      return
    }

    if (trimmedCmd.startsWith('npm install ')) {
      const packageName = trimmedCmd.replace('npm install ', '')
      await simulatePackageInstall(packageName)
      return
    }

    if (trimmedCmd === 'npm list') {
      addOutput('Installed packages:', 'info')
      installedPackages.forEach(pkg => {
        addOutput(`  ${pkg.name}@${pkg.version}`, 'success')
      })
      return
    }

    if (trimmedCmd.startsWith('solana')) {
      await simulateSolanaCommand(cmd.trim())
      return
    }

    if (trimmedCmd === 'a2a init') {
      setIsProcessing(true)
      const steps = [
        '🚀 Initializing A2A X402 project...',
        '📁 Creating project structure...',
        '⚙️  Setting up Solana configuration...',
        '🔧 Installing dependencies...',
        '✅ A2A project initialized successfully!'
      ]
      
      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        addOutput(step, step.startsWith('✅') ? 'success' : 'info')
      }
      setIsProcessing(false)
      return
    }

    // Default case
    addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      if (currentCommand.trim()) {
        setCommandHistory(prev => [...prev, currentCommand])
        setHistoryIndex(-1)
        processCommand(currentCommand)
        setCurrentCommand('')
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand('')
      }
    }
  }

  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: <Terminal className="w-4 h-4" /> },
    { id: 'soon', label: 'SOON Contract', icon: <Zap className="w-4 h-4" /> },
    { id: 'packages', label: 'Packages', icon: <Package className="w-4 h-4" /> },
    { id: 'files', label: 'Files', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ]

  const getOutputIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      case 'info':
        return <Info className="w-4 h-4 text-blue-400" />
      case 'system':
        return <Zap className="w-4 h-4 text-purple-400" />
      default:
        return <Code className="w-4 h-4 text-gray-400" />
    }
  }

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/40 to-blue-950/40"></div>
        
        {/* Code-inspired Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Dynamic Terminal-themed Orbs */}
        <motion.div
          className="absolute w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x / 60,
            y: mousePosition.y / 60,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            type: "spring", 
            damping: 50, 
            stiffness: 100,
            scale: { duration: 4, repeat: Infinity }
          }}
          style={{ left: '5%', top: '15%' }}
        />
        <motion.div
          className="absolute w-60 h-60 bg-brand-cyan/15 rounded-full blur-2xl"
          animate={{
            x: -mousePosition.x / 100,
            y: -mousePosition.y / 100,
            scale: [1, 0.8, 1],
          }}
          transition={{ 
            type: "spring", 
            damping: 50, 
            stiffness: 100,
            scale: { duration: 6, repeat: Infinity, delay: 1 }
          }}
          style={{ right: '10%', top: '30%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-brand-purple/8 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x / 120,
            y: mousePosition.y / 120,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            type: "spring", 
            damping: 50, 
            stiffness: 100,
            scale: { duration: 8, repeat: Infinity, delay: 2 }
          }}
          style={{ left: '50%', bottom: '10%' }}
        />
        
        {/* Floating Code Symbols */}
        {['$', '>', '{', '}', '[]', '()', '&&', '||'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-brand-purple/20 text-lg font-mono"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center space-x-6 mb-8"
          >
            <Logo size="large" animated />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                A2A <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">IDE</span>
              </h1>
              <p className="text-xl text-white/70">
                Development Environment for Agent-to-Agent Payments
              </p>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-lg text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Build, test, and deploy AI agent payment solutions with our integrated development environment
          </motion.p>
        </div>
      </section>

      {/* IDE Interface */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="glass-effect rounded-2xl border border-white/20 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            
            {/* IDE Header */}
            <div className="bg-gray-800/50 border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <h3 className="text-white font-medium">A2A Development Environment</h3>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex space-x-1 mt-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
                      ${activeTab === tab.id 
                        ? 'bg-brand-purple text-white' 
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {tab.icon}
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'terminal' && (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Terminal */}
                    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                      {/* Terminal Header */}
                      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                        <div className="flex items-center space-x-2">
                          <Terminal className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-white font-medium">A2A Terminal</span>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setTerminalOutput([])}
                            className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Terminal Content */}
                      <div 
                        ref={terminalRef}
                        className="h-96 p-4 overflow-y-auto font-mono text-sm bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                      >
                        {terminalOutput.map((line, index) => (
                          <motion.div 
                            key={index}
                            className={`
                              flex items-start space-x-3 py-1
                              ${line.type === 'command' ? 'text-yellow-300' : ''}
                              ${line.type === 'success' ? 'text-green-400' : ''}
                              ${line.type === 'error' ? 'text-red-400' : ''}
                              ${line.type === 'info' ? 'text-blue-300' : ''}
                              ${line.type === 'system' ? 'text-purple-300' : ''}
                              ${line.type === 'output' ? 'text-gray-300' : ''}
                            `}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center space-x-2 min-w-0 flex-1">
                              {getOutputIcon(line.type)}
                              <span className="whitespace-pre-wrap break-words">{line.text}</span>
                            </div>
                            <span className="text-xs text-gray-500 ml-auto flex-shrink-0">
                              {formatTimestamp(line.timestamp)}
                            </span>
                          </motion.div>
                        ))}
                        
                        {/* Command Input */}
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-green-400">➜</span>
                          <span className="text-blue-300">a2a-ide</span>
                          <span className="text-white">$</span>
                          <input
                            ref={inputRef}
                            type="text"
                            value={currentCommand}
                            onChange={(e) => setCurrentCommand(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isProcessing}
                            className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
                            placeholder={isProcessing ? "Processing..." : "Type a command..."}
                          />
                          {isProcessing && (
                            <motion.div 
                              className="text-yellow-400"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              ⟳
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'soon' && (
                  <motion.div
                    key="soon"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                      <Zap className="w-6 h-6 text-yellow-400" />
                      <span>SOON Contract Terminal</span>
                    </h3>
                    
                    {/* Contract Information */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                          <Code className="w-5 h-5 text-purple-400" />
                          <span>Contract Details</span>
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Address:</span>
                            <div className="flex items-center space-x-2">
                              <code className="bg-gray-800 px-2 py-1 rounded text-sm text-green-400">
                                {soonContractData.address}
                              </code>
                              <button 
                                onClick={() => navigator.clipboard.writeText(soonContractData.address)}
                                className="p-1 text-gray-400 hover:text-white rounded"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Price:</span>
                            <span className="text-green-400 font-mono">${soonContractData.price}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Market Cap:</span>
                            <span className="text-blue-400 font-mono">{soonContractData.marketCap}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Holders:</span>
                            <span className="text-cyan-400 font-mono">{soonContractData.holders.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Liquidity:</span>
                            <span className="text-purple-400 font-mono">{soonContractData.liquidity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                          <ExternalLink className="w-5 h-5 text-green-400" />
                          <span>Quick Actions</span>
                        </h4>
                        <div className="space-y-3">
                          <a
                            href={`https://pump.fun/${soonContractData.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2 group"
                          >
                            <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span>Buy on Pump.fun</span>
                          </a>
                          
                          <button 
                            onClick={() => window.open(`https://solscan.io/token/${soonContractData.address}`, '_blank')}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2"
                          >
                            <Info className="w-5 h-5" />
                            <span>View on Solscan</span>
                          </button>
                          
                          <button 
                            onClick={() => window.open(`https://dexscreener.com/solana/${soonContractData.address}`, '_blank')}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex items-center justify-center space-x-2"
                          >
                            <RefreshCw className="w-5 h-5" />
                            <span>Chart on DEXScreener</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* SOON Terminal */}
                    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-white font-medium">SOON Contract Monitor</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400">Live</span>
                        </div>
                      </div>
                      
                      <div className="p-4 h-64 overflow-y-auto font-mono text-sm bg-black/50">
                        <div className="space-y-2">
                          <div className="text-green-400">
                            <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> 
                            <span className="text-yellow-400 ml-2">SOON</span> 
                            <span className="text-white ml-2">Contract monitoring started...</span>
                          </div>
                          <div className="text-blue-400">
                            <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> 
                            <span className="text-cyan-400 ml-2">INFO</span> 
                            <span className="text-white ml-2">Contract Address: {soonContractData.address}</span>
                          </div>
                          <div className="text-green-400">
                            <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> 
                            <span className="text-green-400 ml-2">PRICE</span> 
                            <span className="text-white ml-2">Current: ${soonContractData.price}</span>
                          </div>
                          <div className="text-purple-400">
                            <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> 
                            <span className="text-purple-400 ml-2">MARKET</span> 
                            <span className="text-white ml-2">Cap: {soonContractData.marketCap} | Holders: {soonContractData.holders}</span>
                          </div>
                          <div className="text-cyan-400">
                            <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> 
                            <span className="text-cyan-400 ml-2">LIQUIDITY</span> 
                            <span className="text-white ml-2">Available: {soonContractData.liquidity}</span>
                          </div>
                          <div className="text-yellow-400">
                            <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> 
                            <span className="text-yellow-400 ml-2">STATUS</span> 
                            <span className="text-white ml-2">Ready for trading on Pump.fun ✅</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'packages' && (
                  <motion.div
                    key="packages"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Package Manager</h3>
                    
                    {/* Quick Install */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Quick Install</h4>
                        <div className="grid gap-3">
                          {[
                            { name: '@solana/spl-token', desc: 'Solana SPL Token Library' },
                            { name: '@project-serum/anchor', desc: 'Anchor Framework' },
                            { name: 'borsh', desc: 'Binary Object Representation' },
                            { name: '@metaplex/js', desc: 'Metaplex SDK' }
                          ].map((pkg) => (
                            <div key={pkg.name} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                              <div>
                                <div className="text-white font-medium">{pkg.name}</div>
                                <div className="text-sm text-white/60">{pkg.desc}</div>
                              </div>
                              <button 
                                onClick={() => simulatePackageInstall(pkg.name)}
                                disabled={isProcessing}
                                className="px-3 py-1 bg-brand-purple text-white rounded text-sm hover:bg-brand-purple/80 disabled:opacity-50"
                              >
                                Install
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Installed Packages</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {installedPackages.map((pkg, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                              <div>
                                <div className="text-white font-medium">{pkg.name}</div>
                                <div className="text-sm text-white/60">v{pkg.version}</div>
                              </div>
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'files' && (
                  <motion.div
                    key="files"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Project Files</h3>
                    <div className="text-white/60">
                      File explorer coming soon... Use terminal commands for now.
                    </div>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">IDE Settings</h3>
                    <div className="text-white/60">
                      Settings panel coming soon...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}