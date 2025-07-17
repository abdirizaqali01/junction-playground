'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from "@/components/attachables/main-button"
import { useLoading } from '@/components/loading-context'
import Loading from '@/components/loading'
import * as style from '@/styles/design-system'

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
  const { setLoading } = useLoading()
  const eventId = params?.id as string

  const [hackerpacks, setHackerpacks] = useState<Hackerpack[]>([])
  const [localLoading, setLocalLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch hackerpacks for the specific event
  useEffect(() => {
    const fetchHackerpacks = async () => {
      if (!eventId) return

      try {
        setLocalLoading(true)
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
        setLocalLoading(false)
      }
    }

    fetchHackerpacks()
  }, [eventId])

  const handleBackToHome = () => {
    setLoading('back-to-home', true)
    router.push('/dash')
  }

  const handleRedeemOffer = (hackerpack: Hackerpack) => {
    setLoading(`redeem-${hackerpack.hackerpack_id}`, true)
    console.log('Redeem offer for hackerpack:', hackerpack.title)
    
    // Simulate API call for redeeming offer
    setTimeout(() => {
      alert(`Redeeming offer for: ${hackerpack.title}`)
      setLoading(`redeem-${hackerpack.hackerpack_id}`, false)
    }, 1000)
  }

  const getImagePlaceholder = (index: number) => {
    const colors = [
      'bg-[var(--color-secondary-opacity40)]',
      'bg-[var(--color-primary-opacity40)]',
      'bg-[var(--color-alerts-opacity40)]',
      'bg-[var(--color-light-opacity30)]',
      'bg-[var(--color-primary-opacity60)]',
      'bg-[var(--color-secondary-opacity60)]'
    ]
    return colors[index % colors.length]
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
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <Loading message="Loading hackerpacks..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />
        <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className={`${style.font.mono.text} text-[var(--color-alerts-opacity100)] mb-4`}>Error loading hackerpacks: {error}</p>
              <MainButton 
                onClick={() => window.location.reload()}
                variant="primary"
                size="default"
                className="text-center justify-center"
                showIcon={false}
              >
                Retry
              </MainButton>
            </div>
          </div>
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
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
        {/* Main Content Area */}
        <div className="flex-1 p-8 pt-[6%]">
          {/* Page Title and Description */}
          <div className="mb-8">
            <h1 className={`${style.font.grotesk.heavy} text-4xl text-[var(--color-light-opacity100)] mb-6`}>
              Hackerpack
            </h1>
            <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-lg leading-relaxed max-w-4xl`}>
              We want you to focus entirely on making your hackathon project as awesome as possible! The software and tools provided by our partners are here to help you unlock your creativity and get the most out of your learning experience during the event.
            </p>
          </div>

          {/* Hackerpacks Content */}
          {hackerpacks.length === 0 ? (
            <div className="text-center py-12">
              <div className={`w-16 h-16 bg-[var(--color-white-opacity10)] ${style.border.radius.full} flex items-center justify-center mx-auto mb-4`}>
                <svg className="w-8 h-8 text-[var(--color-light-opacity40)]" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                </svg>
              </div>
              <h3 className={`${style.font.grotesk.medium} text-xl text-[var(--color-light-opacity100)] mb-2`}>No Hackerpacks Available</h3>
              <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)]`}>Hackerpack offers for this event will be announced soon. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {hackerpacks.map((hackerpack, index) => (
                <div key={hackerpack.hackerpack_id} className={`${style.box.gray.bottom} p-6 flex gap-6`}>
                  {/* Image Placeholder */}
                  <div className={`w-48 aspect-square ${style.border.radius.middle} flex items-center justify-center flex-shrink-0 ${getImagePlaceholder(index)}`}>
                    <svg className="w-12 h-12 text-[var(--color-light-opacity40)]" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className={`${style.font.grotesk.medium} text-xl text-[var(--color-light-opacity100)]`}>
                          {hackerpack.title}
                        </h3>
                      </div>
                      <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-sm leading-relaxed`}>
                        {hackerpack.content}
                      </p>
                    </div>
                    
                    {/* Separator line and button */}
                    <div className="mt-6">
                      <div className="border-t border-[var(--color-white-opacity20)] mb-4"></div>
                      <MainButton 
                        onClick={() => handleRedeemOffer(hackerpack)}
                        disabled={!hackerpack.is_published}
                        variant={hackerpack.is_published ? "primary" : "gray"}
                        size="sm"
                        className="text-center justify-center"
                        showIcon={false}
                      >
                        {hackerpack.is_published ? 'Redeem Offer' : 'Not Available'}
                      </MainButton>
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