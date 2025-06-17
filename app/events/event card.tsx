'use client'

import React, { useState } from 'react'
import { JunctionLogo } from '@/components/logo'
import { Footer } from "@/components/footer"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Top Bar - Fixed Header with Backdrop Blur */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <JunctionLogo />
          
          {/* Navigation - Single Bar with 3 Tabs */}
          <div className="flex items-center bg-gray-900/30 border border-gray-800/50 rounded-lg p-1">
            <button className="px-6 py-2 text-gray-400 hover:text-white text-sm transition-colors rounded-md">
              Dashboard
            </button>
            <button className="px-6 py-2 bg-green-500/90 text-white text-sm font-medium rounded-md">
              Events
            </button>
            <button className="px-6 py-2 text-gray-400 hover:text-white text-sm transition-colors rounded-md">
              Community
            </button>
          </div>
          
          {/* Profile */}
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">JU</span>
          </div>
        </div>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-20">
        <div className="container mx-auto px-6 py-6 max-w-7xl">
          {/* Back to Events Button */}
          <div className="mb-6">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/>
                <path d="M12 19l-7-7 7-7"/>
              </svg>
              <span>Back to Events</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Hero Section */}
              <div className="relative h-72 bg-neutral-800 rounded-lg overflow-hidden">
                {/* Event image - Real conference photo */}
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Event"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                
                {/* Event Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">Event Name</h1>
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">LIVE</span>
                  </div>
                  <div className="flex items-center space-x-6 text-gray-300 text-sm">
                    <span className="flex items-center space-x-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>Date of event</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>Type of event</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Join us for one of the most anticipated hackathon adventures where epic talents convene and 
                  brilliant minds unite. Experience the ultimate hackathon where innovation meets creativity and 
                  where great ideas come to life. Our event brings together the brightest minds in technology, 
                  design, and entrepreneurship for an unforgettable experience. Whether you&apos;re a seasoned 
                  developer, a creative designer, or an ambitious entrepreneur, this event offers the perfect 
                  platform to showcase your skills, learn from industry experts, and network with like-minded 
                  individuals. Participants will have access to cutting-edge technology, mentorship from industry 
                  leaders, and the opportunity to work on real-world problems. The event features workshops, 
                  tech talks, networking sessions, and plenty of opportunities to collaborate and innovate.
                </p>
              </div>

              {/* Schedule Section */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Schedule</h2>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-4 border-b border-neutral-800 last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 text-sm w-12">Day 1</span>
                      <span className="text-white text-sm font-medium">Event Kick-off & Networking</span>
                    </div>
                    <span className="text-gray-400 text-sm">10:00 - 18:00</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 border-b border-neutral-800 last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 text-sm w-12">Day 2</span>
                      <span className="text-white text-sm font-medium">Hackathon Announcement & Building</span>
                    </div>
                    <span className="text-gray-400 text-sm">10:00 - 18:00</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 text-sm w-12">Day 3</span>
                      <span className="text-white text-sm font-medium">Final Submissions & Pitches</span>
                    </div>
                    <span className="text-gray-400 text-sm">10:00 - 18:00</span>
                  </div>
                </div>
              </div>

              {/* Prizes Section */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Prizes</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">1st Place</div>
                      <div className="text-gray-400 text-sm">Best hack of the year</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
                    <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">2nd Place</div>
                      <div className="text-gray-400 text-sm">Best hack of the year</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
                    <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">3rd Place</div>
                      <div className="text-gray-400 text-sm">Best hack of the year</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar - Right 1/3 */}
            <div className="space-y-6">
              
              {/* Registration Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Registration</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Status</span>
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">Open</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Deadline</span>
                    <span className="text-white text-sm">May 24, 2024</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Participants</span>
                    <span className="text-white text-sm">1,278 Registered</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Team Size</span>
                    <span className="text-white text-sm">1-4 People</span>
                  </div>
                </div>
                
                <button className="w-full px-4 py-3 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors">
                  Register now
                </button>
              </div>

              {/* Sponsors Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Sponsors</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-14 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Company 1</span>
                  </div>
                  <div className="h-14 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Company 2</span>
                  </div>
                  <div className="h-14 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Company 3</span>
                  </div>
                  <div className="h-14 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Company 4</span>
                  </div>
                  <div className="h-14 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Company 5</span>
                  </div>
                  <div className="h-14 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Company 6</span>
                  </div>
                </div>
              </div>

              {/* Organizers Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Organizers</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Junction Organizing</div>
                      <div className="text-gray-400 text-xs">Team Organizer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Events Section - Full Width */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Events</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden group hover:border-neutral-700 transition-all">
                <div className="relative h-48 bg-neutral-800 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Event"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <h3 className="text-white text-lg font-bold mb-2">Event Name</h3>
                    <div className="flex items-center space-x-4 text-gray-300 text-xs mb-3">
                      <span className="flex items-center space-x-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>Date of event</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>Location</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <span>Type of event</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded-full">AI</span>
                      <span className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded-full">Machine Learning</span>
                      <span className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded-full">Innovation</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors">
                      Register now
                    </button>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <span>Registration ends May 30, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden group hover:border-neutral-700 transition-all">
                <div className="relative h-48 bg-neutral-800 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Event"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <h3 className="text-white text-lg font-bold mb-2">Event Name</h3>
                    <div className="flex items-center space-x-4 text-gray-300 text-xs mb-3">
                      <span className="flex items-center space-x-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>Date of event</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>Location</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <span>Type of event</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded-full">AI</span>
                      <span className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded-full">Machine Learning</span>
                      <span className="px-2 py-1 bg-neutral-700 text-gray-300 text-xs rounded-full">Innovation</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors">
                      Register now
                    </button>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <span>Registration ends May 30, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}