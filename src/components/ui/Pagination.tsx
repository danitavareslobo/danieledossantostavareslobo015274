interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  itemsPerPage?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage < 3) {
        for (let i = 0; i < 3; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages - 1)
      } else if (currentPage >= totalPages - 3) {
        pages.push(0)
        pages.push('...')
        for (let i = totalPages - 3; i < totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(0)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages - 1)
      }
    }

    return pages
  }

  const pages = getPageNumbers()

  const startItem = currentPage * itemsPerPage + 1
  const endItem = Math.min((currentPage + 1) * itemsPerPage, totalItems || 0)

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {totalItems && (
        <p className="text-sm text-[#666666] dark:text-[#cccccc]">
          Mostrando {startItem} a {endItem} de {totalItems} resultados
        </p>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 rounded-lg bg-[#ffffff] dark:bg-[#2d2d2d] text-[#333333] dark:text-[#ffffff] border border-[#cccccc] dark:border-[#666666] hover:bg-[#f5f5f5] dark:hover:bg-[#404040] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          Anterior
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 text-[#666666] dark:text-[#cccccc]"
              >
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isActive = pageNum === currentPage

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                isActive
                  ? 'bg-[#ff69b4] dark:bg-[#ff1493] text-white'
                  : 'bg-[#ffffff] dark:bg-[#2d2d2d] text-[#333333] dark:text-[#ffffff] border border-[#cccccc] dark:border-[#666666] hover:bg-[#f5f5f5] dark:hover:bg-[#404040]'
              }`}
            >
              {pageNum + 1}
            </button>
          )
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 rounded-lg bg-[#ffffff] dark:bg-[#2d2d2d] text-[#333333] dark:text-[#ffffff] border border-[#cccccc] dark:border-[#666666] hover:bg-[#f5f5f5] dark:hover:bg-[#404040] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
