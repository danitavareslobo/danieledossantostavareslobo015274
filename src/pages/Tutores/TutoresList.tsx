import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'

export function TutoresList() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a] transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="bg-[#ff69b4] hover:bg-[#ff1493] dark:bg-[#ff1493] dark:hover:bg-[#ff69b4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          {theme === 'light' ? '🌙 Tema Escuro' : '☀️ Tema Claro'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-[#bfff00] dark:text-[#9acd32] hover:underline transition-colors duration-300"
          >
            ← Voltar para Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
          👤 Lista de Tutores
        </h1>

        <div className="bg-[#ffffff] dark:bg-[#2d2d2d] p-8 rounded-lg shadow-md transition-colors duration-300">
          <p className="text-[#666666] dark:text-[#cccccc] text-center">
            Em breve: Listagem de tutores com paginação
          </p>
        </div>
      </div>
    </div>
  )
}
