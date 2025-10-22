'use client'

import React from 'react'
import PageHeader from '@/components/partner/layout/PageHeader'
import StatCard from '@/components/partner/cards/StatCard'
import ProjectCard from '@/components/partner/cards/ProjectCard'
import ReviewCard from '@/components/partner/cards/ReviewCard'
import MiniProjectCard from '@/components/partner/cards/MiniProjectCard'
import HorizontalScrollSection from '@/components/Layout/HorizontalScrollSection'
import { DEFAULT_REVIEWER, useProjects } from '@/hooks/useProjects'
import { useRouter } from 'next/navigation'
import PartnerLayout from '@/components/partner/layout/PartnerLayout'
import {
  PartnerButton,
  partnerAccents,
  partnerText,
} from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

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
    <PartnerLayout forcedActivePath="/partners/dashboard">
      <div className="space-y-10">
        <div>
          <PageHeader title="Dashboard" timer="T 18:46:09" />
        </div>

        {/* Stats Section */}
        <section className="w-full space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              className="text-base sm:text-lg lg:text-xl"
              style={{ color: partnerText.secondary }}
            >
              Your Challenge&apos;s Stats
            </h2>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={index} label={stat.label} value={stat.value} />
            ))}
          </div>
        </section>

        {/* Most Recently Viewed Submission */}
        {recentlyViewedProject && (
          <section className="space-y-4">
            <div className="flex flex-nowrap items-center justify-between gap-4 overflow-x-auto pb-1">
              <h2
                className="whitespace-nowrap text-lg font-semibold sm:text-xl"
                style={{ color: partnerText.primary }}
              >
                Most Recently Viewed Submission
              </h2>
              <PartnerButton
                variant="ghost"
                onClick={() => router.push('/partners/submissions')}
                className="flex-shrink-0 whitespace-nowrap border hover:bg-[var(--partner-button-hover)]"
                style={withVars(
                  {
                    borderColor: partnerAccents.solid,
                    color: partnerAccents.solid,
                  },
                  { '--partner-button-hover': partnerAccents.tint }
                )}
              >
                View all Submissions
              </PartnerButton>
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
              rating={review.averageScore}
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
                    submission.reviews.reduce(
                      (acc, curr) => acc + curr.averageScore,
                      0
                    ) /
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
    </PartnerLayout>
  )
}
