/**
 * Async-resource hooks for each screen's data.
 *
 * Kept intentionally small (no react-query dependency). Each hook returns
 * { data, loading, error, refresh } and refetches when the engagement id
 * changes. Components pick the fields they need.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  api,
  type BudgetOptimizationPayload,
  type ChannelPerformancePayload,
  type CurrentStatePayload,
  type DiagnosisPayload,
  type ExecutiveSummaryPayload,
  type MarketContextPayload,
  type PillarsPayload,
  type PlanPayload,
  type RecommendationItem,
} from './api';
import { useEngagement } from './engagement';

export interface Resource<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

function useResource<T>(fetcher: () => Promise<T>, deps: unknown[]): Resource<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetcherRef
      .current()
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Request failed');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const refresh = useCallback(() => setTick((t) => t + 1), []);
  return { data, loading, error, refresh };
}

// ─── Per-screen hooks ────────────────────────────────────────────────────

export function useExecutiveSummary(): Resource<ExecutiveSummaryPayload> {
  const { currentId } = useEngagement();
  return useResource(() => api.executiveSummary(currentId), [currentId]);
}

export function useChannelPerformance(): Resource<ChannelPerformancePayload> {
  const { currentId } = useEngagement();
  return useResource(() => api.channelPerformance(currentId), [currentId]);
}

export function useBudgetOptimization(): Resource<BudgetOptimizationPayload> {
  const { currentId } = useEngagement();
  return useResource(() => api.budgetOptimization(currentId), [currentId]);
}

export function usePlan(): Resource<PlanPayload> {
  const { currentId } = useEngagement();
  return useResource(() => api.plan(currentId), [currentId]);
}

export function useDiagnosis(): Resource<DiagnosisPayload> {
  const { currentId } = useEngagement();
  return useResource(() => api.diagnosis(currentId), [currentId]);
}

export function useRecommendations(): Resource<RecommendationItem[]> {
  return useResource(() => api.recommendations(), []);
}

export function useCurrentState(): Resource<CurrentStatePayload> {
  return useResource(() => api.currentState(), []);
}

export function usePillars(): Resource<PillarsPayload> {
  return useResource(() => api.pillars(), []);
}

export function useMarketContext(): Resource<MarketContextPayload> {
  const { currentId } = useEngagement();
  return useResource(() => api.marketContext(currentId), [currentId]);
}
