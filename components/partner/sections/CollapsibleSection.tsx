"use client"

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 bg-[#1A1A1A] flex items-center justify-between hover:bg-[#202020] transition-colors"
      >
        <span className="text-white font-medium">{title}</span>
        <ChevronDown 
          className={`w-5 h-5 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-5 py-4 bg-[#151515] text-white/70 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}
