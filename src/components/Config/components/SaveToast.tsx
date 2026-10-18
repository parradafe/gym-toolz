import { cx } from '../../../lib/cx'

interface SaveToastProps {
  visible: boolean
}

export function SaveToast({ visible }: SaveToastProps) {
  return (
    <div
      role="status"
      className={cx(
        'fixed inset-x-4 top-20 z-60 flex justify-center pointer-events-none transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
      )}
    >
      <div className="relative bg-primary-container text-on-primary-fixed px-5 py-3 rounded-xl -rotate-2 flex items-center gap-3 comic-stroke-heavy shadow-comic-xl">
        <div className="size-9 bg-white rounded-full flex items-center justify-center font-black text-xl comic-stroke shadow-comic-xs">
          ✓
        </div>
        <div>
          <p className="font-headline-sm text-headline-sm uppercase font-black leading-none">
            ¡POW! CONFIGURACIÓN ACTIVA
          </p>
          <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container font-bold">
            Tu arsenal está listo para calcular cargas
          </p>
        </div>
      </div>
    </div>
  )
}
