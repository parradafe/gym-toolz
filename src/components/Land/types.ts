export type { Unit } from '../shared/UnitSwitch'

export type EquipmentMode = 'barbell' | 'dumbbell' | 'kettlebell' | 'cables'

export type PlateWeight = 25 | 20 | 15 | 10 | 5 | 2.5 | 1.25 | 0.5

export type PlatesPerSide = Record<PlateWeight, number>

export interface LoadCalculation {
  totalKg: number
  totalLb: number
  platesOnlyKg: number
  perSideKg: number
}

export interface EquipmentTab {
  mode: EquipmentMode
  icon: string
  label: string
}

/** Look of a plate drawn on the sleeve. Size is data-driven, so it stays inline. */
export interface PlateVisual {
  className: string
  height: number
  width: number
}

export interface PlateCardData {
  weight: PlateWeight
  circleClassName: string
}

export interface FractionalPlate {
  weight: PlateWeight
}
