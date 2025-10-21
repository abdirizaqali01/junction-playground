'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface BreadcrumbProps {
  items: string[]
  onItemClick?: (index: number) => void
  dropdownItems?: Array<{ id: string; title: string }>
  onDropdownSelect?: (id: string) => void
  currentItemId?: string
}

export function Breadcrumb({ 
  items, 
  onItemClick, 
  dropdownItems,
  onDropdownSelect,
  currentItemId 
}: BreadcrumbProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const isClickable = !isLast && onItemClick
        const hasDropdown = isLast && dropdownItems && dropdownItems.length > 0
        
        return (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-white/30">/</span>}
            {hasDropdown ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 text-white hover:text-white/80 transition-colors"
                >
                  {item}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="py-1 max-h-80 overflow-y-auto">
                      {dropdownItems.map((dropdownItem) => (
                        <button
                          key={dropdownItem.id}
                          onClick={() => {
                            onDropdownSelect?.(dropdownItem.id)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            dropdownItem.id === currentItemId
                              ? 'text-white'
                              : 'text-white/50 hover:text-white/80'
                          }`}
                        >
                          {dropdownItem.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : isClickable ? (
              <button
                onClick={() => onItemClick(index)}
                className="text-white/50 hover:text-white/70 transition-colors"
              >
                {item}
              </button>
            ) : (
              <span className={isLast ? "text-white" : "text-white/50"}>
                {item}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
