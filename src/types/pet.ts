export interface Foto {
  id: number
  nome: string
  contentType: string
  url: string
}

export interface Pet {
  id: number
  nome: string
  raca?: string
  idade?: number
  foto?: Foto
}

export interface Tutor {
  id: number
  nome: string
  telefone: string
  email?: string
  endereco?: string
  cpf?: number
  foto?: Foto
}

export interface PetCompleto extends Pet {
  tutores?: Tutor[]
}

export interface CreatePetRequest {
  nome: string
  raca?: string
  idade?: number
}

export interface UpdatePetRequest {
  nome: string
  raca?: string
  idade?: number
}

export interface PetFilters {
  nome?: string
  raca?: string
  page?: number
  size?: number
}
