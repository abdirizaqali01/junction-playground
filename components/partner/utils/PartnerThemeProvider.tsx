'use client'

import React, { useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { partnerCssVars } from '@/styles/design-system'

interface Props {
  /** If true, apply vars to document.documentElement; otherwise apply to wrapper div */
  applyToRoot?: boolean
}

export default function PartnerThemeProvider({ children, applyToRoot = false }: PropsWithChildren<Props>) {
  useEffect(() => {
    if (!applyToRoot) return

    const root = document.documentElement
    const entries = Object.entries(partnerCssVars)
    entries.forEach(([k, v]) => root.style.setProperty(k, v))

    return () => entries.forEach(([k]) => root.style.removeProperty(k))
  }, [applyToRoot])

  if (applyToRoot) return <>{children}</>

  return <div style={partnerCssVars as React.CSSProperties}>{children}</div>
}
