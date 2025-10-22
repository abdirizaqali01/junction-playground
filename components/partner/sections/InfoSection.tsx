import React from 'react'
import { partnerAccents, partnerBorders, partnerSurfaces, partnerText } from '@/styles/design-system'
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
      style={{
        backgroundColor: partnerSurfaces.raised,
        borderColor: partnerBorders.default,
        color: partnerText.primary,
      }}
    >
      <h2 className="text-2xl font-semibold mb-4" style={{ color: partnerText.primary }}>
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index}>
            {item.url ? (
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: partnerSurfaces.sunken }}
              >
                <a
                  href={item.url}
                  className="text-sm transition-colors flex items-center justify-between group hover:text-[var(--link-hover)]"
                  style={{
                    color: partnerText.secondary,
                    ['--link-hover' as '--link-hover']: partnerText.primary,
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[80%]">
                    {item.url}
                  </span>
                  <ExternalLink
                    className="w-4 h-4 flex-shrink-0 ml-3 transition-opacity group-hover:opacity-100"
                    style={{ color: partnerText.secondary, opacity: 0.6 }}
                  />
                </a>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <span className="text-sm" style={{ color: partnerText.secondary }}>
                    {item.label}
                  </span>
                  {item.value && (
                    <div
                      className="text-xs mt-1 break-all"
                      style={{ color: partnerText.muted }}
                    >
                      {item.value}
                    </div>
                  )}
                </div>
                {item.action && (
                  <button
                    onClick={item.action.onClick}
                    className="text-xs transition-colors flex-shrink-0 ml-3 hover:text-[var(--action-hover)]"
                    style={{
                      color: partnerText.soft,
                      ['--action-hover' as '--action-hover']: partnerAccents.hover,
                    }}
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
