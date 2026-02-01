import { api } from './api'
import type { PaginatedResponse } from '../types/api'
import type {
  Tutor,
  TutorCompleto,
  CreateTutorRequest,
  UpdateTutorRequest,
  TutorFilters,
} from '../types/tutor'
import type { Foto } from '../types/pet'

export const tutoresService = {
  async listar(filters?: TutorFilters): Promise<PaginatedResponse<Tutor>> {
    const params = new URLSearchParams()

    if (filters?.nome) params.append('nome', filters.nome)
    if (filters?.telefone) params.append('telefone', filters.telefone)
    if (filters?.page !== undefined) params.append('page', filters.page.toString())
    if (filters?.size !== undefined) params.append('size', filters.size.toString())

    const response = await api.get<PaginatedResponse<Tutor>>(`/v1/tutores?${params.toString()}`)
    return response.data
  },

  async buscarPorId(id: number): Promise<TutorCompleto> {
    const response = await api.get<TutorCompleto>(`/v1/tutores/${id}`)
    return response.data
  },

  async criar(data: CreateTutorRequest): Promise<Tutor> {
    const response = await api.post<Tutor>('/v1/tutores', data)
    return response.data
  },

  async atualizar(id: number, data: UpdateTutorRequest): Promise<Tutor> {
    const response = await api.put<Tutor>(`/v1/tutores/${id}`, data)
    return response.data
  },

  async deletar(id: number): Promise<void> {
    await api.delete(`/v1/tutores/${id}`)
  },

  async adicionarFoto(id: number, file: File): Promise<Foto> {
    const formData = new FormData()
    formData.append('foto', file)

    const response = await api.post<Foto>(`/v1/tutores/${id}/fotos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async removerFoto(tutorId: number, fotoId: number): Promise<void> {
    await api.delete(`/v1/tutores/${tutorId}/fotos/${fotoId}`)
  },

  async adicionarPet(tutorId: number, petId: number): Promise<void> {
    await api.post(`/v1/tutores/${tutorId}/pets/${petId}`)
  },

  async removerPet(tutorId: number, petId: number): Promise<void> {
    await api.delete(`/v1/tutores/${tutorId}/pets/${petId}`)
  },
}
