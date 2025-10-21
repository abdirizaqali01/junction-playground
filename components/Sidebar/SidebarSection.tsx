interface SidebarSectionProps {
  title: string
  children: React.ReactNode
}

export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-2 py-2.5">
      <h3 className="text-[11px] font-semibold text-white ml-[5px] mb-2">{title}</h3>
      <div className="flex flex-col space-y-1">{children}</div>
    </div>
  )
}