interface MiniProjectCardProps {
    title: string
    team: string
    description: string
    imageUrl: string
    rating?: number
    onReview?: () => void
  }
  
  export default function MiniProjectCard({
    title,
    team,
    description,
    imageUrl,
    rating,
    onReview,
  }: MiniProjectCardProps) {
    return (
      <div className="min-w-[440px] bg-[#1B1B1B] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
        <div className="flex gap-4 p-4">
          {/* Thumbnail */}
          <div className="relative w-[190px] h-[190px] flex-shrink-0 bg-white/5 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            
            {/* Rating Badge */}
            {rating !== undefined && (
              <div className="absolute top-2 right-2 bg-[#55D186] text-[#0D0D0D] text-base font-bold px-2.5 py-1 rounded-md min-w-[48px] text-center">
                {rating}
              </div>
            )}
          </div>
  
          {/* Content */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <h3 className="text-base font-semibold text-white mb-1 truncate">
                {title}
              </h3>
              <p className="text-xs text-white/60 mb-2">{team}</p>
              <p className="text-xs text-white/70 line-clamp-4">
                {description}
              </p>
            </div>
  
            {onReview && (
              <button
                onClick={onReview}
                className="self-start text-xs text-white hover:text-[#55D186] transition-colors flex items-center gap-1 mt-3"
              >
                Go To Reviewing
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }