'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'

// Define your navigation data for sidebar
const navigationSections = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
          </svg>
        )
      },
      {
        id: 'challenges',
        label: 'Challenges',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
          </svg>
        )
      },
      {
        id: 'team',
        label: 'Team',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 h4.216z"/>
          </svg>
        )
      },
      {
        id: 'hackerpack',
        label: 'Hackerpack',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
          </svg>
        )
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    items: [
      {
        id: 'project-submission',
        label: 'Project Submission',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>
        )
      },
      {
        id: 'meetings',
        label: 'Meetings',
        href: '#',
        isActive: true,
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
          </svg>
        )
      },
      {
        id: 'review-projects',
        label: 'Review Projects',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
          </svg>
        )
      },
      {
        id: 'finalist-voting',
        label: 'Finalist Voting',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
        )
      }
    ]
  }
]

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function MentorMeetingsPage() {
  const [selectedChallenge, setSelectedChallenge] = useState('')
  const [selectedMentor, setSelectedMentor] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const router = useRouter()

  const handleBackToHome = () => {
    router.push('/')
  }

  const challenges = ['Challenge 1', 'Challenge 2', 'Challenge 3']
  const mentors = ['Mentor 1', 'Mentor 2', 'Mentor 3']

  const timeSlots = [
    '12:00 - 13:00',
    '13:00 - 14:00', 
    '14:00 - 15:00',
    '15:00 - 16:00'
  ]

  const days = [
    { name: 'Mon 12.11', slots: [0, 1, 2, 3] },
    { name: 'Tue 13.11', slots: [0, 1, 2, 3] },
    { name: 'Wed 14.11', slots: [0, 1, 2, 3] },
    { name: 'Thu 15.11', slots: [0, 1, 2, 3] }
  ]

  const handleTimeSlotClick = (dayIndex, slotIndex) => {
    setSelectedTimeSlot(`${dayIndex}-${slotIndex}`)
  }

  const handleMoreTimeSlots = () => {
    console.log('Show more time slots')
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        navigationSections={navigationSections}
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-72">
        {/* Main Content Area */}
        <div className="flex-1 p-8 pt-[6%]">
          {/* Page Title and Description */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Meetings
            </h1>
            <p className="text-zinc-400 text-lg">
              Book a meeting with partners to learn more about their challenge
            </p>
          </div>

          {/* Dropdowns */}
          <div className="space-y-4 mb-8 max-w-2xl">
            {/* Challenge Dropdown */}
            <div className="relative">
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-green-400"
              >
                <option value="">Challenge</option>
                {challenges.map((challenge, index) => (
                  <option key={index} value={challenge}>
                    {challenge}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Mentor Dropdown */}
            <div className="relative">
              <select
                value={selectedMentor}
                onChange={(e) => setSelectedMentor(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-green-400"
              >
                <option value="">Mentor</option>
                {mentors.map((mentor, index) => (
                  <option key={index} value={mentor}>
                    {mentor}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Available Times Section */}
          {selectedMentor && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Available times
                </h2>
                <button 
                  onClick={handleMoreTimeSlots}
                  className="text-green-400 text-sm hover:text-green-300 transition-colors flex items-center"
                >
                  More time slots
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Time Slots Grid */}
              <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-6">
                <div className="grid grid-cols-4 gap-4">
                  {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="space-y-3">
                      <h3 className="text-white font-medium text-center text-sm">
                        {day.name}
                      </h3>
                      <div className="space-y-2">
                        {day.slots.map((slotIndex) => (
                          <button
                            key={slotIndex}
                            onClick={() => handleTimeSlotClick(dayIndex, slotIndex)}
                            className={`w-full py-2 px-3 rounded-lg text-sm font-mono transition-colors ${
                              selectedTimeSlot === `${dayIndex}-${slotIndex}`
                                ? 'bg-green-600 text-white'
                                : slotIndex === 0 && dayIndex === 0 // Make first slot selected by default for demo
                                ? 'bg-zinc-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {timeSlots[slotIndex]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <div className="mt-6 text-right">
                  <p className="text-zinc-500 text-xs">
                    *This schedule pops up when you choose a mentor
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}