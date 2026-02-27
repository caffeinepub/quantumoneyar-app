import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { UserProfile, Bonus, VestingEntry } from '../backend';

// Re-export types used across the app
export type { SpawnItem } from '../backend';

// GeoPoint and GeoType re-exports for backward compatibility
export type GeoPoint = { latitude: number; longitude: number };
export type GeoType = 'coin' | 'monster';

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
      if (!actor) throw new Error('Not authenticated');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function usePlayerState() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery({
    queryKey: ['playerState'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPlayerState();
    },
    enabled: !!actor && !actorFetching && !!identity,
    staleTime: 30_000,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });
}

export function useGetClaimBonus() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Bonus | null>({
    queryKey: ['claimBonus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getClaimBonus();
    },
    enabled: !!actor && !actorFetching && !!identity,
    staleTime: 30_000,
  });
}

export function useClaimWelcomeBonus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Not authenticated');
      await actor.claimWelcomeBonus();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
      queryClient.invalidateQueries({ queryKey: ['vestingSchedule'] });
    },
  });
}

export function useGetVestingSchedule() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<VestingEntry[]>({
    queryKey: ['vestingSchedule'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getVestingSchedule();
    },
    enabled: !!actor && !actorFetching && !!identity,
    staleTime: 60_000,
  });
}

export function useQmySync() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery({
    queryKey: ['qmySync'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const [playerState, bonus] = await Promise.all([
        actor.getPlayerState(),
        actor.getClaimBonus(),
      ]);
      return { playerState, bonus };
    },
    enabled: !!actor && !actorFetching && !!identity,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}
