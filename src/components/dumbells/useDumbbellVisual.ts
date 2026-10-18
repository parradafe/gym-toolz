import { useState } from 'react'
import type { Unit } from './types'

const MIN_WEIGHT = 2
const MAX_WEIGHT = 80
const STEP = 2

export function useDumbbellVisual(initialWeight = 24) {
  const [weight, setWeight] = useState(initialWeight)
  const [unit, setUnit] = useState<Unit>('KG')
  const [isPair, setIsPair] = useState(true)

  return {
    weight,
    unit,
    isPair,
    setUnit,
    setIsPair,
    increase: () => setWeight((w) => Math.min(MAX_WEIGHT, w + STEP)),
    decrease: () => setWeight((w) => Math.max(MIN_WEIGHT, w - STEP)),
  }
}
