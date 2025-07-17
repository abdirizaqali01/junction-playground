'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// LoadingBar component
interface LoadingBarProps {
  isLoading: boolean
  duration?: number
  delay?: number
}

const LoadingBar: React.FC<LoadingBarProps> = ({ 
  isLoading, 
  duration = 3000,
  delay = 150 
}) => {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  React.useEffect(() => {
    let progressInterval: NodeJS.Timeout
    let delayTimeout: NodeJS.Timeout
    let hideTimeout: NodeJS.Timeout

    if (isLoading) {
      // Only show loading bar if operation takes longer than delay
      delayTimeout = setTimeout(() => {
        setShouldShow(true)
        setVisible(true)
        setProgress(0)
        
        // Animated progress simulation
        let currentProgress = 0
        const increment = 100 / (duration / 50) // Update every 50ms
        
        progressInterval = setInterval(() => {
          currentProgress += increment
          
          // Slow down as we approach completion
          if (currentProgress > 70) {
            currentProgress += increment * 0.3
          }
          if (currentProgress > 90) {
            currentProgress += increment * 0.1
          }
          
          // Don't complete until loading is actually done
          if (currentProgress >= 95 && isLoading) {
            currentProgress = 95
          }
          
          setProgress(Math.min(currentProgress, 100))
        }, 50)
      }, delay)
    } else {
      // Complete immediately when loading finishes
      if (shouldShow) {
        setProgress(100)
        
        // Hide after completion animation
        hideTimeout = setTimeout(() => {
          setVisible(false)
          setShouldShow(false)
          setProgress(0)
        }, 200)
      } else {
        // Cancel delayed show if loading finished quickly
        clearTimeout(delayTimeout)
        setShouldShow(false)
        setVisible(false)
        setProgress(0)
      }
    }

    return () => {
      clearInterval(progressInterval)
      clearTimeout(delayTimeout)
      clearTimeout(hideTimeout)
    }
  }, [isLoading, duration, delay, shouldShow])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-[var(--color-primary-opacity20)] z-50">
      <div 
        className="h-full bg-[var(--color-primary-opacity100)] transition-all duration-100 ease-out"
        style={{ 
          width: `${progress}%`,
          transition: progress === 100 ? 'width 0.2s ease-out' : 'width 0.1s ease-out'
        }}
      />
    </div>
  )
}

// Loading Context
interface LoadingContextType {
  isLoading: (key: string) => boolean
  setLoading: (key: string, loading: boolean) => void
  globalLoading: boolean
  setGlobalLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [globalLoading, setGlobalLoading] = useState(false)

  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false
  }, [loadingStates])

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => {
      if (loading) {
        return { ...prev, [key]: true }
      } else {
        const newState = { ...prev }
        delete newState[key]
        return newState
      }
    })
  }, [])

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    globalLoading,
    setGlobalLoading,
  }

  // Check if any loading is active
  const hasActiveLoading = globalLoading || Object.keys(loadingStates).length > 0

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {/* Loading bar removed */}
    </LoadingContext.Provider>
  )
}

// Custom hook for router navigation with loading
export const useOptimizedRouter = () => {
  const { setLoading } = useLoading()
  
  const push = useCallback((url: string, options?: { key?: string }) => {
    const key = options?.key || `nav-${Date.now()}`
    setLoading(key, true)
    
    // Use dynamic import for better performance
    import('next/navigation').then(({ useRouter }) => {
      const router = useRouter()
      router.push(url)
      
      // Clear loading after navigation
      setTimeout(() => {
        setLoading(key, false)
      }, 500)
    })
  }, [setLoading])

  return { push }
}