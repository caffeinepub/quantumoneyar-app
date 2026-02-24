import { useCallback } from 'react';
import { useGameState } from '../contexts/GameStateContext';

export function useArInteractions() {
  const { playerState, refresh } = useGameState();

  const isCoinLocked = useCallback(
    (coinId: string): boolean => {
      if (!playerState) return false;
      return playerState.coinLocks.some((c) => c.id === coinId && c.locked);
    },
    [playerState]
  );

  const isMonsterCaptured = useCallback(
    (monsterId: string): boolean => {
      if (!playerState) return false;
      return playerState.monsters.some((m) => m.id === monsterId && m.captured);
    },
    [playerState]
  );

  const syncWithBackend = useCallback(() => {
    refresh();
  }, [refresh]);

  return {
    isCoinLocked,
    isMonsterCaptured,
    syncWithBackend,
    coinLocks: playerState?.coinLocks ?? [],
    monsters: playerState?.monsters ?? [],
  };
}
