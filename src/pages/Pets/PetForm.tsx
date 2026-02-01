import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../../components/layout/Layout'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Loading } from '../../components/common/Loading'
import { petsService } from '../../services/pets.service'
import { handleApiError } from '../../utils/errorHandler'
import type { CreatePetRequest, UpdatePetRequest } from '../../types/pet'

export function PetForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState<CreatePetRequest>({
    nome: '',
    raca: '',
    idade: undefined,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isEditMode) {
      const carregarPet = async () => {
        try {
          setIsLoading(true)
          setError(null)
          const data = await petsService.buscarPorId(Number(id))
          setFormData({
            nome: data.nome,
            raca: data.raca || '',
            idade: data.idade,
          })
        } catch (err) {
          const apiError = handleApiError(err)
          setError(apiError.message)
        } finally {
          setIsLoading(false)
        }
      }

      carregarPet()
    }
  }, [id, isEditMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome.trim()) {
      setError('O nome do pet é obrigatório')
      return
    }

    try {
      setIsSaving(true)
      setError(null)

      const payload: CreatePetRequest | UpdatePetRequest = {
        nome: formData.nome.trim(),
        raca: formData.raca?.trim() || undefined,
        idade: formData.idade,
      }

      if (isEditMode) {
        await petsService.atualizar(Number(id), payload)
        navigate(`/pets/${id}`)
      } else {
        const novoPet = await petsService.criar(payload)
        navigate(`/pets/${novoPet.id}`)
      }
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof CreatePetRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'idade' ? (value ? Number(value) : undefined) : value,
    }))
  }

  if (isLoading) {
    return <Loading message="Carregando dados do pet..." />
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button onClick={() => navigate('/pets')} variant="outline">
            ← Voltar
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {isEditMode ? '✏️ Editar Pet' : '➕ Cadastrar Novo Pet'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-6 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nome do pet"
                  placeholder="Digite o nome do pet"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                  fullWidth
                />

                <Input
                  label="Raça"
                  placeholder="Digite a raça (opcional)"
                  value={formData.raca}
                  onChange={(e) => handleChange('raca', e.target.value)}
                  fullWidth
                />

                <Input
                  label="Idade"
                  type="number"
                  placeholder="Digite a idade em anos (opcional)"
                  value={formData.idade?.toString() || ''}
                  onChange={(e) => handleChange('idade', e.target.value)}
                  min="0"
                  fullWidth
                />

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSaving}
                    disabled={isSaving}
                  >
                    {isEditMode ? 'Salvar Alterações' : 'Cadastrar Pet'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/pets')}
                    disabled={isSaving}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
