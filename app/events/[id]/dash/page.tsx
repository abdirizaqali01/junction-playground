'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Footer } from "@/components/footer"
import { MainButton } from "@/components/attachables/main-button"
import * as style from '@/styles/design-system'
import { initializeCSSVariables } from '@/styles/design-system'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

// Static data for the dashboard
const submissionData = {
  title: "Project Title",
  status: "Draft",
  upcomingDeadlines: [
    { task: "Draft Submission", time: "Today at 23:59" }
  ]
}

const scheduleData = [
  { day: "Day 1", event: "Kickoff & Teambuilding", time: "12:00 - 18:00" },
  { day: "Day 1", event: "Kickoff & Teambuilding", time: "12:00 - 18:00" },
  { day: "Day 1", event: "Kickoff & Teambuilding", time: "12:00 - 18:00" },
  { day: "Day 1", event: "Kickoff & Teambuilding", time: "12:00 - 18:00" }
]

const sideEventsData = [
  { name: "Yoga Session", location: "Stage Area" }
]

const announcementsData = [
  {
    id: 1,
    author: "Junction HQ",
    time: "Today at 21:01",
    content: "Junction 2023 projects are public and can be found on the Junction Platform: https://app.junction-platform.com/projects/junction-2023"
  },
  {
    id: 2,
    author: "Junction HQ", 
    time: "Today at 20:39",
    content: "Hey @everyone This is a reminder that the deadline for submissions is 23:00. Please make sure that your video is 2 minutes long MAX and that everything is submitted properly to avoid issues in the second later! The submission form closes automatically and unfortunately we won't accept any late submissions. Get your project to FINAL from DRAFT before the final deadline. Draft projects are not reviewed. You can edit the submission any time before the deadline. Best wishes, Junction Team"
  },
  {
    id: 3,
    author: "Junction HQ",
    time: "Today at 19:30", 
    content: "20 minutes until F-E-E-H-U-K-Q exit! In the lounge let's party for a little, give your brain a rest."
  }
]

export default function EventDashboard() {
  const router = useRouter()

  //-------------------------------- DESIGN SYSTEM ACTUATOR --------------------------------//
  useEffect(() => {
    initializeCSSVariables();
  }, []);

  const handleBackToHome = () => {
    router.push('/dash')
  }

  const handleEditSubmission = () => {
    router.push('/events/[id]/submissions')
  }

  const handleViewChallenges = () => {
    router.push('/events/[id]/challenges')
  }

  const handleBookMeeting = () => {
    router.push('/events/[id]/meetings')
  }

  const handleHackerpack = () => {
    router.push('/events/[id]/hackerpack')
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
      <div className="flex-1 overflow-auto transition-all duration-300 ml-[250px]">
        <div className="p-4 lg:p-6 pt-[3vh]">
          {/* Header */}
          <h1 className={`${style.font.grotesk.heavy} text-3xl lg:text-4xl text-[var(--color-light-opacity100)] mb-4 lg:mb-6`}>
            Dashboard
          </h1>

          {/* Main Content Grid - Dynamic layout with 30% wider announcements */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-6 mb-4 lg:mb-6 lg:items-start">
            
            {/* Left Column - Main content */}
            <div className="lg:col-span-7 space-y-4 lg:space-y-5">
              {/* Your Submission Card - Responsive sizing */}
              <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-primary-opacity40)] rounded-xl p-4 lg:p-8 relative overflow-hidden">
                <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8">
                  {/* Left side - Responsive image placeholder with Draft badge */}
                  <div className="relative w-full lg:w-40 h-32 lg:h-40 bg-[var(--color-light-opacity20)] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[var(--color-light-opacity30)] rounded-full"></div>
                    {/* Draft status badge on top of image */}
                    <div className="absolute top-2 lg:top-3 left-2 lg:left-3">
                      <span className="px-2 lg:px-3 py-1 bg-[var(--color-alerts-opacity100)] text-[var(--color-light-opacity100)] text-xs font-medium rounded-full font-space-mono">
                        {submissionData.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Right side - Content */}
                  <div className="flex-1 flex flex-col justify-between min-h-0">
                    {/* Top row - Title and Edit button aligned */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 lg:mb-6">
                      <div className="mb-4 lg:mb-0">
                        <h2 className={`${style.font.grotesk.heavy} text-2xl lg:text-3xl text-[var(--color-light-opacity100)] mb-2`}>
                          Your Submission
                        </h2>
                        <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-base lg:text-lg`}>
                          {submissionData.title}
                        </p>
                      </div>
                      
                      <MainButton 
                        onClick={handleEditSubmission}
                        variant="default"
                        size="default"
                      >
                        Edit Submission
                      </MainButton>
                    </div>

                    {/* Combined card for deadlines - positioned at bottom */}
                    <div className="bg-[var(--color-white-opacity10)] rounded-lg p-3 lg:p-4">
                      {/* Upcoming Deadlines header */}
                      <div className="pb-2">
                        <h3 className={`${style.font.grotesk.medium} text-[var(--color-light-opacity100)] text-sm lg:text-base`}>
                          Upcoming Deadlines
                        </h3>
                      </div>
                      
                      {/* White separator line */}
                      <div className="border-t border-[var(--color-white-opacity20)] my-3"></div>
                      
                      {/* Draft Submission row */}
                      <div className="flex justify-between items-center pt-2">
                        <span className={`${style.font.mono.text} text-[var(--color-light-opacity100)] text-sm lg:text-base`}>
                          Draft Submission
                        </span>
                        <span className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-sm lg:text-base`}>
                          Today at 23:59
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Section - Fixed height with scrolling */}
              <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity10)] rounded-xl p-4 lg:p-5 h-64 flex flex-col">
                <h2 className={`${style.font.grotesk.heavy} text-lg lg:text-xl text-[var(--color-light-opacity100)] mb-3 lg:mb-4 flex-shrink-0`}>
                  Schedule
                </h2>
                <div className="space-y-2 lg:space-y-3 flex-1 overflow-y-auto">
                  {scheduleData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-[var(--color-white-opacity10)] last:border-b-0">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <span className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-xs font-medium`}>
                          {item.day}
                        </span>
                        <span className={`${style.font.mono.text} text-[var(--color-light-opacity100)] font-medium text-xs lg:text-sm`}>
                          {item.event}
                        </span>
                      </div>
                      <span className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-xs`}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Announcements (constrained height to match left column) */}
            <div className="lg:col-span-3">
              <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-white-opacity10)] rounded-xl p-4 lg:p-5 flex flex-col max-h-[calc(16rem+20rem+1rem)]">
                <h2 className={`${style.font.grotesk.heavy} text-lg lg:text-xl text-[var(--color-light-opacity100)] mb-3 lg:mb-4 flex-shrink-0`}>
                  Announcements
                </h2>
                
                <div className="space-y-3 flex-1 overflow-y-auto min-h-0">
                  {announcementsData.map((announcement) => (
                    <div key={announcement.id} className="bg-[var(--color-white-opacity10)] rounded-lg p-3 flex-shrink-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`${style.font.mono.text} text-[var(--color-light-opacity100)] font-medium text-xs`}>
                          {announcement.author}
                        </span>
                        <span className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-xs`}>
                          {announcement.time}
                        </span>
                      </div>
                      <p className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-xs leading-relaxed`}>
                        {announcement.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ongoing Side Events - Dynamic sizing */}
          <div className="mb-4 lg:mb-6">
            <div className="bg-[var(--color-white-opacity10)] border border-[var(--color-primary-opacity40)] rounded-xl p-3 lg:p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-0">
                <div className="flex-1">
                  <span className={`${style.font.mono.text} text-[var(--color-primary-opacity100)] font-medium text-sm`}>
                    Ongoing Side Events
                  </span>
                  <div className="flex items-center space-x-4 mt-1">
                    {sideEventsData.map((event, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className={`${style.font.mono.text} text-[var(--color-light-opacity60)] text-sm`}>
                          {event.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <span className={`${style.font.mono.text} text-[var(--color-primary-opacity60)] text-sm lg:text-right`}>
                  Stage Area
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions - Responsive layout */}
          <div className="mb-4 lg:mb-6">
            <h2 className={`${style.font.grotesk.heavy} text-lg lg:text-xl text-[var(--color-light-opacity100)] mb-3 lg:mb-4`}>
              Quick Actions
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap gap-3 lg:gap-4">
              <MainButton 
                onClick={handleViewChallenges}
                variant="outlineGray"
                size="default"
                className="w-full xl:w-auto"
                showIcon={false}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                  </svg>
                  <span>View Challenges</span>
                </div>
              </MainButton>
              
              <MainButton 
                onClick={handleBookMeeting}
                variant="outlineGray"
                size="default"
                className="w-full xl:w-auto"
                showIcon={false}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                  </svg>
                  <span>Book A Meeting</span>
                </div>
              </MainButton>
              
              <MainButton 
                onClick={handleHackerpack}
                variant="outlineGray"
                size="default"
                className="w-full xl:w-auto"
                showIcon={false}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                  </svg>
                  <span>Hackerpack</span>
                </div>
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}