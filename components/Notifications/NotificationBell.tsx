'use client'

import React from 'react'
import { Bell } from 'lucide-react'

interface NotificationBellProps {
  hasNotifications?: boolean
  onToggle?: () => void
}

export function NotificationBell({ hasNotifications, onToggle }: NotificationBellProps) {
  return (
    <button
      onClick={onToggle}
      className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white transition-colors hover:bg-white/10"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
      {hasNotifications && (
        <span className="absolute top-2 right-2 h-3.5 w-3.5 rounded-full bg-[#FF6B6B]" />
      )}
    </button>
  )
}
