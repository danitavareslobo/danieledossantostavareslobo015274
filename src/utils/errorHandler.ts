import axios, { AxiosError } from 'axios'
import { ApiError } from '../types/api'

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>

    if (axiosError.response) {
      return {
        message: axiosError.response.data?.message || 'Erro ao processar requisição',
        status: axiosError.response.status,
        errors: axiosError.response.data?.errors,
      }
    }

    if (axiosError.request) {
      return {
        message: 'Erro de conexão. Verifique sua internet e tente novamente.',
        status: 0,
      }
    }
  }

  return {
    message: 'Erro inesperado. Tente novamente mais tarde.',
    status: 500,
  }
}

export function getErrorMessage(error: unknown): string {
  const apiError = handleApiError(error)
  return apiError.message
}
