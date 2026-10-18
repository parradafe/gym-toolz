interface StepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  label: string
}

export function Stepper({ value, onChange, min = 0, label }: StepperProps) {
  return (
    <div className="flex items-center gap-1 bg-surface-container-lowest px-1.5 py-0.5 rounded comic-stroke-thin shadow-comic-xs">
      <button
        type="button"
        aria-label={`Quitar ${label}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="size-5 flex items-center justify-center font-bold text-on-surface active:bg-surface-container"
      >
        -
      </button>
      <span className="font-label-md text-label-md text-on-surface font-black px-1">{value}</span>
      <button
        type="button"
        aria-label={`Añadir ${label}`}
        onClick={() => onChange(value + 1)}
        className="size-5 flex items-center justify-center font-bold text-on-surface active:bg-surface-container"
      >
        +
      </button>
    </div>
  )
}
