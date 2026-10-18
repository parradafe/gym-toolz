export function GripBar() {
  return (
    <div className="relative flex h-5 w-14 items-center justify-center overflow-hidden bg-outline-variant shadow-comic-xs">
      <div className="absolute inset-0 opacity-40 knurl" />
      <div className="h-3.5 w-8 rounded-xs bg-surface-container-high opacity-80" />
    </div>
  )
}
