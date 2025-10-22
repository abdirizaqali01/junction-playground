import { colors, partnerAccents, partnerSurfaces, partnerText } from '@/styles/design-system'

interface ProjectRatingProps {
  rating?: number
}

export default function ProjectRating({ rating }: ProjectRatingProps) {
  const hasRating = rating !== undefined && rating !== null

  const style = hasRating
    ? {
        backgroundColor: partnerAccents.solid,
        color: colors.white.opacity100,
      }
    : {
        backgroundColor: partnerSurfaces.muted,
        color: partnerText.secondary,
      }

  return (
    <div
      className="w-[55px] h-[55px] rounded-lg flex items-center justify-center text-large font-bold"
      style={style}
    >
      {hasRating ? rating?.toFixed(1) : '—'}
    </div>
  )
}
