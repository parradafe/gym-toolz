import { GripBar } from './GripBar'
import { HexHead } from './HexHead'

interface DumbbellGraphicProps {
  /** Text printed on both hex heads, e.g. "24KG". */
  label: string
  name: string
}

export function DumbbellGraphic({ label, name }: DumbbellGraphicProps) {
  return (
    <div className="flex flex-col items-center transition-transform hover:scale-105">
      <div className="flex items-center">
        <HexHead side="left" label={label} />
        <GripBar />
        <HexHead side="right" label={label} />
      </div>
      <span className="mt-2 font-label-sm text-label-sm font-bold uppercase text-on-surface-variant">{name}</span>
    </div>
  )
}
