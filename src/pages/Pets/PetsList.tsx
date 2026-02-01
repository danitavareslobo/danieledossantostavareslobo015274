import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../components/layout/Layout'
import { Card, CardImage, CardTitle, CardContent } from '../../components/ui/Card'
import { Pagination } from '../../components/ui/Pagination'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Loading } from '../../components/common/Loading'
import { petsService } from '../../services/pets.service'
import { handleApiError } from '../../utils/errorHandler'
import type { Pet, PetFilters } from '../../types/pet'
import type { PaginatedResponse } from '../../types/api'

export function PetsList() {
  const navigate = useNavigate()
  const [pets, setPets] = useState<PaginatedResponse<Pet> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filtros, setFiltros] = useState<PetFilters>({
    nome: '',
    raca: '',
    page: 0,
    size: 10,
  })

  const [buscaTemp, setBuscaTemp] = useState({
    nome: '',
    raca: '',
  })

  useEffect(() => {
    const carregarPets = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await petsService.listar(filtros)
        setPets(data)
      } catch (err) {
        const apiError = handleApiError(err)
        setError(apiError.message)
      } finally {
        setIsLoading(false)
      }
    }

    carregarPets()
  }, [filtros])

  const handleBuscar = () => {
    setFiltros({
      ...filtros,
      nome: buscaTemp.nome,
      raca: buscaTemp.raca,
      page: 0,
    })
  }

  const handleLimparFiltros = () => {
    setBuscaTemp({ nome: '', raca: '' })
    setFiltros({
      nome: '',
      raca: '',
      page: 0,
      size: 10,
    })
  }

  const handlePageChange = (page: number) => {
    setFiltros({ ...filtros, page })
  }

  if (isLoading && !pets) {
    return <Loading message="Carregando pets..." />
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
              🐾 Lista de Pets
            </h1>
            <p className="text-[#666666] dark:text-[#cccccc]">
              Gerencie o cadastro de pets do sistema
            </p>
          </div>
          <Button onClick={() => navigate('/pets/novo')} variant="primary">
            ➕ Cadastrar Pet
          </Button>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Buscar por nome"
              placeholder="Digite o nome do pet"
              value={buscaTemp.nome}
              onChange={(e) => setBuscaTemp({ ...buscaTemp, nome: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
              fullWidth
            />

            <Input
              label="Buscar por raça"
              placeholder="Digite a raça"
              value={buscaTemp.raca}
              onChange={(e) => setBuscaTemp({ ...buscaTemp, raca: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
              fullWidth
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleBuscar} variant="primary">
              Buscar
            </Button>
            <Button onClick={handleLimparFiltros} variant="outline">
              Limpar
            </Button>
          </div>
        </Card>

        {error && (
          <div className="mb-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {isLoading ? (
          <Loading fullScreen={false} message="Carregando pets..." />
        ) : pets?.content.length === 0 ? (
          <Card>
            <p className="text-center text-[#666666] dark:text-[#cccccc] py-8">
              {filtros.nome || filtros.raca
                ? 'Nenhum pet encontrado com os filtros aplicados.'
                : 'Nenhum pet cadastrado ainda.'}
            </p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pets?.content.map((pet) => (
                <Card
                  key={pet.id}
                  hoverable
                  padding="none"
                  onClick={() => navigate(`/pets/${pet.id}`)}
                >
                  {pet.foto ? (
                    <CardImage src={pet.foto.url} alt={pet.nome} />
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#ff69b4] to-[#bfff00] flex items-center justify-center">
                      <span className="text-6xl">🐾</span>
                    </div>
                  )}

                  <div className="p-4">
                    <CardTitle className="mb-2">{pet.nome}</CardTitle>
                    <CardContent>
                      {pet.raca && (
                        <p className="text-sm mb-1">
                          <span className="font-semibold">Raça:</span> {pet.raca}
                        </p>
                      )}
                      {pet.idade !== undefined && pet.idade !== null && (
                        <p className="text-sm">
                          <span className="font-semibold">Idade:</span> {pet.idade}{' '}
                          {pet.idade === 1 ? 'ano' : 'anos'}
                        </p>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {pets && (
              <Pagination
                currentPage={pets.page}
                totalPages={pets.pageCount}
                totalItems={pets.total}
                itemsPerPage={pets.size}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
