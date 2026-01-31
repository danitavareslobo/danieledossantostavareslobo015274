import { api } from './api'
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types/auth'

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/autenticacao/login', credentials)

    if (response.data.access_token && response.data.refresh_token) {
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      const user = { id: '1', nome: credentials.username, email: credentials.username }
      localStorage.setItem('user', JSON.stringify(user))
    }

    return response.data
  },

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const request: RefreshTokenRequest = { refreshToken }
    const response = await api.put<RefreshTokenResponse>('/autenticacao/refresh', request)

    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token)
    }
    if (response.data.refresh_token) {
      localStorage.setItem('refresh_token', response.data.refresh_token)
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
