import * as React from "react"

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'fullscreen' | 'inline' | 'overlay';
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  message = "Loading...", 
  size = 'md',
  variant = 'fullscreen',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const LoadingSpinner = () => (
    <div className="text-center px-4 max-w-sm mx-auto">
      <div className={`animate-spin rounded-full border-b-2 border-[var(--color-primary-opacity100)] mx-auto mb-4 ${sizeClasses[size]}`}></div>
      <p className={`text-[var(--color-light-opacity60)] ${textSizeClasses[size]} break-words`}>
        {message}
      </p>
    </div>
  )

  if (variant === 'fullscreen') {
    return (
      <div className={`min-h-screen w-full bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk flex justify-center items-center p-4 ${className}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (variant === 'overlay') {
    return (
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 ${className}`}>
        <div className="bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk p-4 sm:p-6 md:p-8 rounded-lg max-w-sm w-full mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // inline variant
  return (
    <div className={`flex justify-center items-center p-2 sm:p-4 w-full ${className}`}>
      <LoadingSpinner />
    </div>
  );
};

// Button loading spinner component
export const ButtonSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <div className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0`} />
  )
}

export default Loading;