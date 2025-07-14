'use client'

import { useRouter } from 'next/navigation'
import { MainButton } from '@/components/attachables/main-button'
import React, { useState, useEffect } from 'react'
import { Footer } from "@/components/footer"
import Navbar from '@/components/navi'
import * as style from '@/styles/design-system'
import { initializeCSSVariables } from '@/styles/design-system'
import { EventCard, Event } from '@/components/event-card' // Updated import path to match your current code

export default function EventsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Events')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Initialize design system CSS variables
  useEffect(() => {
    initializeCSSVariables()
  }, [])

  // Fetch events (simplified - no challenges or selectedEventId logic)
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

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk">
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

      {/* Content */}
      <div className="flex justify-center pt-0">
        <div className="w-[95%] lg:w-[80%] mx-auto pt-[150px]">
          
          {/* Search Bar - Centered */}
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-[var(--color-white-opacity20)] text-sm rounded-md bg-[var(--color-white-opacity5)] text-[var(--color-light-opacity100)] placeholder-[var(--color-light-opacity60)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-opacity100)] focus:border-transparent text-left"
              />
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
                    <div key={event.event_id || index}>
                      <EventCard 
                        event={event} 
                        index={index}
                        onEventClick={(eventId) => router.push(`/events/${eventId}`)}
                        onRegister={handleRegistration}
                      />
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
                    <div key={event.event_id || index}>
                      <EventCard 
                        event={event} 
                        index={index}
                        onEventClick={(eventId) => router.push(`/events/${eventId}`)}
                        onRegister={handleRegistration}
                      />
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