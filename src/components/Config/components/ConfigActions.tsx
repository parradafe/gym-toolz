import { Icon } from '../../shared/Icon'

interface ConfigActionsProps {
  onSave: () => void
  onReset: () => void
}

export function ConfigActions({ onSave, onReset }: ConfigActionsProps) {
  return (
    <section className="flex flex-col gap-3 pt-2">
      <button
        type="button"
        onClick={onSave}
        className="comic-press w-full h-14 bg-primary-container text-on-primary-fixed rounded-lg font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-wider font-black flex items-center justify-center gap-2 comic-stroke-heavy shadow-comic-lg"
      >
        <Icon name="save" className="text-3xl" />
        ¡GUARDAR CAMBIOS!
      </button>
      <button
        type="button"
        onClick={onReset}
        className="comic-press w-full py-2.5 bg-surface-container-lowest text-on-surface font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-lg comic-stroke shadow-comic-sm"
      >
        <Icon name="restart_alt" className="text-base" />
        Restablecer Valores de Fábrica IWF
      </button>
    </section>
  )
}
