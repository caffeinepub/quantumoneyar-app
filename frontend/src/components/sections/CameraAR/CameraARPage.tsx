import React, { useEffect, useRef, useState } from 'react';
import { useCamera } from '../../../camera/useCamera';
import { useGeolocation } from '../../../contexts/GeolocationContext';
import { useDeviceHeading } from './useDeviceHeading';
import { useArVisibility } from './useArVisibility';
import { useArInteractions } from '../../../hooks/useArInteractions';
import { useLockCoin, useUnlockCoin } from '../../../hooks/useArActions';
import { useGameState } from '../../../contexts/GameStateContext';
import { useInternetIdentity } from '../../../hooks/useInternetIdentity';
import { OverlayLayer } from './OverlayLayer';
import { CameraARControls } from './CameraARControls';
import CameraARActionBar from './CameraARActionBar';
import { MOCK_SPAWNS } from '../../../lib/mockSpawns';
import type { Section } from '../../../App';

interface CameraARPageProps {
  onNavigate?: (section: Section) => void;
}

export default function CameraARPage({ onNavigate }: CameraARPageProps) {
  const { identity } = useInternetIdentity();
  const { unlockedBalance, refresh } = useGameState();
  const { isCoinLocked } = useArInteractions();
  const lockCoin = useLockCoin();
  const unlockCoin = useUnlockCoin();

  const { position } = useGeolocation();
  const { heading } = useDeviceHeading();

  const {
    isActive,
    isSupported,
    error: cameraError,
    isLoading: cameraLoading,
    startCamera,
    stopCamera,
    videoRef,
    canvasRef,
  } = useCamera({ facingMode: 'environment', width: 1280, height: 720 });

  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const messageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAuthenticated = !!identity;

  const playerLat = position?.latitude ?? 38.5667;
  const playerLng = position?.longitude ?? -7.9067;
  const playerXP = 50; // default XP radius for visibility

  const visibleObjects = useArVisibility({
    userPosition: position,
    userHeading: heading,
    userXP: playerXP,
    allObjects: MOCK_SPAWNS,
  });

  const showMessage = (msg: string) => {
    setActionMessage(msg);
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    messageTimerRef.current = setTimeout(() => setActionMessage(null), 3000);
  };

  const handleLock = async () => {
    if (!isAuthenticated) {
      showMessage('Please login to lock coins');
      return;
    }
    if (unlockedBalance <= 0) {
      showMessage('Insufficient QMY balance');
      return;
    }
    const nearestCoin = visibleObjects.find(
      (o) => (o.type === 'coin-unlocked' || o.type === 'coin-locked') && !isCoinLocked(o.id)
    );
    if (!nearestCoin) {
      showMessage('No coins nearby to lock');
      return;
    }
    try {
      const result = await lockCoin.mutateAsync(nearestCoin.id);
      if (result.successful) {
        showMessage('✅ Coin locked! +10 XP');
        refresh();
      } else {
        showMessage(`❌ ${result.message}`);
      }
    } catch (err: unknown) {
      const error = err as Error;
      showMessage(`❌ ${error.message ?? 'Failed to lock coin'}`);
    }
  };

  const handleUnlock = async () => {
    if (!isAuthenticated) {
      showMessage('Please login to unlock coins');
      return;
    }
    const lockedCoin = visibleObjects.find(
      (o) => (o.type === 'coin-unlocked' || o.type === 'coin-locked') && isCoinLocked(o.id)
    );
    if (!lockedCoin) {
      showMessage('No locked coins nearby');
      return;
    }
    try {
      const result = await unlockCoin.mutateAsync(lockedCoin.id);
      if (result.successful) {
        showMessage('✅ Coin unlocked! -15 XP');
        refresh();
      } else {
        showMessage(`❌ ${result.message}`);
      }
    } catch (err: unknown) {
      const error = err as Error;
      showMessage(`❌ ${error.message ?? 'Failed to unlock coin'}`);
    }
  };

  useEffect(() => {
    return () => {
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    };
  }, []);

  const hasNearbyCoins = visibleObjects.some(
    (o) => o.type === 'coin-unlocked' || o.type === 'coin-locked'
  );
  const hasLockedCoins = visibleObjects.some(
    (o) => (o.type === 'coin-unlocked' || o.type === 'coin-locked') && isCoinLocked(o.id)
  );
  const canLock = isAuthenticated && unlockedBalance > 0 && hasNearbyCoins && !lockCoin.isPending;
  const canUnlock = isAuthenticated && hasLockedCoins && !unlockCoin.isPending;

  return (
    <div
      className="relative w-full bg-black overflow-hidden"
      style={{ height: 'calc(100dvh - 56px - 64px)' }}
    >
      {/* Camera video feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* AR Overlay */}
      {isActive && (
        <OverlayLayer
          visibleObjects={visibleObjects}
          userHeading={heading ?? 0}
          isCoinLocked={isCoinLocked}
        />
      )}

      {/* Camera not active state */}
      {!isActive && !cameraLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-center px-4">
          {cameraError ? (
            <>
              <p className="text-red-400 text-sm mb-3">📷 {cameraError.message}</p>
              <button
                onClick={startCamera}
                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-full text-sm"
              >
                Retry Camera
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-300 text-sm mb-3">Camera is off</p>
              {isSupported === false && (
                <p className="text-red-400 text-xs mb-3">Camera not supported on this device</p>
              )}
            </>
          )}
        </div>
      )}

      {/* Loading state */}
      {cameraLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-yellow-400 text-sm">Starting camera...</p>
          </div>
        </div>
      )}

      {/* Action message toast */}
      {actionMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 border border-yellow-500/50 rounded-xl px-4 py-2 text-sm text-white whitespace-nowrap">
          {actionMessage}
        </div>
      )}

      {/* Balance indicator */}
      {isAuthenticated && (
        <div className="absolute top-3 left-3 z-20 bg-black/70 border border-yellow-500/40 rounded-lg px-3 py-1.5 flex items-center gap-2">
          <span className="text-yellow-400 text-xs font-bold">{unlockedBalance} QMY</span>
          <span className="text-gray-500 text-xs">available</span>
        </div>
      )}

      {/* Action bar */}
      <CameraARActionBar
        onLock={handleLock}
        onUnlock={handleUnlock}
        canLock={canLock}
        canUnlock={canUnlock}
        isLocking={lockCoin.isPending}
        isUnlocking={unlockCoin.isPending}
        unlockedBalance={unlockedBalance}
      />

      {/* Camera controls */}
      <CameraARControls
        cameraActive={isActive}
        cameraLoading={cameraLoading}
        onStartCamera={startCamera}
        onStopCamera={stopCamera}
      />
    </div>
  );
}
