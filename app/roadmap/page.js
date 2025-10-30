'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, Clock, AlertCircle, Zap, Rocket, Target, 
  Calendar, GitBranch, Users, Code, Shield, Globe,
  Layers, Database, Cpu, Network, Wallet, Bot
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

export default function RoadmapPage() {
  const [selectedPhase, setSelectedPhase] = useState(0)
  const [filter, setFilter] = useState('all')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const roadmapPhases = [
    {
      id: 0,
      title: "Platform Optimization & Scale",
      subtitle: "Q4 2025",
      status: "in-progress",
      progress: 80,
      description: "Optimizing platform performance and scaling infrastructure for mass adoption",
      color: "from-brand-purple to-brand-blue",
      icon: <Rocket className="w-6 h-6" />,
      milestones: [
        {
          title: "Performance Optimization",
          description: "Optimize smart contracts and reduce gas fees by 50%",
          status: "completed",
          date: "Oct 2025",
          team: "Blockchain Team",
          priority: "high"
        },
        {
          title: "Multi-Chain Integration",
          description: "Extend A2A protocol to Ethereum and Polygon networks",
          status: "in-progress",
          date: "Nov 2025",
          team: "Protocol Team",
          priority: "high"
        },
        {
          title: "Advanced Analytics Dashboard", 
          description: "Real-time analytics and monitoring for AI agents",
          status: "in-progress",
          date: "Dec 2025",
          team: "Data Team",
          priority: "medium"
        },
        {
          title: "Enterprise SDK v2.0",
          description: "Enhanced SDK with enterprise-grade features",
          status: "pending",
          date: "Dec 2025",
          team: "DevTools Team",
          priority: "high"
        }
      ]
    },
    {
      id: 1,
      title: "AI Integration & Intelligence",
      subtitle: "Q1 2026",
      status: "pending",
      progress: 15,
      description: "Advanced AI integration and autonomous agent intelligence",
      color: "from-brand-blue to-brand-cyan",
      icon: <Bot className="w-6 h-6" />,
      milestones: [
        {
          title: "AI Agent Marketplace",
          description: "Decentralized marketplace for AI agents and services",
          status: "pending",
          date: "Jan 2026",
          team: "AI Team",
          priority: "high"
        },
        {
          title: "Natural Language Processing",
          description: "Advanced NLP for agent communication and contracts",
          status: "pending",
          date: "Feb 2026",
          team: "AI Team",
          priority: "high"
        },
        {
          title: "Machine Learning Integration",
          description: "ML-powered fraud detection and risk assessment",
          status: "pending",
          date: "Mar 2026",
          team: "AI Team",
          priority: "medium"
        },
        {
          title: "Autonomous Governance",
          description: "AI-driven protocol governance and decision making",
          status: "pending",
          date: "Mar 2026",
          team: "Governance Team",
          priority: "high"
        }
      ]
    },
    {
      id: 2,
      title: "Global Expansion & Partnerships", 
      subtitle: "Q2 2026",
      status: "pending",
      progress: 5,
      description: "Global market expansion and strategic enterprise partnerships",
      color: "from-brand-cyan to-brand-teal",
      icon: <Globe className="w-6 h-6" />,
      milestones: [
        {
          title: "Enterprise Partnerships",
          description: "Strategic partnerships with Fortune 500 companies",
          status: "pending",
          date: "Apr 2026",
          team: "Business Dev",
          priority: "high"
        },
        {
          title: "Regulatory Compliance",
          description: "Full compliance with global financial regulations",
          status: "pending",
          date: "May 2026",
          team: "Legal Team",
          priority: "critical"
        },
        {
          title: "Cross-Border Payments",
          description: "Seamless international A2A payment solutions",
          status: "pending",
          date: "Jun 2026",
          team: "Protocol Team",
          priority: "high"
        },
        {
          title: "Banking Integration",
          description: "Integration with traditional banking systems",
          status: "pending",
          date: "Jun 2026",
          team: "Integration Team",
          priority: "medium"
        }
      ]
    },
    {
      id: 3,
      title: "Advanced Features & Innovation",
      subtitle: "Q3 2026", 
      status: "pending",
      progress: 0,
      description: "Cutting-edge features and next-generation innovations",
      color: "from-brand-teal to-brand-purple",
      icon: <Zap className="w-6 h-6" />,
      milestones: [
        {
          title: "Quantum-Resistant Security",
          description: "Implementation of quantum-resistant cryptography",
          status: "pending",
          date: "Jul 2026",
          team: "Security Team",
          priority: "high"
        },
        {
          title: "Decentralized Governance",
          description: "Community-driven protocol governance system",
          status: "pending",
          date: "Aug 2026",
          team: "Governance Team",
          priority: "high"
        },
        {
          title: "Advanced Privacy Features",
          description: "Zero-knowledge proofs for private transactions",
          status: "pending",
          date: "Sep 2026",
          team: "Privacy Team",
          priority: "medium"
        },
        {
          title: "Carbon-Neutral Protocol",
          description: "Environmental sustainability initiatives",
          status: "pending",
          date: "Sep 2026",
          team: "Sustainability Team",
          priority: "medium"
        }
      ]
    },
    {
      id: 4,
      title: "Future Vision & Beyond",
      subtitle: "Q4 2026",
      status: "future",
      progress: 0,
      description: "Setting foundation for the future of autonomous digital economy",
      color: "from-brand-emerald to-brand-purple",
      icon: <Target className="w-6 h-6" />,
      milestones: [
        {
          title: "Metaverse Integration",
          description: "Native A2A payments in virtual worlds and metaverse",
          status: "future",
          date: "Oct 2026",
          team: "Web3 Team",
          priority: "high"
        },
        {
          title: "IoT Device Support",
          description: "Payment protocol for Internet of Things devices",
          status: "future", 
          date: "Nov 2026",
          team: "IoT Team",
          priority: "medium"
        },
        {
          title: "Global Reserve Currency",
          description: "A2A X402 as standard for digital agent economy",
          status: "future",
          date: "Dec 2026",
          team: "Economics Team",
          priority: "critical"
        },
        {
          title: "Next-Gen Protocol",
          description: "Research and development for A2A X403",
          status: "future",
          date: "Dec 2026",
          team: "Research Team",
          priority: "high"
        }
      ]
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-blue-400" />
      case 'future':
        return <Rocket className="w-4 h-4 text-purple-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/10'
      case 'in-progress':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'pending':
        return 'text-blue-400 bg-blue-400/10'
      case 'future':
        return 'text-purple-400 bg-purple-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'high':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'medium':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'low':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const filteredMilestones = () => {
    if (filter === 'all') return roadmapPhases[selectedPhase].milestones
    return roadmapPhases[selectedPhase].milestones.filter(m => m.status === filter)
  }

  // Mouse tracking for dynamic background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const filterOptions = [
    { id: 'all', label: 'All', count: roadmapPhases[selectedPhase]?.milestones.length || 0 },
    { id: 'completed', label: 'Completed', count: roadmapPhases[selectedPhase]?.milestones.filter(m => m.status === 'completed').length || 0 },
    { id: 'in-progress', label: 'In Progress', count: roadmapPhases[selectedPhase]?.milestones.filter(m => m.status === 'in-progress').length || 0 },
    { id: 'pending', label: 'Pending', count: roadmapPhases[selectedPhase]?.milestones.filter(m => m.status === 'pending').length || 0 }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/30 to-blue-950/30"></div>
        
        {/* Roadmap-themed elements */}
        <div className="absolute inset-0 opacity-10">
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path 
              d="M 100 200 Q 400 100 800 200 Q 1200 300 1600 200" 
              stroke="url(#roadmapGradient)" 
              strokeWidth="2" 
              fill="none"
              className="animate-pulse"
            />
            <path 
              d="M 50 400 Q 450 300 850 400 Q 1250 500 1650 400" 
              stroke="url(#roadmapGradient)" 
              strokeWidth="1.5" 
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </svg>
        </div>
        
        {/* Dynamic Milestone Orbs */}
        <motion.div
          className="absolute w-32 h-32 bg-green-500/20 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x / 70,
            y: mousePosition.y / 70,
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            type: "spring", 
            damping: 50, 
            stiffness: 100,
            scale: { duration: 4, repeat: Infinity }
          }}
          style={{ left: '15%', top: '25%' }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-brand-cyan/25 rounded-full blur-xl"
          animate={{
            x: -mousePosition.x / 90,
            y: -mousePosition.y / 90,
            scale: [1, 0.7, 1],
          }}
          transition={{ 
            type: "spring", 
            damping: 50, 
            stiffness: 100,
            scale: { duration: 6, repeat: Infinity, delay: 2 }
          }}
          style={{ right: '20%', top: '35%' }}
        />
        <motion.div
          className="absolute w-40 h-40 bg-brand-purple/15 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x / 110,
            y: mousePosition.y / 110,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            type: "spring", 
            damping: 50, 
            stiffness: 100,
            scale: { duration: 8, repeat: Infinity, delay: 1 }
          }}
          style={{ left: '60%', bottom: '20%' }}
        />
        
        {/* Floating Progress Indicators */}
        {['✓', '◐', '○', '◯', '▶'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-brand-purple/30 text-2xl"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
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
      <section className="pt-32 pb-12 px-6 relative z-10">
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
                Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">Roadmap</span>
              </h1>
              <p className="text-xl text-white/70">
                Our journey to revolutionize agent-to-agent payments
              </p>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-lg text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Track our progress as we build the future of autonomous AI payments on Solana
          </motion.p>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="px-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Phase Navigation */}
          <motion.div 
            className="flex overflow-x-auto space-x-4 pb-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {roadmapPhases.map((phase, index) => (
              <motion.button
                key={phase.id}
                onClick={() => setSelectedPhase(index)}
                className={`
                  flex-shrink-0 p-6 rounded-xl border transition-all duration-300 min-w-[280px]
                  ${selectedPhase === index 
                    ? 'bg-gradient-to-r ' + phase.color + ' border-white/30 text-white' 
                    : 'glass-effect border-white/10 text-white/70 hover:border-white/20'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  {phase.icon}
                  <div className="text-left">
                    <h3 className="font-bold text-lg">{phase.title}</h3>
                    <p className="text-sm opacity-80">{phase.subtitle}</p>
                  </div>
                </div>
                
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <motion.div 
                    className="bg-white rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${phase.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(phase.status)}`}>
                    {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                  </span>
                  <span className="opacity-80">{phase.progress}% Complete</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Selected Phase Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPhase}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="glass-effect rounded-2xl border border-white/20 overflow-hidden"
            >
              
              {/* Phase Header */}
              <div className={`p-8 bg-gradient-to-r ${roadmapPhases[selectedPhase].color}`}>
                <div className="flex items-center space-x-4 mb-4">
                  {roadmapPhases[selectedPhase].icon}
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {roadmapPhases[selectedPhase].title}
                    </h2>
                    <p className="text-white/80">{roadmapPhases[selectedPhase].subtitle}</p>
                  </div>
                </div>
                
                <p className="text-white/90 text-lg mb-6">
                  {roadmapPhases[selectedPhase].description}
                </p>

                {/* Filter Tabs */}
                <div className="flex space-x-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFilter(option.id)}
                      className={`
                        px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2
                        ${filter === option.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white/10 text-white/70 hover:bg-white/15'
                        }
                      `}
                    >
                      <span>{option.label}</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="p-8">
                <div className="grid gap-6">
                  {filteredMilestones().map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-gray-800/30 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusIcon(milestone.status)}
                            <h3 className="text-lg font-semibold text-white">
                              {milestone.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(milestone.priority)}`}>
                              {milestone.priority}
                            </span>
                          </div>
                          <p className="text-white/70 mb-3">{milestone.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-white/60">
                            <Calendar className="w-4 h-4" />
                            <span>{milestone.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/60">
                            <Users className="w-4 h-4" />
                            <span>{milestone.team}</span>
                          </div>
                        </div>
                        
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(milestone.status)}`}>
                          {milestone.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { 
                title: 'Total Milestones', 
                value: roadmapPhases.reduce((acc, phase) => acc + phase.milestones.length, 0),
                icon: <Target className="w-6 h-6" />,
                color: 'from-brand-purple to-brand-blue'
              },
              { 
                title: 'Completed', 
                value: roadmapPhases.reduce((acc, phase) => acc + phase.milestones.filter(m => m.status === 'completed').length, 0),
                icon: <CheckCircle className="w-6 h-6" />,
                color: 'from-green-500 to-emerald-500'
              },
              { 
                title: 'In Progress', 
                value: roadmapPhases.reduce((acc, phase) => acc + phase.milestones.filter(m => m.status === 'in-progress').length, 0),
                icon: <Clock className="w-6 h-6" />,
                color: 'from-yellow-500 to-orange-500'
              },
              { 
                title: 'Overall Progress', 
                value: Math.round(roadmapPhases.reduce((acc, phase) => acc + phase.progress, 0) / roadmapPhases.length) + '%',
                icon: <Zap className="w-6 h-6" />,
                color: 'from-brand-cyan to-brand-teal'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`glass-effect rounded-xl p-6 border border-white/20 bg-gradient-to-r ${stat.color}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}