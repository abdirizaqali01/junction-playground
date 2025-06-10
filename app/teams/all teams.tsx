'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

interface TeamCard {
  id: number
  name: string
  type: 'available' | 'working'
  description?: string
  availableRoles: string[]
}

interface TeamManagementData {
  pageTitle: string
  navigationTabs: {
    all: string
    my: string
    candidates: string
    challenges: string
  }
  joinTeamButton: string
  teams: TeamCard[]
  emptyStateMessage: string
  labels: {
    workingOn: string
    availableRoles: string
  }
}

export default function TeamManagementPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'candidates'>('all')
  
  // Static data dictionary - backend team can replace with API calls
  const teamManagementData: TeamManagementData = {
    pageTitle: "Team management",
    navigationTabs: {
      all: "ALL TEAMS",
      my: "MY TEAM",
      candidates: "TEAM CANDIDATES",
      challenges: "ALL CHALLENGES"
    },
    joinTeamButton: "Join a team using a code",
    teams: [
      {
        id: 1,
        name: 'Name of team',
        type: 'available',
        availableRoles: ['Role name']
      },
      {
        id: 2,
        name: 'Name of team',
        type: 'working',
        description: 'Description of project.',
        availableRoles: ['Role name']
      },
      {
        id: 3,
        name: 'Name of team',
        type: 'available',
        availableRoles: ['Role name']
      }
    ],
    emptyStateMessage: "No teams available",
    labels: {
      workingOn: "Working on",
      availableRoles: "Available roles"
    }
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
              {teamManagementData.navigationTabs.all}
            </button>
            <button 
              onClick={() => setActiveTab('my')}
              className={`text-xs font-['Space_Mono'] font-medium tracking-wider transition-colors ${
                activeTab === 'my' 
                  ? 'text-white underline' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {teamManagementData.navigationTabs.my}
            </button>
            <button 
              onClick={() => setActiveTab('candidates')}
              className={`text-xs font-['Space_Mono'] font-medium tracking-wider transition-colors ${
                activeTab === 'candidates' 
                  ? 'text-white underline' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {teamManagementData.navigationTabs.candidates}
            </button>
          </div>
          
          {/* Right Navigation */}
          <div>
            <button className="text-xs font-['Space_Mono'] font-medium tracking-wider text-white/60 hover:text-white/80 transition-colors">
              {teamManagementData.navigationTabs.challenges}
            </button>
          </div>
        </div>
      </div>

      {/* Join Team Button - Only shown when no teams */}
      {teamManagementData.teams.length === 0 && (
        <div className="bg-black">
          <div className="container mx-auto px-6 py-4">
            <button className="px-4 py-2 border border-green-600/40 text-white text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors">
              {teamManagementData.joinTeamButton}
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-white">{teamManagementData.pageTitle}</h1>
        </div>

        {/* Team Cards Grid or Empty State */}
        {teamManagementData.teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamManagementData.teams.map((team) => (
              <div key={team.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                {/* Card Header with Muted Gradient */}
                <div className="h-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500"></div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-4">{team.name}</h3>
                  
                  {/* Working On Section (only for working teams) */}
                  {team.type === 'working' && team.description && (
                    <div className="mb-4">
                      <p className="text-white/60 text-sm font-['Inter'] mb-2">{teamManagementData.labels.workingOn}</p>
                      <p className="text-white/80 text-sm font-['Inter']">{team.description}</p>
                    </div>
                  )}
                  
                  {/* Available Roles Section */}
                  <div className="mb-6">
                    <p className="text-white/60 text-sm font-['Inter'] mb-3">{teamManagementData.labels.availableRoles}</p>
                    <div className="flex flex-wrap gap-2">
                      {team.availableRoles.map((role, index) => (
                        <button
                          key={index}
                          className="px-4 py-2 bg-transparent border border-green-600/40 text-green-300/80 text-sm font-['Space_Mono'] rounded-full hover:bg-green-600/10 transition-colors"
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/60 text-lg font-['Inter']">{teamManagementData.emptyStateMessage}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}