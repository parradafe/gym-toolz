import { BarTypeSelector } from "./components/BarTypeSelector";
import { EquipmentTabs } from "./components/EquipmentTabs";
import { HeroTotal } from "./components/HeroTotal";
import { PlateControls } from "./components/PlateControls";
import { SleeveVisualizer } from "./components/SleeveVisualizer";
import { Dumbells } from "../dumbells/Dumbells";
import { PlateTower } from "../plates/PlateTower";
import { calcCableLoad } from "../plates/utils";
import { EQUIPMENT_TABS, FRACTIONAL_PLATES, PLATE_CARDS } from "./data";
import { useLoadCalculator } from "./useLoadCalculator";
import { formatWeight, toUnit } from "../../lib/units";
import { describePlates, expandDiscs, getActivePlates } from "./utils";

export function Land() {
  const calculator = useLoadCalculator();
  const { calc, unit, isBarbell, barKg } = calculator;
  const isCables = calculator.mode === "cables";
  const isDumbbell = calculator.mode === "dumbbell";
  const cableLoad = calcCableLoad(
    calculator.cablePlateIndex,
    calculator.cableMicroKg,
  );

  const activePlates = getActivePlates(calculator.plates);

  return (
    <>
      <div className="flex flex-col w-full pb-8">
        <EquipmentTabs
          tabs={EQUIPMENT_TABS}
          active={calculator.mode}
          onChange={calculator.setMode}
        />
        {isBarbell && (
          <BarTypeSelector
            bars={calculator.bars}
            selectedId={calculator.barId}
            onSelect={calculator.setBarId}
          />
        )}
        {isCables ? (
          <section className="px-margin mt-3">
            <PlateTower
              plateIndex={calculator.cablePlateIndex}
              microKg={calculator.cableMicroKg}
              unit={calculator.unit}
              onSelectPlate={calculator.selectCablePlate}
              onSelectMicro={calculator.selectCableMicro}
            />
          </section>
        ) : isDumbbell ? (
          <section className="px-margin mt-3">
            <Dumbells />
          </section>
        ) : (
          <SleeveVisualizer
            discs={expandDiscs(activePlates)}
            knurlLabel={isBarbell ? formatWeight(barKg, unit) : "MANGO"}
            sleeveDetail={describePlates(activePlates, calc.perSideKg, unit)}
            onClear={calculator.clearPlates}
          />
        )}
        {!isCables && !isDumbbell && (
          <PlateControls
            plateCards={PLATE_CARDS.filter((card) =>
              calculator.isListed(card.weight),
            )}
            fractionals={FRACTIONAL_PLATES.filter((f) =>
              calculator.isListed(f.weight),
            )}
            canAdd={calculator.canAdd}
            plates={calculator.plates}
            onAdd={calculator.addPlate}
            onRemove={calculator.removePlate}
          />
        )}
        <HeroTotal
          unit={unit}
          onUnitChange={calculator.setUnit}
          calc={
            isCables
              ? {
                  totalKg: cableLoad.rawKg,
                  totalLb: toUnit(cableLoad.rawKg, "LBS"),
                  platesOnlyKg: 0,
                  perSideKg: 0,
                }
              : calc
          }
          isBarbell={isBarbell}
          barKg={barKg}
          cable={isCables ? cableLoad : undefined}
        />

        {/* <SessionActions onLogSet={calculator.openSavedModal} /> */}
      </div>
      {/* <SetSavedModal
        open={calculator.savedModalOpen}
        weightLabel={savedWeight}
        onClose={calculator.closeSavedModal}
      /> */}
    </>
  );
}
