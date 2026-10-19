import { cx } from '../../../lib/cx'
import type { DumbbellSide } from '../types'

interface HexHeadProps {
  side: DumbbellSide
  label: string
}

export function HexHead({ side, label }: HexHeadProps) {
  return (
    <div className="relative flex h-20 w-9 flex-col items-center justify-center rounded-lg bg-inverse-surface text-surface shadow-comic-sm">
      <span
        className={cx(
          'font-label-sm text-label-sm font-black tracking-tighter',
          side === 'left' ? '-rotate-90' : 'rotate-90',
        )}
      >
        {label}
      </span>
      <div
        className={cx(
          'absolute inset-y-1 w-1 rounded-full bg-secondary-container',
          side === 'left' ? 'left-1' : 'right-1',
        )}
      />
    </div>
  )
}
