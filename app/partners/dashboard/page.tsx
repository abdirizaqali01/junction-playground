'use client'

import React from 'react'
import Sidebar from '@/components/partner/navigation/Sidebar'
import PageHeader from '@/components/partner/layout/PageHeader'
import StatCard from '@/components/partner/cards/StatCard'
import ProjectCard from '@/components/partner/cards/ProjectCard'
import ReviewCard from '@/components/partner/cards/ReviewCard'
import MiniProjectCard from '@/components/partner/cards/MiniProjectCard'
import HorizontalScrollSection from '@/components/Layout/HorizontalScrollSection'
import { DEFAULT_REVIEWER, useProjects } from '@/hooks/useProjects'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const { projects, recentReviews, lastViewedProjectId } = useProjects()
  const currentUserId = DEFAULT_REVIEWER.id

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

  // Get most recently viewed submission
  const recentlyViewedProject =
    (lastViewedProjectId && projects.find(p => p.id === lastViewedProjectId)) ||
    projects.filter(p => p.reviewed).slice(-1)[0] ||
    projects[0]

  // Get unreviewed submissions for review queue
  const submissionsToReview = projects.filter(
    p => !p.reviews.some(review => review.reviewerId === currentUserId)
  )

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <div className="fixed top-0 left-0 h-screen z-50">
        <Sidebar />
      </div>

      <div
        className="flex flex-1 items-start justify-center overflow-y-auto"
        style={{
          marginLeft: 'var(--partner-sidebar-width)',
          width: 'calc(100% - var(--partner-sidebar-width))',
        }}
      >
        <main className="w-full" style={{ maxWidth: '1280px' }}>
          <div className="w-full px-[4%] pt-[3%] pb-[2%]">
            <div className="mb-8">
              <PageHeader title="Dashboard" timer="T 18:46:09" />
            </div>

            {/* Stats Section */}
            <section className="mb-10 w-full">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-base text-white/70 sm:text-lg lg:text-xl">Your Challenge's Stats</h2>
              </div>
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
                {stats.map((stat, index) => (
                  <StatCard key={index} label={stat.label} value={stat.value} />
                ))}
              </div>
            </section>

            {/* Most Recently Viewed Submission */}
            {recentlyViewedProject && (
              <section className="mb-8">
                <div className="mb-4 flex flex-nowrap items-center justify-between gap-4 overflow-x-auto pb-1">
                  <h2 className="whitespace-nowrap text-lg font-semibold text-white sm:text-xl">
                    Most Recently Viewed Submission
                  </h2>
                  <button
                    onClick={() => router.push('/partners/submissions')}
                    className="flex-shrink-0 whitespace-nowrap rounded-lg border border-[#55D186] px-5 py-2 text-sm text-[#55D186] transition-colors hover:bg-[#55D186]/10"
                  >
                    View all Submissions
                  </button>
                </div>
                <ProjectCard
                  id={recentlyViewedProject.id}
                  title={recentlyViewedProject.title}
                  team={recentlyViewedProject.team}
                  description={recentlyViewedProject.description}
                  imageUrl={recentlyViewedProject.imageUrl}
                  rating={recentlyViewedProject.rating}
                  time={recentlyViewedProject.time}
                  comments={recentlyViewedProject.comments}
                />
              </section>
            )}

            {/* Most Recent Reviews */}
            <HorizontalScrollSection
              title="Most Recent Reviews"
              viewAllText="View all Reviews"
              onViewAll={() => router.push('/partners/submissions')}
            >
              {recentReviews.slice(0, 6).map((review) => (
                <ReviewCard
                  key={`${review.projectId}-${review.reviewerId}-${review.reviewedAt}`}
                  reviewerName={review.reviewerName ?? review.reviewerId}
                  rating={review.score}
                  projectName={review.projectTitle}
                  feedback={review.feedback}
                  timestamp={review.reviewedAt}
                  onProjectClick={() => router.push(`/partners/${review.projectId}/review`)}
                />
              ))}
            </HorizontalScrollSection>

            {/* Submissions To Review Next */}
            <HorizontalScrollSection
              title="Submissions To Review Next"
              onViewAll={() => router.push('/partners/submissions')}
            >
              {submissionsToReview.map((submission) => {
                const fallbackRating = submission.reviews.length
                  ? parseFloat(
                      (
                        submission.reviews.reduce((acc, curr) => acc + curr.score, 0) /
                        submission.reviews.length
                      ).toFixed(1)
                    )
                  : undefined

                return (
                  <MiniProjectCard
                    key={submission.id}
                    title={submission.title}
                    team={submission.team}
                    description={submission.description}
                    imageUrl={submission.imageUrl}
                    rating={
                      submission.reviews.length
                        ? submission.rating ?? fallbackRating ?? null
                        : undefined
                    }
                    onReview={() => router.push(`/partners/${submission.id}/review`)}
                  />
                )
              })}
            </HorizontalScrollSection>
          </div>
        </main>
      </div>
    </div>
  )
}
