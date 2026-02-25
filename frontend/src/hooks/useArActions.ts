import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { arInteractionsStore } from '../lib/arInteractionsStore';

export function useLockCoin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (coinId: string) => {
      if (!actor) throw new Error('Not connected');
      const result = await actor.lockCoin(coinId);
      if (!result.successful) throw new Error(result.message);
      return result;
    },
    onSuccess: (data, coinId) => {
      // Update local store
      arInteractionsStore.setLocked(coinId, true);
      // Invalidate queries to sync state
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
    },
  });
}

export function useUnlockCoin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (coinId: string) => {
      if (!actor) throw new Error('Not connected');
      const result = await actor.unlockCoin(coinId);
      if (!result.successful) throw new Error(result.message);
      return result;
    },
    onSuccess: (data, coinId) => {
      // Update local store
      arInteractionsStore.setLocked(coinId, false);
      // Invalidate queries to sync state
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
    },
  });
}
