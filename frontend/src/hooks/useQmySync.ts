import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useInternetIdentity } from './useInternetIdentity';
import { fetchQmySync, sendQmy, receiveQmy, type QmySyncData, type QmySendRequest, type QmyReceiveRequest, type QmyTransferResponse } from '../lib/qmyApi';

/**
 * React Query hook for Quantumoney.app sync data
 * Provides shared cache for balances/bonus history
 * XP is now derived from canister-backed PlayerState
 */
export function useQmySync() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString();

  return useQuery<QmySyncData>({
    queryKey: ['qmySync', principal],
    queryFn: async () => {
      if (!principal) throw new Error('Not authenticated');
      return fetchQmySync(principal);
    },
    enabled: !!principal,
    staleTime: 5000,
    refetchInterval: false,
    retry: 1,
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
  };
}

/**
 * Mutation hook for UI-only QMY send
 */
export function useSendQmy() {
  const queryClient = useQueryClient();

  return useMutation<QmyTransferResponse, Error, QmySendRequest>({
    mutationFn: sendQmy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
    },
  });
}

/**
 * Mutation hook for UI-only QMY receive
 */
export function useReceiveQmy() {
  const queryClient = useQueryClient();

  return useMutation<QmyTransferResponse, Error, QmyReceiveRequest>({
    mutationFn: receiveQmy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qmySync'] });
    },
  });
}
