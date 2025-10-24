import React from 'react'
import * as style from '@/styles/design-system'

interface SortButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export default function SortButton({ label, isActive, onClick }: SortButtonProps) {
  const activeStyle = isActive
    ? {
        backgroundColor: style.colors.secondary.opacity20,
        borderColor: style.colors.secondary.opacity100,
        color: 'white',
      }
    : undefined

  return (
    <button
      onClick={onClick}
      style={activeStyle}
      className={`px-3 lg:px-4 py-2 lg:py-3 text-xs ${style.border.radius.middle} border transition-all duration-200 ${
        isActive ? 'text-white' : 'bg-transparent border-white/40 text-white/60 hover:bg-white/10 hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}