'use client'

import React, { useMemo, useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Breadcrumb } from './Breadcrumb'
import { NotificationBell } from '@/components/Notifications/NotificationBell'
import { NotificationDropdown, type NotificationItem } from '@/components/Notifications/NotificationDropdown'
import { useNotifications } from '@/components/Notifications/NotificationContext'
import { partnerAccents, partnerColors, partnerText, partnerSurfaces, partnerBorders } from '@/styles/design-system'
import { withVars } from '@/components/partner/utils/style'
import * as style from '@/styles/design-system'

interface PageHeaderProps {
  title: string
  timer?: string
  breadcrumbItems?: string[]
  status?: string
  onBreadcrumbClick?: (index: number) => void
  breadcrumbDropdownItems?: Array<{ id: string; title: string }>
  onBreadcrumbDropdownSelect?: (id: string) => void
  currentItemId?: string
  useDropdownAsTitle?: boolean
  smallTitle?: boolean
}

export default function PageHeader({ 
  title, 
  timer = 'T 03:46:09',
  breadcrumbItems,
  status,
  onBreadcrumbClick,
  breadcrumbDropdownItems,
  onBreadcrumbDropdownSelect,
  currentItemId,
  useDropdownAsTitle = false,
  smallTitle = false
}: PageHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { notifications, unreadCount, markAllAsRead } = useNotifications()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const notificationItems = useMemo<NotificationItem[]>(
    () =>
      notifications.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        timestamp: item.timestamp,
        action: item.actionLabel
          ? {
              label: item.actionLabel,
              onClick: () => item.onAction?.(),
            }
          : undefined,
      })),
    [notifications]
  )

  return (
    <header
      className={`sticky top-0 z-40 w-full mb-8`}
      style={{ backgroundColor: partnerColors.background }}
    >
      {breadcrumbItems && !useDropdownAsTitle && (
        <Breadcrumb 
          items={breadcrumbItems} 
          onItemClick={onBreadcrumbClick}
          dropdownItems={breadcrumbDropdownItems}
          onDropdownSelect={onBreadcrumbDropdownSelect}
          currentItemId={currentItemId}
        />
      )}
      
      {breadcrumbItems && useDropdownAsTitle && (
        <div className="mb-4">
          <Breadcrumb 
            items={breadcrumbItems.slice(0, -1)} 
            onItemClick={onBreadcrumbClick}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        {useDropdownAsTitle && breadcrumbDropdownItems ? (
          <div className="flex items-center gap-2">
            <h1
              className={smallTitle ? "text-xl font-semibold" : "text-[1.4rem] font-semibold"}
              style={{ color: partnerText.primary }}
            >
              {title}
            </h1>
            <span 
              className={smallTitle ? "text-xl font-semibold" : "text-[1.4rem] font-semibold"}
              style={{ color: partnerText.muted }}
            >
              /
            </span>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 font-semibold transition-colors hover:text-[var(--title-dropdown-hover)] ${smallTitle ? "text-xl" : "text-[1.4rem]"}`}
                style={withVars(
                  { color: partnerText.primary },
                  { '--title-dropdown-hover': partnerText.secondary }
                )}
              >
                {breadcrumbDropdownItems.find(item => item.id === currentItemId)?.title || breadcrumbItems?.[breadcrumbItems.length - 1]}
                <ChevronDown className={`${smallTitle ? "w-5 h-5" : "w-6 h-6"}`} style={{ color: partnerText.secondary }} />
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
                    {breadcrumbDropdownItems.map((dropdownItem) => (
                      <button
                        key={dropdownItem.id}
                        onClick={() => {
                          onBreadcrumbDropdownSelect?.(dropdownItem.id)
                          setIsDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-2.5 text-[1rem] transition-colors hover:opacity-80"
                        style={{
                          color:
                            dropdownItem.id === currentItemId
                              ? partnerText.primary
                              : partnerText.soft,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = partnerText.primary
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = dropdownItem.id === currentItemId
                            ? partnerText.primary
                            : partnerText.soft
                        }}
                      >
                        {dropdownItem.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <h1
            className={smallTitle ? "text-xl font-semibold" : "text-[2rem] font-semibold"}
            style={{ color: partnerText.primary }}
          >
            {title}
          </h1>
        )}
        <div className="flex items-center gap-4">
          {status && (
            <div
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: partnerAccents.tint,
                color: partnerAccents.solid,
              }}
            >
              Status: {status}
            </div>
          )}
          <div className="text-xs" style={{ color: partnerText.soft }}>
            {timer}
          </div>
          <div className="relative">
            <NotificationBell
              hasNotifications={unreadCount > 0}
              onToggle={() => {
                setShowNotifications((prev) => {
                  const next = !prev
                  if (!next) {
                    markAllAsRead()
                  }
                  return next
                })
              }}
            />
            {showNotifications && (
              <NotificationDropdown items={notificationItems} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
