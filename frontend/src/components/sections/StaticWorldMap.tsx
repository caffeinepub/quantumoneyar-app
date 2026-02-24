import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crosshair, RotateCcw, Layers, MapPin, Coins, Ghost } from 'lucide-react';
import { useSimulatedLocation } from '@/contexts/SimulatedLocationContext';
import { MOCK_SPAWNS, getSpawnsNearLocation } from '@/lib/mockSpawns';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { isSpawnCollected } from '@/lib/mockGameplayState';
import { toast } from 'sonner';

export default function StaticWorldMap() {
  const { identity } = useInternetIdentity();
  const { location, isReady, presetLocations, currentPresetIndex, selectPreset, moveStep, recenter } = useSimulatedLocation();
  const [layersVisible, setLayersVisible] = useState({
    coins: true,
    monsters: true,
    player: true,
  });
  const [nearbySpawns, setNearbySpawns] = useState(MOCK_SPAWNS);

  const principal = identity?.getPrincipal().toString() || 'guest';

  // Update nearby spawns when location changes
  useEffect(() => {
    if (isReady) {
      const nearby = getSpawnsNearLocation(location.latitude, location.longitude, 50); // 50m radius for map view
      setNearbySpawns(nearby);
    }
  }, [location, isReady]);

  // Persist layer toggles to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('map_layers', JSON.stringify(layersVisible));
  }, [layersVisible]);

  // Restore layer toggles from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('map_layers');
    if (stored) {
      try {
        setLayersVisible(JSON.parse(stored));
      } catch {
        // Ignore
      }
    }
  }, []);

  const handleRecenter = () => {
    recenter();
    toast.success('Map centered on current location');
  };

  const handleReset = () => {
    selectPreset(0);
    toast.success('Location reset to default');
  };

  const toggleLayer = (layer: keyof typeof layersVisible) => {
    setLayersVisible(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-full bg-black">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FFD700] border-t-transparent mx-auto" />
          <p className="text-white font-semibold">Initializing map...</p>
        </div>
      </div>
    );
  }

  const nearbyCoins = nearbySpawns.filter(s => s.type.startsWith('coin')).length;
  const nearbyMonsters = nearbySpawns.filter(s => s.type.startsWith('monster')).length;

  return (
    <div className="relative w-full h-full bg-black flex flex-col">
      {/* Static Map Image */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src="/assets/generated/mock-world-map-1.dim_1600x900.png"
          alt="World Map"
          className="w-full h-full object-cover"
        />

        {/* Overlay: Player Marker */}
        {layersVisible.player && (
          <div
            className="absolute w-6 h-6 bg-blue-500 border-4 border-white rounded-full shadow-lg animate-pulse"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
            }}
            title="You are here"
          />
        )}

        {/* Overlay: Spawn Markers */}
        {nearbySpawns.map((spawn) => {
          const isCollected = isSpawnCollected(principal, spawn.id, spawn.type);
          
          // Skip if layer is hidden
          if (spawn.type.startsWith('coin') && !layersVisible.coins) return null;
          if (spawn.type.startsWith('monster') && !layersVisible.monsters) return null;

          // Calculate relative position (simplified for static map)
          const offsetX = (spawn.longitude - location.longitude) * 10000;
          const offsetY = (location.latitude - spawn.latitude) * 10000;

          let markerColor = '#FFD700';
          let markerIcon = '💰';
          
          if (spawn.type === 'coin-unlocked') {
            markerColor = '#C0C0C0';
            markerIcon = '🪙';
          } else if (spawn.type.startsWith('monster')) {
            markerColor = spawn.type === 'monster-legendary' ? '#9333ea' : spawn.type === 'monster-rare' ? '#3b82f6' : '#10b981';
            markerIcon = '👾';
          }

          return (
            <div
              key={spawn.id}
              className="absolute group"
              style={{
                left: `calc(50% + ${offsetX}px)`,
                top: `calc(50% + ${offsetY}px)`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                opacity: isCollected ? 0.3 : 1,
              }}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-125"
                style={{ backgroundColor: markerColor }}
                title={spawn.name}
              >
                <span className="text-sm">{markerIcon}</span>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-[#FFD700]/50">
                <strong>{spawn.name}</strong>
                <br />
                {spawn.type.startsWith('coin') ? `${spawn.reward} QMY` : `${spawn.reward} XP`}
                {isCollected && <><br /><span className="text-gray-400">✓ Collected</span></>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top HUD */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
        <Card className="bg-black/80 backdrop-blur-sm border-[#FFD700]/50">
          <CardContent className="p-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#FFD700]" />
              <span className="text-white text-sm font-semibold">
                {presetLocations[currentPresetIndex].name}
              </span>
            </div>
            <div className="text-white/60 text-xs">
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats HUD */}
      <div className="absolute top-20 right-4 z-30">
        <Card className="bg-black/80 backdrop-blur-sm border-[#FFD700]/50">
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-amber-500" />
              <span className="text-white text-sm">Coins: {nearbyCoins}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ghost className="h-4 w-4 text-purple-500" />
              <span className="text-white text-sm">Monsters: {nearbyMonsters}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="absolute bottom-24 right-4 z-30 flex flex-col gap-2">
        <Button
          size="icon"
          onClick={handleRecenter}
          className="bg-[#FFD700] text-black hover:bg-[#D4AF37] shadow-lg"
          title="Recenter"
        >
          <Crosshair className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          onClick={handleReset}
          className="bg-[#FFD700] text-black hover:bg-[#D4AF37] shadow-lg"
          title="Reset Location"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          onClick={() => toggleLayer('coins')}
          className={`${layersVisible.coins ? 'bg-amber-500' : 'bg-gray-600'} text-white hover:bg-amber-600 shadow-lg`}
          title="Toggle Coins"
        >
          <Coins className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          onClick={() => toggleLayer('monsters')}
          className={`${layersVisible.monsters ? 'bg-purple-500' : 'bg-gray-600'} text-white hover:bg-purple-600 shadow-lg`}
          title="Toggle Monsters"
        >
          <Ghost className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          onClick={() => toggleLayer('player')}
          className={`${layersVisible.player ? 'bg-blue-500' : 'bg-gray-600'} text-white hover:bg-blue-600 shadow-lg`}
          title="Toggle Player"
        >
          <MapPin className="h-5 w-5" />
        </Button>
      </div>

      {/* Location Presets */}
      <div className="absolute bottom-24 left-4 z-30 flex flex-col gap-2 max-w-xs">
        <Card className="bg-black/80 backdrop-blur-sm border-[#FFD700]/50">
          <CardContent className="p-3">
            <p className="text-white text-xs font-semibold mb-2">Quick Travel:</p>
            <div className="flex flex-wrap gap-1">
              {presetLocations.map((preset, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={currentPresetIndex === index ? 'default' : 'outline'}
                  onClick={() => selectPreset(index)}
                  className="text-xs"
                >
                  {preset.name.split(',')[0]}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movement Controls */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30">
        <Card className="bg-black/80 backdrop-blur-sm border-[#FFD700]/50">
          <CardContent className="p-2">
            <div className="grid grid-cols-3 gap-1">
              <div />
              <Button size="sm" onClick={() => moveStep('north', 10)} className="bg-[#FFD700] text-black hover:bg-[#D4AF37]">
                ↑
              </Button>
              <div />
              <Button size="sm" onClick={() => moveStep('west', 10)} className="bg-[#FFD700] text-black hover:bg-[#D4AF37]">
                ←
              </Button>
              <div className="flex items-center justify-center text-white text-xs">10m</div>
              <Button size="sm" onClick={() => moveStep('east', 10)} className="bg-[#FFD700] text-black hover:bg-[#D4AF37]">
                →
              </Button>
              <div />
              <Button size="sm" onClick={() => moveStep('south', 10)} className="bg-[#FFD700] text-black hover:bg-[#D4AF37]">
                ↓
              </Button>
              <div />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
