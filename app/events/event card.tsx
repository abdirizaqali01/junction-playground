'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">
      {/* Top Bar */}
      <div className="bg-black">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <JunctionLogo />
          
          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Event Header */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <h1 className="text-5xl font-['Space_Grotesk'] font-bold text-white">Event name</h1>
                <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full">
                  <span className="text-white/80 text-xs font-['Space_Mono'] uppercase tracking-wider">STATUS</span>
                </div>
              </div>
              
              {/* Event Meta */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2 text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span className="text-sm font-['Inter']">Date of event</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="text-sm font-['Inter']">Location</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <span className="text-sm font-['Inter']">Type of event</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mb-12">
                <button className="px-6 py-3 bg-green-600 text-white text-sm font-['Space_Mono'] rounded-full hover:bg-green-700 transition-colors">
                  Register now
                </button>
                <div className="flex items-center space-x-2 text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <span className="text-sm font-['Inter']">Registration ends May</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h2 className="text-2xl font-['Space_Grotesk'] font-semibold text-white mb-6">About</h2>
              <p className="text-white/60 text-sm leading-relaxed font-['Inter']">
                Description of event... at vero eos et accusamus et iusto odio dignissimos ducimus 
                qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! 
                Voluptatem deleniti atque corrupti quos dolores et quas molestias excepturi sint 
                occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt 
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et 
                expedita distinctio. Nam libero tempore, Et harum quidem rerum facilis est et 
                expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio 
                cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis 
                voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam 
                aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates 
                repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a 
                sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut 
                perferendis doloribus asperiores repellat.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="w-full h-80 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 rounded-lg relative overflow-hidden">
              {/* Abstract shapes */}
              <div className="absolute top-12 right-16 w-16 h-16 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-white/20 rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white/15 rounded-full"></div>
            </div>

            {/* Event Timeline and Registration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Timeline Card */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-['Space_Grotesk'] font-semibold text-white mb-6">Event timeline</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white text-sm font-['Space_Mono'] mb-1">FEB 7 16:00</p>
                      <p className="text-white/60 text-xs font-['Inter']">Description of event</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white text-sm font-['Space_Mono'] mb-1">FEB 7 16:00</p>
                      <p className="text-white/60 text-xs font-['Inter']">Description of event</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white text-sm font-['Space_Mono'] mb-1">FEB 7 16:00</p>
                      <p className="text-white/60 text-xs font-['Inter']">Description of event</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Card */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-['Space_Grotesk'] font-semibold text-white mb-6">Registration</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm font-['Inter']">Status</span>
                    <span className="text-white/60 text-sm font-['Inter']">Status</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm font-['Inter']">Deadline</span>
                    <span className="text-white/60 text-sm font-['Inter']">Deadline</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm font-['Inter']">Participants</span>
                    <span className="text-white/60 text-sm font-['Inter']">Participants</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white/60 text-sm font-['Inter']">Team size</span>
                    <span className="text-white/60 text-sm font-['Inter']">Team size</span>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-transparent border border-green-600/40 text-green-400 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors">
                    Register now
                  </button>
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