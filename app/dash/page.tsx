'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

// Profile Avatar Component
const ProfileAvatar = ({ name = "JM" }) => (
  <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-black font-semibold text-sm">
    {name}
  </div>
)

export default function JunctionDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  const tabs = ['Dashboard', 'Events', 'Community']

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <JunctionLogo />
          
          {/* Navigation Tabs */}
          <div className="flex items-center border border-zinc-700 rounded-2xl p-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 text-sm rounded-xl transition-all duration-500 ease-in-out min-w-[120px] relative
                    ${isActive
                      ? 'text-zinc-500 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent border border-transparent'
                      : tab === 'Events'
                      ? 'text-emerald-400 hover:text-emerald-300'
                      : 'text-zinc-500 hover:text-zinc-300'}
                  `}
                  style={isActive ? {
                    background: 'linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.1) 50%, rgba(16,185,129,0) 100%)',
                    border: '1px solid transparent',
                    backgroundClip: 'padding-box',
                    boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.8), inset 0 0 0 2px rgba(16,185,129,0.4), inset 0 0 0 3px rgba(16,185,129,0.1)'
                  } : {}}
                >
                  {tab}
                </button>
              )
            })}
            
          </div>
          
          {/* Profile Avatar */}
          <ProfileAvatar name="JM" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 ">
        {/* Welcome Section */}
        <div className="text-center py-32">
          <h1 className="text-5xl font-bold mb-6 ">
            <span className="text-emerald-400 ">Good morning,</span>{' '}
            <span className="text-white ">Name</span>
          </h1>
          <p className="text-zinc-400 text-lg font-space-mono">
            Here's an overview of what's going on for you
          </p>
        </div>


        {/* Upcoming Event Section */}
        <div className="mb-16 max-w-7xl mx-auto">
          <div className="bg-[#55D1860D] rounded-xl overflow-hidden ring-[1px] ring-[#55D18680]">
            <div className="flex flex-col lg:flex-row">
              {/* Left Image */}
              <div className="lg:w-1/3 p-4">
                <div className="h-32 lg:h-full bg-zinc-600 relative rounded-lg border border-zinc-600">
                  <img 
                    src="/api/placeholder/400/300" 
                    alt="Junction Hackathon Venue" 
                    className="w-full h-full object-cover"
                  />
                  {/* Ongoing Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-medium">
                      Ongoing
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Right Content */}
              <div className="lg:w-2/3 p-4">
                {/* Header with Title and Enter Button */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h1 className="text-2xl font-space-grotesk font-bold text-white mb-2 text-wrap mr-3">Junction Hackathon</h1>
                    
                    {/* Stats */}
                    <div className="flex items-center space-x-8 text-sm text-zinc-400">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        <span>2 Day 12 hours 45min Left</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <img 
                          src="/icons/icon.svg"
                          className="w-5"
                        />
                        <span>139 Teams</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enter Event Button */}
                  <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2 flex-shrink-0">
                    <span>Enter Event</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                  {/* Up Coming Deadlines */}
                  <div className="bg-[#FFFFFF1A] rounded-lg p-3 border border-zinc-600">
                    <h2 className="text-white font-bold text-lg mb-2">Up Coming Deadlines</h2>
                    <hr className="border-zinc-600 mb-2" />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-white font-medium">Team Set</span>
                        <span className="text-zinc-400 text-sm">Today at 17:00</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-white font-medium">Project Draft</span>
                        <span className="text-zinc-400 text-sm">Tomorrow at 21:00</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-white font-medium">Final Submission</span>
                        <span className="text-zinc-400 text-sm">23rd of November at 21:00</span>
                      </div>
                    </div>
                  </div>

                  {/* Announcements */}
                  <div className="bg-[#FFFFFF33] rounded-lg p-3 border border-zinc-600">
                    <h2 className="text-white font-bold text-lg mb-2">Announcements</h2>
                    <hr className="border-zinc-600 mb-2" />
                    <p className="text-zinc-400">Most recent announcements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* */}
        <div className="pb-23">
          {/* Your Stats Section */}
          <section className="mt-12 px-4">
            <h2 className="text-2xl font-space-grotesk text-white mb-6">Your Stats</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">     

            <div className="bg-[#FFFFFF1A] border border-green-600 rounded-xl p-3 flex flex-col text-left">
            <div className="border border-[#2e2e2e] rounded-xl p-6 flex flex-col text-left h-full ">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                </svg>
                <div className="text-gray-400 text-sm">Events Joined</div>
              </div>
              <div className="text-white text-2xl font-bold">12</div>
              </div>
            </div>

              <div className="bg-[#FFFFFF1A] border border-green-600 rounded-xl p-3 flex flex-col text-left">
              <div className="border border-[#2e2e2e] rounded-xl p-6 flex flex-col text-left h-full ">
                <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6 text-green-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 21v-4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4M12 3v12"/>
                </svg>
                <div className="text-gray-400 text-sm">Projects Built</div>
                </div>
                <div className="text-white text-2xl font-bold">10</div>
                </div>
              </div>

              <div className="bg-[#FFFFFF1A] border border-green-600 rounded-xl p-3 flex flex-col items-left text-left">
              <div className="border border-[#2e2e2e] rounded-xl p-6 flex flex-col text-left h-full ">
                <div className="flex items-center gap-2 mb-2">    
                <svg className="w-6 h-6 text-green-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">     
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16z"/>
                </svg>
                <div className="text-gray-400 text-sm">Hours Hacking</div>
                </div>
                <div className="text-white text-2xl font-bold">576</div>
                </div>
              </div>

              <div className="bg-[#FFFFFF1A] border border-green-600 rounded-xl p-3 flex flex-col items-left text-left">
              <div className="border border-[#2e2e2e] rounded-xl p-6 flex flex-col text-left h-full ">
                <div className="flex items-center gap-2 mb-2">  
                <svg className="w-6 h-6 text-green-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 17.75L18.472 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.168 4.73L5.528 21z"/>
                </svg>
                <div className="text-gray-400 text-sm mt-1">Hackathon Wins</div>
                </div>
                <div className="text-white text-2xl font-bold">7</div>
                </div>
              </div>

            </div>

          </section>
          
         {/*Your Registered Events Section */}
          <div className="mb-16">
          <h2 className="text-white text-xl font-medium mb-6">Your Registered Events</h2>
          
          <div className="bg-zinc-800 rounded-2xl overflow-hidden">
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
                  <span className="text-zinc-400 text-sm">AI</span>
                  <span className="bg-zinc-700 text-zinc-300 px-3 py-1 rounded text-sm">Machine Learning</span>
                  <span className="bg-zinc-700 text-zinc-300 px-3 py-1 rounded text-sm">Innovation</span>
                </div>

                {/* Schedule */}
                <div className="mb-8">
                  <h4 className="text-white font-bold text-lg mb-6">Schedule</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-white font-medium">Kickoff & Teambuilding</span>
                      <span className="text-zinc-400 text-sm">10:00 - 11:00</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-white font-medium">Development</span>
                      <span className="text-zinc-400 text-sm">11:00 - 15:00</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-white font-medium">Pitch, Judging & Celebration</span>
                      <span className="text-zinc-400 text-sm">15:00 - 17:00</span>
                    </div>
                  </div>
                </div>

                {/* View Event Button */}
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  View event
                </button>
              </div>
              
              {/* Right Image */}
              <div className="lg:w-1/2">
                <div className="h-64 lg:h-full bg-zinc-600 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-12 mx-auto mb-4 bg-zinc-500 rounded flex items-center justify-center">
                      <div className="grid grid-cols-4 gap-0.5">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="w-0.5 h-1 bg-blue-300 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm">Event venue image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        
          {/* Most Frequented Section */}
          <div className="pb-24">
          <h2 className="text-white text-lg font-medium mb-6 text-left">Most frequented</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-lg">
            {/* Community Card */}
            <div className="bg-zinc-900 border border-emerald-400 rounded p-2 hover:border-emerald-300 transition-colors aspect-square flex flex-col items-center justify-center">
              <div className="mb-1">
                <div className="grid grid-cols-3 gap-0.5">
                  <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-[1px]"></div>
                </div>
              </div>
              <h3 className="text-white text-xs font-medium">Community</h3>
            </div>

            {/* Challenges Card */}
            <div className="bg-zinc-900 border border-emerald-400 rounded p-2 hover:border-emerald-300 transition-colors aspect-square flex flex-col items-center justify-center">
              <div className="mb-1">
                <div className="flex flex-col space-y-0.5">
                  <div className="w-3 h-1 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"></div>
                  <div className="w-3 h-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                  <div className="w-3 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-white text-xs font-medium">Challenges</h3>
            </div>

            {/* Event Name Card */}
            <div className="bg-zinc-600 border border-emerald-400 rounded p-2 hover:border-emerald-300 transition-colors aspect-square flex flex-col items-center justify-center">
              <h3 className="text-white text-xs font-medium">Event Name</h3>
            </div>
          </div>
          </div>

          {/* Browse Events Section */}
          <div>
          <h2 className="text-white text-xl font-medium mb-8 text-center">Browse events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Event Card 1 */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
              {/* Event Image */}
              <div className="h-40 bg-zinc-700 relative">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='160'%3E%3Crect width='400' height='160' fill='%23404040'/%3E%3Cg fill='%23ffffff' opacity='0.3'%3E%3Ccircle cx='80' cy='60' r='15'/%3E%3Ccircle cx='120' cy='60' r='15'/%3E%3Ccircle cx='160' cy='60' r='15'/%3E%3Ccircle cx='200' cy='60' r='15'/%3E%3Ccircle cx='240' cy='60' r='15'/%3E%3Ccircle cx='280' cy='60' r='15'/%3E%3Ccircle cx='320' cy='60' r='15'/%3E%3Ccircle cx='100' cy='90' r='15'/%3E%3Ccircle cx='140' cy='90' r='15'/%3E%3Ccircle cx='180' cy='90' r='15'/%3E%3Ccircle cx='220' cy='90' r='15'/%3E%3Ccircle cx='260' cy='90' r='15'/%3E%3Ccircle cx='300' cy='90' r='15'/%3E%3C/g%3E%3C/svg%3E"
                  alt="Event audience"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-white text-lg font-bold mb-4">Event Name</h3>
                
                {/* Event Info - Horizontal layout with icons */}
                <div className="flex items-center text-xs text-zinc-400 mb-4 space-x-4">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Date of event</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>Location</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Type of event</span>
                  </div>
                </div>

                {/* Event Tags */}
                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-zinc-400 text-xs">AI</span>
                  <span className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs">Machine Learning</span>
                  <span className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs">Innovation</span>
                </div>

                {/* Bottom section with button and registration info */}
                <div className="flex items-center justify-between">
                  {/* Register Button */}
                  <button className="bg-emerald-400 text-black px-4 py-2 rounded font-medium text-sm hover:bg-emerald-300 transition-colors">
                    Register now
                  </button>

                  {/* Registration Info */}
                  <div className="flex items-center space-x-1 text-xs text-zinc-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Registration ends May 30, 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
              {/* Event Image */}
              <div className="h-40 bg-zinc-700 relative">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='160'%3E%3Crect width='400' height='160' fill='%23404040'/%3E%3Cg fill='%23ffffff' opacity='0.4'%3E%3Crect x='50' y='40' width='80' height='60' rx='5'/%3E%3Crect x='150' y='40' width='80' height='60' rx='5'/%3E%3Crect x='250' y='40' width='80' height='60' rx='5'/%3E%3Ccircle cx='90' cy='120' r='8'/%3E%3Ccircle cx='190' cy='120' r='8'/%3E%3Ccircle cx='290' cy='120' r='8'/%3E%3C/g%3E%3C/svg%3E"
                  alt="Event workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-white text-lg font-bold mb-4">Event Name</h3>
                
                {/* Event Info - Horizontal layout with icons */}
                <div className="flex items-center text-xs text-zinc-400 mb-4 space-x-4">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Date of event</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>Location</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Type of event</span>
                  </div>
                </div>

                {/* Event Tags */}
                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-zinc-400 text-xs">AI</span>
                  <span className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs">Machine Learning</span>
                  <span className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs">Innovation</span>
                </div>

                {/* Bottom section with button and registration info */}
                <div className="flex items-center justify-between">
                  {/* Register Button */}
                  <button className="bg-emerald-400 text-black px-4 py-2 rounded font-medium text-sm hover:bg-emerald-300 transition-colors">
                    Register now
                  </button>

                  {/* Registration Info */}
                  <div className="flex items-center space-x-1 text-xs text-zinc-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Registration ends May 30, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Events Button */}
          <div className="text-center mb-20">
            <button className="border border-emerald-400 text-emerald-400 px-8 py-3 rounded-full font-medium text-sm hover:bg-emerald-400 hover:text-black transition-colors">
              View all events
            </button>
          </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}