import { Chip } from '../../shared/Chip'
import { Icon } from '../../shared/Icon'
import type { LoadCalculation, Unit } from '../types'
import { formatNumber, formatWeight, toUnit } from '../../../lib/units'
import { UnitSwitch } from '../../shared/UnitSwitch'

interface HeroTotalProps {
  unit: Unit
  onUnitChange: (unit: Unit) => void
  calc: LoadCalculation
  isBarbell: boolean
  barKg: number
}

export function HeroTotal({ unit, onUnitChange, calc, isBarbell, barKg }: HeroTotalProps) {
  const otherUnit: Unit = unit === 'KG' ? 'LBS' : 'KG'

  return (
    <section className="px-margin pt-4 pb-2">
      <div className="relative bg-primary-container text-on-primary-container p-4 comic-panel overflow-hidden">
        <div className="halftone absolute inset-0 pointer-events-none opacity-40" />
        <div className="comic-burst absolute -top-6 -right-6 size-24 bg-secondary-container text-on-secondary-container rotate-12 flex items-center justify-center">
          <span className="font-headline-sm text-headline-sm uppercase tracking-tighter text-on-secondary-container mt-2 ml-1">
            POW!
          </span>
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-surface text-on-surface px-2.5 py-1 rounded-full comic-stroke shadow-comic-sm -rotate-1">
              <Icon name="bolt" filled className="text-secondary text-lg" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider">
                CARGA TOTAL LISTA
              </span>
            </div>
            <UnitSwitch unit={unit} onChange={onUnitChange} />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-background tracking-tighter leading-none">
              {formatNumber(toUnit(calc.totalKg, unit))}
            </h1>
            <span className="font-headline-md text-headline-md text-on-surface-variant font-bold uppercase">
              {unit}
            </span>
            <Chip tone="neutral" className="ml-auto font-label-md text-label-md text-on-surface-variant/80">
              ≈ {formatWeight(calc.totalKg, otherUnit)}
            </Chip>
          </div>
          <div className="bg-surface/95 text-on-surface p-2.5 rounded-lg flex items-center justify-between gap-2 comic-stroke shadow-comic-sm">
            <div className="flex items-center gap-1.5 min-w-0">
              <Icon name="scale" className="text-tertiary text-base" />
              <p className="font-body-sm text-body-sm truncate text-on-surface font-bold">
                {isBarbell ? (
                  <>
                    Barra: <span className="text-tertiary">{formatWeight(barKg, unit)}</span> + Discos:{' '}
                    <span className="text-secondary">{formatWeight(calc.platesOnlyKg, unit)}</span>
                  </>
                ) : (
                  <>
                    Carga total: <span className="text-secondary">{formatWeight(calc.totalKg, unit)}</span>
                  </>
                )}
              </p>
            </div>
            {isBarbell && (
              <Chip tone="tertiary" className="shrink-0">
                {formatWeight(calc.perSideKg, unit)} / lado
              </Chip>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
