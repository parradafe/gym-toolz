import { formatWeight, lbToKg, toUnit } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import type { PlateWeight } from '../types'

interface PlateCardProps {
  weight: PlateWeight
  circleClassName: string
  quantity: number
  canAdd?: boolean
  onAdd: (weight: PlateWeight) => void
  onRemove: (weight: PlateWeight) => void
}

export function PlateCard({
  weight,
  circleClassName,
  quantity,
  canAdd = true,
  onAdd,
  onRemove,
}: PlateCardProps) {
  const unit = useUnit()
  const kg = lbToKg(weight)
  const otherUnit = unit === 'KG' ? 'LBS' : 'KG'
  return (
    <div className="bg-surface px-2 py-2 rounded-xl comic-stroke shadow-comic-md flex items-center justify-between">
      <div className="flex items-center gap-1.5 min-w-0">
        <div
          className={`${circleClassName} size-8 shrink-0 rounded-full comic-stroke shadow-comic-sm flex items-center justify-center font-headline-sm text-headline-sm`}
        >
          {Math.round(toUnit(kg, unit))}
        </div>
        <div className="min-w-0">
          <span className="font-label-md text-label-md text-on-surface font-bold block leading-none truncate">
            {formatWeight(kg, unit)}
          </span>
          <span className="text-micro font-bold text-on-surface-variant leading-none font-label-sm">
            {formatWeight(kg, otherUnit)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-1">
        <button
          type="button"
          aria-label={`Quitar disco de ${formatWeight(kg, unit)}`}
          onClick={() => onRemove(weight)}
          className="comic-chip comic-press size-7 bg-surface-container text-on-surface flex items-center justify-center font-bold text-base shadow-comic-sm"
        >
          -
        </button>
        <span className="font-headline-sm text-headline-sm w-5 h-7 flex items-center justify-center bg-surface-container-lowest rounded text-center text-on-surface border border-ink/30">
          {quantity}
        </span>
        <button
          type="button"
          aria-label={`Agregar disco de ${formatWeight(kg, unit)}`}
          disabled={!canAdd}
          onClick={() => onAdd(weight)}
          className="disabled:opacity-40 comic-chip comic-press size-7 bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-base shadow-comic-sm"
        >
          +
        </button>
      </div>
    </div>
  )
}
