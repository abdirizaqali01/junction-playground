interface StatCardProps {
  label: string
  value: number
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="relative w-full max-w-[238px] aspect-[238/99] border border-[#55D186] rounded-lg p-4 sm:p-[18px] bg-white/10">
      {/* Inner white stroke - adjusted inset */}
      <div className="absolute inset-[2px] border border-white/10 rounded-lg pointer-events-none" />
      
      <div className="relative h-full flex flex-col justify-center">
        <h3 className="text-[11px] text-white/60 mb-1">{label}</h3>
        <p className="text-[27px] font-bold text-[#55D186]">{value}</p>
      </div>
    </div>
  )
}