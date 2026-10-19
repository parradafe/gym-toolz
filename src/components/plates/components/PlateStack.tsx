import type { Unit } from '../../shared/UnitSwitch'
import { plateWeightKg } from '../utils'
import { PlateRow } from './PlateRow'

interface PlateStackProps {
  plates: number[]
  selectedIndex: number
  unit: Unit
  onSelect: (index: number) => void
}

export function PlateStack({ plates, selectedIndex, unit, onSelect }: PlateStackProps) {
  return (
    <div className="w-full max-w-70 flex flex-col gap-1 relative py-1">
      {/* Vertical guide rods */}
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-surface-container-highest pointer-events-none" />
      <div className="absolute right-6 top-0 bottom-0 w-1 bg-surface-container-highest pointer-events-none" />
      {/* Center selector rod */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-outline-variant/60 pointer-events-none" />
      {plates.map((index) => (
        <PlateRow
          key={index}
          index={index}
          weightKg={plateWeightKg(index)}
          unit={unit}
          selected={index === selectedIndex}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
