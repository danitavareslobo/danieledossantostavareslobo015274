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

export interface PetCompleto extends Pet {
  tutores?: Array<{
    id: number
    nome: string
    telefone: string
    email?: string
    endereco?: string
    cpf?: string
    foto?: Foto
  }>
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
