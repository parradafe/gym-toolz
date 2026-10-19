import { formatPlateTag, lbToKg } from "../../../lib/units";
import { useUnit } from "../../../store/useGymStore";
import { Chip } from "../../shared/Chip";
import { Icon } from "../../shared/Icon";
import { PLATE_VISUALS } from "../data";
import type { PlateWeight } from "../types";

interface SleeveVisualizerProps {
  /** Discs of one sleeve, heaviest (closest to the collar) first. */
  discs: PlateWeight[];
  knurlLabel: string;
  sleeveDetail: string;
  onClear: () => void;
}

function PlateDisc({ weight }: { weight: PlateWeight }) {
  const visual = PLATE_VISUALS[weight];
  const unit = useUnit();
  return (
    <div
      className={`${visual.className} flex flex-col items-center justify-center text-center rounded-xs comic-stroke-thin shadow-comic-sm transition-all shrink-0 select-none`}
      style={{ width: visual.width, height: visual.height }}
    >
      <span className="rotate-90 whitespace-nowrap font-bold text-micro leading-none tracking-tighter uppercase font-label-sm">
        {formatPlateTag(lbToKg(weight), unit)}
      </span>
    </div>
  );
}

/* function SleeveDetail({
  title,
  detail,
  align,
}: {
  title: string;
  detail: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={`bg-surface-container-low px-2 py-1 rounded-lg comic-stroke-thin shadow-comic-sm ${
        align === "left" ? "text-left" : "text-right"
      }`}
    >
      <span className="text-micro font-bold text-on-surface-variant uppercase tracking-wider block font-label-sm">
        {title}
      </span>
      <span className="text-label-sm font-bold text-on-surface truncate block font-body-sm">
        {detail}
      </span>
    </div>
  );
} */

export function SleeveVisualizer({
  discs,
  knurlLabel,
  onClear,
}: SleeveVisualizerProps) {
  const leftDiscs = [...discs].reverse();

  return (
    <section className="px-margin mt-3">
      <div className="bg-surface p-3.5 comic-panel relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">
              Manga de Carga
            </span>
            {/* <Chip tone="tertiary">Ambos Lados</Chip> */}
          </div>
          <button
            type="button"
            onClick={onClear}
            className="comic-chip comic-press flex items-center gap-1 font-label-sm text-label-sm uppercase px-2.5 py-1 bg-secondary-fixed text-on-secondary-fixed shadow-comic-sm"
          >
            <Icon name="backspace" className="text-sm font-bold" />
            Limpiar Barra
          </button>
        </div>
        <div className="relative w-full h-36 bg-surface-container rounded-lg p-1.5 flex items-center justify-center overflow-hidden comic-stroke shadow-comic-inset">
          <div className="absolute inset-x-2 h-3.5 bg-outline-variant comic-stroke shadow-comic-xs" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="flex-1 flex items-center justify-end pr-1 gap-1 h-full">
              {leftDiscs.map((weight, index) => (
                <PlateDisc key={index} weight={weight} />
              ))}
            </div>
            <div className="h-16 w-2.5 bg-inverse-surface rounded-xs z-20 shrink-0 comic-stroke shadow-comic-xs" />
            <div className="knurl h-5 w-16 bg-surface-dim relative z-20 shrink-0 flex items-center justify-center overflow-hidden comic-stroke">
              <span className="text-micro font-bold bg-surface/90 text-on-surface px-1 rounded-xs border border-on-surface leading-tight uppercase font-label-sm">
                {knurlLabel}
              </span>
            </div>
            <div className="h-16 w-2.5 bg-inverse-surface rounded-xs z-20 shrink-0 comic-stroke shadow-comic-xs" />
            <div className="flex-1 flex items-center justify-start pl-1 gap-1 h-full">
              {discs.map((weight, index) => (
                <PlateDisc key={index} weight={weight} />
              ))}
            </div>
          </div>
          {discs.length === 0 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-surface-container/85">
              <Chip
                tone="surface"
                className="px-3 py-1 uppercase text-on-surface-variant"
              >
                Barra vacía - Agrega discos abajo 🏋️‍♂️
              </Chip>
            </div>
          )}
        </div>
        {/*         <div className="grid grid-cols-2 gap-2 mt-2.5 pt-1">
          <SleeveDetail title="Manga Izq" detail={sleeveDetail} align="left" />
          <SleeveDetail title="Manga Der" detail={sleeveDetail} align="right" />
        </div> */}
      </div>
    </section>
  );
}
