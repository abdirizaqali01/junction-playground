'use client'

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Notification = {
  id: string
  title: string
  subtitle?: string
  timestamp: string
  actionLabel?: string
  onAction?: () => void
  read?: boolean
}

type NotificationContextValue = {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Notification) => void
  markAllAsRead: () => void
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => [notification, ...prev])
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
  }, [])

  const unreadCount = notifications.filter((item) => !item.read).length

  const value: NotificationContextValue = {
    notifications,
    unreadCount,
    addNotification,
    markAllAsRead,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}
