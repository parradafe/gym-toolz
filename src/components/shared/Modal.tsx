import { Icon } from './Icon'

interface ModalProps {
  open: boolean
  title: string
  icon: string
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, title, icon, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-on-background/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-sm bg-white p-space-md comic-modal">
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute -top-3 -right-3 size-8 rounded-full bg-secondary text-white font-black flex items-center justify-center comic-stroke shadow-comic-sm active:scale-95"
        >
          ✕
        </button>
        <div className="flex items-center gap-space-sm mb-3">
          <Icon name={icon} className="text-2xl text-on-surface" />
          <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface font-black">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  )
}
