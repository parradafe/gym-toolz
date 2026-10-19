import { formatPlateTag, formatWeight, lbToKg } from '../../lib/units'
import type { PlatesPerSide, PlateWeight, Unit } from './types'

export interface ActivePlate {
  weight: PlateWeight
  count: number
}

/** Plates with at least one unit, heaviest first. */
export function getActivePlates(plates: PlatesPerSide): ActivePlate[] {
  return (Object.entries(plates) as [string, number][])
    .map(([weight, count]) => ({ weight: Number(weight) as PlateWeight, count }))
    .filter((plate) => plate.count > 0)
    .sort((a, b) => b.weight - a.weight)
}

/** Flat list of every disc on one sleeve, heaviest (closest to the collar) first. */
export function expandDiscs(active: ActivePlate[]): PlateWeight[] {
  return active.flatMap(({ weight, count }) => Array<PlateWeight>(count).fill(weight))
}

export function describePlates(active: ActivePlate[], perSideKg: number, unit: Unit): string {
  if (active.length === 0) return `Sin discos (${formatWeight(0, unit)})`
  return `${active.map(({ count, weight }) => `${count}x${formatPlateTag(lbToKg(weight), unit)}`).join(' + ')} (${formatWeight(perSideKg, unit)})`
}
