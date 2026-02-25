import { useGameState } from '../contexts/GameStateContext';
import { arInteractionsStore } from '../lib/arInteractionsStore';

export function useArInteractions() {
  const { playerState } = useGameState();

  // Sync store with latest backend state
  if (playerState) {
    arInteractionsStore.syncFromPlayerState({
      coinLocks: playerState.coinLocks.map((c) => ({ id: c.id, locked: c.locked })),
      monsters: playerState.monsters.map((m) => ({ id: m.id, captured: m.captured })),
    });
  }

  function isCoinLocked(coinId: string): boolean {
    // Prefer canister-backed state
    if (playerState) {
      const coin = playerState.coinLocks.find((c) => c.id === coinId);
      if (coin !== undefined) return coin.locked;
    }
    // Fallback to local cache
    return arInteractionsStore.isCoinLocked(coinId);
  }

  function isMonsterCaptured(monsterId: string): boolean {
    if (playerState) {
      const monster = playerState.monsters.find((m) => m.id === monsterId);
      if (monster !== undefined) return monster.captured;
    }
    return arInteractionsStore.isMonsterCaptured(monsterId);
  }

  return { isCoinLocked, isMonsterCaptured };
}
