import { formatBoth } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import { Icon } from '../../shared/Icon'
import { Panel } from '../../shared/Panel'
import { SectionHeading } from '../../shared/SectionHeading'
import type { BarConfig } from '../types'

interface BarsPanelProps {
  bars: BarConfig[]
  active: Record<string, boolean>
  onActiveChange: (id: string, value: boolean) => void
  onAddCustom: () => void
}

export function BarsPanel({ bars, active, onActiveChange, onAddCustom }: BarsPanelProps) {
  const unit = useUnit()
  const activeCount = bars.filter((bar) => active[bar.id]).length

  return (
    <section className="flex flex-col gap-space-sm">
      <SectionHeading
        icon="fitness_center"
        title="2. BARRAS DE TU GYM"
        tag={`${activeCount} ACTIVAS`}
        tagTone="tertiary"
        iconClassName="bg-primary-container text-on-primary-fixed"
      />
      <Panel className="flex flex-col gap-2.5">
        {bars.map((bar) => (
          <label
            key={bar.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low comic-stroke cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-8 rounded bg-surface-container-highest flex items-center justify-center text-on-surface shrink-0 comic-stroke-thin">
                <Icon name={bar.icon} className="text-lg" />
              </div>
              <div className="min-w-0">
                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface truncate">
                  {bar.name}
                </h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                  {[formatBoth(bar.kg, unit), bar.length].filter(Boolean).join(' · ')}
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              aria-label={`Usar ${bar.name}`}
              checked={active[bar.id]}
              onChange={(e) => onActiveChange(bar.id, e.target.checked)}
              className="size-6 cursor-pointer ml-2 shrink-0"
            />
          </label>
        ))}
        <button
          type="button"
          onClick={onAddCustom}
          className="comic-press w-full py-3 px-4 rounded-lg bg-tertiary-container text-on-tertiary-container font-headline-sm text-headline-sm uppercase tracking-wide flex items-center justify-center gap-2 mt-2 comic-stroke shadow-comic-md"
        >
          <Icon name="add_circle" className="text-xl" />
          Añadir Barra Personalizada
        </button>
      </Panel>
    </section>
  )
}
