import type { MicroOption } from './types'

export const PLATE_COUNT = 8
export const DEFAULT_PLATE_INDEX = 7

export const MICRO_OPTIONS: MicroOption[] = [
  { kg: 0, activeClassName: 'bg-surface-container-lowest text-on-surface' },
  { kg: 1.25, activeClassName: 'bg-primary-container text-on-primary-container' },
  { kg: 2.5, activeClassName: 'bg-secondary-container text-on-secondary-container' },
]
