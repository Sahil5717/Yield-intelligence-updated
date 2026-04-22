import { useEffect, useRef } from 'react';
import { useRegisterAtlasScreen } from '../../atlas/AtlasProvider';
import { useChannelPerformance } from '../../lib/hooks';
import { LiveDataBanner } from '../../components/LiveDataBanner';
import { PerformanceBody } from './PerformanceBody';

const ATLAS_CONFIG = {
  screen: '03',
  screenTitle: 'Performance',
  openingNote:
    "Here's the channel-by-channel diagnosis. Three channels are at their marginal-ROI frontier — more spend won't buy more return. Four have genuine headroom. The rest are somewhere in between. Click any channel row to expand campaign-level detail.",
  prompts: [
    'Which channels have real headroom?',
    'Why is Display Retargeting underperforming?',
    'How confident is the saturation curve?',
    'What would you cut first?',
  ],
};

export function Performance() {
  useRegisterAtlasScreen(ATLAS_CONFIG);
  const mainRef = useRef<HTMLElement>(null);
  const channelPerf = useChannelPerformance();

  // Expandable channel rows — delegate clicks on .channel-row, toggle subrow visibility.
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const handler = (ev: Event) => {
      const row = (ev.target as HTMLElement).closest<HTMLElement>('.channel-row');
      if (!row || !root.contains(row)) return;
      const id = row.dataset.id;
      if (!id) return;
      const subrow = root.querySelector<HTMLElement>(
        `.campaign-subrow[data-parent="${id}"]`,
      );
      if (!subrow) return;
      const isOpen = row.classList.toggle('expanded');
      subrow.classList.toggle('show', isOpen);
    };
    root.addEventListener('click', handler);
    return () => root.removeEventListener('click', handler);
  }, []);

  return (
    <>
      <LiveDataBanner
        label="Channel Performance"
        resource={channelPerf}
        stats={(d) => [
          ...d.kpis.slice(0, 4).map((k) => ({ label: k.label, value: k.value })),
          { label: 'Channels', value: String(d.summary.length) },
        ]}
      />
      <PerformanceBody ref={mainRef} />
    </>
  );
}
