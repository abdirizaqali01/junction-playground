import React from 'react'
import { ExternalLink } from 'lucide-react'

interface File {
  name: string
  url: string
}

interface FilesSectionProps {
  files: File[]
}

export function FilesSection({ files }: FilesSectionProps) {
  if (files.length === 0) return null
  
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-4 mb-3">
      <h3 className="text-white font-medium mb-3">Files</h3>
      <div className="space-y-2">
        {files.map((file, index) => (
          <a
            key={index}
            href={file.url}
            className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-white/70 text-sm">{file.name}</span>
            <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  )
}