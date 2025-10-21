'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar/Sidebar'
import PageHeader from '@/components/Layout/PageHeader'
import { DEFAULT_REVIEWER, useProjects } from '@/hooks/useProjects'
import { CollapsibleSection } from '@/components/CollapsibleSection'
import { InfoSection } from '@/components/InfoSection'
import { VideoPlayer } from '@/components/VideoPlayer'
import { ImageGallery } from '@/components/ImageGallery'
import { ScoringSection } from '@/components/ScoringSection'
import { ArrowLeft } from 'lucide-react'
import { ScoreBox } from '@/components/ScoreBox'
import { ScoreSubmittedCard } from '@/components/ScoreSubmittedCard'

export default function ProjectReviewPage() {
  const params = useParams()
  const router = useRouter()
  const { projects, getReviewForUser, markProjectViewed } = useProjects()

  const projectId = params.id as string
  const project = projects.find((p) => p.id === projectId)

  const currentUserId = DEFAULT_REVIEWER.id
  const currentUserName = DEFAULT_REVIEWER.name

  const existingReview = getReviewForUser(projectId, currentUserId)
  const [isReviewing, setIsReviewing] = useState(false)
  const [showSubmitted, setShowSubmitted] = useState(false)

  useEffect(() => {
    if (isReviewing || showSubmitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isReviewing, showSubmitted])

  useEffect(() => {
    if (!project) return
    markProjectViewed(project.id)
  }, [project?.id, markProjectViewed])

  if (!project) {
    return (
      <div className="flex min-h-screen bg-[#0D0D0D] text-white">
        <Sidebar />
        <main className="flex-1 ml-0 lg:ml-[clamp(220px,18vw,320px)] overflow-auto">
          <div className="w-full flex justify-center px-[4%] py-[4%]">
            <div className="w-full max-w-[1200px] text-center">
              <div className="py-[8%]">
                <h1 className="text-2xl font-semibold mb-4">Project Not Found</h1>
                <button
                  onClick={() => router.push('/partners/submissions')}
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  ← Back to Submissions
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const breadcrumbItems = ['Dashboard', 'Submissions', project.title]
  const projectDropdownItems = projects.map((p) => ({ id: p.id, title: p.title }))

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) router.push('/partners/dashboard')
    else if (index === 1) router.push('/partners/submissions')
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white">
      {(isReviewing || showSubmitted) && (
        <div className="fixed inset-0 left-0 lg:left-[clamp(220px,18vw,320px)] bg-[rgba(0,0,0,0.15)] backdrop-blur-md z-[90] pointer-events-none" />
      )}

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-[clamp(220px,18vw,320px)] overflow-auto">
        {/* Header */}
        <div className="px-[4%] pt-[3%]">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <PageHeader
                title="Project Submissions"
                timer={project.timer}
                breadcrumbItems={breadcrumbItems}
                status={project.status}
                onBreadcrumbClick={handleBreadcrumbClick}
                breadcrumbDropdownItems={projectDropdownItems}
                onBreadcrumbDropdownSelect={(id) =>
                  router.push(`/partners/${id}/review`)
                }
                currentItemId={project.id}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center px-[4%] pb-[2%]">
          <div className="w-full max-w-[1200px] relative">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-white">
                {project.title}{' '}
                <span className="text-[#55D186] font-normal">by {project.team}</span>
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-6 items-start">
              {/* Left Column */}
              <div className="col-span-3 lg:col-span-2">
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <VideoPlayer videoUrl={project.videoUrl} />
                <ImageGallery images={project.images} />

                <CollapsibleSection title="Full Project Description" defaultOpen>
                  {project.fullDescription}
                </CollapsibleSection>

                <CollapsibleSection title="Problem Statement">
                  {project.problemStatement}
                </CollapsibleSection>

                <CollapsibleSection title="Solution Approach">
                  {project.solutionApproach}
                </CollapsibleSection>

                {project.technicalDetails && (
                  <CollapsibleSection title="Technical Details">
                    {project.technicalDetails}
                  </CollapsibleSection>
                )}

                {/* Scoring Section */}
                <div className="relative z-[95]">
                  <ScoringSection reviews={project.reviews} />
                </div>

                {/* Review Section */}
                {!isReviewing && !showSubmitted && (
                  <>
                    {!existingReview ? (
                      // 🟢 Normal "Review" button for new reviews
                      <button
                        onClick={() => setIsReviewing(true)}
                        className="w-full bg-[#55D186] hover:bg-[#55D186]/90 text-white font-medium py-[2.5%] rounded-xl transition-colors"
                      >
                        Review
                      </button>
                    ) : (
                      // 🟩 Green info box for users who already submitted
                      <div className="w-full bg-[#55D186] rounded-xl px-[6%] py-[5%] text-center text-white">
                        <p className="text-lg font-medium mb-4">
                          You have submitted a Review already
                        </p>
                        <button
                          onClick={() => setIsReviewing(true)}
                          className="bg-white text-[#1A1A1A] font-semibold px-[6%] py-[2%] rounded-lg hover:bg-white/90 transition"
                        >
                          edit rating
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Right Column */}
              <div className="col-span-3 lg:col-span-1 mt-[5%] lg:mt-0">
                {project.demoUrl && (
                  <InfoSection
                    title="Links"
                    items={[{ label: 'Project Demo', url: project.demoUrl }]}
                  />
                )}
                {project.sourceCodeUrl && (
                  <InfoSection
                    title="Source Code"
                    items={[{ label: 'Repository', url: project.sourceCodeUrl }]}
                  />
                )}
                <InfoSection
                  title="Team"
                  items={project.teamMembers.map((member) => ({
                    label: member.name,
                    value: member.email,
                    action: member.showProfile
                      ? {
                          label: 'view profile',
                          onClick: () => console.log('View profile:', member.name),
                        }
                      : undefined,
                  }))}
                />
              </div>
            </div>

            {/* Review Overlay (modal) */}
            {isReviewing && (
              <ScoreBox
                projectId={projectId}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                onCancel={() => setIsReviewing(false)}
                onSubmit={() => {
                  setIsReviewing(false)
                  setShowSubmitted(true)
                }}
              />
            )}

            {/* Submitted Overlay (confirmation card) */}
            {showSubmitted && (
              <ScoreSubmittedCard
                projectId={projectId}
                currentUserId={currentUserId}
                onClose={() => setShowSubmitted(false)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
