export type { Unit } from "../shared/UnitSwitch";

export type EquipmentMode = "barbell" | "dumbbell" | "kettlebell" | "cables";

/** Plate weights in lb; converted to the active unit at render time. */
export type PlateWeight = 45 | 35 | 25 | 10 | 5 | 2.5;

export type PlatesPerSide = Record<PlateWeight, number>;

export interface LoadCalculation {
  totalKg: number;
  totalLb: number;
  platesOnlyKg: number;
  perSideKg: number;
}

export interface EquipmentTab {
  mode: EquipmentMode;
  icon: string;
  label: string;
}

/** Look of a plate drawn on the sleeve. Size is data-driven, so it stays inline. */
export interface PlateVisual {
  className: string;
  height: number;
  width: number;
}

export interface PlateCardData {
  weight: PlateWeight;
  circleClassName: string;
}

export interface FractionalPlate {
  weight: PlateWeight;
}
