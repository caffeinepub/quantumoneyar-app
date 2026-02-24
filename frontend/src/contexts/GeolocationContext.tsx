import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type GeolocationPermissionState = 'prompt' | 'granted' | 'denied' | 'unavailable' | 'initializing';

export interface UserPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface GeolocationError {
  code: number;
  message: string;
  userMessage: string;
}

interface GeolocationContextType {
  position: UserPosition | null;
  permissionState: GeolocationPermissionState;
  error: GeolocationError | null;
  isTracking: boolean;
  hasFirstFix: boolean;
  requestPermission: () => Promise<boolean>;
  startTracking: () => void;
  stopTracking: () => void;
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined);

export function GeolocationProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<UserPosition | null>(null);
  const [permissionState, setPermissionState] = useState<GeolocationPermissionState>('initializing');
  const [error, setError] = useState<GeolocationError | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [hasFirstFix, setHasFirstFix] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

  const handlePositionUpdate = useCallback((pos: GeolocationPosition) => {
    setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      timestamp: pos.timestamp,
    });
    setError(null);
    if (!hasFirstFix) {
      setHasFirstFix(true);
    }
  }, [hasFirstFix]);

  const handleError = useCallback((err: GeolocationPositionError) => {
    let userMessage = 'Location access needed. Please enable location permission in your browser settings to see your position and nearby spots on the map. The AR camera and map remain functional without location access.';
    
    switch (err.code) {
      case err.PERMISSION_DENIED:
        setPermissionState('denied');
        userMessage = 'Location permission denied. Please enable location access in your browser settings to see your position and nearby spots on the map. The AR camera and map remain functional without location access.';
        break;
      case err.POSITION_UNAVAILABLE:
        userMessage = 'Location information is unavailable. Please check your GPS settings.';
        break;
      case err.TIMEOUT:
        userMessage = 'Location request timed out. Please try again.';
        break;
    }

    setError({
      code: err.code,
      message: err.message,
      userMessage,
    });
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (permissionRequested && permissionState !== 'prompt') {
      return permissionState === 'granted';
    }

    setPermissionRequested(true);

    if (!navigator.geolocation) {
      setPermissionState('unavailable');
      setError({
        code: -1,
        message: 'Geolocation not supported',
        userMessage: 'Your browser does not support location services.',
      });
      return false;
    }

    try {
      if ('permissions' in navigator) {
        try {
          const result = await navigator.permissions.query({ name: 'geolocation' });
          
          if (result.state === 'granted') {
            setPermissionState('granted');
            return true;
          } else if (result.state === 'denied') {
            setPermissionState('denied');
            setError({
              code: 1,
              message: 'Permission denied',
              userMessage: 'Location permission denied. Please enable location access in your browser settings to see your position and nearby spots on the map.',
            });
            return false;
          }
        } catch (permErr) {
          console.log('Permissions API not available, using getCurrentPosition probe');
        }
      }

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPermissionState('granted');
            handlePositionUpdate(pos);
            resolve(true);
          },
          (err) => {
            handleError(err);
            resolve(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });
    } catch (err) {
      console.error('Error requesting geolocation permission:', err);
      setPermissionState('unavailable');
      return false;
    }
  }, [permissionRequested, permissionState, handlePositionUpdate, handleError]);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setPermissionState('unavailable');
      return;
    }

    if (watchId !== null) {
      return;
    }

    const id = navigator.geolocation.watchPosition(
      handlePositionUpdate,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    setWatchId(id);
    setIsTracking(true);
  }, [watchId, handlePositionUpdate, handleError]);

  const stopTracking = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
    }
  }, [watchId]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setPermissionState('unavailable');
      setError({
        code: -1,
        message: 'Geolocation not supported',
        userMessage: 'Your browser does not support location services.',
      });
    } else {
      setPermissionState('prompt');
    }
  }, []);

  return (
    <GeolocationContext.Provider
      value={{
        position,
        permissionState,
        error,
        isTracking,
        hasFirstFix,
        requestPermission,
        startTracking,
        stopTracking,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
}

export function useGeolocation() {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error('useGeolocation must be used within GeolocationProvider');
  }
  return context;
}
