import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../components/layout/Layout'
import { useAuth } from '../../contexts/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!username.trim()) {
      setValidationError('Por favor, informe o usuário')
      return
    }

    if (!password.trim()) {
      setValidationError('Por favor, informe a senha')
      return
    }

    try {
      await login({ username, password })
      navigate('/')
    } catch (err) {
      console.error('Erro ao fazer login:', err)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-4xl font-bold text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
              Login
            </h1>
            <p className="mt-2 text-[#666666] dark:text-[#cccccc] transition-colors duration-300">
              Acesse o sistema de gerenciamento
            </p>
          </div>

          <div className="bg-[#ffffff] dark:bg-[#2d2d2d] p-8 rounded-lg shadow-md transition-colors duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold mb-2 text-[#333333] dark:text-[#ffffff] transition-colors duration-300"
                >
                  Usuário
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg border border-[#cccccc] dark:border-[#666666] bg-[#ffffff] dark:bg-[#1a1a1a] text-[#333333] dark:text-[#ffffff] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff69b4] dark:focus:ring-[#ff1493] disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Digite seu usuário"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-2 text-[#333333] dark:text-[#ffffff] transition-colors duration-300"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg border border-[#cccccc] dark:border-[#666666] bg-[#ffffff] dark:bg-[#1a1a1a] text-[#333333] dark:text-[#ffffff] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff69b4] dark:focus:ring-[#ff1493] disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
              </div>

              {(validationError || error) && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                  <p className="text-sm font-semibold">
                    {validationError || error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#ff69b4] hover:bg-[#ff1493] dark:bg-[#ff1493] dark:hover:bg-[#ff69b4] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-[#666666] dark:text-[#cccccc] transition-colors duration-300">
            Sistema de Gerenciamento de Pets - Estado de Mato Grosso
          </p>
        </div>
      </div>
    </Layout>
  )
}
