import React from 'react'
import { ExternalLink } from 'lucide-react'

interface LinkSectionProps {
  title: string
  url: string
}

export function LinkSection({ title, url }: LinkSectionProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-4 mb-3">
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <a 
        href={url} 
        className="text-white/50 text-sm hover:text-emerald-400 transition-colors flex items-center gap-2 break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
        <ExternalLink className="w-3 h-3 flex-shrink-0" />
      </a>
    </div>
  )
}