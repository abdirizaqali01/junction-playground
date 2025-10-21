import React from 'react'

interface PageHeaderProps {
  title: string
  timer?: string
}

export default function PageHeader({ title, timer = 'T 03:46:09' }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0D] py-4 flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-white">
        {title}
      </h1>
      <div className="text-xs text-white/50">{timer}</div>
    </header>
  )
}