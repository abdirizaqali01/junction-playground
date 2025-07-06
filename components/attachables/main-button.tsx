import * as React from "react"
import { useState, useEffect } from 'react'
import Link from "next/link"
import * as style from '@/styles/design-system'
import { initializeCSSVariables } from '@/styles/design-system';
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const mainButtonVariants = cva(
  "px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 flex-shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-light-opacity100)] text-[var(--color-dark-opacity100)] hover:bg-[var(--color-light-opacity60)]",
        primary: "bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] hover:bg-[var(--color-primary-opacity60)]",
        alerts: "bg-[var(--color-alerts-opacity100)] text-[var(--color-light-opacity100)] hover:bg-[var(--color-alerts-opacity60)]",
        gray: "bg-[var(--color-light-opacity20)] text-[var(--color-light-opacity100)] hover:bg-[var(--color-light-opacity60)]",
        outlineGreen: "border-2 border-[var(--color-primary-opacity100)] bg-transparent text-[var(--color-primary-opacity100)] hover:bg-[var(--color-primary-opacity20)]",
        outlineLight: "border-2 border-[var(--color-light-opacity100)] bg-transparent text-[var(--color-light-opacity100)] hover:bg-[var(--color-light-opacity20)]",
        outlineGray: "border-[1.5px] border-[var(--color-white-opacity10)] bg-[var(--color-white-opacity10)] text-[var(--color-light-opacity100)] hover:bg-[var(--color-white-opacity30)]",
        ghost: "bg-transparent text-[var(--color-light-opacity60)] hover:text-[var(--color-light-opacity100)]",
      },
      size: {
        default: "px-6 py-3 text-base",
        sm: "px-6 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)


export interface MainButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mainButtonVariants> {
  href?: string
  children?: React.ReactNode
  showIcon?: boolean
}

const MainButton = React.forwardRef<HTMLButtonElement, MainButtonProps>(
  ({ className, variant, size, href, children = "Enter Event", showIcon = true, ...props }, ref) => {
    //-------------------------------- DESIGN SYSTEM ACTUATOR --------------------------------//
      useEffect(() => {
        initializeCSSVariables();
      }, []);

    const buttonContent = (
      <>
        <span>{children}</span>
        {showIcon && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </>
    )

    if (href) {
      return (
        <Link href={href}>
          <button
            className={cn(mainButtonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          >
            {buttonContent}
          </button>
        </Link>
      )
    }

    return (
      <button
        className={cn(mainButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

MainButton.displayName = "MainButton"

export { MainButton, mainButtonVariants }