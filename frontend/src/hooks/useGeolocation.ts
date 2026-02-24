import { useGeolocation as useGeolocationContext } from '../contexts/GeolocationContext';

export function useGeolocation() {
  return useGeolocationContext();
}
