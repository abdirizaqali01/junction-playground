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

import { Clock, Users } from 'lucide-react'

// Custom hook for fetching events data (similar to events page)
const useEventsData = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Check cache first
        const cachedData = sessionStorage.getItem('events-cache')
        const cacheTime = sessionStorage.getItem('events-cache-time')
        
        if (cachedData && cacheTime) {
          const isExpired = Date.now() - parseInt(cacheTime) > 5 * 60 * 1000 // 5 minutes
          if (!isExpired) {
            setEvents(JSON.parse(cachedData))
            setLoading(false)
            return
          }
        }

        // Fetch from API
        const eventsResponse = await fetch('/api/proxy/events', {
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`)
        }
        
        const eventsData = await eventsResponse.json()
        const eventsArray = Array.isArray(eventsData) ? eventsData : [eventsData]
        
        // Cache the data
        sessionStorage.setItem('events-cache', JSON.stringify(eventsArray))
        sessionStorage.setItem('events-cache-time', Date.now().toString())
        
        setEvents(eventsArray)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
        // Fallback to sample data if API fails
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
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const { setLoading } = useLoading()
  
  // Fetch events data
  const { events, loading: eventsLoading, error: eventsError } = useEventsData()

  // Process events to get active and registered events
  const processedEvents = useMemo(() => {
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

    const activeEvents = events.filter(event => isEventActive(event.start_date, event.status))
    const registeredEvents = events.filter(event => event.status === 'REGISTERED' || event.status === 'PUBLISHED')
    
    // Sort by start date
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
      eventsForYou: events.slice(0, 3) // Show first 3 events
    }
  }, [events])

  // Optimized event click handler
  const handleEventClick = useCallback((eventId: number) => {
    setLoading(`event-${eventId}`, true)
    router.push(`/events/${eventId}`)
  }, [router, setLoading])

  // Handler for entering the active event
  const handleEnterEvent = useCallback(() => {
    const activeEvent = processedEvents.currentActiveEvent
    if (activeEvent && activeEvent.event_id) {
      setLoading('enter-event', true)
      router.push(`/events/${activeEvent.event_id}`)
    } else {
      // Fallback to junction hackathon
      setLoading('enter-junction', true)
      router.push('/events/junction-hackathon')
    }
  }, [router, setLoading, processedEvents.currentActiveEvent])

  // Handler for viewing registered event
  const handleViewEvent = useCallback(() => {
    const registeredEvent = processedEvents.currentRegisteredEvent
    if (registeredEvent && registeredEvent.event_id) {
      setLoading('view-event', true)
      router.push(`/events/${registeredEvent.event_id}`)
    } else {
      // Fallback to sample event
      setLoading('view-event', true)
      router.push('/events/sample-event')
    }
  }, [router, setLoading, processedEvents.currentRegisteredEvent])

  // Handler for viewing all events
  const handleViewAllEvents = useCallback(() => {
    setLoading('view-all-events', true)
    router.push('/events')
  }, [router, setLoading])

  // Get current active event data or fallback to placeholder
  const currentActiveEvent = processedEvents.currentActiveEvent || {
    event_id: 1,
    name: 'Junction Hackathon',
    location: 'Helsinki, Finland',
    start_date: '2024-12-01T10:00:00Z',
    end_date: '2024-12-03T18:00:00Z',
    status: 'ONGOING'
  }

  // Get current registered event data or fallback to placeholder
  const currentRegisteredEvent = processedEvents.currentRegisteredEvent || {
    event_id: 2,
    name: 'Sample Event',
    location: 'Helsinki, Finland',
    start_date: '2024-12-01T10:00:00Z',
    end_date: '2024-12-03T18:00:00Z',
    status: 'REGISTERED',
    type: 'Hackathon'
  }

  // Helper function to format dates safely (avoiding hydration mismatch)
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date of event'
    
    try {
      const date = new Date(dateString)
      // Use a consistent format that won't cause hydration issues
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    } catch (error) {
      return 'Date of event'
    }
  }
  // Helper function to format time remaining
  const getTimeRemaining = (endDate: string) => {
    if (!endDate) return '2 Day 12 hours 45min Left' // Fallback
    
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
      return '2 Day 12 hours 45min Left' // Fallback
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="w-[95%] lg:w-[80%] mx-auto pt-20">
        {/*------------------------------------------ Welcome Section ------------------------------------------*/}
        <section className="text-center py-[8%]">
          <h1 className={style.font.grotesk.heavy + " text-5xl font-[700]"}>
            <span className=" text-[var(--color-primary-opacity100)]">Good morning,</span>
            {' '}
            <span className="text-[var(--color-light-opacity100)]">Interract</span>
          </h1>
          <p className="font-space-mono text-[var(--color-white-opacity60)] tracking-[-0.02rem] text-[1.15rem] mt-3">
            Here's an overview of what's going on for you.
          </p>
        </section>

        {/*------------------------------------------ Upcoming Event Section ------------------------------------------*/}
        <section className="">
          <div className={style.box.primary.bottom + " p-4"}>
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Left Image */}
              <div className="lg:w-1/3">
                <div className={style.border.radius.middle + " h-32 lg:h-full relative bg-[var(color-white-opacity20)] border border-[var(--color-white-opacity40)]"}>
                  <img 
                    src={currentActiveEvent.cover_image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt={`${currentActiveEvent.name} Venue`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={
                      currentActiveEvent.status === 'ONGOING' ? style.status.greenLight :
                      currentActiveEvent.status === 'PUBLISHED' ? style.status.blueLight :
                      style.status.greenLight
                    }>
                      {currentActiveEvent.status === 'ONGOING' ? 'Ongoing' : 
                       currentActiveEvent.status === 'PUBLISHED' ? 'Upcoming' : 
                       'Ongoing'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Right Content */}
              <div className="lg:w-2/3 my-auto">
                {/* Header with Title and Enter Button */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className={style.font.grotesk.main + " text-3xl text-[var(--color-light-opacity100)] mb-2 mr-3 truncate"}>
                      {currentActiveEvent.name}
                    </h1>
                    
                    {/* Information */}
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
                  
                  <MainButton variant="default" size="default" onClick={handleEnterEvent}>
                    Enter Event
                  </MainButton>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                  {/* Up Coming Deadlines */}
                  <div className={style.box.gray.middle + " p-4"}>
                    <h2 className={style.font.grotesk.main + " text-[var(--color-light-opacity100)] text-lg mb-4"}>Up Coming Deadlines</h2>
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

                  {/* Announcements */}
                  <div className={style.box.gray.top + " p-4"}>
                    <h2 className={style.font.grotesk.main + "text-white font-bold text-lg mb-4"}>Announcements</h2>
                    <hr className="border-[var(--color-white-opacity30)] mb-2" />
                    <p className={style.font.mono.text + " text-[var(--color-light-opacity50)] text-[0.8rem] mt-4 py-1"}>Most recent announcements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*------------------------------------------ Your Stats Section ------------------------------------------*/}
        <section className={style.sectionGap.top}>
          <h2 className={style.sectionTitle.grotesk}>Your Stats</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className={style.box.grayPrimary + " p-4 flex flex-col text-left"}>
              <div className="border border-[var(--color-white-opacity20)] rounded-[3px] p-7 flex flex-col text-left h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/icons/calendar_check.svg" alt="Calendar Check" width={22} height={22} />
                  <div className="text-[var(--color-white-opacity60)] text-sm">Events Joined</div>
                </div>
                <div className="text-[var(--color-light-opacity100)] text-2xl font-bold">12</div>
              </div>
            </div>

            <div className={style.box.grayPrimary + " p-4 flex flex-col text-left"}>
              <div className="border border-[var(--color-white-opacity20)] rounded-[3px] p-7 flex flex-col text-left h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/icons/Code.svg" alt="Code" width={22} height={22} />
                  <div className="text-[var(--color-white-opacity60)] text-sm">Projects Built</div>
                </div>
                <div className="text-[var(--color-light-opacity100)] text-2xl font-bold">10</div>
              </div>
            </div>

            <div className={style.box.grayPrimary + " p-4 flex flex-col text-left"}>
              <div className="border border-[var(--color-white-opacity20)] rounded-[3px] p-7 flex flex-col text-left h-full">
                <div className="flex items-center gap-2 mb-2">    
                  <Image src="/icons/Clock.svg" alt="Clock" width={22} height={22} />
                  <div className="text-[var(--color-white-opacity60)] text-sm">Hours Hacking</div>
                </div>
                <div className="text-[var(--color-light-opacity100)] text-2xl font-bold">576</div>
              </div>
            </div>

            <div className={style.box.grayPrimary + " p-4 flex flex-col text-left"}>
              <div className="border border-[var(--color-white-opacity20)] rounded-[3px] p-7 flex flex-col text-left h-full">
                <div className="flex items-center gap-2 mb-2">  
                  <Image src="/icons/Star.svg" alt="Star" width={22} height={22} />
                  <div className="text-[var(--color-white-opacity60)] text-sm mt-1">Hackathon Wins</div>
                </div>
                <div className="text-[var(--color-light-opacity100)] text-2xl font-bold">7</div>
              </div>
            </div>
          </div>
        </section>

        {/*------------------------------------------ Your Registered Events Section ------------------------------------------*/}
        <section className={style.sectionGap.top}>
          <h2 className={style.sectionTitle.grotesk}>Your Registered Events</h2>
          
          <div className={style.box.gray.bottom + " overflow-hidden"}>
            <div className="flex flex-col lg:flex-row">
              {/* Left Content */}
              <div className="lg:w-1/2 p-8">
                <h3 className={style.font.grotesk.main + " text-[1.6rem] text-[var(--color-light-opacity100)] mb-3 truncate"}>
                  {currentRegisteredEvent.name}
                </h3>
                
                {/* Event Stats */}
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

                {/* Event Tags */}
                <div className="flex items-center space-x-3 mb-8">
                  <span className={style.tag.main}>AI</span>
                  <span className={style.tag.main}>Machine Learning</span>
                  <span className={style.tag.main}>Innovation</span>
                </div>

                {/* Schedule */}
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

                {/* View Event Button */}
                <button 
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors w-[169px] h-12"
                  onClick={handleViewEvent}
                >
                  View event
                </button>
              </div>
              
              {/* Right Image */}
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

        {/*------------------------------------------ Browse Events Section ------------------------------------------*/}
        <section className={style.sectionGap.top}>
          <h2 className={style.sectionTitle.grotesk}>Events For You</h2>

          {eventsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-opacity100)] mx-auto mb-4"></div>
              <p className="text-[var(--color-light-opacity60)]">Loading events...</p>
            </div>
          ) : eventsError ? (
            <div className="text-center py-8">
              <p className="text-[var(--color-alerts-opacity100)] mb-4">Error loading events: {eventsError}</p>
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

          {/* View All Events Button */}
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