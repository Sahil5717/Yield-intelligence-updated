import { useCallback, useEffect, useRef } from 'react';
import { usePersistentState } from '../../lib/usePersistentState';

// The 11 opps auto-selected on first visit (from the original shared.js defaults)
const AUTO_SELECTED = [
  'OPP-001', 'OPP-003', 'OPP-008', 'OPP-012', 'OPP-014',
  'OPP-018', 'OPP-049', 'OPP-052', 'OPP-055', 'OPP-067', 'OPP-069',
];

const SEL_KEY = 'yi_selected_opps';
const AUTO_APPLIED_KEY = 'yi_auto_applied_v1';

export interface OppSelectionState {
  selected: string[];
  totalImpactK: number;
}

/**
 * Hook that wires up event-delegated click handling on an opportunities-list
 * container. Call with a ref to a container that holds .opp-row elements with
 * data-opp and data-impact attributes. The hook:
 *   - auto-selects the default set on first visit
 *   - toggles rows on click and persists to sessionStorage
 *   - expands/collapses "Details" panels keyed by data-details-for
 *   - applies the .selected class to rows imperatively
 *   - returns current state (selected IDs, total impact) for the scenario bar
 */
export function useOppSelection(
  containerRef: React.RefObject<HTMLElement | null>,
): OppSelectionState & {
  clear: () => void;
  resetToDefaults: () => void;
} {
  // Selection state. On first ever visit the key is absent → apply defaults.
  const [selected, setSelected] = usePersistentState<string[] | null>(
    SEL_KEY,
    null,
  );

  // If selection is null (never initialized), apply defaults.
  useEffect(() => {
    if (selected === null) {
      setSelected(AUTO_SELECTED.slice());
      try {
        sessionStorage.setItem(AUTO_APPLIED_KEY, 'true');
      } catch {
        /* noop */
      }
    }
  }, [selected, setSelected]);

  // Ref so the DOM event handler always reads fresh selection.
  const selectedRef = useRef<string[]>([]);
  selectedRef.current = selected ?? [];

  // Apply .selected class to rows whenever selection or DOM changes.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const ids = new Set(selected ?? []);
    root.querySelectorAll<HTMLElement>('.opp-row').forEach((row) => {
      const id = row.dataset.opp ?? '';
      if (ids.has(id)) row.classList.add('selected');
      else row.classList.remove('selected');
    });
  }, [selected, containerRef]);

  // Single click handler attached once — delegates by target.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const handler = (ev: Event) => {
      const target = ev.target as HTMLElement;

      // "Details" button toggle
      const detailsBtn = target.closest<HTMLElement>(
        '.opp-details-btn, [data-toggle-details]',
      );
      if (detailsBtn) {
        ev.stopPropagation();
        const forId =
          detailsBtn.dataset.toggleDetails ??
          detailsBtn.closest<HTMLElement>('.opp-row')?.dataset.opp;
        if (!forId) return;
        const panel = root.querySelector<HTMLElement>(
          `[data-details-for="${forId}"]`,
        );
        if (panel) panel.classList.toggle('show');
        return;
      }

      // Row click toggles selection
      const row = target.closest<HTMLElement>('.opp-row');
      if (!row || !root.contains(row)) return;
      const id = row.dataset.opp;
      if (!id) return;

      setSelected((prev) => {
        const current = prev ?? [];
        return current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id];
      });
    };

    root.addEventListener('click', handler);
    return () => root.removeEventListener('click', handler);
  }, [containerRef, setSelected]);

  // Total impact sums from current DOM (source of truth for data-impact values).
  const totalImpactK = (() => {
    const root = containerRef.current;
    if (!root) return 0;
    let sum = 0;
    (selected ?? []).forEach((id) => {
      const row = root.querySelector<HTMLElement>(`.opp-row[data-opp="${id}"]`);
      if (row) sum += parseFloat(row.dataset.impact ?? '0') || 0;
    });
    return sum;
  })();

  const clear = useCallback(() => setSelected([]), [setSelected]);
  const resetToDefaults = useCallback(
    () => setSelected(AUTO_SELECTED.slice()),
    [setSelected],
  );

  return {
    selected: selected ?? [],
    totalImpactK,
    clear,
    resetToDefaults,
  };
}
