import { partnerBorders, partnerSurfaces } from '@/styles/design-system'

interface ProjectThumbnailProps {
  imageUrl: string
}

export default function ProjectThumbnail({ imageUrl }: ProjectThumbnailProps) {
  return (
    <div
      className="w-[245px] aspect-[245/179] shrink-0 border-r overflow-hidden"
      style={{
        backgroundColor: partnerSurfaces.muted,
        borderColor: partnerBorders.subtle,
      }}
    >
      <img
        src={imageUrl}
        alt="Project preview"
        className="object-cover w-full h-full"
      />
    </div>
  )
}
