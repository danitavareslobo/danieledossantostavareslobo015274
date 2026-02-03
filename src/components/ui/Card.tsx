import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  hoverable?: boolean
  padding?: 'none' | 'small' | 'medium' | 'large'
  className?: string
  onClick?: () => void
}

export function Card({
  children,
  hoverable = false,
  padding = 'medium',
  className = '',
  onClick,
}: CardProps) {
  const baseClasses = 'bg-[#ffffff] dark:bg-[#2d2d2d] rounded-lg shadow-md transition-all duration-300'

  const hoverClasses = hoverable ? 'hover:shadow-lg cursor-pointer' : ''

  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  }

  const combinedClasses = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`

  return (
    <div className={combinedClasses} onClick={onClick}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-bold text-[#333333] dark:text-[#ffffff] transition-colors duration-300 ${className}`}>
      {children}
    </h3>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`text-[#666666] dark:text-[#cccccc] transition-colors duration-300 ${className}`}>
      {children}
    </div>
  )
}

interface CardImageProps {
  src: string
  alt: string
  className?: string
}

export function CardImage({ src, alt, className = '' }: CardImageProps) {
  return (
    <div className={`mb-4 overflow-hidden rounded-lg ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  )
}
