'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

interface Candidate {
  id: number
  name: string
  appliedFor: string[]
  avatar?: string
}

interface TeamCandidatesData {
  pageTitle: string
  navigationTabs: {
    all: string
    my: string
    candidates: string
    challenges: string
  }
  candidates: Candidate[]
  emptyStateMessage: string
}

export default function TeamCandidatesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'candidates'>('candidates')
  
  // Static data dictionary - backend team can replace with API calls
  const teamCandidatesData: TeamCandidatesData = {
    pageTitle: "Team Candidates",
    navigationTabs: {
      all: "ALL TEAMS",
      my: "MY TEAM", 
      candidates: "TEAM CANDIDATES",
      challenges: "ALL CHALLENGES"
    },
    candidates: [
      {
        id: 1,
        name: 'John Smith',
        appliedFor: ['Role name'],
        avatar: ''
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        appliedFor: ['Frontend Developer', 'UI Designer'],
        avatar: ''
      },
      {
        id: 3,
        name: 'Mike Chen',
        appliedFor: ['Backend Developer'],
        avatar: ''
      }
    ],
    emptyStateMessage: "No candidates available"
  }

  const handleAccept = (candidateId: number) => {
    console.log('Accept candidate:', candidateId)
  }

  const handleDecline = (candidateId: number) => {
    console.log('Decline candidate:', candidateId)
  }

  const handleViewApplication = (candidateId: number) => {
    console.log('View full application for candidate:', candidateId)
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

      {/* Navigation Bar */}
      <div className="bg-black">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Navigation */}
          <div className="flex items-center space-x-12">
            <button 
              onClick={() => setActiveTab('all')}
              className={`text-xs font-['Space_Mono'] font-medium tracking-wider transition-colors ${
                activeTab === 'all' 
                  ? 'text-white underline' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {teamCandidatesData.navigationTabs.all}
            </button>
            <button 
              onClick={() => setActiveTab('my')}
              className={`text-xs font-['Space_Mono'] font-medium tracking-wider transition-colors ${
                activeTab === 'my' 
                  ? 'text-white underline' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {teamCandidatesData.navigationTabs.my}
            </button>
            <button 
              onClick={() => setActiveTab('candidates')}
              className={`text-xs font-['Space_Mono'] font-medium tracking-wider transition-colors ${
                activeTab === 'candidates' 
                  ? 'text-white underline' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {teamCandidatesData.navigationTabs.candidates}
            </button>
          </div>
          
          {/* Right Navigation */}
          <div>
            <button className="text-xs font-['Space_Mono'] font-medium tracking-wider text-white/60 hover:text-white/80 transition-colors">
              {teamCandidatesData.navigationTabs.challenges}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-white">{teamCandidatesData.pageTitle}</h1>
        </div>

        {/* Candidates Grid or Empty State */}
        {teamCandidatesData.candidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamCandidatesData.candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
                {/* Candidate Header */}
                <div className="flex items-center space-x-4 mb-8">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/30 rounded flex items-center justify-center">
                      <span className="text-white/60 text-xs">📷</span>
                    </div>
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-2xl font-['Space_Grotesk'] font-semibold text-white">{candidate.name}</h3>
                </div>

                {/* View Application Link */}
                <button 
                  onClick={() => handleViewApplication(candidate.id)}
                  className="text-green-400 text-base font-['Inter'] mb-12 hover:text-green-300 transition-colors block text-left"
                >
                  View full application
                </button>
                
                {/* Applied For Section */}
                <div className="mb-16 flex-grow">
                  <p className="text-white text-lg font-['Inter'] mb-6">Applied for</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.appliedFor.map((role, index) => (
                      <span
                        key={index}
                        className="px-6 py-3 bg-transparent border border-green-600/40 text-white text-sm font-['Space_Mono'] rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-auto">
                  <button 
                    onClick={() => handleAccept(candidate.id)}
                    className="text-white text-base font-['Space_Mono'] hover:text-green-400 transition-colors"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleDecline(candidate.id)}
                    className="text-white text-base font-['Space_Mono'] hover:text-red-400 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/60 text-lg font-['Inter']">{teamCandidatesData.emptyStateMessage}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}