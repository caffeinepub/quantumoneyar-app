import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { PlayerState } from '../backend';
import { arInteractionsStore } from '../lib/arInteractionsStore';

export function usePlayerState() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return useQuery<PlayerState>({
    queryKey: ['playerState'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const state = await actor.getPlayerState();
      // Sync arInteractionsStore with canister data
      const lockedIds = (state.lockedCoins ?? [])
        .filter((c) => c.locked)
        .map((c) => c.id);
      const capturedIds = (state.capturedMonsters ?? [])
        .filter((m) => m.captured)
        .map((m) => m.id);
      arInteractionsStore.syncFromIds(lockedIds, capturedIds);
      return state;
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    staleTime: 30_000,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });
}
