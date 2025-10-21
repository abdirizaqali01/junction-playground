'use client'

import React, { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'

export type SidebarContextValue = {
  collapsed: boolean
  toggle: () => void
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.classList.add('sidebar-expanded')
    document.body.classList.remove('sidebar-collapsed')

    return () => {
      document.body.classList.remove('sidebar-expanded')
      document.body.classList.remove('sidebar-collapsed')
    }
  }, [])

  const value = useMemo<SidebarContextValue>(() => ({
    collapsed: false,
    toggle: () => {},
    setCollapsed: () => {},
  }), [])

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
