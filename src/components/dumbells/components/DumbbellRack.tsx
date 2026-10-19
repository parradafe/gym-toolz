import { cx } from '../../../lib/cx'
import { formatNumber, lbToKg, toUnit } from '../../../lib/units'
import type { Unit } from '../types'

interface DumbbellRackProps {
  /** Selectable weights in lb. */
  weights: number[]
  selectedLb: number
  unit: Unit
  onSelect: (lb: number) => void
}

export function DumbbellRack({ weights, selectedLb, unit, onSelect }: DumbbellRackProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-headline-sm text-headline-sm uppercase text-on-surface">
          Rack de Mancuernas Disponibles
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">Toca para seleccionar</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {weights.map((lb) => {
          const selected = lb === selectedLb
          return (
            <button
              key={lb}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(lb)}
              className={cx(
                'comic-press py-2.5 rounded-xl shadow-comic-md flex flex-col items-center justify-center',
                selected
                  ? 'relative -rotate-1 bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container-lowest text-on-surface',
              )}
            >
              {selected && (
                <span className="absolute -top-1.5 -right-1.5 size-5 bg-secondary text-on-secondary rounded-full flex items-center justify-center text-xs font-bold shadow-comic-xs">
                  ✓
                </span>
              )}
              <span className={cx('font-headline-sm text-headline-sm', selected && 'font-black')}>
                {formatNumber(toUnit(lbToKg(lb), unit))}
              </span>
              <span
                className={cx(
                  'font-label-sm text-label-sm -mt-1',
                  selected ? 'font-bold' : 'text-on-surface-variant',
                )}
              >
                {unit}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
