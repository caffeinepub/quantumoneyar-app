import { useGameState } from '../contexts/GameStateContext';

export function useArInteractions() {
  const { isCoinLocked, isMonsterCaptured } = useGameState();
  return { isCoinLocked, isMonsterCaptured };
}
