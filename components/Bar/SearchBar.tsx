import React from 'react'
import { Search } from 'lucide-react'

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
        className="w-full px-3 py-1.5 pr-9 text-xs rounded-lg bg-white/15 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all"
      />
      <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
    </div>
  )
}