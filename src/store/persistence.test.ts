import { beforeEach, describe, expect, it } from 'vitest'
import { MAX_PLATES_PER_SIDE } from '../components/Land/data'
import { expandDiscs } from '../components/Land/utils'
import { sanitizePersisted } from './persistence'
import { STORAGE_KEY, useGymStore } from './useGymStore'

const hostileLoaded = (value: unknown) => sanitizePersisted({ loaded: { 45: value } }).loaded?.[45]

describe('sanitizePersisted', () => {
  it.each([1e9, 1e308, Infinity, NaN, -3, 2.5, '7', null, {}])('drops loaded plate count %p', (v) => {
    expect(hostileLoaded(v)).toBeUndefined()
  })

  it('keeps a valid plate count', () => {
    expect(hostileLoaded(3)).toBe(3)
    expect(hostileLoaded(MAX_PLATES_PER_SIDE)).toBe(MAX_PLATES_PER_SIDE)
  })

  it('rejects unknown enums and out-of-range indices', () => {
    const out = sanitizePersisted({
      mode: '__proto__',
      unit: 5,
      cable: { plateIndex: 9999, step: 'x', microKg: 'a' },
      dumbbell: { weightLb: 'abc', microLb: Infinity, isPair: 'yes' },
    })
    expect(out.mode).toBeUndefined()
    expect(out.unit).toBeUndefined()
    expect(out.cable).toEqual({})
    expect(out.dumbbell).toEqual({})
  })

  it('discards malformed custom bars and duplicate ids', () => {
    const out = sanitizePersisted({
      customBars: [
        null,
        {},
        { id: 'a', name: 5, kg: 20 },
        { id: 'b', name: 'ok', kg: Infinity },
        { id: 'c', name: 'ok', kg: 20 },
        { id: 'c', name: 'dup', kg: 25 },
        { id: 'olympic', name: 'clash', kg: 25 },
      ],
    })
    expect(out.customBars?.map((b) => b.id)).toEqual(['c'])
  })

  it.each([null, 'x', [], 42])('returns no state for non-object %p', (v) => {
    expect(sanitizePersisted(v)).toEqual({})
  })
})

describe('store rehydration with hostile storage', () => {
  beforeEach(() => localStorage.clear())

  it('falls back to safe values instead of crashing', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 2,
        state: { loaded: { 45: 1e9, 2.5: 1e9 }, mode: 'nope', cable: { plateIndex: 1e6 }, customBars: [{ id: 1 }] },
      }),
    )
    await useGymStore.persist.rehydrate()
    const s = useGymStore.getState()
    expect(Object.values(s.loaded).every((n) => Number.isInteger(n) && n <= MAX_PLATES_PER_SIDE)).toBe(true)
    expect(s.mode).toBe('barbell')
    expect(s.cable.plateIndex).toBeLessThan(8)
    expect(s.customBars).toEqual([])
  })
})

describe('expandDiscs', () => {
  it('caps absurd counts without throwing', () => {
    expect(expandDiscs([{ weight: 45, count: 1e9 }])).toHaveLength(MAX_PLATES_PER_SIDE)
  })
})
