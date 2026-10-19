import { formatNumber, lbToKg, toUnit } from '../../lib/units'
import { useGymStore } from '../../store/useGymStore'
import { DUMBBELL_STEP_LB, MAX_DUMBBELL_LB, MIN_DUMBBELL_LB } from './data'

export function useDumbbellVisual() {
  const { weightLb, microLb, isPair } = useGymStore((s) => s.dumbbell)
  const unit = useGymStore((s) => s.unit)
  const setUnit = useGymStore((s) => s.setUnit)
  const setWeightLb = useGymStore((s) => s.setDumbbellWeight)
  const setMicroLb = useGymStore((s) => s.setDumbbellMicro)
  const setIsPair = useGymStore((s) => s.setDumbbellPair)

  return {
    /** Weight per dumbbell (rack weight + micro-loads) in the active unit. */
    weight: Number(formatNumber(toUnit(lbToKg(weightLb + microLb), unit))),
    /** Rack weight in lb, used to mark the selected rack button. */
    weightLb,
    microLb,
    unit,
    isPair,
    setUnit,
    setIsPair,
    selectWeight: setWeightLb,
    addMicro: (lb: number) => setMicroLb(microLb + lb),
    clearMicro: () => setMicroLb(0),
    increase: () => setWeightLb(Math.min(MAX_DUMBBELL_LB, weightLb + DUMBBELL_STEP_LB)),
    decrease: () => setWeightLb(Math.max(MIN_DUMBBELL_LB, weightLb - DUMBBELL_STEP_LB)),
  }
}
