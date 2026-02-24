import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface SimulatedLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface PresetLocation {
  name: string;
  latitude: number;
  longitude: number;
}

interface SimulatedLocationContextType {
  location: SimulatedLocation;
  isReady: boolean;
  presetLocations: PresetLocation[];
  currentPresetIndex: number;
  setLocation: (lat: number, lng: number) => void;
  selectPreset: (index: number) => void;
  moveStep: (direction: 'north' | 'south' | 'east' | 'west', meters: number) => void;
  reset: () => void;
  recenter: () => void;
}

const SimulatedLocationContext = createContext<SimulatedLocationContextType | undefined>(undefined);

const PRESET_LOCATIONS: PresetLocation[] = [
  { name: 'Évora, Portugal', latitude: 38.5667, longitude: -7.9067 },
  { name: 'Lisboa, Portugal', latitude: 38.7223, longitude: -9.1393 },
  { name: 'Madrid, Spain', latitude: 40.4168, longitude: -3.7038 },
  { name: 'London, UK', latitude: 51.5074, longitude: -0.1278 },
  { name: 'New York, USA', latitude: 40.7128, longitude: -74.0060 },
];

const DEFAULT_LOCATION = PRESET_LOCATIONS[0];
const STORAGE_KEY = 'quantumoney_simulated_location';

// Approximate meters to degrees conversion (at equator)
const METERS_TO_DEGREES = 0.00001;

export function SimulatedLocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<SimulatedLocation>(() => {
    // Try to restore from sessionStorage
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          timestamp: Date.now(),
        };
      } catch {
        // Fall through to default
      }
    }
    return {
      latitude: DEFAULT_LOCATION.latitude,
      longitude: DEFAULT_LOCATION.longitude,
      accuracy: 10,
      timestamp: Date.now(),
    };
  });

  const [currentPresetIndex, setCurrentPresetIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Mark as ready immediately (synchronous initialization)
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Persist location to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy,
    }));
  }, [location]);

  const setLocation = useCallback((lat: number, lng: number) => {
    setLocationState({
      latitude: lat,
      longitude: lng,
      accuracy: 10,
      timestamp: Date.now(),
    });
  }, []);

  const selectPreset = useCallback((index: number) => {
    if (index >= 0 && index < PRESET_LOCATIONS.length) {
      const preset = PRESET_LOCATIONS[index];
      setCurrentPresetIndex(index);
      setLocation(preset.latitude, preset.longitude);
    }
  }, [setLocation]);

  const moveStep = useCallback((direction: 'north' | 'south' | 'east' | 'west', meters: number) => {
    const delta = meters * METERS_TO_DEGREES;
    setLocationState(prev => {
      let newLat = prev.latitude;
      let newLng = prev.longitude;

      switch (direction) {
        case 'north':
          newLat += delta;
          break;
        case 'south':
          newLat -= delta;
          break;
        case 'east':
          newLng += delta;
          break;
        case 'west':
          newLng -= delta;
          break;
      }

      return {
        latitude: newLat,
        longitude: newLng,
        accuracy: 10,
        timestamp: Date.now(),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setCurrentPresetIndex(0);
    setLocation(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
    sessionStorage.removeItem(STORAGE_KEY);
  }, [setLocation]);

  const recenter = useCallback(() => {
    const preset = PRESET_LOCATIONS[currentPresetIndex];
    setLocation(preset.latitude, preset.longitude);
  }, [currentPresetIndex, setLocation]);

  return (
    <SimulatedLocationContext.Provider
      value={{
        location,
        isReady,
        presetLocations: PRESET_LOCATIONS,
        currentPresetIndex,
        setLocation,
        selectPreset,
        moveStep,
        reset,
        recenter,
      }}
    >
      {children}
    </SimulatedLocationContext.Provider>
  );
}

export function useSimulatedLocation() {
  const context = useContext(SimulatedLocationContext);
  if (!context) {
    throw new Error('useSimulatedLocation must be used within SimulatedLocationProvider');
  }
  return context;
}
