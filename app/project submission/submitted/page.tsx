'use client'

import { Footer } from '@/components/footer'
import { ArrowLeft, CheckCircle, Play, Code, Trophy, Users, Calendar, ExternalLink } from 'lucide-react'

interface ProjectData {
  projectName: string
  submittedAt: string
  status: string
  description: string
  slackChannel: string
  teamMembers: string[]
  videoFile: string
  attachments: string[]
  submissionId: string
}

interface SubmittedProjectPageData {
  navigation: {
    backButton: string
  }
  statusIndicator: {
    submitted: string
  }
  successMessage: {
    title: string
    subtitle: string
  }
  submissionDetails: {
    title: string
    submissionIdLabel: string
    submittedLabel: string
  }
  sections: {
    projectName: string
    description: string
    slackChannel: string
    uploadedFiles: string
    demoVideo: string
    teamMembers: string
  }
  actionButtons: {
    viewDemo: string
    sourceCode: string
    viewAllProjects: string
    watchDemo: string
  }
  nextSteps: {
    title: string
    steps: string[]
  }
}

export default function SubmittedProjectPage() {
  // Static data dictionary - backend team can replace with API calls
  const submittedProjectPageData: SubmittedProjectPageData = {
    navigation: {
      backButton: "Back to Home"
    },
    statusIndicator: {
      submitted: "Submitted Successfully"
    },
    successMessage: {
      title: "Project Submitted Successfully!",
      subtitle: "Your project has been submitted and is now under review. You'll receive updates on the status of your submission via email and Slack notifications."
    },
    submissionDetails: {
      title: "Submission Details",
      submissionIdLabel: "Submission ID:",
      submittedLabel: "Submitted:"
    },
    sections: {
      projectName: "Project Name",
      description: "Description",
      slackChannel: "Slack Channel",
      uploadedFiles: "Uploaded Files",
      demoVideo: "Demo Video",
      teamMembers: "Team Members"
    },
    actionButtons: {
      viewDemo: "View Demo",
      sourceCode: "Source Code",
      viewAllProjects: "View All Projects",
      watchDemo: "Watch Demo"
    },
    nextSteps: {
      title: "What's Next?",
      steps: [
        "Your project is now in the review queue and will be evaluated by our panel of judges",
        "You'll receive email updates about the review process and any additional requirements",
        "Winners will be announced on [Date] via email and Slack notifications",
        "Keep an eye on the {slackChannel} channel for updates and discussions"
      ]
    }
  }

  // Sample project data - in a real app this would come from props or API
  const projectData: ProjectData = {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">

      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={goBackToHome}
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors group font-['Inter']"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{submittedProjectPageData.navigation.backButton}</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-white/70 font-['Inter']">{submittedProjectPageData.statusIndicator.submitted}</span>
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
            <h1 className="text-3xl font-['Space_Grotesk'] font-bold">{submittedProjectPageData.successMessage.title}</h1>
            <p className="text-white/60 max-w-2xl mx-auto font-['Inter']">
              {submittedProjectPageData.successMessage.subtitle}
            </p>
          </div>

          {/* Submission Details Card */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold">{submittedProjectPageData.submissionDetails.title}</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-500 font-['Space_Mono'] font-medium">{projectData.status}</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/60 font-['Inter']">{submittedProjectPageData.submissionDetails.submissionIdLabel}</span>
                <p className="font-['Space_Mono'] text-[#00CE93]">{projectData.submissionId}</p>
              </div>
              <div>
                <span className="text-white/60 font-['Inter']">{submittedProjectPageData.submissionDetails.submittedLabel}</span>
                <p className="font-['Inter']">{formatDate(projectData.submittedAt)}</p>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            
            {/* Project Name */}
            <div className="space-y-2">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold">{submittedProjectPageData.sections.projectName}</h2>
              <p className="text-lg text-white/90 font-['Inter']">{projectData.projectName}</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold">{submittedProjectPageData.sections.description}</h2>
              <p className="text-white/80 leading-relaxed font-['Inter']">{projectData.description}</p>
            </div>

            {/* Slack Channel */}
            <div className="space-y-2">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold">{submittedProjectPageData.sections.slackChannel}</h2>
              <p className="text-[#00CE93] font-['Space_Mono']">{projectData.slackChannel}</p>
            </div>

            {/* Files and Attachments */}
            <div className="space-y-3">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold">{submittedProjectPageData.sections.uploadedFiles}</h2>
              <div className="space-y-2">
                {projectData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                    <span className="text-sm text-white/80 font-['Inter']">{file}</span>
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
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>{submittedProjectPageData.sections.demoVideo}</span>
              </h2>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="w-12 h-12 mx-auto mb-2 text-[#00CE93]" />
                    <p className="text-sm text-white/70 font-['Inter']">{projectData.videoFile}</p>
                  </div>
                </div>
                
                <button className="block w-full text-center px-4 py-2 bg-[#00CE93] hover:bg-[#00CE93]/90 text-black font-['Space_Mono'] font-medium rounded-lg transition-colors text-sm">
                  {submittedProjectPageData.actionButtons.watchDemo}
                </button>
              </div>
            </div>

            {/* Team Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-['Space_Grotesk'] font-semibold flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{submittedProjectPageData.sections.teamMembers}</span>
              </h2>
              
              <div className="space-y-3">
                {projectData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3 border border-white/10">
                    <div className="w-8 h-8 bg-[#00CE93] rounded-full flex items-center justify-center text-black text-sm font-['Space_Mono'] font-bold">
                      {index + 1}
                    </div>
                    <span className="text-white/90 font-['Inter']">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-6 py-4 transition-colors font-['Space_Mono']"
            >
              <Play className="w-5 h-5" />
              <span>{submittedProjectPageData.actionButtons.viewDemo}</span>
            </button>
            
            <button
              type="button" 
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-6 py-4 transition-colors font-['Space_Mono']"
            >
              <Code className="w-5 h-5" />
              <span>{submittedProjectPageData.actionButtons.sourceCode}</span>
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center space-x-2 bg-[#00CE93] hover:bg-[#00CE93]/90 text-black font-['Space_Mono'] font-semibold rounded-lg px-6 py-4 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span>{submittedProjectPageData.actionButtons.viewAllProjects}</span>
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-[#00CE93]/10 to-blue-500/10 border border-[#00CE93]/20 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-['Space_Grotesk'] font-semibold flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#00CE93]" />
              <span>{submittedProjectPageData.nextSteps.title}</span>
            </h3>
            <div className="space-y-2 text-sm text-white/80">
              {submittedProjectPageData.nextSteps.steps.map((step, index) => (
                <p key={index} className="font-['Inter']">
                  • {step.replace('{slackChannel}', projectData.slackChannel)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}