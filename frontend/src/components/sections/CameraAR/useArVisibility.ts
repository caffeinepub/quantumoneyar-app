import { useMemo } from 'react';
import { calculateDistance } from '@/lib/haversine';
import { getAngularTolerance } from './tolerance';
import { calculateBearing, normalizeAngleDifference } from './arMath';
import type { MockSpawn } from '@/lib/mockSpawns';
import type { UserPosition } from '@/contexts/GeolocationContext';

interface UseArVisibilityProps {
  userPosition: UserPosition | null;
  userHeading: number | null;
  userXP: number;
  allObjects: MockSpawn[];
}

export function useArVisibility({
  userPosition,
  userHeading,
  userXP,
  allObjects,
}: UseArVisibilityProps): MockSpawn[] {
  return useMemo(() => {
    if (!userPosition || userHeading === null) {
      return [];
    }

    const radiusMeters = userXP;
    const tolerance = getAngularTolerance(userXP);

    return allObjects.filter((obj) => {
      const distance = calculateDistance(
        userPosition.latitude,
        userPosition.longitude,
        obj.latitude,
        obj.longitude
      );

      if (distance > radiusMeters) {
        return false;
      }

      const bearing = calculateBearing(
        userPosition.latitude,
        userPosition.longitude,
        obj.latitude,
        obj.longitude
      );

      const angleDiff = normalizeAngleDifference(bearing - userHeading);

      return Math.abs(angleDiff) <= tolerance;
    });
  }, [userPosition, userHeading, userXP, allObjects]);
}
