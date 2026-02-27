import React, { useEffect, useRef, useCallback } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { arInteractionsStore } from '../../lib/arInteractionsStore';
import { useSpawnList } from '../../hooks/useSpawnList';

export default function MapMundoLeaflet() {
  const { identity } = useInternetIdentity();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { data: spawnList = [] } = useSpawnList();

  const sendStateToMap = useCallback(() => {
    if (!iframeRef.current?.contentWindow) return;
    const state = arInteractionsStore.getAll();
    iframeRef.current.contentWindow.postMessage(
      {
        type: 'AR_STATE_UPDATE',
        lockedCoins: Array.from(state.lockedCoins),
        capturedMonsters: Array.from(state.capturedMonsters),
        spawns: spawnList,
      },
      '*'
    );
  }, [spawnList]);

  // Send state when iframe loads
  const handleIframeLoad = useCallback(() => {
    setTimeout(sendStateToMap, 300);
  }, [sendStateToMap]);

  // Listen for localStorage changes (from AR actions)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'arInteractionsStore') {
        sendStateToMap();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [sendStateToMap]);

  // Send updated spawn list when it changes
  useEffect(() => {
    if (spawnList.length > 0) {
      sendStateToMap();
    }
  }, [spawnList, sendStateToMap]);

  if (!identity) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white p-8 text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <h2 className="text-xl font-bold text-gold mb-2">Login Required</h2>
        <p className="text-white/60 text-sm">Please login to view the world map.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" style={{ minHeight: '100dvh' }}>
      <iframe
        ref={iframeRef}
        src="/map/index.html"
        className="w-full h-full border-0"
        title="Quantumoney World Map"
        onLoad={handleIframeLoad}
        allow="geolocation"
        style={{ minHeight: '100dvh' }}
      />
    </div>
  );
}
