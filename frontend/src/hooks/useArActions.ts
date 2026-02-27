import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { arInteractionsStore } from '../lib/arInteractionsStore';
import { toast } from 'sonner';

export function useLockCoin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (spawnId: string) => {
      if (!actor) throw new Error('Not authenticated');
      const result = await actor.lockCoin(spawnId);
      if (!result.successful) throw new Error(result.message);
      return result;
    },
    onSuccess: (result, spawnId) => {
      arInteractionsStore.lockCoin(spawnId);
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
      toast.success(`+10 XP — Coin locked!`, {
        description: result.message,
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to lock coin', {
        description: error.message,
        duration: 3000,
      });
    },
  });
}

export function useUnlockCoin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (spawnId: string) => {
      if (!actor) throw new Error('Not authenticated');
      const result = await actor.unlockCoin(spawnId);
      if (!result.successful) throw new Error(result.message);
      return result;
    },
    onSuccess: (result, spawnId) => {
      arInteractionsStore.unlockCoin(spawnId);
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
      toast.success(`-15 XP — Coin unlocked!`, {
        description: result.message,
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to unlock coin', {
        description: error.message,
        duration: 3000,
      });
    },
  });
}

export function useCaptureMonster() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (spawnId: string) => {
      if (!actor) throw new Error('Not authenticated');
      const result = await actor.captureMonster(spawnId);
      if (!result.successful) throw new Error(result.message);
      return result;
    },
    onSuccess: (result, spawnId) => {
      arInteractionsStore.captureMonster(spawnId);
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
      toast.success(`+20 XP — Monster captured!`, {
        description: result.message,
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to capture monster', {
        description: error.message,
        duration: 3000,
      });
    },
  });
}
