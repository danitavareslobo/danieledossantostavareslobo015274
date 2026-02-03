import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('deve renderizar com o texto correto', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByText('Clique aqui')).toBeInTheDocument()
  })

  it('deve chamar onClick quando clicado', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Clique</Button>)
    await user.click(screen.getByText('Clique'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve aplicar variant primary por padrão', () => {
    render(<Button>Botão</Button>)
    const button = screen.getByText('Botão')
    expect(button).toHaveClass('bg-[#ff69b4]')
  })

  it('deve aplicar variant danger', () => {
    render(<Button variant="danger">Excluir</Button>)
    const button = screen.getByText('Excluir')
    expect(button).toHaveClass('bg-red-500')
  })

  it('deve aplicar variant outline', () => {
    render(<Button variant="outline">Cancelar</Button>)
    const button = screen.getByText('Cancelar')
    expect(button).toHaveClass('border-2')
  })

  it('deve estar desabilitado quando disabled=true', () => {
    render(<Button disabled>Botão</Button>)
    const button = screen.getByText('Botão')
    expect(button).toBeDisabled()
  })

  it('deve mostrar estado de loading', () => {
    render(<Button isLoading>Salvando</Button>)
    const button = screen.getByText('Salvando')
    expect(button).toBeDisabled()
  })

  it('não deve chamar onClick quando desabilitado', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick} disabled>Botão</Button>)
    await user.click(screen.getByText('Botão'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('deve aplicar tamanho small', () => {
    render(<Button size="small">Pequeno</Button>)
    const button = screen.getByText('Pequeno')
    expect(button).toHaveClass('px-3')
  })

  it('deve aplicar fullWidth', () => {
    render(<Button fullWidth>Botão largo</Button>)
    const button = screen.getByText('Botão largo')
    expect(button).toHaveClass('w-full')
  })
})
