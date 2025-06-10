'use client'

import { useRouter } from 'next/navigation'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'
import { ArrowLeft } from "lucide-react"

interface ChallengeData {
  partnerName: string
  challengeName: string
  subtitle: string
  about: string
  insights: string
  resources: string
  prices: {
    place: string
    description: string
  }[]
  criteria: {
    title: string
    description: string
  }[]
  scoreCriteria: {
    title: string
    description: string
  }[]
  companyInfo: {
    name: string
    description: string
    logo?: string
  }
}

export default function ChallengeDetailsPage() {
  const router = useRouter()
  
  // Static challenge data - can be replaced with API call
  const challengeData: ChallengeData = {
    partnerName: "Partner Name",
    challengeName: "Challenge name",
    subtitle: "Subtitle goes here",
    about: "Description goes here... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatem deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    insights: "Insights goes here... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatem deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    resources: "Resources goes here... at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatem deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.",
    prices: [
      {
        place: "1st place",
        description: "Description of prize"
      },
      {
        place: "2nd place", 
        description: "Description of prize"
      },
      {
        place: "3rd place",
        description: "Description of prize"
      }
    ],
    criteria: [
      {
        title: "Criteria 1",
        description: "Description of criteria"
      },
      {
        title: "Criteria 2",
        description: "Description of criteria"
      },
      {
        title: "Criteria 3",
        description: "Description of criteria"
      }
    ],
    scoreCriteria: [
      {
        title: "Criteria 1",
        description: "Description of criteria"
      },
      {
        title: "Criteria 2",
        description: "Description of criteria"
      },
      {
        title: "Criteria 3",
        description: "Description of criteria"
      }
    ],
    companyInfo: {
      name: "Company Info",
      description: "iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores! Voluptatem deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
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

      <div className="container mx-auto px-6 py-12 max-w-7xl relative">
        {/* Back to All Challenges Button */}
        <button 
          onClick={() => router.push("/challenges")} 
          className="absolute top-0 left-0 z-10 flex items-center space-x-2 text-white/70 hover:text-white transition-colors group ml-6 font-['Inter']"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all challenges</span>
        </button>

        {/* Header */}
        <div className="mb-12 mt-8">
          <p className="text-white text-base font-['Inter'] mb-4">{challengeData.partnerName}</p>
          <h1 className="text-5xl font-['Space_Grotesk'] font-bold text-white mb-4">{challengeData.challengeName}</h1>
          <p className="text-white/60 text-base font-['Inter']">{challengeData.subtitle}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">About</h2>
              <p className="text-white/60 text-sm leading-relaxed font-['Inter']">
                {challengeData.about}
              </p>
            </div>

            {/* Insights Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">Insights</h2>
              <p className="text-white/60 text-sm leading-relaxed font-['Inter']">
                {challengeData.insights}
              </p>
            </div>

            {/* Resources Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">Resources</h2>
              <p className="text-white/60 text-sm leading-relaxed font-['Inter']">
                {challengeData.resources}
              </p>
            </div>

            {/* Prices Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">Prices</h2>
              
              <div className="space-y-4">
                {challengeData.prices.map((price, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-['Space_Grotesk'] font-medium">{price.place}</p>
                      <p className="text-white/60 text-xs font-['Inter']">{price.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8">
            {/* Criteria Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">Criteria</h2>
              
              <div className="space-y-6">
                {challengeData.criteria.map((criterion, index) => (
                  <div key={index}>
                    <h3 className="text-white text-sm font-['Space_Grotesk'] font-medium mb-2">{criterion.title}</h3>
                    <p className="text-white/60 text-xs font-['Inter']">{criterion.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Criteria for Judges Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white mb-6">Score Criteria for Judges</h2>
              
              <div className="space-y-6">
                {challengeData.scoreCriteria.map((criterion, index) => (
                  <div key={index}>
                    <h3 className="text-white text-sm font-['Space_Grotesk'] font-medium mb-2">{criterion.title}</h3>
                    <p className="text-white/60 text-xs font-['Inter']">{criterion.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Info Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-white rounded flex-shrink-0"></div>
                <h2 className="text-xl font-['Space_Grotesk'] font-semibold text-white">{challengeData.companyInfo.name}</h2>
              </div>
              
              <p className="text-white/60 text-xs font-['Inter'] leading-relaxed">
                {challengeData.companyInfo.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}