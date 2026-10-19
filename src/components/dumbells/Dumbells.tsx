import { Icon } from '../shared/Icon'
import { UnitSwitch } from '../shared/UnitSwitch'
import { cx } from '../../lib/cx'
import { DumbbellRack } from './components/DumbbellRack'
import { QuickAdjust } from './components/QuickAdjust'
import { DUMBBELL_STEP_LB, MAX_DUMBBELL_LB, MIN_DUMBBELL_LB } from './data'
import { VisualState } from './VisualState'
import { useDumbbellVisual } from './useDumbbellVisual'

const RACK_WEIGHTS_LB = Array.from(
  { length: (MAX_DUMBBELL_LB - MIN_DUMBBELL_LB) / DUMBBELL_STEP_LB + 1 },
  (_, i) => MIN_DUMBBELL_LB + i * DUMBBELL_STEP_LB,
)

const MODES = [
  { isPair: true, icon: 'sync_alt', label: 'Par completo (x2)' },
  { isPair: false, icon: 'person', label: 'Individual (x1)' },
]

/** Interactive host for the "Estado visual" card: pair/single, unit and weight drive the graphic. */
export function Dumbells() {
  const {
    weight,
    weightLb,
    unit,
    isPair,
    setUnit,
    setIsPair,
    selectWeight,
    addMicro,
    clearMicro,
    increase,
    decrease,
  } = useDumbbellVisual()

  return (
    <div className="flex flex-col gap-space-md">
      <UnitSwitch unit={unit} onChange={setUnit} />
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
      <QuickAdjust
        unit={unit}
        onDecrease={decrease}
        onIncrease={increase}
        onAddMicro={addMicro}
        onClearMicro={clearMicro}
      />
      <DumbbellRack weights={RACK_WEIGHTS_LB} selectedLb={weightLb} unit={unit} onSelect={selectWeight} />
    </div>
  )
}
