import { useEffect, useRef, useState } from 'react'
import { selectBars } from '../../store/selectors'
import { useGymStore } from '../../store/useGymStore'
import { FRACTIONAL_PLATES, PLATES, TOAST_MS } from './data'

type Flags = Record<string, boolean>

export function useConfig() {
  const store = useGymStore()
  const [barModalOpen, setBarModalOpen] = useState(false)
  const [calibrationOpen, setCalibrationOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const flash = () => {
    clearTimeout(toastTimer.current)
    setToastVisible(true)
    toastTimer.current = setTimeout(() => setToastVisible(false), TOAST_MS)
  }

  const enabledFlags = (ids: { id: string }[]): Flags =>
    Object.fromEntries(ids.map(({ id }) => [id, store.plates[id]?.enabled ?? true]))

  const bars = selectBars(store)

  return {
    unit: store.unit,
    setUnit: store.setUnit,
    stock: Object.fromEntries(PLATES.map((p) => [p.id, store.plates[p.id]?.stock ?? 0])),
    setPlateStock: store.setPlateStock,
    plateEnabled: enabledFlags(PLATES),
    setPlateEnabled: store.setPlateEnabled,
    fractionalEnabled: enabledFlags(FRACTIONAL_PLATES),
    setFractionalEnabled: store.setPlateEnabled,
    bars,
    barActive: store.barActive,
    setBarActive: store.setBarActive,
    activeBarCount: bars.filter((b) => store.barActive[b.id]).length,
    addBar: store.addCustomBar,
    cableStep: store.cable.step,
    setCableStep: store.setCableStep,
    cableRatio: store.cable.ratio,
    setCableRatio: store.setCableRatio,
    barModalOpen,
    setBarModalOpen,
    calibrationOpen,
    setCalibrationOpen,
    toastVisible,
    // Changes are persisted on every edit; "save" only confirms it to the user.
    save: flash,
    reset: () => {
      store.resetEquipment()
      flash()
    },
  }
}
