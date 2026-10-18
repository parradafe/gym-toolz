import type { Unit } from './types'

export function formatWeight(value: number): string {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1)
}

export function statusText(weight: number, unit: Unit, isPair: boolean): string {
  const label = `${formatWeight(weight)} ${unit}`
  return isPair ? `Configuración: Par de ${label}` : `Configuración: Mancuerna Única de ${label}`
}
