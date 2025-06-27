'use client'

import { Footer } from "@/components/footer"
import Navbar from "@/components/navi"
import React, { useState, useEffect } from 'react'
import { useEvents } from '@/app/hooks/useApi.js'

export default function EventsListingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Events')
  
  // Use the custom hook - much simpler!
  const { data: events, loading, error } = useEvents()

  const tabs = ['Dashboard', 'Events', 'Community']

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return 'Date TBD'
    }
  }

  // Helper function to check if event is active (upcoming or ongoing)
  const isEventActive = (startDate, status) => {
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
  const getStatusColor = (status) => {
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

  // Helper function to get placeholder image
  const getPlaceholderImage = (index) => {
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
      return new Date(a.start_date) - new Date(b.start_date)
    })

    // Sort past events by start date (most recent first)
    pastEvents.sort((a, b) => {
      if (!a.start_date) return 1
      if (!b.start_date) return -1
      return new Date(b.start_date) - new Date(a.start_date)
    })

    return { activeEvents, pastEvents }
  }

  const { activeEvents, pastEvents } = processEvents()

  // Event card component
  const EventCard = ({ event, index }) => (
    <div className="bg-neutral-900/60 border border-neutral-700/50 rounded-lg overflow-hidden group hover:border-neutral-600 transition-all cursor-pointer flex-shrink-0 w-80">
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
          <div className="pb-[]">
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

          <div className="py-[4%]">
            <div className="flex items-center space-x-2 py-[1%]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className="text-gray-300 text-xs">{formatDate(event.start_date)}</span>
            </div>
            <div className="flex items-center space-x-2 py-[1%]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-gray-300 text-xs">{event.location || 'Location TBD'}</span>
            </div>
            <div className="flex items-center space-x-2 py-[1%]">
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
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
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
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading events: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header using Navbar component */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {/* Content */}
      <div className="flex justify-center">
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
                    <EventCard key={event.event_id || event.id || index} event={event} index={index} />
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
                    <EventCard key={event.event_id || event.id || index} event={event} index={index + activeEvents.length} />
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