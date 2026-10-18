import { cx } from '../../../lib/cx'
import { formatNumber, toUnit } from '../../../lib/units'
import { useUnit } from '../../../store/useGymStore'
import { Panel } from '../../shared/Panel'
import { SectionHeading } from '../../shared/SectionHeading'
import type { CableStep, Option } from '../types'

interface CablesPanelProps {
  steps: CableStep[]
  ratios: Option[]
  stepId: string
  ratioId: string
  onStepChange: (id: string) => void
  onRatioChange: (id: string) => void
}

export function CablesPanel({ steps, ratios, stepId, ratioId, onStepChange, onRatioChange }: CablesPanelProps) {
  const unit = useUnit()
  return (
    <section className="flex flex-col gap-space-sm">
      <SectionHeading
        icon="cable"
        title="3. POLEAS & CABLES"
        tag="RATIO"
        tagTone="primary"
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
        <div className="pt-2 border-t-[1.5px] border-dashed border-ink">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-md text-label-md uppercase text-on-surface font-black block">
                Ratio de Carga / Polea
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Multiplicador de resistencia real
              </span>
            </div>
            <div className="flex gap-1.5">
              {ratios.map((ratio) => {
                const selected = ratio.id === ratioId
                return (
                  <button
                    key={ratio.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onRatioChange(ratio.id)}
                    className={cx(
                      'px-3 py-1 font-label-md text-label-md font-black rounded comic-stroke shadow-comic-sm',
                      selected ? 'bg-primary-container text-on-primary-fixed' : 'bg-surface-container-lowest',
                    )}
                  >
                    {ratio.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Panel>
    </section>
  )
}
