import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { authService } from './auth.service'
import { api } from './api'

vi.mock('./api')

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      const credentials = {
        username: 'admin',
        password: 'admin',
      }

      const mockResponse = {
        data: {
          access_token: 'token-jwt',
          refresh_token: 'refresh-token',
        },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await authService.login(credentials)

      expect(api.post).toHaveBeenCalledWith('/autenticacao/login', credentials)
      expect(result).toEqual(mockResponse.data)
      expect(localStorage.getItem('access_token')).toBe('token-jwt')
      expect(localStorage.getItem('refresh_token')).toBe('refresh-token')
      expect(localStorage.getItem('user')).toBeTruthy()
    })
  })

  describe('refreshToken', () => {
    it('deve atualizar o token com sucesso', async () => {
      const mockResponse = {
        data: {
          access_token: 'new-token-jwt',
          refresh_token: 'new-refresh-token',
        },
      }

      vi.mocked(api.put).mockResolvedValue(mockResponse)

      const result = await authService.refreshToken('old-refresh-token')

      expect(api.put).toHaveBeenCalledWith('/autenticacao/refresh', {
        refreshToken: 'old-refresh-token',
      })
      expect(result).toEqual(mockResponse.data)
      expect(localStorage.getItem('access_token')).toBe('new-token-jwt')
      expect(localStorage.getItem('refresh_token')).toBe('new-refresh-token')
    })
  })

  describe('logout', () => {
    it('deve fazer logout e limpar localStorage', () => {
      localStorage.setItem('access_token', 'token-jwt')
      localStorage.setItem('refresh_token', 'refresh-token')
      localStorage.setItem('user', JSON.stringify({ username: 'admin' }))

      authService.logout()

      expect(localStorage.getItem('access_token')).toBeNull()
      expect(localStorage.getItem('refresh_token')).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })
  })

  describe('getStoredUser', () => {
    it('deve retornar usuário armazenado', () => {
      const user = { username: 'admin', nome: 'Administrador' }
      localStorage.setItem('user', JSON.stringify(user))

      const result = authService.getStoredUser()

      expect(result).toEqual(user)
    })

    it('deve retornar null se não houver usuário', () => {
      const result = authService.getStoredUser()

      expect(result).toBeNull()
    })

    it('deve retornar null se dados estiverem corrompidos', () => {
      localStorage.setItem('user', 'invalid-json')

      const result = authService.getStoredUser()

      expect(result).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('deve retornar true se houver token', () => {
      localStorage.setItem('access_token', 'token-jwt')

      const result = authService.isAuthenticated()

      expect(result).toBe(true)
    })

    it('deve retornar false se não houver token', () => {
      const result = authService.isAuthenticated()

      expect(result).toBe(false)
    })
  })
})
