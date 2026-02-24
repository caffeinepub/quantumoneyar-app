import { useState, useEffect, useRef } from 'react';
import { calculateDistance } from '@/lib/haversine';

interface WalkingMetersState {
  totalMeters: number;
  lastPosition: { latitude: number; longitude: number } | null;
}

export function useWalkingMeters(
  currentLatitude: number | null,
  currentLongitude: number | null,
  enabled: boolean = true
) {
  const [state, setState] = useState<WalkingMetersState>({
    totalMeters: 0,
    lastPosition: null,
  });

  const lastUpdateRef = useRef<number>(0);
  const MIN_UPDATE_INTERVAL = 2000; // 2 seconds minimum between updates
  const MIN_DISTANCE_THRESHOLD = 1; // 1 meter minimum to count (jitter filter)
  const MAX_SPEED_MPS = 10; // 10 m/s max speed (36 km/h) to filter GPS jumps

  useEffect(() => {
    if (!enabled || currentLatitude === null || currentLongitude === null) {
      return;
    }

    const now = Date.now();
    
    // Throttle updates
    if (now - lastUpdateRef.current < MIN_UPDATE_INTERVAL) {
      return;
    }

    setState(prev => {
      if (!prev.lastPosition) {
        // First position, just store it
        lastUpdateRef.current = now;
        return {
          ...prev,
          lastPosition: { latitude: currentLatitude, longitude: currentLongitude },
        };
      }

      // Calculate distance from last position
      const distance = calculateDistance(
        prev.lastPosition.latitude,
        prev.lastPosition.longitude,
        currentLatitude,
        currentLongitude
      );

      // Filter out GPS jitter (too small movements)
      if (distance < MIN_DISTANCE_THRESHOLD) {
        return prev;
      }

      // Filter out GPS jumps (unrealistic speed)
      const timeDelta = (now - lastUpdateRef.current) / 1000; // seconds
      const speed = distance / timeDelta;
      if (speed > MAX_SPEED_MPS) {
        console.warn(`GPS jump detected: ${speed.toFixed(2)} m/s, ignoring`);
        // Update position but don't add distance
        lastUpdateRef.current = now;
        return {
          ...prev,
          lastPosition: { latitude: currentLatitude, longitude: currentLongitude },
        };
      }

      // Valid movement, add to total
      lastUpdateRef.current = now;
      return {
        totalMeters: prev.totalMeters + distance,
        lastPosition: { latitude: currentLatitude, longitude: currentLongitude },
      };
    });
  }, [currentLatitude, currentLongitude, enabled]);

  const reset = () => {
    setState({
      totalMeters: 0,
      lastPosition: null,
    });
    lastUpdateRef.current = 0;
  };

  return {
    totalMeters: Math.floor(state.totalMeters),
    reset,
  };
}
