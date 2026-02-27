import React, { createContext, useContext, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { usePlayerState } from '../hooks/usePlayerState';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Bonus, VestingEntry, PlayerState } from '../backend';

interface GameStateContextValue {
  xp: number;
  lockedQMY: number;
  unlockedQMY: number;
  capturedMonsters: string[];
  lockedCoins: string[];
  vestingSchedule: VestingEntry[];
  bonus: Bonus | null;
  playerState: PlayerState | null;
  isLoading: boolean;
  hasClaimed: boolean;
  isCoinLocked: (id: string) => boolean;
  isMonsterCaptured: (id: string) => boolean;
  triggerWelcomeBonus: () => Promise<void>;
  refetch: () => void;
}

const GameStateContext = createContext<GameStateContextValue>({
  xp: 0,
  lockedQMY: 0,
  unlockedQMY: 0,
  capturedMonsters: [],
  lockedCoins: [],
  vestingSchedule: [],
  bonus: null,
  playerState: null,
  isLoading: false,
  hasClaimed: false,
  isCoinLocked: () => false,
  isMonsterCaptured: () => false,
  triggerWelcomeBonus: async () => {},
  refetch: () => {},
});

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const {
    data: playerState,
    isLoading: playerLoading,
    refetch: refetchPlayer,
  } = usePlayerState();

  const {
    data: bonus,
    isLoading: bonusLoading,
    refetch: refetchBonus,
  } = useQuery<Bonus | null>({
    queryKey: ['claimBonus'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getClaimBonus();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });

  const {
    data: vestingSchedule = [],
    isLoading: vestingLoading,
    refetch: refetchVesting,
  } = useQuery<VestingEntry[]>({
    queryKey: ['vestingSchedule'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVestingSchedule();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    staleTime: 60_000,
  });

  const claimMutation = useMutation({
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

  const triggerWelcomeBonus = useCallback(async () => {
    if (!actor || bonus !== null) return;
    await claimMutation.mutateAsync();
  }, [actor, bonus, claimMutation]);

  const refetch = useCallback(() => {
    refetchPlayer();
    refetchBonus();
    refetchVesting();
  }, [refetchPlayer, refetchBonus, refetchVesting]);

  const xp = playerState ? Number(playerState.xp) : 0;
  const lockedQMY = playerState?.lockedQMY ?? bonus?.locked ?? 0;
  const unlockedQMY = playerState?.unlockedQMY ?? bonus?.unlocked ?? 0;

  const capturedMonsters = (playerState?.capturedMonsters ?? [])
    .filter((m) => m.captured)
    .map((m) => m.id);

  const lockedCoins = (playerState?.lockedCoins ?? [])
    .filter((c) => c.locked)
    .map((c) => c.id);

  const isCoinLocked = useCallback(
    (id: string) => lockedCoins.includes(id),
    [lockedCoins]
  );

  const isMonsterCaptured = useCallback(
    (id: string) => capturedMonsters.includes(id),
    [capturedMonsters]
  );

  const hasClaimed = bonus !== null && bonus !== undefined;
  const isLoading = actorFetching || playerLoading || bonusLoading || vestingLoading;

  return (
    <GameStateContext.Provider
      value={{
        xp,
        lockedQMY,
        unlockedQMY,
        capturedMonsters,
        lockedCoins,
        vestingSchedule,
        bonus: bonus ?? null,
        playerState: playerState ?? null,
        isLoading,
        hasClaimed,
        isCoinLocked,
        isMonsterCaptured,
        triggerWelcomeBonus,
        refetch,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}
