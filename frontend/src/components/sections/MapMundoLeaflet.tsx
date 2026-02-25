import React, { useEffect, useRef } from 'react';
import { arInteractionsStore } from '../../lib/arInteractionsStore';

export default function MapMundoLeaflet() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Send state updates to the iframe map
  const sendStateToMap = () => {
    if (!iframeRef.current?.contentWindow) return;
    const state = arInteractionsStore.getState();
    iframeRef.current.contentWindow.postMessage(
      { type: 'AR_STATE_UPDATE', payload: state },
      '*'
    );
  };

  useEffect(() => {
    // Send initial state after iframe loads
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setTimeout(sendStateToMap, 500);
    };

    iframe.addEventListener('load', handleLoad);

    // Listen for storage changes and forward to map
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'qmy_ar_interactions_v2') {
        sendStateToMap();
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: '75vh', height: 'calc(100vh - 120px)', paddingBottom: '80px' }}
    >
      <iframe
        ref={iframeRef}
        src="/map/index.html"
        title="Quantumoney World Map"
        className="w-full flex-1 border-0"
        style={{ minHeight: '400px' }}
        allow="geolocation"
      />
    </div>
  );
}
