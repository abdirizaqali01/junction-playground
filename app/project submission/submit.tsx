'use client'

import { useState } from 'react'
import { Footer } from '@/components/footer'
import { ArrowLeft, Upload, Play, Plus, X, Users, Code, Trophy } from 'lucide-react'

export default function ProjectSubmissionPage() {
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
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={goBack}
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-white/70">Auto-saved</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          
          {/* Project Name */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">Project name</h1>
              <span className="px-2 py-1 bg-white/10 text-xs rounded-full">Required</span>
            </div>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-[#00CE93] focus:ring-1 focus:ring-[#00CE93]/20 transition-colors"
              placeholder="Enter your project name"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Description of what you've built</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Description of maximum 10 lines limit of documents at lorem ipsum dictumst et nisl, 
              mauris phasellus egestas vel tellus rutrum vel, ornare molestie mauris non pulvinar. 
              Turpis neque viverra et auctor fermentum consectetur tortor vitae egestas. Lorem ipsum 
              dolor sit amet consequat pharetra nunc ipsum nam, scelerisque duis ut ridiculus 
              pellentesque et tortor vitae.
            </p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00CE93] focus:ring-1 focus:ring-[#00CE93]/20 transition-colors resize-none"
              placeholder="Describe your project, the problem it solves, and the technology you used..."
            />
          </div>

          {/* Slack Channel */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Slack challenge participation</h2>
            <p className="text-white/60 text-sm">
              Leave a short note and slack channel name participating this work for receive bounty reward! or continue reading official terms.
            </p>
            <input
              type="text"
              name="slackChannel"
              value={formData.slackChannel}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00CE93] focus:ring-1 focus:ring-[#00CE93]/20 transition-colors"
              placeholder="#your-channel-name"
            />
          </div>

          {/* Files and Attachments */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Files and attachments</h2>
            <p className="text-white/60 text-sm">
              Upload source files and screenshots explaining this work for receive bounty reward! or continue reading official terms.
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
              <p className="text-white/60 mb-2">Drag and drop files here, or</p>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files, 'attachment')}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors"
              >
                Browse files
              </label>
            </div>

            {/* Uploaded Files */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/80">Uploaded files:</h3>
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                    <span className="text-sm text-white/70">{file.name}</span>
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
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Video</span>
              </h2>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  {formData.videoFile ? (
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-[#00CE93]" />
                      <p className="text-sm text-white/70">{formData.videoFile.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white/40" />
                      <p className="text-sm text-white/60">No video uploaded</p>
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
                  className="block w-full text-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors text-sm"
                >
                  Upload Video
                </label>
              </div>
            </div>

            {/* Team Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Team</span>
              </h2>
              
              <div className="space-y-3">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#00CE93] rounded-full flex items-center justify-center text-black text-sm font-bold">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={member}
                      onChange={(e) => updateTeamMember(index, e.target.value)}
                      className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00CE93] focus:ring-1 focus:ring-[#00CE93]/20 transition-colors"
                      placeholder="Team member name"
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
                  className="flex items-center space-x-2 text-[#00CE93] hover:text-[#00CE93]/80 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add team member</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-6 py-4 transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>Demo</span>
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-6 py-4 transition-colors"
            >
              <Code className="w-5 h-5" />
              <span>Source code</span>
            </button>
            
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center space-x-2 bg-[#00CE93] hover:bg-[#00CE93]/90 text-black font-semibold rounded-lg px-6 py-4 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span>Submit Project</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}