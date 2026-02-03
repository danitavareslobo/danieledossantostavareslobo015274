export interface ApiError {
  message: string
  status?: number
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  content: T[]
  page: number
  size: number
  total: number
  pageCount: number
}
