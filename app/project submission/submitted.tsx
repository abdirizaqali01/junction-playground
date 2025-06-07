'use client'

import { useState } from 'react'
import { Footer } from '@/components/footer'
import { ArrowLeft, CheckCircle, Play, Code, Trophy, Users, Calendar, ExternalLink } from 'lucide-react'

export default function SubmittedProjectPage() {
  // Sample project data - in a real app this would come from props or API
  const projectData = {
    projectName: "AI-Powered Task Manager",
    submittedAt: "2024-12-15T10:30:00Z",
    status: "Under Review",
    description: "A comprehensive task management application that leverages AI to prioritize tasks, suggest optimal scheduling, and provide intelligent insights to boost productivity. Built with React, Node.js, and OpenAI API integration.",
    slackChannel: "#ai-hackathon-2024",
    teamMembers: ["John Smith", "Sarah Johnson", "Mike Chen"],
    videoFile: "demo-video.mp4",
    attachments: ["source-code.zip", "screenshots.pdf", "presentation.pptx"],
    submissionId: "PROJ-2024-001"
  }

  const goBackToHome = () => {
    // In a real app, this would navigate to the home page
    window.history.back()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={goBackToHome}
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-white/70">Submitted Successfully</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-[#00CE93]" />
            </div>
            <h1 className="text-3xl font-bold">Project Submitted Successfully!</h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Your project has been submitted and is now under review. You'll receive updates on the status 
              of your submission via email and Slack notifications.
            </p>
          </div>

          {/* Submission Details Card */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Submission Details</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-500 font-medium">{projectData.status}</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/60">Submission ID:</span>
                <p className="font-mono text-[#00CE93]">{projectData.submissionId}</p>
              </div>
              <div>
                <span className="text-white/60">Submitted:</span>
                <p>{formatDate(projectData.submittedAt)}</p>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            
            {/* Project Name */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Project Name</h2>
              <p className="text-lg text-white/90">{projectData.projectName}</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-white/80 leading-relaxed">{projectData.description}</p>
            </div>

            {/* Slack Channel */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Slack Channel</h2>
              <p className="text-[#00CE93] font-mono">{projectData.slackChannel}</p>
            </div>

            {/* Files and Attachments */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Uploaded Files</h2>
              <div className="space-y-2">
                {projectData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                    <span className="text-sm text-white/80">{file}</span>
                    <ExternalLink className="w-4 h-4 text-white/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Video Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Demo Video</span>
              </h2>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="w-12 h-12 mx-auto mb-2 text-[#00CE93]" />
                    <p className="text-sm text-white/70">{projectData.videoFile}</p>
                  </div>
                </div>
                
                <button className="block w-full text-center px-4 py-2 bg-[#00CE93] hover:bg-[#00CE93]/90 text-black font-medium rounded-lg transition-colors text-sm">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Team Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Team Members</span>
              </h2>
              
              <div className="space-y-3">
                {projectData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-8 h-8 bg-[#00CE93] rounded-full flex items-center justify-center text-black text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-white/90">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-6 py-4 transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>View Demo</span>
            </button>
            
            <button
              type="button" 
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-6 py-4 transition-colors"
            >
              <Code className="w-5 h-5" />
              <span>Source Code</span>
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center space-x-2 bg-[#00CE93] hover:bg-[#00CE93]/90 text-black font-semibold rounded-lg px-6 py-4 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span>View All Projects</span>
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-[#00CE93]/10 to-blue-500/10 border border-[#00CE93]/20 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#00CE93]" />
              <span>What's Next?</span>
            </h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>• Your project is now in the review queue and will be evaluated by our panel of judges</p>
              <p>• You'll receive email updates about the review process and any additional requirements</p>
              <p>• Winners will be announced on [Date] via email and Slack notifications</p>
              <p>• Keep an eye on the {projectData.slackChannel} channel for updates and discussions</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}