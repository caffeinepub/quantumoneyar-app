import { useState, useEffect, useCallback } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

export interface GameplayHistoryEvent {
  id: string;
  type: 'coin-collect' | 'coin-lock' | 'monster-encounter' | 'monster-capture' | 'xp-gain';
  timestamp: number;
  description: string;
  xpGained?: number;
  qmyGained?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  metadata?: Record<string, any>;
}

const MAX_HISTORY_SIZE = 100;

export function useGameplayHistory() {
  const { identity } = useInternetIdentity();
  const [events, setEvents] = useState<GameplayHistoryEvent[]>([]);

  const storageKey = identity ? `gameplay-history-${identity.getPrincipal().toString()}` : null;

  // Load history from localStorage on mount
  useEffect(() => {
    if (!storageKey) {
      setEvents([]);
      return;
    }

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setEvents(parsed);
      }
    } catch (error) {
      console.error('Error loading gameplay history:', error);
    }
  }, [storageKey]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (!storageKey || events.length === 0) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving gameplay history:', error);
    }
  }, [storageKey, events]);

  const addEvent = useCallback((event: Omit<GameplayHistoryEvent, 'id' | 'timestamp'>) => {
    const newEvent: GameplayHistoryEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    setEvents(prev => {
      const updated = [newEvent, ...prev];
      // Keep only the most recent MAX_HISTORY_SIZE events
      return updated.slice(0, MAX_HISTORY_SIZE);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setEvents([]);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  return {
    events,
    addEvent,
    clearHistory,
  };
}
