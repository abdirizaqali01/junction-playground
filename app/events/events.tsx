'use client'

import { Footer } from "@/components/footer"
import Navbar from "@/components/navi"
import React, { useState } from 'react'

export default function EventsListingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Events')

  const tabs = ['Dashboard', 'Events', 'Community']

  const eventCategories = [
    {
      title: "AI & Machine Learning",
      events: [
        {
          id: 1,
          name: "Event Name",
          tags: ["Machine Learning", "Innovation", "Biz", "AI"],
          date: "Date of event",
          location: "Location",
          type: "Type of event",
          registrationEnds: "Registration ends May 30, 2025",
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          name: "Event Name",
          tags: ["Machine Learning", "Innovation", "Biz", "AI"],
          date: "Date of event",
          location: "Location", 
          type: "Type of event",
          registrationEnds: "Registration ends May 30, 2025",
          image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          name: "Event Name",
          tags: ["Machine Learning", "Innovation", "Biz", "AI"],
          date: "Date of event",
          location: "Location",
          type: "Type of event", 
          registrationEnds: "Registration ends May 30, 2025",
          image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      title: "Cybersecurity",
      events: [
        {
          id: 4,
          name: "Event Name",
          tags: ["Machine Learning", "Innovation", "Biz", "AI"],
          date: "Date of event",
          location: "Location",
          type: "Type of event",
          registrationEnds: "Registration ends May 30, 2025",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 5,
          name: "Event Name", 
          tags: ["Machine Learning", "Innovation", "Biz", "AI"],
          date: "Date of event",
          location: "Location",
          type: "Type of event",
          registrationEnds: "Registration ends May 30, 2025",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 6,
          name: "Event Name",
          tags: ["Machine Learning", "Innovation", "Biz", "AI"],
          date: "Date of event", 
          location: "Location",
          type: "Type of event",
          registrationEnds: "Registration ends May 30, 2025",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      title: "Robotics & Electronics",
      events: [
        {
          id: 7,
          name: "Event Name",
          tags: ["Machine Learning", "Innovation", "Biz", "AI"],
          date: "Date of event",
          location: "Location",
          type: "Type of event",
          registrationEnds: "Registration ends May 30, 2025",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 8,
          name: "Event Name",
          tags: ["Machine Learning", "Innovation", "Biz", "AI"],
          date: "Date of event",
          location: "Location",
          type: "Type of event",
          registrationEnds: "Registration ends May 30, 2025",
          image: "https://images.unsplash.com/photo-1527430253228-e93688616381?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 9,
          name: "Event Name",
          tags: ["Machine Learning", "Innovation", "Biz", "AI"],
          date: "Date of event",
          location: "Location", 
          type: "Type of event",
          registrationEnds: "Registration ends May 30, 2025",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ]

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
                placeholder="Search Hackathon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-gray-700 rounded-xl bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
              />
            </div>
          </div>

          {/* Event Categories */}
          {eventCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              {/* Category Title with Text Fade Effect */}
              <div className="relative mb-6 overflow-hidden">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-green-400 from-20% via-green-400 via-40% to-transparent to-80% bg-clip-text text-transparent">
                  {category.title}
                </h2>
              </div>
              
              {/* Event Cards - Horizontal Scroll */}
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800" style={{scrollbarWidth: 'thin'}}>
                <div className="flex space-x-6 w-max">
                  {category.events.map((event) => (
                    <div key={event.id} className="bg-neutral-900/60 border border-neutral-700/50 rounded-lg overflow-hidden group hover:border-neutral-600 transition-all cursor-pointer flex-shrink-0 w-80">
                      {/* Event Image */}
                      <div className="relative h-40 bg-neutral-800 overflow-hidden">
                        <img 
                          src={event.image}
                          alt="Event"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />

                        {/* Event Name Overlay - Bottom Left */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white text-lg font-bold mb-2">{event.name}</h3>
                          
                          {/* Tags Row */}
                          <div className="flex flex-wrap gap-1">
                            {event.tags.slice(0, 4).map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-1 bg-neutral-800/80 text-gray-200 text-xs rounded border border-neutral-600/30">
                                {tag}
                              </span>
                            ))}
                            {event.tags.length > 4 && (
                              <span className="px-2 py-1 bg-neutral-800/80 text-gray-200 text-xs rounded border border-neutral-600/30">
                                +{event.tags.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="p-4">
                        {/* Event Details - Stacked */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span className="text-gray-300 text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span className="text-gray-300 text-sm">{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="2" y1="12" x2="22" y2="12"/>
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                            <span className="text-gray-300 text-sm">{event.type}</span>
                          </div>
                        </div>
                        
                        {/* Buttons - Full Width Side by Side */}
                        <div className="flex space-x-2 mb-3">
                          <button className="flex-1 px-3 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-100 transition-colors">
                            View event
                          </button>
                          <button className="flex-1 px-3 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors">
                            Register now
                          </button>
                        </div>
                        
                        {/* Registration End Date - Centered */}
                        <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                          </svg>
                          <span>{event.registrationEnds}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}