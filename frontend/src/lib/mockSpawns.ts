// FALLBACK ONLY — used when canister is unreachable
import { SpawnItem } from '../backend';
import { calculateDistance } from './haversine';

export const MOCK_SPAWNS: SpawnItem[] = [
  {
    id: 'coin_spawn_001',
    spawnType: 'coin',
    latitude: 38.5667,
    longitude: -7.9,
    itemType: 'QMY_coin',
    attributes: 'value:10,rarity:common',
  },
  {
    id: 'coin_spawn_002',
    spawnType: 'coin',
    latitude: 38.5700,
    longitude: -7.905,
    itemType: 'QMY_coin',
    attributes: 'value:50,rarity:uncommon',
  },
  {
    id: 'coin_spawn_003',
    spawnType: 'coin',
    latitude: 38.5650,
    longitude: -7.895,
    itemType: 'QMY_coin',
    attributes: 'value:100,rarity:rare',
  },
  {
    id: 'monster_spawn_001',
    spawnType: 'monster',
    latitude: 38.5680,
    longitude: -7.902,
    itemType: 'Quantumon_Alpha',
    attributes: 'level:1,hp:100,xp_reward:20',
  },
  {
    id: 'monster_spawn_002',
    spawnType: 'monster',
    latitude: 38.5640,
    longitude: -7.908,
    itemType: 'Quantumon_Beta',
    attributes: 'level:3,hp:250,xp_reward:20',
  },
  {
    id: 'monster_spawn_003',
    spawnType: 'monster',
    latitude: 38.5710,
    longitude: -7.898,
    itemType: 'Quantumon_Gamma',
    attributes: 'level:5,hp:500,xp_reward:20',
  },
  {
    id: 'coin_spawn_004',
    spawnType: 'coin',
    latitude: 38.5720,
    longitude: -7.910,
    itemType: 'QMY_coin',
    attributes: 'value:25,rarity:common',
  },
  {
    id: 'monster_spawn_004',
    spawnType: 'monster',
    latitude: 38.5630,
    longitude: -7.892,
    itemType: 'Quantumon_Delta',
    attributes: 'level:2,hp:150,xp_reward:20',
  },
  {
    id: 'coin_spawn_005',
    spawnType: 'coin',
    latitude: 38.5690,
    longitude: -7.915,
    itemType: 'QMY_coin',
    attributes: 'value:75,rarity:uncommon',
  },
  {
    id: 'monster_spawn_005',
    spawnType: 'monster',
    latitude: 38.5660,
    longitude: -7.888,
    itemType: 'Quantumon_Epsilon',
    attributes: 'level:4,hp:350,xp_reward:20',
  },
];

// Alias for backward compatibility
export const mockSpawns = MOCK_SPAWNS;

export function getSpawnsNearPosition(
  lat: number,
  lng: number,
  radiusMeters: number
): SpawnItem[] {
  return MOCK_SPAWNS.filter((spawn) => {
    const dist = calculateDistance(lat, lng, spawn.latitude, spawn.longitude);
    return dist <= radiusMeters;
  });
}

// Alias for backward compatibility
export const getSpawnsNearLocation = getSpawnsNearPosition;
