'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from '@/components/attachables/main-button'
import { useLoading } from '@/components/loading-context'
import { Upload, Play, ChevronDown, Check, X, Eye } from 'lucide-react'
import * as style from '@/styles/design-system'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-400'
}

// Submit Confirmation Modal Component
const SubmitModal = ({ isOpen, onClose, onConfirm }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--color-dark-opacity80)] flex items-center justify-center z-50 transition-all duration-300">
      <div className={`${style.box.gray.bottom} p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 opacity-100`}>
        <div className="text-center mb-4">
          <h3 className={`${style.font.grotesk.main} text-lg text-[var(--color-light-opacity100)] mb-3`}>
            Final Submit your project?
          </h3>
          <p className={`${style.font.grotesk.light} text-[var(--color-light-opacity60)] leading-relaxed text-sm`}>
            You won't be able to undo this, a final submission will be the final submission. If you'd like to keep editing, press cancel. Otherwise, SUBMIT!
          </p>
        </div>
        
        <div className="flex space-x-3 justify-center">
          <MainButton
            onClick={onConfirm}
            variant="primary"
            size="sm"
            showIcon={false}
          >
            Submit It!
          </MainButton>
          <MainButton
            onClick={onClose}
            variant="alerts"
            size="sm"
            showIcon={false}
          >
            Keep Editing
          </MainButton>
        </div>
      </div>
    </div>
  );
};

// Enhanced Next Steps Item Component with 2-step animation
const NextStepItem = ({ item, index, isCompleted, onTransitionEnd }: {
  item: { key: string; label: string; required: boolean };
  index: number;
  isCompleted: boolean;
  onTransitionEnd?: () => void;
}) => {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'filling' | 'removing' | 'returning'>('idle')
  const [wasCompleted, setWasCompleted] = useState(false)

  useEffect(() => {
    // If field just became completed
    if (isCompleted && !wasCompleted && animationPhase === 'idle') {
      setAnimationPhase('filling')
      setWasCompleted(true)
      // After the fill animation, start the remove animation
      setTimeout(() => {
        setAnimationPhase('removing')
      }, 500)
    }
    // If field became incomplete again
    else if (!isCompleted && wasCompleted) {
      setAnimationPhase('returning')
      setWasCompleted(false)
      // Reset to idle after return animation
      setTimeout(() => {
        setAnimationPhase('idle')
      }, 500)
    }
  }, [isCompleted, wasCompleted, animationPhase])

  return (
    <div 
      className={`${style.perf.transition.slow} transform ${
        animationPhase === 'removing' && isCompleted
          ? 'opacity-0 scale-95 max-h-0 mb-0 overflow-hidden pointer-events-none' 
          : animationPhase === 'returning'
          ? 'opacity-100 scale-100 max-h-96 mb-3'
          : 'opacity-100 scale-100 max-h-96 mb-3'
      }`}
      onTransitionEnd={() => {
        if (animationPhase === 'removing' && isCompleted && onTransitionEnd) {
          onTransitionEnd()
        }
      }}
    >
      <div className={`${style.border.solid} ${style.border.radius.middle} p-3 ${style.perf.transition.slow} ${
        animationPhase === 'filling' || (animationPhase === 'removing' && isCompleted)
          ? 'border-[var(--color-primary-opacity100)] bg-[var(--color-primary-opacity30)]' 
          : animationPhase === 'returning' || animationPhase === 'idle'
          ? 'border-[var(--color-alerts-opacity100)] bg-[var(--color-alerts-opacity5)]'
          : 'border-[var(--color-alerts-opacity100)] bg-[var(--color-alerts-opacity5)]'
      }`}>
        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 ${style.border.radius.inner} border flex items-center justify-center ${style.perf.transition.slow} ${
              animationPhase === 'filling' || (animationPhase === 'removing' && isCompleted)
                ? 'bg-[var(--color-primary-opacity100)] border-[var(--color-primary-opacity100)] transform scale-110' 
                : 'border-[var(--color-light-opacity40)] scale-100'
            }`}>
              {(animationPhase === 'filling' || (animationPhase === 'removing' && isCompleted)) && (
                <Check className={`w-3 h-3 text-[var(--color-light-opacity100)] ${style.perf.transition.fast}`} />
              )}
            </div>
            <h4 className={`${style.font.grotesk.medium} text-sm ${style.perf.transition.slow} ${
              animationPhase === 'filling' || (animationPhase === 'removing' && isCompleted)
                ? 'text-[var(--color-primary-opacity100)]' 
                : 'text-[var(--color-light-opacity100)]'
            }`}>
              {index + 1}. {item.label}
              {item.required && (
                <span className="text-[var(--color-alerts-opacity100)] text-xs ml-1">*</span>
              )}
            </h4>
          </div>
        </div>
        <p className={`${style.font.grotesk.light} text-[var(--color-light-opacity60)] text-xs leading-relaxed`}>
          {item.key === 'projectName' && 'Enter a clear and descriptive name for your project.'}
          {item.key === 'description' && 'Provide a detailed description of what you built and the problem it solves.'}
          {item.key === 'selectedChallenge' && 'Select which challenge track your project is participating in.'}
          {item.key === 'demoUrl' && 'Share a link where your project can be experienced live.'}
          {item.key === 'sourceCode' && 'Provide access to your project\'s source code repository.'}
          {item.key === 'videoFile' && 'Upload a demo video showcasing your project in action.'}
          {item.key === 'slackFiles' && 'Upload files related to your Slack challenge participation.'}
        </p>
      </div>
    </div>
  )
}

export default function ProjectSubmissionPage() {
  const router = useRouter()
  const params = useParams()
  const { setLoading } = useLoading()
  const eventId = params.id
  
  const [formData, setFormData] = useState({
    projectName: 'Energify',
    description: '',
    selectedChallenge: '',
    slackChannel: '',
    demoUrl: '',
    sourceCode: '',
    videoFile: null as File | null
  })

  const [slackFiles, setSlackFiles] = useState<File[]>([])

  const [checklist, setChecklist] = useState<{[key: string]: boolean}>({
    projectName: false,
    description: false,
    selectedChallenge: false,
    demoUrl: false,
    sourceCode: false,
    videoFile: false,
    slackFiles: false
  })

  const [dragActive, setDragActive] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({})

  // Update checklist when form data changes
  useEffect(() => {
    setChecklist({
      projectName: formData.projectName.trim() !== '',
      description: formData.description.trim() !== '',
      selectedChallenge: formData.selectedChallenge !== '',
      demoUrl: formData.demoUrl.trim() !== '',
      sourceCode: formData.sourceCode.trim() !== '',
      videoFile: formData.videoFile !== null,
      slackFiles: slackFiles.length > 0
    })
  }, [formData, slackFiles])

  const handlePreview = () => {
    setLoading('preview-submission', true)
    
    // Prepare form data for preview
    const previewData = {
      projectName: formData.projectName,
      description: formData.description,
      selectedChallenge: formData.selectedChallenge,
      demoUrl: formData.demoUrl,
      sourceCode: formData.sourceCode,
      videoFile: formData.videoFile,
      slackFiles: slackFiles
    }
    
    // Store in sessionStorage for preview page to access
    sessionStorage.setItem('previewData', JSON.stringify(previewData))
    
    // Navigate to preview page with proper event ID
    router.push(`/events/${eventId}/submissions/preview`)
  }

  const handleBackToHome = () => {
    setLoading('back-to-home', true)
    router.push('/dash')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Handle character limit for description
    if (name === 'description' && value.length > 300) {
      setFieldErrors(prev => ({
        ...prev,
        description: `Character limit exceeded (${value.length}/300)`
      }))
      return
    } else if (name === 'description') {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.description
        return newErrors
      })
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFieldFocus = (fieldName: string) => {
    setActiveField(fieldName)
  }

  const handleFieldBlur = () => {
    setActiveField(null)
  }

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)
      setSlackFiles(prev => [...prev, ...files])
      console.log('Files dropped:', files)
    }
  }

  const handleSlackFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      setSlackFiles(prev => [...prev, ...files])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, videoFile: e.target.files![0] }))
    }
  }

  const handleRemoveVideo = () => {
    setFormData(prev => ({ ...prev, videoFile: null }))
  }

  const handleClearSlackFiles = () => {
    setSlackFiles([])
  }

  const handleSubmitClick = () => {
    setShowSubmitModal(true)
  }

  const handleConfirmSubmit = () => {
    setLoading('final-submit', true)
    // Handle the actual submission logic here
    console.log('Project submitted!', formData)
    setShowSubmitModal(false)
    setActiveField(null)
    
    // Simulate API call
    setTimeout(() => {
      setLoading('final-submit', false)
      // You could redirect to a success page or show a success message
    }, 2000)
  }

  const handleCancelSubmit = () => {
    setShowSubmitModal(false)
  }

  const handleSaveDraft = () => {
    setLoading('save-draft', true)
    console.log('Saving draft...', formData)
    
    // Simulate API call
    setTimeout(() => {
      setLoading('save-draft', false)
      setActiveField(null)
    }, 1000)
  }

  const handleCancelEdit = () => {
    setActiveField(null)
  }

  const checklistItems = [
    { key: 'projectName', label: 'Project Name', required: true },
    { key: 'description', label: 'Project Description', required: true },
    { key: 'selectedChallenge', label: 'Challenge Selection', required: true },
    { key: 'demoUrl', label: 'Demo URL', required: true },
    { key: 'sourceCode', label: 'Source Code', required: true },
    { key: 'videoFile', label: 'Video Upload', required: true },
    { key: 'slackFiles', label: 'Slack Files', required: true }
  ]

  // Check if all required fields are completed
  const requiredFieldsCompleted = checklistItems
    .filter(item => item.required)
    .every(item => checklist[item.key])

  // Check if ALL fields are completed (for submission)
  const allFieldsCompleted = checklistItems.every(item => checklist[item.key])

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
  const getStepNumber = (item: { key: string; label: string; required: boolean }) => {
    const incompleteItems = checklistItems.filter(checklistItem => 
      !checklist[checklistItem.key]
    )
    const index = incompleteItems.findIndex(incompleteItem => incompleteItem.key === item.key)
    return index !== -1 ? index + 1 : checklistItems.findIndex(checklistItem => checklistItem.key === item.key) + 1
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] flex flex-col">
      <div className="flex flex-1">
        <Sidebar
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
              <h1 className={`${style.font.grotesk.main} text-2xl text-[var(--color-light-opacity100)] mb-4`}>
                Project Submission
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handlePreview}
                    className={`${style.box.gray.middle} text-[var(--color-light-opacity100)] hover:bg-[var(--color-white-opacity30)] ${style.font.mono.text} px-6 py-2 ${style.border.radius.middle} ${style.perf.transition.fast} flex items-center justify-center space-x-2 flex-shrink-0 text-sm`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                </div>

                <span className={`px-4 py-2 text-xs ${style.font.mono.text} ${style.border.radius.full} ${style.perf.transition.slow} transform ${
                  activeField 
                    ? 'bg-transparent border border-[var(--color-light-opacity30)] text-[var(--color-light-opacity100)] scale-105' 
                    : allFieldsCompleted
                    ? 'bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] scale-100'
                    : 'bg-[var(--color-secondary-opacity100)] text-[var(--color-light-opacity100)] scale-100'
                }`}>
                  {activeField ? 'Editing' : allFieldsCompleted ? 'Final' : 'Draft'}
                </span>
              </div>
            </div>

            {/* Form Content */}
            <div className={`${style.border.radius.outer} p-6 space-y-6 w-full ${style.perf.transition.slow} transform ${
              allFieldsCompleted 
                ? 'bg-[var(--color-primary-opacity20)] border border-[var(--color-primary-opacity50)] shadow-lg scale-[1.01]' 
                : activeField 
                ? 'bg-[var(--color-white-opacity10)] shadow-md scale-[1.005]' 
                : 'bg-[var(--color-white-opacity5)] scale-100'
            }`}>
              
              {/* Project Name */}
              <div className="space-y-2">
                <label className={`block text-[var(--color-light-opacity100)] text-sm ${style.font.grotesk.medium}`}>
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('projectName')}
                  onBlur={handleFieldBlur}
                  className={`w-full bg-[var(--color-white-opacity10)] border ${style.border.radius.middle} px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none ${style.perf.transition.fast} text-sm ${style.font.mono.text} transform ${
                    activeField === 'projectName' 
                      ? 'border-[var(--color-primary-opacity100)] shadow-md scale-[1.02] bg-[var(--color-white-opacity15)]' 
                      : 'border-[var(--color-light-opacity20)] scale-100'
                  }`}
                  placeholder="Enter project name"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className={`block text-[var(--color-light-opacity100)] text-sm ${style.font.grotesk.medium}`}>
                    Description of what you've built
                  </label>
                  <span className={`text-xs ${style.font.mono.text} ${style.perf.transition.fast} ${
                    formData.description.length > 250 
                      ? 'text-[var(--color-alerts-opacity100)]' 
                      : formData.description.length > 200
                      ? 'text-[var(--color-secondary-opacity100)]'
                      : 'text-[var(--color-light-opacity40)]'
                  }`}>
                    {formData.description.length}/300
                  </span>
                </div>
                <p className={`${style.font.grotesk.light} text-[var(--color-light-opacity60)] text-xs leading-relaxed mb-3`}>
                  Description of maximum 10 lines limit of documents at lorem ipsum dictumst et nisl, mauris phasellus egestas vel tellus rutrum vel, ornare molestie mauris non pulvinar. Turpis neque viverra et auctor fermentum consectetur tortor vitae egestas. Lorem ipsum dolor sit amet consequat pharetra nunc ipsum nam, scelerisque duis ut ridiculus pellentesque et tortor vitae.
                </p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('description')}
                  onBlur={handleFieldBlur}
                  rows={5}
                  className={`w-full bg-[var(--color-white-opacity10)] border ${style.border.radius.middle} px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none ${style.perf.transition.fast} resize-none text-sm ${style.font.mono.text} transform ${
                    activeField === 'description' 
                      ? 'border-[var(--color-primary-opacity100)] shadow-md scale-[1.02] bg-[var(--color-white-opacity15)]' 
                      : 'border-[var(--color-light-opacity20)] scale-100'
                  } ${fieldErrors.description ? 'border-[var(--color-alerts-opacity100)]' : ''}`}
                  placeholder="Describe your project, the problem it solves, and the technology you used..."
                />
                {fieldErrors.description && (
                  <p className={`${style.font.grotesk.light} text-[var(--color-alerts-opacity100)] text-xs mt-1 animate-pulse`}>
                    {fieldErrors.description}
                  </p>
                )}
              </div>

              {/* Your Challenge */}
              <div className="space-y-2">
                <label className={`block text-[var(--color-light-opacity100)] text-sm ${style.font.grotesk.medium}`}>
                  Your Challenge
                </label>
                <p className={`${style.font.grotesk.light} text-[var(--color-light-opacity60)] text-xs mb-3`}>
                  Leave a short note and slack channel name participating this work to receive bounty reward! or continue reading official terms.
                </p>
                <div className="relative">
                  <select
                    name="selectedChallenge"
                    value={formData.selectedChallenge}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus('selectedChallenge')}
                    onBlur={handleFieldBlur}
                    className={`w-full bg-[var(--color-white-opacity10)] border ${style.border.radius.middle} px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none ${style.perf.transition.fast} appearance-none text-sm ${style.font.mono.text} transform ${
                      activeField === 'selectedChallenge' 
                        ? 'border-[var(--color-primary-opacity100)] shadow-md scale-[1.02] bg-[var(--color-white-opacity15)]' 
                        : 'border-[var(--color-light-opacity20)] scale-100'
                    }`}
                  >
                    <option value="">Select the challenge that your project is for...</option>
                    <option value="ai">AI Challenge</option>
                    <option value="sustainability">Sustainability Challenge</option>
                    <option value="fintech">FinTech Challenge</option>
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-light-opacity40)] pointer-events-none ${style.perf.transition.fast}`} />
                </div>
              </div>

              {/* Slack Challenge Participation */}
              <div className="space-y-2">
                <label className={`block text-[var(--color-light-opacity100)] text-sm ${style.font.grotesk.medium}`}>
                  Slack challenge participation
                </label>
                <p className={`${style.font.grotesk.light} text-[var(--color-light-opacity60)] text-xs mb-3`}>
                  Leave a short note and slack channel name participating this work to receive bounty reward! or continue reading official terms.
                </p>
                
                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed ${style.border.radius.middle} p-8 text-center ${style.perf.transition.slow} transform ${
                    slackFiles.length > 0
                      ? 'border-[var(--color-primary-opacity100)] bg-[var(--color-primary-opacity20)] scale-[1.02]' 
                      : dragActive 
                      ? 'border-[var(--color-light-opacity50)] bg-[var(--color-white-opacity10)] scale-[1.02]' 
                      : 'border-[var(--color-light-opacity30)] hover:border-[var(--color-light-opacity50)] scale-100'
                  }`}
                  onDragEnter={handleDragEvents}
                  onDragLeave={handleDragEvents}
                  onDragOver={handleDragEvents}
                  onDrop={handleDrop}
                >
                  <Upload className={`w-6 h-6 mx-auto mb-3 ${style.perf.transition.fast} ${
                    slackFiles.length > 0 ? 'text-[var(--color-primary-opacity100)]' : 'text-[var(--color-light-opacity40)]'
                  }`} />
                  {slackFiles.length > 0 ? (
                    <div>
                      <p className={`text-[var(--color-primary-opacity100)] mb-2 text-sm ${style.font.grotesk.medium}`}>
                        {slackFiles.length} file{slackFiles.length > 1 ? 's' : ''} uploaded
                      </p>
                      <div className={`text-xs text-[var(--color-light-opacity60)] space-y-1 mb-3 ${style.font.mono.text}`}>
                        {slackFiles.map((file, index) => (
                          <div key={index}>{file.name}</div>
                        ))}
                      </div>
                      <button
                        onClick={handleClearSlackFiles}
                        className={`text-xs text-[var(--color-alerts-opacity100)] hover:text-[var(--color-alerts-opacity60)] underline ${style.font.grotesk.light} ${style.perf.transition.fast}`}
                      >
                        Clear files
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className={`text-[var(--color-light-opacity60)] mb-2 text-sm ${style.font.grotesk.light}`}>
                        Drag and drop files here, or
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleSlackFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className={`inline-flex items-center px-4 py-2 bg-[var(--color-white-opacity20)] hover:bg-[var(--color-white-opacity30)] ${style.border.radius.middle} cursor-pointer ${style.perf.transition.fast} text-sm text-[var(--color-light-opacity100)] ${style.font.grotesk.light} transform hover:scale-105`}
                      >
                        Browse files
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Row - Video Upload and URL Links */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                
                {/* Video Upload */}
                <div className="space-y-2 flex flex-col h-full">
                  <div className={`${style.border.radius.middle} p-4 border flex flex-col h-full ${style.perf.transition.slow} transform ${
                    formData.videoFile 
                      ? 'bg-[var(--color-primary-opacity20)] border-[var(--color-primary-opacity100)] scale-[1.02]' 
                      : 'bg-[var(--color-white-opacity10)] border-[var(--color-light-opacity20)] scale-100'
                  }`}>
                    <div className={`aspect-video ${style.border.radius.middle} flex items-center justify-center mb-3 ${style.perf.transition.fast} ${
                      formData.videoFile ? 'bg-[var(--color-primary-opacity30)]' : 'bg-[var(--color-white-opacity5)]'
                    }`}>
                      {formData.videoFile ? (
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-[var(--color-primary-opacity100)]" />
                          <p className={`text-xs text-[var(--color-primary-opacity100)] ${style.font.grotesk.medium}`}>
                            Video uploaded
                          </p>
                          <p className={`text-xs text-[var(--color-light-opacity60)] mb-2 ${style.font.mono.text}`}>
                            {formData.videoFile.name}
                          </p>
                          <button
                            onClick={handleRemoveVideo}
                            className={`text-xs text-[var(--color-alerts-opacity100)] hover:text-[var(--color-alerts-opacity60)] underline ${style.font.grotesk.light} ${style.perf.transition.fast}`}
                          >
                            Remove video
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-[var(--color-light-opacity40)]" />
                          <p className={`text-xs text-[var(--color-light-opacity60)] ${style.font.grotesk.light}`}>
                            No video uploaded
                          </p>
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
                      className={`block w-full text-center px-3 py-2 border ${style.border.radius.middle} cursor-pointer ${style.perf.transition.fast} text-sm mt-auto ${style.font.grotesk.light} transform hover:scale-105 ${
                        formData.videoFile
                          ? 'bg-[var(--color-primary-opacity30)] hover:bg-[var(--color-primary-opacity50)] border-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)]'
                          : 'bg-[var(--color-white-opacity5)] hover:bg-[var(--color-white-opacity10)] border-[var(--color-light-opacity20)] text-[var(--color-light-opacity100)]'
                      }`}
                    >
                      {formData.videoFile ? 'Change Video' : 'Upload Video'}
                    </label>
                  </div>
                </div>

                {/* URL Links */}
                <div className="space-y-4 flex flex-col h-full">
                  
                  {/* Project Demo */}
                  <div className="space-y-2">
                    <label className={`block text-[var(--color-light-opacity100)] text-sm ${style.font.grotesk.medium}`}>
                      Project Demo
                    </label>
                    <p className={`${style.font.grotesk.light} text-[var(--color-light-opacity60)] text-xs mb-2`}>
                      The place where you project can be experienced.
                    </p>
                    
                    <input
                      type="url"
                      name="demoUrl"
                      value={formData.demoUrl}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus('demoUrl')}
                      onBlur={handleFieldBlur}
                      className={`w-full bg-[var(--color-white-opacity10)] border ${style.border.radius.middle} px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none ${style.perf.transition.fast} text-sm ${style.font.mono.text} transform ${
                        activeField === 'demoUrl' 
                          ? 'border-[var(--color-primary-opacity100)] shadow-md scale-[1.02] bg-[var(--color-white-opacity15)]' 
                          : 'border-[var(--color-light-opacity20)] scale-100'
                      }`}
                      placeholder="Project url link..."
                    />
                  </div>

                  {/* Source Code */}
                  <div className="space-y-2">
                    <label className={`block text-[var(--color-light-opacity100)] text-sm ${style.font.grotesk.medium}`}>
                      Source Code
                    </label>
                    <p className={`${style.font.grotesk.light} text-[var(--color-light-opacity60)] text-xs mb-2`}>
                      Where viewers and judges can access your source code.
                    </p>
                    
                    <input
                      type="url"
                      name="sourceCode"
                      value={formData.sourceCode}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus('sourceCode')}
                      onBlur={handleFieldBlur}
                      className={`w-full bg-[var(--color-white-opacity10)] border ${style.border.radius.middle} px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none ${style.perf.transition.fast} text-sm ${style.font.mono.text} transform ${
                        activeField === 'sourceCode' 
                          ? 'border-[var(--color-primary-opacity100)] shadow-md scale-[1.02] bg-[var(--color-white-opacity15)]' 
                          : 'border-[var(--color-light-opacity20)] scale-100'
                      }`}
                      placeholder="Source code url link..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-auto pt-4">
                    {activeField ? (
                      // When editing a field, show save/cancel buttons
                      <>
                        <MainButton 
                          onClick={handleSaveDraft}
                          variant="default"
                          size="sm"
                          showIcon={false}
                          className={`${style.perf.transition.fast} transform hover:scale-105`}
                        >
                          Save Draft
                        </MainButton>
                        <MainButton 
                          onClick={handleCancelEdit}
                          variant="alerts"
                          size="sm"
                          showIcon={false}
                          className={`${style.perf.transition.fast} transform hover:scale-105`}
                        >
                          Cancel
                        </MainButton>
                      </>
                    ) : (
                      // When not editing, show submit button only if ALL fields are completed
                      allFieldsCompleted && (
                        <MainButton 
                          onClick={handleSubmitClick}
                          variant="primary"
                          size="default"
                          showIcon={false}
                          className={`${style.perf.transition.fast} transform hover:scale-105`}
                        >
                          Submit As Final
                        </MainButton>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Next Steps with Enhanced Animation */}
          <div className="w-[26rem] p-6">
            <div className={`${style.border.solid} ${style.border.radius.outer} sticky top-6 ${style.perf.transition.slow} shadow-md transform
              ${allFieldsCompleted 
                ? 'border-[var(--color-primary-opacity100)] bg-[var(--color-primary-opacity20)] px-8 py-6 scale-105' 
                : 'border-[var(--color-alerts-opacity100)] bg-[var(--color-white-opacity5)] px-6 py-4 scale-100'
              }`}
            >
              <h3 className={`text-base ${style.font.grotesk.main} text-[var(--color-light-opacity100)] mb-4 ${style.perf.transition.fast}`}>
                {allFieldsCompleted ? 'ALL DONE!' : 'Next Steps'}
              </h3>

              {allFieldsCompleted ? (
                <div className={`${style.perf.transition.slow}`}>
                  <p className={`${style.font.grotesk.light} text-[var(--color-light-opacity60)] text-sm leading-relaxed`}>
                    Now, just sit back and relax. Follow the{" "}
                    <span className={`underline cursor-pointer hover:text-[var(--color-light-opacity100)] text-[var(--color-primary-opacity100)] ${style.perf.transition.fast}`}>
                      announcements
                    </span>{" "}
                    closely and get some sleep!
                  </p>
                </div>
              ) : (
                <div className="space-y-0">
                  {sortedChecklistItems.map((item) => (
                    <NextStepItem
                      key={item.key}
                      item={item}
                      index={getStepNumber(item) - 1}
                      isCompleted={checklist[item.key]}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <SubmitModal
        isOpen={showSubmitModal}
        onClose={handleCancelSubmit}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  )
}