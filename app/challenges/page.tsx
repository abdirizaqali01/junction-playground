'use client'

import { useState, useEffect } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

interface Challenge {
  id: number
  name: string
  description: string
  category: string
  type: string
  prizes: string[]
  sponsor: string
}

export default function ChallengesPage() {
  const [selectedFilter, setSelectedFilter] = useState('Main Challenges')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTrack, setActiveTrack] = useState('Artificial Intelligence')
  
  const challenges: Challenge[] = [
    {
      id: 1,
      name: 'Utilizing Generative Artificial Intelligence In A Sustainable Manner To Collect And Summarize Real Time Insights To Help Drive Business Decisions.',
      description: 'Create innovative applications using AI voice technology',
      category: 'Artificial Intelligence (Track)',
      type: 'CO',
      prizes: ['1st Place: 1000€', '2nd Place: 500€', '3rd Place: 250€'],
      sponsor: 'OpenAI'
    },
    {
      id: 2,
      name: 'Best Use Of AI Voice Agents',
      description: 'Build something that captures attention and spreads',
      category: 'Artificial Intelligence (Track)',
      type: 'AI',
      prizes: ['1st Place: 1000€', '2nd Place: 500€', '3rd Place: 250€'],
      sponsor: 'Meta'
    },
    {
      id: 3,
      name: 'Most Viral Project',
      description: 'Create innovative applications using AI voice technology',
      category: 'Biotech (Track)',
      type: 'CO',
      prizes: ['MacBook Pro 3', 'iPad Pro', 'AirPods Pro'],
      sponsor: 'Apple'
    },
    {
      id: 4,
      name: 'Smart Healthcare Solutions',
      description: 'Build something that captures attention and spreads',
      category: 'Biotech (Track)',
      type: 'AI',
      prizes: ['1st Place: 1000€', '2nd Place: 500€', '3rd Place: 250€'],
      sponsor: 'Google'
    },
    {
      id: 5,
      name: 'Cybersecurity Innovation Challenge',
      description: 'Create innovative applications using AI voice technology',
      category: 'Cybersecurity (Track)',
      type: 'CO',
      prizes: ['MacBook Pro 3', 'iPad Pro', 'AirPods Pro'],
      sponsor: 'Microsoft'
    },
    {
      id: 6,
      name: 'Data Privacy Protection',
      description: 'Build something that captures attention and spreads',
      category: 'Cybersecurity (Track)',
      type: 'AI',
      prizes: ['1st Place: 1000€', '2nd Place: 500€', '3rd Place: 250€'],
      sponsor: 'Amazon'
    }
  ]

  const mainChallenges = challenges.filter((_, index) => index < 6)
  const sideChallenges = [
    {
      id: 7,
      name: 'Best Use Of AI Voice Agents',
      description: 'Create innovative applications using AI voice technology',
      category: 'Artificial Intelligence (Track)',
      type: 'CO',
      prizes: ['MacBook Pro 3'],
      sponsor: 'OpenAI'
    },
    {
      id: 8,
      name: 'Most Viral Project',
      description: 'Build something that captures attention and spreads',
      category: 'Artificial Intelligence (Track)',
      type: 'CO',
      prizes: ['1st Place: 1000€', '2nd Place: 500€', '3rd Place: 250€'],
      sponsor: 'Meta'
    },
    {
      id: 9,
      name: 'Best Use Of AI Voice Agents',
      description: 'Create innovative applications using AI voice technology',
      category: 'Artificial Intelligence (Track)',
      type: 'CO',
      prizes: ['MacBook Pro 3'],
      sponsor: 'Apple'
    },
    {
      id: 10,
      name: 'Most Viral Project',
      description: 'Build something that captures attention and spreads',
      category: 'Artificial Intelligence (Track)',
      type: 'CO',
      prizes: ['1st Place: 1000€', '2nd Place: 500€', '3rd Place: 250€'],
      sponsor: 'Google'
    },
    {
      id: 11,
      name: 'Best Use Of AI Voice Agents',
      description: 'Create innovative applications using AI voice technology',
      category: 'Artificial Intelligence (Track)',
      type: 'CO',
      prizes: ['MacBook Pro 3'],
      sponsor: 'Microsoft'
    },
    {
      id: 12,
      name: 'Most Viral Project',
      description: 'Build something that captures attention and spreads',
      category: 'Artificial Intelligence (Track)',
      type: 'CO',
      prizes: ['1st Place: 1000€', '2nd Place: 500€', '3rd Place: 250€'],
      sponsor: 'Amazon'
    }
  ]
  
  const displayedChallenges = selectedFilter === 'Main Challenges' ? mainChallenges : sideChallenges

  // Group challenges by track for main challenges
  const groupedChallenges = displayedChallenges.reduce((acc, challenge) => {
    const track = challenge.category.replace(' (Track)', '')
    if (!acc[track]) {
      acc[track] = []
    }
    acc[track].push(challenge)
    return acc
  }, {} as Record<string, Challenge[]>)

  const tracks = Object.keys(groupedChallenges)

  // Scroll tracking for animated sidebar
  useEffect(() => {
    if (selectedFilter !== 'Main Challenges') return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const sections = tracks.map(track => {
        const element = document.getElementById(`track-${track.replace(/\s+/g, '-').toLowerCase()}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          return {
            track,
            top: rect.top + scrollY,
            bottom: rect.bottom + scrollY
          }
        }
        return null
      }).filter(Boolean)

      const currentSection = sections.find(section => 
        section && scrollY >= section.top - 200 && scrollY < section.bottom - 200
      )

      if (currentSection) {
        setActiveTrack(currentSection.track)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [tracks, selectedFilter])

  const sidebarItems = [
    { name: 'Dashboard', icon: 'dashboard', active: false },
    { name: 'Challenges', icon: 'challenges', active: true },
    { name: 'Team', icon: 'team', active: false },
    { name: 'Hackerpack', icon: 'hackerpack', active: false },
    { name: 'Project Submission', icon: 'project', active: false },
    { name: 'Mentor Meetings', icon: 'mentor', active: false },
    { name: 'Review Projects', icon: 'review', active: false },
    { name: 'Finalist Voting', icon: 'voting', active: false }
  ]

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-11' : 'w-50'} bg-white/5 border-r border-white/10 flex flex-col transition-all duration-300 fixed h-screen`}>
        {/* Back to Home Button */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {!sidebarCollapsed && (
            <button className="flex items-center text-white/60 hover:text-white text-sm">
              <span className="mr-2">←</span>
              Back To Home
            </button>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 text-white/60 hover:text-white ml-auto"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
            </svg>
          </button>
        </div>

        {/* Image Placeholder */}
        {!sidebarCollapsed && (
          <div className="p-4">
            <div className="w-full h-32 bg-white/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2"></div>
                <div className="w-16 h-8 bg-white/20 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto">
          <div className="mb-6">
            {!sidebarCollapsed && (
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3 font-medium">General</div>
            )}
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded mb-1" title="Dashboard">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
              </svg>
              {!sidebarCollapsed && "Dashboard"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white bg-white/10 rounded mb-1" title="Challenges">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
              </svg>
              {!sidebarCollapsed && "Challenges"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded mb-1" title="Team">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
              </svg>
              {!sidebarCollapsed && "Team"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded mb-1" title="Hackerpack">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
              </svg>
              {!sidebarCollapsed && "Hackerpack"}
            </a>
          </div>

          <div className="mb-6">
            {!sidebarCollapsed && (
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3 font-medium">During Hackathon</div>
            )}
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded mb-1" title="Project Submission">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              </svg>
              {!sidebarCollapsed && "Project Submission"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded mb-1" title="Mentor Meetings">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
              </svg>
              {!sidebarCollapsed && "Mentor Meetings"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded mb-1" title="Review Projects">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
              </svg>
              {!sidebarCollapsed && "Review Projects"}
            </a>
            
            <a href="#" className="flex items-center px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded mb-1" title="Finalist Voting">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
              {!sidebarCollapsed && "Finalist Voting"}
            </a>
          </div>
        </nav>

        {/* User Profile at Bottom */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              JU
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3 min-w-0">
                <div className="text-sm font-medium text-white truncate">Junction Hack</div>
                <div className="text-xs text-white/60 truncate">ju@hackjunction.com</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right-side Track Sidebar - Only show for Main Challenges */}
      {selectedFilter === 'Main Challenges' && (
        <div className="fixed right-6 top-1/4 z-10">
          <div className="space-y-2">
            {tracks.map((track) => (
              <button
                key={track}
                onClick={() => {
                  const element = document.getElementById(`track-${track.replace(/\s+/g, '-').toLowerCase()}`)
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`flex items-center justify-end text-xs transition-all duration-200 w-32 ${
                  activeTrack === track
                    ? 'text-white font-medium'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <div className="text-right mr-2">
                  {track.split(' ').length > 1 ? (
                    <div className="leading-tight">
                      {track.split(' ').map((word, index) => (
                        <div key={index}>{word}</div>
                      ))}
                    </div>
                  ) : (
                    track
                  )}
                </div>
                <span className={`text-sm w-3 text-right ${
                  activeTrack === track ? '●' : '—'
                }`}>
                  {activeTrack === track ? '●' : '—'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-auto flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-11' : 'ml-44'}`}>
        {/* Header */}
        <div className="bg-black border-b border-white/10 px-8 py-8">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-8">Challenges</h1>
            
            {/* Toggle Buttons */}
            <div className="flex space-x-1">
              <button
                onClick={() => setSelectedFilter('Main Challenges')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedFilter === 'Main Challenges'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                }`}
              >
                Main Challenges
              </button>
              <button
                onClick={() => setSelectedFilter('Side Challenges')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedFilter === 'Side Challenges'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                }`}
              >
                Side Challenges
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 relative">
          {/* Challenges Content */}
          <div className="flex-1 p-8">
            {selectedFilter === 'Main Challenges' ? (
              // Main Challenges - Grouped by track
              <div className="space-y-8">
                {Object.entries(groupedChallenges).map(([track, trackChallenges]) => (
                  <div key={track} id={`track-${track.replace(/\s+/g, '-').toLowerCase()}`}>
                    {/* Track Header */}
                    <h2 className="text-green-400 text-lg font-medium mb-4">{track}</h2>
                    
                    {/* Track Challenges */}
                    <div className="space-y-3 mr-16">
                      {trackChallenges.map((challenge) => (
                        <div key={challenge.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden w-[95%]">
                          <div className="p-6">
                            <div className="flex items-start gap-6">
                              {/* Challenge Type Badge */}
                              <div className="w-40 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 self-stretch">
                                {challenge.type}
                              </div>
                              
                              {/* Challenge Content */}
                              <div className="flex-1 min-w-0 py-1">
                                <div className="text-xs text-white/60 mb-2 font-mono">{challenge.category}</div>
                                <h3 className="text-2xl font-semibold text-white mb-3 leading-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>{challenge.name}</h3>
                                
                                {/* Tags */}
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 font-mono">AI</span>
                                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 font-mono">Machine Learning</span>
                                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 font-mono">Data Science</span>
                                </div>
                                
                                {/* Divider */}
                                <div className="w-full h-px bg-white/10 mb-4"></div>
                                
                                {/* Prizes Section */}
                                <div className="pb-1">
                                  <div className="text-xs font-medium text-white mb-2 font-mono">Prizes</div>
                                  <div className="flex items-center gap-4 text-xs text-white/60 font-mono">
                                    <span>1st Place: 1000€</span>
                                    <span>2nd Place: 500€</span>
                                    <span>3rd Place: 200€</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Side Challenges - Grid layout matching the design
              <div className="grid grid-cols-2 gap-4">
                {displayedChallenges.map((challenge) => (
                  <div key={challenge.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    {/* Challenge Header */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center w-full">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-3">
                            {challenge.type}
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-green-400 mb-1">{challenge.category}</div>
                            <h3 className="text-sm font-semibold text-green-400">{challenge.name}</h3>
                            <div className="flex items-center space-x-3 text-xs text-white/60 mt-1">
                              <span>A1</span>
                              <span>Machine Learning</span>
                              <span>Best Bounty</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Challenge Footer */}
                    <div className="p-4 bg-white/5 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/60">
                          <span className="font-medium">Prizes</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {challenge.prizes.map((prize, index) => (
                              <span key={index} className="text-xs">{prize}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}