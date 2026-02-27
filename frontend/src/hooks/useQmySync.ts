import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useInternetIdentity } from './useInternetIdentity';
import { useActor } from './useActor';
import { sendQmy, receiveQmy, type QmySendRequest, type QmyReceiveRequest, type QmyTransferResponse } from '../lib/qmyApi';

/**
 * React Query hook for QMY sync data — reads directly from the canister.
 * XP and balances are derived from canister-backed PlayerState and Bonus.
 */
export function useQmySync() {
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const principal = identity?.getPrincipal().toString();

  return useQuery({
    queryKey: ['qmySync', principal],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const [playerState, bonus] = await Promise.all([
        actor.getPlayerState(),
        actor.getClaimBonus(),
      ]);
      return { playerState, bonus };
    },
    enabled: !!actor && !actorFetching && !!principal,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

/**
 * Manual refresh helper
 */
export function useRefreshQmySync() {
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString();

  return () => {
    if (principal) {
      queryClient.invalidateQueries({ queryKey: ['qmySync', principal] });
    }
    queryClient.invalidateQueries({ queryKey: ['playerState'] });
    queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
  };
}

/**
 * Mutation hook for UI-only QMY send.
 * Visual only — does not perform real on-chain transfers.
 */
export function useSendQmy() {
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation<QmyTransferResponse, Error, { toLoginId: string; amount: number }>({
    mutationFn: async ({ toLoginId, amount }) => {
      const fromPrincipal = identity?.getPrincipal().toString() ?? '';
      return sendQmy({ fromPrincipal, toLoginId, amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
    },
  });
}

/**
 * Mutation hook for UI-only QMY receive.
 * Visual only — does not perform real on-chain transfers.
 */
export function useReceiveQmy() {
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation<QmyTransferResponse, Error, { fromLoginId: string }>({
    mutationFn: async ({ fromLoginId }) => {
      const principal = identity?.getPrincipal().toString() ?? '';
      return receiveQmy({ principal, amount: 0 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
    },
  });
}
