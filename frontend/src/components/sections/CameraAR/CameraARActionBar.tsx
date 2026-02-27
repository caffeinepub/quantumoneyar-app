import React, { useState } from 'react';
import { Lock, Unlock, Zap, Loader2 } from 'lucide-react';
import { SpawnItem } from '../../../backend';
import { useLockCoin, useUnlockCoin, useCaptureMonster } from '../../../hooks/useArActions';
import { SpawnCollectFX } from '../../../gameplay/fx/SpawnCollectFX';
import { useGameplayHistory } from '../../../gameplay/history/useGameplayHistory';

interface CameraARActionBarProps {
  nearestSpawn: SpawnItem | null;
  isCoinLocked: (id: string) => boolean;
  isMonsterCaptured: (id: string) => boolean;
}

export function CameraARActionBar({
  nearestSpawn,
  isCoinLocked,
  isMonsterCaptured,
}: CameraARActionBarProps) {
  const [showFX, setShowFX] = useState(false);
  const [fxType, setFxType] = useState<'coin-lock' | 'monster-capture'>('coin-lock');

  const lockCoin = useLockCoin();
  const unlockCoin = useUnlockCoin();
  const captureMonster = useCaptureMonster();
  const { addEvent } = useGameplayHistory();

  if (!nearestSpawn) {
    return (
      <div className="flex items-center justify-center px-4 py-3">
        <p className="text-gold/60 text-sm font-medium text-center">
          Move closer to a QMY coin or monster to interact
        </p>
      </div>
    );
  }

  const isCoin = nearestSpawn.spawnType === 'coin';
  const isMonster = nearestSpawn.spawnType === 'monster';
  const coinLocked = isCoin && isCoinLocked(nearestSpawn.id);
  const monsterCaptured = isMonster && isMonsterCaptured(nearestSpawn.id);

  const handleLock = async () => {
    if (!nearestSpawn) return;
    try {
      await lockCoin.mutateAsync(nearestSpawn.id);
      setFxType('coin-lock');
      setShowFX(true);
      addEvent({
        type: 'coin-lock',
        spawnId: nearestSpawn.id,
        xpDelta: 10,
        timestamp: Date.now(),
        latitude: nearestSpawn.latitude,
        longitude: nearestSpawn.longitude,
      });
    } catch {
      // error handled in mutation
    }
  };

  const handleUnlock = async () => {
    if (!nearestSpawn) return;
    try {
      await unlockCoin.mutateAsync(nearestSpawn.id);
      addEvent({
        type: 'coin-lock',
        spawnId: nearestSpawn.id,
        xpDelta: -15,
        timestamp: Date.now(),
        latitude: nearestSpawn.latitude,
        longitude: nearestSpawn.longitude,
      });
    } catch {
      // error handled in mutation
    }
  };

  const handleCapture = async () => {
    if (!nearestSpawn) return;
    try {
      await captureMonster.mutateAsync(nearestSpawn.id);
      setFxType('monster-capture');
      setShowFX(true);
      addEvent({
        type: 'monster-capture',
        spawnId: nearestSpawn.id,
        xpDelta: 20,
        timestamp: Date.now(),
        latitude: nearestSpawn.latitude,
        longitude: nearestSpawn.longitude,
      });
    } catch {
      // error handled in mutation
    }
  };

  return (
    <>
      {showFX && (
        <SpawnCollectFX
          type={fxType}
          onComplete={() => setShowFX(false)}
        />
      )}

      <div className="flex items-center justify-center gap-3 px-4 py-3">
        {/* Coin spawn: show Lock or Unlock */}
        {isCoin && !coinLocked && (
          <button
            onClick={handleLock}
            disabled={lockCoin.isPending}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm
              bg-gradient-to-r from-yellow-500 to-amber-600 text-black
              shadow-lg shadow-yellow-500/30 active:scale-95 transition-all
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {lockCoin.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            Lock QMY +10 XP
          </button>
        )}

        {isCoin && coinLocked && (
          <button
            onClick={handleUnlock}
            disabled={unlockCoin.isPending}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm
              bg-gradient-to-r from-slate-600 to-slate-700 text-white
              shadow-lg shadow-slate-500/30 active:scale-95 transition-all
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {unlockCoin.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Unlock className="w-4 h-4" />
            )}
            Unlock QMY -15 XP
          </button>
        )}

        {/* Monster spawn: show Capture if not yet captured */}
        {isMonster && !monsterCaptured && (
          <button
            onClick={handleCapture}
            disabled={captureMonster.isPending}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm
              bg-gradient-to-r from-purple-600 to-violet-700 text-white
              shadow-lg shadow-purple-500/30 active:scale-95 transition-all
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {captureMonster.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            Rescue Monster +20 XP
          </button>
        )}

        {isMonster && monsterCaptured && (
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm
            bg-green-900/60 text-green-400 border border-green-500/30">
            <Zap className="w-4 h-4" />
            Monster Captured ✓
          </div>
        )}

        {isCoin && coinLocked && (
          <div className="text-xs text-gold/60 text-center mt-1">
            Locked — earns vesting rewards
          </div>
        )}
      </div>
    </>
  );
}
