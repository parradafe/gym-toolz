import { cx } from '../../lib/cx'

interface IconProps {
  /** Material Symbols ligature name, e.g. "bolt". */
  name: string
  filled?: boolean
  className?: string
}

export function Icon({ name, filled = false, className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'material-symbols-outlined',
        filled && '[font-variation-settings:"FILL"_1]',
        className,
      )}
    >
      {name}
    </span>
  )
}
