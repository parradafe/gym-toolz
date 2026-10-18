export function PulleyTop() {
  return (
    <div className="w-full flex items-center justify-center relative mb-2">
      <div className="size-8 rounded-full bg-surface-container-highest comic-stroke flex items-center justify-center">
        <div className="size-3 rounded-full bg-on-surface-variant" />
      </div>
      {/* Cable running down */}
      <div className="absolute top-8 w-1 h-6 bg-ink" />
    </div>
  )
}
