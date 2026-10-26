import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGymStore } from './useGymStore'

const bars = () => useGymStore.getState().customBars

describe('addCustomBar', () => {
  beforeEach(() => useGymStore.setState({ customBars: [] }))

  it.each([Infinity, NaN, -1, 0, Number('1e999'), 1e6])('rejects kg %p', (kg) => {
    useGymStore.getState().addCustomBar('x', kg)
    expect(bars()).toHaveLength(0)
  })

  it('rejects empty names and truncates long ones', () => {
    useGymStore.getState().addCustomBar('   ', 20)
    expect(bars()).toHaveLength(0)
    useGymStore.getState().addCustomBar('n'.repeat(10_000), 20)
    expect(bars()[0].name.length).toBeLessThanOrEqual(40)
  })

  it('generates distinct ids even within the same millisecond', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1)
    useGymStore.getState().addCustomBar('a', 20)
    useGymStore.getState().addCustomBar('b', 20)
    expect(new Set(bars().map((b) => b.id)).size).toBe(2)
    vi.restoreAllMocks()
  })
})

describe('plates', () => {
  it('addPlate never exceeds the per-side cap', () => {
    for (let i = 0; i < 100; i++) useGymStore.getState().addPlate(2.5)
    expect(useGymStore.getState().loaded[2.5]).toBeLessThanOrEqual(20)
  })
})
