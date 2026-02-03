import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  it('deve retornar o valor inicial imediatamente', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('deve fazer debounce do valor após o delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 100 } }
    )

    expect(result.current).toBe('initial')

    rerender({ value: 'updated', delay: 100 })
    expect(result.current).toBe('initial')

    await waitFor(() => {
      expect(result.current).toBe('updated')
    }, { timeout: 200 })
  })

  it('deve funcionar com diferentes tipos de valores', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 50 } }
    )

    expect(result.current).toBe(0)

    rerender({ value: 42, delay: 50 })

    await waitFor(() => {
      expect(result.current).toBe(42)
    }, { timeout: 100 })
  })

  it('deve respeitar diferentes valores de delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 150 } }
    )

    rerender({ value: 'new value', delay: 150 })

    await waitFor(() => {
      expect(result.current).toBe('new value')
    }, { timeout: 200 })
  })
})
