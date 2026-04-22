import { useRegisterAtlasScreen } from '../../atlas/AtlasProvider';
import { AttributionTrustBody } from './AttributionTrustBody';

/**
 * Attribution & Data Trust — screen wrapper.
 *
 * The body is fully wired to /api/diagnosis and owns its own loading /
 * error states. See AttributionTrustBody's header comment +
 * APPROXIMATIONS.md for what's live vs. approximated.
 */
const ATLAS_CONFIG = {
  screen: '04',
  screenTitle: 'Attribution & Data Trust',
  openingNote:
    "This screen shows how the numbers were produced — the methodology, the diagnosis findings with their confidence tiers, and (once the backend exposes it) the data-quality signals. <strong>Treat this as the page your CFO opens first.</strong> If any metric on another screen looks too good to be true, the evidence for it lives here.",
  prompts: [
    'Which methodology stages ran?',
    'Which findings are high-confidence?',
    'What data sources feed the model?',
    'How do you handle attribution signal loss?',
  ],
};

export function AttributionTrust() {
  useRegisterAtlasScreen(ATLAS_CONFIG);
  return <AttributionTrustBody />;
}
