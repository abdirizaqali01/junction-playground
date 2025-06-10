'use client'

import { Footer } from '@/components/footer'
import { ArrowLeft, Upload, Play, Plus, X, Users, Code, Trophy } from 'lucide-react'

interface ProjectSubmissionData {
  autoSaveStatus: string
  navigation: {
    backButton: string
  }
  sections: {
    projectName: {
      title: string
      required: boolean
      placeholder: string
    }
    description: {
      title: string
      subtitle: string
      placeholder: string
    }
    slackChallenge: {
      title: string
      subtitle: string
      placeholder: string
    }
    filesAttachments: {
      title: string
      subtitle: string
      dragDropText: string
      browseText: string
      uploadedFilesText: string
    }
    video: {
      title: string
      noVideoText: string
      uploadButtonText: string
    }
    team: {
      title: string
      memberPlaceholder: string
      addMemberText: string
    }
  }
  actionButtons: {
    demo: string
    sourceCode: string
    submit: string
  }
}

export default function ProjectSubmissionPage() {
  // Static data dictionary - backend team can replace with API calls
  const projectSubmissionData: ProjectSubmissionData = {
    autoSaveStatus: "Auto-saved",
    navigation: {
      backButton: "Back"
    },
    sections: {
      projectName: {
        title: "Project name",
        required: true,
        placeholder: "Enter your project name"
      },
      description: {
        title: "Description of what you've built",
        subtitle: "Description of maximum 10 lines limit of documents at lorem ipsum dictumst et nisl, mauris phasellus egestas vel tellus rutrum vel, ornare molestie mauris non pulvinar. Turpis neque viverra et auctor fermentum consectetur tortor vitae egestas. Lorem ipsum dolor sit amet consequat pharetra nunc ipsum nam, scelerisque duis ut ridiculus pellentesque et tortor vitae.",
        placeholder: "Describe your project, the problem it solves, and the technology you used..."
      },
      slackChallenge: {
        title: "Slack challenge participation",
        subtitle: "Leave a short note and slack channel name participating this work for receive bounty reward! or continue reading official terms.",
        placeholder: "#your-channel-name"
      },
      filesAttachments: {
        title: "Files and attachments",
        subtitle: "Upload source files and screenshots explaining this work for receive bounty reward! or continue reading official terms.",
        dragDropText: "Drag and drop files here, or",
        browseText: "Browse files",
        uploadedFilesText: "Uploaded files:"
      },
      video: {
        title: "Video",
        noVideoText: "No video uploaded",
        uploadButtonText: "Upload Video"
      },
      team: {
        title: "Team",
        memberPlaceholder: "Team member name",
        addMemberText: "Add team member"
      }
    },
    actionButtons: {
      demo: "Demo",
      sourceCode: "Source code",
      submit: "Submit Project"
    }
  }

  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    slackChannel: '',
    videoFile: null,
    attachments: [],
    teamMembers: ['']
  })

  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (files, type) => {
    if (type === 'video') {
      setFormData(prev => ({ ...prev, videoFile: files[0] }))
    } else {
      setFormData(prev => ({ 
        ...prev, 
        attachments: [...prev.attachments, ...Array.from(files)] 
      }))
    }
  }

  const handleDrag = (e) => {
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
      handleFileUpload(e.dataTransfer.files, 'attachment')
    }
  }

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, '']
    }))
  }

  const updateTeamMember = (index, value) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? value : member
      )
    }))
  }

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }))
  }

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = () => {
    console.log('Project submitted:', formData)
    // Handle form submission
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">

      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={goBack}
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors group font-['Inter']"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{projectSubmissionData.navigation.backButton}</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-white/70 font-['Inter']">{projectSubmissionData.autoSaveStatus}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          
          {/* Project Name */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-['Space_Grotesk'] font-bold">{projectSubmissionData.sections.projectName.title}</h1>
              {projectSubmissionData.sections.projectName.required && (
                <span className="px-2 py-1 bg-white/10 text-xs font-['Space_Mono'] rounded-full">Required</span>
              )}
            </div>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-lg font-['Inter'] focus:outline-none focus:border-[#00CE93] focus:ring-1 focus:ring-[#00CE93]/20 transition-colors"
              placeholder={projectSubmissionData.sections.projectName.placeholder}
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-['Space_Grotesk'] font-semibold">{projectSubmissionData.sections.description.title}</h2>
            <p className="text-white/60 text-sm leading-relaxed font-['Inter']">
              {projectSubmissionData.sections.description.subtitle}
            </p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 font-['Inter'] focus:outline-none focus:border-[#00CE93] focus:ring-1 focus:ring-[#00CE93]/20 transition-colors resize-none"
              placeholder={projectSubmissionData.sections.description.placeholder}
            />
          </div>

          {/* Slack Channel */}
          <div className="space-y-3">
            <h2 className="text-xl font-['Space_Grotesk'] font-semibold">{projectSubmissionData.sections.slackChallenge.title}</h2>
            <p className="text-white/60 text-sm font-['Inter']">
              {projectSubmissionData.sections.slackChallenge.subtitle}
            </p>
            <input
              type="text"
              name="slackChannel"
              value={formData.slackChannel}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 font-['Inter'] focus:outline-none focus:border-[#00CE93] focus:ring-1 focus:ring-[#00CE93]/20 transition-colors"
              placeholder={projectSubmissionData.sections.slackChallenge.placeholder}
            />
          </div>

          {/* Files and Attachments */}
          <div className="space-y-3">
            <h2 className="text-xl font-['Space_Grotesk'] font-semibold">{projectSubmissionData.sections.filesAttachments.title}</h2>
            <p className="text-white/60 text-sm font-['Inter']">
              {projectSubmissionData.sections.filesAttachments.subtitle}
            </p>
            
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-[#00CE93] bg-[#00CE93]/5' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-white/40" />
              <p className="text-white/60 mb-2 font-['Inter']">{projectSubmissionData.sections.filesAttachments.dragDropText}</p>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files, 'attachment')}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors font-['Space_Mono']"
              >
                {projectSubmissionData.sections.filesAttachments.browseText}
              </label>
            </div>

            {/* Uploaded Files */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-['Space_Grotesk'] font-medium text-white/80">{projectSubmissionData.sections.filesAttachments.uploadedFilesText}</h3>
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                    <span className="text-sm text-white/70 font-['Inter']">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Video Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>{projectSubmissionData.sections.video.title}</span>
              </h2>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  {formData.videoFile ? (
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-[#00CE93]" />
                      <p className="text-sm text-white/70 font-['Inter']">{formData.videoFile.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white/40" />
                      <p className="text-sm text-white/60 font-['Inter']">{projectSubmissionData.sections.video.noVideoText}</p>
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload(e.target.files, 'video')}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="block w-full text-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors text-sm font-['Space_Mono']"
                >
                  {projectSubmissionData.sections.video.uploadButtonText}
                </label>
              </div>
            </div>

            {/* Team Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{projectSubmissionData.sections.team.title}</span>
              </h2>
              
              <div className="space-y-3">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#00CE93] rounded-full flex items-center justify-center text-black text-sm font-['Space_Mono'] font-bold">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={member}
                      onChange={(e) => updateTeamMember(index, e.target.value)}
                      className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm font-['Inter'] focus:outline-none focus:border-[#00CE93] focus:ring-1 focus:ring-[#00CE93]/20 transition-colors"
                      placeholder={projectSubmissionData.sections.team.memberPlaceholder}
                    />
                    {formData.teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="flex items-center space-x-2 text-[#00CE93] hover:text-[#00CE93]/80 transition-colors text-sm font-['Space_Mono']"
                >
                  <Plus className="w-4 h-4" />
                  <span>{projectSubmissionData.sections.team.addMemberText}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-6 py-4 transition-colors font-['Space_Mono']"
            >
              <Play className="w-5 h-5" />
              <span>{projectSubmissionData.actionButtons.demo}</span>
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-6 py-4 transition-colors font-['Space_Mono']"
            >
              <Code className="w-5 h-5" />
              <span>{projectSubmissionData.actionButtons.sourceCode}</span>
            </button>
            
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center space-x-2 bg-[#00CE93] hover:bg-[#00CE93]/90 text-black font-['Space_Mono'] font-semibold rounded-lg px-6 py-4 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span>{projectSubmissionData.actionButtons.submit}</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}