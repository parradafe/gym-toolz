import { DumbbellGraphic } from './components/DumbbellGraphic'
import type { Unit } from './types'
import { formatWeight, statusText } from './utils'

interface VisualStateProps {
  weight: number
  unit: Unit
  /** Pair shows both dumbbells, otherwise only the first one. */
  isPair: boolean
}

export function VisualState({ weight, unit, isPair }: VisualStateProps) {
  const label = `${formatWeight(weight)}${unit}`
  return (
    <section
      aria-live="polite"
      className="relative flex min-h-[170px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-comic-lg"
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-secondary-container" />
      <div className="absolute left-3 top-3 rounded bg-primary-container px-2 py-0.5 font-label-sm text-label-sm text-on-primary-container shadow-comic-sm">
        ESTADO VISUAL
      </div>
      <div className="mt-4 flex w-full items-center justify-around">
        <DumbbellGraphic label={label} name="Mancuerna A" />
        {isPair && <DumbbellGraphic label={label} name="Mancuerna B" />}
      </div>
      <div className="mt-3 flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1 shadow-comic-sm">
        <span className="size-2.5 animate-pulse rounded-full bg-secondary-container" />
        <span className="font-label-sm text-label-sm font-bold uppercase text-on-surface">
          {statusText(weight, unit, isPair)}
        </span>
      </div>
    </section>
  )
}
