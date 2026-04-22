import { useRegisterAtlasScreen } from '../../atlas/AtlasProvider';
import { OptimizeSimulateBody } from './OptimizeSimulateBody';

/**
 * Optimize & Simulate — screen wrapper.
 *
 * The body is fully wired to /api/budget-optimization and /api/plan;
 * it owns its own loading and error states. See OptimizeSimulateBody's
 * header comment + APPROXIMATIONS.md for what's live vs. approximated.
 */
const ATLAS_CONFIG = {
  screen: '05',
  screenTitle: 'Optimize & Simulate',
  openingNote:
    "Here's where the selected opportunities get composed into a single portfolio outcome. Pick a preset — <em>Conservative</em>, <em>Recommended</em>, or <em>Aggressive</em> — or adjust per-channel sliders. The model respects marginal-ROI curves, so you'll see diminishing returns when a channel approaches saturation. (In this build the sliders remain visual-only; the numbers come directly from the optimizer, but the interactive reflow isn't ported yet — see APPROXIMATIONS.md.)",
  prompts: [
    'Why is "Recommended" preferred over "Aggressive"?',
    'What happens if I zero out Display Retargeting?',
    "What's the confidence interval on the uplift?",
    'How do you handle overlap between channels?',
  ],
};

export function OptimizeSimulate() {
  useRegisterAtlasScreen(ATLAS_CONFIG);
  return <OptimizeSimulateBody />;
}
