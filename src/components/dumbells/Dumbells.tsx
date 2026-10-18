import { Icon } from '../shared/Icon'
import { UnitSwitch } from '../shared/UnitSwitch'
import { cx } from '../../lib/cx'
import { VisualState } from './VisualState'
import { useDumbbellVisual } from './useDumbbellVisual'

const MODES = [
  { isPair: true, icon: 'sync_alt', label: 'Par completo (x2)' },
  { isPair: false, icon: 'person', label: 'Individual (x1)' },
]

/** Interactive host for the "Estado visual" card: pair/single, unit and weight drive the graphic. */
export function Dumbells() {
  const { weight, unit, isPair, setUnit, setIsPair, increase, decrease } = useDumbbellVisual()

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <UnitSwitch unit={unit} onChange={setUnit} />
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Restar peso"
            onClick={decrease}
            className="flex size-11 items-center justify-center rounded-xl bg-surface-container-lowest font-headline-md text-headline-md text-on-surface shadow-comic-sm comic-press"
          >
            -
          </button>
          <button
            type="button"
            aria-label="Sumar peso"
            onClick={increase}
            className="flex size-11 items-center justify-center rounded-xl bg-primary-container font-headline-md text-headline-md text-on-primary-fixed shadow-comic-sm comic-press"
          >
            +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-space-sm">
        {MODES.map((mode) => (
          <button
            key={mode.label}
            type="button"
            aria-pressed={isPair === mode.isPair}
            onClick={() => setIsPair(mode.isPair)}
            className={cx(
              'flex items-center justify-center gap-1.5 rounded-xl px-1 py-2 shadow-comic-sm transition-transform active:scale-95',
              isPair === mode.isPair
                ? 'bg-on-surface text-surface'
                : 'bg-surface-container-lowest text-on-surface',
            )}
          >
            <Icon
              name={mode.icon}
              filled={isPair === mode.isPair}
              className={cx('text-base', isPair === mode.isPair && 'text-primary-container')}
            />
            <span className="font-label-sm text-label-sm uppercase">{mode.label}</span>
          </button>
        ))}
      </div>
      <VisualState weight={weight} unit={unit} isPair={isPair} />
    </div>
  )
}
