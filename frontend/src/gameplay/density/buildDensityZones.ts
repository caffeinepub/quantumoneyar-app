export interface DensityZone {
  id: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  density: number;
  color: string;
}

interface SpotWithCoords {
  latitude: number;
  longitude: number;
}

const GRID_SIZE = 0.5; // degrees

export function buildDensityZones(spots: SpotWithCoords[]): DensityZone[] {
  if (spots.length === 0) return [];

  const buckets = new Map<string, number>();

  spots.forEach((spot) => {
    const gridLat = Math.floor(spot.latitude / GRID_SIZE) * GRID_SIZE;
    const gridLng = Math.floor(spot.longitude / GRID_SIZE) * GRID_SIZE;
    const key = `${gridLat},${gridLng}`;
    buckets.set(key, (buckets.get(key) || 0) + 1);
  });

  const maxDensity = Math.max(...Array.from(buckets.values()));

  const zones: DensityZone[] = [];
  buckets.forEach((count, key) => {
    const [latStr, lngStr] = key.split(',');
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    const normalizedDensity = count / maxDensity;

    let color: string;
    if (normalizedDensity < 0.33) {
      color = 'rgba(34, 197, 94, 0.3)';
    } else if (normalizedDensity < 0.66) {
      color = 'rgba(234, 179, 8, 0.3)';
    } else {
      color = 'rgba(239, 68, 68, 0.3)';
    }

    zones.push({
      id: key,
      bounds: {
        north: lat + GRID_SIZE,
        south: lat,
        east: lng + GRID_SIZE,
        west: lng,
      },
      density: normalizedDensity,
      color,
    });
  });

  return zones;
}
