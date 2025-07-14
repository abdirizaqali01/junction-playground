'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from '@/components/attachables/main-button'
import { Play, ArrowLeft, Users } from 'lucide-react'
import { initializeCSSVariables } from '@/styles/design-system'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-400'
}

// Get submission data from sessionStorage or use defaults - CLIENT SIDE ONLY
const getSubmissionData = () => {
  // This function is now only used as a fallback, actual data loading happens in useEffect
  return {
    projectName: '',
    description: '',
    selectedChallenge: '',
    demoUrl: '',
    sourceCode: '',
    videoFile: null,
    slackFiles: []
  }
}

export default function ProjectPreviewPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id
  
  // State to track if component has mounted (client-side)
  const [isMounted, setIsMounted] = useState(false)
  const [submissionData, setSubmissionData] = useState<{
    projectName: string;
    description: string;
    selectedChallenge: string;
    demoUrl: string;
    sourceCode: string;
    videoFile: File | null;
    slackFiles: File[];
  }>({
    projectName: '',
    description: '',
    selectedChallenge: '',
    demoUrl: '',
    sourceCode: '',
    videoFile: null,
    slackFiles: []
  })
  
  // Initialize design system variables
  useEffect(() => {
    initializeCSSVariables();
  }, []);

  // Handle mounting and data loading
  useEffect(() => {
    setIsMounted(true)
    
    // Only access sessionStorage after component mounts (client-side only)
    const loadPreviewData = () => {
      try {
        const storedData = sessionStorage.getItem('previewData')
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          setSubmissionData(parsedData)
        }
      } catch (error) {
        console.error('Error loading preview data:', error)
      }
    }
    
    loadPreviewData()
  }, [])

  // Update data when storage changes or page becomes visible
  useEffect(() => {
    if (!isMounted) return

    const handleStorageChange = () => {
      try {
        const storedData = sessionStorage.getItem('previewData')
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          setSubmissionData(parsedData)
        }
      } catch (error) {
        console.error('Error parsing preview data:', error)
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleStorageChange()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isMounted])

  // Don't render until component has mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--color-primary-opacity100)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-light-opacity60)] font-space-grotesk">Loading preview...</p>
        </div>
      </div>
    )
  }

  const handleBackToSubmission = () => {
    // Navigate back to submissions page with proper event ID
    router.push(`/events/${eventId}/submissions`)
  }

  const handleBackToHome = () => {
    router.push('/dash')
  }

  const handleSubmitProject = () => {
    // Handle final submission logic here
    console.log('Submitting project with data:', submissionData)
    
    // You could add API call here to submit the project
    // For now, we'll just show an alert and redirect
    alert('Project submitted successfully!')
    
    // Clear the preview data
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('previewData')
    }
    
    // Redirect to dashboard or success page
    router.push('/dash')
  }

  // Helper function to format challenge name
  const formatChallengeName = (challenge: string) => {
    switch (challenge) {
      case 'ai':
        return 'AI Challenge'
      case 'sustainability':
        return 'Sustainability Challenge'
      case 'fintech':
        return 'FinTech Challenge'
      default:
        return challenge
    }
  }

  // Calculate completion status
  const getCompletionStatus = () => {
    const requiredFields = [
      submissionData.projectName,
      submissionData.description,
      submissionData.selectedChallenge,
      submissionData.demoUrl,
      submissionData.sourceCode,
      submissionData.videoFile,
      submissionData.slackFiles?.length > 0
    ]
    
    const completedFields = requiredFields.filter(field => 
      field && field !== '' && field !== null
    ).length
    
    return {
      completed: completedFields,
      total: requiredFields.length,
      isComplete: completedFields === requiredFields.length
    }
  }

  const completion = getCompletionStatus()

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex flex-col">
      <div className="flex flex-1">
        <Sidebar
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
          eventId={eventId as string}
        />

        {/* Main Content */}
        <div className="flex flex-1 transition-all duration-300 ml-[250px]">
          
          {/* Center Content Area */}
          <div className="flex-1 p-6">
            
            {/* Header */}
            <div className="mb-6 pt-[3%]">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={handleBackToSubmission}
                  className="flex items-center space-x-2 text-[var(--color-light-opacity60)] hover:text-[var(--color-light-opacity100)] transition-colors group font-space-grotesk font-[400]"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Submission</span>
                </button>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[var(--color-light-opacity60)] font-space-mono">
                      {completion.completed}/{completion.total} fields completed
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      completion.isComplete 
                        ? 'bg-[var(--color-primary-opacity100)]' 
                        : 'bg-[var(--color-secondary-opacity100)]'
                    }`}></div>
                    <span className="text-sm text-[var(--color-light-opacity60)] font-space-mono font-[400]">
                      {completion.isComplete ? 'Ready to Submit' : 'Preview Mode'}
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)]">
                Project Preview
              </h1>
            </div>

            {/* Project Header with Video Background */}
            <div className="relative bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity20)] rounded-[10px] overflow-hidden mb-8" style={{height: '200px'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-dark-opacity70)] to-[var(--color-dark-opacity40)]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-opacity80)] via-[var(--color-dark-opacity40)] to-transparent"></div>
              <div className="relative z-10 flex items-center justify-between h-full px-8">
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)]">
                    {submissionData.projectName || 'TBD - Project Name'}
                  </h1>
                  <span className={`px-4 py-2 text-xs font-space-mono font-[400] rounded-full ${
                    completion.isComplete
                      ? 'bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)]'
                      : 'bg-[var(--color-secondary-opacity100)] text-[var(--color-light-opacity100)]'
                  }`}>
                    {completion.isComplete ? 'READY' : 'DRAFT'}
                  </span>
                </div>
                {submissionData.videoFile && (
                  <div className="flex items-center space-x-2 text-[var(--color-primary-opacity100)]">
                    <Play className="w-6 h-6" />
                    <span className="text-sm font-space-grotesk font-[400]">Video Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className={`border rounded-[10px] p-6 mb-6 transition-all duration-300 ${
              submissionData.description 
                ? 'bg-[var(--color-white-opacity5)] border-[var(--color-white-opacity20)]'
                : 'bg-[var(--color-alerts-opacity5)] border-[var(--color-alerts-opacity40)]'
            }`}>
              <h2 className="text-lg font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)] mb-4">
                Project Description
              </h2>
              {submissionData.description ? (
                <p className="text-[var(--color-light-opacity80)] text-sm leading-relaxed font-space-grotesk font-[300]">
                  {submissionData.description}
                </p>
              ) : (
                <p className="text-[var(--color-alerts-opacity100)] text-sm leading-relaxed font-space-grotesk font-[300] italic">
                  TBD - No description provided yet. Please go back and add a project description.
                </p>
              )}
            </div>

            {/* Challenge Section */}
            <div className={`border rounded-[10px] p-6 mb-6 transition-all duration-300 ${
              submissionData.selectedChallenge 
                ? 'bg-[var(--color-primary-opacity10)] border-[var(--color-primary-opacity50)]'
                : 'bg-[var(--color-alerts-opacity5)] border-[var(--color-alerts-opacity40)]'
            }`}>
              <h2 className="text-lg font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)] mb-4">
                Challenge Track
              </h2>
              <div className="flex items-center space-x-3">
                {submissionData.selectedChallenge ? (
                  <div className="px-4 py-2 bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] rounded-[5px] text-sm font-space-mono font-[400]">
                    {formatChallengeName(submissionData.selectedChallenge)}
                  </div>
                ) : (
                  <div className="px-4 py-2 bg-[var(--color-alerts-opacity100)] text-[var(--color-light-opacity100)] rounded-[5px] text-sm font-space-mono font-[400]">
                    TBD - No challenge selected
                  </div>
                )}
              </div>
            </div>

            {/* Slack Participation */}
            <div className={`border rounded-[10px] p-6 mb-6 transition-all duration-300 ${
              submissionData.slackFiles && submissionData.slackFiles.length > 0
                ? 'bg-[var(--color-white-opacity5)] border-[var(--color-white-opacity20)]'
                : 'bg-[var(--color-alerts-opacity5)] border-[var(--color-alerts-opacity40)]'
            }`}>
              <h2 className="text-lg font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)] mb-4">
                Slack Challenge Participation
              </h2>
              {submissionData.slackFiles && submissionData.slackFiles.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-[var(--color-light-opacity60)] text-sm font-space-grotesk font-[300] mb-3">
                    Files submitted for slack challenge participation:
                  </p>
                  {submissionData.slackFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm font-space-mono">
                      <div className="w-2 h-2 bg-[var(--color-primary-opacity100)] rounded-full"></div>
                      <span className="text-[var(--color-light-opacity80)]">{file?.name || `File ${index + 1}`}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--color-alerts-opacity100)] text-sm font-space-grotesk font-[300] italic">
                  TBD - No slack participation files uploaded yet. Please go back and upload your slack files.
                </p>
              )}
            </div>

            {/* Video and Links Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              
              {/* Video Section */}
              <div className={`border rounded-[10px] p-6 transition-all duration-300 ${
                submissionData.videoFile 
                  ? 'bg-[var(--color-white-opacity5)] border-[var(--color-white-opacity20)]'
                  : 'bg-[var(--color-alerts-opacity5)] border-[var(--color-alerts-opacity40)]'
              }`}>
                <h2 className="text-lg font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)] mb-4">
                  Demo Video
                </h2>
                <div className="aspect-video bg-[var(--color-white-opacity5)] rounded-[5px] flex items-center justify-center border border-[var(--color-white-opacity10)]">
                  {submissionData.videoFile ? (
                    <div className="text-center">
                      <Play className="w-16 h-16 text-[var(--color-primary-opacity100)] mx-auto mb-2" />
                      <p className="text-sm text-[var(--color-primary-opacity100)] font-space-grotesk font-[500]">
                        {submissionData.videoFile?.name || 'Video File'}
                      </p>
                      <p className="text-xs text-[var(--color-light-opacity60)] font-space-mono">
                        Click to play video
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Play className="w-16 h-16 text-[var(--color-alerts-opacity60)] mx-auto mb-2" />
                      <p className="text-sm text-[var(--color-alerts-opacity100)] font-space-grotesk font-[300] italic">
                        TBD - No video uploaded yet
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Team Section */}
              <div className="bg-[var(--color-white-opacity5)] border border-[var(--color-white-opacity20)] rounded-[10px] p-6">
                <h2 className="text-lg font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)] mb-4 flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Team</span>
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[var(--color-primary-opacity100)] rounded-full flex items-center justify-center text-xs font-space-mono font-[400] text-[var(--color-light-opacity100)]">
                      {userProfile.initials}
                    </div>
                    <div>
                      <p className="text-[var(--color-light-opacity100)] text-sm font-space-grotesk font-[500]">{userProfile.name}</p>
                      <p className="text-[var(--color-light-opacity60)] text-xs font-space-mono">{userProfile.email}</p>
                    </div>
                  </div>
                  <p className="text-[var(--color-light-opacity60)] text-xs font-space-grotesk font-[300] mt-4">
                    Team information auto-populated from your account profile
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Links Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Demo Link */}
              <div className={`border rounded-[10px] p-6 transition-all duration-300 ${
                submissionData.demoUrl 
                  ? 'bg-[var(--color-white-opacity5)] border-[var(--color-white-opacity20)]'
                  : 'bg-[var(--color-alerts-opacity5)] border-[var(--color-alerts-opacity40)]'
              }`}>
                <h3 className="text-[var(--color-light-opacity100)] font-space-grotesk font-[600] tracking-[-0.01rem] mb-2">
                  Project Demo
                </h3>
                {submissionData.demoUrl ? (
                  <a 
                    href={submissionData.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary-opacity100)] text-sm font-space-mono underline hover:text-[var(--color-primary-opacity60)] transition-colors break-all"
                  >
                    {submissionData.demoUrl}
                  </a>
                ) : (
                  <p className="text-[var(--color-alerts-opacity100)] text-sm font-space-grotesk font-[300] italic">
                    TBD - No demo URL provided yet
                  </p>
                )}
              </div>
              
              {/* Source Code */}
              <div className={`border rounded-[10px] p-6 transition-all duration-300 ${
                submissionData.sourceCode 
                  ? 'bg-[var(--color-white-opacity5)] border-[var(--color-white-opacity20)]'
                  : 'bg-[var(--color-alerts-opacity5)] border-[var(--color-alerts-opacity40)]'
              }`}>
                <h3 className="text-[var(--color-light-opacity100)] font-space-grotesk font-[600] tracking-[-0.01rem] mb-2">
                  Source Code
                </h3>
                {submissionData.sourceCode ? (
                  <a 
                    href={submissionData.sourceCode} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary-opacity100)] text-sm font-space-mono underline hover:text-[var(--color-primary-opacity60)] transition-colors break-all"
                  >
                    {submissionData.sourceCode}
                  </a>
                ) : (
                  <p className="text-[var(--color-alerts-opacity100)] text-sm font-space-grotesk font-[300] italic">
                    TBD - No source code URL provided yet
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--color-white-opacity20)]">
              <div>
                {!completion.isComplete && (
                  <p className="text-[var(--color-alerts-opacity100)] text-sm font-space-grotesk font-[300]">
                    Complete all fields before submitting your project
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <MainButton
                  onClick={handleBackToSubmission}
                  variant="outlineGray"
                  size="default"
                  showIcon={false}
                >
                  Continue Editing
                </MainButton>
                <MainButton
                  onClick={handleSubmitProject}
                  variant={completion.isComplete ? "primary" : "gray"}
                  size="default"
                  showIcon={false}
                  disabled={!completion.isComplete}
                  className={`transition-all duration-300 ${
                    completion.isComplete 
                      ? 'hover:scale-105' 
                      : 'cursor-not-allowed opacity-50'
                  }`}
                >
                  {completion.isComplete ? 'Submit Project' : 'Complete Required Fields'}
                </MainButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}