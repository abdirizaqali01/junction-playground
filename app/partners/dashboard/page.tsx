'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import PageHeader from '@/components/Layout/PageHeader'
import StatCard from '@/components/Cards/StatCard'
import ProjectCard from '@/components/Cards/ProjectCard'
import ReviewCard from '@/components/Cards/ReviewCard'
import MiniProjectCard from '@/components/Cards/MiniProjectCard'
import HorizontalScrollSection from '@/components/Layout/HorizontalScrollSection'
import { useProjects } from '@/hooks/useProjects'

export default function DashboardPage() {
  const { projects, toggleBookmark } = useProjects()

  // Calculate stats from projects
  const totalSubmissions = projects.length
  const reviewedSubmissions = projects.filter(p => p.reviewed).length
  const uniqueTeams = new Set(projects.map(p => p.team)).size
  const projectsWithRatings = projects.filter(p => p.rating !== undefined)
  const averageRating = projectsWithRatings.length > 0
    ? parseFloat((projectsWithRatings.reduce((sum, p) => sum + (p.rating || 0), 0) / projectsWithRatings.length).toFixed(1))
    : 0

  const stats = [
    { label: 'Teams Participating', value: uniqueTeams },
    { label: 'Total Submissions', value: totalSubmissions },
    { label: 'Submissions Reviewed', value: reviewedSubmissions },
    { label: 'Average Rating', value: averageRating },
  ]

  // Get most recently viewed (last reviewed project)
  const recentlyViewedProject = projects.filter(p => p.reviewed).slice(-1)[0] || projects[0]

  // Mock review data - replace with real data when available
  const recentReviews = [
    {
      teamName: 'Team Mate 2',
      rating: 8,
      projectName: 'Project Name',
      feedback: "This is going to be text from either the partner themselves, or any of their teammates feedback on the submitted project. It's supposed to help the partner better evaluate which project they want to place in the top 3, and express their views to the participant...",
      timestamp: '14 minutes ago',
    },
    {
      teamName: 'Team Mate 3',
      rating: 9,
      projectName: 'Project Name',
      feedback: "This is going to be text from either the partner themselves, or any of their teammates feedback on the submitted project. It's supposed to help the partner better evaluate which project they want to place in the top 3, and express their views to the participant...",
      timestamp: '3 minutes ago',
    },
    {
      teamName: 'Team Mate 4',
      rating: 7.5,
      projectName: 'Project Name',
      feedback: "This is going to be text from either the partner themselves, or any of their teammates feedback on the submitted project.",
      timestamp: '25 minutes ago',
    },
  ]

  // Get unreviewed submissions for review queue
  const submissionsToReview = projects.filter(p => !p.reviewed)

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white overflow-hidden">
      <div className="fixed top-0 left-0 h-screen z-50">
        <Sidebar />
      </div>

      <main className="flex-1 ml-[280px] overflow-y-auto h-screen">
        <div className="sticky top-0 z-40 bg-[#0D0D0D] px-8 pt-8">
          <PageHeader title="Dashboard" timer="T 18:46:09" />
        </div>
        <div className="w-full max-w-[1200px] px-8 pb-8">

          {/* Stats Section */}
          <section className="mb-8">
            <h2 className="text-lg text-white/60 mb-4">Your Challenge's Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <StatCard key={index} label={stat.label} value={stat.value} />
              ))}
            </div>
          </section>

          {/* Most Recently Viewed Submission */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Most Recently Viewed Submission</h2>
              <button className="text-sm text-[#55D186] border border-[#55D186] rounded-lg px-4 py-1.5 hover:bg-[#55D186]/10 transition-colors">
                View all Submissions
              </button>
            </div>
            <ProjectCard
              title={recentlyViewedProject.title}
              team={recentlyViewedProject.team}
              description={recentlyViewedProject.description}
              imageUrl={recentlyViewedProject.imageUrl}
              rating={recentlyViewedProject.rating}
              time={recentlyViewedProject.time}
              comments={recentlyViewedProject.comments}
            />
          </section>

          {/* Most Recent Reviews */}
          <HorizontalScrollSection
            title="Most Recent Reviews"
            viewAllText="View all Reviews"
            onViewAll={() => console.log('View all reviews')}
          >
            {recentReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </HorizontalScrollSection>

          {/* Submissions To Review Next */}
          <HorizontalScrollSection
            title="Submissions To Review Next"
            onViewAll={() => console.log('View all submissions')}
          >
            {submissionsToReview.map((submission, index) => (
              <MiniProjectCard
                key={index}
                title={submission.title}
                team={submission.team}
                description={submission.description}
                imageUrl={submission.imageUrl}
                rating={submission.rating}
                onReview={() => console.log('Review', submission.title)}
              />
            ))}
          </HorizontalScrollSection>
        </div>
      </main>
    </div>
  )
}