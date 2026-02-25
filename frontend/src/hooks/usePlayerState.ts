import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { PlayerState } from '../backend';

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
    refetchOnMount: true,
  });
}
