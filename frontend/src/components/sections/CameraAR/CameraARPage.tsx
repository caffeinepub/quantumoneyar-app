import React from 'react';
import { useCamera } from '../../../camera/useCamera';
import { useGeolocation } from '../../../contexts/GeolocationContext';
import { useGameState } from '../../../contexts/GameStateContext';
import { useInternetIdentity } from '../../../hooks/useInternetIdentity';
import { useSpawnList } from '../../../hooks/useSpawnList';
import { useArVisibility } from './useArVisibility';
import { useDeviceHeading } from './useDeviceHeading';
import { OverlayLayer } from './OverlayLayer';
import { CameraARActionBar } from './CameraARActionBar';
import { CameraARControls } from './CameraARControls';
import { GameplayHUD } from '../../gameplay/GameplayHUD';
import { SpawnItem } from '../../../backend';
import { calculateDistance } from '../../../lib/haversine';

const INTERACTION_RADIUS_METERS = 50;

export default function CameraARPage() {
  const { identity } = useInternetIdentity();
  const { position } = useGeolocation();
  const { isCoinLocked, isMonsterCaptured, xp } = useGameState();
  const { data: spawnList = [], isLoading: spawnsLoading } = useSpawnList();

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

  const { heading: headingResult } = useDeviceHeading();
  // Normalize heading: use 0 as fallback when compass unavailable
  const heading = headingResult ?? 0;

  const visibleSpawns = useArVisibility({
    spawns: spawnList,
    position,
    heading,
    xp,
  });

  // Find nearest spawn within interaction radius
  const nearestSpawn: SpawnItem | null = React.useMemo(() => {
    if (!position) return null;
    let nearest: SpawnItem | null = null;
    let minDist = Infinity;
    for (const spawn of visibleSpawns) {
      const dist = calculateDistance(
        position.latitude,
        position.longitude,
        spawn.latitude,
        spawn.longitude
      );
      if (dist < INTERACTION_RADIUS_METERS && dist < minDist) {
        minDist = dist;
        nearest = spawn;
      }
    }
    return nearest;
  }, [visibleSpawns, position]);

  if (!identity) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white p-8 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gold mb-2">Login Required</h2>
        <p className="text-white/60 text-sm">Please login to access the AR camera.</p>
      </div>
    );
  }

  if (isSupported === false) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white p-8 text-center">
        <div className="text-4xl mb-4">📷</div>
        <h2 className="text-xl font-bold text-gold mb-2">Camera Not Supported</h2>
        <p className="text-white/60 text-sm">Your device does not support camera access.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden" style={{ minHeight: '100dvh' }}>
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
      {isActive && position && (
        <OverlayLayer
          spawns={visibleSpawns}
          position={position}
          heading={heading}
          isCoinLocked={isCoinLocked}
          isMonsterCaptured={isMonsterCaptured}
        />
      )}

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <GameplayHUD
          xp={xp}
          metersWalked={0}
          nearbySpawnsCount={visibleSpawns.length}
        />
      </div>

      {/* Camera not active overlay */}
      {!isActive && !cameraLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-white/80 text-lg font-medium mb-2">AR Camera</p>
          <p className="text-white/50 text-sm mb-6 text-center px-8">
            Start the camera to see QMY coins and monsters in AR
          </p>
          {cameraError && (
            <p className="text-red-400 text-sm mb-4 text-center px-8">
              {cameraError.message}
            </p>
          )}
        </div>
      )}

      {/* Loading overlay */}
      {cameraLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm">Starting camera...</p>
          </div>
        </div>
      )}

      {/* Spawns loading indicator */}
      {spawnsLoading && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-black/60 rounded-full px-3 py-1">
          <p className="text-gold text-xs">Loading spawns...</p>
        </div>
      )}

      {/* Bottom action bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/70 backdrop-blur-sm border-t border-gold/20">
        <CameraARActionBar
          nearestSpawn={nearestSpawn}
          isCoinLocked={isCoinLocked}
          isMonsterCaptured={isMonsterCaptured}
        />
        <CameraARControls
          cameraActive={isActive}
          cameraLoading={cameraLoading}
          onStartCamera={startCamera}
          onStopCamera={stopCamera}
        />
      </div>
    </div>
  );
}
