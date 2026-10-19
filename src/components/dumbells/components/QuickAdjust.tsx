import { formatWeight, lbToKg } from '../../../lib/units'
import type { Unit } from '../types'
import { MICRO_LOADS_LB } from '../data'

interface QuickAdjustProps {
  unit: Unit
  onDecrease: () => void
  onIncrease: () => void
  onAddMicro: (lb: number) => void
  onClearMicro: () => void
}

export function QuickAdjust({ unit, onDecrease, onIncrease, onAddMicro, onClearMicro }: QuickAdjustProps) {
  return (
    <div className="bg-surface-container-low rounded-xl p-space-sm shadow-comic-md flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span className="font-headline-sm text-headline-sm uppercase text-on-surface">Ajuste Rápido</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Restar peso"
            onClick={onDecrease}
            className="comic-press size-11 bg-surface-container-lowest text-on-surface rounded-lg shadow-comic-sm flex items-center justify-center font-headline-md text-headline-md"
          >
            -
          </button>
          <button
            type="button"
            aria-label="Sumar peso"
            onClick={onIncrease}
            className="comic-press size-11 bg-primary-container text-on-primary-fixed rounded-lg shadow-comic-sm flex items-center justify-center font-headline-md text-headline-md"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider shrink-0">
          Micro-Cargas:
        </span>
        {MICRO_LOADS_LB.map((lb) => (
          <button
            key={lb}
            type="button"
            onClick={() => onAddMicro(lb)}
            className="comic-press flex-1 py-1.5 bg-surface-container-lowest text-on-surface rounded font-label-sm text-label-sm uppercase shadow-comic-xs active:bg-tertiary-container"
          >
            +{formatWeight(lbToKg(lb), unit)}
          </button>
        ))}
        <button
          type="button"
          onClick={onClearMicro}
          className="px-2 py-1.5 bg-surface-variant text-on-surface-variant rounded font-label-sm text-label-sm uppercase shadow-comic-xs"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
