'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from '@/components/attachables/main-button'
import { useLoading } from '@/components/loading-context'
import Loading from '@/components/loading'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import * as style from '@/styles/design-system'

// Types for better TypeScript support
interface Challenge {
  challenge_id?: string | number
  id?: string | number
  name?: string
  title?: string
  challenge_name?: string
}

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function MentorMeetingsPage() {
  const [selectedChallenge, setSelectedChallenge] = useState('')
  const [selectedMentor, setSelectedMentor] = useState('Mentor 1')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('0-0')
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [localLoading, setLocalLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const { setLoading } = useLoading()

  // Fetch challenges from API
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLocalLoading(true)
        setError(null)
        
        // Get eventId from URL parameters
        const eventId = params?.id as string
        
        if (!eventId) {
          throw new Error('No event ID found in URL')
        }
        
        const response = await fetch(`/api/proxy/events/${eventId}/challenges`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch challenges: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        
        // Handle both array and single object responses
        const challengesArray = Array.isArray(data) ? data : [data]
        setChallenges(challengesArray)
        
      } catch (err) {
        console.error('Error fetching challenges:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        // Fallback to empty array
        setChallenges([])
      } finally {
        setLocalLoading(false)
      }
    }

    fetchChallenges()
  }, [params?.id])

  const handleBackToHome = () => {
    setLoading('back-to-home', true)
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

  const handleTimeSlotClick = (dayIndex: number, slotIndex: number) => {
    setSelectedTimeSlot(`${dayIndex}-${slotIndex}`)
  }

  const handleMoreTimeSlots = () => {
    setLoading('more-time-slots', true)
    console.log('Show more time slots')
    
    // Simulate API call
    setTimeout(() => {
      setLoading('more-time-slots', false)
    }, 1000)
  }

  const handleBookMeeting = () => {
    setLoading('book-meeting', true)
    
    // Handle booking logic here
    const selectedChallengeData = challenges?.find((c: Challenge) => 
      getChallengeValue(c) === selectedChallenge
    )
    
    console.log('Booking meeting:', {
      challenge: selectedChallenge,
      challengeData: selectedChallengeData,
      mentor: selectedMentor,
      timeSlot: selectedTimeSlot,
      eventId: params?.id
    })
    
    // Simulate API call
    setTimeout(() => {
      setLoading('book-meeting', false)
      alert('Meeting booked successfully!')
    }, 1500)
  }

  // Helper function to get challenge name
  const getChallengeDisplayName = (challenge: Challenge): string => {
    if (typeof challenge === 'string') return challenge
    return challenge.name || challenge.title || challenge.challenge_name || 'Unnamed Challenge'
  }

  // Helper function to get challenge value for selection
  const getChallengeValue = (challenge: Challenge): string => {
    if (typeof challenge === 'string') return challenge
    return String(challenge.challenge_id || challenge.id || challenge.name || challenge.title || '')
  }

  if (localLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-0 lg:ml-[250px] px-4 lg:px-10 pt-[100px] lg:pt-10">
          <Loading message="Loading mentor meetings..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-0 lg:ml-[250px] px-4 lg:px-10 pt-[100px] lg:pt-0">
        {/* Main Content Area */}
        <div className={`${style.box.gray.bottom} p-10 w-full md:w-[80%] lg:w-[70%] m-auto`}>
          {/* Page Title and Description */}
          <div className="mb-6 text-center">
            <h1 className={`text-4xl ${style.font.grotesk.heavy} text-[var(--color-light-opacity100)] mb-4`}>
              Meetings
            </h1>
            <p className={`text-[var(--color-light-opacity60)] text-base ${style.font.grotesk.light}`}>
              Book a meeting with partners to learn more about their challenge
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className={`mb-4 p-3 bg-[var(--color-alerts-opacity10)] border border-[var(--color-alerts-opacity40)] ${style.border.radius.outer} text-[var(--color-alerts-opacity100)] text-sm`}>
              Error loading challenges: {error}
            </div>
          )}

          {/* Dropdowns */}
          <div className="space-y-4 mb-8 max-w-xl mx-auto">
            {/* Challenge Dropdown */}
            <div className="relative">
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
                disabled={localLoading || !challenges?.length}
                className={`w-full !bg-[#252525] ${style.box.gray.bottom} px-4 py-3 text-[var(--color-light-opacity100)] text-base appearance-none cursor-pointer focus:outline-none focus:border-[var(--color-primary-opacity100)] ${style.perf.transition.fast} disabled:opacity-50 disabled:cursor-not-allowed ${style.font.mono.text}`}
              >
                <option value="">
                  {localLoading ? 'Loading challenges...' : 
                   !challenges?.length ? 'No challenges available' : 
                   'Select a challenge'}
                </option>
                {challenges?.map((challenge, index) => (
                  <option key={index} value={getChallengeValue(challenge)}>
                    {getChallengeDisplayName(challenge)}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-light-opacity40)] pointer-events-none ${style.perf.transition.fast}`} />
            </div>

            {/* Mentor Dropdown */}
            <div className="relative">
              <select
                value={selectedMentor}
                onChange={(e) => setSelectedMentor(e.target.value)}
                className={`w-full !bg-[#252525] ${style.box.gray.bottom} px-4 py-3 text-[var(--color-light-opacity100)] text-base appearance-none cursor-pointer focus:outline-none focus:border-[var(--color-primary-opacity100)] ${style.perf.transition.fast} ${style.font.mono.text}`}
              >
                <option value="">Mentor</option>
                {mentors.map((mentor, index) => (
                  <option key={index} value={mentor}>
                    {mentor}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-light-opacity40)] pointer-events-none ${style.perf.transition.fast}`} />
            </div>
          </div>

          {/* Available Times Section */}
          {selectedMentor && (
            <div className="">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl ${style.font.grotesk.main} text-[var(--color-light-opacity100)]`}>
                  Available times
                </h2>
                <button 
                  onClick={handleMoreTimeSlots}
                  className={`text-[var(--color-primary-opacity100)] text-sm hover:text-[var(--color-primary-opacity60)] ${style.perf.transition.fast} flex items-center ${style.font.grotesk.medium}`}
                >
                  More time slots
                  <ChevronLeft className="w-4 h-4 ml-2" />
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Time Slots Grid */}
              <div className={`${style.box.gray.bottom} p-6`}>
                <div className="grid grid-cols-4 gap-6">
                  {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="space-y-3">
                      <h3 className={`text-[var(--color-light-opacity100)] ${style.font.grotesk.main} text-center text-base`}>
                        {day.name}
                      </h3>
                      <div className="space-y-2">
                        {day.slots.map((slotIndex: number) => (
                          <button
                            key={slotIndex}
                            onClick={() => handleTimeSlotClick(dayIndex, slotIndex)}
                            className={`w-full py-2 px-3 ${style.border.radius.middle} text-xs ${style.font.mono.text} ${style.perf.transition.fast} ${
                              selectedTimeSlot === `${dayIndex}-${slotIndex}`
                                ? `${style.box.gray.middle} text-[var(--color-light-opacity100)] border-[var(--color-light-opacity50)]`
                                : 'bg-transparent text-[var(--color-light-opacity60)] hover:bg-[var(--color-white-opacity10)] border border-transparent'
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

              {/* Book Meeting Button */}
              {selectedTimeSlot && selectedChallenge && selectedMentor && (
                <div className="flex justify-center mt-8">
                  <MainButton
                    variant="primary"
                    size="lg"
                    showIcon={false}
                    onClick={handleBookMeeting}
                    className={`${style.perf.transition.fast} transform hover:scale-[1.02]`}
                  >
                    Book Meeting
                  </MainButton>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}