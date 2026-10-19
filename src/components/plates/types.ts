export interface MicroOption {
  kg: number
  label: string
  /** Classes applied while this option is the selected one. */
  activeClassName: string
}

/** 1 = direct pulley, 2 = 2:1 (the cable travels twice the distance, half the load). */
export type CableRatio = 1 | 2

export interface CableLoad {
  /** Weight of the plates lifted by the pin. */
  stackKg: number
  microKg: number
  /** stackKg + microKg, what the machine actually moves. */
  rawKg: number
  /** Resistance felt at the handle. */
  effectiveKg: number
}
