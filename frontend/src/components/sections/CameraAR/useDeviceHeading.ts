import { useState, useEffect } from 'react';

interface DeviceOrientationEventWithWebkit extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

interface UseDeviceHeadingReturn {
  heading: number | null;
  isSupported: boolean;
  error: string | null;
}

export function useDeviceHeading(): UseDeviceHeadingReturn {
  const [heading, setHeading] = useState<number | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false);
      setError('Device orientation not supported');
      return;
    }

    let lastUpdate = 0;
    const THROTTLE_MS = 100;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const now = Date.now();
      if (now - lastUpdate < THROTTLE_MS) return;
      lastUpdate = now;

      if (event.alpha !== null) {
        let compassHeading = event.alpha;
        
        const webkitEvent = event as DeviceOrientationEventWithWebkit;
        if (webkitEvent.webkitCompassHeading !== undefined) {
          compassHeading = webkitEvent.webkitCompassHeading;
        }
        
        setHeading(compassHeading);
        setError(null);
      }
    };

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            setError('Device orientation permission denied');
            setIsSupported(false);
          }
        } catch (err) {
          setError('Failed to request device orientation permission');
          setIsSupported(false);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return { heading, isSupported, error };
}
