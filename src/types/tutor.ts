import type { Foto, Pet } from './pet'

export interface Tutor {
  id: number
  nome: string
  telefone: string
  email?: string
  endereco?: string
  cpf?: string
  foto?: Foto
}

export interface TutorCompleto extends Tutor {
  pets?: Pet[]
}

export interface CreateTutorRequest {
  nome: string
  telefone: string
  email?: string
  endereco?: string
  cpf?: string
}

export interface UpdateTutorRequest {
  nome: string
  telefone: string
  email?: string
  endereco?: string
  cpf?: string
}

export interface TutorFilters {
  nome?: string
  telefone?: string
  page?: number
  size?: number
}
