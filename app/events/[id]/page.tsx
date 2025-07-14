'use client'

import { useRouter, useParams } from 'next/navigation'
import { initializeCSSVariables } from '@/styles/design-system'
import { MainButton } from '@/components/attachables/main-button'
import React, { useState, useEffect } from 'react'
import { Footer } from "@/components/footer"
import Navbar from '@/components/navi'
import * as style from '@/styles/design-system'

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

// Challenge Card component
const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className={`bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] ${style.border.radius.middle} overflow-hidden p-2`}>
      <div className="flex">
        {/* Left side - CO badge - darker */}
        <div className={`w-1/4 bg-[var(--color-dark-opacity50)] flex items-center justify-center border border-[var(--color-white-opacity10)] ${style.border.radius.inner} flex-shrink-0`}>
          <div className="text-[var(--color-light-opacity60)] text-6xl font-bold font-space-grotesk">CO</div>
        </div>
        
        {/* Right side - Content */}
        <div className="w-3/4 p-6 flex flex-col justify-between">
          <div>
            <h3 className={`${style.font.grotesk.medium} text-[var(--color-primary-opacity100)] text-[1.4rem] mb-2`}>
              {challenge.name || 'Sustainable Generative AI Assistant For Insights'}
            </h3>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={style.tag.main}>AI</span>
              <span className={style.tag.main}>Machine Learning</span>
              <span className={style.tag.main}>Data Science</span>
            </div>
            
            {/* Section Header */}
            <h4 className={`${style.font.grotesk.medium} text-[var(--color-light-opacity100)] text-[1.1rem] mb-2`}>Insight</h4>
            
            {/* Description */}
            <p className={`${style.font.mono.text} text-[var(--color-white-opacity50)] text-[0.9rem] mb-2`}>
              {isExpanded 
                ? (challenge.description || `Description of Challenge... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia...`)
                : `${(challenge.description || 'Description of Challenge... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores').slice(0, 120)}...`
              }
            </p>
          </div>
          
          {/* Expand/Collapse Button */}
          <button onClick={() => setIsExpanded(!isExpanded)} className="self-start text-[0.9rem] text-[var(--color-primary-opacity100)] hover:text-[var(--color-primary-opacity60)]">
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = parseInt(params.id as string)
  
  const [activeTab, setActiveTab] = useState('Events')
  const [event, setEvent] = useState<Event | null>(null)
  const [allEvents, setAllEvents] = useState<Event[]>([]) // For similar events
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showChallengesPopup, setShowChallengesPopup] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  

  // Initialize design system CSS variables
  useEffect(() => {
    initializeCSSVariables()
  }, [])

  // Fetch event data and challenges
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all events first (matching your original approach)
        const eventsResponse = await fetch('/api/proxy/events', {
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`)
        }
        
        const eventsData = await eventsResponse.json()
        const eventsArray = Array.isArray(eventsData) ? eventsData : [eventsData]
        setAllEvents(eventsArray)
        
        // Find the specific event
        const selectedEvent = eventsArray.find((e: Event) => e.event_id === eventId)
        if (selectedEvent) {
          setEvent(selectedEvent)
        }

        // Fetch challenges for each event (matching your original approach)
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
        setError(err instanceof Error ? err.message : 'Failed to fetch event data')
      } finally {
        setLoading(false)
      }
    }

    if (eventId) {
      fetchEventData()
    }
  }, [eventId])
  
  const getEventChallenges = (eventId: number) => {
    return challenges.filter(challenge => challenge.event_id === eventId)
  }

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="pt-20 flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary-opacity100)] mx-auto mb-4"></div>
            <p className="text-[var(--color-light-opacity60)]">Loading event...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Error state
  if (error || !event) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="pt-20 flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-[var(--color-alerts-opacity100)] mb-4">
              {error || 'Event not found'}
            </p>
            <MainButton 
              variant="primary"
              onClick={() => router.push('/events')}
              className="justify-center"
              showIcon={false}
            >
              Back to Events
            </MainButton>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Get similar events (exclude current event)
  const similarEvents = allEvents.filter(e => e.event_id !== eventId).slice(0, 2)
  const eventChallenges = getEventChallenges(eventId)

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk">
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
              onClick={() => router.push('/events')}
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
                    src={event.cover_image_url || getPlaceholderImage(0)}
                    alt={event.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-dark-opacity100)]/80 to-transparent p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-[var(--color-light-opacity100)] font-space-grotesk">{event.name}</h1>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                      {event.status || 'LIVE'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-6 text-[var(--color-light-opacity60)] text-sm font-space-grotesk">
                    <span className="flex items-center space-x-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>{formatDate(event.start_date)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{event.location || 'Location pending'}</span>
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
                <h2 className="text-xl font-semibold text-[var(--color-light-opacity100)] mb-4 font-space-grotesk">About</h2>
                <p className="text-[var(--color-light-opacity60)] text-sm leading-relaxed font-space-grotesk">
                  {event.description || 'Join us for one of the most anticipated hackathon adventures where epic talents convene and brilliant minds unite. Experience the ultimate hackathon where innovation meets creativity and where great ideas come to life. Our event brings together the brightest minds in technology, design, and entrepreneurship for an unforgettable experience.'}
                </p>
              </div>

              {/* Schedule Section */}
              <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk">Schedule</h2>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-4 border-b border-[var(--color-white-opacity10)] last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <span className="text-[var(--color-light-opacity60)] text-sm w-12 font-space-grotesk">Day 1</span>
                      <span className="text-[var(--color-light-opacity100)] text-sm font-medium font-space-grotesk">Hackathon Announcement & Building</span>
                    </div>
                    <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">10:00 - 18:00</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-[var(--color-light-opacity60)] text-sm w-12 font-space-grotesk">Day 3</span>
                      <span className="text-[var(--color-light-opacity100)] text-sm font-medium font-space-grotesk">Final Submissions & Pitches</span>
                    </div>
                    <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">10:00 - 18:00</span>
                  </div>
                </div>
              </div>

              {/* Challenges Section */}
              <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-[var(--color-light-opacity100)] font-space-grotesk">Challenges</h2>
                </div>
                
                {challenges.length > 0 ? (
                  <div className="space-y-4">
                    {/* Preview one challenge */}
                    <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg overflow-hidden">
                      <div className="flex items-center">
                        {/* Left side - CO badge */}
                        <div className="w-16 h-16 bg-[var(--color-white-opacity10)] flex items-center justify-center border-r border-[var(--color-white-opacity10)] flex-shrink-0 m-4">
                          <div className="text-[var(--color-light-opacity60)] text-xl font-bold font-space-grotesk">CO</div>
                        </div>
                        
                        {/* Right side - Just title */}
                        <div className="flex-1 p-4">
                          <h3 className="text-[var(--color-light-opacity100)] text-lg font-medium font-space-grotesk">
                            {challenges[0].name || 'Sustainable Generative AI Assistant For Insights'}
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
                <h2 className="text-xl font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk">Prizes</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 p-4 bg-[var(--color-primary-opacity20)] border border-[var(--color-primary-opacity40)] rounded-lg">
                    <div className="w-8 h-8 bg-[var(--color-primary-opacity100)] rounded-full flex items-center justify-center">
                      <span className="text-[var(--color-light-opacity100)] text-sm font-bold">1</span>
                    </div>
                    <div>
                      <div className="text-[var(--color-light-opacity100)] font-medium text-sm font-space-grotesk">1st Place</div>
                      <div className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Prize information pending</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity20)] rounded-lg">
                    <div className="w-8 h-8 bg-[var(--color-white-opacity30)] rounded-full flex items-center justify-center">
                      <span className="text-[var(--color-light-opacity100)] text-sm font-bold">2</span>
                    </div>
                    <div>
                      <div className="text-[var(--color-light-opacity100)] font-medium text-sm font-space-grotesk">2nd Place</div>
                      <div className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Prize information pending</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity20)] rounded-lg">
                    <div className="w-8 h-8 bg-[var(--color-white-opacity30)] rounded-full flex items-center justify-center">
                      <span className="text-[var(--color-light-opacity100)] text-sm font-bold">3</span>
                    </div>
                    <div>
                      <div className="text-[var(--color-light-opacity100)] font-medium text-sm font-space-grotesk">3rd Place</div>
                      <div className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Prize information pending</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar - Right 1/3 */}
            <div className="space-y-6">
              
              {/* Registration Card */}
              <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk">Registration</h3>
                
                {!isRegistered ? (
                  // Unregistered State
                  <>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Status</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor('PUBLISHED')}`}>Open</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Deadline</span>
                        <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk">{formatDate(event.end_date) || 'Information pending'}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Participants</span>
                        <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk">Information pending</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Team Size</span>
                        <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk">1-4 People</span>
                      </div>
                    </div>
                    
                    <MainButton 
                      variant="primary"
                      className="w-full justify-center"
                      showIcon={false}
                      onClick={() => handleRegistration(event.event_id)}
                    >
                      Register now
                    </MainButton>
                  </>
                ) : (
                  // Registered State
                  <>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Status</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor('PUBLISHED')}`}>Open</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Deadline</span>
                        <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk">May 30, 2025</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Participants</span>
                        <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk">1,478 Registered</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk">Team Size</span>
                        <span className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk">1-4 People</span>
                      </div>
                    </div>

                    {/* Registration ends info with clock icon */}
                    <div className="flex items-center justify-center space-x-2 text-[var(--color-light-opacity60)] text-sm mb-4 font-space-grotesk">
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
                      onClick={() => router.push(`/events/${eventId}/idpage`)}
                    >
                      Event ID
                    </MainButton>
                      <MainButton 
                        variant="outlineGreen"
                        className="w-full justify-center"
                        showIcon={false}
                        onClick={() => router.push(`/events/${eventId}/dash`)}
                      >
                        Event Dashboard
                      </MainButton>
                    </div>
                  </>
                )}
              </div>

              {/* Sponsors Card */}
              <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk">Sponsors</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="h-14 bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity20)] rounded-lg flex items-center justify-center">
                      <span className="text-[var(--color-light-opacity60)] text-xs font-space-grotesk">Company {i}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organizers Card */}
              <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk">Organizers</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[var(--color-primary-opacity100)] rounded-full flex items-center justify-center">
                      <span className="text-[var(--color-light-opacity100)] text-sm font-bold">A</span>
                    </div>
                    <div>
                      <div className="text-[var(--color-light-opacity100)] text-sm font-medium font-space-grotesk">Junction Organizing</div>
                      <div className="text-[var(--color-light-opacity60)] text-xs font-space-grotesk">Team Organizer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Similar Events Section - Full Width */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-[var(--color-light-opacity100)] mb-6 font-space-grotesk">Similar Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarEvents.map((similarEvent, index) => (
                  <div key={similarEvent.event_id} className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity10)] rounded-lg overflow-hidden group hover:border-[var(--color-white-opacity20)] transition-all cursor-pointer"
                        onClick={() => router.push(`/events/${similarEvent.event_id}`)}>
                    <div className="relative h-48 bg-[var(--color-white-opacity10)] overflow-hidden">
                      <img 
                        src={similarEvent.cover_image_url || getPlaceholderImage(index)}
                        alt={similarEvent.name}
                        className="w-full h-full object-cover grayscale"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-dark-opacity100)]/90 to-transparent p-4">
                        <h3 className="text-[var(--color-light-opacity100)] text-lg font-bold mb-2 font-space-grotesk">{similarEvent.name}</h3>
                        <div className="flex items-center space-x-4 text-[var(--color-light-opacity60)] text-xs mb-3 font-space-grotesk">
                          <span className="flex items-center space-x-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span>{formatDate(similarEvent.start_date)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span>{similarEvent.location || 'Location'}</span>
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
                          <span className="px-2 py-1 bg-[var(--color-white-opacity20)] text-[var(--color-light-opacity60)] text-xs rounded-full font-space-grotesk">AI</span>
                          <span className="px-2 py-1 bg-[var(--color-white-opacity20)] text-[var(--color-light-opacity60)] text-xs rounded-full font-space-grotesk">Machine Learning</span>
                          <span className="px-2 py-1 bg-[var(--color-white-opacity20)] text-[var(--color-light-opacity60)] text-xs rounded-full font-space-grotesk">Innovation</span>
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
                            handleRegistration(similarEvent.event_id)
                          }}
                        >
                          Register now
                        </MainButton>
                        <div className="flex items-center space-x-1 text-[var(--color-light-opacity60)] text-xs font-space-grotesk">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                          </svg>
                          <span>Registration ends {formatDate(similarEvent.end_date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
      
      {/*--------------- Challenges Popup ---------------*/}
      {showChallengesPopup && (
        <>
          {/* Blur overlay for entire screen */}
          <div className="fixed inset-0 bg-neutral-800/80 backdrop-blur-sm z-40" />
          
          {/* Popup Window */}
          <div className="fixed inset-0 top-20 z-50 flex items-start justify-center pt-8">
            <div className={`bg-neutral-900 border border-neutral-700 ${style.border.radius.outer} w-full max-w-6xl mx-4 max-h-[calc(100vh-120px)] overflow-hidden px-8 py-6`}>
              {/* Window Header */}
              <div className="flex items-center justify-between">
                <h2 className={style.font.grotesk.main + " text-[2rem]"}>Challenges</h2>
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
              <div className="overflow-y-auto max-h-[calc(100vh-200px)] mt-6">
                {challenges.length > 0 ? (
                  <div className="space-y-6">
                    {challenges.map((challenge) => (
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