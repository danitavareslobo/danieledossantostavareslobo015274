import { Layout } from '../../components/layout/Layout'

export function Login() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
            🔐 Login
          </h1>

          <div className="bg-[#ffffff] dark:bg-[#2d2d2d] p-8 rounded-lg shadow-md transition-colors duration-300">
            <p className="text-[#666666] dark:text-[#cccccc] text-center">
              Em breve: Formulário de login com autenticação JWT
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
