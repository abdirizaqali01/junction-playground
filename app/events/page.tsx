'use client'

import { useRouter } from 'next/navigation'
import { initializeCSSVariables } from '@/styles/design-system'
import { MainButton } from '@/components/attachables/main-button'
import React, { useState, useEffect } from 'react'
import { Footer } from "@/components/footer"
import Navbar from '@/components/navi'

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

// ChallengeCard component moved outside and properly typed
const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg overflow-hidden">
      <div className="flex">
        {/* Left side - CO badge - darker */}
        <div className="w-48 h-48 bg-[var(--color-dark-opacity100)] flex items-center justify-center border-r border-[var(--color-white-opacity10)] flex-shrink-0 mt-6 mb-6">
          <div className="text-[var(--color-light-opacity60)] text-6xl font-bold font-space-grotesk ">CO</div>
        </div>
        
        {/* Right side - Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[var(--color-primary-opacity100)] text-lg font-medium mb-3 font-space-grotesk ">
              {challenge.name || 'Sustainable Generative AI Assistant For Insights'}
            </h3>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-[var(--color-white-opacity5)] text-[var(--color-light-opacity60)] text-xs rounded border border-[var(--color-white-opacity10)] font-space-grotesk ">AI</span>
              <span className="px-2 py-1 bg-[var(--color-white-opacity5)] text-[var(--color-light-opacity60)] text-xs rounded border border-[var(--color-white-opacity10)] font-space-grotesk ">Machine Learning</span>
              <span className="px-2 py-1 bg-[var(--color-white-opacity5)] text-[var(--color-light-opacity60)] text-xs rounded border border-[var(--color-white-opacity10)] font-space-grotesk ">Data Science</span>
            </div>
            
            {/* Section Header */}
            <h4 className="text-[var(--color-light-opacity100)] font-medium mb-3 font-space-grotesk ">Insight</h4>
            
            {/* Description */}
            <p className="text-[var(--color-light-opacity60)] text-sm leading-relaxed mb-4 font-space-grotesk ">
              {isExpanded 
                ? (challenge.description || `Description of Challenge... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia...`)
                : `${(challenge.description || 'Description of Challenge... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores...').slice(0, 120)}...`
              }
            </p>
          </div>
          
          {/* Expand/Collapse Button */}
          <MainButton 
            variant="ghost" 
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-start justify-center text-[var(--color-primary-opacity100)] hover:text-[var(--color-primary-opacity60)]"
            showIcon={false}
          >
            <svg 
              className={`w-4 h-4 mr-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            {isExpanded ? 'Collapse' : 'Expand'}
          </MainButton>
        </div>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Events')
  const [events, setEvents] = useState<Event[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showChallengesPopup, setShowChallengesPopup] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  // Initialize design system CSS variables
  useEffect(() => {
    initializeCSSVariables()
  }, [])

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

  // Navigation function for registration
  const handleRegistration = (eventId: number) => {
    router.push(`/events/${eventId}/registration`)
  }

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

  // Helper function to get status colors using design system
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-[var(--color-primary-opacity20)] text-[var(--color-primary-opacity100)] border-[var(--color-primary-opacity40)]'
      case 'ONGOING':
        return 'bg-[var(--color-secondary-opacity20)] text-[var(--color-secondary-opacity100)] border-[var(--color-secondary-opacity40)]'
      case 'CANCELLED':
        return 'bg-[var(--color-alerts-opacity20)] text-[var(--color-alerts-opacity100)] border-[var(--color-alerts-opacity40)]'
      default:
        return 'bg-[var(--color-white-opacity10)] text-[var(--color-light-opacity100)] border-[var(--color-white-opacity20)]'
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

// Event card component with updated proportions
const EventCard = ({ event, index }: { event: Event; index: number }) => (
  <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg overflow-hidden group hover:border-[var(--color-white-opacity20)] transition-all cursor-pointer flex-shrink-0 w-80 h-150 flex flex-col"
       onClick={() => setSelectedEventId(event.event_id)}>
    
    {/* Event Image */}
    <div className="relative h-[25%] bg-[var(--color-white-opacity10)] overflow-hidden flex-shrink-0">
      <img 
        src={event.cover_image_url || getPlaceholderImage(index)}
        alt={event.name || "Event"}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
      />
    </div>
    
    {/* Content Section  */}
    <div className="h-[50%] p-4 flex flex-col justify-between flex-shrink-0">
      <div>
        <h3 className="text-[var(--color-light-opacity100)] text-lg font-semibold font-space-grotesk  mb-2 line-clamp-2">
          {event.name || 'Event Name TBD'}
        </h3>
        
        {/* Tags Row */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className={`px-2 py-1 text-xs font-medium rounded border font-space-grotesk  ${getStatusColor(event.status)}`}>
            {event.status || 'Status TBD'}
          </span>
          <span className="px-2 py-1 bg-[var(--color-white-opacity10)] text-[var(--color-light-opacity100)] text-xs rounded border border-[var(--color-white-opacity20)] font-space-grotesk ">
            {event.is_public ? 'Public' : 'Private'}
          </span>
          <span className="px-2 py-1 bg-[var(--color-white-opacity10)] text-[var(--color-light-opacity100)] text-xs rounded border border-[var(--color-white-opacity20)] font-space-grotesk ">
            Category TBD
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-light-opacity60)] flex-shrink-0">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span className="text-[var(--color-light-opacity100)] text-xs font-space-grotesk  truncate">{formatDate(event.start_date)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-light-opacity60)] flex-shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="text-[var(--color-light-opacity100)] text-xs font-space-grotesk  truncate">{event.location || 'Location TBD'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-light-opacity60)] flex-shrink-0">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span className="text-[var(--color-light-opacity100)] text-xs font-space-grotesk ">Hackathon</span>
        </div>
      </div>
    </div>
    
    {/* Buttons and Deadline Section  */}
    <div className="h-[10%] p-4 flex flex-col justify-between flex-shrink-0">
      {/* Buttons - Full Width Side by Side */}
      <div className="flex space-x-2 mb-3">
        <MainButton 
          variant="default" 
          size="sm" 
          className="flex-1 justify-center"
          showIcon={false}
          onClick={(e) => {
            e.stopPropagation()
            setSelectedEventId(event.event_id)
          }}
        >
          View event
        </MainButton>
        <MainButton 
          variant={event.status === 'CANCELLED' ? 'gray' : !isEventActive(event.start_date, event.status) ? 'gray' : 'primary'} 
          size="sm" 
          className="flex-1 justify-center"
          disabled={event.status === 'CANCELLED' || !isEventActive(event.start_date, event.status)}
          showIcon={false}
          onClick={(e) => {
            e.stopPropagation()
            if (event.status !== 'CANCELLED' && isEventActive(event.start_date, event.status)) {
              handleRegistration(event.event_id)
            }
          }}
        >
          {event.status === 'CANCELLED' ? 'Cancelled' : !isEventActive(event.start_date, event.status) ? 'Passed' : 'Register now'}
        </MainButton>
      </div>
      
      {/* End Date */}
      <div className="flex items-center justify-center space-x-1 text-[var(--color-light-opacity60)] text-xs font-space-grotesk ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
        <span className="truncate">Ends {formatDate(event.end_date)}</span>
      </div>
    </div>
  </div>
)

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk ">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="pt-20 flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary-opacity100)] mx-auto mb-4"></div>
            <p className="text-[var(--color-light-opacity60)]">Loading events...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk ">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="pt-20 flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-[var(--color-alerts-opacity100)] mb-4">Error loading events: {error}</p>
            <MainButton 
              variant="primary"
              onClick={() => window.location.reload()}
              className="justify-center"
              showIcon={false}
            >
              Retry
            </MainButton>
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
      return <div className="bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)]">Event not found</div>
    }

    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk ">
        {/* Header */}
        <div className={`fixed top-0 left-0 right-0 z-50 ${showChallengesPopup ? 'bg-[var(--color-white-opacity10)]' : 'bg-[var(--color-dark-opacity100)]/80'} backdrop-blur-md`}>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Demo Toggle - Fixed at top right */}
        <div className="fixed top-20 right-6 z-40">
          <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity20)] rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-[var(--color-light-opacity60)]">Demo:</span>
              <MainButton
                variant={isRegistered ? 'primary' : 'outlineGray'}
                size="sm"
                onClick={() => setIsRegistered(!isRegistered)}
                className="justify-center"
                showIcon={false}
              >
                {isRegistered ? 'Registered' : 'Not Registered'}
              </MainButton>
            </div>
          </div>
        </div>

        {/* Content with top padding to account for fixed header */}
        <div className="pt-20">
          <div className="container mx-auto px-6 py-6 max-w-7xl">
            {/* Back to Events Button */}
            <div className="mb-6">
              <MainButton 
                variant="ghost"
                onClick={() => setSelectedEventId(null)}
                showIcon={false}
                className="text-[var(--color-light-opacity60)] hover:text-[var(--color-light-opacity100)] justify-start items-center flex"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M19 12H5"/>
                  <path d="M12 19l-7-7 7-7"/>
                </svg>
                Back to Events
              </MainButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - Left 2/3 */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Hero Section */}
                <div className="relative h-72 bg-[var(--color-white-opacity10)] rounded-lg overflow-hidden">
                  <div className="absolute inset-0">
                    <img 
                      src={selectedEvent.cover_image_url || getPlaceholderImage(0)}
                      alt={selectedEvent.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-dark-opacity100)]/80 to-transparent p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-[var(--color-light-opacity100)] font-space-grotesk">{selectedEvent.name}</h1>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedEvent.status)}`}>
                        {selectedEvent.status || 'LIVE'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">
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
                <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-[var(--color-light-opacity100)] mb-4 font-space-grotesk ">About</h2>
                  <p className="text-[var(--color-light-opacity60)] text-sm leading-relaxed font-space-grotesk ">
                    {selectedEvent.description || 'Join us for one of the most anticipated hackathon adventures where epic talents convene and brilliant minds unite. Experience the ultimate hackathon where innovation meets creativity and where great ideas come to life. Our event brings together the brightest minds in technology, design, and entrepreneurship for an unforgettable experience.'}
                  </p>
                </div>

                {/* Schedule Section */}
                <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk ">Schedule</h2>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between py-4 border-b border-[var(--color-white-opacity10)] last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <span className="text-[var(--color-light-opacity60)] text-sm w-12 font-space-grotesk ">Day 1</span>
                        <span className="text-[var(--color-light-opacity100)] text-sm font-medium font-space-grotesk ">Hackathon Announcement & Building</span>
                      </div>
                      <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">10:00 - 18:00</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-[var(--color-light-opacity60)] text-sm w-12 font-space-grotesk ">Day 3</span>
                        <span className="text-[var(--color-light-opacity100)] text-sm font-medium font-space-grotesk ">Final Submissions & Pitches</span>
                      </div>
                      <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">10:00 - 18:00</span>
                    </div>
                  </div>
                </div>

                {/* Challenges Section - Preview one challenge with button */}
                <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[var(--color-light-opacity100)] font-space-grotesk ">Challenges</h2>
                  </div>
                  
                  {eventChallenges.length > 0 ? (
                    <div className="space-y-4">
                      {/* Preview one challenge - simple card with just image and title */}
                      <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg overflow-hidden">
                        <div className="flex items-center">
                          {/* Left side - CO badge */}
                          <div className="w-16 h-16 bg-[var(--color-white-opacity10)] flex items-center justify-center border-r border-[var(--color-white-opacity10)] flex-shrink-0 m-4">
                            <div className="text-[var(--color-light-opacity60)] text-xl font-bold font-space-grotesk ">CO</div>
                          </div>
                          
                          {/* Right side - Just title */}
                          <div className="flex-1 p-4">
                            <h3 className="text-[var(--color-light-opacity100)] text-lg font-medium font-space-grotesk ">
                              {eventChallenges[0].name || 'Sustainable Generative AI Assistant For Insights'}
                            </h3>
                          </div>
                        </div>
                      </div>
                      
                      {/* See All Challenges Button */}
                      <MainButton 
                        variant="default"
                        size="sm"
                        onClick={() => setShowChallengesPopup(true)}
                        className="justify-center"
                        showIcon={false}
                      >
                        See All Challenges
                      </MainButton>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-[var(--color-light-opacity60)]">No challenges available for this event</p>
                    </div>
                  )}
                </div>

                {/* Prizes Section */}
                <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk ">Prizes</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 p-4 bg-[var(--color-primary-opacity20)] border border-[var(--color-primary-opacity40)] rounded-lg">
                      <div className="w-8 h-8 bg-[var(--color-primary-opacity100)] rounded-full flex items-center justify-center">
                        <span className="text-[var(--color-light-opacity100)] text-sm font-bold">1</span>
                      </div>
                      <div>
                        <div className="text-[var(--color-light-opacity100)] font-medium text-sm font-space-grotesk ">1st Place</div>
                        <div className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Prize information pending</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity20)] rounded-lg">
                      <div className="w-8 h-8 bg-[var(--color-white-opacity30)] rounded-full flex items-center justify-center">
                        <span className="text-[var(--color-light-opacity100)] text-sm font-bold">2</span>
                      </div>
                      <div>
                        <div className="text-[var(--color-light-opacity100)] font-medium text-sm font-space-grotesk ">2nd Place</div>
                        <div className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Prize information pending</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity20)] rounded-lg">
                      <div className="w-8 h-8 bg-[var(--color-white-opacity30)] rounded-full flex items-center justify-center">
                        <span className="text-[var(--color-light-opacity100)] text-sm font-bold">3</span>
                      </div>
                      <div>
                        <div className="text-[var(--color-light-opacity100)] font-medium text-sm font-space-grotesk ">3rd Place</div>
                        <div className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Prize information pending</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sidebar - Right 1/3 */}
              <div className="space-y-6">
                
                {/* Registration Card */}
                <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk ">Registration</h3>
                  
                  {!isRegistered ? (
                    // Unregistered State
                    <>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Status</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor('PUBLISHED')}`}>Open</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Deadline</span>
                          <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk ">{formatDate(selectedEvent.end_date) || 'Information pending'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Participants</span>
                          <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk ">Information pending</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Team Size</span>
                          <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk ">1-4 People</span>
                        </div>
                      </div>
                      
                      <MainButton 
                        variant="primary"
                        className="w-full justify-center"
                        showIcon={false}
                        onClick={() => handleRegistration(selectedEvent.event_id)}
                      >
                        Register now
                      </MainButton>
                    </>
                  ) : (
                    // Registered State
                    <>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Status</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor('PUBLISHED')}`}>Open</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Deadline</span>
                          <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk ">May 30, 2025</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Participants</span>
                          <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk ">1,478 Registered</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk ">Team Size</span>
                          <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk ">1-4 People</span>
                        </div>
                      </div>

                      {/* Registration ends info with clock icon */}
                      <div className="flex items-center justify-center space-x-2 text-[var(--color-light-opacity60)] text-sm mb-4 font-space-grotesk ">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        <span>Registration ends May 30, 2025</span>
                      </div>
                      
                      {/* Buttons */}
                      <div className="space-y-3">
                        <MainButton 
                          variant="default"
                          className="w-full justify-center"
                          showIcon={false}
                        >
                          Event ID
                        </MainButton>
                        <MainButton 
                          variant="outlineGreen"
                          className="w-full justify-center"
                          showIcon={false}
                          onClick={() => router.push(`/events/${selectedEventId}/dash`)}
                        >
                          Event Dashboard
                        </MainButton>
                      </div>
                    </>
                  )}
                </div>

                {/* Sponsors Card */}
                <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk ">Sponsors</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[1,2,3,4,5,6].map((i) => (
                      <div key={i} className="h-14 bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity20)] rounded-lg flex items-center justify-center">
                        <span className="text-[var(--color-light-opacity60)] text-xs font-space-grotesk ">Company {i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Organizers Card */}
                <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk ">Organizers</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[var(--color-primary-opacity100)] rounded-full flex items-center justify-center">
                        <span className="text-[var(--color-light-opacity100)] text-sm font-bold">A</span>
                      </div>
                      <div>
                        <div className="text-[var(--color-light-opacity100)] text-sm font-medium font-space-grotesk ">Junction Organizing</div>
                        <div className="text-[var(--color-light-opacity60)] text-xs font-space-grotesk ">Team Organizer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Events Section - Full Width */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk ">Similar Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.filter(e => e.event_id !== selectedEventId).slice(0, 2).map((event, index) => (
                  <div key={event.event_id} className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg overflow-hidden group hover:border-[var(--color-white-opacity20)] transition-all cursor-pointer"
                       onClick={() => setSelectedEventId(event.event_id)}>
                    <div className="relative h-48 bg-[var(--color-white-opacity10)] overflow-hidden">
                      <img 
                        src={event.cover_image_url || getPlaceholderImage(index)}
                        alt={event.name}
                        className="w-full h-full object-cover grayscale"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-dark-opacity100)]/90 to-transparent p-4">
                        <h3 className="text-[var(--color-light-opacity100)] text-lg font-bold mb-2 font-space-grotesk ">{event.name}</h3>
                        <div className="flex items-center space-x-4 text-[var(--color-light-opacity60)] text-xs mb-3 font-space-grotesk ">
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
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                            <span>Type of event</span>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="px-2 py-1 bg-[var(--color-white-opacity20)] text-[var(--color-light-opacity60)] text-xs rounded-full font-space-grotesk ">AI</span>
                          <span className="px-2 py-1 bg-[var(--color-white-opacity20)] text-[var(--color-light-opacity60)] text-xs rounded-full font-space-grotesk ">Machine Learning</span>
                          <span className="px-2 py-1 bg-[var(--color-white-opacity20)] text-[var(--color-light-opacity60)] text-xs rounded-full font-space-grotesk ">Innovation</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <MainButton 
                          variant="primary"
                          size="sm"
                          className="justify-center"
                          showIcon={false}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRegistration(event.event_id)
                          }}
                        >
                          Register now
                        </MainButton>
                        <div className="flex items-center space-x-1 text-[var(--color-light-opacity60)] text-xs font-space-grotesk ">
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

  // Main events listing view
  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk ">
      {/* Header using Navbar component */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="flex justify-center pt-0">
        <div className="w-full max-w-6xl px-6 py-6">
          
          {/* Search Bar - Centered */}
          <div className="mb-8 flex font-space-grotesk  justify-center">
            <div className="relative max-w-2xl w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[var(--color-light-opacity60)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Hackathons"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-[var(--color-white-opacity20)] text-sm rounded-md bg-[var(--color-white-opacity5)] text-[var(--color-light-opacity100)] placeholder-[var(--color-light-opacity60)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-opacity100)] focus:border-transparent text-left"
              />
            </div>
          </div>

          {/* Active Events Section */}
          {activeEvents.length > 0 && (
            <div className="mb-12">
              <div className="relative mb-6 overflow-hidden">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-[var(--color-primary-opacity100)] from-20% via-[var(--color-primary-opacity100)] via-40% to-transparent to-80% bg-clip-text text-transparent">
                  Upcoming Events ({activeEvents.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[var(--color-light-opacity20)] scrollbar-track-[var(--color-white-opacity10)]" style={{scrollbarWidth: 'thin'}}>
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
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-[var(--color-light-opacity60)] from-20% via-[var(--color-light-opacity60)] via-40% to-transparent to-80% bg-clip-text text-transparent">
                  Past Events ({pastEvents.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[var(--color-light-opacity20)] scrollbar-track-[var(--color-white-opacity10)]" style={{scrollbarWidth: 'thin'}}>
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
              <p className="text-[var(--color-light-opacity60)] text-lg">No events found.</p>
            </div>
          )}

          {/* No Search Results Message */}
          {events.length > 0 && activeEvents.length === 0 && pastEvents.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-[var(--color-light-opacity60)] text-lg">No events match your search criteria.</p>
              <MainButton 
                variant="primary"
                onClick={() => setSearchQuery('')}
                className="mt-4 justify-center"
                showIcon={false}
              >
                Clear Search
              </MainButton>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}