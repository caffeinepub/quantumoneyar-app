// Sprite asset selector mapping object types to static image paths for AR overlay rendering.

const SPRITE_MAP: Record<string, string> = {
  'coin-unlocked': '/assets/generated/ar-qmy-coin-3d-transparent.dim_400x400.png',
  'coin-locked': '/assets/generated/map-locked-qmy-coin-gold.dim_32x32.png',
  'monster-common': '/assets/generated/ar-common-monster-transparent.dim_400x400.png',
  'monster-rare': '/assets/generated/ar-rare-monster-transparent.dim_400x400.png',
  'monster-legendary': '/assets/generated/ar-monster-sprite-placeholder-transparent.dim_512x512.png',
};

export function getSpriteForType(type: string): string {
  return SPRITE_MAP[type] ?? SPRITE_MAP['coin-unlocked'];
}
