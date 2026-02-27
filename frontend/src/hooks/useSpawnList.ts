import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { SpawnItem } from '../backend';
import { MOCK_SPAWNS } from '../lib/mockSpawns';

export function useSpawnList() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SpawnItem[]>({
    queryKey: ['spawnList'],
    queryFn: async () => {
      if (!actor) return MOCK_SPAWNS;
      try {
        const result = await actor.getSpawnList();
        if (result && result.length > 0) return result;
        return MOCK_SPAWNS;
      } catch {
        return MOCK_SPAWNS;
      }
    },
    enabled: !actorFetching,
    staleTime: 5 * 60 * 1000,
  });
}
