'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from '@/components/attachables/main-button'
import { Upload, Play, ChevronDown, Check, X } from 'lucide-react'
import { initializeCSSVariables } from '@/styles/design-system'

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
    <div className="fixed inset-0 bg-[var(--color-dark-opacity80)] flex items-center justify-center z-50">
      <div className="bg-[var(--color-dark-opacity100)] border-2 border-[var(--color-light-opacity20)] rounded-[10px] p-6 max-w-md w-full mx-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)] mb-3">
            Final Submit your project?
          </h3>
          <p className="text-[var(--color-light-opacity60)] leading-relaxed font-space-grotesk font-[300] text-sm">
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

// Enhanced Next Steps Item Component with fade animation
const NextStepItem = ({ item, index, isCompleted, onTransitionEnd }: {
  item: { key: string; label: string; required: boolean };
  index: number;
  isCompleted: boolean;
  onTransitionEnd?: () => void;
}) => {
  return (
    <div 
      className={`transition-all duration-500 ease-in-out transform ${
        isCompleted 
          ? 'opacity-0 scale-95 max-h-0 mb-0 overflow-hidden pointer-events-none' 
          : 'opacity-100 scale-100 max-h-96 mb-3'
      }`}
      onTransitionEnd={onTransitionEnd}
    >
      <div className={`border rounded-[5px] p-3 transition-all duration-200 ${
        isCompleted
          ? 'border-[var(--color-primary-opacity100)]' 
          : 'border-[var(--color-alerts-opacity100)]'
      }`}>
        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
              isCompleted
                ? 'bg-[var(--color-primary-opacity100)] border-[var(--color-primary-opacity100)]' 
                : 'border-[var(--color-light-opacity40)]'
            }`}>
              {isCompleted && (
                <Check className="w-3 h-3 text-[var(--color-light-opacity100)]" />
              )}
            </div>
            <h4 className={`font-space-grotesk font-[500] text-sm transition-colors ${
              isCompleted
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
        <p className="text-[var(--color-light-opacity60)] text-xs leading-relaxed font-space-grotesk font-[300]">
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
  
  // Initialize design system variables
  useEffect(() => {
    initializeCSSVariables();
  }, []);

  const [formData, setFormData] = useState({
    projectName: 'Energify',
    description: '',
    selectedChallenge: '',
    slackChannel: '',
    demoUrl: '',
    sourceCode: '',
    videoFile: null
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
  const [activeField, setActiveField] = useState(null)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

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

  const handleBackToHome = () => {
    router.push('/dash')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
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
    // Handle the actual submission logic here
    console.log('Project submitted!', formData)
    setShowSubmitModal(false)
    setActiveField(null)
    // You could redirect to a success page or show a success message
  }

  const handleCancelSubmit = () => {
    setShowSubmitModal(false)
  }

  const nextSteps: Array<{step: number; title: string; description: string}> = [
  ]

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
  const getStepNumber = (item) => {
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
              <h1 className="text-2xl font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)] mb-4">
                Project Submission
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MainButton
                    variant="outlineGray"
                    size="sm"
                    showIcon={false}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>
                    Preview
                  </MainButton>
                </div>

                <span className={`px-3 py-1 text-xs font-space-mono font-[400] tracking-[-0.02rem] rounded-full transition-all duration-200 ${
                  activeField 
                    ? 'bg-transparent border border-[var(--color-light-opacity30)] text-[var(--color-light-opacity100)]' 
                    : allFieldsCompleted
                    ? 'bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)]'
                    : 'bg-[var(--color-secondary-opacity100)] text-[var(--color-light-opacity100)]'
                }`}>
                  {activeField ? 'Editing' : allFieldsCompleted ? 'Final' : 'Draft'}
                </span>
              </div>
            </div>

            {/* Form Content */}
            <div className={`rounded-[10px] p-6 space-y-6 w-full transition-colors ${
              allFieldsCompleted 
                ? 'bg-[var(--color-primary-opacity20)] border border-[var(--color-primary-opacity50)]' 
                : activeField 
                ? 'bg-[var(--color-white-opacity10)]' 
                : 'bg-[var(--color-white-opacity5)]'
            }`}>
              
              {/* Project Name */}
              <div className="space-y-2">
                <label className="block text-[var(--color-light-opacity100)] text-sm font-space-grotesk font-[500]">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('projectName')}
                  onBlur={handleFieldBlur}
                  className="w-full bg-[var(--color-white-opacity10)] border border-[var(--color-light-opacity20)] rounded-[5px] px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none focus:border-[var(--color-primary-opacity100)] transition-colors text-sm font-space-mono"
                  placeholder="Enter project name"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-[var(--color-light-opacity100)] text-sm font-space-grotesk font-[500]">
                  Description of what you've built
                </label>
                <p className="text-[var(--color-light-opacity60)] text-xs leading-relaxed mb-3 font-space-grotesk font-[300]">
                  Description of maximum 10 lines limit of documents at lorem ipsum dictumst et nisl, mauris phasellus egestas vel tellus rutrum vel, ornare molestie mauris non pulvinar. Turpis neque viverra et auctor fermentum consectetur tortor vitae egestas. Lorem ipsum dolor sit amet consequat pharetra nunc ipsum nam, scelerisque duis ut ridiculus pellentesque et tortor vitae.
                </p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('description')}
                  onBlur={handleFieldBlur}
                  rows={5}
                  className="w-full bg-[var(--color-white-opacity10)] border border-[var(--color-light-opacity20)] rounded-[5px] px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none focus:border-[var(--color-primary-opacity100)] transition-colors resize-none text-sm font-space-mono"
                  placeholder="Describe your project, the problem it solves, and the technology you used..."
                />
              </div>

              {/* Your Challenge */}
              <div className="space-y-2">
                <label className="block text-[var(--color-light-opacity100)] text-sm font-space-grotesk font-[500]">
                  Your Challenge
                </label>
                <p className="text-[var(--color-light-opacity60)] text-xs mb-3 font-space-grotesk font-[300]">
                  Leave a short note and slack channel name participating this work to receive bounty reward! or continue reading official terms.
                </p>
                <div className="relative">
                  <select
                    name="selectedChallenge"
                    value={formData.selectedChallenge}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus('selectedChallenge')}
                    onBlur={handleFieldBlur}
                    className="w-full bg-[var(--color-white-opacity10)] border border-[var(--color-light-opacity20)] rounded-[5px] px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none focus:border-[var(--color-primary-opacity100)] transition-colors appearance-none text-sm font-space-mono"
                  >
                    <option value="">Select the challenge that your project is for...</option>
                    <option value="ai">AI Challenge</option>
                    <option value="sustainability">Sustainability Challenge</option>
                    <option value="fintech">FinTech Challenge</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-light-opacity40)] pointer-events-none" />
                </div>
              </div>

              {/* Slack Challenge Participation */}
              <div className="space-y-2">
                <label className="block text-[var(--color-light-opacity100)] text-sm font-space-grotesk font-[500]">
                  Slack challenge participation
                </label>
                <p className="text-[var(--color-light-opacity60)] text-xs mb-3 font-space-grotesk font-[300]">
                  Leave a short note and slack channel name participating this work to receive bounty reward! or continue reading official terms.
                </p>
                
                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-[5px] p-8 text-center transition-colors ${
                    slackFiles.length > 0
                      ? 'border-[var(--color-primary-opacity100)] bg-[var(--color-primary-opacity20)]' 
                      : dragActive 
                      ? 'border-[var(--color-light-opacity50)] bg-[var(--color-white-opacity10)]' 
                      : 'border-[var(--color-light-opacity30)] hover:border-[var(--color-light-opacity50)]'
                  }`}
                  onDragEnter={handleDragEvents}
                  onDragLeave={handleDragEvents}
                  onDragOver={handleDragEvents}
                  onDrop={handleDrop}
                >
                  <Upload className={`w-6 h-6 mx-auto mb-3 ${
                    slackFiles.length > 0 ? 'text-[var(--color-primary-opacity100)]' : 'text-[var(--color-light-opacity40)]'
                  }`} />
                  {slackFiles.length > 0 ? (
                    <div>
                      <p className="text-[var(--color-primary-opacity100)] mb-2 text-sm font-space-grotesk font-[500]">
                        {slackFiles.length} file{slackFiles.length > 1 ? 's' : ''} uploaded
                      </p>
                      <div className="text-xs text-[var(--color-light-opacity60)] space-y-1 mb-3 font-space-mono">
                        {slackFiles.map((file, index) => (
                          <div key={index}>{file.name}</div>
                        ))}
                      </div>
                      <button
                        onClick={handleClearSlackFiles}
                        className="text-xs text-[var(--color-alerts-opacity100)] hover:text-[var(--color-alerts-opacity60)] underline font-space-grotesk"
                      >
                        Clear files
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-[var(--color-light-opacity60)] mb-2 text-sm font-space-grotesk font-[300]">
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
                        className="inline-flex items-center px-4 py-2 bg-[var(--color-white-opacity20)] hover:bg-[var(--color-white-opacity30)] rounded-[5px] cursor-pointer transition-colors text-sm text-[var(--color-light-opacity100)] font-space-grotesk font-[400]"
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
                  <div className={`rounded-[5px] p-4 border flex flex-col h-full transition-colors ${
                    formData.videoFile 
                      ? 'bg-[var(--color-primary-opacity20)] border-[var(--color-primary-opacity100)]' 
                      : 'bg-[var(--color-white-opacity10)] border-[var(--color-light-opacity20)]'
                  }`}>
                    <div className={`aspect-video rounded-[5px] flex items-center justify-center mb-3 transition-colors ${
                      formData.videoFile ? 'bg-[var(--color-primary-opacity30)]' : 'bg-[var(--color-white-opacity5)]'
                    }`}>
                      {formData.videoFile ? (
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-[var(--color-primary-opacity100)]" />
                          <p className="text-xs text-[var(--color-primary-opacity100)] font-space-grotesk font-[500]">
                            Video uploaded
                          </p>
                          <p className="text-xs text-[var(--color-light-opacity60)] mb-2 font-space-mono">
                            {formData.videoFile.name}
                          </p>
                          <button
                            onClick={handleRemoveVideo}
                            className="text-xs text-[var(--color-alerts-opacity100)] hover:text-[var(--color-alerts-opacity60)] underline font-space-grotesk"
                          >
                            Remove video
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Play className="w-8 h-8 mx-auto mb-2 text-[var(--color-light-opacity40)]" />
                          <p className="text-xs text-[var(--color-light-opacity60)] font-space-grotesk font-[300]">
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
                      className={`block w-full text-center px-3 py-2 border rounded-[5px] cursor-pointer transition-colors text-sm mt-auto font-space-grotesk font-[400] ${
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
                    <label className="block text-[var(--color-light-opacity100)] text-sm font-space-grotesk font-[500]">
                      Project Demo
                    </label>
                    <p className="text-[var(--color-light-opacity60)] text-xs mb-2 font-space-grotesk font-[300]">
                      The place where you project can be experienced.
                    </p>
                    
                    <input
                      type="url"
                      name="demoUrl"
                      value={formData.demoUrl}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus('demoUrl')}
                      onBlur={handleFieldBlur}
                      className="w-full bg-[var(--color-white-opacity10)] border border-[var(--color-light-opacity20)] rounded-[5px] px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none focus:border-[var(--color-primary-opacity100)] transition-colors text-sm font-space-mono"
                      placeholder="Project url link..."
                    />
                  </div>

                  {/* Source Code */}
                  <div className="space-y-2">
                    <label className="block text-[var(--color-light-opacity100)] text-sm font-space-grotesk font-[500]">
                      Source Code
                    </label>
                    <p className="text-[var(--color-light-opacity60)] text-xs mb-2 font-space-grotesk font-[300]">
                      Where viewers and judges can access your source code.
                    </p>
                    
                    <input
                      type="url"
                      name="sourceCode"
                      value={formData.sourceCode}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus('sourceCode')}
                      onBlur={handleFieldBlur}
                      className="w-full bg-[var(--color-white-opacity10)] border border-[var(--color-light-opacity20)] rounded-[5px] px-3 py-2 text-[var(--color-light-opacity100)] focus:outline-none focus:border-[var(--color-primary-opacity100)] transition-colors text-sm font-space-mono"
                      placeholder="Source code url link..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-auto pt-4">
                    {activeField ? (
                      // When editing a field, show save/cancel buttons
                      <>
                        <MainButton 
                          variant="default"
                          size="sm"
                          showIcon={false}
                        >
                          Save Draft
                        </MainButton>
                        <MainButton 
                          onClick={() => setActiveField(null)}
                          variant="alerts"
                          size="sm"
                          showIcon={false}
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
  <div className={`border rounded-[10px] sticky top-6 transition-colors shadow-md
    ${allFieldsCompleted 
      ? 'border-[var(--color-primary-opacity100)] bg-[var(--color-primary-opacity20)] px-8 py-6' 
      : 'border-[var(--color-alerts-opacity100)] bg-[var(--color-white-opacity5)] px-6 py-4'
    }`}
  >
    <h3 className="text-base font-space-grotesk font-[600] tracking-[-0.01rem] text-[var(--color-light-opacity100)] mb-4">
      {allFieldsCompleted ? 'ALL DONE!' : 'Next Steps'}
    </h3>

    {allFieldsCompleted ? (
      <div>
        <p className="text-[var(--color-light-opacity60)] text-sm leading-relaxed font-space-grotesk font-[300]">
          Now, just sit back and relax. Follow the{" "}
          <span className="underline cursor-pointer hover:text-[var(--color-light-opacity100)] text-[var(--color-primary-opacity100)]">
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

        {/* Static Next Steps */}
        {nextSteps.map((step) => {
          const incompleteCount = checklistItems.filter(item => !checklist[item.key]).length
          return (
            <div key={step.step} className="border border-[var(--color-alerts-opacity100)] rounded-[5px] p-3 mb-3">
              <div className="mb-2">
                <h4 className="text-[var(--color-light-opacity100)] font-space-grotesk font-[500] text-sm">
                  {step.step + incompleteCount}. {step.title}
                </h4>
              </div>
              <p className="text-[var(--color-light-opacity60)] text-xs leading-relaxed font-space-grotesk font-[300]">
                {step.description}
              </p>
            </div>
          )
        })}
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