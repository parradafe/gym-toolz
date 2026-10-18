import { Icon } from '../../shared/Icon'

interface SetSavedModalProps {
  open: boolean
  weightLabel: string
  restTime?: string
  onClose: () => void
}

export function SetSavedModal({ open, weightLabel, restTime = '02:30 MIN', onClose }: SetSavedModalProps) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-on-background/60 backdrop-blur-sm"
    >
      <div className="relative bg-primary-container text-on-primary-container p-6 rounded-2xl max-w-sm w-full text-center comic-stroke-heavy shadow-comic-xl -rotate-1">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 size-20 bg-secondary-container text-on-secondary-container flex items-center justify-center rounded-full comic-stroke-bold shadow-comic-md">
          <Icon name="check" className="text-3xl" />
        </div>
        <div className="mt-4">
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-tight text-on-background">
            ¡BOOM! SERIE LISTA
          </h3>
          <p className="font-body-md text-body-md text-on-primary-container font-bold mt-1">
            Carga de <span>{weightLabel}</span> registrada con éxito.
          </p>
        </div>
        <div className="bg-surface text-on-surface p-3 rounded-lg mt-4 comic-stroke shadow-comic-sm">
          <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">
            Tiempo de descanso recomendado
          </span>
          <span className="font-headline-md text-headline-md text-secondary font-bold">{restTime}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="comic-press w-full mt-4 h-12 bg-on-background text-on-primary font-headline-sm text-headline-sm uppercase rounded-lg comic-stroke shadow-comic-md"
        >
          ¡A POR OTRA!
        </button>
      </div>
    </div>
  )
}
