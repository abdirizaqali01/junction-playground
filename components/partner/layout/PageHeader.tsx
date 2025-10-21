'use client'

import React, { useMemo, useState } from 'react'
import { Breadcrumb } from './Breadcrumb'
import { NotificationBell } from '@/components/Notifications/NotificationBell'
import { NotificationDropdown, type NotificationItem } from '@/components/Notifications/NotificationDropdown'
import { useNotifications } from '@/components/Notifications/NotificationContext'
import { partnerColors } from '@/components/partner/designSystem'

interface PageHeaderProps {
  title: string
  timer?: string
  breadcrumbItems?: string[]
  status?: string
  onBreadcrumbClick?: (index: number) => void
  breadcrumbDropdownItems?: Array<{ id: string; title: string }>
  onBreadcrumbDropdownSelect?: (id: string) => void
  currentItemId?: string
}

export default function PageHeader({ 
  title, 
  timer = 'T 03:46:09',
  breadcrumbItems,
  status,
  onBreadcrumbClick,
  breadcrumbDropdownItems,
  onBreadcrumbDropdownSelect,
  currentItemId
}: PageHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const { notifications, unreadCount, markAllAsRead } = useNotifications()

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
      className="sticky top-0 z-40 py-4 mb-6"
      style={{ backgroundColor: partnerColors.background }}
    >
      {breadcrumbItems && (
        <Breadcrumb 
          items={breadcrumbItems} 
          onItemClick={onBreadcrumbClick}
          dropdownItems={breadcrumbDropdownItems}
          onDropdownSelect={onBreadcrumbDropdownSelect}
          currentItemId={currentItemId}
        />
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">
          {title}
        </h1>
        <div className="flex items-center gap-4">
          {status && (
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
              Status: {status}
            </div>
          )}
          <div className="text-xs text-white/50">{timer}</div>
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
