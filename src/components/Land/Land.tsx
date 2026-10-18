import { BarTypeSelector } from "./components/BarTypeSelector";
import { EquipmentTabs } from "./components/EquipmentTabs";
import { HeroTotal } from "./components/HeroTotal";
import { PlateControls } from "./components/PlateControls";
import { SessionActions } from "./components/SessionActions";
import { SetSavedModal } from "./components/SetSavedModal";
import { SleeveVisualizer } from "./components/SleeveVisualizer";
import { Dumbells } from "../dumbells/Dumbells";
import { CableTotal } from "../plates/CableTotal";
import { PlateTower } from "../plates/PlateTower";
import { usePlateTower } from "../plates/usePlateTower";
import { calcCableLoad } from "../plates/utils";
import {
  EQUIPMENT_TABS,
  FRACTIONAL_PLATES,
  PLATE_CARDS,
} from "./data";
import { useLoadCalculator } from "./useLoadCalculator";
import { formatWeight } from "../../lib/units";
import { describePlates, expandDiscs, getActivePlates } from "./utils";

export function Land() {
  const calculator = useLoadCalculator();
  const { calc, unit, isBarbell, barKg } = calculator;
  const isCables = calculator.mode === "cables";
  const isDumbbell = calculator.mode === "dumbbell";
  const tower = usePlateTower();
  const cableLoad = calcCableLoad(
    tower.plateIndex,
    calculator.cableStepKg,
    tower.microKg,
    calculator.cableRatio,
  );

  const activePlates = getActivePlates(calculator.plates);
  const savedWeight = formatWeight(calc.totalKg, unit);

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
              plateIndex={tower.plateIndex}
              microKg={tower.microKg}
              stepKg={calculator.cableStepKg}
              onSelectPlate={tower.selectPlate}
              onSelectMicro={tower.selectMicro}
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
        {isCables ? (
          <CableTotal
            unit={unit}
            onUnitChange={calculator.setUnit}
            load={cableLoad}
            ratio={calculator.cableRatio}
          />
        ) : (
          <>
            <PlateControls
              plateCards={PLATE_CARDS.filter((card) => calculator.isListed(card.weight))}
              fractionals={FRACTIONAL_PLATES.filter((f) => calculator.isListed(f.weight))}
              canAdd={calculator.canAdd}
              plates={calculator.plates}
              onAdd={calculator.addPlate}
              onRemove={calculator.removePlate}
            />
            <HeroTotal
              unit={unit}
              onUnitChange={calculator.setUnit}
              calc={calc}
              isBarbell={isBarbell}
              barKg={barKg}
            />

          </>
        )}

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
