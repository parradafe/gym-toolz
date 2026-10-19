export interface MicroOption {
  kg: number
  /** Classes applied while this option is the selected one. */
  activeClassName: string
}

export interface CableLoad {
  /** Weight of the plates lifted by the pin. */
  stackKg: number
  microKg: number
  /** stackKg + microKg, what the machine is set to. */
  rawKg: number
}
