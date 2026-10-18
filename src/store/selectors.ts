import { BARS } from '../components/Config/data'
import type { BarConfig } from '../components/Config/types'
import type { LoadCalculation, PlateWeight } from '../components/Land/types'
import { LB_PER_KG } from '../lib/units'
import type { GymState } from './useGymStore'

export const selectBars = (s: GymState): BarConfig[] => [...BARS, ...s.customBars]

export const selectActiveBars = (s: GymState): BarConfig[] =>
  selectBars(s).filter((b) => s.barActive[b.id])

/** Weights the user can still add in Land: enabled and with stock left. */
export const isPlateAvailable = (s: GymState, weight: PlateWeight): boolean => {
  const plate = s.plates[String(weight)]
  return !!plate?.enabled && (plate.stock === undefined || plate.stock > 0)
}

export const selectBarKg = (s: GymState): number =>
  s.mode === 'barbell' ? (selectBars(s).find((b) => b.id === s.barId)?.kg ?? 0) : 0

export const selectTotals = (s: GymState): LoadCalculation => {
  const perSideKg = (Object.entries(s.loaded) as [string, number][]).reduce(
    (sum, [weight, count]) => sum + Number(weight) * count,
    0,
  )
  const platesOnlyKg = perSideKg * 2
  const totalKg = selectBarKg(s) + platesOnlyKg
  return { totalKg, totalLb: totalKg * LB_PER_KG, platesOnlyKg, perSideKg }
}
