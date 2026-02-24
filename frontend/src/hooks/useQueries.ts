import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { PlayerState, UserProfile, Bonus } from '../backend';

// ─── Player State ────────────────────────────────────────────────────────────

export function useGetPlayerState() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<PlayerState>({
    queryKey: ['playerState'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPlayerState();
    },
    enabled: !!actor && !isFetching && !!identity,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Bonus / Vesting ──────────────────────────────────────────────────────────

export function useGetClaimBonus() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Bonus | null>({
    queryKey: ['claimBonus'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getClaimBonus();
    },
    enabled: !!actor && !isFetching && !!identity,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function useClaimBonus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.claimBonus();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
    },
  });
}

// ─── Geo Types (used by AR/Map) ───────────────────────────────────────────────

export type GeoPoint = {
  id: string;
  lat: number;
  lng: number;
  type: string;
};

export type GeoType = 'coin' | 'monster' | 'portal';

// ─── QMY Sync (legacy compatibility) ─────────────────────────────────────────

export function useQmySync() {
  const { data: playerState } = useGetPlayerState();
  return {
    xp: Number(playerState?.xp ?? 0),
    coinLocks: playerState?.coinLocks ?? [],
    monsters: playerState?.monsters ?? [],
  };
}
