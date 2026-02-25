import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile, Bonus, PlayerState } from '../backend';

export interface GeoPoint {
  latitude: number;
  longitude: number;
  label?: string;
}

export interface GeoType {
  id: string;
  lat: number;
  lng: number;
  type: string;
}

export function useGetPlayerState() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PlayerState>({
    queryKey: ['playerState'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPlayerState();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
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

export function useGetClaimBonus() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Bonus | null>({
    queryKey: ['claimBonus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getClaimBonus();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
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

export function useQmySync() {
  const { actor, isFetching: actorFetching } = useActor();

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
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}
