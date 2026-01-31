import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useTheme } from './contexts/ThemeContext'

function App() {
  const [count, setCount] = useState(0)
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a] flex flex-col items-center justify-center transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="bg-[#ff69b4] hover:bg-[#ff1493] dark:bg-[#ff1493] dark:hover:bg-[#ff69b4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          {theme === 'light' ? '🌙 Tema Escuro' : '☀️ Tema Claro'}
        </button>
      </div>

      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={reactLogo} className="h-24 w-24" alt="React logo" />
        </a>
      </div>

      <h1 className="text-5xl font-bold mb-8 text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
        Vite + React
      </h1>

      <div className="bg-[#ffffff] dark:bg-[#2d2d2d] p-8 rounded-lg shadow-md transition-colors duration-300">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-[#bfff00] hover:bg-[#9acd32] dark:bg-[#9acd32] dark:hover:bg-[#bfff00] text-[#333333] font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          contador: {count}
        </button>
        <p className="mt-4 text-[#666666] dark:text-[#cccccc] transition-colors duration-300">
          Edite <code className="bg-[#f5f5f5] dark:bg-[#1a1a1a] px-2 py-1 rounded transition-colors duration-300">src/App.tsx</code> e salve para testar HMR
        </p>
      </div>

      <p className="mt-8 text-[#666666] dark:text-[#cccccc] transition-colors duration-300">
        Clique nos logos do Vite e React para saber mais
      </p>
    </div>
  )
}

export default App
