import React from 'react'
import { Search } from 'lucide-react'
import * as style from '@/styles/design-system'

interface SearchBarProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ 
  placeholder = 'Search submissions...', 
  value, 
  onChange 
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${style.border.radius.middle} w-full px-3 py-2 lg:py-3 pr-9 text-xs bg-white/15 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-[0.5px] focus:border-white/30 focus:ring-1 focus:ring-white/10 focus:ring-inset transition-all`}
      />
      <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
    </div>
  )
}