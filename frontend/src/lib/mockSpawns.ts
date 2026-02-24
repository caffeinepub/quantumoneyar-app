export interface MockSpawn {
  id: string;
  type: 'coin-unlocked' | 'coin-locked' | 'monster-common' | 'monster-rare' | 'monster-legendary';
  name: string;
  latitude: number;
  longitude: number;
  reward: number;
  metadata?: {
    rarity?: string;
    power?: number;
    defense?: number;
    speed?: number;
  };
}

// Predefined spawn positions around Évora, Portugal (default location)
export const MOCK_SPAWNS: MockSpawn[] = [
  // Unlocked coins (silver) - within 10m
  {
    id: 'coin-u-1',
    type: 'coin-unlocked',
    name: 'Silver Coin Alpha',
    latitude: 38.5667,
    longitude: -7.9067,
    reward: 5,
  },
  {
    id: 'coin-u-2',
    type: 'coin-unlocked',
    name: 'Silver Coin Beta',
    latitude: 38.5668,
    longitude: -7.9068,
    reward: 5,
  },
  {
    id: 'coin-u-3',
    type: 'coin-unlocked',
    name: 'Silver Coin Gamma',
    latitude: 38.5666,
    longitude: -7.9066,
    reward: 5,
  },
  
  // Locked coins (gold) - within 10m
  {
    id: 'coin-l-1',
    type: 'coin-locked',
    name: 'Gold Coin Alpha',
    latitude: 38.5669,
    longitude: -7.9069,
    reward: 10,
  },
  {
    id: 'coin-l-2',
    type: 'coin-locked',
    name: 'Gold Coin Beta',
    latitude: 38.5665,
    longitude: -7.9065,
    reward: 10,
  },
  
  // Common monsters - within 10m
  {
    id: 'monster-c-1',
    type: 'monster-common',
    name: 'Quantum Sprite',
    latitude: 38.5670,
    longitude: -7.9070,
    reward: 15,
    metadata: {
      rarity: 'Common',
      power: 50,
      defense: 40,
      speed: 60,
    },
  },
  {
    id: 'monster-c-2',
    type: 'monster-common',
    name: 'Pixel Beast',
    latitude: 38.5664,
    longitude: -7.9064,
    reward: 15,
    metadata: {
      rarity: 'Common',
      power: 45,
      defense: 50,
      speed: 55,
    },
  },
  
  // Rare monsters - slightly farther (15-20m)
  {
    id: 'monster-r-1',
    type: 'monster-rare',
    name: 'Cyber Dragon',
    latitude: 38.5672,
    longitude: -7.9072,
    reward: 30,
    metadata: {
      rarity: 'Rare',
      power: 75,
      defense: 70,
      speed: 80,
    },
  },
  {
    id: 'monster-r-2',
    type: 'monster-rare',
    name: 'Neon Phoenix',
    latitude: 38.5662,
    longitude: -7.9062,
    reward: 30,
    metadata: {
      rarity: 'Rare',
      power: 80,
      defense: 65,
      speed: 85,
    },
  },
  
  // Legendary monster - farther out (25-30m)
  {
    id: 'monster-l-1',
    type: 'monster-legendary',
    name: 'Quantum Leviathan',
    latitude: 38.5675,
    longitude: -7.9075,
    reward: 100,
    metadata: {
      rarity: 'Legendary',
      power: 95,
      defense: 90,
      speed: 100,
    },
  },
  
  // Additional spawns for Lisboa preset
  {
    id: 'coin-u-lisboa-1',
    type: 'coin-unlocked',
    name: 'Lisboa Silver',
    latitude: 38.7223,
    longitude: -9.1393,
    reward: 5,
  },
  {
    id: 'coin-l-lisboa-1',
    type: 'coin-locked',
    name: 'Lisboa Gold',
    latitude: 38.7224,
    longitude: -9.1394,
    reward: 10,
  },
  {
    id: 'monster-c-lisboa-1',
    type: 'monster-common',
    name: 'Lisboa Guardian',
    latitude: 38.7225,
    longitude: -9.1395,
    reward: 15,
    metadata: {
      rarity: 'Common',
      power: 55,
      defense: 45,
      speed: 50,
    },
  },
];

export function getSpawnsNearLocation(lat: number, lng: number, radiusMeters: number): MockSpawn[] {
  return MOCK_SPAWNS.filter(spawn => {
    const distance = calculateDistance(lat, lng, spawn.latitude, spawn.longitude);
    return distance <= radiusMeters;
  });
}

// Haversine formula for distance calculation
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
