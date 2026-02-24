import { useEffect, useState, useRef } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Loader2, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function LeafletMap() {
  const { identity } = useInternetIdentity();
  const [mapLoading, setMapLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isAuthenticated = !!identity;

  // Handle map load with safety timeout
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setMapLoading(false);
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleIframeLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMapLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="flex items-center justify-center golden-paper-bg"
        style={{ height: 'calc(100vh - 80px - 72px)' }}
      >
        <div className="text-center p-8 bg-black/80 rounded-lg border-2 border-[#FFD700]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-4">
            Authentication Required
          </h2>
          <p className="text-white mb-4">
            Please login to access the world map
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black" style={{ height: 'calc(100vh - 80px - 72px)' }}>
      {mapLoading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/50">
          <Loader2 className="h-8 w-8 animate-spin text-[#FFD700]" />
        </div>
      )}
      
      {/* Leaflet OpenStreetMap via iframe */}
      <iframe
        ref={iframeRef}
        src="/map/index.html"
        className="w-full h-full border-0"
        title="Quantumoney World Map - Spawn Visualization"
        onLoad={handleIframeLoad}
      />

      {/* Info overlay */}
      <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none">
        <Card className="bg-black/80 border-[#FFD700] pointer-events-auto">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-[#FFD700]">
              <MapPin className="h-5 w-5" />
              <div>
                <p className="font-bold">Quantumoney World Map - Spawn Visualization</p>
                <p className="text-xs text-white/80">
                  Leaflet OpenStreetMap | Gameplay Only
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
