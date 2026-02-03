import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('deve renderizar com tamanho medium por padrão', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('.w-8')
    expect(spinner).toBeInTheDocument()
  })

  it('deve renderizar com tamanho small', () => {
    const { container } = render(<Spinner size="small" />)
    const spinner = container.querySelector('.w-4')
    expect(spinner).toBeInTheDocument()
  })

  it('deve renderizar com tamanho large', () => {
    const { container } = render(<Spinner size="large" />)
    const spinner = container.querySelector('.w-16')
    expect(spinner).toBeInTheDocument()
  })

  it('deve ter classe de animação', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('deve ter cor rosa', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('.border-\\[\\#ff69b4\\]')
    expect(spinner).toBeInTheDocument()
  })
})
