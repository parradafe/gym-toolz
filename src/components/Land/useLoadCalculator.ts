import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { selectActiveBars, selectBarKg, selectTotals } from '../../store/selectors'
import { useGymStore } from '../../store/useGymStore'
import type { PlateWeight } from './types'

export function useLoadCalculator() {
  const store = useGymStore()
  const bars = useGymStore(useShallow(selectActiveBars))
  const barKg = useGymStore(selectBarKg)
  const calc = useGymStore(useShallow(selectTotals))
  const [savedModalOpen, setSavedModalOpen] = useState(false)

  /** Plate shows up in Land only if enabled in Config and with stock left. */
  const isListed = (weight: PlateWeight) => {
    const plate = store.plates[String(weight)]
    return !!plate?.enabled && (plate.stock === undefined || plate.stock > 0)
  }

  const canAdd = (weight: PlateWeight) => {
    const stock = store.plates[String(weight)]?.stock
    return isListed(weight) && (stock === undefined || store.loaded[weight] < stock)
  }

  return {
    unit: store.unit,
    setUnit: store.setUnit,
    mode: store.mode,
    setMode: store.setMode,
    barId: store.barId,
    setBarId: store.setBar,
    bars,
    barKg,
    isBarbell: store.mode === 'barbell',
    plates: store.loaded,
    calc,
    isListed,
    canAdd,
    addPlate: store.addPlate,
    removePlate: store.removePlate,
    clearPlates: store.clearPlates,
    savedModalOpen,
    openSavedModal: () => setSavedModalOpen(true),
    closeSavedModal: () => setSavedModalOpen(false),
  }
}
