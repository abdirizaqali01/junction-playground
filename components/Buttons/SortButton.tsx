import React from 'react'

interface SortButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export default function SortButton({ label, isActive, onClick }: SortButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs rounded-lg border transition-all duration-200 ${
        isActive
          ? 'bg-[#55D186]/20 border-[#55D186] text-white' // soft green tint background, white text
          : 'bg-transparent border-white/40 text-white/60 hover:bg-white/10 hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}