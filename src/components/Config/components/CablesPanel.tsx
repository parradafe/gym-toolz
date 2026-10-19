import { cx } from '../../../lib/cx'
import { formatNumber, toUnit } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import { Panel } from '../../shared/Panel'
import { SectionHeading } from '../../shared/SectionHeading'
import type { CableStep } from '../types'

interface CablesPanelProps {
  steps: CableStep[]
  stepId: string
  onStepChange: (id: string) => void
}

export function CablesPanel({ steps, stepId, onStepChange }: CablesPanelProps) {
  const unit = useUnit()
  return (
    <section className="flex flex-col gap-space-sm">
      <SectionHeading
        icon="cable"
        title="3. POLEAS & CABLES"
        tag="PASO"
        iconClassName="bg-tertiary text-on-tertiary"
      />
      <Panel className="flex flex-col gap-3">
        <div>
          <span className="block font-label-md text-label-md uppercase text-on-surface font-black mb-1">
            Salto por Placa en la Torre:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {steps.map((step) => {
              const selected = step.id === stepId
              return (
                <button
                  key={step.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onStepChange(step.id)}
                  className={cx(
                    'py-2 rounded font-label-md text-label-md uppercase comic-stroke',
                    selected
                      ? 'bg-primary-container text-on-primary-fixed font-black shadow-comic-sm'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface',
                  )}
                >
                  {formatNumber(unit === 'LBS' && step.lb !== undefined ? step.lb : toUnit(step.kg, unit))} {unit}
                </button>
              )
            })}
          </div>
        </div>
      </Panel>
    </section>
  )
}
