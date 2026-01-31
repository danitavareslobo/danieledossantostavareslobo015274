import type { ReactNode } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a] transition-colors duration-300">
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}
