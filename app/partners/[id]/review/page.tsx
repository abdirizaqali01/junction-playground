'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Sidebar from '@/components/partner/navigation/Sidebar'
import PageHeader from '@/components/partner/layout/PageHeader'
import { DEFAULT_REVIEWER, useProjects } from '@/hooks/useProjects'
import { partnerEffects } from '@/components/partner/designSystem'
import { CollapsibleSection } from '@/components/partner/sections/CollapsibleSection'
import { InfoSection } from '@/components/partner/sections/InfoSection'
import { VideoPlayer } from '@/components/partner/media/VideoPlayer'
import { ImageGallery } from '@/components/partner/media/ImageGallery'
import { ScoringSection } from '@/components/partner/review/ScoringSection'
import { ArrowLeft } from 'lucide-react'
import { ScoreBox } from '@/components/partner/review/ScoreBox'
import { ScoreSubmittedCard } from '@/components/partner/review/ScoreSubmittedCard'

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
        <main className="flex-1 flex items-center justify-center overflow-auto">
          <div className="w-full max-w-[1200px] px-[4%] py-[4%] text-center">
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

  const shouldFrostBackground = isReviewing || showSubmitted

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white">
      <div className="fixed top-0 left-0 z-50 h-screen">
        <Sidebar />
      </div>

      <div
        className="flex flex-1 items-start justify-center overflow-auto"
        style={{ marginLeft: 'var(--partner-sidebar-width)' }}
      >
        {shouldFrostBackground && (
          <div
            className={`fixed inset-y-0 right-0 z-[90] pointer-events-none ${partnerEffects.frostedBackdrop}`}
            style={{ left: 'var(--partner-sidebar-width)' }}
          />
        )}

        <main className="w-full" style={{ maxWidth: '1200px' }}>
          <div className="relative w-full px-[4%] pt-[3%] pb-[2%]">
            <div className="mb-6 flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="rounded-lg p-2 transition-colors hover:bg-white/5"
              >
                <ArrowLeft className="h-5 w-5" />
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

            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-white">
                {project.title}{' '}
                <span className="font-normal text-[#55D186]">by {project.team}</span>
              </h1>
            </div>

            <div className="grid grid-cols-3 items-start gap-6">
              <div className="col-span-3 lg:col-span-2">
                <p className="mb-6 text-sm leading-relaxed text-white/80">
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

                <div className="relative z-[95]">
                  <ScoringSection reviews={project.reviews} />
                </div>

                {!isReviewing && !showSubmitted && (
                  <>
                    {!existingReview ? (
                      <button
                        onClick={() => setIsReviewing(true)}
                        className="w-full rounded-xl bg-[#55D186] py-[2.5%] font-medium text-white transition-colors hover:bg-[#55D186]/90"
                      >
                        Review
                      </button>
                    ) : (
                      <div className="w-full rounded-xl bg-[#55D186] px-[6%] py-[5%] text-center text-white">
                        <p className="mb-4 text-lg font-medium">
                          You have submitted a Review already
                        </p>
                        <button
                          onClick={() => setIsReviewing(true)}
                          className="rounded-lg bg-white px-[6%] py-[2%] font-semibold text-[#1A1A1A] transition hover:bg-white/90"
                        >
                          edit rating
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="col-span-3 mt-[5%] lg:col-span-1 lg:mt-0">
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

            {showSubmitted && (
              <ScoreSubmittedCard
                projectId={projectId}
                currentUserId={currentUserId}
                onClose={() => setShowSubmitted(false)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}