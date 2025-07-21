'use client'
import * as React from "react"
import { useRouter } from 'next/navigation' 
import { useState, useCallback, useEffect, useMemo } from 'react'
import { Footer } from "@/components/footer"
import Navbar from '@/components/navi'
import * as style from '@/styles/design-system'
import { useLoading } from '@/components/loading-context'
import Image from 'next/image'
import { MainButton } from "@/components/attachables/main-button"
import { EventCard, Event } from "@/components/event-card"
import Loading from "@/components/loading"
import { Clock, Users } from 'lucide-react'

// Custom hook to manage events data fetching and caching
const useEventsData = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Cache implementation: Check if we have fresh data in sessionStorage (5 min expiry)
        const cachedData = sessionStorage.getItem('events-cache')
        const cacheTime = sessionStorage.getItem('events-cache-time')
        
        if (cachedData && cacheTime) {
          const isExpired = Date.now() - parseInt(cacheTime) > 5 * 60 * 1000
          if (!isExpired) {
            setEvents(JSON.parse(cachedData))
            setLoading(false)
            return
          }
        }

        // API proxy call to avoid CORS issues and centralize API logic
        const eventsResponse = await fetch('/api/proxy/events', {
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`)
        }
        
        const eventsData = await eventsResponse.json()
        // Defensive programming: Ensure we always work with an array
        const eventsArray = Array.isArray(eventsData) ? eventsData : [eventsData]
        
        // Store fetched data in cache with timestamp
        sessionStorage.setItem('events-cache', JSON.stringify(eventsArray))
        sessionStorage.setItem('events-cache-time', Date.now().toString())
        
        setEvents(eventsArray)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { events, loading, error }
}

export default function JunctionDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Dashboard')
  const { setLoading } = useLoading()
  
  const { events, loading: eventsLoading, error: eventsError } = useEventsData()

  // Memoized computation to avoid recalculating event categories on every render
  const processedEvents = useMemo(() => {
    // Helper function to determine if an event is currently active/upcoming
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

    // Filter events into different categories for dashboard sections
    const activeEvents = events.filter(event => isEventActive(event.start_date, event.status))
    const registeredEvents = events.filter(event => event.status === 'REGISTERED' || event.status === 'PUBLISHED')
    
    // Sort active events by start date to show soonest first
    activeEvents.sort((a, b) => {
      if (!a.start_date) return 1
      if (!b.start_date) return -1
      return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    })

    return { 
      activeEvents, 
      registeredEvents,
      currentActiveEvent: activeEvents.find(event => event.status === 'ONGOING') || activeEvents[0],
      currentRegisteredEvent: registeredEvents[0],
      eventsForYou: events.slice(0, 3)
    }
  }, [events])

  // useCallback prevents unnecessary re-renders by memoizing the function
  const handleEventClick = useCallback((eventId: number) => {
    setLoading(`event-${eventId}`, true)
    router.push(`/events/${eventId}`)
  }, [router, setLoading])

  // Navigation handler with loading state - only works if there's an active event
  const handleEnterEvent = useCallback(() => {
    const activeEvent = processedEvents.currentActiveEvent
    if (activeEvent?.event_id) {
      setLoading('enter-event', true)
      router.push(`/events/${activeEvent.event_id}`)
    }
  }, [router, setLoading, processedEvents.currentActiveEvent])

  // Similar pattern for registered events - only works if there's a registered event
  const handleViewEvent = useCallback(() => {
    const registeredEvent = processedEvents.currentRegisteredEvent
    if (registeredEvent?.event_id) {
      setLoading('view-event', true)
      router.push(`/events/${registeredEvent.event_id}`)
    }
  }, [router, setLoading, processedEvents.currentRegisteredEvent])

  const handleViewAllEvents = useCallback(() => {
    setLoading('view-all-events', true)
    router.push('/events')
  }, [router, setLoading])

  // Extract current events from processed data (no fallbacks needed with loading states)
  const currentActiveEvent = processedEvents.currentActiveEvent
  const currentRegisteredEvent = processedEvents.currentRegisteredEvent

  // Date formatting utility with error handling
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date of event'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    } catch (error) {
      return 'Date of event'
    }
  }

  // Calculate and format remaining time until event ends
  const getTimeRemaining = (endDate: string) => {
    if (!endDate) return '2 Day 12 hours 45min Left'
    
    try {
      const end = new Date(endDate)
      const now = new Date()
      const diff = end.getTime() - now.getTime()
      
      if (diff <= 0) return 'Event ended'
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      return `${days} Day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''} ${minutes}min Left`
    } catch (error) {
      return '2 Day 12 hours 45min Left'
    }
  }

  // Map event status to appropriate badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ONGOING':
        return { style: style.status.greenLight, text: 'Ongoing' }
      case 'PUBLISHED':
        return { style: style.status.greenLight, text: 'Upcoming' }
      default:
        return { style: style.status.greenLight, text: 'Ongoing' }
    }
  }

  // Show loading state if events are still being fetched
  if (eventsLoading) {
    return <Loading message="Loading dashboard..." />
  }

  // Show error state if events failed to load
  if (eventsError) {
    return <Loading message={`Error loading dashboard: ${eventsError}`} />
  }

  // Don't render main content if no events are available
  if (!currentActiveEvent && !currentRegisteredEvent) {
    return <Loading message="No events available" />
  }

  const statusBadge = getStatusBadge(currentActiveEvent.status)

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="w-[95%] md:w-[95%] lg:w-[80%] mx-auto pt-20">
        {/* Hero section with personalized greeting */}
        <section className="text-center py-[8%]">
          <h1 className={style.font.grotesk.heavy + " text-5xl font-[700]"}>
            <span className="text-[var(--color-primary-opacity100)]">Good morning,</span>
            {' '}
            <span className="text-[var(--color-light-opacity100)]">Interract</span>
          </h1>
          <p className="font-space-mono text-[var(--color-white-opacity60)] tracking-[-0.02rem] text-[1.15rem] mt-3">
            Here's an overview of what's going on for you.
          </p>
        </section>

        {/* Main active event showcase with image, status, and quick actions */}
        <section>
          <div className={style.box.primary.bottom + " p-4"}>
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="lg:w-1/3">
                <div className={style.border.radius.middle + " h-32 lg:h-full relative bg-[var(color-white-opacity20)] border border-[var(--color-white-opacity40)] overflow-hidden"}>
                  <img 
                    src={currentActiveEvent.cover_image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt={`${currentActiveEvent.name} Venue`}
                    className={`w-full h-full object-cover`}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={statusBadge.style}>{statusBadge.text}</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-2/3 my-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h1 className={style.font.grotesk.main + " text-3xl text-[var(--color-light-opacity100)] mb-2 mr-3 truncate"}>
                      {currentActiveEvent.name}
                    </h1>
                    
                    <div className="flex items-center space-x-8 text-sm text-[var(--color-white-opacity60)]">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>{getTimeRemaining(currentActiveEvent.end_date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={16} className="text-gray-400" />
                        <span>139 Teams</span>
                      </div>
                    </div>
                  </div>
                  
                  <MainButton 
                    variant="default" 
                    size="default" 
                    onClick={handleEnterEvent}
                    disabled={!currentActiveEvent}
                  >
                    Enter Event
                  </MainButton>
                </div>

                {/* Two-column layout for deadlines and announcements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                  <div className={style.box.gray.middle + " p-4"}>
                    <h2 className={style.font.grotesk.main + " text-[var(--color-light-opacity100)] text-lg mb-4"}>Upcoming Deadlines</h2>
                    <hr className="border-[var(--color-white-opacity30)] mb-2" />
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center py-1">
                        <span className={style.font.grotesk.medium + " text-[var(--color-light-opacity100)] text-[0.9rem]"}>Team Set</span>
                        <span className={style.font.mono.text + " text-[var(--color-light-opacity50)] text-[0.8rem]"}>Today at 17:00</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className={style.font.grotesk.medium + " text-[var(--color-light-opacity100)] text-[0.9rem]"}>Project Draft</span>
                        <span className={style.font.mono.text + " text-[var(--color-light-opacity50)] text-[0.8rem]"}>Tomorrow at 21:00</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className={style.font.grotesk.medium + " text-[var(--color-light-opacity100)] text-[0.9rem]"}>Final Submission</span>
                        <span className={style.font.mono.text + " text-[var(--color-light-opacity50)] text-[0.8rem]"}>23rd of November at 21:00</span>
                      </div>
                    </div>
                  </div>

                  <div className={style.box.gray.top + " p-4"}>
                    <h2 className={style.font.grotesk.main + " text-white font-bold text-lg mb-4"}>Announcements</h2>
                    <hr className="border-[var(--color-white-opacity30)] mb-2" />
                    <p className={style.font.mono.text + " text-[var(--color-light-opacity50)] text-[0.8rem] mt-4 py-1"}>Most recent announcements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User statistics grid showing participation metrics */}
        <section className={style.sectionGap.top}>
          <h2 className={style.sectionTitle.grotesk}>Your Stats</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "calendar_check", label: "Events Joined", value: "12" },
              { icon: "Code", label: "Projects Built", value: "10" },
              { icon: "Clock", label: "Hours Hacking", value: "576" },
              { icon: "Star", label: "Hackathon Wins", value: "7" }
            ].map((stat, index) => (
              <div key={index} className={style.box.grayPrimary + " p-4 flex flex-col text-left"}>
                <div className="border border-[var(--color-white-opacity20)] rounded-[3px] p-7 flex flex-col text-left h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Image src={`/icons/${stat.icon}.svg`} alt={stat.label} width={22} height={22} />
                    <div className="text-[var(--color-white-opacity60)] text-sm">{stat.label}</div>
                  </div>
                  <div className="text-[var(--color-light-opacity100)] text-2xl font-bold">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed view of user's registered events with schedule preview */}
        <section className={style.sectionGap.top}>
          <h2 className={style.sectionTitle.grotesk}>Your Registered Events</h2>
          
          <div className={style.box.gray.bottom + " overflow-hidden"}>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8">
                <h3 className={style.font.grotesk.main + " text-[1.6rem] text-[var(--color-light-opacity100)] mb-3 truncate"}>
                  {currentRegisteredEvent.name}
                </h3>
                
                {/* Event metadata with responsive layout */}
                <div className="flex items-center space-x-6 mb-6 text-sm text-zinc-400">
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span className="whitespace-nowrap">
                      {formatDate(currentRegisteredEvent.start_date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="truncate">{currentRegisteredEvent.location || 'Location'}</span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="whitespace-nowrap">{currentRegisteredEvent.type || 'Type of event'}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-8">
                  <span className={style.tag.main}>AI</span>
                  <span className={style.tag.main}>Machine Learning</span>
                  <span className={style.tag.main}>Innovation</span>
                </div>

                {/* Schedule preview section */}
                <div className={style.box.gray.bottom + " mb-6 p-6"}>
                  <h4 className={style.font.grotesk.medium + " text-[var(--color-light-opacity100)] text-[1.2rem] mb-3"}>Schedule</h4>
                  <div className="space-y-3">
                    <div className="border-b border-gray-600">
                      <div className="flex justify-between items-center py-3">
                        <span className={style.font.grotesk.light + " text-[var(--color-light-opacity100)] text-[1rem]"}>Pitch, Judging & Celebration</span>
                        <span className={style.font.mono.text + " text-[var(--color-white-opacity50)] text-[0.9rem]"}>15:00 - 17:00</span>
                      </div> 
                    </div>
                  </div>
                </div>

                <button 
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors w-[169px] h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleViewEvent}
                  disabled={!currentRegisteredEvent}
                >
                  View event
                </button>
              </div>
              
              <div className="lg:w-1/2 flex-shrink-0">
                <div className="h-64 lg:h-[400px] bg-zinc-600 flex items-center justify-center relative rounded-lg overflow-hidden">
                  <img 
                    src={currentRegisteredEvent.cover_image_url || "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt="Event venue" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized event recommendations grid */}
        <section className={style.sectionGap.top}>
          <h2 className={style.sectionTitle.grotesk}>Events For You</h2>

          {/* Loading, error, and success states for events */}
          {processedEvents.eventsForYou.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[var(--color-light-opacity60)]">No events available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {processedEvents.eventsForYou.map((event, index) => (
                <EventCard 
                  key={event.event_id || index} 
                  event={event} 
                  index={index}
                  onEventClick={handleEventClick} 
                />
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <MainButton variant="gray" showIcon={false} size="default" onClick={handleViewAllEvents}>
              View All Events
            </MainButton>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}