'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function MentorMeetingsPage() {
  const [selectedChallenge, setSelectedChallenge] = useState('')
  const [selectedMentor, setSelectedMentor] = useState('Mentor 1') // Pre-select for demo
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('0-0') // Pre-select first slot
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch challenges from API
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true)
        // Replace 'eventId' with the actual event ID
        const eventId = 'your-event-id' // You'll need to get this from props, params, or context
        const response = await fetch(`/api/proxy/events/${eventId}/challenges`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch challenges')
        }
        
        const data = await response.json()
        setChallenges(data)
      } catch (error) {
        console.error('Error fetching challenges:', error)
        // Fallback to hardcoded challenges for demo
        setChallenges(['Challenge 1', 'Challenge 2', 'Challenge 3'])
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const handleBackToHome = () => {
    router.push('/dash')
  }

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
        <div className="flex-1 p-6 pt-[4%] max-w-3xl mx-auto w-full">
          {/* Page Title and Description */}
          <div className="mb-8 text-center mt-16">
            <h1 className="text-4xl font-bold text-white mb-4 ${spaceGrotesk.variable}">
              Meetings
            </h1>
            <p className="text-neutral-400 text-base">
              Book a meeting with partners to learn more about their challenge
            </p>
          </div>

          {/* Dropdowns */}
          <div className="space-y-4 mb-8 max-w-xl mx-auto">
            {/* Challenge Dropdown */}
            <div className="relative">
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
                disabled={loading}
                className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white text-base appearance-none cursor-pointer focus:outline-none focus:border-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {loading ? 'Loading challenges...' : 'Challenge'}
                </option>
                {challenges.map((challenge, index) => (
                  <option key={index} value={challenge}>
                    {typeof challenge === 'string' ? challenge : challenge.name || challenge.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* Mentor Dropdown */}
            <div className="relative">
              <select
                value={selectedMentor}
                onChange={(e) => setSelectedMentor(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-white text-base appearance-none cursor-pointer focus:outline-none focus:border-green-400 transition-colors"
              >
                <option value="">Mentor</option>
                {mentors.map((mentor, index) => (
                  <option key={index} value={mentor}>
                    {mentor}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Available Times Section */}
          {selectedMentor && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white ${spaceGrotesk.variable}">
                  Available times
                </h2>
                <button 
                  onClick={handleMoreTimeSlots}
                  className="text-green-400 text-sm hover:text-green-300 transition-colors flex items-center font-medium"
                >
                  More time slots
                  <ChevronLeft className="w-4 h-4 ml-2" />
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Time Slots Grid */}
              <div className="bg-neutral-900/50 border border-neutral-700 rounded-xl p-6">
                <div className="grid grid-cols-4 gap-6">
                  {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="space-y-3">
                      <h3 className="text-white font-bold text-center text-base ${spaceGrotesk.variable}">
                        {day.name}
                      </h3>
                      <div className="space-y-2">
                        {day.slots.map((slotIndex) => (
                          <button
                            key={slotIndex}
                            onClick={() => handleTimeSlotClick(dayIndex, slotIndex)}
                            className={`w-full py-2 px-3 rounded-lg text-xs font-mono transition-all duration-200 ${
                              selectedTimeSlot === `${dayIndex}-${slotIndex}`
                                ? 'bg-neutral-600 text-white border border-neutral-500'
                                : 'bg-transparent text-neutral-300 hover:bg-neutral-800 border border-transparent'
                            }`}
                          >
                            {timeSlots[slotIndex]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}