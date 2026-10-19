import { useEffect, useState } from 'react'
import { Chip } from '../../shared/Chip'
import { Icon } from '../../shared/Icon'
import type { CableLoad } from '../../plates/types'
import type { LoadCalculation, Unit } from '../types'
import { formatBoth, formatNumber, formatWeight, toUnit } from '../../../lib/units'
import { UnitSwitch } from '../../shared/UnitSwitch'

interface HeroTotalProps {
  unit: Unit
  onUnitChange: (unit: Unit) => void
  calc: LoadCalculation
  isBarbell: boolean
  barKg: number
  /** Cable stack breakdown; replaces the bar/plates detail when set. */
  cable?: CableLoad
}

const formatStack = (load: CableLoad, unit: Unit) =>
  load.microKg > 0
    ? `${formatWeight(load.stackKg, unit)} + ${formatWeight(load.microKg, unit)}`
    : formatWeight(load.stackKg, unit)

export function HeroTotal({ unit, onUnitChange, calc, isBarbell, barKg, cable }: HeroTotalProps) {
  const otherUnit: Unit = unit === 'KG' ? 'LBS' : 'KG'
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(id)
  }, [copied])

  const copyTotal = async () => {
    try {
      await navigator.clipboard.writeText(formatBoth(calc.totalKg, unit))
      setCopied(true)
    } catch {
      // Clipboard unavailable (insecure context or permission denied).
    }
  }

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
                {cable ? (
                  <>
                    Torre: <span className="text-secondary">{formatStack(cable, unit)}</span>
                  </>
                ) : isBarbell ? (
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
            {!cable && isBarbell && (
              <Chip tone="tertiary" className="shrink-0">
                {formatWeight(calc.perSideKg, unit)} / lado
              </Chip>
            )}
          </div>
          <button
            type="button"
            onClick={copyTotal}
            aria-live="polite"
            className="comic-press h-10 bg-surface text-on-surface rounded-lg comic-stroke shadow-comic-sm flex items-center justify-center gap-1.5 font-label-md text-label-md uppercase tracking-wider"
          >
            <Icon name={copied ? 'check' : 'content_copy'} className="text-secondary text-lg" />
            {copied ? '¡Copiado!' : 'Copiar al portapapeles'}
          </button>
        </div>
      </div>
    </section>
  )
}
