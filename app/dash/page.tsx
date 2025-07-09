'use client'
import * as React from "react"
import { useRouter } from 'next/navigation' 
import { useState, useEffect } from 'react'
import { Footer } from "@/components/footer"
import Navbar from '@/components/navi'
import * as style from '@/styles/design-system'
import { initializeCSSVariables } from '@/styles/design-system';
import Image from 'next/image';
import { MainButton } from "@/components/attachables/main-button"

import { Globe, CalendarCheck, ChevronsLeftRight, Clock, Star, Users} from 'lucide-react';

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

// Sample event data for demonstration
const sampleEvent: Event = {
  event_id: 1,
  name: 'Sample Event',
  slug: 'sample-event',
  status: 'PUBLISHED',
  start_date: '2024-12-01T10:00:00Z',
  end_date: '2024-12-03T18:00:00Z',
  location: 'Helsinki, Finland',
  description: 'A sample event for demonstration',
  type: 'Type of event',
  cover_image_url: '',
  is_public: true,
  created_at: '2024-11-01T00:00:00Z',
  updated_at: '2024-11-01T00:00:00Z'
}

export default function JunctionDashboard() {
  {/*----------- STYLE VARIABILIZATION -----------*/}
  const router = useRouter()
  useEffect(() => {
    initializeCSSVariables();
  }, []);
  
  const [activeTab, setActiveTab] = useState('Dashboard')


  {/*------------- STATIC COMPONENT Event Card -------------*/}
  const EventCard = ({ event, index }: { event: Event; index: number }) => (
    <div
      className="bg-neutral-900/60 border border-neutral-700/50 rounded-xl overflow-hidden group hover:border-neutral-600 transition-all cursor-pointer flex flex-col w-full"
      onClick={() => setSelectedEventId(event.event_id)}
    >
      {/* STATIC COMPONENT Event Image */}
      <div className="relative h-40 bg-neutral-800 overflow-hidden">
        <img
          src={event.cover_image_url || getPlaceholderImage(index)}
          alt={event.name || "Event"}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
  
      {/* STATIC COMPONENT Event Details */}
      <div className="p-4">
        <div className="space-y-3 mb-4">
          <div className="pb-2">
            <h3 className="text-white text-lg ${spaceGrotesk.variable} font-semibold mb-2">
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
              <span className="px-2 py-1 bg-neutral-800/80 '${spaceMono.variable}' text-gray-200 text-xs rounded border border-neutral-600/30">
                {event.is_public ? "Public" : "Private"}
              </span>
              <span className="px-2 py-1 bg-neutral-800/80 '${spaceMono.variable}' text-gray-200 text-xs rounded border border-neutral-600/30">
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
              <span className="text-gray-300 text-xs '${spaceMono.variable}'">
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
              <span className="text-gray-300 text-xs '${spaceMono.variable}'">
                {event.location || "Location TBD"}
              </span>
            </div>
  
            <div className="flex items-center space-x-2 py-1">
              <Globe size={14} className="text-gray-400" />
              <span className="text-gray-300 text-xs '${spaceMono.variable}'">
                {event.type || "Type TBD"}
              </span>
            </div>
          </div>
  
          {/* Buttons */}
          <div className="flex space-x-2 mb-3">
            <button
              className="flex-1 px-3 py-4 bg-white text-black text-sm '${spaceMono.variable}' rounded hover:bg-gray-100 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View event
            </button>
            <button
              className={`flex-1 px-3 py-4 text-sm 'font-[var(${style.spaceMono.variable})]}' rounded transition-colors ${
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
          <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs '${spaceMono.variable}'">
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
  );

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)]">
      {/* Use the imported Navbar component with required props */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/*--------------------------------------------------------------------------------*/}
      {/* MAIN CONTENT */}
      {/*--------------------------------------------------------------------------------*/}
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
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Junction Hackathon Venue" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* Ongoing Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={style.status.greenLight}>
                      Ongoing
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Right Content */}
              <div className="lg:w-2/3 m-auto">
                {/* Header with Title and Enter Button */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className={style.font.grotesk.main + " text-3xl text-[var(--color-light-opacity100)] text-wrap mb-2 mr-3"}>Junction Hackathon</h1>
                    
                    {/* Information */}
                    <div className="flex items-center space-x-8 text-sm text-[var(--color-white-opacity60)]">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>2 Day 12 hours 45min Left</span>
                      </div>
                      <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-400" />
                        <span>139 Teams</span>
                      </div>
                    </div>
                  </div>
                  
                  <MainButton variant="default" size="default">Enter Event</MainButton>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                  {/* Up Coming Deadlines */}
                  <div className={style.box.gray.middle + " p-4"}>
                    <h2 className={style.font.grotesk.main + " text-[var(--color-light-opacity100)] text-lg mb-4"}>Up Coming Deadlines</h2>
                    <hr className="border-[var(--color-white-opacity30)] mb-2" />
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center py-1">
                        <span className={style.font.grotesk.medium + " text-[var(--color-light-opacity100)] text-[1rem]"}>Team Set</span>
                        <span className={style.font.mono.text + " text-[var(--color-light-opacity50)] text-[0.9rem]"}>Today at 17:00</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className={style.font.grotesk.medium + " text-[var(--color-light-opacity100)] text-[1rem]"}>Project Draft</span>
                        <span className={style.font.mono.text + " text-[var(--color-light-opacity50)] text-[0.9rem]"}>Tomorrow at 21:00</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className={style.font.grotesk.medium + " text-[var(--color-light-opacity100)] text-[1rem]"}>Final Submission</span>
                        <span className={style.font.mono.text + " text-[var(--color-light-opacity50)] text-[0.9rem]"}>23rd of November at 21:00</span>
                      </div>
                    </div>
                  </div>

                  {/* Announcements */}
                  <div className={style.box.gray.top + " p-4"}>
                    <h2 className={style.font.grotesk.main + "text-white font-bold text-lg mb-4"}>Announcements</h2>
                    <hr className="border-[var(--color-white-opacity30)] mb-2" />
                    <p className={style.font.mono.text + " text-[var(--color-light-opacity50)] text-[0.9rem] mt-4 py-1"}>Most recent announcements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*------------------------------------------ Your Stats Section ------------------------------------------*/}
        <section className={style.sectionGap.top}>
          <h2 className={style.sectionTitle.grotesk}>Your Stats</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className={style.box.grayPrimary + " p-4 flex flex-col text-left"}>
              <div className="border border-[var(--color-white-opacity20)] rounded-[3px] p-7 flex flex-col text-left h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/icons/calendar_check.svg" alt="Calendar Check"width={22}height={22} />
                  <div className="text-[var(--color-white-opacity60)] text-sm">Events Joined</div>
                </div>
                <div className="text-[var(--color-light-opacity100)] text-2xl font-bold">12</div>
              </div>
            </div>

            <div className={style.box.grayPrimary + " p-4 flex flex-col text-left"}>
              <div className="border border-[var(--color-white-opacity20)] rounded-[3px] p-7 flex flex-col text-left h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/icons/Code.svg" alt="Calendar Check"width={22}height={22} />
                  <div className="text-[var(--color-white-opacity60)] text-sm">Projects Built</div>
                </div>
                <div className="text-[var(--color-light-opacity100)] text-2xl font-bold">10</div>
              </div>
            </div>

            <div className={style.box.grayPrimary + " p-4 flex flex-col text-left"}>
              <div className="border border-[var(--color-white-opacity20)] rounded-[3px] p-7 flex flex-col text-left h-full">
                <div className="flex items-center gap-2 mb-2">    
                  <Image src="/icons/Clock.svg" alt="Calendar Check"width={22}height={22} />
                  <div className="text-[var(--color-white-opacity60)] text-sm">Hours Hacking</div>
                </div>
                <div className="text-[var(--color-light-opacity100)] text-2xl font-bold">576</div>
              </div>
            </div>

            <div className={style.box.grayPrimary + " p-4 flex flex-col text-left"}>
              <div className="border border-[var(--color-white-opacity20)] rounded-[3px] p-7 flex flex-col text-left h-full">
                <div className="flex items-center gap-2 mb-2">  
                  <Image src="/icons/Star.svg" alt="Calendar Check"width={22}height={22} />
                  <div className="text-[var(--color-white-opacity60)] text-sm mt-1">Hackathon Wins</div>
                </div>
                <div className="text-[var(--color-light-opacity100)] text-2xl font-bold">7</div>
              </div>
            </div>
          </div>
        </section>

        {/*------------------------------------------ Your Registered Events Section ------------------------------------------*/}
        <section className={style.sectionGap.top}>
          <h2 className="text-white text-xl font-medium mb-6">Your Registered Events</h2>
          
          <div className="bg-[#191919] rounded-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Content */}
              <div className="lg:w-1/2 p-8">
                <h3 className="text-3xl font-bold text-white mb-6">Event Name</h3>
                
                {/* Event Stats */}
                <div className="flex items-center space-x-8 mb-6 text-sm text-zinc-400">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Date of event</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>Location</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Type of event</span>
                  </div>
                </div>

                {/* Event Tags */}
                <div className="flex items-center space-x-3 mb-8">
                  <span className="bg-[#00000066] text-[#FFFFFFB2] px-3 py-1 rounded text-sm ${spaceMono.variable}">AI</span>
                  <span className="bg-[#00000066] text-[#FFFFFFB2] px-3 py-1 rounded text-sm '${spaceMono.variable}'">Machine Learning</span>
                  <span className="bg-[#00000066] text-[#FFFFFFB2] px-3 py-1 rounded text-sm '${spaceMono.variable}'">Innovation</span>
                </div>

                {/* Schedule */}
                <div className="mb-8 mr-20">
                  <h4 className="text-white font-bold text-lg mb-6">Schedule</h4>
                  <div className="space-y-4">
                    <div className="border-b border-gray-600">
                      <div className="flex justify-between items-center py-3">
                        <span className="text-white font-medium">Kickoff & Teambuilding</span>
                        <span className="text-zinc-400 text-sm">10:00 - 11:00</span>
                      </div>   
                    </div>
                    <div className="border-b border-gray-600">
                      <div className="flex justify-between items-center py-3">
                        <span className="text-white font-medium">Development</span>
                        <span className="text-zinc-400 text-sm">11:00 - 15:00</span>
                      </div> 
                    </div>
                    <div className="border-b border-gray-600">
                      <div className="flex justify-between items-center py-3">
                        <span className="text-white font-medium">Pitch, Judging & Celebration</span>
                        <span className="text-zinc-400 text-sm">15:00 - 17:00</span>
                      </div> 
                    </div>
                  </div>
                </div>

                {/* View Event Button */}
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors w-[169px] h-12">
                  View event
                </button>
              </div>
              
              {/* Right Image */}
              <div className="lg:w-1/2">
                <div className="h-64 lg:h-full bg-zinc-600 flex items-center justify-center relative rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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
          <h2 className="text-white text-xl font-medium mb-8 text-left ">Events For You</h2>

          <div className="flex space-x-4 justify-left">
            <EventCard event={sampleEvent} index={0} />
            <EventCard event={sampleEvent} index={1} />
            <EventCard event={sampleEvent} index={2} />
          </div>

          {/* View All Events Button */}
          <div className="text-center mb-20 mt-8">
            <button 
              onClick={() => router.push('/events')}
              className="border border-emerald-400 text-emerald-400 px-8 py-3 rounded-full font-medium text-sm hover:bg-emerald-400 hover:text-black transition-colors">
              View all events
            </button>
          </div>
        </section>
      </main>
      
      {/*--------------------------------------------------------------------------------*/}
      {/* FOOTER */}
      {/*--------------------------------------------------------------------------------*/}
      <Footer />
    </div>
  )
}
