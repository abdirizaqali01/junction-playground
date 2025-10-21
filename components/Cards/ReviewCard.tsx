interface ReviewCardProps {
    teamName: string
    rating: number
    projectName: string
    feedback: string
    timestamp: string
  }
  
  export default function ReviewCard({
    teamName,
    rating,
    projectName,
    feedback,
    timestamp,
  }: ReviewCardProps) {
    return (
      <div className="min-w-[480px] h-[200px] bg-[#0D0D0D] rounded-xl p-5 flex flex-col relative overflow-hidden">
        {/* Green tint overlay */}
        <div className="absolute inset-0 bg-[#55D186] opacity-10 pointer-events-none rounded-xl" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-semibold text-white">{teamName}</h3>
            <span className="text-white/50 text-xs">{timestamp}</span>
          </div>
          
          <p className="text-xs text-white/60 mb-1">
            Team {teamName} gave a score of <span className="text-[#55D186] font-semibold">{rating}/10</span> for{' '}
            <span className="text-[#55D186]">{projectName}</span>
          </p>
          
          <div className="flex-1 mt-2">
            <h4 className="text-xs font-semibold text-white mb-1.5">Feedback</h4>
            <p className="text-xs text-white/70 line-clamp-3">
              {feedback}
            </p>
          </div>
          
          <button className="text-xs text-[#55D186] hover:underline self-start mt-2">
            View full
          </button>
        </div>
      </div>
    )
  }