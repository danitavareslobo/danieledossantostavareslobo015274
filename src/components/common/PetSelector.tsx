import { useState, useEffect } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'
import { petsService } from '../../services/pets.service'
import { handleApiError } from '../../utils/errorHandler'
import type { Pet } from '../../types/pet'

interface PetSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (petId: number) => void
  excludePetIds?: number[]
  isLoading?: boolean
}

export function PetSelector({ isOpen, onClose, onSelect, excludePetIds = [], isLoading = false }: PetSelectorProps) {
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoadingPets, setIsLoadingPets] = useState(false)
  const [busca, setBusca] = useState('')
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      carregarPets()
    }
  }, [isOpen])

  const carregarPets = async () => {
    try {
      setIsLoadingPets(true)
      const data = await petsService.listar({ page: 0, size: 100 })
      const petsDisponiveis = data.content.filter(pet => !excludePetIds.includes(pet.id))
      setPets(petsDisponiveis)
    } catch (err) {
      handleApiError(err)
    } finally {
      setIsLoadingPets(false)
    }
  }

  const petsFiltrados = pets.filter(pet =>
    pet.nome.toLowerCase().includes(busca.toLowerCase()) ||
    pet.raca?.toLowerCase().includes(busca.toLowerCase())
  )

  const handleConfirm = () => {
    if (selectedPetId) {
      onSelect(selectedPetId)
      setSelectedPetId(null)
      setBusca('')
    }
  }

  const handleClose = () => {
    setSelectedPetId(null)
    setBusca('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-[#ffffff] dark:bg-[#1a1a1a] rounded-lg shadow-2xl max-w-2xl w-full mx-4 p-6 border border-[#cccccc] dark:border-[#666666]">
        <h2 className="text-2xl font-bold mb-4 text-[#333333] dark:text-[#ffffff]">
          Adicionar Pet
        </h2>

        <div className="mb-4">
          <Input
            placeholder="Buscar por nome ou raça"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            fullWidth
          />
        </div>

        <div className="max-h-96 overflow-y-auto mb-6">
          {isLoadingPets ? (
            <p className="text-center text-[#666666] dark:text-[#cccccc] py-8">
              Carregando pets...
            </p>
          ) : petsFiltrados.length === 0 ? (
            <p className="text-center text-[#666666] dark:text-[#cccccc] py-8">
              Nenhum pet disponível
            </p>
          ) : (
            <div className="space-y-2">
              {petsFiltrados.map((pet) => (
                <div
                  key={pet.id}
                  onClick={() => setSelectedPetId(pet.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 ${
                    selectedPetId === pet.id
                      ? 'bg-[#ff69b4] dark:bg-[#ff1493] text-white'
                      : 'bg-[#f5f5f5] dark:bg-[#2d2d2d] hover:bg-[#e5e5e5] dark:hover:bg-[#404040]'
                  }`}
                >
                  <div className="flex items-center gap-4">
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
                      <p className={`font-semibold ${selectedPetId === pet.id ? 'text-white' : 'text-[#333333] dark:text-[#ffffff]'}`}>
                        {pet.nome}
                      </p>
                      {pet.raca && (
                        <p className={`text-sm ${selectedPetId === pet.id ? 'text-white/90' : 'text-[#666666] dark:text-[#cccccc]'}`}>
                          {pet.raca}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            isLoading={isLoading}
            disabled={isLoading || !selectedPetId}
          >
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  )
}
