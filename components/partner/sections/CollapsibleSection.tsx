"use client"

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { partnerBorders, partnerSurfaces, partnerText } from '@/styles/design-system'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div
      className="border rounded-xl overflow-hidden mb-3"
      style={{ borderColor: partnerBorders.subtle }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between transition-colors hover:bg-[var(--header-hover)]"
        style={{
          backgroundColor: partnerSurfaces.raised,
          ['--header-hover' as '--header-hover']: partnerSurfaces.raisedHover,
        }}
      >
        <span
          className="font-medium"
          style={{ color: partnerText.primary }}
        >
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: partnerText.secondary }}
        />
      </button>
      {isOpen && (
        <div
          className="px-5 py-4 text-sm leading-relaxed"
          style={{
            backgroundColor: partnerSurfaces.sunken,
            color: partnerText.secondary,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
