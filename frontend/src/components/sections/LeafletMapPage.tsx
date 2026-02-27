import { useEffect, useRef, useState } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGeolocation } from '@/contexts/GeolocationContext';
import { useSimulatedLocation } from '@/contexts/SimulatedLocationContext';
import { useGameState } from '@/contexts/GameStateContext';
import { Loader2 } from 'lucide-react';
import { GameplayHUD } from '@/components/gameplay/GameplayHUD';
import { UniverseBackdrop } from '@/components/gameplay/UniverseBackdrop';
import { getSpawnsNearPosition } from '@/lib/mockSpawns';
import { useWalkingMeters } from '@/hooks/useWalkingMeters';

export default function LeafletMapPage() {
  const { identity } = useInternetIdentity();
  const {
    position: geoPosition,
    permissionState,
    requestPermission,
    startTracking,
  } = useGeolocation();
  const { location: simulatedLocation, isReady: simulatedReady } = useSimulatedLocation();
  const { playerState } = useGameState();
  const [loading, setLoading] = useState(true);
  const [geoPermissionRequested, setGeoPermissionRequested] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isAuthenticated = !!identity;

  const currentLocation = geoPosition
    ? { latitude: geoPosition.latitude, longitude: geoPosition.longitude }
    : simulatedLocation;

  const usingRealGPS = !!geoPosition;

  const { totalMeters } = useWalkingMeters(
    geoPosition?.latitude ?? null,
    geoPosition?.longitude ?? null,
    usingRealGPS
  );

  const nearbySpawns =
    simulatedReady || geoPosition
      ? getSpawnsNearPosition(currentLocation.latitude, currentLocation.longitude, 10)
      : [];

  useEffect(() => {
    if (!geoPermissionRequested && permissionState === 'prompt') {
      setGeoPermissionRequested(true);
      requestPermission().then((granted) => {
        if (granted) startTracking();
      });
    }
  }, [geoPermissionRequested, permissionState, requestPermission, startTracking]);

  useEffect(() => {
    if (iframeRef.current?.contentWindow && (simulatedReady || geoPosition)) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'updatePlayerLocation',
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        '*'
      );
    }
  }, [currentLocation.latitude, currentLocation.longitude, simulatedReady, geoPosition]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setLoading(false), 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleIframeLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div
        className="flex items-center justify-center golden-paper-bg"
        style={{ height: 'calc(100vh - 80px - 70px)' }}
      >
        <div className="text-center p-8 bg-black/80 rounded-lg border-2 border-[#FFD700]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-4">Authentication Required</h2>
          <p className="text-white mb-4">Please login to access the map</p>
        </div>
      </div>
    );
  }

  const xp = Number(playerState?.xp ?? 0);

  return (
    <div className="relative w-full h-full" style={{ minHeight: '75vh' }}>
      <UniverseBackdrop />

      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {loading && (
          <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/50">
            <Loader2 className="h-8 w-8 animate-spin text-[#FFD700]" />
          </div>
        )}

        <iframe
          ref={iframeRef}
          src="/map/index.html"
          className="w-full h-full border-0"
          style={{ minHeight: '75vh' }}
          title="Quantumoney Map"
          allow="geolocation"
          onLoad={handleIframeLoad}
        />
      </div>

      <div className="absolute top-4 left-4 right-4 z-30">
        <GameplayHUD
          xp={xp}
          metersWalked={totalMeters}
          nearbySpawnsCount={nearbySpawns.length}
        />
      </div>
    </div>
  );
}
