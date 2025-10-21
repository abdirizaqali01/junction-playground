interface ProjectRatingProps {
  rating?: number
}

export default function ProjectRating({ rating }: ProjectRatingProps) {
  const hasRating = rating !== undefined && rating !== null

  return (
    <div
      className={`w-[55px] h-[55px] rounded-lg flex items-center justify-center text-large font-bold ${
        hasRating
          ? 'bg-[#55D186] text-white'
          : 'bg-white/10 text-white/60'
      }`}
    >
      {hasRating ? rating?.toFixed(1) : '—'}
    </div>
  )
}