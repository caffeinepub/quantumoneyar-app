import { useMemo } from 'react';
import { SpawnItem } from '../../../backend';
import { calculateDistance } from '../../../lib/haversine';
import { getAngularTolerance } from './tolerance';
import { calculateBearing, normalizeAngleDifference } from './arMath';

interface Position {
  latitude: number;
  longitude: number;
}

interface UseArVisibilityParams {
  spawns: SpawnItem[];
  position: Position | null;
  heading: number;
  xp: number;
}

const MAX_VISIBLE_DISTANCE = 200; // meters

export function useArVisibility({ spawns, position, heading, xp }: UseArVisibilityParams): SpawnItem[] {
  return useMemo(() => {
    if (!position) return spawns.slice(0, 5); // Show some spawns even without GPS

    const tolerance = getAngularTolerance(xp);

    return spawns.filter((spawn) => {
      const dist = calculateDistance(
        position.latitude,
        position.longitude,
        spawn.latitude,
        spawn.longitude
      );

      if (dist > MAX_VISIBLE_DISTANCE) return false;

      // If heading is 0 (no compass), show all nearby spawns
      if (heading === 0) return true;

      const bearing = calculateBearing(
        position.latitude,
        position.longitude,
        spawn.latitude,
        spawn.longitude
      );

      return Math.abs(normalizeAngleDifference(bearing - heading)) <= tolerance;
    });
  }, [spawns, position, heading, xp]);
}
