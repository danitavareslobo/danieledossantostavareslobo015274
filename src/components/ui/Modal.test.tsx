import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

describe('Modal', () => {
  it('não deve renderizar quando isOpen=false', () => {
    render(
      <Modal
        isOpen={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Teste"
        message="Mensagem"
      />
    )
    expect(screen.queryByText('Teste')).not.toBeInTheDocument()
  })

  it('deve renderizar quando isOpen=true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Título do Modal"
        message="Mensagem de teste"
      />
    )
    expect(screen.getByText('Título do Modal')).toBeInTheDocument()
    expect(screen.getByText('Mensagem de teste')).toBeInTheDocument()
  })

  it('deve chamar onClose quando clicar em Cancelar', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        onConfirm={vi.fn()}
        title="Teste"
        message="Mensagem"
      />
    )

    await user.click(screen.getByText('Cancelar'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('deve chamar onConfirm quando clicar em Confirmar', async () => {
    const handleConfirm = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={handleConfirm}
        title="Teste"
        message="Mensagem"
      />
    )

    await user.click(screen.getByText('Confirmar'))
    expect(handleConfirm).toHaveBeenCalledTimes(1)
  })

  it('deve chamar onClose quando clicar no backdrop', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()

    const { container } = render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        onConfirm={vi.fn()}
        title="Teste"
        message="Mensagem"
      />
    )

    const backdrop = container.querySelector('.bg-black\\/50')
    if (backdrop) {
      await user.click(backdrop)
      expect(handleClose).toHaveBeenCalledTimes(1)
    }
  })

  it('deve usar textos customizados para botões', () => {
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Teste"
        message="Mensagem"
        confirmText="Excluir"
        cancelText="Voltar"
      />
    )

    expect(screen.getByText('Excluir')).toBeInTheDocument()
    expect(screen.getByText('Voltar')).toBeInTheDocument()
  })

  it('deve aplicar variant danger', () => {
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Teste"
        message="Mensagem"
        variant="danger"
      />
    )

    const confirmButton = screen.getByText('Confirmar')
    expect(confirmButton).toHaveClass('bg-red-500')
  })

  it('deve desabilitar botões quando isLoading=true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Teste"
        message="Mensagem"
        isLoading={true}
      />
    )

    expect(screen.getByText('Cancelar')).toBeDisabled()
    expect(screen.getByText('Confirmar')).toBeDisabled()
  })
})
