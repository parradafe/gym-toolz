import type { Unit } from '../components/shared/UnitSwitch'

export const LB_PER_KG = 2.20462

/** Plate weights are stored in lb; everything else computes in kg. */
export const lbToKg = (lb: number): number => lb / LB_PER_KG

export const toUnit = (kg: number, unit: Unit): number => (unit === 'KG' ? kg : kg * LB_PER_KG)

/** "80" instead of "80.0"; one decimal otherwise. */
export const formatNumber = (value: number): string => Number(value.toFixed(1)).toString()

/** Weight (stored in kg) expressed in `unit`, e.g. "20 KG" / "44.1 LBS". */
export const formatWeight = (kg: number, unit: Unit): string =>
  `${formatNumber(toUnit(kg, unit))} ${unit}`

const otherUnit = (unit: Unit): Unit => (unit === 'KG' ? 'LBS' : 'KG')

/** Active unit first, the other one in parentheses: "20 KG (44.1 LBS)". */
export const formatBoth = (kg: number, unit: Unit): string =>
  `${formatWeight(kg, unit)} (${formatWeight(kg, otherUnit(unit))})`

/** Short label for plate discs: "25k", "55lb", "2.5", ".5". */
export function formatPlateTag(kg: number, unit: Unit): string {
  const value = formatNumber(toUnit(kg, unit)).replace(/^0\./, '.')
  if (toUnit(kg, unit) < 5) return value
  return `${value}${unit === 'KG' ? 'k' : 'lb'}`
}
