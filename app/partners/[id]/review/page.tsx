'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import PageHeader from '@/components/partner/layout/PageHeader'
import { DEFAULT_REVIEWER, useProjects } from '@/hooks/useProjects'
import PartnerLayout from '@/components/partner/layout/PartnerLayout'
import {
  PartnerButton,
  layoutStyles,
  partnerAccents,
  partnerEffects,
  partnerSurfaces,
  partnerText,
} from '@/styles/design-system'
import { CollapsibleSection } from '@/components/partner/sections/CollapsibleSection'
import { InfoSection } from '@/components/partner/sections/InfoSection'
import { VideoPlayer } from '@/components/partner/media/VideoPlayer'
import { ImageGallery } from '@/components/partner/media/ImageGallery'
import { ScoringSection } from '@/components/partner/review/ScoringSection'
import { ArrowLeft } from 'lucide-react'
import { ScoreBox } from '@/components/partner/review/ScoreBox'
import { ScoreSubmittedCard } from '@/components/partner/review/ScoreSubmittedCard'
import { NextProjectPrompt } from '@/components/partner/review/NextProjectPrompt'
import { withVars } from '@/components/partner/utils/style'

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
      //----------------------------------------------------------//
      // STATE: NO SUBMISSIONS //
      //----------------------------------------------------------//
      <PartnerLayout forcedActivePath="/partners/submissions">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
          <h1
            className="text-2xl font-semibold"
            style={{ color: partnerText.primary }}
          >
            Project Not Found
          </h1>
          <PartnerButton
            variant="ghost"
            onClick={() => router.push('/partners/submissions')}
            className="border hover:bg-[var(--partner-button-hover)]"
            style={withVars(
              {
                borderColor: partnerAccents.solid,
                color: partnerAccents.solid,
              },
              { '--partner-button-hover': partnerAccents.tint }
            )}
          >
            ← Back to Submissions
          </PartnerButton>
        </div>
      </PartnerLayout>
    )
  }

  const breadcrumbItems = [project.title]
  const projectDropdownItems = projects.map((p) => ({ id: p.id, title: p.title }))

  const handleBreadcrumbClick = (index: number) => {
    // No breadcrumb navigation needed since we only have the project title
  }

  const shouldFrostBackground = isReviewing || showSubmitted

  return (
    //----------------------------------------------------------//
    // STATE: NO SUBMISSIONS //
    //----------------------------------------------------------//
    <PartnerLayout forcedActivePath="/partners/submissions">
      {shouldFrostBackground && (
        <div
          className={`fixed inset-y-0 right-0 z-[90] pointer-events-none ${partnerEffects.frostedBackdrop}`}
          style={{
            left: `calc(${layoutStyles.partner.mainStyle.marginLeft} + 1.25rem)`,
          }}
        />
      )}

      <div className="relative">
        <div className="flex items-center gap-4">
          <PartnerButton
            variant="ghost"
            onClick={() => router.back()}
            className="!px-2 !py-2 mt-[-15px] hover:bg-[var(--partner-icon-button-hover)]"
            style={withVars(
              {
                color: partnerText.secondary,
              },
              { '--partner-icon-button-hover': partnerSurfaces.muted }
            )}
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6" />
          </PartnerButton>
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
              useDropdownAsTitle={true}
            />
          </div>
        </div>

        <div>
          <h1
            className="text-[2rem] font-semibold"
            style={{ color: partnerText.primary }}
          >
            {project.title}{' '}
            <span
              className="text-[1.5rem] font-normal"
              style={{ color: partnerAccents.solid }}
            >
              by {project.team}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-3 items-start gap-6">
          <div className="col-span-3 space-y-6 lg:col-span-2">
            <p
              className="text-sm leading-relaxed"
              style={{ color: partnerText.secondary }}
            >
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
                  <PartnerButton
                    variant="primary"
                    style={withVars(
                      {
                        backgroundColor: partnerAccents.solid,
                        color: partnerText.primary,
                      },
                      { '--partner-button-hover': partnerAccents.tint }
                    )}
                    onClick={() => setIsReviewing(true)}
                    className="w-full justify-center py-4 text-base"
                  >
                    Review
                  </PartnerButton>
                ) : (
                  <div
                    className="w-full rounded-xl px-[6%] py-[5%] text-center"
                    style={{
                      backgroundColor: partnerAccents.solid,
                      color: partnerText.primary,
                    }}
                  >
                    <p className="mb-4 text-lg font-medium">
                      You have submitted a Review already
                    </p>
                    <PartnerButton
                      variant="ghost"
                      onClick={() => setIsReviewing(true)}
                      className="hover:bg-[var(--partner-edit-hover)]"
                      style={withVars(
                        {
                          backgroundColor: partnerSurfaces.raised,
                          color: partnerText.primary,
                        },
                        { '--partner-edit-hover': partnerSurfaces.raisedHover }
                      )}
                    >
                      edit rating
                    </PartnerButton>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="col-span-3 space-y-6 lg:col-span-1">
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

        <div className="mt-12 flex justify-end">
          <NextProjectPrompt
            projects={projects}
            currentProjectId={projectId}
            reviewerId={currentUserId}
            onNavigate={(id) => router.push(`/partners/${id}/review`)}
          />
        </div>

      </div>
    </PartnerLayout>
  )
}
