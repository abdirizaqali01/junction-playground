'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Upload, Play, ChevronDown, Check } from 'lucide-react'

// Navigation data for sidebar
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
            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 h4.216z"/>
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
    id: 'in-progress',
    title: 'In Progress',
    items: [
      {
        id: 'project-submission',
        label: 'Project Submission',
        href: '#',
        isActive: true,
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
  avatarColor: 'bg-neutral-600'
}

// Enhanced Next Steps Item Component with fade animation
const NextStepItem = ({ item, index, isCompleted, onTransitionEnd }) => {
  return (
    <div 
      className={`transition-all duration-500 ease-in-out transform ${
        isCompleted 
          ? 'opacity-0 scale-95 max-h-0 mb-0 overflow-hidden pointer-events-none' 
          : 'opacity-100 scale-100 max-h-96 mb-3'
      }`}
      onTransitionEnd={onTransitionEnd}
    >
      <div className={`border rounded-lg p-3 transition-all duration-200 ${
        isCompleted
          ? 'border-green-500' 
          : 'border-red-600'
      }`}>
        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              isCompleted
                ? 'bg-green-500 border-green-500' 
                : 'border-neutral-400'
            }`}>
              {isCompleted && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <h4 className={`font-medium text-sm transition-colors ${
              isCompleted
                ? 'text-green-400' 
                : 'text-white'
            }`}>
              {index + 1}. {item.label}
              {item.required && (
                <span className="text-red-400 text-xs ml-1">*</span>
              )}
            </h4>
          </div>
        </div>
        <p className="text-neutral-400 text-xs leading-relaxed">
          {item.key === 'projectName' && 'Enter a clear and descriptive name for your project.'}
          {item.key === 'description' && 'Provide a detailed description of what you built and the problem it solves.'}
          {item.key === 'selectedChallenge' && 'Select which challenge track your project is participating in.'}
          {item.key === 'demoUrl' && 'Share a link where your project can be experienced live.'}
          {item.key === 'sourceCode' && 'Provide access to your project\'s source code repository.'}
          {item.key === 'videoFile' && 'Upload a demo video showcasing your project in action.'}
        </p>
      </div>
    </div>
  )
}

export default function ProjectSubmissionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    projectName: 'Energify',
    description: '',
    selectedChallenge: '',
    slackChannel: '',
    demoUrl: '',
    sourceCode: '',
    videoFile: null
  })

  const [checklist, setChecklist] = useState({
    projectName: false,
    description: false,
    selectedChallenge: false,
    demoUrl: false,
    sourceCode: false,
    videoFile: false
  })

  const [dragActive, setDragActive] = useState(false)

  // Update checklist when form data changes
  useEffect(() => {
    setChecklist({
      projectName: formData.projectName.trim() !== '',
      description: formData.description.trim() !== '',
      selectedChallenge: formData.selectedChallenge !== '',
      demoUrl: formData.demoUrl.trim() !== '',
      sourceCode: formData.sourceCode.trim() !== '',
      videoFile: formData.videoFile !== null
    })
  }, [formData])

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDragEvents = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log('Files dropped:', e.dataTransfer.files)
    }
  }

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, videoFile: e.target.files[0] }))
    }
  }

  const nextSteps = [
  ]

  const checklistItems = [
    { key: 'projectName', label: 'Project Name', required: true },
    { key: 'description', label: 'Project Description', required: true },
    { key: 'selectedChallenge', label: 'Challenge Selection', required: true },
    { key: 'demoUrl', label: 'Demo URL', required: false },
    { key: 'sourceCode', label: 'Source Code', required: false },
    { key: 'videoFile', label: 'Video Upload', required: false }
  ]

  // Filter items to show incomplete ones first, then completed ones
  const sortedChecklistItems = [...checklistItems].sort((a, b) => {
    const aCompleted = checklist[a.key]
    const bCompleted = checklist[b.key]
    
    // Incomplete items come first
    if (!aCompleted && bCompleted) return -1
    if (aCompleted && !bCompleted) return 1
    return 0
  })

  // Calculate current step numbers for incomplete items only
  const getStepNumber = (item) => {
    const incompleteItems = checklistItems.filter(checklistItem => 
      !checklist[checklistItem.key]
    )
    const index = incompleteItems.findIndex(incompleteItem => incompleteItem.key === item.key)
    return index !== -1 ? index + 1 : checklistItems.findIndex(checklistItem => checklistItem.key === item.key) + 1
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1">
        <Sidebar
          navigationSections={navigationSections}
          userProfile={userProfile}
          backToHomeLabel="Back To Home"
          onBackToHome={handleBackToHome}
          showImagePlaceholder={true}
        />

        {/* Main Content */}
        <div className="flex flex-1 transition-all duration-300 ml-[250px]">
          
          {/* Center Content Area */}
          <div className="flex-1 p-6">
            {/* Header */}
            <div className="mb-6 pt-[3%]">
              <h1 className="text-2xl font-semibold text-white mb-4">Project Submission</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-white hover:bg-neutral-100 text-black rounded-md text-sm font-medium transition-colors">
                    Edit Submission
                  </button>
                  <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>
                    <span>Preview</span>
                  </button>
                </div>

                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                  Draft
                </span>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-neutral-900 rounded-lg p-6 space-y-6 w-full">
              
              {/* Project Name */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neutral-500 transition-colors text-sm"
                  placeholder="Enter project name"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium">Description of what you've built</label>
                <p className="text-neutral-400 text-xs leading-relaxed mb-3">
                  Description of maximum 10 lines limit of documents at lorem ipsum dictumst et nisl, mauris phasellus egestas vel tellus rutrum vel, ornare molestie mauris non pulvinar. Turpis neque viverra et auctor fermentum consectetur tortor vitae egestas. Lorem ipsum dolor sit amet consequat pharetra nunc ipsum nam, scelerisque duis ut ridiculus pellentesque et tortor vitae.
                </p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neutral-500 transition-colors resize-none text-sm"
                  placeholder="Describe your project, the problem it solves, and the technology you used..."
                />
              </div>

              {/* Your Challenge */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium">Your Challenge</label>
                <p className="text-neutral-400 text-xs mb-3">
                  Leave a short note and slack channel name participating this work to receive bounty reward! or continue reading official terms.
                </p>
                <div className="relative">
                  <select
                    name="selectedChallenge"
                    value={formData.selectedChallenge}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neutral-500 transition-colors appearance-none text-sm"
                  >
                    <option value="">Select the challenge that your project is for...</option>
                    <option value="ai">AI Challenge</option>
                    <option value="sustainability">Sustainability Challenge</option>
                    <option value="fintech">FinTech Challenge</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              {/* Slack Challenge Participation */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium">Slack challenge participation</label>
                <p className="text-neutral-400 text-xs mb-3">
                  Leave a short note and slack channel name participating this work to receive bounty reward! or continue reading official terms.
                </p>
                
                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-neutral-500 bg-neutral-800/50' 
                      : 'border-neutral-600 hover:border-neutral-500'
                  }`}
                  onDragEnter={handleDragEvents}
                  onDragLeave={handleDragEvents}
                  onDragOver={handleDragEvents}
                  onDrop={handleDrop}
                >
                  <Upload className="w-6 h-6 mx-auto mb-3 text-neutral-400" />
                  <p className="text-neutral-400 mb-2 text-sm">Drag and drop files here, or</p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md cursor-pointer transition-colors text-sm text-white"
                  >
                    Browse files
                  </label>
                </div>
              </div>

              {/* Bottom Row - Video Upload and URL Links */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Video Upload */}
                <div className="space-y-2">
                  <div className="bg-neutral-800 rounded-md p-4 border border-neutral-700">
                    <div className="aspect-video bg-neutral-900 rounded-md flex items-center justify-center mb-3">
                      {formData.videoFile ? (
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
                          <p className="text-xs text-neutral-400">{formData.videoFile.name}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
                          <p className="text-xs text-neutral-400">No video uploaded</p>
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="block w-full text-center px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-md cursor-pointer transition-colors text-sm text-neutral-300"
                    >
                      Upload Video
                    </label>
                  </div>
                </div>

                {/* URL Links */}
                <div className="space-y-4">
                  
                  {/* Project Demo */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-medium">Project Demo</label>
                    <p className="text-neutral-400 text-xs mb-2">
                      The place where you project can be experienced.
                    </p>
                    
                    <input
                      type="url"
                      name="demoUrl"
                      value={formData.demoUrl}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neutral-500 transition-colors text-sm"
                      placeholder="Project url link..."
                    />
                  </div>

                  {/* Source Code */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-medium">Source Code</label>
                    <p className="text-neutral-400 text-xs mb-2">
                      Where viewers and judges can access your source code.
                    </p>
                    
                    <input
                      type="url"
                      name="sourceCode"
                      value={formData.sourceCode}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neutral-500 transition-colors text-sm"
                      placeholder="Source code url link..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Next Steps with Enhanced Animation */}
          <div className="w-[18rem] p-6">
            <div className="border border-red-600 bg-neutral-900 rounded-lg p-4 sticky top-6">
              <h3 className="text-base font-medium text-white mb-4">Next Steps</h3>
              
              <div className="space-y-0">
                {/* Animated Checklist Items */}
                {sortedChecklistItems.map((item) => (
                  <NextStepItem
                    key={item.key}
                    item={item}
                    index={getStepNumber(item) - 1}
                    isCompleted={checklist[item.key]}
                  />
                ))}

                {/* Static Next Steps */}
                {nextSteps.map((step) => {
                  const incompleteCount = checklistItems.filter(item => !checklist[item.key]).length
                  return (
                    <div key={step.step} className="border border-red-600 rounded-lg p-3 mb-3">
                      <div className="mb-2">
                        <h4 className="text-white font-medium text-sm">
                          {step.step + incompleteCount}. {step.title}
                        </h4>
                      </div>
                      <p className="text-neutral-400 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}