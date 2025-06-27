'use client'

import React, { useState, useEffect } from 'react'
import { JunctionLogo } from '@/components/logo'
import { Footer } from "@/components/footer"

interface Event {
  event_id: number
  name: string
  slug: string
  status: string
  start_date: string
  end_date: string
  location: string
  description: string
  cover_image_url: string
  is_public: boolean
  created_at: string
  updated_at: string
}

interface Challenge {
  challenge_id: number
  event_id: number
  organization_id: number
  name: string
  description: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showChallengesPopup, setShowChallengesPopup] = useState(false)

  // Fetch events and challenges
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch events
        const eventsResponse = await fetch('/api/proxy/events', {
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`)
        }
        
        const eventsData = await eventsResponse.json()
        const eventsArray = Array.isArray(eventsData) ? eventsData : [eventsData]
        setEvents(eventsArray)

        // Fetch challenges for each event
        const allChallenges: Challenge[] = []
        for (const event of eventsArray) {
          try {
            const challengesResponse = await fetch(`/api/proxy/events/${event.event_id}/challenges`, {
              headers: { 'Content-Type': 'application/json' }
            })
            
            if (challengesResponse.ok) {
              const challengesData = await challengesResponse.json()
              const challengesArray = Array.isArray(challengesData) ? challengesData : [challengesData]
              allChallenges.push(...challengesArray)
            }
          } catch (err) {
            console.log(`No challenges found for event ${event.event_id}`)
          }
        }
        setChallenges(allChallenges)

      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper functions
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date of event'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Date of event'
    }
  }

  const getEventChallenges = (eventId: number) => {
    return challenges.filter(challenge => challenge.event_id === eventId)
  }

  const getPlaceholderImage = (index: number) => {
    const placeholderImages = [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
    return placeholderImages[index % placeholderImages.length]
  }

  // Helper function to check if event is active (upcoming or ongoing)
  const isEventActive = (startDate: string, status: string) => {
    if (status === 'CANCELLED') return false
    if (!startDate) return false
    
    try {
      const eventDate = new Date(startDate)
      const now = new Date()
      return eventDate >= now || status === 'ONGOING'
    } catch (error) {
      return false
    }
  }

  // Helper function to get status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'ONGOING':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'CANCELLED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-neutral-800/80 text-gray-200 border-neutral-600/30'
    }
  }

  // Filter and sort events
  const processEvents = () => {
    let filteredEvents = events

    // Filter by search query
    if (searchQuery.trim()) {
      filteredEvents = filteredEvents.filter(event =>
        event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Separate active and past events
    const activeEvents = filteredEvents.filter(event => isEventActive(event.start_date, event.status))
    const pastEvents = filteredEvents.filter(event => !isEventActive(event.start_date, event.status))

    // Sort active events by start date (earliest first)
    activeEvents.sort((a, b) => {
      if (!a.start_date) return 1
      if (!b.start_date) return -1
      return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    })

    // Sort past events by start date (most recent first)
    pastEvents.sort((a, b) => {
      if (!a.start_date) return 1
      if (!b.start_date) return -1
      return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    })

    return { activeEvents, pastEvents }
  }

  const { activeEvents, pastEvents } = processEvents()

  // Challenge Card Component
  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    
    return (
      <div className="bg-neutral-800/60 border border-neutral-600/40 rounded-lg overflow-hidden">
        <div className="flex">
          {/* Left side - CO badge - square reaching to expand text */}
          <div className="w-48 h-48 bg-neutral-900/90 flex items-center justify-center border-r border-neutral-600/40 flex-shrink-0 mt-6 mb-6">
            <div className="text-neutral-300 text-6xl font-bold">CO</div>
          </div>
          
          {/* Right side - Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-green-400 text-lg font-medium mb-3">
                {challenge.name || 'Sustainable Generative AI Assistant For Insights'}
              </h3>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-neutral-700/60 text-neutral-300 text-xs rounded border border-neutral-600/40">AI</span>
                <span className="px-2 py-1 bg-neutral-700/60 text-neutral-300 text-xs rounded border border-neutral-600/40">Machine Learning</span>
                <span className="px-2 py-1 bg-neutral-700/60 text-neutral-300 text-xs rounded border border-neutral-600/40">Data Science</span>
              </div>
              
              {/* Section Header */}
              <h4 className="text-neutral-200 font-medium mb-3">Insight</h4>
              
              {/* Description */}
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                {isExpanded 
                  ? (challenge.description || `Description of Challenge... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia...`)
                  : `${(challenge.description || 'Description of Challenge... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores...').slice(0, 120)}...`
                }
              </p>
            </div>
            
            {/* Expand/Collapse Button - positioned at bottom */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-green-400 text-sm hover:text-green-300 transition-colors self-start"
            >
              <svg 
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
              <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Event card component
  const EventCard = ({ event, index }: { event: Event; index: number }) => (
    <div className="bg-neutral-900/60 border border-neutral-700/50 rounded-lg overflow-hidden group hover:border-neutral-600 transition-all cursor-pointer flex-shrink-0 w-80"
         onClick={() => setSelectedEventId(event.event_id)}>
      {/* Event Image */}
      <div className="relative h-40 bg-neutral-800 overflow-hidden">
        <img 
          src={event.cover_image_url || getPlaceholderImage(index)}
          alt={event.name || "Event"}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        {/* Event Details - Stacked */}
        <div className="space-y-2 mb-4">
          <div className="pb-2">
            <h3 className="text-white text-lg font-bold mb-2">{event.name || 'Event Name TBD'}</h3>
            
            {/* Tags Row - Real status + placeholders */}
            <div className="flex flex-wrap gap-1">
              <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(event.status)}`}>
                {event.status || 'Status TBD'}
              </span>
              <span className="px-2 py-1 bg-neutral-800/80 text-gray-200 text-xs rounded border border-neutral-600/30">
                {event.is_public ? 'Public' : 'Private'}
              </span>
              <span className="px-2 py-1 bg-neutral-800/80 text-gray-200 text-xs rounded border border-neutral-600/30">
                Category TBD
              </span>
            </div>
          </div>

          <div className="py-2">
            <div className="flex items-center space-x-2 py-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className="text-gray-300 text-xs">{formatDate(event.start_date)}</span>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-gray-300 text-xs">{event.location || 'Location TBD'}</span>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span className="text-gray-300 text-xs">Hackathon</span>
            </div>
          </div>
        </div>
        
        {/* Buttons - Full Width Side by Side */}
        <div className="flex space-x-2 mb-3">
          <button className="flex-1 px-3 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-100 transition-colors">
            View event
          </button>
          <button 
            className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
              event.status === 'CANCELLED' 
                ? 'bg-gray-500/50 text-gray-400 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            disabled={event.status === 'CANCELLED'}
          >
            {event.status === 'CANCELLED' ? 'Cancelled' : 'Register now'}
          </button>
        </div>
        
        {/* End Date */}
        <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
          <span>Ends {formatDate(event.end_date)}</span>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-sans">
        <header className="border-b border-zinc-800 px-6 py-4 fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <JunctionLogo />
            <div className="flex items-center border border-zinc-700 rounded-2xl p-1">
              <button className="px-8 py-3 text-sm rounded-xl bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent border border-transparent text-emerald-400">
                Events
              </button>
            </div>
            <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-black font-semibold text-sm">
              JM
            </div>
          </div>
        </header>
        <div className="pt-20 flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading events...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white font-sans">
        <header className="border-b border-zinc-800 px-6 py-4 fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <JunctionLogo />
            <div className="flex items-center border border-zinc-700 rounded-2xl p-1">
              <button className="px-8 py-3 text-sm rounded-xl bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent border border-transparent text-emerald-400">
                Events
              </button>
            </div>
            <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-black font-semibold text-sm">
              JM
            </div>
          </div>
        </header>
        <div className="pt-20 flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading events: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-500 text-black rounded hover:bg-emerald-400 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // If viewing specific event details
  if (selectedEventId) {
    const selectedEvent = events.find(e => e.event_id === selectedEventId)
    const eventChallenges = getEventChallenges(selectedEventId)

    if (!selectedEvent) {
      return <div>Event not found</div>
    }

    return (
      <div className="min-h-screen bg-black text-white font-sans">
        {/* Header */}
        <header className={`border-b border-zinc-800 px-6 py-4 fixed top-0 left-0 right-0 z-50 ${showChallengesPopup ? 'bg-neutral-800' : 'bg-black/80'} backdrop-blur-md`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <JunctionLogo />
            <div className="flex items-center border border-zinc-700 rounded-2xl p-1">
              {['Dashboard', 'Events', 'Community'].map((tab) => {
                const isActive = tab === 'Events'
                return (
                  <button
                    key={tab}
                    className={`px-8 py-3 text-sm rounded-xl transition-all duration-500 ease-in-out min-w-[120px] relative
                      ${isActive
                        ? 'text-emerald-400 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent border border-transparent'
                        : 'text-zinc-500 hover:text-zinc-300'}
                    `}
                    style={isActive ? {
                      background: 'linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.1) 50%, rgba(16,185,129,0) 100%)',
                      border: '1px solid transparent',
                      backgroundClip: 'padding-box',
                      boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.8), inset 0 0 0 2px rgba(16,185,129,0.4), inset 0 0 0 3px rgba(16,185,129,0.1)'
                    } : {}}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
            <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-black font-semibold text-sm">
              JM
            </div>
          </div>
        </header>

        {/* Content with top padding to account for fixed header */}
        <div className="pt-20">
          <div className="container mx-auto px-6 py-6 max-w-7xl">
            {/* Back to Events Button */}
            <div className="mb-6">
              <button 
                onClick={() => setSelectedEventId(null)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5"/>
                  <path d="M12 19l-7-7 7-7"/>
                </svg>
                <span>Back to Events</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - Left 2/3 */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Hero Section */}
                <div className="relative h-72 bg-neutral-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-0">
                    <img 
                      src={selectedEvent.cover_image_url || getPlaceholderImage(0)}
                      alt={selectedEvent.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-white">{selectedEvent.name}</h1>
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                        {selectedEvent.status || 'LIVE'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-gray-300 text-sm">
                      <span className="flex items-center space-x-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>{formatDate(selectedEvent.start_date)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>{selectedEvent.location || 'Location pending'}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <span>Type of event</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedEvent.description || 'Join us for one of the most anticipated hackathon adventures where epic talents convene and brilliant minds unite. Experience the ultimate hackathon where innovation meets creativity and where great ideas come to life. Our event brings together the brightest minds in technology, design, and entrepreneurship for an unforgettable experience.'}
                  </p>
                </div>

                {/* Schedule Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Schedule</h2>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between py-4 border-b border-neutral-800 last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm w-12">Day 1</span>
                        <span className="text-white text-sm font-medium">Event Kick-off & Networking</span>
                      </div>
                      <span className="text-gray-400 text-sm">10:00 - 18:00</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 border-b border-neutral-800 last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm w-12">Day 2</span>
                        <span className="text-white text-sm font-medium">Hackathon Announcement & Building</span>
                      </div>
                      <span className="text-gray-400 text-sm">10:00 - 18:00</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm w-12">Day 3</span>
                        <span className="text-white text-sm font-medium">Final Submissions & Pitches</span>
                      </div>
                      <span className="text-gray-400 text-sm">10:00 - 18:00</span>
                    </div>
                  </div>
                </div>

                {/* Challenges Section - Preview one challenge with button */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Challenges</h2>
                  </div>
                  
                  {eventChallenges.length > 0 ? (
                    <div className="space-y-4">
                      {/* Preview one challenge - simple card with just image and title */}
                      <div className="bg-neutral-800/60 border border-neutral-600/40 rounded-lg overflow-hidden">
                        <div className="flex items-center">
                          {/* Left side - CO badge */}
                          <div className="w-16 h-16 bg-neutral-900/90 flex items-center justify-center border-r border-neutral-600/40 flex-shrink-0 m-4">
                            <div className="text-neutral-300 text-xl font-bold">CO</div>
                          </div>
                          
                          {/* Right side - Just title */}
                          <div className="flex-1 p-4">
                            <h3 className="text-white text-lg font-medium">
                              {eventChallenges[0].name || 'Sustainable Generative AI Assistant For Insights'}
                            </h3>
                          </div>
                        </div>
                      </div>
                      
                      {/* See All Challenges Button - smaller */}
                      <button 
                        onClick={() => setShowChallengesPopup(true)}
                        className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-100 transition-colors"
                      >
                        See All Challenges
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No challenges available for this event</p>
                    </div>
                  )}
                </div>

                {/* Prizes Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Prizes</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">1st Place</div>
                        <div className="text-gray-400 text-sm">Prize information pending</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
                      <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">2nd Place</div>
                        <div className="text-gray-400 text-sm">Prize information pending</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
                      <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">3rd Place</div>
                        <div className="text-gray-400 text-sm">Prize information pending</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sidebar - Right 1/3 */}
              <div className="space-y-6">
                
                {/* Registration Card */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Registration</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Status</span>
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">Open</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Deadline</span>
                      <span className="text-white text-sm">{formatDate(selectedEvent.end_date) || 'Information pending'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Participants</span>
                      <span className="text-white text-sm">Information pending</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Team Size</span>
                      <span className="text-white text-sm">1-4 People</span>
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-3 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors">
                    Register now
                  </button>
                </div>

                {/* Sponsors Card */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Sponsors</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[1,2,3,4,5,6].map((i) => (
                      <div key={i} className="h-14 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Company {i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Organizers Card */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Organizers</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">A</span>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">Junction Organizing</div>
                        <div className="text-gray-400 text-xs">Team Organizer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Events Section - Full Width */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Similar Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.filter(e => e.event_id !== selectedEventId).slice(0, 2).map((event, index) => (
                  <div key={event.event_id} className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden group hover:border-neutral-700 transition-all cursor-pointer"
                       onClick={() => setSelectedEventId(event.event_id)}>
                    <div className="relative h-48 bg-neutral-800 overflow-hidden">
                      <img 
                        src={event.cover_image_url || getPlaceholderImage(index)}
                        alt={event.name}
                        className="w-full h-full object-cover grayscale"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                        <h3 className="text-white text-lg font-bold mb-2">{event.name}</h3>
                        <div className="flex items-center space-x-4 text-gray-300 text-xs mb-3">
                          <span className="flex items-center space-x-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span>{formatDate(event.start_date)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span>{event.location || 'Location'}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="2" y1="12" x2="22" y2="12"/>
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                            <span>Type of event</span>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded-full">AI</span>
                          <span className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded-full">Machine Learning</span>
                          <span className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded-full">Innovation</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <button className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors">
                          Register now
                        </button>
                        <div className="flex items-center space-x-1 text-gray-400 text-xs">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                          </svg>
                          <span>Registration ends {formatDate(event.end_date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Challenges Popup */}
        {showChallengesPopup && (
          <>
            {/* Blur overlay for entire screen */}
            <div className="fixed inset-0 bg-neutral-800/80 backdrop-blur-sm z-40" />
            
            {/* Popup Window */}
            <div className="fixed inset-0 top-20 z-50 flex items-start justify-center pt-8">
              <div className="bg-neutral-900 border border-neutral-700 rounded-lg w-full max-w-4xl mx-4 max-h-[calc(100vh-120px)] overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center justify-between px-6 py-4">
                  <h2 className="text-xl font-semibold text-neutral-200">Challenges</h2>
                  <button 
                    onClick={() => setShowChallengesPopup(false)}
                    className="text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-6">
                  {eventChallenges.length > 0 ? (
                    <div className="space-y-6">
                      {eventChallenges.map((challenge) => (
                        <ChallengeCard key={challenge.challenge_id} challenge={challenge} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No Challenges Available</h3>
                      <p className="text-gray-400">Challenges for this event will be announced soon. Check back later!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        
        <Footer />
      </div>
    )
  }

  // Main events listing view - Now using the events page design
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header using Navbar component */}
      <header className="px-6 py-4 fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <JunctionLogo />
          
          <div className="flex items-center border border-zinc-700 rounded-2xl p-1">
            {['Dashboard', 'Events', 'Community'].map((tab) => {
              const isActive = tab === 'Events'
              return (
                <button
                  key={tab}
                  className={`px-8 py-3 text-sm rounded-xl transition-all duration-500 ease-in-out min-w-[120px] relative
                    ${isActive
                      ? 'text-emerald-400 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent border border-transparent'
                      : 'text-zinc-500 hover:text-zinc-300'}
                  `}
                  style={isActive ? {
                    background: 'linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.1) 50%, rgba(16,185,129,0) 100%)',
                    border: '1px solid transparent',
                    backgroundClip: 'padding-box',
                    boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.8), inset 0 0 0 2px rgba(16,185,129,0.4), inset 0 0 0 3px rgba(16,185,129,0.1)'
                  } : {}}
                >
                  {tab}
                </button>
              )
            })}
          </div>
          
          <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-black font-semibold text-sm">
            JM
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex justify-center pt-20">
        <div className="w-full max-w-6xl px-6 py-6">
          
          {/* Search Bar - Centered */}
          <div className="mb-8 flex justify-center">
            <div className="relative max-w-2xl w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-gray-700 rounded-xl bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
              />
            </div>
          </div>

          {/* Active Events Section */}
          {activeEvents.length > 0 && (
            <div className="mb-12">
              <div className="relative mb-6 overflow-hidden">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-green-400 from-20% via-green-400 via-40% to-transparent to-80% bg-clip-text text-transparent">
                  Upcoming Events ({activeEvents.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800" style={{scrollbarWidth: 'thin'}}>
                <div className="flex space-x-6 w-max">
                  {activeEvents.map((event, index) => (
                    <EventCard key={event.event_id || index} event={event} index={index} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <div className="mb-12">
              <div className="relative mb-6 overflow-hidden">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-400 from-20% via-gray-400 via-40% to-transparent to-80% bg-clip-text text-transparent">
                  Past Events ({pastEvents.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800" style={{scrollbarWidth: 'thin'}}>
                <div className="flex space-x-6 w-max">
                  {pastEvents.map((event, index) => (
                    <EventCard key={event.event_id || index} event={event} index={index + activeEvents.length} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* No Events Message */}
          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No events found.</p>
            </div>
          )}

          {/* No Search Results Message */}
          {events.length > 0 && activeEvents.length === 0 && pastEvents.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No events match your search criteria.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}