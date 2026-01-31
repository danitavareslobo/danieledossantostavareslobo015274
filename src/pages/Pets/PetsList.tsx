import { Layout } from '../../components/layout/Layout'

export function PetsList() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
          🐾 Lista de Pets
        </h1>

        <div className="bg-[#ffffff] dark:bg-[#2d2d2d] p-8 rounded-lg shadow-md transition-colors duration-300">
          <p className="text-[#666666] dark:text-[#cccccc] text-center">
            Em breve: Listagem de pets com paginação e busca
          </p>
        </div>
      </div>
    </Layout>
  )
}
