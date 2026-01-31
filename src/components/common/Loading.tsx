import { Spinner } from '../ui/Spinner'

interface LoadingProps {
  fullScreen?: boolean
  message?: string
}

export function Loading({ fullScreen = true, message = 'Carregando...' }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="text-center">
          <Spinner size="large" />
          <p className="mt-4 text-[#666666] dark:text-[#cccccc] font-semibold">
            {message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <Spinner size="medium" />
        <p className="mt-2 text-[#666666] dark:text-[#cccccc] text-sm">
          {message}
        </p>
      </div>
    </div>
  )
}
