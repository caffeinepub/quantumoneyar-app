import React from 'react';
import { Lock, Unlock, Loader2, Swords } from 'lucide-react';
import { useInternetIdentity } from '../../../hooks/useInternetIdentity';
import { useGameState } from '../../../contexts/GameStateContext';
import { useLockCoin, useUnlockCoin } from '../../../hooks/useArActions';
import { useArInteractions } from '../../../hooks/useArInteractions';
import { useGameplayHistory } from '../../../gameplay/history/useGameplayHistory';
import { useQueryClient } from '@tanstack/react-query';
import type { MockSpawn } from '../../../lib/mockSpawns';
import { toast } from 'sonner';

interface CameraARActionBarProps {
  nearbySpawn?: MockSpawn | null;
}

export default function CameraARActionBar({ nearbySpawn }: CameraARActionBarProps) {
  const { identity } = useInternetIdentity();
  const { unlockedBalance, refresh } = useGameState();
  const lockCoin = useLockCoin();
  const unlockCoin = useUnlockCoin();
  const { isCoinLocked } = useArInteractions();
  const { addEvent } = useGameplayHistory();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const hasBalance = unlockedBalance > 0;

  const spawnId = nearbySpawn?.id ?? null;
  const isMonster =
    nearbySpawn?.type === 'monster-common' ||
    nearbySpawn?.type === 'monster-rare' ||
    nearbySpawn?.type === 'monster-legendary';
  const isCoin = nearbySpawn != null && !isMonster;
  const coinLocked = spawnId ? isCoinLocked(spawnId) : false;

  const handleLock = async () => {
    if (!spawnId) {
      toast.error('No coin nearby to lock');
      return;
    }
    try {
      await lockCoin.mutateAsync(spawnId);
      addEvent({
        type: 'coin-lock',
        description: `Locked coin ${spawnId.slice(0, 8)}`,
        xpGained: 10,
        metadata: { coinId: spawnId },
      });
      toast.success('+10 XP — Coin locked!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to lock coin';
      toast.error(msg);
    }
  };

  const handleUnlock = async () => {
    if (!spawnId) {
      toast.error('No coin nearby to unlock');
      return;
    }
    try {
      await unlockCoin.mutateAsync(spawnId);
      addEvent({
        type: 'coin-lock',
        description: `Unlocked coin ${spawnId.slice(0, 8)}`,
        xpGained: -15,
        metadata: { coinId: spawnId },
      });
      toast.success('-15 XP — Coin unlocked!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to unlock coin';
      toast.error(msg);
    }
  };

  const handleRescue = async () => {
    if (!spawnId || !nearbySpawn) {
      toast.error('No monster nearby to rescue');
      return;
    }

    // Record the monster capture event with +20 XP in gameplay history
    addEvent({
      type: 'monster-capture',
      description: `Captured ${nearbySpawn.name ?? 'monster'} — +20 XP`,
      xpGained: 20,
      metadata: { monsterId: spawnId, monsterType: nearbySpawn.type },
    });

    // Invalidate playerState to refresh XP in Header and Profile
    queryClient.invalidateQueries({ queryKey: ['playerState'] });
    refresh();

    toast.success(`+20 XP — ${nearbySpawn.name ?? 'Monster'} rescued!`, {
      description: 'Monster added to your collection',
    });
  };

  if (!isAuthenticated) {
    return (
      <div
        className="fixed bottom-20 left-0 right-0 flex justify-center pb-safe"
        style={{ zIndex: 50 }}
      >
        <div
          className="px-4 py-2 rounded-lg text-sm"
          style={{
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,215,0,0.4)',
            color: '#FFD700',
          }}
        >
          Login to interact with coins
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-20 left-0 right-0 flex justify-center gap-3 px-4 pb-safe flex-wrap"
      style={{ zIndex: 50 }}
    >
      {/* Balance display */}
      <div
        className="flex items-center px-3 py-1 rounded-full text-xs font-bold"
        style={{
          background: 'rgba(0,0,0,0.7)',
          border: '1px solid rgba(255,215,0,0.4)',
          color: '#FFD700',
        }}
      >
        {unlockedBalance.toFixed(2)} QMY
      </div>

      {/* Lock button — shown for unlocked coins */}
      {isCoin && !coinLocked && (
        <button
          onClick={handleLock}
          disabled={lockCoin.isPending || !hasBalance}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
          style={{
            background: lockCoin.isPending ? 'rgba(255,215,0,0.3)' : 'rgba(255,215,0,0.15)',
            border: '1.5px solid #FFD700',
            color: '#FFD700',
          }}
        >
          {lockCoin.isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Lock size={16} />
          )}
          Lock +10 XP
        </button>
      )}

      {/* Unlock button — shown for locked coins */}
      {isCoin && coinLocked && (
        <button
          onClick={handleUnlock}
          disabled={unlockCoin.isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
          style={{
            background: unlockCoin.isPending ? 'rgba(200,200,200,0.2)' : 'rgba(200,200,200,0.1)',
            border: '1.5px solid #C0C0C0',
            color: '#C0C0C0',
          }}
        >
          {unlockCoin.isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Unlock size={16} />
          )}
          Unlock -15 XP
        </button>
      )}

      {/* Rescue button — shown for monsters, now active */}
      {isMonster && (
        <button
          onClick={handleRescue}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95"
          style={{
            background: 'rgba(180,0,255,0.2)',
            border: '1.5px solid #B400FF',
            color: '#E0A0FF',
          }}
        >
          <Swords size={16} />
          Rescue +20 XP
        </button>
      )}

      {/* No spawn nearby */}
      {!nearbySpawn && (
        <div
          className="px-3 py-2 rounded-lg text-xs"
          style={{
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,215,0,0.2)',
            color: 'rgba(255,215,0,0.5)',
          }}
        >
          Move closer to a coin or monster
        </div>
      )}
    </div>
  );
}
