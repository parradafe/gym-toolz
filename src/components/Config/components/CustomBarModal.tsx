import { useState } from 'react'
import { Modal } from '../../shared/Modal'
import { LB_PER_KG } from '../../../lib/units'

interface CustomBarModalProps {
  open: boolean
  onClose: () => void
  onAdd: (name: string, kg: number) => void
}

const fieldClassName =
  'w-full p-2.5 rounded bg-surface-container-low text-on-surface comic-stroke focus:bg-white focus:outline-none'
const labelClassName = 'font-label-sm text-label-sm uppercase font-bold text-on-surface block mb-1'

const round = (value: number) => (Math.round(value * 100) / 100).toString()

export function CustomBarModal({ open, onClose, onAdd }: CustomBarModalProps) {
  const [name, setName] = useState('')
  const [kg, setKg] = useState('')
  const [lbs, setLbs] = useState('')

  const changeKg = (value: string) => {
    setKg(value)
    setLbs(value === '' ? '' : round(Number(value) * LB_PER_KG))
  }

  const changeLbs = (value: string) => {
    setLbs(value)
    setKg(value === '' ? '' : round(Number(value) / LB_PER_KG))
  }

  const submit = () => {
    const weight = Number(kg)
    if (name.trim() && weight > 0) {
      onAdd(name.trim(), weight)
      setName('')
      setKg('')
      setLbs('')
    }
    onClose()
  }

  return (
    <Modal open={open} title="NUEVA BARRA CUSTOM" icon="fitness_center" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="custom-bar-name" className={labelClassName}>
            Nombre de la barra:
          </label>
          <input
            id="custom-bar-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Barra Multipower Smith, Safety Squat"
            className={`${fieldClassName} font-body-md text-body-md`}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="custom-bar-kg" className={labelClassName}>
              Peso en KG:
            </label>
            <input
              id="custom-bar-kg"
              type="number"
              value={kg}
              onChange={(e) => changeKg(e.target.value)}
              placeholder="20.0"
              className={`${fieldClassName} font-headline-sm text-headline-sm`}
            />
          </div>
          <div>
            <label htmlFor="custom-bar-lbs" className={labelClassName}>
              Equivalente LBS:
            </label>
            <input
              id="custom-bar-lbs"
              type="number"
              value={lbs}
              onChange={(e) => changeLbs(e.target.value)}
              placeholder="44.0"
              className={`${fieldClassName} font-headline-sm text-headline-sm`}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={submit}
          className="comic-press w-full py-3 mt-2 bg-primary-container text-on-primary-fixed font-headline-sm text-headline-sm uppercase rounded comic-stroke shadow-comic-md"
        >
          ¡AÑADIR A LA LISTA!
        </button>
      </div>
    </Modal>
  )
}
