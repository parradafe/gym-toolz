import { formatNumber, formatWeight, toUnit } from '../../lib/units'
import { Chip } from '../shared/Chip'
import { Icon } from '../shared/Icon'
import { UnitSwitch } from '../shared/UnitSwitch'
import type { CableTotalProps } from './types'

export function CableTotal({ unit, onUnitChange, load, ratio }: CableTotalProps) {
  const otherUnit = unit === 'KG' ? 'LBS' : 'KG'
  const stackLabel =
    load.microKg > 0
      ? `${formatWeight(load.stackKg, unit)} + ${formatWeight(load.microKg, unit)}`
      : formatWeight(load.stackKg, unit)

  return (
    <section className="px-margin pt-4 pb-2">
      <div className="relative bg-primary-container text-on-primary-container p-4 comic-panel overflow-hidden">
        <div className="halftone absolute inset-0 pointer-events-none opacity-40" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-surface text-on-surface px-2.5 py-1 rounded-full comic-stroke shadow-comic-sm -rotate-1">
              <Icon name="bolt" filled className="text-secondary text-lg" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Carga efectiva real</span>
            </div>
            <UnitSwitch unit={unit} onChange={onUnitChange} />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-background tracking-tighter leading-none">
              {formatNumber(toUnit(load.effectiveKg, unit))}
            </h1>
            <span className="font-headline-md text-headline-md text-on-surface-variant font-bold uppercase">
              {unit}
            </span>
            <Chip tone="neutral" className="ml-auto font-label-md text-label-md text-on-surface-variant/80">
              ≈ {formatWeight(load.effectiveKg, otherUnit)}
            </Chip>
          </div>
          <div className="bg-surface/95 text-on-surface p-2.5 rounded-lg flex items-center justify-between gap-2 comic-stroke shadow-comic-sm">
            <div className="flex items-center gap-1.5 min-w-0">
              <Icon name="scale" className="text-tertiary text-base" />
              <p className="font-body-sm text-body-sm truncate font-bold">
                Torre: <span className="text-secondary">{stackLabel}</span>
              </p>
            </div>
            <Chip tone="tertiary" className="shrink-0">
              Ratio {ratio}:1
            </Chip>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
            {ratio === 2
              ? `Con ratio 2:1 el cable recorre el doble de distancia: ${formatWeight(load.rawKg, unit)} en la torre equivalen a ${formatWeight(load.effectiveKg, unit)} reales.`
              : `Con ratio 1:1 cada kilo de la torre es tensión directa: ${formatWeight(load.rawKg, unit)} reales.`}
          </p>
        </div>
      </div>
    </section>
  )
}
