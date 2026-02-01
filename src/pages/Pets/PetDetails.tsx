import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../../components/layout/Layout'
import { Card, CardHeader, CardTitle, CardContent, CardImage } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Loading } from '../../components/common/Loading'
import { petsService } from '../../services/pets.service'
import { handleApiError } from '../../utils/errorHandler'
import type { PetCompleto } from '../../types/pet'

export function PetDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [pet, setPet] = useState<PetCompleto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const carregarPet = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        setError(null)
        const data = await petsService.buscarPorId(Number(id))
        setPet(data)
      } catch (err) {
        const apiError = handleApiError(err)
        setError(apiError.message)
      } finally {
        setIsLoading(false)
      }
    }

    carregarPet()
  }, [id])

  if (isLoading) {
    return <Loading message="Carregando detalhes do pet..." />
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
          <Button onClick={() => navigate('/pets')} variant="outline">
            Voltar para lista
          </Button>
        </div>
      </Layout>
    )
  }

  if (!pet) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-[#666666] dark:text-[#cccccc]">
            Pet não encontrado
          </p>
          <div className="mt-4 flex justify-center">
            <Button onClick={() => navigate('/pets')} variant="outline">
              Voltar para lista
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button onClick={() => navigate('/pets')} variant="outline">
            ← Voltar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card padding="none">
              {pet.foto ? (
                <CardImage src={pet.foto.url} alt={pet.nome} />
              ) : (
                <div className="h-64 bg-gradient-to-br from-[#ff69b4] to-[#bfff00] flex items-center justify-center">
                  <span className="text-8xl">🐾</span>
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">🐾 {pet.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#666666] dark:text-[#cccccc] mb-1">
                      ID
                    </h3>
                    <p className="text-lg text-[#333333] dark:text-[#ffffff]">
                      {pet.id}
                    </p>
                  </div>

                  {pet.raca && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#666666] dark:text-[#cccccc] mb-1">
                        Raça
                      </h3>
                      <p className="text-lg text-[#333333] dark:text-[#ffffff]">
                        {pet.raca}
                      </p>
                    </div>
                  )}

                  {pet.idade !== undefined && pet.idade !== null && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#666666] dark:text-[#cccccc] mb-1">
                        Idade
                      </h3>
                      <p className="text-lg text-[#333333] dark:text-[#ffffff]">
                        {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-2">
                  <Button onClick={() => navigate(`/pets/${pet.id}/editar`)} variant="primary">
                    Editar
                  </Button>
                  <Button onClick={() => {}} variant="danger">
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>

            {pet.tutores && pet.tutores.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>👥 Tutores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pet.tutores.map((tutor) => (
                      <div
                        key={tutor.id}
                        className="p-4 bg-[#f5f5f5] dark:bg-[#2d2d2d] rounded-lg hover:bg-[#e5e5e5] dark:hover:bg-[#404040] transition-colors duration-300 cursor-pointer"
                        onClick={() => navigate(`/tutores/${tutor.id}`)}
                      >
                        <div className="flex items-center gap-4">
                          {tutor.foto ? (
                            <img
                              src={tutor.foto.url}
                              alt={tutor.nome}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff69b4] to-[#bfff00] flex items-center justify-center">
                              <span className="text-2xl">👤</span>
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-[#333333] dark:text-[#ffffff]">
                              {tutor.nome}
                            </p>
                            <p className="text-sm text-[#666666] dark:text-[#cccccc]">
                              {tutor.telefone}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
