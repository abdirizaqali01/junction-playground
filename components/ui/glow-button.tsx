"use client"

import { forwardRef } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { GlowEffect } from "@/components/ui/glow-effect"
import { cn } from "@/lib/utils"

export interface GlowButtonProps extends ButtonProps {
  glowColors?: string[]
  glowMode?: "rotate" | "pulse" | "breathe" | "colorShift" | "flowHorizontal" | "static"
  glowBlur?: "softest" | "soft" | "medium" | "strong" | "stronger" | "strongest" | "none" | number
  glowScale?: number
  glowDuration?: number
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      className,
      children,
      glowColors = ["#00CE93", "#00CE93", "#00CE93", "#00CE93"],
      glowMode = "colorShift",
      glowBlur = "soft",
      glowScale = 0.9,
      glowDuration = 3,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative group">
        <GlowEffect
          colors={glowColors}
          mode={glowMode}
          blur={glowBlur}
          scale={glowScale}
          duration={glowDuration}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <Button ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </Button>
      </div>
    )
  },
)

GlowButton.displayName = "GlowButton"

export { GlowButton }
