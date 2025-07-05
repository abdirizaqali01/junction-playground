'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'

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
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
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