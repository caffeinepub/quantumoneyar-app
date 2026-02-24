// Spot Taxonomy - Unified spot type definitions for AR and Map rendering
// All spot types use premium icon assets (no emoji markers)

export type SpotType = 'coin-unlocked' | 'coin-locked' | 'creature-common' | 'creature-rare' | 'creature-legendary';

export interface SpotDefinition {
  id: SpotType;
  label: string;
  color: string;
  iconPath: string;
  xpReward: number;
  description: string;
}

export const SPOT_TAXONOMY: Record<SpotType, SpotDefinition> = {
  'coin-unlocked': {
    id: 'coin-unlocked',
    label: 'Unlocked Coin',
    color: '#C0C0C0', // Silver
    iconPath: '/assets/generated/spot-coin-silver.dim_256x256.png',
    xpReward: 1,
    description: 'Available for collection',
  },
  'coin-locked': {
    id: 'coin-locked',
    label: 'Locked Coin',
    color: '#FFD700', // Gold
    iconPath: '/assets/generated/spot-coin-gold.dim_256x256.png',
    xpReward: 5,
    description: 'Locked coin with bonus XP',
  },
  'creature-common': {
    id: 'creature-common',
    label: 'Common Creature',
    color: '#22C55E', // Green
    iconPath: '/assets/generated/spot-creature-common-green.dim_256x256.png',
    xpReward: 10,
    description: 'Common creature spawn',
  },
  'creature-rare': {
    id: 'creature-rare',
    label: 'Rare Creature',
    color: '#3B82F6', // Blue
    iconPath: '/assets/generated/spot-creature-rare-blue.dim_256x256.png',
    xpReward: 20,
    description: 'Rare creature spawn',
  },
  'creature-legendary': {
    id: 'creature-legendary',
    label: 'Legendary Creature',
    color: '#EF4444', // Red
    iconPath: '/assets/generated/spot-creature-legendary-red.dim_256x256.png',
    xpReward: 50,
    description: 'Legendary creature spawn',
  },
};

export function getSpotDefinition(type: SpotType): SpotDefinition {
  return SPOT_TAXONOMY[type];
}

export function getAllSpotTypes(): SpotType[] {
  return Object.keys(SPOT_TAXONOMY) as SpotType[];
}
