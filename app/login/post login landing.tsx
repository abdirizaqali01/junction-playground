'use client'

import { useState, useEffect } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

// Logo component placeholder (Logo 1 - colorful circle)
const Logo = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-full"></div>
)

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  prize: string
  image: string
  status: 'upcoming' | 'past'
}

interface DashboardData {
  sidebar: {
    navigation: {
      events: {
        title: string
        yourEvents: string
        organizeEvent: string
      }
      profile: string
      logOut: string
    }
  }
  upcomingEvents: {
    title: string
    subtitle: string
  }
  pastEvents: {
    title: string
  }
  eventActions: {
    seeMore: string
    submittedProjects: string
  }
  events: Event[]
}

export default function DashboardPage() {
  const [sidebarWidth, setSidebarWidth] = useState(256) // 256px = w-64
  const [isResizing, setIsResizing] = useState(false)
  
  // Static data dictionary - backend team can replace with API calls
  const dashboardData: DashboardData = {
    sidebar: {
      navigation: {
        events: {
          title: "Events",
          yourEvents: "Your events",
          organizeEvent: "Organize event"
        },
        profile: "Profile",
        logOut: "Log Out"
      }
    },
    upcomingEvents: {
      title: "Upcoming events",
      subtitle: "You have registered to these events"
    },
    pastEvents: {
      title: "Past events"
    },
    eventActions: {
      seeMore: "See more",
      submittedProjects: "Submitted projects"
    },
    events: [
      {
        id: 1,
        title: 'JunctionX ITP Prizren',
        description: '🚀 Welcome to JunctionX ITP Prizren - where innovation meets impact!\n\n⚡ Happening for the FIRST TIME in Kosovo, JunctionX ITP Prizren is not your typical hackathon - it\'s a 48-hour tech showdown powered by AI and Cybersecurity, lighting up the Digital Skills Festival on May 21-23, 2025, at ITP Prizren!',
        date: 'MAY 21, 2025',
        location: 'PRIZREN, KOSOVO',
        prize: '',
        image: '/api/placeholder/300/200',
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'JunctionX ITP Prizren',
        description: '🚀 Welcome to JunctionX ITP Prizren - where innovation meets impact!\n\n⚡ Happening for the FIRST TIME in Kosovo, JunctionX ITP Prizren is not your typical hackathon - it\'s a 48-hour tech showdown powered by AI and Cybersecurity, lighting up the Digital Skills Festival on May 21-23, 2025, at ITP Prizren!',
        date: 'MAY 21, 2025',
        location: 'PRIZREN, KOSOVO',
        prize: '',
        image: '/api/placeholder/300/200',
        status: 'upcoming'
      },
      {
        id: 3,
        title: 'JunctionX ITP Prizren',
        description: '🚀 Welcome to JunctionX ITP Prizren - where innovation meets impact!\n\n⚡ Happening for the FIRST TIME in Kosovo, JunctionX ITP Prizren is not your typical hackathon - it\'s a 48-hour tech showdown powered by AI and Cybersecurity, lighting up the Digital Skills Festival on May 21-23, 2025, at ITP Prizren!',
        date: 'MAY 21, 2025',
        location: 'PRIZREN, KOSOVO',
        prize: '',
        image: '/api/placeholder/300/200',
        status: 'upcoming'
      }
    ]
  }

  const [events] = useState<Event[]>(dashboardData.events)

  const upcomingEvents = events.filter(event => event.status === 'upcoming')
  const pastEvents = events.filter(event => event.status === 'past').length > 0 
    ? events.filter(event => event.status === 'past') 
    : [...events] // Show same events as past for demo

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return
    const newWidth = e.clientX
    if (newWidth >= 200 && newWidth <= 400) {
      setSidebarWidth(newWidth)
    }
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing])

  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">
      <div className="flex">
        {/* Sidebar */}
        <div 
          className="bg-zinc-900 border-r border-white/5 flex-shrink-0 relative"
          style={{ width: `${sidebarWidth}px` }}
        >
          <div className="p-6">
            {/* Logo 1 in sidebar */}
            <div className="mb-8">
              <Logo />
            </div>
            
            {/* Splitting line above Events */}
            <div className="border-t border-white/10 mb-6"></div>
            
            {/* Navigation */}
            <nav className="space-y-6">
              <div>
                <h3 className="text-white font-['Space_Grotesk'] font-medium mb-3">{dashboardData.sidebar.navigation.events.title}</h3>
                <div className="space-y-2 ml-4">
                  <a href="#" className="block text-white/60 hover:text-white text-sm font-['Inter'] transition-colors">{dashboardData.sidebar.navigation.events.yourEvents}</a>
                  <a href="#" className="block text-white/60 hover:text-white text-sm font-['Inter'] transition-colors">{dashboardData.sidebar.navigation.events.organizeEvent}</a>
                </div>
              </div>
              
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white text-sm font-['Inter'] transition-colors">{dashboardData.sidebar.navigation.profile}</a>
                <a href="#" className="block text-white/60 hover:text-white text-sm font-['Inter'] transition-colors">{dashboardData.sidebar.navigation.logOut}</a>
              </div>
            </nav>
          </div>
          
          {/* Resize Handle - More Subtle */}
          <div
            className="absolute top-0 right-0 w-px h-full cursor-col-resize bg-white/5 hover:bg-white/10 transition-colors"
            onMouseDown={handleMouseDown}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar with JunctionLogo - positioned above main content */}
          <div className="bg-black border-b border-white/10">
            <div className="px-6 py-4 flex items-center justify-between">
              {/* JunctionLogo */}
              <JunctionLogo />
              
              {/* Right Icons */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="px-6 py-8 flex-1">
            {/* Upcoming Events Section */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-white mb-2">{dashboardData.upcomingEvents.title}</h1>
                <p className="text-white/60 text-sm font-['Inter']">{dashboardData.upcomingEvents.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    {/* Event Image Placeholder */}
                    <div className="h-40 bg-gradient-to-r from-gray-800 to-gray-700 relative">
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    
                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-['Space_Grotesk'] font-semibold text-white mb-3">{event.title}</h3>
                      
                      <div className="text-white/60 text-sm font-['Inter'] mb-4 line-clamp-4">
                        {event.description.split('\n').map((line, index) => (
                          <p key={index} className="mb-1">{line}</p>
                        ))}
                      </div>
                      
                      <div className="text-white/50 text-xs font-['Space_Mono'] mb-4 space-y-1">
                        <p>{event.date}</p>
                        <p>{event.location}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button className="text-green-300/80 hover:text-green-300 text-sm font-['Space_Mono'] transition-colors">
                          {dashboardData.eventActions.seeMore}
                        </button>
                        <button className="text-green-300/80 hover:text-green-300 text-sm font-['Space_Mono'] transition-colors">
                          {dashboardData.eventActions.submittedProjects}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Events Section */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-['Space_Grotesk'] font-bold text-white">{dashboardData.pastEvents.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {pastEvents.map((event) => (
                  <div key={`past-${event.id}`} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    {/* Event Image Placeholder */}
                    <div className="h-40 bg-gradient-to-r from-gray-800 to-gray-700 relative">
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    
                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-['Space_Grotesk'] font-semibold text-white mb-3">{event.title}</h3>
                      
                      <div className="text-white/60 text-sm font-['Inter'] mb-4 line-clamp-4">
                        {event.description.split('\n').map((line, index) => (
                          <p key={index} className="mb-1">{line}</p>
                        ))}
                      </div>
                      
                      <div className="text-white/50 text-xs font-['Space_Mono'] mb-4 space-y-1">
                        <p>{event.date}</p>
                        <p>{event.location}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button className="text-green-300/80 hover:text-green-300 text-sm font-['Space_Mono'] transition-colors">
                          {dashboardData.eventActions.seeMore}
                        </button>
                        <button className="text-green-300/80 hover:text-green-300 text-sm font-['Space_Mono'] transition-colors">
                          {dashboardData.eventActions.submittedProjects}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}