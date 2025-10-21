interface ProjectThumbnailProps {
  imageUrl: string
}

export default function ProjectThumbnail({ imageUrl }: ProjectThumbnailProps) {
  return (
    <div className="w-[245px] aspect-[245/179] shrink-0 bg-white/5 border-r border-white/10 overflow-hidden">
      <img
        src={imageUrl}
        alt="Project preview"
        className="object-cover w-full h-full"
      />
    </div>
  )
}