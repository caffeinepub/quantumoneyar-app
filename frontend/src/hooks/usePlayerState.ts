import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { PlayerState } from '../backend';

/**
 * React Query hook to fetch and cache the caller's canister-backed PlayerState
 * Keyed by the authenticated Principal with aggressive refetch for cross-domain sync
 */
export function usePlayerState() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<PlayerState>({
    queryKey: ['playerState', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPlayerState();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
