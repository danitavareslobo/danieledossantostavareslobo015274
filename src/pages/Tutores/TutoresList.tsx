import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../components/layout/Layout'
import { Card, CardImage, CardTitle, CardContent } from '../../components/ui/Card'
import { Pagination } from '../../components/ui/Pagination'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Loading } from '../../components/common/Loading'
import { tutoresService } from '../../services/tutores.service'
import { handleApiError } from '../../utils/errorHandler'
import { useDebounce } from '../../hooks/useDebounce'
import type { Tutor, TutorFilters } from '../../types/tutor'
import type { PaginatedResponse } from '../../types/api'

export function TutoresList() {
  const navigate = useNavigate()
  const [tutores, setTutores] = useState<PaginatedResponse<Tutor> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filtros, setFiltros] = useState<TutorFilters>({
    nome: '',
    telefone: '',
    page: 0,
    size: 10,
  })

  const [buscaTemp, setBuscaTemp] = useState({
    nome: '',
    telefone: '',
  })

  const debouncedNome = useDebounce(buscaTemp.nome, 500)
  const debouncedTelefone = useDebounce(buscaTemp.telefone, 500)

  useEffect(() => {
    setFiltros(prev => ({
      ...prev,
      nome: debouncedNome,
      telefone: debouncedTelefone,
      page: 0,
    }))
  }, [debouncedNome, debouncedTelefone])

  useEffect(() => {
    const carregarTutores = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await tutoresService.listar(filtros)
        setTutores(data)
      } catch (err) {
        const apiError = handleApiError(err)
        setError(apiError.message)
      } finally {
        setIsLoading(false)
      }
    }

    carregarTutores()
  }, [filtros])

  const handleLimparFiltros = () => {
    setBuscaTemp({ nome: '', telefone: '' })
    setFiltros({
      nome: '',
      telefone: '',
      page: 0,
      size: 10,
    })
  }

  const handlePageChange = (page: number) => {
    setFiltros({ ...filtros, page })
  }

  if (isLoading && !tutores) {
    return <Loading message="Carregando tutores..." />
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
              👤 Lista de Tutores
            </h1>
            <p className="text-[#666666] dark:text-[#cccccc]">
              Gerencie o cadastro de tutores do sistema
            </p>
          </div>
          <Button onClick={() => navigate('/tutores/novo')} variant="primary">
            ➕ Cadastrar Tutor
          </Button>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Buscar por nome"
              placeholder="Digite o nome do tutor"
              value={buscaTemp.nome}
              onChange={(e) => setBuscaTemp({ ...buscaTemp, nome: e.target.value })}
              fullWidth
            />

            <Input
              label="Buscar por telefone"
              placeholder="Digite o telefone"
              value={buscaTemp.telefone}
              onChange={(e) => setBuscaTemp({ ...buscaTemp, telefone: e.target.value })}
              fullWidth
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleLimparFiltros} variant="outline">
              Limpar Filtros
            </Button>
          </div>
        </Card>

        {error && (
          <div className="mb-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {isLoading ? (
          <Loading fullScreen={false} message="Carregando tutores..." />
        ) : tutores?.content.length === 0 ? (
          <Card>
            <p className="text-center text-[#666666] dark:text-[#cccccc] py-8">
              {filtros.nome || filtros.telefone
                ? 'Nenhum tutor encontrado com os filtros aplicados.'
                : 'Nenhum tutor cadastrado ainda.'}
            </p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tutores?.content.map((tutor) => (
                <Card
                  key={tutor.id}
                  hoverable
                  padding="none"
                  onClick={() => navigate(`/tutores/${tutor.id}`)}
                >
                  {tutor.foto ? (
                    <CardImage src={tutor.foto.url} alt={tutor.nome} />
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#ff69b4] to-[#bfff00] flex items-center justify-center">
                      <span className="text-6xl">👤</span>
                    </div>
                  )}

                  <div className="p-4">
                    <CardTitle className="mb-2">{tutor.nome}</CardTitle>
                    <CardContent>
                      <p className="text-sm mb-1">
                        <span className="font-semibold">Telefone:</span> {tutor.telefone}
                      </p>
                      {tutor.email && (
                        <p className="text-sm">
                          <span className="font-semibold">Email:</span> {tutor.email}
                        </p>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {tutores && (
              <Pagination
                currentPage={tutores.page}
                totalPages={tutores.pageCount}
                totalItems={tutores.total}
                itemsPerPage={tutores.size}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
