'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar/Sidebar'
import PageHeader from '@/components/Layout/PageHeader'
import { useProjects } from '@/hooks/useProjects'
import { CollapsibleSection } from '@/components/CollapsibleSection'
import { InfoSection } from '@/components/InfoSection'
import { VideoPlayer } from '@/components/VideoPlayer'
import { ImageGallery } from '@/components/ImageGallery'
import { ScoringSection } from '@/components/ScoringSection'
import { Breadcrumb } from '@/components/Layout/Breadcrumb'
import { ArrowLeft, X } from 'lucide-react'
import ScoreBox from '@/components/ScoreBox'

export default function ProjectReviewPage() {
  const params = useParams()
  const router = useRouter()
  const { getProjectById, updateProjectRating } = useProjects()
  
  const [isReviewMode, setIsReviewMode] = useState(false)
  const [rating, setRating] = useState<number>(5)
  const [feedback, setFeedback] = useState<string>('')

  const projectId = params.id as string
  const project = getProjectById(projectId)

  // Handle project not found
  if (!project) {
    return (
      <div className="flex min-h-screen bg-[#0D0D0D] text-white">
        <div className="fixed top-0 left-0 h-screen z-50">
          <Sidebar />
        </div>
        <main className="flex-1 ml-[280px] px-8 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-semibold mb-4">Project Not Found</h1>
            <button
              onClick={() => router.push('/partners/submissions')}
              className="text-emerald-400 hover:text-emerald-300"
            >
              ← Back to Submissions
            </button>
          </div>
        </main>
      </div>
    )
  }

  const handleReview = () => {
    setIsReviewMode(true)
    setRating(5)
    setFeedback('')
  }

  const handleCancelReview = () => {
    setIsReviewMode(false)
    setRating(5)
    setFeedback('')
  }

  const handleSubmitReview = () => {
    if (feedback.trim()) {
      updateProjectRating(project.id, rating, feedback, 'Partner Judge')
      setIsReviewMode(false)
      setRating(5)
      setFeedback('')
    }
  }

  // Prepare data for InfoSection components
  const linksData = [
    ...(project.demoUrl ? [{ label: 'Project Demo', url: project.demoUrl }] : []),
    ...(project.sourceCodeUrl ? [{ label: 'Source Code', url: project.sourceCodeUrl }] : []),
  ]

  const filesData = project.files.map(file => ({
    label: file.name,
    url: file.url,
  }))

  const teamData = project.teamMembers.map(member => ({
    label: member.name,
    value: member.email,
    action: member.showProfile
      ? {
          label: 'view profile',
          onClick: () => console.log('View profile:', member.name),
        }
      : undefined,
  }))

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white">
      <div className="fixed top-0 left-0 h-screen z-50">
        <Sidebar />
      </div>

      <main className="flex-1 ml-[280px] px-8 py-8">
        <div className="w-full max-w-[1200px] mx-auto relative">
          
          {/* Header with Back Button */}
          <div className={`flex items-center gap-4 mb-6 ${isReviewMode ? 'blur-sm' : ''}`}>
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <PageHeader title="Project Submissions" timer={project.timer} />
            </div>
          </div>

          {/* Breadcrumb */}
          <div className={isReviewMode ? 'blur-sm' : ''}>
            <Breadcrumb items={['Project Submissions', project.title]} />
          </div>

          {/* Title and Status */}
          <div className={`flex items-center justify-between mb-6 ${isReviewMode ? 'blur-sm' : ''}`}>
            <h1 className="text-3xl font-semibold text-white">
              {project.title}{' '}
              <span className="text-[#55D186] font-normal">by {project.team}</span>
            </h1>
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
              Status: {project.status}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 items-start">
            {/* Main Content - Left Column (2/3) */}
            <div className="col-span-2">
              {/* Blurred content */}
              <div className={isReviewMode ? 'blur-sm' : ''}>
                {/* Project Description */}
                <p className="text-white text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                
                {/* Video Player */}
                <VideoPlayer videoUrl={project.videoUrl} />

                {/* Image Gallery */}
                <ImageGallery images={project.images} />

                {/* Collapsible Sections */}
                <CollapsibleSection title="Full Project Description" defaultOpen>
                  {project.fullDescription || 'No detailed description provided.'}
                </CollapsibleSection>

                <CollapsibleSection title="Problem Statement">
                  {project.problemStatement || 'No problem statement provided.'}
                </CollapsibleSection>

                <CollapsibleSection title="Solution Approach">
                  {project.solutionApproach || 'No solution approach provided.'}
                </CollapsibleSection>

                {project.technicalDetails && (
                  <CollapsibleSection title="Technical Details">
                    {project.technicalDetails}
                  </CollapsibleSection>
                )}
              </div>

              {/* Scoring Section - NOT BLURRED */}
              <ScoringSection reviews={project.reviews} />

              {/* Review Button - NOT BLURRED */}
              {!isReviewMode && (
                <button
                  onClick={handleReview}
                  className="w-full bg-[#55D186] hover:bg-[#55D186]/90 text-white font-medium py-4 rounded-xl transition-colors"
                >
                  {project.reviewed ? 'Update Review' : 'Review'}
                </button>
              )}
            </div>

            {/* Sidebar - Right Column (1/3) - NOT BLURRED */}
            <div className="col-span-1 mt-[90px]">
              {/* Links (Demo + Source Code) */}
              {linksData.length > 0 && (
                <InfoSection title="Links" items={linksData} />
              )}

              {/* Files */}
              {filesData.length > 0 && (
                <InfoSection title="Files" items={filesData} />
              )}

              {/* Team */}
              <InfoSection title="Team" items={teamData} />
            </div>
          </div>

          {/* Review Modal - Centered and on top */}
          {isReviewMode && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" 
                onClick={handleCancelReview}
              />
              
              {/* Modal */}
              <div className="fixed left-[280px] right-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-[101] px-8 pointer-events-none">
                <div className="bg-[#1A1A1A] rounded-xl p-8 border border-white/10 shadow-2xl w-full max-w-[800px] pointer-events-auto">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-semibold text-[#55D186]">Scoring</h3>
                    <button
                      onClick={handleCancelReview}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-white/60 text-sm mb-6">
                    Evaluate This Submission Using The 1-10 Scale Below. Your Rating Will Be Averaged With Other Partners' Scores To Determine The Project's Final Ranking.
                  </p>

                  {/* Score Buttons */}
                  <div className="mb-8">
                    <ScoreBox value={rating} onChange={setRating} />
                  </div>

                  {/* Feedback Section */}
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-[#55D186] mb-2">Feedback</h4>
                    <p className="text-white/60 text-sm mb-4">
                      Provide Feedback For The Team. Your Comments Will Be Visible To Participants And Should Highlight Strengths And Areas For Improvement To Support Their Growth.
                    </p>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Type here your feedback..."
                      rows={6}
                      className="w-full bg-[#0D0D0D] border border-[#55D186]/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#55D186] resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={handleCancelReview}
                      className="px-6 py-2.5 bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitReview}
                      disabled={!feedback.trim()}
                      className="px-6 py-2.5 bg-[#55D186] hover:bg-[#55D186]/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}