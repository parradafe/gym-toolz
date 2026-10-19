import type {
  EquipmentTab,
  FractionalPlate,
  PlateCardData,
  PlatesPerSide,
  PlateVisual,
  PlateWeight,
} from "./types";

export const INITIAL_PLATES: PlatesPerSide = {
  45: 1,
  35: 0,
  25: 0,
  10: 1,
  5: 0,
  2.5: 0,
};

export const EMPTY_PLATES: PlatesPerSide = {
  45: 0,
  35: 0,
  25: 0,
  10: 0,
  5: 0,
  2.5: 0,
};

export const EQUIPMENT_TABS: EquipmentTab[] = [
  { mode: "barbell", icon: "fitness_center", label: "Barra" },
  { mode: "dumbbell", icon: "exercise", label: "Mancuernas" },
  /* { mode: 'kettlebell', icon: 'sports_gymnastics', label: 'Kettlebell' }, */
  { mode: "cables", icon: "view_stream", label: "Poleas" },
];

export const PLATE_CARDS: PlateCardData[] = [
  { weight: 45, circleClassName: "bg-secondary text-on-secondary" },
  { weight: 35, circleClassName: "bg-tertiary text-on-tertiary" },
  { weight: 25, circleClassName: "bg-primary-fixed-dim text-on-primary-fixed" },
  { weight: 10, circleClassName: "bg-primary text-on-primary" },
  { weight: 5, circleClassName: "bg-surface-container-high text-on-surface" },
];

export const FRACTIONAL_PLATES: FractionalPlate[] = [{ weight: 2.5 }];

export const PLATE_VISUALS: Record<PlateWeight, PlateVisual> = {
  45: { className: "bg-plate-25 text-white", height: 112, width: 18 },
  35: { className: "bg-plate-20 text-white", height: 102, width: 17 },
  25: { className: "bg-plate-15 text-on-primary-fixed", height: 88, width: 15 },
  10: { className: "bg-plate-10 text-white", height: 76, width: 13 },
  5: { className: "bg-plate-5 text-ink", height: 60, width: 11 },
  2.5: { className: "bg-plate-2-5 text-white", height: 46, width: 9 },
};
