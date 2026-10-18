import { formatWeight } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import { Icon } from '../../shared/Icon'
import { Panel } from '../../shared/Panel'
import { SectionHeading } from '../../shared/SectionHeading'
import type { FractionalPlateConfig, PlateConfig } from '../types'
import { FractionalPlates } from './FractionalPlates'
import { PlateRow } from './PlateRow'

interface PlatesPanelProps {
  plates: PlateConfig[]
  fractionals: FractionalPlateConfig[]
  stock: Record<string, number>
  plateEnabled: Record<string, boolean>
  fractionalEnabled: Record<string, boolean>
  onStockChange: (id: string, value: number) => void
  onPlateEnabledChange: (id: string, value: boolean) => void
  onFractionalEnabledChange: (id: string, value: boolean) => void
  onCalibrate: () => void
}

export function PlatesPanel({
  plates,
  fractionals,
  stock,
  plateEnabled,
  fractionalEnabled,
  onStockChange,
  onPlateEnabledChange,
  onFractionalEnabledChange,
  onCalibrate,
}: PlatesPanelProps) {
  const unit = useUnit()
  return (
    <section className="flex flex-col gap-space-sm">
      <SectionHeading
        icon="radio_button_checked"
        title="1. DISCOS & PLACAS"
        tag="STOCK GYM"
        iconClassName="bg-secondary text-on-secondary"
      />
      <Panel className="flex flex-col gap-3">
        {plates.map((plate) => (
          <PlateRow
            key={plate.id}
            plate={plate}
            stock={stock[plate.id]}
            enabled={plateEnabled[plate.id]}
            onStockChange={(value) => onStockChange(plate.id, value)}
            onEnabledChange={(value) => onPlateEnabledChange(plate.id, value)}
          />
        ))}
        <FractionalPlates plates={fractionals} enabled={fractionalEnabled} onChange={onFractionalEnabledChange} />
        <button
          type="button"
          onClick={onCalibrate}
          className="comic-press w-full mt-2 py-2 px-3 rounded-lg bg-surface text-on-surface font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-2 comic-stroke shadow-comic-sm"
        >
          <Icon name="edit_note" className="text-base" />
          Calibrar pesos reales de disco (ej: {formatWeight(20.4, unit).toLowerCase()})
        </button>
      </Panel>
    </section>
  )
}
