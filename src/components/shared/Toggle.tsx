interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        aria-label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-12 h-7 rounded-full comic-stroke shadow-comic-sm bg-surface-dim transition-all peer-checked:bg-primary-container" />
      <div className="absolute left-1 top-1 size-5 rounded-full bg-white comic-stroke-thin shadow-comic-xs transition-all peer-checked:translate-x-5" />
    </label>
  )
}
