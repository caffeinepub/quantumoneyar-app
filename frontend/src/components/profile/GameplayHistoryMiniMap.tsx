import { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import type { GameplayHistoryEvent } from '@/gameplay/history/useGameplayHistory';

interface GameplayHistoryMiniMapProps {
  events: GameplayHistoryEvent[];
}

export function GameplayHistoryMiniMap({ events }: GameplayHistoryMiniMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Filter events with location data (latitude/longitude fields)
  const eventsWithLocation = events.filter(
    (e) => typeof e.latitude === 'number' && typeof e.longitude === 'number'
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || eventsWithLocation.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Calculate bounds using latitude/longitude directly on the event
    const lats = eventsWithLocation.map((e) => e.latitude as number);
    const lngs = eventsWithLocation.map((e) => e.longitude as number);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 0.01;
    const lngRange = maxLng - minLng || 0.01;

    const padding = 20;
    const mapWidth = rect.width - padding * 2;
    const mapHeight = rect.height - padding * 2;

    // Project lat/lng to canvas coordinates
    const project = (lat: number, lng: number) => {
      const x = padding + ((lng - minLng) / lngRange) * mapWidth;
      const y = padding + ((maxLat - lat) / latRange) * mapHeight;
      return { x, y };
    };

    // Draw grid
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.2;
    for (let i = 0; i <= 4; i++) {
      const x = padding + (i / 4) * mapWidth;
      const y = padding + (i / 4) * mapHeight;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + mapHeight);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + mapWidth, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Draw markers
    eventsWithLocation.forEach((event) => {
      const lat = event.latitude as number;
      const lng = event.longitude as number;
      const { x, y } = project(lat, lng);

      // Marker color based on type
      let color = '#FFD700';
      if (event.type === 'coin-lock') {
        color = '#FFD700';
      } else if (event.type === 'monster-capture') {
        color = '#9333EA';
      } else if (event.type === 'xp-gain') {
        color = '#10B981';
      } else if (event.type === 'level-up') {
        color = '#3B82F6';
      }

      // Draw marker
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw glow
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    // Draw legend
    ctx.font = '10px Inter';
    ctx.fillStyle = '#D4AF37';
    ctx.fillText(`${eventsWithLocation.length} locations`, padding, rect.height - 5);
  }, [eventsWithLocation]);

  if (eventsWithLocation.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-black to-amber-950/20 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-sm text-amber-400 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Activity Mini-Map (Conceptual)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
            No location data yet
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-black to-amber-950/20 border-amber-500/30">
      <CardHeader>
        <CardTitle className="text-sm text-amber-400 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Activity Mini-Map (Conceptual)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          className="w-full h-48 rounded-lg border border-amber-500/20 cursor-pointer"
          style={{ imageRendering: 'crisp-edges' }}
        />
        <p className="text-xs text-white/60 mt-2">
          Visual representation of your AR activity locations
        </p>
      </CardContent>
    </Card>
  );
}
