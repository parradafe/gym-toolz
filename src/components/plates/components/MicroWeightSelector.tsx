import { cx } from '../../../lib/cx'
import { Icon } from '../../shared/Icon'
import type { MicroOption } from '../types'

interface MicroWeightSelectorProps {
  options: MicroOption[]
  selectedKg: number
  onSelect: (kg: number) => void
}

export function MicroWeightSelector({ options, selectedKg, onSelect }: MicroWeightSelectorProps) {
  return (
    <div className="w-full mt-space-md bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Icon name="add_circle" className="text-secondary text-lg" />
        <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold">
          Micro-Aumento Imantado:
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {options.map((option) => {
          const active = option.kg === selectedKg
          return (
            <button
              key={option.kg}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(option.kg)}
              className={cx(
                'px-2.5 py-1 rounded-lg font-label-sm text-label-sm comic-press',
                active
                  ? cx('comic-stroke-thin shadow-comic-xs font-bold', option.activeClassName)
                  : 'bg-surface-container-high text-on-surface-variant',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
