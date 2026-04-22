import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePersistentState } from '../lib/usePersistentState';
import type { AtlasMessage, AtlasScreenConfig } from './types';

interface AtlasContextValue {
  thread: AtlasMessage[];
  seenScreens: string[];
  currentScreen: AtlasScreenConfig | null;
  setScreenConfig: (cfg: AtlasScreenConfig) => void;
  sendUserMessage: (text: string) => void;
  markScreenSeen: (screen: string) => void;
  reset: () => void;
}

const AtlasContext = createContext<AtlasContextValue | null>(null);

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [thread, setThread] = usePersistentState<AtlasMessage[]>(
    'yi_atlas_thread_v1',
    [],
  );
  const [seenScreens, setSeenScreens] = usePersistentState<string[]>(
    'yi_atlas_seen_screens_v1',
    [],
  );
  const [currentScreen, setCurrentScreen] = useState<AtlasScreenConfig | null>(
    null,
  );

  // Guard so StrictMode's double-invoke doesn't post the opening note twice
  const postedKeys = useRef<Set<string>>(new Set());

  const setScreenConfig = useCallback(
    (cfg: AtlasScreenConfig) => {
      setCurrentScreen(cfg);

      const dedupeKey = `opening:${cfg.screen}`;
      if (postedKeys.current.has(dedupeKey)) return;

      setThread((prev) => {
        const alreadyPosted = prev.some(
          (m) => m.type === 'atlas' && m.screen === cfg.screen && m.kind === 'opening',
        );
        if (alreadyPosted) {
          postedKeys.current.add(dedupeKey);
          return prev;
        }
        const next: AtlasMessage[] = [...prev];
        if (next.length > 0) {
          next.push({
            type: 'mark',
            label: 'Now viewing · ' + cfg.screenTitle,
            t: Date.now(),
          });
        }
        next.push({
          type: 'atlas',
          kind: 'opening',
          screen: cfg.screen,
          text: cfg.openingNote,
          t: Date.now(),
        });
        postedKeys.current.add(dedupeKey);
        return next;
      });
    },
    [setThread],
  );

  const sendUserMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setThread((prev) => [...prev, { type: 'user', text: trimmed, t: Date.now() }]);
      // Mock reply — matches the original IIFE's behavior.
      window.setTimeout(() => {
        setThread((prev) => [
          ...prev,
          {
            type: 'atlas',
            text:
              '<em>Atlas would answer here.</em> This is a UI mock — responses will be wired up in phase 2.',
            t: Date.now(),
          },
        ]);
      }, 400);
    },
    [setThread],
  );

  const markScreenSeen = useCallback(
    (screen: string) => {
      setSeenScreens((prev) => (prev.includes(screen) ? prev : [...prev, screen]));
    },
    [setSeenScreens],
  );

  const reset = useCallback(() => {
    try {
      sessionStorage.removeItem('yi_atlas_thread_v1');
      sessionStorage.removeItem('yi_atlas_seen_screens_v1');
    } catch {
      /* noop */
    }
    postedKeys.current.clear();
    setThread([]);
    setSeenScreens([]);
  }, [setThread, setSeenScreens]);

  // Expose a debug reset, matching original window.__yiAtlasReset
  useEffect(() => {
    (window as unknown as { __yiAtlasReset?: () => void }).__yiAtlasReset = () => {
      reset();
      window.location.reload();
    };
  }, [reset]);

  const value = useMemo<AtlasContextValue>(
    () => ({
      thread,
      seenScreens,
      currentScreen,
      setScreenConfig,
      sendUserMessage,
      markScreenSeen,
      reset,
    }),
    [thread, seenScreens, currentScreen, setScreenConfig, sendUserMessage, markScreenSeen, reset],
  );

  return <AtlasContext.Provider value={value}>{children}</AtlasContext.Provider>;
}

export function useAtlas(): AtlasContextValue {
  const ctx = useContext(AtlasContext);
  if (!ctx) throw new Error('useAtlas must be used within AtlasProvider');
  return ctx;
}

/**
 * Page components call this once to register their screen metadata.
 * Equivalent to the `<script type="application/json" id="atlas-config">` block
 * in each original HTML file.
 */
export function useRegisterAtlasScreen(cfg: AtlasScreenConfig) {
  const { setScreenConfig } = useAtlas();
  const keyRef = useRef<string>('');
  useEffect(() => {
    if (keyRef.current === cfg.screen) return;
    keyRef.current = cfg.screen;
    setScreenConfig(cfg);
  }, [cfg, setScreenConfig]);
}
