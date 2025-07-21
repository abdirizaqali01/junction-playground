'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useLoading, useLoadingNavigation } from '@/components/loading-context'
import { ButtonSpinner } from '@/components/loading'

interface LoadingButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  loadingKey?: string
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

export function LoadingButton({
  children,
  onClick,
  href,
  loadingKey,
  className = '',
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon
}: LoadingButtonProps) {
  const router = useRouter()
  const { isLoading } = useLoading()
  const { navigateWithLoading } = useLoadingNavigation()

  // Generate a unique loading key if not provided
  const finalLoadingKey = loadingKey || (href ? `nav-${href.replace(/[^a-zA-Z0-9]/g, '-')}` : `action-${Math.random().toString(36).substr(2, 9)}`)
  const isCurrentlyLoading = isLoading(finalLoadingKey)

  const handleClick = () => {
    if (disabled || isCurrentlyLoading) return

    if (href) {
      // Navigation with loading
      navigateWithLoading(() => router.push(href), finalLoadingKey)
    } else if (onClick) {
      // Custom action with optional loading
      if (loadingKey) {
        // If loadingKey is provided, assume they want loading state
        navigateWithLoading(onClick, finalLoadingKey)
      } else {
        // No loading key = immediate action
        onClick()
      }
    }
  }

  // Base styles
  const baseStyles = 'inline-flex items-center justify-left font-medium transition-all duration-150 relative select-none focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-2',
    md: 'px-4 py-2 text-sm rounded-lg gap-2',
    lg: 'px-6 py-3 text-base rounded-lg gap-3'
  }

  // Variant styles using your CSS variables
  const variantStyles = {
    primary: 'bg-[var(--color-primary-opacity100)] hover:bg-[var(--color-primary-opacity80)] text-white border border-[var(--color-primary-opacity100)] focus:ring-[var(--color-primary-opacity60)]',
    secondary: 'bg-[var(--color-light-opacity10)] hover:bg-[var(--color-light-opacity20)] text-[var(--color-light-opacity90)] border border-[var(--color-light-opacity30)] focus:ring-[var(--color-light-opacity40)]',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-red-600 focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-[var(--color-light-opacity10)] text-[var(--color-light-opacity75)] border border-transparent hover:border-[var(--color-light-opacity30)] focus:ring-[var(--color-light-opacity40)]'
  }

  // Loading and disabled styles
  const stateStyles = (isCurrentlyLoading || disabled) 
    ? 'opacity-70 cursor-not-allowed' 
    : 'cursor-pointer active:scale-95 hover:scale-[1.03]'

  const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${stateStyles}
    ${className}
  `.trim()

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isCurrentlyLoading}
      className={combinedClassName}
    >
      {/* Icon */}
      {icon && !isCurrentlyLoading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      
      {/* Loading spinner */}
      {isCurrentlyLoading && (
        <ButtonSpinner size={size === 'lg' ? 'md' : 'sm'} />
      )}
      
      {/* Button text */}
      <span className={isCurrentlyLoading ? 'ml-2' : ''}>
        {children}
      </span>
    </button>
  )
}

// Specialized component for sidebar navigation items
export function SidebarNavButton({
  children,
  href,
  isActive = false,
  icon,
  loadingKey,
  className = '',
  sidebarExpanded = true
}: {
  children: React.ReactNode
  href: string
  isActive?: boolean
  icon?: React.ReactNode
  loadingKey?: string
  className?: string
  sidebarExpanded?: boolean
}) {
  const { isLoading } = useLoading()
  const finalLoadingKey = loadingKey || `sidebar-${href.split('/').pop()}`
  const isCurrentlyLoading = isLoading(finalLoadingKey)

  return (
    <LoadingButton
      href={href}
      loadingKey={finalLoadingKey}
      variant="ghost"
      className={className}
      icon={sidebarExpanded ? icon : null}
    >
      {sidebarExpanded ? children : null}
      
      {/* Loading spinner for collapsed sidebar */}
      {!sidebarExpanded && isCurrentlyLoading && (
        <div className="absolute top-1 right-1 w-3 h-3 border border-[#9ca3af] border-t-white rounded-full animate-spin"></div>
      )}
      
      {/* Icon for collapsed sidebar */}
      {!sidebarExpanded && !isCurrentlyLoading && icon}
    </LoadingButton>
  )
}