import { Icon } from '../../shared/Icon'

interface SessionActionsProps {
  onLogSet: () => void
}

export function SessionActions({ onLogSet }: SessionActionsProps) {
  return (
    <section className="px-margin mt-5 flex flex-col gap-3">
      <button
        type="button"
        onClick={onLogSet}
        className="comic-press w-full h-14 bg-secondary-container text-on-secondary-container rounded-xl comic-stroke-bold shadow-comic-lg flex items-center justify-center gap-2 transition-all"
      >
        <Icon name="bolt" className="text-2xl font-bold" />
        <span className="font-headline-sm text-headline-sm uppercase tracking-wide">
          ¡GUARDAR SERIE EN RUTINA!
        </span>
        <span className="font-headline-sm text-headline-sm">🔥</span>
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="comic-press h-11 bg-surface text-on-surface rounded-lg comic-stroke shadow-comic-md flex items-center justify-center gap-1.5"
        >
          <Icon name="calculate" className="text-tertiary text-lg" />
          <span className="font-label-sm text-label-sm uppercase">Auto-Completar</span>
        </button>
        <button
          type="button"
          className="comic-press h-11 bg-surface text-on-surface rounded-lg comic-stroke shadow-comic-md flex items-center justify-center gap-1.5"
        >
          <Icon name="bookmark" className="text-primary text-lg" />
          <span className="font-label-sm text-label-sm uppercase">Guardar Carga PR</span>
        </button>
      </div>
    </section>
  )
}
