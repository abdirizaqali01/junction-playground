import * as React from "react"
import Link from "next/link"
import * as style from '@/styles/design-system'
// REMOVED: import { initializeCSSVariables } from '@/styles/design-system';
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Image from 'next/image';

const mainButtonVariants = cva(
  "font-space-mono tracking-[-0.02rem] font-[400] px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 flex-shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-light-opacity100)] text-[var(--color-dark-opacity100)] hover:bg-[var(--color-light-opacity60)]",
        primary: "bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)] hover:bg-[var(--color-primary-opacity60)]",
        alerts: "bg-[var(--color-alerts-opacity100)] text-[var(--color-light-opacity100)] hover:bg-[var(--color-alerts-opacity60)]",
        gray: "bg-[var(--color-light-opacity20)] text-[var(--color-light-opacity100)] hover:bg-[var(--color-light-opacity60)]",
        outlineGreen: "border-[1.5px] border-[var(--color-primary-opacity100)] bg-transparent text-[var(--color-primary-opacity100)] hover:bg-[var(--color-primary-opacity20)]",
        outlineLight: "border-[1.5px] border-[var(--color-light-opacity100)] bg-transparent text-[var(--color-light-opacity100)] hover:bg-[var(--color-light-opacity20)]",
        outlineGray: "border-[1.5px] border-[var(--color-white-opacity10)] bg-[var(--color-white-opacity10)] text-[var(--color-light-opacity100)] hover:bg-[var(--color-white-opacity30)]",
        ghost: "bg-transparent text-[var(--color-light-opacity60)] hover:text-[var(--color-light-opacity100)]",
      },
      size: {
        default: "px-6 py-3 text-[0.9rem]",
        sm: "px-6 py-2 text-sm",
        lg: "px-8 py-4 text-[1rem]",
        none: "px-0 py-3 text-[0.9rem]",
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
    // REMOVED: Design system actuator - no longer needed
    // useEffect(() => {
    //   initializeCSSVariables();
    // }, []);

    const buttonContent = (
      <>
        <span>{children}</span>
        {showIcon && (
          <Image src="/icons/Right-Arrow.svg" alt="Right Arrow" width={20} height={20} />
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