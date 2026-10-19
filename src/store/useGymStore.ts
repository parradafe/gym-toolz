import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  BARS,
  DEFAULT_CABLE_RATIO,
  DEFAULT_CABLE_STEP,
  FRACTIONAL_PLATES,
  PLATES,
} from '../components/Config/data'
import type { BarConfig } from '../components/Config/types'
import { EMPTY_PLATES, INITIAL_PLATES } from '../components/Land/data'
import type { EquipmentMode, PlatesPerSide, PlateWeight } from '../components/Land/types'
import { DEFAULT_PLATE_INDEX } from '../components/plates/data'
import type { Unit } from '../components/shared/UnitSwitch'
import { DEFAULT_DUMBBELL_LB } from '../components/dumbells/data'

export const STORAGE_KEY = 'gym-toolz:v1'

/** `stock` is in pairs (units per side). Undefined means unlimited. */
export interface PlateState {
  enabled: boolean
  stock?: number
}

interface GymData {
  unit: Unit
  /** Keyed by plate weight as string ('25', '2.5'...). */
  plates: Record<string, PlateState>
  customBars: BarConfig[]
  barActive: Record<string, boolean>
  /** `step`/`ratio` are Config; `plateIndex`/`microKg` are the pin position in Land. */
  cable: { step: string; ratio: string; plateIndex: number; microKg: number }
  /** Land session. Weight is per dumbbell, in lb. */
  dumbbell: { weightLb: number; microLb: number; isPair: boolean }
  /** Land session. */
  mode: EquipmentMode
  barId: string
  loaded: PlatesPerSide
}

interface GymActions {
  setUnit: (unit: Unit) => void
  setPlateStock: (id: string, stock: number) => void
  setPlateEnabled: (id: string, enabled: boolean) => void
  setBarActive: (id: string, active: boolean) => void
  addCustomBar: (name: string, kg: number) => void
  removeCustomBar: (id: string) => void
  setCableStep: (step: string) => void
  setCableRatio: (ratio: string) => void
  setCablePlate: (plateIndex: number) => void
  setCableMicro: (microKg: number) => void
  setDumbbellWeight: (weightLb: number) => void
  setDumbbellMicro: (microLb: number) => void
  setDumbbellPair: (isPair: boolean) => void
  resetEquipment: () => void
  setMode: (mode: EquipmentMode) => void
  setBar: (id: string) => void
  addPlate: (weight: PlateWeight) => void
  removePlate: (weight: PlateWeight) => void
  clearPlates: () => void
}

export type GymState = GymData & GymActions

const defaultPlates = (): Record<string, PlateState> => ({
  ...Object.fromEntries(PLATES.map((p) => [p.id, { enabled: true, stock: p.defaultStock }])),
  ...Object.fromEntries(FRACTIONAL_PLATES.map((p) => [p.id, { enabled: true }])),
})

const defaultBarActive = (): Record<string, boolean> =>
  Object.fromEntries(BARS.map((b) => [b.id, b.defaultActive]))

const defaultEquipment = () => ({
  plates: defaultPlates(),
  customBars: [] as BarConfig[],
  barActive: defaultBarActive(),
  cable: {
    step: DEFAULT_CABLE_STEP,
    ratio: DEFAULT_CABLE_RATIO,
    plateIndex: DEFAULT_PLATE_INDEX,
    microKg: 0,
  },
})

const initialData = (): GymData => ({
  unit: 'LBS',
  ...defaultEquipment(),
  mode: 'barbell',
  barId: BARS[0].id,
  loaded: { ...INITIAL_PLATES },
  dumbbell: { weightLb: DEFAULT_DUMBBELL_LB, microLb: 0, isPair: true },
})

/**
 * Keeps the Land session consistent with the equipment config: the selected bar
 * must be active and loaded plates must be enabled and within stock.
 */
function reconcile(s: GymData): Partial<GymData> {
  const bars = [...BARS, ...s.customBars]
  const activeBars = bars.filter((b) => s.barActive[b.id])
  const barId = activeBars.some((b) => b.id === s.barId) ? s.barId : (activeBars[0]?.id ?? '')

  const loaded = { ...s.loaded }
  for (const key of Object.keys(loaded) as unknown as PlateWeight[]) {
    const plate = s.plates[String(key)]
    if (!plate?.enabled) loaded[key] = 0
    else if (plate.stock !== undefined) loaded[key] = Math.min(loaded[key], plate.stock)
  }
  return { barId, loaded }
}

/** Active display unit. Weights are always stored in kg; this only affects presentation. */
export const useUnit = (): Unit => useGymStore((s) => s.unit)

export const useGymStore = create<GymState>()(
  persist(
    (set) => ({
      ...initialData(),

      setUnit: (unit) => set({ unit }),

      setPlateStock: (id, stock) =>
        set((s) => {
          const plates = { ...s.plates, [id]: { ...s.plates[id], stock: Math.max(0, stock) } }
          return { plates, ...reconcile({ ...s, plates }) }
        }),

      setPlateEnabled: (id, enabled) =>
        set((s) => {
          const plates = { ...s.plates, [id]: { ...s.plates[id], enabled } }
          return { plates, ...reconcile({ ...s, plates }) }
        }),

      setBarActive: (id, active) =>
        set((s) => {
          const barActive = { ...s.barActive, [id]: active }
          return { barActive, ...reconcile({ ...s, barActive }) }
        }),

      addCustomBar: (name, kg) =>
        set((s) => {
          const id = `custom-${Date.now()}`
          const bar: BarConfig = {
            id,
            kg,
            name,
            icon: 'fitness_center',
            defaultActive: true,
            custom: true,
          }
          const customBars = [...s.customBars, bar]
          const barActive = { ...s.barActive, [id]: true }
          return { customBars, barActive, ...reconcile({ ...s, customBars, barActive }) }
        }),

      removeCustomBar: (id) =>
        set((s) => {
          const customBars = s.customBars.filter((b) => b.id !== id)
          const barActive = Object.fromEntries(
            Object.entries(s.barActive).filter(([key]) => key !== id),
          )
          return { customBars, barActive, ...reconcile({ ...s, customBars, barActive }) }
        }),

      setCableStep: (step) => set((s) => ({ cable: { ...s.cable, step } })),
      setCableRatio: (ratio) => set((s) => ({ cable: { ...s.cable, ratio } })),
      setCablePlate: (plateIndex) => set((s) => ({ cable: { ...s.cable, plateIndex } })),
      setCableMicro: (microKg) => set((s) => ({ cable: { ...s.cable, microKg } })),

      setDumbbellWeight: (weightLb) => set((s) => ({ dumbbell: { ...s.dumbbell, weightLb } })),
      setDumbbellMicro: (microLb) => set((s) => ({ dumbbell: { ...s.dumbbell, microLb } })),
      setDumbbellPair: (isPair) => set((s) => ({ dumbbell: { ...s.dumbbell, isPair } })),

      resetEquipment: () =>
        set((s) => {
          const next = { ...s, unit: 'LBS' as Unit, ...defaultEquipment() }
          return { unit: next.unit, ...defaultEquipment(), ...reconcile(next) }
        }),

      setMode: (mode) => set({ mode }),
      setBar: (barId) => set({ barId }),

      addPlate: (weight) =>
        set((s) => {
          const plate = s.plates[String(weight)]
          if (!plate?.enabled) return s
          if (plate.stock !== undefined && s.loaded[weight] >= plate.stock) return s
          return { loaded: { ...s.loaded, [weight]: s.loaded[weight] + 1 } }
        }),

      removePlate: (weight) =>
        set((s) => ({ loaded: { ...s.loaded, [weight]: Math.max(0, s.loaded[weight] - 1) } })),

      clearPlates: () => set({ loaded: { ...EMPTY_PLATES } }),
    }),
    {
      name: STORAGE_KEY,
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: ({
        unit,
        plates,
        customBars,
        barActive,
        cable,
        mode,
        barId,
        loaded,
        dumbbell,
      }): GymData => ({
        unit,
        plates,
        customBars,
        barActive,
        cable,
        mode,
        barId,
        loaded,
        dumbbell,
      }),
      // Merge over defaults so ids added in later releases (new plates/bars) still exist.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<GymData>
        const merged: GymState = {
          ...current,
          ...p,
          plates: { ...current.plates, ...p.plates },
          barActive: { ...current.barActive, ...p.barActive },
          cable: { ...current.cable, ...p.cable },
          loaded: { ...current.loaded, ...p.loaded },
          dumbbell: { ...current.dumbbell, ...p.dumbbell },
          customBars: Array.isArray(p.customBars) ? p.customBars : [],
        }
        return { ...merged, ...reconcile(merged) }
      },
      // v2: plate weights are keyed in lb, so drop plate config and loaded plates saved in kg.
      migrate: (persisted, version) => {
        const p = (persisted ?? {}) as Partial<GymData>
        if (version < 2) {
          delete p.plates
          delete p.loaded
        }
        return p as GymData
      },
    },
  ),
)
