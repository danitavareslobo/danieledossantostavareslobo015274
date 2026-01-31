export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] dark:bg-[#1a1a1a] transition-colors duration-300">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#ff69b4] dark:border-[#ff1493] border-t-transparent"></div>
        <p className="mt-4 text-[#666666] dark:text-[#cccccc] font-semibold">
          Carregando...
        </p>
      </div>
    </div>
  )
}
