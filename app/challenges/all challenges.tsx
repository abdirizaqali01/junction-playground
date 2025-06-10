'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

interface Challenge {
  id: number
  name: string
  description: string
  theme: string
  difficulty: string
}

export default function ChallengesPage() {
  const challenges: Challenge[] = [
    {
      id: 1,
      name: 'Challenge name',
      description: 'Short description of challenge here lorem ipsum tortor metus, sollicitudin at dolor at, eleifend faucibus libero.',
      theme: 'Theme',
      difficulty: 'Difficulty level'
    },
    {
      id: 2,
      name: 'Challenge name',
      description: 'Short description of challenge here lorem ipsum tortor metus, sollicitudin at dolor at, eleifend faucibus libero.',
      theme: 'Theme',
      difficulty: 'Difficulty level'
    },
    {
      id: 3,
      name: 'Challenge name',
      description: 'Short description of challenge here lorem ipsum tortor metus, sollicitudin at dolor at, eleifend faucibus libero.',
      theme: 'Theme',
      difficulty: 'Difficulty level'
    }
  ]

  const handleViewDetails = (challengeId: number) => {
    console.log('View details for challenge:', challengeId)
  }

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

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-['Space_Grotesk'] font-bold text-white mb-6">Challenges</h1>
          <p className="text-white/60 text-lg font-['Inter'] max-w-2xl mx-auto">
            Get to know the exciting challenges and the wonderful partners providing them!
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col h-96 relative">
              {/* Challenge Content */}
              <div className="mb-8">
                <h3 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">{challenge.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-['Inter']">
                  {challenge.description}
                </p>
              </div>
              
              {/* Bottom Section */}
              <div className="mt-auto">
                {/* Tags - Stacked Vertically */}
                <div className="flex flex-col gap-3 mb-6">
                  <span className="px-4 py-2 bg-green-600 text-white text-sm font-['Space_Mono'] rounded-full text-center w-fit">
                    {challenge.theme}
                  </span>
                  <span className="px-4 py-2 bg-transparent border border-white/25 text-white/70 text-sm font-['Space_Mono'] rounded-full text-center w-fit">
                    {challenge.difficulty}
                  </span>
                </div>
              </div>

              {/* View Details Link - Right Side */}
              <button 
                onClick={() => handleViewDetails(challenge.id)}
                className="absolute bottom-8 right-8 text-white/60 hover:text-white/80 text-sm font-['Space_Mono'] transition-colors"
              >
                View details
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}