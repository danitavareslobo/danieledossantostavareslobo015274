import { api } from './api'
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types/auth'

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/autenticacao/login', credentials)

    if (response.data.accessToken && response.data.refreshToken) {
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(response.data.usuario))
    }

    return response.data
  },

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const request: RefreshTokenRequest = { refreshToken }
    const response = await api.put<RefreshTokenResponse>('/autenticacao/refresh', request)

    if (response.data.accessToken) {
      localStorage.setItem('access_token', response.data.accessToken)
    }

    return response.data
  },

  logout(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
  },

  getStoredUser() {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
    return null
  },

  getStoredTokens() {
    return {
      accessToken: localStorage.getItem('access_token'),
      refreshToken: localStorage.getItem('refresh_token'),
    }
  },

  isAuthenticated(): boolean {
    const { accessToken } = this.getStoredTokens()
    return !!accessToken
  },
}
