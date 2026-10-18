import { cx } from '../../lib/cx'

type ChipTone = 'primary' | 'tertiary' | 'neutral' | 'surface' | 'muted'

interface ChipProps extends React.ComponentProps<'span'> {
  tone?: ChipTone
}

const toneClasses: Record<ChipTone, string> = {
  primary: 'bg-primary-container text-on-primary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
  neutral: 'bg-surface-container-highest text-on-surface-variant shadow-comic-xs',
  surface: 'bg-surface text-on-surface shadow-comic-sm',
  muted: 'bg-surface-container-high text-on-surface-variant',
}

export function Chip({ tone = 'primary', className, children, ...rest }: ChipProps) {
  return (
    <span
      className={cx(
        'comic-chip px-2 py-0.5 font-label-sm text-label-sm font-bold',
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
