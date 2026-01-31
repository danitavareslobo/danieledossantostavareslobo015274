import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const linkClasses = (path: string) => {
    const base = "px-4 py-2 rounded-lg transition-colors duration-300 font-semibold"
    if (isActive(path)) {
      return `${base} bg-[#ff69b4] dark:bg-[#ff1493] text-white`
    }
    return `${base} text-[#333333] dark:text-[#ffffff] hover:bg-[#f5f5f5] dark:hover:bg-[#2d2d2d]`
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-[#ffffff] dark:bg-[#2d2d2d] shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <h1 className="text-xl font-bold text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
              Pets MT
            </h1>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#333333] dark:text-[#ffffff] p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav className="hidden md:flex items-center gap-2">
            <Link to="/" className={linkClasses('/')}>
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/pets" className={linkClasses('/pets')}>
                  Pets
                </Link>
                <Link to="/tutores" className={linkClasses('/tutores')}>
                  Tutores
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <>
                <span className="px-4 py-2 text-sm text-[#666666] dark:text-[#cccccc]">
                  Olá, {user?.nome}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-[#ffa500] hover:bg-[#ff8c00] dark:bg-[#ff8c00] dark:hover:bg-[#ffa500] text-white font-semibold transition-colors duration-300"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link to="/login" className={linkClasses('/login')}>
                Login
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="ml-2 bg-[#ff69b4] hover:bg-[#ff1493] dark:bg-[#ff1493] dark:hover:bg-[#ff69b4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link
              to="/"
              className={linkClasses('/')}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/pets"
                  className={linkClasses('/pets')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pets
                </Link>
                <Link
                  to="/tutores"
                  className={linkClasses('/tutores')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tutores
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm text-[#666666] dark:text-[#cccccc]">
                  Olá, {user?.nome}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-[#ffa500] hover:bg-[#ff8c00] dark:bg-[#ff8c00] dark:hover:bg-[#ffa500] text-white font-semibold transition-colors duration-300"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={linkClasses('/login')}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="bg-[#ff69b4] hover:bg-[#ff1493] dark:bg-[#ff1493] dark:hover:bg-[#ff69b4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              {theme === 'light' ? '🌙 Tema Escuro' : '☀️ Tema Claro'}
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
