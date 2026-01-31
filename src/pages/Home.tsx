import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

export function Home() {
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
            Sistema de Gerenciamento de Pets
          </h1>
          <p className="text-xl text-[#666666] dark:text-[#cccccc] transition-colors duration-300">
            Estado de Mato Grosso - Registro Público
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            to="/pets"
            className="bg-[#ffffff] dark:bg-[#2d2d2d] p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="text-6xl mb-4">🐾</div>
            <h2 className="text-2xl font-bold mb-2 text-[#333333] dark:text-[#ffffff] group-hover:text-[#ff69b4] dark:group-hover:text-[#ff1493] transition-colors duration-300">
              Pets
            </h2>
            <p className="text-[#666666] dark:text-[#cccccc] transition-colors duration-300">
              Visualize e gerencie o cadastro de pets
            </p>
          </Link>

          <Link
            to="/tutores"
            className="bg-[#ffffff] dark:bg-[#2d2d2d] p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-2xl font-bold mb-2 text-[#333333] dark:text-[#ffffff] group-hover:text-[#bfff00] dark:group-hover:text-[#9acd32] transition-colors duration-300">
              Tutores
            </h2>
            <p className="text-[#666666] dark:text-[#cccccc] transition-colors duration-300">
              Visualize e gerencie o cadastro de tutores
            </p>
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/login"
            className="inline-block bg-[#ffa500] hover:bg-[#ff8c00] dark:bg-[#ff8c00] dark:hover:bg-[#ffa500] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Fazer Login
          </Link>
        </div>
      </div>
    </div>
  )
}
