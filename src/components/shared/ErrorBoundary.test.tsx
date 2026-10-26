import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { STORAGE_KEY } from '../../store/useGymStore'
import { ErrorBoundary } from './ErrorBoundary'

const Boom = () => {
  throw new Error('boom')
}

afterEach(() => vi.restoreAllMocks())

it('shows a fallback and the reset button clears saved data', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  const reload = vi.fn()
  vi.stubGlobal('location', { ...window.location, reload })
  localStorage.setItem(STORAGE_KEY, '{}')
  render(
    <ErrorBoundary>
      <Boom />
    </ErrorBoundary>,
  )
  fireEvent.click(screen.getByRole('button', { name: /restablecer/i }))
  expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  expect(reload).toHaveBeenCalled()
})
