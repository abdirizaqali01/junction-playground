'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Footer } from '@/components/footer'
import Sidebar from '@/components/sidebar'
import { 
  initializeCSSVariables, 
  colors, 
  font, 
  box, 
  border 
} from '@/styles/design-system'

// Types
interface Event {
  event_id?: string | number
  id?: string | number
  name?: string
  title?: string
  event_name?: string
}

export default function EventIdPage() {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const router = useRouter()

  // User profile data
  const userProfile = {
    name: 'Junction Hack',
    email: 'ju@hackjunction.com',
    initials: 'JU',
    avatarColor: 'bg-green-600'
  }

  // Initialize design system variables
  useEffect(() => {
    initializeCSSVariables();
  }, []);

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const eventId = params?.id as string
        
        if (!eventId) {
          throw new Error('No event ID found in URL')
        }
        
        const response = await fetch(`/api/proxy/events/${eventId}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch event: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        setEvent(data)
        
      } catch (err) {
        console.error('Error fetching event:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        // Fallback event name
        setEvent({ name: 'Junction Hackathon' })
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params?.id])
  
  const handleBackToHome = () => {
    router.push('/dash')
  }

  // Helper function to get event name
  const getEventName = (event: Event | null): string => {
    if (!event) return 'Loading...'
    return event.name || event.title || event.event_name || 'Hackathon'
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
        {/* Main Content Area */}
        <div className="flex-1 p-8 pt-6 flex flex-col min-h-0">
          {/* Error Display */}
          {error && !event && (
            <div className="mb-4 p-3 bg-[var(--color-alerts-opacity10)] border border-[var(--color-alerts-opacity40)] rounded-[10px] text-[var(--color-alerts-opacity100)] text-sm">
              Error loading event: {error}
            </div>
          )}

          {/* ID Card - Full Width */}
          <div className="flex items-center justify-center h-full">
            <div className={`${box.gray.bottom} p-12 text-center w-full max-w-2xl`}>
              {/* Page Title and Description inside card */}
              <h1 className={`text-4xl ${font.grotesk.heavy} text-[var(--color-light-opacity100)] mb-4`}>
                {getEventName(event)} ID Page
              </h1>
              <p className={`text-[var(--color-light-opacity60)] text-lg leading-relaxed mb-12 ${font.grotesk.light}`}>
                This is your {getEventName(event)} QR code. Use it to get access to the event venue.
              </p>
              
              {/* QR Code */}
              <div className="bg-[var(--color-light-opacity100)] rounded-lg p-6 mb-6 inline-block">
                <div className="w-64 h-64 bg-[var(--color-dark-opacity100)] rounded-lg flex items-center justify-center">
                  {/* QR Code Pattern */}
                  <svg width="240" height="240" viewBox="0 0 240 240" className="text-[var(--color-dark-opacity100)]">
                    {/* Corner squares */}
                    <rect x="0" y="0" width="60" height="60" fill="currentColor"/>
                    <rect x="10" y="10" width="40" height="40" fill="white"/>
                    <rect x="20" y="20" width="20" height="20" fill="currentColor"/>
                    
                    <rect x="180" y="0" width="60" height="60" fill="currentColor"/>
                    <rect x="190" y="10" width="40" height="40" fill="white"/>
                    <rect x="200" y="20" width="20" height="20" fill="currentColor"/>
                    
                    <rect x="0" y="180" width="60" height="60" fill="currentColor"/>
                    <rect x="10" y="190" width="40" height="40" fill="white"/>
                    <rect x="20" y="200" width="20" height="20" fill="currentColor"/>
                    
                    {/* Random pattern blocks to simulate QR code */}
                    <rect x="80" y="10" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="10" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="10" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="10" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="80" y="30" width="10" height="10" fill="currentColor"/>
                    <rect x="110" y="30" width="10" height="10" fill="currentColor"/>
                    <rect x="140" y="30" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="90" y="50" width="10" height="10" fill="currentColor"/>
                    <rect x="120" y="50" width="10" height="10" fill="currentColor"/>
                    <rect x="160" y="50" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="10" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="30" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="50" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="80" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="180" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="200" y="80" width="10" height="10" fill="currentColor"/>
                    <rect x="220" y="80" width="10" height="10" fill="currentColor"/>
                    
                    {/* More random blocks */}
                    <rect x="20" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="60" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="90" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="110" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="140" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="170" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="190" y="100" width="10" height="10" fill="currentColor"/>
                    <rect x="210" y="100" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="10" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="40" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="70" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="120" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="120" width="10" height="10" fill="currentColor"/>
                    <rect x="180" y="120" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="30" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="80" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="110" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="160" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="200" y="140" width="10" height="10" fill="currentColor"/>
                    <rect x="220" y="140" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="80" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="180" y="160" width="10" height="10" fill="currentColor"/>
                    <rect x="210" y="160" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="80" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="100" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="130" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="170" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="200" y="190" width="10" height="10" fill="currentColor"/>
                    <rect x="220" y="190" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="90" y="210" width="10" height="10" fill="currentColor"/>
                    <rect x="110" y="210" width="10" height="10" fill="currentColor"/>
                    <rect x="140" y="210" width="10" height="10" fill="currentColor"/>
                    <rect x="160" y="210" width="10" height="10" fill="currentColor"/>
                    <rect x="190" y="210" width="10" height="10" fill="currentColor"/>
                    
                    <rect x="80" y="230" width="10" height="10" fill="currentColor"/>
                    <rect x="120" y="230" width="10" height="10" fill="currentColor"/>
                    <rect x="150" y="230" width="10" height="10" fill="currentColor"/>
                    <rect x="180" y="230" width="10" height="10" fill="currentColor"/>
                    <rect x="210" y="230" width="10" height="10" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              
              {/* Unique ID */}
              <p className={`text-[var(--color-light-opacity40)] text-xs mb-8 ${font.mono.text}`}>
                Unique ID: 23049882406820948850
              </p>
              
              {/* User Details */}
              <div className="space-y-2 text-left max-w-sm mx-auto">
                <div className={`text-[var(--color-light-opacity100)] ${font.grotesk.main} text-lg`}>John Smith</div>
                <div className={`text-[var(--color-light-opacity60)] ${font.grotesk.light}`}>Email address</div>
                <div className={`text-[var(--color-light-opacity60)] ${font.grotesk.light}`}>Github ID</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}