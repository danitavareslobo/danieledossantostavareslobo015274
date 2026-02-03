import { describe, it, expect, vi, beforeEach } from 'vitest'
import { petsService } from './pets.service'
import { api } from './api'

vi.mock('./api')

describe('petsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('listar', () => {
    it('deve listar pets sem filtros', async () => {
      const mockResponse = {
        data: {
          content: [],
          page: 0,
          size: 10,
          total: 0,
          pageCount: 0,
        },
      }

      vi.mocked(api.get).mockResolvedValue(mockResponse)

      const result = await petsService.listar()

      expect(api.get).toHaveBeenCalledWith('/v1/pets?')
      expect(result).toEqual(mockResponse.data)
    })

    it('deve listar pets com filtros', async () => {
      const mockResponse = {
        data: {
          content: [{ id: 1, nome: 'Rex' }],
          page: 0,
          size: 10,
          total: 1,
          pageCount: 1,
        },
      }

      vi.mocked(api.get).mockResolvedValue(mockResponse)

      const result = await petsService.listar({
        nome: 'Rex',
        raca: 'Labrador',
        page: 0,
        size: 10,
      })

      expect(api.get).toHaveBeenCalledWith('/v1/pets?nome=Rex&raca=Labrador&page=0&size=10')
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('buscarPorId', () => {
    it('deve buscar pet por ID', async () => {
      const mockPet = {
        id: 1,
        nome: 'Rex',
        raca: 'Labrador',
        idade: 3,
        tutores: [],
      }

      const mockResponse = { data: mockPet }
      vi.mocked(api.get).mockResolvedValue(mockResponse)

      const result = await petsService.buscarPorId(1)

      expect(api.get).toHaveBeenCalledWith('/v1/pets/1')
      expect(result).toEqual(mockPet)
    })
  })

  describe('criar', () => {
    it('deve criar um novo pet', async () => {
      const novoPet = {
        nome: 'Max',
        raca: 'Golden Retriever',
        idade: 2,
      }

      const mockResponse = {
        data: { id: 1, ...novoPet },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await petsService.criar(novoPet)

      expect(api.post).toHaveBeenCalledWith('/v1/pets', novoPet)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('atualizar', () => {
    it('deve atualizar um pet existente', async () => {
      const dadosAtualizados = {
        nome: 'Rex Atualizado',
        raca: 'Labrador',
        idade: 4,
      }

      const mockResponse = {
        data: { id: 1, ...dadosAtualizados },
      }

      vi.mocked(api.put).mockResolvedValue(mockResponse)

      const result = await petsService.atualizar(1, dadosAtualizados)

      expect(api.put).toHaveBeenCalledWith('/v1/pets/1', dadosAtualizados)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('deletar', () => {
    it('deve deletar um pet', async () => {
      vi.mocked(api.delete).mockResolvedValue({})

      await petsService.deletar(1)

      expect(api.delete).toHaveBeenCalledWith('/v1/pets/1')
    })
  })

  describe('adicionarFoto', () => {
    it('deve adicionar foto ao pet', async () => {
      const file = new File(['foto'], 'pet.jpg', { type: 'image/jpeg' })
      const mockFoto = {
        id: 1,
        nome: 'pet.jpg',
        contentType: 'image/jpeg',
        url: 'https://example.com/pet.jpg',
      }

      const mockResponse = { data: mockFoto }
      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await petsService.adicionarFoto(1, file)

      expect(api.post).toHaveBeenCalledWith(
        '/v1/pets/1/fotos',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      expect(result).toEqual(mockFoto)
    })
  })

  describe('removerFoto', () => {
    it('deve remover foto do pet', async () => {
      vi.mocked(api.delete).mockResolvedValue({})

      await petsService.removerFoto(1, 2)

      expect(api.delete).toHaveBeenCalledWith('/v1/pets/1/fotos/2')
    })
  })
})
