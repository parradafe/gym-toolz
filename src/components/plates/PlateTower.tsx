import type { Unit } from '../shared/UnitSwitch'
import { Chip } from '../shared/Chip'
import { Icon } from '../shared/Icon'
import { MicroWeightSelector } from './components/MicroWeightSelector'
import { PlateStack } from './components/PlateStack'
import { PulleyTop } from './components/PulleyTop'
import { MICRO_OPTIONS, PLATE_COUNT } from './data'

interface PlateTowerProps {
  /** 1-based plate the pin is on. */
  plateIndex: number
  microKg: number
  unit: Unit
  onSelectPlate: (index: number) => void
  onSelectMicro: (kg: number) => void
}

const PLATES = Array.from({ length: PLATE_COUNT }, (_, i) => i + 1)

export function PlateTower({ plateIndex, microKg, unit, onSelectPlate, onSelectMicro }: PlateTowerProps) {
  return (
    <section className="w-full rounded-xl bg-surface-container-low p-space-md comic-panel">
      <div className="flex items-center justify-between mb-space-sm">
        <div className="flex items-center gap-space-xs">
          <Icon name="reorder" className="text-primary text-xl" />
          <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">Torre de Placas</h3>
        </div>
        <Chip tone="primary" className="uppercase">
          Pasador en placa #{plateIndex}
        </Chip>
      </div>
      <div className="relative w-full bg-surface-container-lowest rounded-xl p-space-md comic-card overflow-hidden flex flex-col items-center">
        <PulleyTop />
        <PlateStack plates={PLATES} selectedIndex={plateIndex} unit={unit} onSelect={onSelectPlate} />
        <MicroWeightSelector options={MICRO_OPTIONS} selectedKg={microKg} unit={unit} onSelect={onSelectMicro} />
      </div>
    </section>
  )
}
