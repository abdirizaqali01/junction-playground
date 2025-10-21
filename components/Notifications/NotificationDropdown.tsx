'use client'

import React from 'react'

type NotificationAction = {
  label: string
  onClick?: () => void
}

export interface NotificationItem {
  id: string
  title: string
  subtitle?: string
  timestamp: string
  action?: NotificationAction
}

interface NotificationDropdownProps {
  items: NotificationItem[]
}

export function NotificationDropdown({ items }: NotificationDropdownProps) {
  return (
    <div className="absolute right-0 mt-4 w-[320px] rounded-2xl border border-white/10 bg-[#111111] p-3 shadow-xl">
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-6 text-center text-sm text-white/50">
            No new notifications
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="text-[15px] font-semibold text-white/90 leading-snug">
                {item.title}
              </div>
              {item.subtitle && (
                <div className="mt-1 text-[12px] text-white/45 leading-snug">
                  {item.subtitle}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between text-[11px] text-white/35">
                <span>{item.timestamp}</span>
                {item.action && (
                  <button
                    onClick={item.action.onClick}
                    className="text-[#55D186] font-medium hover:text-[#66F1A0]"
                  >
                    {item.action.label}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
