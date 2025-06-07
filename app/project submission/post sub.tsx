'use client'

import { useState } from 'react'
import { Footer } from '@/components/footer'
import { ArrowLeft, Play } from 'lucide-react'


export default function SubmittedProjectsPage() {
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

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Project Name Header with Video Thumbnail Background */}
        <div className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden mb-8" style={{height: '200px'}}>
          {/* Video thumbnail placeholder - will be replaced with actual thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-700/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="relative z-10 flex items-center space-x-3 h-full px-8">
            <h1 className="text-3xl font-bold text-white">Project name</h1>
            <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">ACTIVE</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            Description of company AI vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
          </p>
          <p className="text-white/80 text-sm leading-relaxed">
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          </p>
        </div>

        {/* Slack Challenge Participation */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-white font-semibold mb-2">Slack challenge participation</h2>
          <p className="text-white/60 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Files and Attachments */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-white font-semibold mb-2">Files and attachments</h2>
          <p className="text-white/60 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Video Pitch */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-white font-semibold mb-2">Video pitch</h2>
          <p className="text-white/60 text-sm underline">
            Link to video pitch
          </p>
        </div>

        {/* Video and Team Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          
          {/* Video Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-white font-semibold mb-4">Video</h2>
            <div className="aspect-video bg-gray-700/50 rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-white/60" />
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-white font-semibold mb-4">Team</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90 text-sm">John Smith</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90 text-sm">John Smith</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90 text-sm">John Smith</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Three Cards */}
        <div className="grid grid-cols-3 gap-8">
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">Demo</h3>
            <p className="text-white/60 text-sm">Link to demo</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">Source code</h3>
            <p className="text-white/60 text-sm">Link to source code</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">Challenge</h3>
            <p className="text-white/60 text-sm">Name of challenge</p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}