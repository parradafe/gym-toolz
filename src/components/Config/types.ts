export interface PlateConfig {
  id: string
  weight: number
  name: string
  /** Background + text color of the plate disc. */
  circleClassName: string
  /** Background of the small palette badge. */
  badgeClassName: string
  defaultStock: number
}

export interface FractionalPlateConfig {
  id: string
  weight: number
  discClassName: string
}

export interface BarConfig {
  id: string
  kg: number
  name: string
  icon: string
  /** Static extra info (e.g. bar length); weights are derived from `kg`. */
  length?: string
  defaultActive: boolean
  custom?: boolean
}

export interface Option {
  id: string
  label: string
}

export interface CableStep {
  id: string
  kg: number
  /** Real-world value in lb when it differs from the plain conversion. */
  lb?: number
}

export interface CalibrationRow {
  id: string
  name: string
  nominalKg: number
  measuredKg: number
}
