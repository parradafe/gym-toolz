import { BARS, CABLE_STEPS, MAX_BAR_KG, MAX_BAR_NAME_LENGTH, MAX_MICRO_KG, MAX_PLATE_STOCK, MIN_BAR_KG } from '../components/Config/data'
import type { BarConfig } from '../components/Config/types'
import { DUMBBELL_STEP_LB, MAX_DUMBBELL_LB, MIN_DUMBBELL_LB } from '../components/dumbells/data'
import { MAX_PLATES_PER_SIDE } from '../components/Land/data'
import type { EquipmentMode, PlateWeight } from '../components/Land/types'
import { PLATE_COUNT } from '../components/plates/data'
import type { Unit } from '../components/shared/UnitSwitch'
import type { GymData, PlateState } from './useGymStore'

const UNITS: readonly Unit[] = ['KG', 'LBS']
const MODES: readonly EquipmentMode[] = ['barbell', 'dumbbell', 'kettlebell', 'cables']
const PLATE_WEIGHTS: readonly PlateWeight[] = [45, 35, 25, 10, 5, 2.5]

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const isInt = (v: unknown, min: number, max: number): v is number =>
  typeof v === 'number' && Number.isInteger(v) && v >= min && v <= max

const isNum = (v: unknown, min: number, max: number): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max

/** Own, non-prototype keys only: persisted JSON must not be able to reach `__proto__`. */
const entries = (v: unknown): [string, unknown][] => (isRecord(v) ? Object.entries(v) : [])

export function sanitizeBarInput(name: unknown, kg: unknown): { name: string; kg: number } | null {
  if (typeof name !== 'string' || !isNum(kg, MIN_BAR_KG, MAX_BAR_KG)) return null
  const trimmed = name.trim().slice(0, MAX_BAR_NAME_LENGTH)
  return trimmed ? { name: trimmed, kg } : null
}

function sanitizePlates(raw: unknown): Record<string, PlateState> | undefined {
  if (!isRecord(raw)) return undefined
  const out: Record<string, PlateState> = {}
  for (const [id, v] of entries(raw)) {
    if (!PLATE_WEIGHTS.some((w) => String(w) === id) || !isRecord(v)) continue
    out[id] = {
      enabled: v.enabled !== false,
      ...(isInt(v.stock, 0, MAX_PLATE_STOCK) ? { stock: v.stock } : {}),
    }
  }
  return out
}

function sanitizeLoaded(raw: unknown): Partial<Record<PlateWeight, number>> | undefined {
  if (!isRecord(raw)) return undefined
  const out: Partial<Record<PlateWeight, number>> = {}
  for (const w of PLATE_WEIGHTS) {
    const v = raw[String(w)]
    if (isInt(v, 0, MAX_PLATES_PER_SIDE)) out[w] = v
  }
  return out
}

function sanitizeCustomBars(raw: unknown): BarConfig[] {
  if (!Array.isArray(raw)) return []
  const seen = new Set<string>(BARS.map((b) => b.id))
  const out: BarConfig[] = []
  for (const item of raw) {
    if (!isRecord(item) || typeof item.id !== 'string' || seen.has(item.id)) continue
    const bar = sanitizeBarInput(item.name, item.kg)
    if (!bar) continue
    seen.add(item.id)
    out.push({ ...bar, id: item.id, icon: 'fitness_center', defaultActive: true, custom: true })
  }
  return out
}

function sanitizeBarActive(raw: unknown): Record<string, boolean> | undefined {
  if (!isRecord(raw)) return undefined
  return Object.fromEntries(entries(raw).filter(([, v]) => typeof v === 'boolean')) as Record<string, boolean>
}

function sanitizeCable(raw: unknown): Partial<GymData['cable']> | undefined {
  if (!isRecord(raw)) return undefined
  return {
    ...(typeof raw.step === 'string' && CABLE_STEPS.some((s) => s.id === raw.step) ? { step: raw.step } : {}),
    ...(isInt(raw.plateIndex, 0, PLATE_COUNT - 1) ? { plateIndex: raw.plateIndex } : {}),
    ...(isNum(raw.microKg, 0, MAX_MICRO_KG) ? { microKg: raw.microKg } : {}),
  }
}

function sanitizeDumbbell(raw: unknown): Partial<GymData['dumbbell']> | undefined {
  if (!isRecord(raw)) return undefined
  const w = raw.weightLb
  return {
    ...(isNum(w, MIN_DUMBBELL_LB, MAX_DUMBBELL_LB) && w % DUMBBELL_STEP_LB === 0 ? { weightLb: w } : {}),
    ...(isNum(raw.microLb, 0, MAX_MICRO_KG) ? { microLb: raw.microLb } : {}),
    ...(typeof raw.isPair === 'boolean' ? { isPair: raw.isPair } : {}),
  }
}

/**
 * Whitelists a persisted blob. Anything of the wrong type or out of range is dropped
 * so the merge falls back to defaults instead of crashing or freezing the render.
 */
export function sanitizePersisted(raw: unknown): Partial<GymData> {
  if (!isRecord(raw)) return {}
  const unit = UNITS.find((u) => u === raw.unit)
  const mode = MODES.find((m) => m === raw.mode)
  const plates = sanitizePlates(raw.plates)
  const loaded = sanitizeLoaded(raw.loaded) as GymData['loaded'] | undefined
  const barActive = sanitizeBarActive(raw.barActive)
  const cable = sanitizeCable(raw.cable) as GymData['cable'] | undefined
  const dumbbell = sanitizeDumbbell(raw.dumbbell) as GymData['dumbbell'] | undefined
  return {
    ...(unit && { unit }),
    ...(mode && { mode }),
    ...(typeof raw.barId === 'string' && { barId: raw.barId }),
    ...(plates && { plates }),
    ...(loaded && { loaded }),
    ...(barActive && { barActive }),
    ...(cable && { cable }),
    ...(dumbbell && { dumbbell }),
    customBars: sanitizeCustomBars(raw.customBars),
  }
}
