'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { partnerBorders, partnerSurfaces, partnerText } from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'

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
    <div
      className="flex items-center gap-2 text-sm mb-4"
      style={{ color: partnerText.secondary }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const isClickable = !isLast && onItemClick
        const hasDropdown = isLast && dropdownItems && dropdownItems.length > 0
        
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span style={{ color: partnerText.muted }}>/</span>
            )}
            {hasDropdown ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 transition-colors hover:text-[var(--breadcrumb-hover)]"
                  style={withVars(
                    { color: partnerText.primary },
                    { '--breadcrumb-hover': partnerText.secondary }
                  )}
                >
                  {item}
                  <ChevronDown className="w-4 h-4" style={{ color: partnerText.secondary }} />
                </button>
                
                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 border rounded-lg shadow-xl overflow-hidden z-50"
                    style={{
                      backgroundColor: partnerSurfaces.raised,
                      borderColor: partnerBorders.subtle,
                    }}
                  >
                    <div className="py-1 max-h-80 overflow-y-auto">
                      {dropdownItems.map((dropdownItem) => (
                        <button
                          key={dropdownItem.id}
                          onClick={() => {
                            onDropdownSelect?.(dropdownItem.id)
                            setIsDropdownOpen(false)
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:text-[var(--dropdown-hover)]"
                          style={withVars(
                            {
                              color:
                                dropdownItem.id === currentItemId
                                  ? partnerText.primary
                                  : partnerText.soft,
                            },
                            { '--dropdown-hover': partnerText.primary }
                          )}
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
                className="transition-colors hover:text-[var(--breadcrumb-muted-hover)]"
                style={withVars(
                  { color: partnerText.soft },
                  { '--breadcrumb-muted-hover': partnerText.secondary }
                )}
              >
                {item}
              </button>
            ) : (
              <span
                style={{ color: isLast ? partnerText.primary : partnerText.soft }}
              >
                {item}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
