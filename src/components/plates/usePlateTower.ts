import { useState } from 'react'
import { DEFAULT_PLATE_INDEX } from './data'

/** Pin position and micro-weight of the cable stack. Lives in the parent so it survives tab switches. */
export function usePlateTower(initialPlate = DEFAULT_PLATE_INDEX) {
  const [plateIndex, selectPlate] = useState(initialPlate)
  const [microKg, selectMicro] = useState(0)
  return { plateIndex, microKg, selectPlate, selectMicro }
}
