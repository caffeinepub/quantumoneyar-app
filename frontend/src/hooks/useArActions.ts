import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ActionResponse } from '../backend';

export function useLockCoin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<ActionResponse, Error, string>({
    mutationFn: async (coinId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.lockCoin(coinId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
    },
    onError: (error) => {
      console.error('Lock coin error:', error.message);
    },
  });
}

export function useUnlockCoin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<ActionResponse, Error, string>({
    mutationFn: async (coinId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.unlockCoin(coinId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
    },
    onError: (error) => {
      console.error('Unlock coin error:', error.message);
    },
  });
}
