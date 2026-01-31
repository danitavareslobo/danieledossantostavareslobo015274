import { api } from './api'
import type { PaginatedResponse } from '../types/api'
import type {
  Pet,
  PetCompleto,
  CreatePetRequest,
  UpdatePetRequest,
  PetFilters,
  Foto,
} from '../types/pet'

export const petsService = {
  async listar(filters?: PetFilters): Promise<PaginatedResponse<Pet>> {
    const params = new URLSearchParams()

    if (filters?.nome) params.append('nome', filters.nome)
    if (filters?.raca) params.append('raca', filters.raca)
    if (filters?.page !== undefined) params.append('page', filters.page.toString())
    if (filters?.size !== undefined) params.append('size', filters.size.toString())

    const response = await api.get<PaginatedResponse<Pet>>(`/v1/pets?${params.toString()}`)
    return response.data
  },

  async buscarPorId(id: number): Promise<PetCompleto> {
    const response = await api.get<PetCompleto>(`/v1/pets/${id}`)
    return response.data
  },

  async criar(data: CreatePetRequest): Promise<Pet> {
    const response = await api.post<Pet>('/v1/pets', data)
    return response.data
  },

  async atualizar(id: number, data: UpdatePetRequest): Promise<Pet> {
    const response = await api.put<Pet>(`/v1/pets/${id}`, data)
    return response.data
  },

  async deletar(id: number): Promise<void> {
    await api.delete(`/v1/pets/${id}`)
  },

  async adicionarFoto(id: number, file: File): Promise<Foto> {
    const formData = new FormData()
    formData.append('foto', file)

    const response = await api.post<Foto>(`/v1/pets/${id}/fotos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async removerFoto(petId: number, fotoId: number): Promise<void> {
    await api.delete(`/v1/pets/${petId}/fotos/${fotoId}`)
  },
}
