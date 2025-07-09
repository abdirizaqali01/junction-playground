'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from '@/components/attachables/main-button'
import * as style from '@/styles/design-system'
import { initializeCSSVariables } from '@/styles/design-system'

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
  const [selectedFilter, setSelectedFilter] =
    useState<'Main Challenges' | 'Side Challenges'>('Main Challenges')
  const [activeTrack, setActiveTrack] = useState('Artificial Intelligence')
  const [challenges, setChallenges] = useState<ChallengeWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // DESIGN-SYSTEM ACTUATOR
  useEffect(() => initializeCSSVariables(), [])

  const handleBackToHome = () => router.push('/')

  const handleChallengeClick = (ch: ChallengeWithDetails) => {
    if (ch.event?.event_id && ch.challenge_id) {
      router.push(`/events/${ch.event.event_id}/challenges/${ch.challenge_id}`)
    } else {
      console.error('Missing event_id or challenge_id for navigation')
    }
  }

  // DATA FETCHING
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true)
        setError(null)

        const eventsResponse = await fetch('/api/proxy/events', {
          headers: { 'Content-Type': 'application/json' }
        })
        if (!eventsResponse.ok)
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`)

        const events = await eventsResponse.json()
        const eventsArray = Array.isArray(events) ? events : [events]

        const all: ChallengeWithDetails[] = []

        for (const event of eventsArray) {
          try {
            const res = await fetch(
              `/api/proxy/events/${event.event_id}/challenges`,
              { headers: { 'Content-Type': 'application/json' } }
            )
            if (res.ok) {
              const data = await res.json()
              const arr = Array.isArray(data) ? data : [data]
              all.push(
                ...arr.map(ch => ({
                  ...ch,
                  event: { event_id: event.event_id, name: event.name }
                }))
              )
            }
          } catch {
            console.log(`No challenges for event ${event.event_id}`)
          }
        }

        const withOrgs = await Promise.all(
          all.map(async ch => {
            if (ch.organization_id) {
              try {
                const orgRes = await fetch(
                  `/api/proxy/organizations/${ch.organization_id}`,
                  { headers: { 'Content-Type': 'application/json' } }
                )
                if (orgRes.ok) {
                  const org = await orgRes.json()
                  return { ...ch, organization: org }
                }
              } catch {
                console.warn(`Failed to fetch org ${ch.organization_id}`)
              }
            }
            return ch
          })
        )

        setChallenges(withOrgs)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : 'Failed to fetch challenges')
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  // Loading & error states
  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4" />
              <p className={`${style.font.mono.text} text-white/60`}>Loading challenges...</p>
            </div>
          </div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className={`${style.font.mono.text} text-red-500 mb-4`}>
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

  // data prep
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
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder
      />
      {selectedFilter === 'Main Challenges' && tracks.length > 0 && (
        <div className="fixed right-6 top-1/4 z-10">
          <div className="space-y-2">
            {tracks.map(track => (
              <button
                key={track}
                onClick={() =>
                  document
                    .getElementById(`track-${track.replace(/\s+/g, '-').toLowerCase()}`)
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`flex items-center justify-end text-xs transition-all duration-200 w-32 ${style.font.mono.text} ${
                  activeTrack === track ? 'text-white font-medium' : 'text-white/40 hover:text-white/60'
                }`}
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
                <span className="text-sm w-3 text-right">{activeTrack === track ? '●' : '—'}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
        <div className="bg-black border-b border-white/10 px-8 py-8">
          <h1 className={`${style.font.grotesk.heavy} text-3xl text-white mb-8`}>Challenges</h1>

          {/* FILTER TABS*/}
          <div className="flex gap-2">
            {(['Main Challenges', 'Side Challenges'] as const).map(filter => {
              const active = selectedFilter === filter
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`${style.font.mono.text} text-sm rounded-lg px-5 py-2 border transition-all duration-150
                    ${
                      active
                        ? 'bg-white text-black border-transparent shadow'
                        : 'bg-transparent text-white/60 border-white/15 hover:bg-white/5'
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
          <div className="flex-1 p-8">
            {challenges.length === 0 ? (
              <div className="text-center py-12">
                <p className={`${style.font.mono.text} text-white/60 text-lg`}>
                  No challenges found.
                </p>
              </div>
            ) : selectedFilter === 'Main Challenges' ? (
              <div className="space-y-8">
                {Object.entries(grouped).map(([track, list]) => (
                  <div key={track} id={`track-${track.replace(/\s+/g, '-').toLowerCase()}`}>
                    <h2 className={`${style.font.grotesk.medium} text-green-400 text-lg mb-4`}>{track}</h2>
                    <div className="space-y-3 mr-16">
                      {list.map(ch => (
                        <div
                          key={ch.challenge_id}
                          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden w-[95%] cursor-pointer hover:bg-white/10 transition-colors duration-200"
                          onClick={() => handleChallengeClick(ch)}
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-6">
                              <div className="w-40 h-40 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                                CO
                              </div>
                              <div className="flex-1 min-w-0 py-1">
                                <div className={`${style.font.mono.text} text-xs text-white/60 mb-2`}>
                                  {ch.organization?.name || 'General'}
                                </div>
                                <h3 className={`${style.font.grotesk.main} text-2xl text-white mb-3 leading-tight`}>
                                  {ch.name}
                                </h3>
                                <div className="flex items-center gap-3 mb-4">
                                  <span className={`${style.font.mono.text} px-2 py-1 bg-black/50 rounded text-xs text-white/80`}>
                                    AI
                                  </span>
                                  <span className={`${style.font.mono.text} px-2 py-1 bg-black/50 rounded text-xs text-white/80`}>
                                    Machine Learning
                                  </span>
                                  <span className={`${style.font.mono.text} px-2 py-1 bg-black/50 rounded text-xs text-white/80`}>
                                    Data Science
                                  </span>
                                </div>
                                <div className="w-full h-px bg-white/10 mb-4" />
                                <div className="pb-1">
                                  <div className="flex items-center gap-6 pb-1">
                                    <span className={`${style.font.mono.text} text-xs font-medium text-white`}>
                                      Prizes
                                    </span>
                                    <span className={`${style.font.mono.text} text-xs text-white/60`}>TBD</span>
                                  </div>
                                  <div className="flex items-center gap-6 pb-1">
                                    <span className={`${style.font.mono.text} text-xs font-medium text-white`}>Event</span>
                                    <span className={`${style.font.mono.text} text-xs text-white/60`}>
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
                    className="bg-white/10 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:bg-white/20 transition-colors duration-200"
                    onClick={() => handleChallengeClick(ch)}
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-40 h-40 bg-transparent border border-white/10 rounded flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                          CO
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`${style.font.mono.text} text-xs text-white/60 mb-1`}>
                            {ch.organization?.name || 'General'}
                          </div>
                          <h3 className={`${style.font.grotesk.medium} text-xl text-green-400 leading-tight mb-3`}>
                            {ch.name}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`${style.font.mono.text} px-2 py-1 bg-black/50 rounded text-xs text-white/80`}>
                              AI
                            </span>
                            <span className={`${style.font.mono.text} px-2 py-1 bg-black/50 rounded text-xs text-white/80`}>
                              Machine Learning
                            </span>
                            <span className={`${style.font.mono.text} px-2 py-1 bg-black/50 rounded text-xs text-white/80`}>
                              Data Science
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1" />
                      <div className="pt-4 border-t border-white/10 space-y-2">
                        <div className="flex items-center gap-6 pb-1">
                          <span className={`${style.font.mono.text} text-xs font-medium text-white`}>Prizes</span>
                          <span className={`${style.font.mono.text} text-xs text-white/60`}>TBD</span>
                        </div>
                        <div className="flex items-center gap-6 pb-1">
                          <span className={`${style.font.mono.text} text-xs font-medium text-white`}>Event</span>
                          <span className={`${style.font.mono.text} text-xs text-white/60`}>
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
