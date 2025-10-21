import React from 'react'

interface BreadcrumbProps {
  items: string[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-white/30">/</span>}
          <span className={index === items.length - 1 ? "text-white" : "text-white/50"}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}