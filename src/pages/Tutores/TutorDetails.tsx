import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../../components/layout/Layout'
import { Card, CardHeader, CardTitle, CardContent, CardImage } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { FileUpload } from '../../components/ui/FileUpload'
import { Modal } from '../../components/ui/Modal'
import { Loading } from '../../components/common/Loading'
import { PetSelector } from '../../components/common/PetSelector'
import { tutoresService } from '../../services/tutores.service'
import { handleApiError } from '../../utils/errorHandler'
import type { TutorCompleto } from '../../types/tutor'

export function TutorDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tutor, setTutor] = useState<TutorCompleto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false)
  const [isDeletingTutor, setIsDeletingTutor] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showDeletePhotoModal, setShowDeletePhotoModal] = useState(false)
  const [showDeleteTutorModal, setShowDeleteTutorModal] = useState(false)
  const [showPetSelector, setShowPetSelector] = useState(false)
  const [isAddingPet, setIsAddingPet] = useState(false)
  const [petToRemove, setPetToRemove] = useState<number | null>(null)
  const [isRemovingPet, setIsRemovingPet] = useState(false)

  useEffect(() => {
    const carregarTutor = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        setError(null)
        const data = await tutoresService.buscarPorId(Number(id))
        setTutor(data)
      } catch (err) {
        const apiError = handleApiError(err)
        setError(apiError.message)
      } finally {
        setIsLoading(false)
      }
    }

    carregarTutor()
  }, [id])

  const handleFileSelect = async (file: File) => {
    if (!id) return

    try {
      setIsUploadingPhoto(true)
      setError(null)
      setSuccessMessage(null)
      const foto = await tutoresService.adicionarFoto(Number(id), file)
      setTutor((prev) => (prev ? { ...prev, foto } : null))
      setSuccessMessage('Foto adicionada com sucesso!')
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  const handleRemovePhoto = async () => {
    if (!id || !tutor?.foto) return

    try {
      setIsDeletingPhoto(true)
      setError(null)
      setSuccessMessage(null)
      await tutoresService.removerFoto(Number(id), tutor.foto.id)
      setTutor((prev) => (prev ? { ...prev, foto: undefined } : null))
      setSuccessMessage('Foto removida com sucesso!')
      setShowDeletePhotoModal(false)
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
    } finally {
      setIsDeletingPhoto(false)
    }
  }

  const handleDeleteTutor = async () => {
    if (!id) return

    try {
      setIsDeletingTutor(true)
      setError(null)
      await tutoresService.deletar(Number(id))
      navigate('/tutores')
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      setShowDeleteTutorModal(false)
    } finally {
      setIsDeletingTutor(false)
    }
  }

  const handleAddPet = async (petId: number) => {
    if (!id) return

    try {
      setIsAddingPet(true)
      setError(null)
      setSuccessMessage(null)
      await tutoresService.adicionarPet(Number(id), petId)
      const updatedTutor = await tutoresService.buscarPorId(Number(id))
      setTutor(updatedTutor)
      setSuccessMessage('Pet adicionado com sucesso!')
      setShowPetSelector(false)
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
    } finally {
      setIsAddingPet(false)
    }
  }

  const handleRemovePet = async () => {
    if (!id || !petToRemove) return

    try {
      setIsRemovingPet(true)
      setError(null)
      setSuccessMessage(null)
      await tutoresService.removerPet(Number(id), petToRemove)
      const updatedTutor = await tutoresService.buscarPorId(Number(id))
      setTutor(updatedTutor)
      setSuccessMessage('Pet removido com sucesso!')
      setPetToRemove(null)
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
    } finally {
      setIsRemovingPet(false)
    }
  }

  if (isLoading) {
    return <Loading message="Carregando detalhes do tutor..." />
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
          <Button onClick={() => navigate('/tutores')} variant="outline">
            Voltar para lista
          </Button>
        </div>
      </Layout>
    )
  }

  if (!tutor) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-[#666666] dark:text-[#cccccc]">
            Tutor não encontrado
          </p>
          <div className="mt-4 flex justify-center">
            <Button onClick={() => navigate('/tutores')} variant="outline">
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
          <Button onClick={() => navigate('/tutores')} variant="outline">
            ← Voltar
          </Button>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
            <p className="font-semibold">{successMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card padding="none">
              {tutor.foto ? (
                <CardImage src={tutor.foto.url} alt={tutor.nome} />
              ) : (
                <div className="h-64 bg-gradient-to-br from-[#ff69b4] to-[#bfff00] flex items-center justify-center">
                  <span className="text-8xl">👤</span>
                </div>
              )}
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-sm font-semibold text-[#666666] dark:text-[#cccccc] mb-3">
                  Gerenciar Foto
                </h3>
                <FileUpload
                  label="Adicionar Foto"
                  onFileSelect={handleFileSelect}
                  isLoading={isUploadingPhoto}
                  currentImageUrl={tutor.foto?.url}
                />
                {tutor.foto && (
                  <Button
                    variant="danger"
                    onClick={() => setShowDeletePhotoModal(true)}
                    className="mt-3 w-full"
                  >
                    🗑️ Remover Foto
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">👤 {tutor.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#666666] dark:text-[#cccccc] mb-1">
                      ID
                    </h3>
                    <p className="text-lg text-[#333333] dark:text-[#ffffff]">
                      {tutor.id}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#666666] dark:text-[#cccccc] mb-1">
                      Telefone
                    </h3>
                    <p className="text-lg text-[#333333] dark:text-[#ffffff]">
                      {tutor.telefone}
                    </p>
                  </div>

                  {tutor.email && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#666666] dark:text-[#cccccc] mb-1">
                        Email
                      </h3>
                      <p className="text-lg text-[#333333] dark:text-[#ffffff]">
                        {tutor.email}
                      </p>
                    </div>
                  )}

                  {tutor.cpf && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#666666] dark:text-[#cccccc] mb-1">
                        CPF
                      </h3>
                      <p className="text-lg text-[#333333] dark:text-[#ffffff]">
                        {tutor.cpf}
                      </p>
                    </div>
                  )}

                  {tutor.endereco && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#666666] dark:text-[#cccccc] mb-1">
                        Endereço
                      </h3>
                      <p className="text-lg text-[#333333] dark:text-[#ffffff]">
                        {tutor.endereco}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-2">
                  <Button onClick={() => navigate(`/tutores/${tutor.id}/editar`)} variant="primary">
                    Editar
                  </Button>
                  <Button onClick={() => setShowDeleteTutorModal(true)} variant="danger">
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>🐾 Pets</CardTitle>
                  <Button
                    variant="primary"
                    onClick={() => setShowPetSelector(true)}
                    size="small"
                  >
                    ➕ Adicionar Pet
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {tutor.pets && tutor.pets.length > 0 ? (
                  <div className="space-y-3">
                    {tutor.pets.map((pet) => (
                      <div
                        key={pet.id}
                        className="p-4 bg-[#f5f5f5] dark:bg-[#2d2d2d] rounded-lg transition-colors duration-300"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div
                            className="flex items-center gap-4 flex-1 cursor-pointer"
                            onClick={() => navigate(`/pets/${pet.id}`)}
                          >
                            {pet.foto ? (
                              <img
                                src={pet.foto.url}
                                alt={pet.nome}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff69b4] to-[#bfff00] flex items-center justify-center">
                                <span className="text-2xl">🐾</span>
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-[#333333] dark:text-[#ffffff]">
                                {pet.nome}
                              </p>
                              {pet.raca && (
                                <p className="text-sm text-[#666666] dark:text-[#cccccc]">
                                  {pet.raca}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="danger"
                            onClick={() => setPetToRemove(pet.id)}
                            size="small"
                          >
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-[#666666] dark:text-[#cccccc] py-8">
                    Nenhum pet vinculado ainda
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Modal
          isOpen={showDeletePhotoModal}
          onClose={() => setShowDeletePhotoModal(false)}
          onConfirm={handleRemovePhoto}
          title="Remover Foto"
          message={`Deseja realmente remover a foto de ${tutor.nome}?`}
          confirmText="Remover"
          cancelText="Cancelar"
          isLoading={isDeletingPhoto}
          variant="danger"
        />

        <Modal
          isOpen={showDeleteTutorModal}
          onClose={() => setShowDeleteTutorModal(false)}
          onConfirm={handleDeleteTutor}
          title="Excluir Tutor"
          message={`Deseja realmente excluir ${tutor.nome}? Esta ação não pode ser desfeita.`}
          confirmText="Excluir"
          cancelText="Cancelar"
          isLoading={isDeletingTutor}
          variant="danger"
        />

        <PetSelector
          isOpen={showPetSelector}
          onClose={() => setShowPetSelector(false)}
          onSelect={handleAddPet}
          excludePetIds={tutor.pets?.map(p => p.id) || []}
          isLoading={isAddingPet}
        />

        <Modal
          isOpen={!!petToRemove}
          onClose={() => setPetToRemove(null)}
          onConfirm={handleRemovePet}
          title="Remover Pet"
          message="Deseja realmente desvincular este pet do tutor?"
          confirmText="Remover"
          cancelText="Cancelar"
          isLoading={isRemovingPet}
          variant="danger"
        />
      </div>
    </Layout>
  )
}
