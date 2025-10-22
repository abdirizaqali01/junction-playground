"use client"

import React, { type CSSProperties } from 'react'
import { colors, partnerAccents, partnerSurfaces } from '@/styles/design-system'

interface VideoPlayerProps {
  videoUrl?: string
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  if (!videoUrl) return null
  
  const buttonStyle: CSSProperties & Record<'--hover-bg' | '--icon-hover', string> = {
    backgroundColor: 'transparent',
    borderColor: colors.white.opacity80,
    '--hover-bg': partnerSurfaces.muted,
    '--icon-hover': partnerAccents.hover,
  }

  return (
    <div
      className="rounded-xl overflow-hidden aspect-video flex items-center justify-center mb-6"
      style={{ backgroundColor: partnerSurfaces.placeholder }}
    >
      <button
        className="w-16 h-16 rounded-full border-2 flex items-center justify-center transition-colors group hover:bg-[var(--hover-bg)]"
        style={buttonStyle}
      >
        <div
          className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-b-8 border-b-transparent ml-1 transition-colors group-hover:border-l-[var(--icon-hover)]"
          style={{ borderLeftColor: colors.white.opacity100 }}
        ></div>
      </button>
    </div>
  )
}
