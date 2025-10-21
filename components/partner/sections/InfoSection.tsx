import React from 'react'
import { partnerColors } from '@/components/partner/designSystem'
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
    <div
      className="rounded-2xl p-6 mb-4 border"
      style={{ backgroundColor: partnerColors.surface, borderColor: partnerColors.border }}
    >
      <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index}>
            {item.url ? (
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: partnerColors.background }}
              >
                <a
                  href={item.url}
                  className="text-white/60 text-sm hover:text-white transition-colors flex items-center justify-between group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[80%]">
                    {item.url}
                  </span>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 ml-3 opacity-60 group-hover:opacity-100" />
                </a>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <span className="text-white/70 text-sm">{item.label}</span>
                  {item.value && (
                    <div className="text-white/40 text-xs mt-1 break-all">
                      {item.value}
                    </div>
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
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
