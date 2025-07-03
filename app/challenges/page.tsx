'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'

interface Challenge {
  challenge_id: number
  event_id: number
  organization_id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

interface ChallengeWithDetails extends Challenge {
  organization?: {
    organization_id: number
    name: string
    slug: string
  }
  event?: {
    event_id: number
    name: string
  }
}

// Define your navigation data
const navigationSections = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
          </svg>
        )
      },
      {
        id: 'challenges',
        label: 'Challenges',
        href: '#',
        isActive: true,
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
          </svg>
        )
      },
      {
        id: 'team',
        label: 'Team',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 h4.216z"/>
          </svg>
        )
      },
      {
        id: 'hackerpack',
        label: 'Hackerpack',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
          </svg>
        )
      }
    ]
  },
  {
    id: 'hackathon',
    title: 'During Hackathon',
    items: [
      {
        id: 'project-submission',
        label: 'Project Submission',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>
        )
      },
      {
        id: 'mentor-meetings',
        label: 'Mentor Meetings',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
          </svg>
        )
      },
      {
        id: 'review-projects',
        label: 'Review Projects',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
          </svg>
        )
      },
      {
        id: 'finalist-voting',
        label: 'Finalist Voting',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
        )
      }
    ]
  }
]

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function ChallengesPage() {
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState('Main Challenges')
  const [activeTrack, setActiveTrack] = useState('Artificial Intelligence')
  const [challenges, setChallenges] = useState<ChallengeWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const handleBackToHome = () => {
    router.push('/')
  }

  const handleChallengeClick = (challengeId: number) => {
    router.push(`/challenges/${challengeId}`)
  }

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true)
        setError(null)

        // First, get all events to then fetch their challenges
        const eventsResponse = await fetch('/api/proxy/events', {
          headers: { 'Content-Type': 'application/json' }
        })

        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`)
        }

        const events = await eventsResponse.json()
        const eventsArray = Array.isArray(events) ? events : [events]

        // Fetch challenges for each event
        const allChallenges: ChallengeWithDetails[] = []
        
        for (const event of eventsArray) {
          try {
            const challengesResponse = await fetch(`/api/proxy/events/${event.event_id}/challenges`, {
              headers: { 'Content-Type': 'application/json' }
            })
            
            if (challengesResponse.ok) {
              const challengesData = await challengesResponse.json()
              const challengesArray = Array.isArray(challengesData) ? challengesData : [challengesData]
              
              // Enhance each challenge with event data
              const enhancedChallenges = challengesArray.map(challenge => ({
                ...challenge,
                event: {
                  event_id: event.event_id,
                  name: event.name
                }
              }))
              
              allChallenges.push(...enhancedChallenges)
            }
          } catch (err) {
            console.log(`No challenges found for event ${event.event_id}`)
          }
        }

        // Fetch organization data for each challenge
        const challengesWithOrgs = await Promise.all(
          allChallenges.map(async (challenge) => {
            if (challenge.organization_id) {
              try {
                const orgResponse = await fetch(`/api/proxy/organizations/${challenge.organization_id}`, {
                  headers: { 'Content-Type': 'application/json' }
                })
                if (orgResponse.ok) {
                  const organization = await orgResponse.json()
                  return { ...challenge, organization }
                }
              } catch (err) {
                console.warn(`Failed to fetch org ${challenge.organization_id}:`, err)
              }
            }
            return challenge
          })
        )

        setChallenges(challengesWithOrgs)

      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch challenges')
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar
          navigationSections={navigationSections}
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading challenges...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar
          navigationSections={navigationSections}
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error loading challenges: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-emerald-500 text-black rounded hover:bg-emerald-400 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Filter challenges based on selected filter
  const mainChallenges = challenges.slice(0, 6) // First 6 as main challenges
  const sideChallenges = challenges.slice(6) // Rest as side challenges
  
  const displayedChallenges = selectedFilter === 'Main Challenges' ? mainChallenges : sideChallenges

  // Group challenges by track for main challenges (using organization name as track)
  const groupedChallenges = displayedChallenges.reduce((acc, challenge) => {
    const track = challenge.organization?.name || 'General Track'
    if (!acc[track]) {
      acc[track] = []
    }
    acc[track].push(challenge)
    return acc
  }, {} as Record<string, ChallengeWithDetails[]>)

  const tracks = Object.keys(groupedChallenges)

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        navigationSections={navigationSections}
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Right-side Track Sidebar - Only show for Main Challenges */}
      {selectedFilter === 'Main Challenges' && tracks.length > 0 && (
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
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
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
            {challenges.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No challenges found.</p>
              </div>
            ) : selectedFilter === 'Main Challenges' ? (
              // Main Challenges - Grouped by track
              <div className="space-y-8">
                {Object.entries(groupedChallenges).map(([track, trackChallenges]) => (
                  <div key={track} id={`track-${track.replace(/\s+/g, '-').toLowerCase()}`}>
                    {/* Track Header */}
                    <h2 className="text-green-400 text-lg font-medium mb-4">{track}</h2>
                    
                    {/* Track Challenges */}
                    <div className="space-y-3 mr-16">
                      {trackChallenges.map((challenge) => (
                        <div 
                          key={challenge.challenge_id} 
                          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden w-[95%] cursor-pointer hover:bg-white/10 transition-colors duration-200"
                          onClick={() => handleChallengeClick(challenge.challenge_id)}
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-6">
                              {/* Challenge Type Badge */}
                              <div className="w-40 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 self-stretch">
                                CO
                              </div>
                              
                              {/* Challenge Content */}
                              <div className="flex-1 min-w-0 py-1">
                                <div className="text-xs text-white/60 mb-2 font-mono">{challenge.organization?.name || 'General'}</div>
                                <h3 className="text-2xl font-semibold text-white mb-3 leading-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                                  {challenge.name}
                                </h3>
                                
                                {/* Tags */}
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 font-mono">AI</span>
                                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 font-mono">Machine Learning</span>
                                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 font-mono">Data Science</span>
                                </div>
                                
                                {/* Divider */}
                                <div className="w-full h-px bg-white/10 mb-4"></div>
                                
                                {/* Event Info */}
                                <div className="pb-1">
                                  <div className="text-xs font-medium text-white mb-2 font-mono">Event</div>
                                  <div className="flex items-center gap-4 text-xs text-white/60 font-mono">
                                    <span>{challenge.event?.name || 'Unknown Event'}</span>
                                    <span>Created: {new Date(challenge.created_at).toLocaleDateString()}</span>
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
              // Side Challenges - Grid layout
              <div className="grid grid-cols-2 gap-4">
                {displayedChallenges.map((challenge) => (
                  <div 
                    key={challenge.challenge_id} 
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:bg-white/10 transition-colors duration-200"
                    onClick={() => handleChallengeClick(challenge.challenge_id)}
                  >
                    {/* Challenge Header */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center w-full">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-3">
                            CO
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-green-400 mb-1">{challenge.organization?.name || 'General'}</div>
                            <h3 className="text-sm font-semibold text-green-400">{challenge.name}</h3>
                            <div className="flex items-center space-x-3 text-xs text-white/60 mt-1">
                              <span>AI</span>
                              <span>Machine Learning</span>
                              <span>Best Challenge</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Challenge Footer */}
                    <div className="p-4 bg-white/5 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/60">
                          <span className="font-medium">Event</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="text-xs">{challenge.event?.name || 'Unknown Event'}</span>
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
      </div>
    </div>
  )
}