import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { CustomBarModal } from './CustomBarModal'

const setup = () => {
  const onAdd = vi.fn()
  render(<CustomBarModal open onClose={() => {}} onAdd={onAdd} />)
  return onAdd
}
const fill = (name: string, kg: string) => {
  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: name } })
  fireEvent.change(screen.getByLabelText(/peso en kg/i), { target: { value: kg } })
  fireEvent.click(screen.getByRole('button', { name: /añadir/i }))
}

it('rejects out-of-range weights and shows an error', () => {
  const onAdd = setup()
  fill('Smith', '1e999')
  expect(onAdd).not.toHaveBeenCalled()
  expect(screen.getByRole('alert')).toBeTruthy()
})

it('accepts a valid bar', () => {
  const onAdd = setup()
  fill('Barra', '20')
  expect(onAdd).toHaveBeenCalledWith('Barra', 20)
})
