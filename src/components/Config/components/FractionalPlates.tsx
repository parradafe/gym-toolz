import { cx } from '../../../lib/cx'
import { formatNumber, formatWeight, toUnit } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import type { FractionalPlateConfig } from '../types'

interface FractionalPlatesProps {
  plates: FractionalPlateConfig[]
  enabled: Record<string, boolean>
  onChange: (id: string, value: boolean) => void
}

export function FractionalPlates({ plates, enabled, onChange }: FractionalPlatesProps) {
  const unit = useUnit()
  return (
    <div className="pt-2 border-t-[1.5px] border-dashed border-ink">
      <span className="font-label-md text-label-md uppercase text-on-surface font-black tracking-wide block mb-2">
        Discos Pequeños &amp; Fraccionales:
      </span>
      <div className="grid grid-cols-2 gap-2">
        {plates.map((plate) => (
          <label
            key={plate.id}
            className="flex items-center justify-between p-2 rounded bg-surface-container-lowest comic-stroke-thin shadow-comic-sm cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className={cx(
                  'size-6 rounded-full font-black flex items-center justify-center comic-stroke',
                  plate.discClassName,
                )}
              >
                {formatNumber(toUnit(plate.weight, unit))}
              </div>
              <span className="font-label-md text-label-md font-bold">{formatWeight(plate.weight, unit)}</span>
            </div>
            <input
              type="checkbox"
              aria-label={`Usar disco de ${formatWeight(plate.weight, unit)}`}
              checked={enabled[plate.id]}
              onChange={(e) => onChange(plate.id, e.target.checked)}
              className="size-5 cursor-pointer"
            />
          </label>
        ))}
      </div>
    </div>
  )
}
