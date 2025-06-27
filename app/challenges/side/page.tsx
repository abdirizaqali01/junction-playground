'use client'

import { useState } from 'react'
import { Footer } from "@/components/footer"
import Sidebar from '@/components/sidebar'

// Define your navigation data
const navigationSections = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
          </svg>
        )
      },
      {
        id: 'challenges',
        label: 'Challenges',
        href: '#',
        isActive: true,
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
          </svg>
        )
      },
      {
        id: 'team',
        label: 'Team',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
          </svg>
        )
      },
      {
        id: 'hackerpack',
        label: 'Hackerpack',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
          </svg>
        )
      }
    ]
  },
  {
    id: 'hackathon',
    title: 'During Hackathon',
    items: [
      {
        id: 'project-submission',
        label: 'Project Submission',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>
        )
      },
      {
        id: 'mentor-meetings',
        label: 'Mentor Meetings',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
          </svg>
        )
      },
      {
        id: 'review-projects',
        label: 'Review Projects',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
          </svg>
        )
      },
      {
        id: 'finalist-voting',
        label: 'Finalist Voting',
        href: '#',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
        )
      }
    ]
  }
]

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

export default function ChallengeDetailsPage() {
  const handleBackToHome = () => {
    // Handle navigation to home
    console.log('Navigate to home')
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        navigationSections={navigationSections}
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 pt-[3%] ml-[250px]">
        {/* Header */}
        <div className="bg-black border-b border-white/10 px-8 py-6">
          <button className="flex items-center text-white/60 hover:text-white text-sm mb-6">
            <span className="mr-2">←</span>
            Back To Challenges
          </button>
        </div>

        {/* Hero Banner with Blurred Background */}
        <div className="relative h-64 bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-400 flex items-end overflow-hidden">
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-400 filter blur-sm"></div>
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Text Content - Bottom Left */}
          <div className="relative z-10 p-6 pb-6">
            <div className="text-sm text-white/90 mb-2 font-mono">Side Challenge</div>
            <h1 className="text-3xl font-bold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Best Use Of AI Voice Agents
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 border border-white/15 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  The Side Challenge
                </h2>
                
                <div className="space-y-4 text-base text-white/80 leading-relaxed font-mono">
                  <p>
                    Your challenge, should you accept it, is to build a sustainable AI assistant for dynamic information retrieval and summarization to 
                    improve customer office and also operational efficiency. We want you to use them to bring strong, effective, user-friendly AI tools to 
                    focus on two aspects of <span className="text-green-400">Sustainable AI: trustworthiness and efficiency</span> (which we are using here as a proxy for ecological 
                    sustainability through more limited energy use and carbon footprints). So this is not "just" about building an information retrieval 
                    assistant and feeding huge amounts of data to an enormous model – that is pretty too. We want you to build a system that accomplishes 
                    the same but in a very different way, and that makes things quite a bit more challenging – so you need to work 
                    smart not just hard on how you accomplish the task, so "trustworthy" this will not result in the desired outcome. But hey, that's why 
                    this is called a challenge; we know you are up for it!
                  </p>

                  <p>
                    Trustworthiness has also a few different aspects. First, it is about using the right data – as correct information as possible so the 
                    source. We all know that AI internet is not necessarily always correct... so how do you know what sources to trust? But even when 
                    you have the right information, summarizing that might not always get you what you want either. One of the fairly common 
                    challenges of generative models is the phenomenon of "effectiveness: getting results to questions where there are none. This leads to a lack 
                    of trust and can even be a barrier to usage. You should strive to build a system that bases it its outputs on sources you can trust and 
                    avoids situations to ensure the outputs of the system are reliable and trustworthy.
                  </p>

                  <p>
                    Furthermore, as we know, large language models are quite resource intensive. Especially training models tends to consume large 
                    amounts of energy, but the inference (when the Artificial Intelligence AI is used) can be costly – especially when done at scale. As it is not in 
                    scope for this challenge to build a model from scratch, let's focus on the computational costs related to using an existing model – 
                    both in terms of computational load to choose and how we use it. This is something we can often control better in practical applications 
                    too: as even if we use large, large models, we can definitely decide which ones to use and how we use them. So while this is a very 
                    context case of the large, resource intensive process is to generalize the system or the biggest context or just piles (tens or hundreds 
                    of queries to a model – it is the total cost that counts) – and a big part of the challenge is to optimize the resource usage while still 
                    getting great results.
                  </p>

                  <p>
                    This solution, if successful, can make a huge difference – and shed light on how tasks like can be accomplished in a sustainable way. 
                    So it is not just about building something very cool and useful but showcasing how thinking about all of the sustainability of AI can 
                    make a real positive difference!
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Prizes Card */}
              <div className="bg-white/15 border border-white/20 rounded-3xl p-12 min-w-[400px]">
                <h3 className="text-4xl font-semibold text-white mb-8" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Prizes
                </h3>
                
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-10 h-10 text-green-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-medium text-white mb-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Winning Prize</div>
                    <div className="text-lg text-white/60 font-mono">Winning team will get 2000€</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}