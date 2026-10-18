import { formatPlateTag } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import { Icon } from '../../shared/Icon'
import type { FractionalPlate, PlateCardData, PlatesPerSide, PlateWeight } from '../types'
import { PlateCard } from './PlateCard'

interface PlateControlsProps {
  plateCards: PlateCardData[]
  fractionals: FractionalPlate[]
  plates: PlatesPerSide
  canAdd: (weight: PlateWeight) => boolean
  onAdd: (weight: PlateWeight) => void
  onRemove: (weight: PlateWeight) => void
}

export function PlateControls({ plateCards, fractionals, plates, canAdd, onAdd, onRemove }: PlateControlsProps) {
  const unit = useUnit()
  return (
    <section className="px-margin mt-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">
          Discos Disponibles
        </h2>
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
          + / - por lado
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {plateCards.map((card) => (
          <PlateCard
            key={card.weight}
            {...card}
            quantity={plates[card.weight]}
            canAdd={canAdd(card.weight)}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
        <div className="bg-surface-container-lowest px-2 py-2 rounded-xl comic-stroke shadow-comic-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface font-bold uppercase truncate">
              Fraccionales
            </span>
            <Icon name="tune" className="text-outline text-sm" />
          </div>
          <div className="grid grid-cols-3 gap-1 mt-1">
            {fractionals.map((fractional) => (
              <button
                key={fractional.weight}
                type="button"
                disabled={!canAdd(fractional.weight)}
                onClick={() => onAdd(fractional.weight)}
                className="comic-chip comic-press py-1 disabled:opacity-40 bg-surface-container text-center font-label-sm text-micro font-bold shadow-comic-xs leading-none"
              >
                +{formatPlateTag(fractional.weight, unit)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
