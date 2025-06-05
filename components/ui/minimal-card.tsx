import type React from "react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface MinimalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  border?: boolean
  padding?: "none" | "sm" | "md" | "lg"
}

const MinimalCard = forwardRef<HTMLDivElement, MinimalCardProps>(
  ({ className, children, hover = false, border = true, padding = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded bg-card",
          border && "border border-white/5",
          hover && "hover-lift accent-glow",
          padding === "none" && "p-0",
          padding === "sm" && "p-3",
          padding === "md" && "p-4",
          padding === "lg" && "p-6",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

MinimalCard.displayName = "MinimalCard"

export { MinimalCard }
