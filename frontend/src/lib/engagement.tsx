/**
 * Engagement context.
 *
 * Most backend read endpoints accept ?engagement_id=. We fetch the list
 * once (after auth), pick `default_id` as the starting engagement, and
 * expose a setter so a future dropdown can switch. Unknown engagements
 * fall back to the default rather than breaking the app.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { api } from './api';
import { useAuth } from './auth';

interface Engagement {
  id: string;
  name: string;
  currency: string;
  locale: string;
}

interface EngagementContextValue {
  engagements: Engagement[];
  currentId: string;
  current: Engagement | null;
  setCurrentId: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const EngagementContext = createContext<EngagementContextValue | null>(null);

const FALLBACK_ID = 'default';

export function EngagementProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [currentId, setCurrentIdState] = useState<string>(FALLBACK_ID);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setEngagements([]);
      setCurrentIdState(FALLBACK_ID);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const res = await api.listEngagements();
        if (cancelled) return;
        setEngagements(res.engagements);
        // Prefer the server's declared default, otherwise first in the list.
        const pick = res.default_id || res.engagements[0]?.id || FALLBACK_ID;
        setCurrentIdState(pick);
        setError(null);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : 'Failed to load engagements');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const setCurrentId = useCallback(
    (id: string) => {
      if (engagements.some((e) => e.id === id)) setCurrentIdState(id);
    },
    [engagements],
  );

  const current = useMemo(
    () => engagements.find((e) => e.id === currentId) || null,
    [engagements, currentId],
  );

  const value = useMemo(
    () => ({ engagements, currentId, current, setCurrentId, loading, error }),
    [engagements, currentId, current, setCurrentId, loading, error],
  );

  return (
    <EngagementContext.Provider value={value}>{children}</EngagementContext.Provider>
  );
}

export function useEngagement(): EngagementContextValue {
  const ctx = useContext(EngagementContext);
  if (!ctx) throw new Error('useEngagement must be used inside <EngagementProvider>');
  return ctx;
}
