'use client'

import React, { useMemo, useState } from 'react'
import { Breadcrumb } from './Breadcrumb'
import { NotificationBell } from '@/components/Notifications/NotificationBell'
import { NotificationDropdown, type NotificationItem } from '@/components/Notifications/NotificationDropdown'
import { useNotifications } from '@/components/Notifications/NotificationContext'
import { partnerAccents, partnerColors, partnerText } from '@/styles/design-system'
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
      className={`sticky top-0 z-40 w-full mb-8`}
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
        <h1
          className="text-[2rem] font-semibold"
          style={{ color: partnerText.primary }}
        >
          {title}
        </h1>
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
