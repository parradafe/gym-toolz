import { useEffect, useRef, useState } from 'react'
import { cx } from '../../../lib/cx'
import { formatWeight, lbToKg, toUnit } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import { Icon } from '../../shared/Icon'
import { Stepper } from '../../shared/Stepper'
import { Toggle } from '../../shared/Toggle'
import type { PlateConfig } from '../types'

interface PlateRowProps {
  plate: PlateConfig
  stock: number
  enabled: boolean
  onStockChange: (value: number) => void
  onEnabledChange: (value: boolean) => void
}

export function PlateRow({ plate, stock, enabled, onStockChange, onEnabledChange }: PlateRowProps) {
  const unit = useUnit()
  const kg = lbToKg(plate.weight)
  const otherUnit = unit === 'KG' ? 'LBS' : 'KG'
  const [pulse, setPulse] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleColorClick = () => {
    clearTimeout(timer.current)
    setPulse(true)
    timer.current = setTimeout(() => setPulse(false), 150)
  }

  return (
    <div className="p-2.5 rounded-lg bg-surface-container-low transition-all comic-stroke">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            title="Cambiar color"
            aria-label={`Cambiar color del disco de ${formatWeight(kg, unit)}`}
            onClick={handleColorClick}
            className={cx(
              'relative size-12 rounded-full flex items-center justify-center font-headline-sm text-headline-sm font-black comic-stroke-bold shadow-comic-sm active:translate-y-0.5 transition-transform',
              plate.circleClassName,
              pulse && 'scale-110',
            )}
          >
            {Math.round(toUnit(kg, unit))}
            <span
              className={cx(
                '-bottom-1 -right-1 absolute size-4 rounded-full flex items-center justify-center comic-stroke-thin shadow-comic-xs',
                plate.badgeClassName,
              )}
            >
              <Icon name="palette" className="text-micro text-on-surface" />
            </span>
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm text-on-surface uppercase font-black">
                {formatWeight(kg, unit)}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">({formatWeight(kg, otherUnit)})</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{plate.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Pares</span>
            <Stepper value={stock} onChange={onStockChange} label={`disco de ${formatWeight(kg, unit)}`} />
          </div>
          <Toggle checked={enabled} onChange={onEnabledChange} label={`Usar disco de ${formatWeight(kg, unit)}`} />
        </div>
      </div>
    </div>
  )
}
