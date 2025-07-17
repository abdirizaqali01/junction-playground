import * as React from "react"

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="h-[100vh] bg-[var(--color-dark-opacity100)] text-[var(--color-light-opacity100)] font-space-grotesk flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary-opacity100)] mx-auto mb-4"></div>
          <p className="text-[var(--color-light-opacity60)]">{message}</p>
        </div>
    </div>
  );
};

export default Loading;