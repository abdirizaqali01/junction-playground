import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

export interface MinimalButtonProps extends ButtonProps {
  subtle?: boolean
}

const MinimalButton = forwardRef<HTMLButtonElement, MinimalButtonProps>(
  ({ className, children, variant = "default", subtle = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(
          "rounded transition-all duration-200",
          subtle && "bg-transparent hover:bg-white/5 text-white border border-white/10",
          variant === "default" && !subtle && "bg-white text-black hover:bg-white/90",
          variant === "outline" && !subtle && "border border-white/20 hover:border-white/40 bg-transparent",
          variant === "secondary" && !subtle && "bg-white/10 hover:bg-white/15",
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    )
  },
)

MinimalButton.displayName = "MinimalButton"

export { MinimalButton }
