import type {
  BarConfig,
  CalibrationRow,
  CableStep,
  FractionalPlateConfig,
  Option,
  PlateConfig,
} from './types'

export const PLATES: PlateConfig[] = [
  {
    id: '45',
    weight: 45,
    name: 'Rojo Competición IWF',
    circleClassName: 'bg-secondary-container text-white',
    badgeClassName: 'bg-primary-container',
    defaultStock: 4,
  },
  {
    id: '35',
    weight: 35,
    name: 'Azul Olímpico',
    circleClassName: 'bg-tertiary text-white',
    badgeClassName: 'bg-primary-container',
    defaultStock: 6,
  },
  {
    id: '25',
    weight: 25,
    name: 'Amarillo Estándar',
    circleClassName: 'bg-primary-container text-on-surface',
    badgeClassName: 'bg-white',
    defaultStock: 4,
  },
  {
    id: '10',
    weight: 10,
    name: 'Verde Bumper',
    circleClassName: 'bg-plate-green text-white',
    badgeClassName: 'bg-primary-container',
    defaultStock: 4,
  },
]

export const FRACTIONAL_PLATES: FractionalPlateConfig[] = [
  {
    id: '5',
    weight: 5,
    discClassName: 'bg-surface-container-lowest text-on-surface text-xs',
  },
  {
    id: '2.5',
    weight: 2.5,
    discClassName: 'bg-inverse-surface text-inverse-on-surface text-xs',
  },
]

export const BARS: BarConfig[] = [
  {
    id: 'olympic',
    kg: 20,
    name: 'Barra Olímpica Estándar',
    icon: 'straighten',
    length: '2.20M',
    defaultActive: true,
  },
  {
    id: 'olympic-women',
    kg: 15,
    name: 'Barra Olímpica Femenina',
    icon: 'straighten',
    length: '2.01M',
    defaultActive: true,
  },
  {
    id: 'z-curl',
    kg: 10,
    name: 'Barra Z (EZ Curl)',
    icon: 'show_chart',
    defaultActive: true,
  },
  {
    id: 'triceps',
    kg: 12,
    name: 'Barra Romana (Tríceps)',
    icon: 'view_carousel',
    defaultActive: false,
  },
  {
    id: 'trap',
    kg: 25,
    name: 'Barra Hexagonal / Trap Bar',
    icon: 'hexagon',
    defaultActive: true,
  },
]

export const CABLE_STEPS: CableStep[] = [
  { id: '5', kg: 5 },
  { id: '4.5', kg: 4.5, lb: 10 },
  { id: '2.5', kg: 2.5 },
]

export const CABLE_RATIOS: Option[] = [
  { id: '1:1', label: '1:1' },
  { id: '2:1', label: '2:1 (½ Peso)' },
]

export const CALIBRATION_ROWS: CalibrationRow[] = [
  { id: 'plate-25', name: 'Disco Nominal', nominalKg: 25, measuredKg: 25.2 },
  { id: 'plate-20', name: 'Disco Nominal', nominalKg: 20, measuredKg: 20.1 },
  { id: 'bar-20', name: 'Barra Olímpica', nominalKg: 20, measuredKg: 20 },
]

export const DEFAULT_CABLE_STEP = '5'
export const DEFAULT_CABLE_RATIO = '2:1'
export const TOAST_MS = 2400
