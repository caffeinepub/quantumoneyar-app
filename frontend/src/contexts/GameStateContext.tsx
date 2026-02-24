import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import type { PlayerState, Bonus } from '../backend';

interface GameStateContextValue {
  playerState: PlayerState | null;
  bonus: Bonus | null;
  isLoading: boolean;
  unlockedBalance: number;
  lockedBalance: number;
  nextUnlockDate: Date | null;
  remainingUnlocks: number;
  refresh: () => void;
}

const GameStateContext = createContext<GameStateContextValue>({
  playerState: null,
  bonus: null,
  isLoading: false,
  unlockedBalance: 0,
  lockedBalance: 0,
  nextUnlockDate: null,
  remainingUnlocks: 0,
  refresh: () => {},
});

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const enabled = !!actor && !actorFetching && isAuthenticated;

  const { data: playerState, isLoading: playerLoading } = useQuery<PlayerState>({
    queryKey: ['playerState'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPlayerState();
    },
    enabled,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const { data: bonus, isLoading: bonusLoading } = useQuery<Bonus | null>({
    queryKey: ['claimBonus'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getClaimBonus();
    },
    enabled,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['playerState'] });
    queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
  }, [queryClient]);

  // Cross-domain sync via storage events
  useEffect(() => {
    const handleStorage = () => refresh();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', refresh);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', refresh);
    };
  }, [refresh]);

  const unlockedBalance = bonus?.unlocked ?? 0;
  const lockedBalance = bonus?.locked ?? 0;
  const remainingUnlocks = Number(bonus?.unlocksRemaining ?? 0);

  // Compute next unlock date: 30 days from registration (approximated)
  const nextUnlockDate = bonus && !bonus.fullyUnlocked && bonus.hasNextUnlock
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    : null;

  const isLoading = actorFetching || playerLoading || bonusLoading;

  return (
    <GameStateContext.Provider
      value={{
        playerState: playerState ?? null,
        bonus: bonus ?? null,
        isLoading,
        unlockedBalance,
        lockedBalance,
        nextUnlockDate,
        remainingUnlocks,
        refresh,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}
