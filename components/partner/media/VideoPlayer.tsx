"use client"

import React from 'react'

interface VideoPlayerProps {
  videoUrl?: string
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  if (!videoUrl) return null
  
  return (
    <div className="bg-[#464646]/50 rounded-xl overflow-hidden aspect-video flex items-center justify-center mb-6">
      <button className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center hover:bg-white/10 transition-colors group">
        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1 group-hover:border-l-emerald-400"></div>
      </button>
    </div>
  )
}
