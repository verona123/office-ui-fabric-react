import { ChecklistStatus } from '../../demo/ComponentStatus/ComponentStatus.types';

export const OverlayStatus = {
  keyboardAccessibilitySupport: ChecklistStatus.unknown,
  markupSupport: ChecklistStatus.unknown,
  highContrastSupport: ChecklistStatus.fail,
  rtlSupport: ChecklistStatus.pass,
  testCoverage: ChecklistStatus.none
};