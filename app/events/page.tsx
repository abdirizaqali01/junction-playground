'use client'

import { useRouter } from 'next/navigation'
import { MainButton } from '@/components/attachables/main-button'
import React, { useState, useEffect, useCallback, useMemo, useTransition } from 'react'
import { Footer } from "@/components/footer"
import Navbar from '@/components/navi'
import * as style from '@/styles/design-system'
import { EventCard, Event } from '@/components/event-card'
import Loading from '@/components/loading'

// Custom hook for optimized API calls with caching
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
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { events, loading, error }
}

export default function EventsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Events')
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const { events, loading, error } = useEventsData()

  // Optimized navigation with loading states
  const handleRegistration = useCallback((eventId: number) => {
    const key = `register-${eventId}`
    
    // Show loading state immediately
    setLoadingStates(prev => ({ ...prev, [key]: true }))
    
    // Use transition for non-blocking navigation
    startTransition(() => {
      router.push(`/events/${eventId}/registration`)
    })
    
    // Clear loading state after navigation
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }))
    }, 1000)
  }, [router])

  // Optimized event click handler
  const handleEventClick = useCallback((eventId: number) => {
    const key = `event-${eventId}`
    
    setLoadingStates(prev => ({ ...prev, [key]: true }))
    
    startTransition(() => {
      router.push(`/events/${eventId}`)
    })
    
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }))
    }, 1000)
  }, [router])

  // Memoized event processing to prevent recalculation
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
  }, [events, searchQuery])

  // Optimized search with debouncing
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    startTransition(() => {
      setSearchQuery(value)
    })
  }, [])

  const { activeEvents, pastEvents } = processedEvents

  // LOADING SCREEN (optimized)
  if (loading) {
    return (
      <Loading message="Loading Events" variant="fullscreen" />
    )
  }

  // ERROR LOADING SCREEN
  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk">
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

  // Main events listing view
  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk">
      {/* Header using Navbar component */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Loading overlay for transitions */}
      {(isPending || Object.values(loadingStates).some(Boolean)) && (
        <div className="fixed top-0 left-0 w-full h-1 bg-[var(--color-primary-opacity20)] z-50">
          <div className="h-full bg-[var(--color-primary-opacity100)] animate-pulse" style={{width: '100%'}}></div>
        </div>
      )}

      {/* Content */}
      <div className="flex justify-center pt-0">
        <div className="w-[95%] lg:w-[80%] mx-auto pt-[150px]">
          
          {/* Search Bar - Optimized */}
          <div className="mb-10 flex font-space-grotesk justify-center">
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
                onChange={handleSearchChange}
                className="block w-full pl-12 pr-4 py-3 border border-[var(--color-white-opacity20)] text-sm rounded-md bg-[var(--color-white-opacity5)] text-[var(--color-light-opacity100)] placeholder-[var(--color-light-opacity60)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-opacity100)] focus:border-transparent text-left transition-all duration-200"
              />
              {isPending && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-primary-opacity100)]"></div>
                </div>
              )}
            </div>
          </div>

          {/* Active Events Section */}
          {activeEvents.length > 0 && (
            <div className="mb-12">
              <div className="relative mb-6 overflow-hidden">
                <h2 className={style.font.grotesk.heavy + " text-[1.8rem] text-[var(--color-primary-opacity100)]"}>
                  Upcoming Events <span className={style.font.mono.text + " text-[var(--color-white-opacity40)] text-[1.2rem]"}>[{activeEvents.length}]</span>
                </h2>
              </div>
              
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[var(--color-light-opacity20)] scrollbar-track-[var(--color-white-opacity10)]" style={{scrollbarWidth: 'thin'}}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeEvents.map((event, index) => (
                    <div key={event.event_id || index} className="relative">
                      <EventCard 
                        event={event} 
                        index={index}
                        onEventClick={handleEventClick}
                        onRegister={handleRegistration}
                      />
                      {/* Loading overlay for individual cards */}
                      {(loadingStates[`event-${event.event_id}`] || loadingStates[`register-${event.event_id}`]) && (
                        <div className="absolute inset-0 bg-[var(--color-dark-opacity60)] rounded-lg flex items-center justify-center z-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-opacity100)]"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <div className="mb-12">
              <div className="relative mb-6 overflow-hidden">
                <h2 className={style.font.grotesk.heavy + " text-[1.8rem] text-[var(--color-primary-opacity100)] flex items-center gap-2"}>
                  Past Events <span className={style.font.mono.text + " text-[var(--color-white-opacity40)] text-[1.2rem]"}>[{pastEvents.length}]</span>
                </h2>
              </div>
              
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[var(--color-light-opacity20)] scrollbar-track-[var(--color-white-opacity10)]" style={{scrollbarWidth: 'thin'}}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pastEvents.map((event, index) => (
                    <div key={event.event_id || index} className="relative">
                      <EventCard 
                        event={event} 
                        index={index}
                        onEventClick={handleEventClick}
                        onRegister={handleRegistration}
                      />
                      {/* Loading overlay for individual cards */}
                      {(loadingStates[`event-${event.event_id}`] || loadingStates[`register-${event.event_id}`]) && (
                        <div className="absolute inset-0 bg-[var(--color-dark-opacity60)] rounded-lg flex items-center justify-center z-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-opacity100)]"></div>
                        </div>
                      )}
                    </div>
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