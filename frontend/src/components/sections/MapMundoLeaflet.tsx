import { useEffect } from 'react';

export default function MapMundoLeaflet() {
  useEffect(() => {
    const iframe = document.getElementById('leaflet-map-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = '/map/index.html';
    }
  }, []);

  return (
    <div 
      className="w-full bg-white safe-top safe-bottom"
      style={{
        flex: 1,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        paddingTop: '20px',
        paddingBottom: '80px',
      }}
    >
      <iframe
        id="leaflet-map-iframe"
        title="Quantumoney Map"
        className="w-full h-full border-0"
        style={{
          minHeight: 'calc(100vh - 152px)',
        }}
        allow="geolocation"
      />
    </div>
  );
}
