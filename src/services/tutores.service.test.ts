import { describe, it, expect, vi, beforeEach } from 'vitest'
import { tutoresService } from './tutores.service'
import { api } from './api'

vi.mock('./api')

describe('tutoresService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('listar', () => {
    it('deve listar tutores sem filtros', async () => {
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

      const result = await tutoresService.listar()

      expect(api.get).toHaveBeenCalledWith('/v1/tutores?')
      expect(result).toEqual(mockResponse.data)
    })

    it('deve listar tutores com filtros', async () => {
      const mockResponse = {
        data: {
          content: [{ id: 1, nome: 'João Silva', telefone: '11999999999' }],
          page: 0,
          size: 10,
          total: 1,
          pageCount: 1,
        },
      }

      vi.mocked(api.get).mockResolvedValue(mockResponse)

      const result = await tutoresService.listar({
        nome: 'João',
        telefone: '11999999999',
        page: 0,
        size: 10,
      })

      expect(api.get).toHaveBeenCalledWith('/v1/tutores?nome=Jo%C3%A3o&telefone=11999999999&page=0&size=10')
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('buscarPorId', () => {
    it('deve buscar tutor por ID', async () => {
      const mockTutor = {
        id: 1,
        nome: 'João Silva',
        telefone: '11999999999',
        email: 'joao@example.com',
        pets: [],
      }

      const mockResponse = { data: mockTutor }
      vi.mocked(api.get).mockResolvedValue(mockResponse)

      const result = await tutoresService.buscarPorId(1)

      expect(api.get).toHaveBeenCalledWith('/v1/tutores/1')
      expect(result).toEqual(mockTutor)
    })
  })

  describe('criar', () => {
    it('deve criar um novo tutor', async () => {
      const novoTutor = {
        nome: 'Maria Santos',
        telefone: '11988888888',
        email: 'maria@example.com',
      }

      const mockResponse = {
        data: { id: 1, ...novoTutor },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await tutoresService.criar(novoTutor)

      expect(api.post).toHaveBeenCalledWith('/v1/tutores', novoTutor)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('atualizar', () => {
    it('deve atualizar um tutor existente', async () => {
      const dadosAtualizados = {
        nome: 'João Silva Atualizado',
        telefone: '11999999999',
        email: 'joao.novo@example.com',
      }

      const mockResponse = {
        data: { id: 1, ...dadosAtualizados },
      }

      vi.mocked(api.put).mockResolvedValue(mockResponse)

      const result = await tutoresService.atualizar(1, dadosAtualizados)

      expect(api.put).toHaveBeenCalledWith('/v1/tutores/1', dadosAtualizados)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('deletar', () => {
    it('deve deletar um tutor', async () => {
      vi.mocked(api.delete).mockResolvedValue({})

      await tutoresService.deletar(1)

      expect(api.delete).toHaveBeenCalledWith('/v1/tutores/1')
    })
  })

  describe('adicionarFoto', () => {
    it('deve adicionar foto ao tutor', async () => {
      const file = new File(['foto'], 'tutor.jpg', { type: 'image/jpeg' })
      const mockFoto = {
        id: 1,
        nome: 'tutor.jpg',
        contentType: 'image/jpeg',
        url: 'https://example.com/tutor.jpg',
      }

      const mockResponse = { data: mockFoto }
      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await tutoresService.adicionarFoto(1, file)

      expect(api.post).toHaveBeenCalledWith(
        '/v1/tutores/1/fotos',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      expect(result).toEqual(mockFoto)
    })
  })

  describe('removerFoto', () => {
    it('deve remover foto do tutor', async () => {
      vi.mocked(api.delete).mockResolvedValue({})

      await tutoresService.removerFoto(1, 2)

      expect(api.delete).toHaveBeenCalledWith('/v1/tutores/1/fotos/2')
    })
  })

  describe('adicionarPet', () => {
    it('deve adicionar pet ao tutor', async () => {
      vi.mocked(api.post).mockResolvedValue({})

      await tutoresService.adicionarPet(1, 5)

      expect(api.post).toHaveBeenCalledWith('/v1/tutores/1/pets/5')
    })
  })

  describe('removerPet', () => {
    it('deve remover pet do tutor', async () => {
      vi.mocked(api.delete).mockResolvedValue({})

      await tutoresService.removerPet(1, 5)

      expect(api.delete).toHaveBeenCalledWith('/v1/tutores/1/pets/5')
    })
  })
})
