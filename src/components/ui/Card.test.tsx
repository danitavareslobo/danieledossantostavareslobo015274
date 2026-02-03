import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card, CardHeader, CardTitle, CardContent, CardImage } from './Card'

describe('Card', () => {
  it('deve renderizar children', () => {
    render(<Card>Conteúdo do card</Card>)
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument()
  })

  it('deve aplicar classe hoverable', () => {
    const { container } = render(<Card hoverable>Card hover</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('cursor-pointer')
  })

  it('deve chamar onClick quando hoverable', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Card hoverable onClick={handleClick}>Card clicável</Card>)
    await user.click(screen.getByText('Card clicável'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve aplicar padding none', () => {
    const { container } = render(<Card padding="none">Sem padding</Card>)
    const card = container.firstChild
    expect(card).not.toHaveClass('p-4')
    expect(card).not.toHaveClass('p-6')
    expect(card).not.toHaveClass('p-8')
  })

  it('deve aplicar className customizado', () => {
    const { container } = render(<Card className="custom-class">Card</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })
})

describe('CardHeader', () => {
  it('deve renderizar children', () => {
    render(<CardHeader>Cabeçalho</CardHeader>)
    expect(screen.getByText('Cabeçalho')).toBeInTheDocument()
  })
})

describe('CardTitle', () => {
  it('deve renderizar título', () => {
    render(<CardTitle>Título do Card</CardTitle>)
    expect(screen.getByText('Título do Card')).toBeInTheDocument()
  })

  it('deve aplicar className customizado', () => {
    const { container } = render(<CardTitle className="custom">Título</CardTitle>)
    const title = container.firstChild
    expect(title).toHaveClass('custom')
  })
})

describe('CardContent', () => {
  it('deve renderizar conteúdo', () => {
    render(<CardContent>Conteúdo</CardContent>)
    expect(screen.getByText('Conteúdo')).toBeInTheDocument()
  })
})

describe('CardImage', () => {
  it('deve renderizar imagem com src e alt', () => {
    render(<CardImage src="https://example.com/image.jpg" alt="Imagem teste" />)
    const img = screen.getByAltText('Imagem teste')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('deve aplicar classes de estilo', () => {
    render(<CardImage src="test.jpg" alt="Test" />)
    const img = screen.getByAltText('Test')
    expect(img).toHaveClass('w-full')
    expect(img).toHaveClass('object-cover')
  })
})
