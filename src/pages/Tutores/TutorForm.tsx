import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../../components/layout/Layout'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Loading } from '../../components/common/Loading'
import { tutoresService } from '../../services/tutores.service'
import { handleApiError } from '../../utils/errorHandler'
import type { CreateTutorRequest, UpdateTutorRequest } from '../../types/tutor'

export function TutorForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState<CreateTutorRequest>({
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    endereco: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isEditMode) {
      const carregarTutor = async () => {
        try {
          setIsLoading(true)
          setError(null)
          const data = await tutoresService.buscarPorId(Number(id))
          setFormData({
            nome: data.nome,
            telefone: data.telefone,
            email: data.email || '',
            cpf: data.cpf || '',
            endereco: data.endereco || '',
          })
        } catch (err) {
          const apiError = handleApiError(err)
          setError(apiError.message)
        } finally {
          setIsLoading(false)
        }
      }

      carregarTutor()
    }
  }, [id, isEditMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome.trim()) {
      setError('O nome do tutor é obrigatório')
      return
    }

    if (!formData.telefone.trim()) {
      setError('O telefone é obrigatório')
      return
    }

    try {
      setIsSaving(true)
      setError(null)

      const payload: CreateTutorRequest | UpdateTutorRequest = {
        nome: formData.nome.trim(),
        telefone: formData.telefone.trim(),
        email: formData.email?.trim() || undefined,
        cpf: formData.cpf?.trim() || undefined,
        endereco: formData.endereco?.trim() || undefined,
      }

      if (isEditMode) {
        await tutoresService.atualizar(Number(id), payload)
        navigate(`/tutores/${id}`)
      } else {
        const novoTutor = await tutoresService.criar(payload)
        navigate(`/tutores/${novoTutor.id}`)
      }
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof CreateTutorRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (isLoading) {
    return <Loading message="Carregando dados do tutor..." />
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button onClick={() => navigate('/tutores')} variant="outline">
            ← Voltar
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {isEditMode ? '✏️ Editar Tutor' : '➕ Cadastrar Novo Tutor'}
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
                  label="Nome do tutor"
                  placeholder="Digite o nome completo"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                  fullWidth
                />

                <Input
                  label="Telefone"
                  placeholder="Digite o telefone"
                  mask="phone"
                  value={formData.telefone}
                  onChange={(e) => handleChange('telefone', e.target.value)}
                  required
                  fullWidth
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="Digite o email (opcional)"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  fullWidth
                />

                <Input
                  label="CPF"
                  placeholder="Digite o CPF (opcional)"
                  mask="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleChange('cpf', e.target.value)}
                  fullWidth
                />

                <Input
                  label="Endereço"
                  placeholder="Digite o endereço (opcional)"
                  value={formData.endereco}
                  onChange={(e) => handleChange('endereco', e.target.value)}
                  fullWidth
                />

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSaving}
                    disabled={isSaving}
                  >
                    {isEditMode ? 'Salvar Alterações' : 'Cadastrar Tutor'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/tutores')}
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
