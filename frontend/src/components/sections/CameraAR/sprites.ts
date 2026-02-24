import type { MockSpawn } from '@/lib/mockSpawns';

export function getSpriteForObject(obj: MockSpawn): string {
  switch (obj.type) {
    case 'coin-unlocked':
      return '/assets/generated/map-unlocked-qmy-coin-silver-bright.dim_32x32.png';
    case 'coin-locked':
      return '/assets/generated/map-locked-qmy-coin-gold-bright.dim_32x32.png';
    case 'monster-common':
    case 'monster-rare':
    case 'monster-legendary':
      return '/assets/generated/ar-monster-sprite-placeholder-transparent.dim_512x512.png';
    default:
      return '/assets/generated/ar-monster-sprite-placeholder-transparent.dim_512x512.png';
  }
}
