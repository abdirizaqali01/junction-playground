'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

export default function ReviewingPage() {
  const handleStartReviewing = () => {
    console.log('Start reviewing projects')
    // This would open a new tab or navigate to the reviewing platform
  }

  const handleCopyLink = () => {
    // Copy the reviewing link to clipboard
    navigator.clipboard.writeText('https://reviewing-platform.example.com')
    console.log('Link copied to clipboard')
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

      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-5xl font-['Space_Grotesk'] font-bold text-white mb-8">Reviewing</h1>
          
          {/* Subtitle with Timer */}
          <p className="text-white/80 text-base font-['Inter'] font-medium mb-12">
            The reviewing period is open! Time left: *countdown timer*
          </p>
          
          {/* Description */}
          <p className="text-white/50 text-sm font-['Inter'] leading-relaxed mb-16 max-w-2xl mx-auto">
            Once you click "Start reviewing", a new tab will open on your browser were you can start reviewing the projects.
          </p>
          
          {/* Start Reviewing Button */}
          <button 
            onClick={handleStartReviewing}
            className="px-8 py-3 bg-green-600 text-black text-sm font-['Space_Mono'] rounded-full hover:bg-green-700 transition-colors mb-16"
          >
            Start reviewing projects
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}