'use client'

import { Footer } from '@/components/footer'
import { ArrowLeft, Play } from 'lucide-react'

interface TeamMember {
  id: number
  name: string
}

interface SubmittedProjectData {
  projectInfo: {
    name: string
    status: string
    description: string[]
  }
  autoSaveStatus: string
  sections: {
    slackChallenge: {
      title: string
      content: string
    }
    filesAttachments: {
      title: string
      content: string
    }
    videoPitch: {
      title: string
      linkText: string
    }
    video: {
      title: string
    }
    team: {
      title: string
      members: TeamMember[]
    }
    demo: {
      title: string
      content: string
    }
    sourceCode: {
      title: string
      content: string
    }
    challenge: {
      title: string
      content: string
    }
  }
  navigation: {
    backButton: string
  }
}

export default function SubmittedProjectsPage() {
  // Static data dictionary - backend team can replace with API calls
  const submittedProjectData: SubmittedProjectData = {
    projectInfo: {
      name: "Project name",
      status: "ACTIVE",
      description: [
        "Description of company AI vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      ]
    },
    autoSaveStatus: "Auto-saved",
    sections: {
      slackChallenge: {
        title: "Slack challenge participation",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      filesAttachments: {
        title: "Files and attachments",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      videoPitch: {
        title: "Video pitch",
        linkText: "Link to video pitch"
      },
      video: {
        title: "Video"
      },
      team: {
        title: "Team",
        members: [
          { id: 1, name: "John Smith" },
          { id: 2, name: "John Smith" },
          { id: 3, name: "John Smith" }
        ]
      },
      demo: {
        title: "Demo",
        content: "Link to demo"
      },
      sourceCode: {
        title: "Source code",
        content: "Link to source code"
      },
      challenge: {
        title: "Challenge",
        content: "Name of challenge"
      }
    },
    navigation: {
      backButton: "Back"
    }
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
            <span>{submittedProjectData.navigation.backButton}</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-white/70 font-['Inter']">{submittedProjectData.autoSaveStatus}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Project Name Header with Video Thumbnail Background */}
        <div className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-8" style={{height: '200px'}}>
          {/* Video thumbnail placeholder - will be replaced with actual thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-700/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="relative z-10 flex items-center space-x-3 h-full px-8">
            <h1 className="text-3xl font-['Space_Grotesk'] font-bold text-white">{submittedProjectData.projectInfo.name}</h1>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-['Space_Mono'] rounded-full border border-white/30">{submittedProjectData.projectInfo.status}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          {submittedProjectData.projectInfo.description.map((paragraph, index) => (
            <p key={index} className="text-white/80 text-sm leading-relaxed mb-4 font-['Inter']">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Slack Challenge Participation */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-white font-['Space_Grotesk'] font-semibold mb-2">{submittedProjectData.sections.slackChallenge.title}</h2>
          <p className="text-white/60 text-sm font-['Inter']">
            {submittedProjectData.sections.slackChallenge.content}
          </p>
        </div>

        {/* Files and Attachments */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-white font-['Space_Grotesk'] font-semibold mb-2">{submittedProjectData.sections.filesAttachments.title}</h2>
          <p className="text-white/60 text-sm font-['Inter']">
            {submittedProjectData.sections.filesAttachments.content}
          </p>
        </div>

        {/* Video Pitch */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-white font-['Space_Grotesk'] font-semibold mb-2">{submittedProjectData.sections.videoPitch.title}</h2>
          <p className="text-white/60 text-sm font-['Inter'] underline">
            {submittedProjectData.sections.videoPitch.linkText}
          </p>
        </div>

        {/* Video and Team Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          
          {/* Video Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-white font-['Space_Grotesk'] font-semibold mb-4">{submittedProjectData.sections.video.title}</h2>
            <div className="aspect-video bg-gray-700/50 rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-white/60" />
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-white font-['Space_Grotesk'] font-semibold mb-4">{submittedProjectData.sections.team.title}</h2>
            <div className="space-y-3">
              {submittedProjectData.sections.team.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white/90 text-sm font-['Inter']">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Three Cards */}
        <div className="grid grid-cols-3 gap-8">
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-['Space_Grotesk'] font-semibold mb-2">{submittedProjectData.sections.demo.title}</h3>
            <p className="text-white/60 text-sm font-['Inter']">{submittedProjectData.sections.demo.content}</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-['Space_Grotesk'] font-semibold mb-2">{submittedProjectData.sections.sourceCode.title}</h3>
            <p className="text-white/60 text-sm font-['Inter']">{submittedProjectData.sections.sourceCode.content}</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-['Space_Grotesk'] font-semibold mb-2">{submittedProjectData.sections.challenge.title}</h3>
            <p className="text-white/60 text-sm font-['Inter']">{submittedProjectData.sections.challenge.content}</p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}