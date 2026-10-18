import { formatNumber, formatWeight, toUnit } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import { Modal } from '../../shared/Modal'
import type { CalibrationRow } from '../types'

interface CalibrationModalProps {
  open: boolean
  rows: CalibrationRow[]
  onClose: () => void
}

export function CalibrationModal({ open, rows, onClose }: CalibrationModalProps) {
  const unit = useUnit()
  return (
    <Modal open={open} title="CALIBRAR DISCOS REALES" icon="tune" onClose={onClose}>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
        Introduce el peso verificado en báscula de tus discos para cálculos ultra precisos de 1RM:
      </p>
      <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
        {rows.map((row) => (
          <label
            key={row.id}
            className="flex items-center justify-between p-1.5 bg-surface-container-low rounded comic-stroke-thin"
          >
            <span className="font-label-md text-label-md font-bold">{row.name} {formatWeight(row.nominalKg, unit)}:</span>
            <input
              key={unit}
              type="text"
              defaultValue={`${formatNumber(toUnit(row.measuredKg, unit))} ${unit.toLowerCase()}`}
              className="w-24 text-right p-1 font-headline-sm text-headline-sm bg-white rounded comic-stroke-thin"
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="comic-press w-full py-2.5 mt-3 bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm uppercase rounded comic-stroke shadow-comic-md"
      >
        GUARDAR CALIBRACIÓN
      </button>
    </Modal>
  )
}
