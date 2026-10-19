import { BarsPanel } from './components/BarsPanel'
import { CablesPanel } from './components/CablesPanel'
import { CalibrationModal } from './components/CalibrationModal'
import { ConfigActions } from './components/ConfigActions'
import { ConfigHero } from './components/ConfigHero'
import { CustomBarModal } from './components/CustomBarModal'
import { PlatesPanel } from './components/PlatesPanel'
import { SaveToast } from './components/SaveToast'
import {
  CABLE_STEPS,
  CALIBRATION_ROWS,
  FRACTIONAL_PLATES,
  PLATES,
} from './data'
import { useConfig } from './useConfig'

export function Config() {
  const config = useConfig()

  return (
    <>
      <div className="flex flex-col w-full px-margin pb-10 gap-space-lg select-none">
        <ConfigHero unit={config.unit} onUnitChange={config.setUnit} />
        <PlatesPanel
          plates={PLATES}
          fractionals={FRACTIONAL_PLATES}
          stock={config.stock}
          plateEnabled={config.plateEnabled}
          fractionalEnabled={config.fractionalEnabled}
          onStockChange={config.setPlateStock}
          onPlateEnabledChange={config.setPlateEnabled}
          onFractionalEnabledChange={config.setFractionalEnabled}
          onCalibrate={() => config.setCalibrationOpen(true)}
        />
        <BarsPanel
          bars={config.bars}
          active={config.barActive}
          onActiveChange={config.setBarActive}
          onAddCustom={() => config.setBarModalOpen(true)}
        />
        <CablesPanel
          steps={CABLE_STEPS}
          stepId={config.cableStep}
          onStepChange={config.setCableStep}
        />
        <ConfigActions onSave={config.save} onReset={config.reset} />
      </div>
      <CustomBarModal
        open={config.barModalOpen}
        onClose={() => config.setBarModalOpen(false)}
        onAdd={config.addBar}
      />
      <CalibrationModal
        open={config.calibrationOpen}
        rows={CALIBRATION_ROWS}
        onClose={() => config.setCalibrationOpen(false)}
      />
      <SaveToast visible={config.toastVisible} />
    </>
  )
}
