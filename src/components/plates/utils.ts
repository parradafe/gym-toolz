import { lbToKg } from '../../lib/units'
import type { CableLoad } from './types'

/** Stack plates in lb: 5, 10, then +10 each (5, 10, 20, 30, ...). */
export const plateWeightKg = (plateIndex: number): number =>
  lbToKg(plateIndex === 1 ? 5 : (plateIndex - 1) * 10)

export function calcCableLoad(
  plateIndex: number,
  microKg: number,
): CableLoad {
  const stackKg = plateWeightKg(plateIndex)
  const rawKg = stackKg + microKg
  return { stackKg, microKg, rawKg }
}
