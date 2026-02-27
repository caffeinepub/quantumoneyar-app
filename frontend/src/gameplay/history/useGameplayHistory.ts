import { useState, useCallback } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export interface GameplayHistoryEvent {
  type: 'coin-lock' | 'monster-capture' | 'xp-gain' | 'level-up';
  spawnId: string;
  xpDelta: number;
  timestamp: number;
  latitude?: number;
  longitude?: number;
}

const STORAGE_KEY_PREFIX = 'gameplayHistory_';

function getStorageKey(principal: string): string {
  return STORAGE_KEY_PREFIX + principal;
}

export function useGameplayHistory() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? 'anonymous';

  const [events, setEvents] = useState<GameplayHistoryEvent[]>(() => {
    try {
      const raw = localStorage.getItem(getStorageKey(principal));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const addEvent = useCallback(
    (event: GameplayHistoryEvent) => {
      setEvents((prev) => {
        const updated = [event, ...prev].slice(0, 100);
        try {
          localStorage.setItem(getStorageKey(principal), JSON.stringify(updated));
        } catch {}
        return updated;
      });
    },
    [principal]
  );

  const clearHistory = useCallback(() => {
    setEvents([]);
    localStorage.removeItem(getStorageKey(principal));
  }, [principal]);

  return { events, addEvent, clearHistory };
}
