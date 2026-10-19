import { cx } from '../../../lib/cx'
import { formatWeight } from '../../../lib/units'
import type { Unit } from '../../shared/UnitSwitch'

interface PlateRowProps {
  index: number
  weightKg: number
  unit: Unit
  selected: boolean
  onSelect: (index: number) => void
}

export function PlateRow({ index, weightKg, unit, selected, onSelect }: PlateRowProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(index)}
      className={cx(
        'relative flex items-center justify-between h-7 px-4 rounded-lg cursor-pointer transition-all',
        selected
          ? 'bg-primary-container text-on-primary-container comic-stroke shadow-comic-sm scale-[1.02]'
          : 'bg-surface-container-high text-on-surface comic-stroke-thin hover:bg-primary-container/40',
      )}
    >
      <span
        className={cx(
          'font-label-sm text-label-sm',
          selected ? 'font-black' : 'text-on-surface-variant',
        )}
      >
        {index}
      </span>
      <span
        className={cx('font-label-sm text-label-sm', selected ? 'font-extrabold tracking-wide' : 'font-bold')}
      >
        {formatWeight(weightKg, unit).toUpperCase()}{selected && ' (SELECCIÓN)'}
      </span>
      {selected ? (
        <>
          {/* Magnetic pin sticking out of the stack */}
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex items-center z-10">
            <span className="h-3 w-7 bg-secondary rounded-l-lg comic-stroke-thin flex items-center justify-center text-on-secondary">
              <span className="size-1.5 rounded-full bg-surface-container-lowest" />
            </span>
            <span className="w-2.5 h-5 bg-ink rounded-r-xs" />
          </div>
          <div className="size-4 rounded-full bg-secondary" />
        </>
      ) : (
        <div className="size-4 rounded-full bg-surface-container-highest" />
      )}
    </button>
  )
}
