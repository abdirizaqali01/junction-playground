'use client'
import * as React from "react"
import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'
import * as style from '@/styles/design-system'
import { initializeCSSVariables } from '@/styles/design-system'

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
}

interface EventCardProps {
  event: Event
  index: number
  onEventClick?: (eventId: number) => void
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
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'ONGOING':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'CANCELLED':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    default:
      return 'bg-neutral-800/80 text-gray-200 border-neutral-600/30'
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

export const EventCard: React.FC<EventCardProps> = ({ event, index, onEventClick }) => {
  const handleCardClick = () => {
    if (onEventClick) {
      onEventClick(event.event_id)
    }
  }

  useEffect(() => {
      initializeCSSVariables()
    }, [])

  return (
    <div
      className={style.box.gray.bottom + " overflow-hidden group hover:border-neutral-600 transition-all cursor-pointer flex flex-col w-full"}
      onClick={handleCardClick}
    >
      {/* Event Image */}
      <div className="relative h-40 bg-neutral-800 overflow-hidden">
        <img
          src={event.cover_image_url || getPlaceholderImage(index)}
          alt={event.name || "Event"}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>

      {/* Event Details */}
      <div className="p-4">
        <div className="space-y-3 mb-4">
          <div className="pb-2">
            <h3 className={`text-white text-lg font-semibold mb-2 ${style.font.grotesk.main}`}>
              {event.name || "Event Name TBD"}
            </h3>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-1">
              <span
                className={`px-2 py-1 text-xs font-[var(${style.spaceMono.variable})] rounded border ${getStatusColor(
                  event.status
                )}`}
              >
                {event.status || "Status TBD"}
              </span>
              <span className={`px-2 py-1 bg-neutral-800/80 text-gray-200 text-xs rounded border border-neutral-600/30 font-[var(${style.spaceMono.variable})]`}>
                {event.is_public ? "Public" : "Private"}
              </span>
              <span className={`px-2 py-1 bg-neutral-800/80 text-gray-200 text-xs rounded border border-neutral-600/30 font-[var(${style.spaceMono.variable})]`}>
                Hackathon
              </span>
            </div>
          </div>

          <div className="py-2">
            <div className="flex items-center space-x-2 py-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className={`text-gray-300 text-xs font-[var(${style.spaceMono.variable})]`}>
                {formatDate(event.start_date)}
              </span>
            </div>

            <div className="flex items-center space-x-2 py-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className={`text-gray-300 text-xs font-[var(${style.spaceMono.variable})]`}>
                {event.location || "Location TBD"}
              </span>
            </div>

            <div className="flex items-center space-x-2 py-1">
              <Globe size={14} className="text-gray-400" />
              <span className={`text-gray-300 text-xs font-[var(${style.spaceMono.variable})]`}>
                {event.type || "Type TBD"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-2 mb-3">
            <button
              className={`flex-1 px-3 py-4 bg-white text-black text-sm rounded hover:bg-gray-100 transition-colors font-[var(${style.spaceMono.variable})]`}
              onClick={(e) => e.stopPropagation()}
            >
              View event
            </button>
            <button
              className={`flex-1 px-3 py-4 text-sm rounded transition-colors font-[var(${style.spaceMono.variable})] ${
                event.status === "CANCELLED"
                  ? "bg-gray-500/50 text-gray-400 cursor-not-allowed"
                  : "bg-[#55D186] text-white hover:bg-green-600"
              }`}
              disabled={event.status === "CANCELLED"}
              onClick={(e) => e.stopPropagation()}
            >
              {event.status === "CANCELLED" ? "Cancelled" : "Register now"}
            </button>
          </div>

          {/* End Date */}
          <div className={`flex items-center justify-center space-x-1 text-gray-400 text-xs font-[var(${style.spaceMono.variable})]`}>
            <svg
              width="12"
              height="12"
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
    </div>
  )
}

// Export the Event interface for use in other components
export type { Event }