import { Icon } from '../../shared/Icon'
import { Panel } from '../../shared/Panel'
import { UnitSwitch, type Unit } from '../../shared/UnitSwitch'

interface ConfigHeroProps {
  unit: Unit
  onUnitChange: (unit: Unit) => void
}

export function ConfigHero({ unit, onUnitChange }: ConfigHeroProps) {
  return (
    <section className="relative mt-2">
      <Panel className="relative overflow-hidden">
        <div className="halftone absolute inset-0 pointer-events-none opacity-40" />
        <div className="relative z-10 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1 bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded -rotate-2 comic-stroke shadow-comic-sm">
              <Icon name="bolt" className="text-base" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest font-black">
                SETUP HERO
              </span>
            </div>
            <div className="bg-primary-container text-on-primary-fixed px-2.5 py-0.5 rounded rotate-3 comic-stroke shadow-comic-sm">
              <span className="font-headline-sm text-headline-sm tracking-tighter uppercase font-black">
                ¡CLANG!
              </span>
            </div>
          </div>
          <div className="relative bg-white p-3 rounded-lg mt-1 comic-stroke-bold shadow-comic-md">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile uppercase text-on-surface leading-tight tracking-tight">
              ¡CONFIGURA TU{' '}
              <span className="bg-primary-container px-1 rounded inline-block -rotate-1 text-on-primary-fixed">
                ARSENAL
              </span>{' '}
              DE HIERRO!
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Personaliza los discos, calibraciones y barras reales que tienes a mano.
            </p>
          </div>
          <div className="mt-2 pt-2 flex items-center justify-between border-t-2 border-dashed border-ink">
            <span className="font-label-md text-label-md uppercase text-on-surface flex items-center gap-1.5">
              <Icon name="scale" className="text-lg" />
              Unidad Principal:
            </span>
            <UnitSwitch unit={unit} onChange={onUnitChange} tone="primary" />
          </div>
        </div>
      </Panel>
    </section>
  )
}
