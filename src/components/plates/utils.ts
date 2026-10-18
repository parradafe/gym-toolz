import type { CableLoad, CableRatio } from './types'

export function calcCableLoad(
  plateIndex: number,
  stepKg: number,
  microKg: number,
  ratio: CableRatio,
): CableLoad {
  const stackKg = plateIndex * stepKg
  const rawKg = stackKg + microKg
  return { stackKg, microKg, rawKg, effectiveKg: rawKg / ratio }
}
