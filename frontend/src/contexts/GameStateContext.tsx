import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useGetPlayerState } from '../hooks/usePlayerState';
import { useGetClaimBonus } from '../hooks/useQueries';
import { PlayerState, Bonus } from '../backend';

interface GameStateContextValue {
  playerState: PlayerState | null;
  bonus: Bonus | null;
  unlockedBalance: number;
  lockedBalance: number;
  nextUnlockDate: string | null;
  remainingUnlocks: number;
  refresh: () => void;
  isLoading: boolean;
}

const GameStateContext = createContext<GameStateContextValue>({
  playerState: null,
  bonus: null,
  unlockedBalance: 0,
  lockedBalance: 0,
  nextUnlockDate: null,
  remainingUnlocks: 0,
  refresh: () => {},
  isLoading: false,
});

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const playerStateQuery = useGetPlayerState();
  const bonusQuery = useGetClaimBonus();

  const refresh = useCallback(() => {
    playerStateQuery.refetch();
    bonusQuery.refetch();
  }, [playerStateQuery, bonusQuery]);

  // Auto-refresh on window focus for cross-app sync
  useEffect(() => {
    const handleFocus = () => refresh();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refresh]);

  const playerState = playerStateQuery.data ?? null;
  const bonus = bonusQuery.data ?? null;

  const unlockedBalance = bonus?.unlocked ?? 0;
  const lockedBalance = bonus?.locked ?? 0;
  const remainingUnlocks = bonus ? Number(bonus.unlocksRemaining) : 0;
  const nextUnlockDate = bonus?.nextUnlockMessage ?? null;

  const isLoading = playerStateQuery.isLoading || bonusQuery.isLoading;

  return (
    <GameStateContext.Provider
      value={{
        playerState,
        bonus,
        unlockedBalance,
        lockedBalance,
        nextUnlockDate,
        remainingUnlocks,
        refresh,
        isLoading,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}
