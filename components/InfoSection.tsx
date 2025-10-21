import React from 'react'
import { ExternalLink } from 'lucide-react'

type InfoItem = {
  label: string
  value?: string
  url?: string
  action?: {
    label: string
    onClick: () => void
  }
}

interface InfoSectionProps {
  title: string
  items: InfoItem[]
  variant?: 'default' | 'compact'
}

export function InfoSection({ title, items, variant = 'default' }: InfoSectionProps) {
  if (items.length === 0) return null
  
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 mb-4">
      <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div className="flex-1 min-w-0">
              {item.url ? (
                <a
                  href={item.url}
                  className="text-white/50 text-sm hover:text-[#55D186] transition-colors flex items-center gap-2 break-all group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex-1">{item.label}</span>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-70 group-hover:opacity-100" />
                </a>
              ) : (
                <span className="text-white/70 text-sm">{item.label}</span>
              )}
              {item.value && (
                <div className="text-white/40 text-xs mt-1 break-all">{item.value}</div>
              )}
            </div>
            {item.action && (
              <button
                onClick={item.action.onClick}
                className="text-white/50 text-xs hover:text-[#55D186] transition-colors flex-shrink-0 ml-3"
              >
                {item.action.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}