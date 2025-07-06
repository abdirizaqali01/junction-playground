'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from "@/components/footer"

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

interface Hackerpack {
  hackerpack_id: number
  event_id: number
  title: string
  content: string
  slug: string
  is_published: boolean
}

export default function HackerpackPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params?.id as string

  const [hackerpacks, setHackerpacks] = useState<Hackerpack[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch hackerpacks for the specific event
  useEffect(() => {
    const fetchHackerpacks = async () => {
      if (!eventId) return

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/proxy/hackerpacks?event_id=${eventId}`, {
          headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch hackerpacks: ${response.status}`)
        }

        const hackerpacksData = await response.json()
        const hackerpacksArray = Array.isArray(hackerpacksData) ? hackerpacksData : [hackerpacksData]
        
        setHackerpacks(hackerpacksArray)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch hackerpacks')
      } finally {
        setLoading(false)
      }
    }

    fetchHackerpacks()
  }, [eventId])

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleRedeemOffer = (hackerpack: Hackerpack) => {
    console.log('Redeem offer for hackerpack:', hackerpack.title)
    // Placeholder functionality - can be enhanced later
    alert(`Redeeming offer for: ${hackerpack.title}`)
  }

  const getImagePlaceholder = (index: number) => {
    const colors = [
      'bg-blue-500/20',
      'bg-green-500/20',
      'bg-purple-500/20',
      'bg-orange-500/20',
      'bg-pink-500/20',
      'bg-cyan-500/20'
    ]
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading hackerpacks...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error loading hackerpacks: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-emerald-500 text-black rounded hover:bg-emerald-400 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Hackerpack
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-4xl">
              We want you to focus entirely on making your hackathon project as awesome as possible! The software and tools provided by our partners are here to help you unlock your creativity and get the most out of your learning experience during the event.
            </p>
          </div>

          {/* Hackerpacks Content */}
          {hackerpacks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Hackerpacks Available</h3>
              <p className="text-white/60">Hackerpack offers for this event will be announced soon. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {hackerpacks.map((hackerpack, index) => (
                <div key={hackerpack.hackerpack_id} className="bg-white/10 border border-white/15 rounded-xl p-6 flex gap-6">
                  {/* Image Placeholder */}
                  <div className={`w-48 aspect-square rounded-lg flex items-center justify-center flex-shrink-0 ${getImagePlaceholder(index)}`}>
                    <svg className="w-12 h-12 text-white/40" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                          {hackerpack.title}
                        </h3>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {hackerpack.content}
                      </p>
                    </div>
                    
                    {/* Separator line and button */}
                    <div className="mt-6">
                      <div className="border-t border-white/20 mb-4"></div>
                      <button 
                        onClick={() => handleRedeemOffer(hackerpack)}
                        disabled={!hackerpack.is_published}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          hackerpack.is_published
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {hackerpack.is_published ? 'Redeem Offer' : 'Not Available'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}