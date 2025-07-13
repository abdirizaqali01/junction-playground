'use client'
import * as React from "react"
import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'
import * as style from '@/styles/design-system'
import { initializeCSSVariables } from '@/styles/design-system'
import Image from 'next/image'
import { MainButton } from "@/components/attachables/main-button"

// Interface definitions
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
  type: string
  tags?: string[] // Optional array of tags
  category?: string // Optional category
}

interface EventCardProps {
  event: Event
  index: number
  onEventClick?: (eventId: number) => void
  onRegister?: (eventId: number) => void
  setSelectedEventId?: (eventId: number) => void
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PUBLISHED':
      return 'bg-[var(--color-light-opacity100)] text-[var(--color-dark-opacity100)] border-[var(--color-light-opacity100)]'
    case 'ONGOING':
      return 'bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] border-[var(--color-primary-opacity100)]'
    case 'CANCELLED':
      return 'bg-[var(--color-alerts-opacity100)] text-[var(--color-light-opacity100)] border-[var(--color-alerts-opacity100)]'
    default:
      return 'bg-[var(--color-light-opacity10)] text-[var(--color-white-opacity100)] border-[var(--color-light-opacity60)]'
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

// Helper function to check if event is active (from first component logic)
const isEventActive = (startDate: string, status: string) => {
  if (status === 'CANCELLED') return false
  try {
    const eventDate = new Date(startDate)
    const now = new Date()
    return eventDate > now || status === 'ONGOING'
  } catch {
    return false
  }
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  index, 
  onEventClick, 
  onRegister, 
  setSelectedEventId 
}) => {
  
  useEffect(() => {
    initializeCSSVariables()
  }, [])

  // Handle card click - uses both setSelectedEventId and onEventClick for flexibility
  const handleCardClick = () => {
    if (setSelectedEventId) {
      setSelectedEventId(event.event_id)
    }
    if (onEventClick) {
      onEventClick(event.event_id)
    }
  }

  // Handle registration logic from first component
  const handleRegistration = (eventId: number) => {
    if (onRegister) {
      onRegister(eventId)
    }
  }

  // Handle view event logic
  const handleViewEvent = () => {
    if (setSelectedEventId) {
      setSelectedEventId(event.event_id)
    }
    if (onEventClick) {
      onEventClick(event.event_id)
    }
  }

  return (
    <div
      className={style.box.gray.bottom + " overflow-hidden group hover:border-neutral-600 transition-all cursor-pointer flex flex-col w-full h-full"}
      onClick={handleCardClick}
    >
      {/* Event Image */}
      <div className="relative h-40 bg-neutral-800 overflow-hidden">
        <img
          src={event.cover_image_url || getPlaceholderImage(index)}
          alt={event.name || "Event"}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />

        <span
          className={`absolute z-99 top-3 left-3 px-2 py-1 text-xs font-space-mono rounded border ${getStatusColor(event.status)}`}>
          {event.status || "Status TBD"}
        </span>
      </div>

      {/* Event Details */}
      <div className="px-4 pt-5 pb-4 flex flex-col flex-1">
        <div className="space-y-3 mb-4 flex-1 flex flex-col">
          <div className="h-23 flex-shrink-0">
            {/* Fixed height title container */}
            <div className="mb-2 overflow-hidden">
              <h3 className={`text-[var(--color-light-opacity100)] text-xl font-semibold leading-tight ${style.font.grotesk.main} line-clamp-2`}>
                {event.name || "Event Name TBA"}
              </h3>
            </div>

            {/* Tags Row - Dynamic tags based on event data */}
            <div className="flex flex-wrap gap-1">
              <span className={style.tag.main}>
                {event.is_public ? "Public" : "Private"}
              </span>
              {event.category && (
                <span className={style.tag.main}>
                  {event.category}
                </span>
              )}
              {event.tags && event.tags.length > 0 && 
                event.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span key={tagIndex} className={style.tag.main}>
                    {tag}
                  </span>
                ))
              }
              {/* Fallback tags if no tags are provided */}
              {(!event.tags || event.tags.length === 0) && !event.category && (
                <span className={style.tag.main}>
                  Category TBD
                </span>
              )}
            </div>
          </div>

          <div className="pt-2 pb-4 flex-1 flex flex-col justify-between">
            <div className="flex items-center space-x-2 py-1">
              <Image src="/icons/calendar_check.svg" alt="Calendar Check" width={20} height={20} />
              <span className={style.font.grotesk.light + " text-[var(--color-white-opacity70)] text-sm"}>
                {formatDate(event.start_date)}
              </span>
            </div>

            <div className="flex items-center space-x-2 py-1">
              <Image src="/icons/Map.svg" alt="Map" width={20} height={20} />
              <span className={style.font.grotesk.light + " text-[var(--color-white-opacity70)] text-sm"}>
                {event.location || "Location TBD"}
              </span>
            </div>

            <div className="flex items-center space-x-2 py-1">
              <Image src="/icons/Globe.svg" alt="Globe" width={20} height={20} />
              <span className={style.font.grotesk.light + " text-[var(--color-white-opacity70)] text-sm"}>
                {event.type || "Hackathon"}
              </span>
            </div>
          </div>

          {/* Buttons - Updated with first component logic */}
          <div className="flex space-x-2 mb-2">
            <MainButton 
              className="flex-1 text-center" 
              variant="default" 
              showIcon={false} 
              size="default" 
              onClick={(e) => {
                e.stopPropagation()
                handleViewEvent()
              }}
            >
              View event
            </MainButton>
            <MainButton 
              className="flex-1 text-center" 
              variant={event.status === 'CANCELLED' ? 'gray' : !isEventActive(event.start_date, event.status) ? 'gray' : 'primary'} 
              showIcon={false} 
              size="default" 
              disabled={event.status === 'CANCELLED' || !isEventActive(event.start_date, event.status)}
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
        </div>

        {/* End Date - Fixed at bottom */}
        <div className={style.font.grotesk.light + " flex items-center justify-center space-x-1 text-sm text-[var(--color-white-opacity60)] mt-auto"}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
          <span>Ends {formatDate(event.end_date)}</span>
        </div>
      </div>
    </div>
  )
}

// Export the Event interface for use in other components
export type { Event }