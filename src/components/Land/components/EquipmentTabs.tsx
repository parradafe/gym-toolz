import { cx } from '../../../lib/cx'
import { Icon } from '../../shared/Icon'
import type { EquipmentMode, EquipmentTab } from '../types'

interface EquipmentTabsProps {
  tabs: EquipmentTab[]
  active: EquipmentMode
  onChange: (mode: EquipmentMode) => void
}

export function EquipmentTabs({ tabs, active, onChange }: EquipmentTabsProps) {
  return (
    <section className="px-margin mt-3">
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.mode}
            type="button"
            aria-pressed={active === tab.mode}
            onClick={() => onChange(tab.mode)}
            className={cx(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg shrink-0 comic-stroke-bold shadow-comic-md transition-all',
              active === tab.mode
                ? 'bg-on-background text-on-primary'
                : 'bg-surface text-on-surface hover:bg-surface-container',
            )}
          >
            <Icon name={tab.icon} className="text-lg" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
