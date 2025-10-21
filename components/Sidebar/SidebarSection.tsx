interface SidebarSectionProps {
  title: string
  children: React.ReactNode
  collapsed?: boolean
}

export default function SidebarSection({ title, children, collapsed = false }: SidebarSectionProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-2 py-2.5">
      {!collapsed && (
        <h3 className="text-[11px] font-semibold text-white ml-[5px] mb-2 uppercase tracking-wide">
          {title}
        </h3>
      )}
      <div className={`flex flex-col space-y-1 ${collapsed ? 'items-center' : ''}`}>{children}</div>
    </div>
  )
}
