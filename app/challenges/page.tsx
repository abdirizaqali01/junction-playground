'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from '@/components/footer'

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
  const [selectedFilter, setSelectedFilter] = useState('Main Challenges')
  const [activeTrack, setActiveTrack] = useState('Artificial Intelligence')
  const [challenges, setChallenges] = useState<ChallengeWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleChallengeClick = (challenge: ChallengeWithDetails) => {
    if (challenge.event?.event_id && challenge.challenge_id) {
      router.push(`/events/${challenge.event.event_id}/challenges/${challenge.challenge_id}`)
    }
  }

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true)
        setError(null)

        const eventsResponse = await fetch('/api/proxy/events', {
          headers: { 'Content-Type': 'application/json' }
        })
        if (!eventsResponse.ok) throw new Error(`Failed to fetch events: ${eventsResponse.status}`)

        const events = await eventsResponse.json()
        const eventsArray = Array.isArray(events) ? events : [events]

        const allChallenges: ChallengeWithDetails[] = []

        for (const event of eventsArray) {
          try {
            const challengesResponse = await fetch(
              `/api/proxy/events/${event.event_id}/challenges`,
              { headers: { 'Content-Type': 'application/json' } }
            )
            if (challengesResponse.ok) {
              const challengesData = await challengesResponse.json()
              const challengesArray = Array.isArray(challengesData)
                ? challengesData
                : [challengesData]
              const enhanced = challengesArray.map(c => ({
                ...c,
                event: { event_id: event.event_id, name: event.name }
              }))
              allChallenges.push(...enhanced)
            }
          } catch {
          }
        }

        const withOrgs = await Promise.all(
          allChallenges.map(async c => {
            if (c.organization_id) {
              try {
                const orgRes = await fetch(`/api/proxy/organizations/${c.organization_id}`, {
                  headers: { 'Content-Type': 'application/json' }
                })
                if (orgRes.ok) return { ...c, organization: await orgRes.json() }
              } catch {
                /* ignore */
              }
            }
            return c
          })
        )

        setChallenges(withOrgs)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch challenges')
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder
        />
        <div className="flex-1 overflow-auto flex flex-col ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading challenges...</p>
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
        <div className="flex-1 overflow-auto flex flex-col ml-[250px]">
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

  const mainChallenges = challenges.slice(0, 6)
  const sideChallenges = challenges.slice(6)
  const displayed = selectedFilter === 'Main Challenges' ? mainChallenges : sideChallenges

  const grouped = displayed.reduce((acc, ch) => {
    const t = ch.organization?.name || 'General Track'
    ;(acc[t] ||= []).push(ch)
    return acc
  }, {} as Record<string, ChallengeWithDetails[]>)

  const tracks = Object.keys(grouped)

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
            {tracks.map(t => (
              <button
                key={t}
                onClick={() =>
                  document
                    .getElementById(`track-${t.replace(/\s+/g, '-').toLowerCase()}`)
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`flex items-center justify-end text-xs w-32 ${
                  activeTrack === t
                    ? 'text-white font-medium'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <div className="text-right mr-2 leading-tight">
                  {t.split(' ').map((w, i) => (
                    <div key={i}>{w}</div>
                  ))}
                </div>
                <span className="text-sm w-3 text-right">{activeTrack === t ? '●' : '—'}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto flex flex-col ml-[250px]">
        <div className="bg-black border-b border-white/10 px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Challenges</h1>
          <div className="flex space-x-1">
            <button
              onClick={() => setSelectedFilter('Main Challenges')}
              className={`px-4 py-2 rounded text-xs font-medium transition-colors ${
                selectedFilter === 'Main Challenges'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
              }`}
            >
              Main Challenges
            </button>
            <button
              onClick={() => setSelectedFilter('Side Challenges')}
               className={`px-4 py-2 rounded text-xs font-medium transition-colors  ${
                selectedFilter === 'Side Challenges'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
              }`}
            >
              Side Challenges
            </button>
          </div>
        </div>

        <div className="flex flex-1 relative">
          <div className="flex-1 p-8">
            {challenges.length === 0 ? (
              <p className="text-center text-gray-400 py-12">No challenges found.</p>
            ) : selectedFilter === 'Main Challenges' ? (
              <div className="space-y-8">
                {Object.entries(grouped).map(([t, arr]) => (
                  <div key={t} id={`track-${t.replace(/\s+/g, '-').toLowerCase()}`}>
                    <h2 className="text-green-400 text-lg font-medium mb-4">{t}</h2>
                    <div className="space-y-3 mr-16">
                      {arr.map(ch => (
                        <div
                          key={ch.challenge_id}
                          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden w-[95%] cursor-pointer hover:bg-white/10 transition-colors duration-200"
                          onClick={() => handleChallengeClick(ch)}
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-6">
                              <div className="w-40 h-40 bg-white/5 border border-white/10 rounded flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 self-stretch">
                                CO
                              </div>
                              <div className="flex-1 min-w-0 py-1">
                                <div className="text-xs text-white/60 mb-2 font-mono">
                                  {ch.organization?.name || 'General'}
                                </div>
                                <h3
                                  className="text-2xl font-semibold text-white mb-3 leading-tight"
                                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                  {ch.name}
                                </h3>
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="px-2 py-1 bg-black/50 rounded text-xs text-white/80 font-mono">
                                    AI
                                  </span>
                                  <span className="px-2 py-1 bg-black/50  rounded text-xs text-white/80 font-mono">
                                    Machine Learning
                                  </span>
                                  <span className="px-2 py-1 bg-black/50 rounded text-xs text-white/80 font-mono">
                                    Data Science
                                  </span>
                                </div>
                                <div className="w-full h-px bg-white/10 mb-4"></div>
                                <div className="pb-1">
                                  <div className="flex items-center gap-6 pb-1">
                                    <span className="text-xs font-medium text-white font-mono">
                                      Prizes
                                    </span>
                                    <span className="text-xs text-white/60 font-mono">TBD</span>
                                  </div>
                                  <div className="flex items-center gap-6 pb-1">
                                    <span className="text-xs font-medium text-white font-mono">
                                      Event
                                    </span>
                                    <span className="text-xs text-white/60 font-mono">
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
              //SIDE CHALLENGES 
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
                          <div className="text-xs text-white/60 mb-1 font-mono">
                            {ch.organization?.name || 'General'}
                          </div>
                          <h3
                            className="text-xl font-semibold text-green-400 leading-tight mb-3"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                          >
                            {ch.name}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-1 bg-black/50 rounded text-xs text-white/80 font-mono">
                              AI
                            </span>
                            <span className="px-2 py-1 bg-black/50 rounded text-xs text-white/80 font-mono">
                              Machine Learning
                            </span>
                            <span className="px-2 py-1 bg-black/50 rounded text-xs text-white/80 font-mono">
                              Data Science
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1"></div>

                      <div className="pt-4 border-t border-white/10 space-y-2">
                        <div className="flex items-center gap-6 pb-1">
                          <span className="text-xs font-medium text-white font-mono">Prizes</span>
                          <span className="text-xs text-white/60 font-mono">TBD</span>
                        </div>
                        <div className="flex items-center gap-6 pb-1">
                          <span className="text-xs font-medium text-white font-mono">Event</span>
                          <span className="text-xs text-white/60 font-mono">
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

        <Footer />
      </div>
    </div>
  )
}
