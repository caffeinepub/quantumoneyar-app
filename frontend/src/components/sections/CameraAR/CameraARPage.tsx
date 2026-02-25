import React, { useEffect, useState } from 'react';
import { useCamera } from '../../../camera/useCamera';
import { useGeolocation } from '../../../contexts/GeolocationContext';
import { useDeviceHeading } from './useDeviceHeading';
import { useArVisibility } from './useArVisibility';
import { CameraARControls } from './CameraARControls';
import OverlayLayer from './OverlayLayer';
import CameraARActionBar from './CameraARActionBar';
import { GameplayHUD } from '../../gameplay/GameplayHUD';
import { MOCK_SPAWNS } from '../../../lib/mockSpawns';
import type { MockSpawn } from '../../../lib/mockSpawns';
import { useInternetIdentity } from '../../../hooks/useInternetIdentity';
import { useGameState } from '../../../contexts/GameStateContext';
import type { Section } from '../../../App';

interface CameraARPageProps {
  onNavigate: (section: Section) => void;
}

export default function CameraARPage({ onNavigate }: CameraARPageProps) {
  const { identity } = useInternetIdentity();
  const { playerState } = useGameState();
  const { position } = useGeolocation();
  const { heading } = useDeviceHeading();
  const [xpRadius] = useState(50);

  const { isActive, isSupported, error, isLoading, startCamera, stopCamera, videoRef, canvasRef } =
    useCamera({ facingMode: 'environment', width: 1280, height: 720 });

  const visibleObjects = useArVisibility({
    userPosition: position,
    userHeading: heading,
    userXP: xpRadius,
    allObjects: MOCK_SPAWNS,
  });

  // Find the nearest visible spawn for the action bar
  const nearestSpawn: MockSpawn | null =
    visibleObjects.length > 0 ? visibleObjects[0] : null;

  const xp = playerState ? Number(playerState.xp) : 0;

  useEffect(() => {
    if (identity) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity]);

  if (!identity) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ background: '#000', color: '#FFD700' }}
      >
        <p className="text-lg font-bold mb-4">Login required for AR Camera</p>
        <button
          onClick={() => onNavigate('hud')}
          className="px-6 py-2 rounded-lg font-bold"
          style={{ border: '1.5px solid #FFD700', color: '#FFD700', background: 'rgba(0,0,0,0.7)' }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (isSupported === false) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ background: '#000', color: '#FFD700' }}
      >
        <p className="text-lg font-bold">Camera not supported on this device</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Camera feed */}
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
          visibleObjects={visibleObjects}
          heading={heading ?? 0}
          position={position}
        />
      )}

      {/* HUD */}
      <div className="absolute top-4 right-4 z-40">
        <GameplayHUD
          xp={xp}
          metersWalked={0}
          nearbySpawnsCount={visibleObjects.length}
        />
      </div>

      {/* Camera controls */}
      <CameraARControls
        cameraActive={isActive}
        cameraLoading={isLoading}
        onStartCamera={startCamera}
        onStopCamera={stopCamera}
      />

      {/* Error display */}
      {error && (
        <div
          className="absolute top-16 left-4 right-4 z-50 p-3 rounded-lg text-sm"
          style={{
            background: 'rgba(200,0,0,0.7)',
            border: '1px solid #ff4444',
            color: '#fff',
          }}
        >
          {error.message}
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && !isActive && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/60">
          <div style={{ color: '#FFD700' }} className="text-lg font-bold animate-pulse">
            Starting camera…
          </div>
        </div>
      )}

      {/* Action bar */}
      <CameraARActionBar nearbySpawn={nearestSpawn} />
    </div>
  );
}
