import { cx } from '../../../lib/cx'
import { formatWeight } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import { Chip } from '../../shared/Chip'
import { Icon } from '../../shared/Icon'
import type { BarConfig } from '../../Config/types'

interface BarTypeSelectorProps {
  bars: BarConfig[]
  selectedId: string
  onSelect: (id: string) => void
}

export function BarTypeSelector({ bars, selectedId, onSelect }: BarTypeSelectorProps) {
  const unit = useUnit()
  return (
    <section className="px-margin mt-3">
      <div className="bg-surface-container-low p-3 rounded-xl comic-stroke-bold shadow-comic-md">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm uppercase text-on-surface-variant flex items-center gap-1">
            <Icon name="hardware" className="text-sm" />
            Tipo de Barra
          </span>
          <Chip tone="primary">Incluida en el cálculo</Chip>
        </div>
        {bars.length === 0 && (
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            No hay barras activas. Actívalas en Config.
          </p>
        )}
        <div className="grid grid-cols-2 gap-2">
          {bars.map((bar) => {
            const selected = bar.id === selectedId
            return (
              <button
                key={bar.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(bar.id)}
                className={cx(
                  'comic-card text-left p-2.5 text-on-surface transition-all flex flex-col justify-between',
                  selected ? 'bg-surface-container-highest' : 'bg-surface',
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    {formatWeight(bar.kg, unit)}
                  </span>
                  <Icon
                    name={selected ? 'check_circle' : 'radio_button_unchecked'}
                    className={cx('text-base', selected ? 'text-primary' : 'text-outline-variant')}
                  />
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                  {bar.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
