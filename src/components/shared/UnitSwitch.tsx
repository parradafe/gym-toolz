import { cx } from '../../lib/cx'

export type Unit = 'KG' | 'LBS'

type UnitSwitchTone = 'ink' | 'primary'

interface UnitSwitchProps {
  unit: Unit
  onChange: (unit: Unit) => void
  tone?: UnitSwitchTone
}

const UNITS: Unit[] = ['KG', 'LBS']

const trackClasses: Record<UnitSwitchTone, string> = {
  ink: 'bg-surface p-0.5 shadow-comic-sm',
  primary: 'bg-surface-container p-1 shadow-comic-sm',
}

const optionClasses: Record<UnitSwitchTone, { base: string; active: string; inactive: string }> = {
  ink: {
    base: 'px-2.5 py-1 font-label-sm text-label-sm',
    active: 'bg-on-background text-on-primary',
    inactive: 'text-on-surface hover:bg-surface-container',
  },
  primary: {
    base: 'px-4 py-1 font-label-md text-label-md font-black comic-stroke-thin',
    active: 'bg-primary-container text-on-primary-fixed shadow-comic-sm',
    inactive: 'border-transparent text-on-surface-variant hover:text-on-surface',
  },
}

export function UnitSwitch({ unit, onChange, tone = 'ink' }: UnitSwitchProps) {
  const option = optionClasses[tone]
  return (
    <div className={cx('inline-flex rounded-lg comic-stroke', trackClasses[tone])}>
      {UNITS.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={unit === value}
          onClick={() => onChange(value)}
          className={cx(
            'rounded uppercase transition-all',
            option.base,
            unit === value ? option.active : option.inactive,
          )}
        >
          {value}
        </button>
      ))}
    </div>
  )
}
