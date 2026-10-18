import { BarTypeSelector } from "./components/BarTypeSelector";
import { EquipmentTabs } from "./components/EquipmentTabs";
import { HeroTotal } from "./components/HeroTotal";
import { PlateControls } from "./components/PlateControls";
import { SessionActions } from "./components/SessionActions";
import { SetSavedModal } from "./components/SetSavedModal";
import { SleeveVisualizer } from "./components/SleeveVisualizer";
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
        <SleeveVisualizer
          discs={expandDiscs(activePlates)}
          knurlLabel={isBarbell ? formatWeight(barKg, unit) : "MANGO"}
          sleeveDetail={describePlates(activePlates, calc.perSideKg, unit)}
          onClear={calculator.clearPlates}
        />
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
