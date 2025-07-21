'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from '@/components/attachables/main-button'
import { useLoading } from '@/components/loading-context'
import Loading from '@/components/loading'
import * as style from '@/styles/design-system'

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

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function ChallengesPage() {
  const router = useRouter()
  const { setLoading } = useLoading()
  const [selectedFilter, setSelectedFilter] =
    useState<'Main Challenges' | 'Side Challenges'>('Main Challenges')
  const [activeTrack, setActiveTrack] = useState('')
  const [challenges, setChallenges] = useState<ChallengeWithDetails[]>([])
  const [loading, setLocalLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Track active section for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id^="track-"]')
      let currentActive = ''
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionHeight = rect.height
        
        // Check if section is in viewport (considering header offset)
        if (sectionTop <= 200 && sectionTop + sectionHeight > 200) {
          const trackId = section.id.replace('track-', '').replace(/-/g, ' ')
          // Convert back to proper case
          currentActive = trackId.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
        }
      })
      
      if (currentActive && currentActive !== activeTrack) {
        setActiveTrack(currentActive)
      }
    }

    if (selectedFilter === 'Main Challenges') {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial position
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [selectedFilter, activeTrack])

  const handleBackToHome = () => {
    setLoading('back-to-home', true)
    router.push('/')
  }

  const handleChallengeClick = (ch: ChallengeWithDetails) => {
    if (ch.event?.event_id && ch.challenge_id) {
      setLoading(`challenge-${ch.challenge_id}`, true)
      
      // Determine if it's a side challenge based on current filter
      const isSideChallenge = selectedFilter === 'Side Challenges'
      
      if (isSideChallenge) {
        router.push(`/events/${ch.event.event_id}/challenges/side/${ch.challenge_id}`)
      } else {
        router.push(`/events/${ch.event.event_id}/challenges/${ch.challenge_id}`)
      }
    } else {
      console.error('Missing event_id or challenge_id for navigation')
    }
  }

  //DATA FETCHING - OPTIMIZED FOR SPEED
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLocalLoading(true)
        setError(null)

        // Start all API calls immediately in parallel
        const eventsResponse = fetch('/api/proxy/events', {
          headers: { 'Content-Type': 'application/json' }
        })

        const events = await eventsResponse
        if (!events.ok) {
          throw new Error(`Failed to fetch events: ${events.status}`)
        }

        const eventsData = await events.json()
        const eventsArray = Array.isArray(eventsData) ? eventsData : [eventsData]

        // Fetch all challenges and organizations in parallel
        const challengePromises = eventsArray.map(async (event) => {
          try {
            const challengesRes = await fetch(
              `/api/proxy/events/${event.event_id}/challenges`,
              { headers: { 'Content-Type': 'application/json' } }
            )
            if (challengesRes.ok) {
              const challengesData = await challengesRes.json()
              const challengesArray = Array.isArray(challengesData) ? challengesData : [challengesData]
              return challengesArray.map(ch => ({
                ...ch,
                event: { event_id: event.event_id, name: event.name }
              }))
            }
            return []
          } catch {
            return []
          }
        })

        // Wait for all challenge requests to complete
        const allChallengeArrays = await Promise.all(challengePromises)
        const allChallenges = allChallengeArrays.flat()

        // Get unique organization IDs
        const orgIds = [...new Set(allChallenges.map(ch => ch.organization_id).filter(Boolean))]
        
        // Fetch all organizations in parallel
        const orgPromises = orgIds.map(async (orgId) => {
          try {
            const orgRes = await fetch(
              `/api/proxy/organizations/${orgId}`,
              { headers: { 'Content-Type': 'application/json' } }
            )
            if (orgRes.ok) {
              const org = await orgRes.json()
              return { id: orgId, data: org }
            }
            return null
          } catch {
            return null
          }
        })

        const orgResults = await Promise.all(orgPromises)
        const orgsMap = new Map()
        orgResults.forEach(result => {
          if (result) {
            orgsMap.set(result.id, result.data)
          }
        })

        // Attach organization data to challenges
        const challengesWithOrgs = allChallenges.map(ch => ({
          ...ch,
          organization: ch.organization_id ? orgsMap.get(ch.organization_id) : undefined
        }))

        setChallenges(challengesWithOrgs)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch challenges')
        setChallenges([])
      } finally {
        setLocalLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  // LOADING & ERROR STATES
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <Loading message="Loading challenges..." />
        </div>
      </div>
    )
  }

  if (error)
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className={`${style.font.mono.text} text-[var(--color-alerts-opacity100)] mb-4`}>
                Error loading challenges: {error}
              </p>
              <MainButton onClick={() => window.location.reload()} variant="primary">
                Retry
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    )

  //DATA PREP
  const main = challenges.slice(0, 6)
  const side = challenges.slice(6)
  const displayed = selectedFilter === 'Main Challenges' ? main : side

  const grouped = displayed.reduce<Record<string, ChallengeWithDetails[]>>((acc, ch) => {
    const track = ch.organization?.name || 'General Track'
    acc[track] = acc[track] ? [...acc[track], ch] : [ch]
    return acc
  }, {})
  const tracks = Object.keys(grouped)

  // UI
  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder
      />

      {selectedFilter === 'Main Challenges' && tracks.length > 0 && (
        <div className="fixed right-6 top-1/4 z-10 hidden lg:block">
          <div className="space-y-2">
            {tracks.map(track => (
              <button
                key={track}
                onClick={() =>
                  document
                    .getElementById(`track-${track.replace(/\s+/g, '-').toLowerCase()}`)
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`flex items-center justify-end text-xs ${style.perf.transition.smooth} w-32 ${style.font.mono.text}`}
                style={{ 
                  color: activeTrack.toLowerCase() === track.toLowerCase() ? style.colors.light.opacity100 : style.colors.light.opacity40,
                  fontWeight: activeTrack.toLowerCase() === track.toLowerCase() ? '500' : '400'
                }}
              >
                <div className="text-right mr-2">
                  {track.split(' ').length > 1 ? (
                    <div className="leading-tight">
                      {track.split(' ').map((w, i) => (
                        <div key={i}>{w}</div>
                      ))}
                    </div>
                  ) : (
                    track
                  )}
                </div>
                <span className="text-sm w-3 text-right">{activeTrack.toLowerCase() === track.toLowerCase() ? '●' : '—'}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT*/}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-0 lg:ml-[250px] px-4 lg:px-10 pt-[100px] lg:pt-10">
        <div className="bg-[var(--color-dark-opacity100)] border-[var(--color-white-opacity10)]">
          <h1 className={`${style.font.grotesk.heavy} text-3xl lg:text-4xl text-[var(--color-light-opacity100)] mb-8`}>Challenges</h1>

          {/* FILTER TABS */}
          <div className="flex gap-2">
            {(['Main Challenges', 'Side Challenges'] as const).map(filter => {
              const active = selectedFilter === filter
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`${style.font.mono.text} text-sm ${style.border.radius.middle} px-5 py-2 border ${style.perf.transition.fast}
                    ${
                      active
                        ? 'bg-[var(--color-light-opacity100)] text-[var(--color-dark-opacity100)] border-transparent shadow'
                        : 'bg-transparent text-[var(--color-light-opacity60)] border-[var(--color-white-opacity15)] hover:bg-[var(--color-white-opacity5)]'
                    }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>

        {/* CHALLENGE LISTS */}
        <div className="flex flex-1 relative">
          <div className="flex-1 py-8">
            {challenges.length === 0 ? (
              <div className="text-center py-12">
                <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-lg`}>
                  No challenges found.
                </p>
              </div>
            ) : selectedFilter === 'Main Challenges' ? (
              <div className="space-y-8">
              {Object.entries(grouped).map(([track, list]) => (
                <div className="w-[100%] lg:w-[95%]" key={track} id={`track-${track.replace(/\s+/g, '-').toLowerCase()}`}>
                  <h2 className={`${style.font.grotesk.medium} text-[var(--color-primary-opacity100)] text-xl md:text-2xl mb-4`}>{track}</h2>
                  <div className="space-y-3 m-0 lg:mr-16">
                    {list.map(ch => (
                      <div
                        key={ch.challenge_id}
                        className={`${style.border.radius.outer} overflow-hidden cursor-pointer bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] hover:bg-[var(--color-white-opacity10)] ${style.perf.transition.smooth}`}
                        onClick={() => handleChallengeClick(ch)}
                      >
                        <div className="p-4 md:p-6">
                          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                            <div className={`w-40 h-40 md:w-40 md:h-40 ${style.border.radius.outer} flex items-center justify-center text-[var(--color-light-opacity100)] text-lg md:text-3xl font-bold flex-shrink-0 bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)]`}>
                              CO
                            </div>
                            <div className="flex-1 min-w-0 py-1 text-left">
                              <div className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity60)] mb-2`}>
                                {ch.organization?.name || 'General'}
                              </div>
                              <h3 className={`${style.font.grotesk.main} text-lg md:text-2xl text-[var(--color-light-opacity100)] mb-3 leading-tight`}>
                                {ch.name}
                              </h3>
                              <div className="flex flex-wrap items-center justify-start gap-2 md:gap-3 mb-4">
                                <span className={`${style.font.mono.text} px-2 py-1 ${style.border.radius.inner} text-xs bg-[var(--color-dark-opacity50)] text-[var(--color-light-opacity80)]`}>
                                  AI
                                </span>
                                <span className={`${style.font.mono.text} px-2 py-1 ${style.border.radius.inner} text-xs bg-[var(--color-dark-opacity50)] text-[var(--color-light-opacity80)]`}>
                                  Machine Learning
                                </span>
                                <span className={`${style.font.mono.text} px-2 py-1 ${style.border.radius.inner} text-xs bg-[var(--color-dark-opacity50)] text-[var(--color-light-opacity80)]`}>
                                  Data Science
                                </span>
                              </div>
                              <div className="w-full h-px bg-[var(--color-white-opacity10)] mb-4" />
                              <div className="pb-1 space-y-1">
                                <div className="flex items-center justify-start gap-2 md:gap-6 pb-1">
                                  <span className={`${style.font.mono.text} text-xs font-medium text-[var(--color-light-opacity100)]`}>
                                    Prizes
                                  </span>
                                  <span className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity60)]`}>TBD</span>
                                </div>
                                <div className="flex items-center justify-start gap-2 md:gap-6 pb-1">
                                  <span className={`${style.font.mono.text} text-xs font-medium text-[var(--color-light-opacity100)]`}>Event</span>
                                  <span className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity60)]`}>
                                    {ch.event?.name || 'Unknown Event'}
                                  </span>
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
              <div className="grid grid-cols-2 gap-6">
                {displayed.map(ch => (
                  <div
                    key={ch.challenge_id}
                    className={`${style.border.radius.outer} overflow-hidden cursor-pointer bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity10)] hover:bg-[var(--color-white-opacity20)] ${style.perf.transition.smooth}`}
                    onClick={() => handleChallengeClick(ch)}
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-40 h-40 ${style.border.radius.inner} flex items-center justify-center text-[var(--color-light-opacity100)] text-3xl font-bold flex-shrink-0 bg-transparent border border-[var(--color-white-opacity10)]`}>
                          CO
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity60)] mb-1`}>
                            {ch.organization?.name || 'General'}
                          </div>
                          <h3 className={`${style.font.grotesk.medium} text-xl text-[var(--color-primary-opacity100)] leading-tight mb-3`}>
                            {ch.name}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`${style.font.mono.text} px-2 py-1 ${style.border.radius.inner} text-xs bg-[var(--color-dark-opacity50)] text-[var(--color-light-opacity80)]`}>
                              AI
                            </span>
                            <span className={`${style.font.mono.text} px-2 py-1 ${style.border.radius.inner} text-xs bg-[var(--color-dark-opacity50)] text-[var(--color-light-opacity80)]`}>
                              Machine Learning
                            </span>
                            <span className={`${style.font.mono.text} px-2 py-1 ${style.border.radius.inner} text-xs bg-[var(--color-dark-opacity50)] text-[var(--color-light-opacity80)]`}>
                              Data Science
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1" />
                      <div className="pt-4 border-t border-[var(--color-white-opacity10)] space-y-2">
                        <div className="flex items-center gap-6 pb-1">
                          <span className={`${style.font.mono.text} text-xs font-medium text-[var(--color-light-opacity100)]`}>Prizes</span>
                          <span className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity60)]`}>TBD</span>
                        </div>
                        <div className="flex items-center gap-6 pb-1">
                          <span className={`${style.font.mono.text} text-xs font-medium text-[var(--color-light-opacity100)]`}>Event</span>
                          <span className={`${style.font.mono.text} text-xs text-[var(--color-light-opacity60)]`}>
                            {ch.event?.name || 'Unknown Event'}
                          </span>
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