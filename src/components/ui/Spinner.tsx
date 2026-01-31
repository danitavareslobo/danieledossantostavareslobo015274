interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function Spinner({ size = 'medium', className = '' }: SpinnerProps) {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-16 w-16 border-4',
  }

  const combinedClasses = `inline-block animate-spin rounded-full border-[#ff69b4] dark:border-[#ff1493] border-t-transparent ${sizeClasses[size]} ${className}`

  return <div className={combinedClasses}></div>
}
