import { MockSpawn } from './mockSpawns';
import type { PlayerState } from '../backend';

interface GameplayState {
  collectedCoins: Set<string>;
  capturedMonsters: Set<string>;
  interactedSpots: Set<string>;
}

const STORAGE_KEY_PREFIX = 'quantumoney_gameplay_';

function getStorageKey(identity: string): string {
  return `${STORAGE_KEY_PREFIX}${identity}`;
}

function loadState(identity: string): GameplayState {
  const key = getStorageKey(identity);
  const stored = localStorage.getItem(key);
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        collectedCoins: new Set(parsed.collectedCoins || []),
        capturedMonsters: new Set(parsed.capturedMonsters || []),
        interactedSpots: new Set(parsed.interactedSpots || []),
      };
    } catch {
      // Fall through to default
    }
  }
  
  return {
    collectedCoins: new Set(),
    capturedMonsters: new Set(),
    interactedSpots: new Set(),
  };
}

function saveState(identity: string, state: GameplayState): void {
  const key = getStorageKey(identity);
  localStorage.setItem(key, JSON.stringify({
    collectedCoins: Array.from(state.collectedCoins),
    capturedMonsters: Array.from(state.capturedMonsters),
    interactedSpots: Array.from(state.interactedSpots),
  }));
}

/**
 * Check if spawn is collected - now reads from canister-backed PlayerState if provided
 */
export function isSpawnCollected(identity: string, spawnId: string, spawnType: MockSpawn['type'], playerState?: PlayerState): boolean {
  // If canister-backed state is provided, use it as authoritative
  if (playerState) {
    if (spawnType.startsWith('coin')) {
      return playerState.coinLocks.some(c => c.id === spawnId && c.locked);
    } else if (spawnType.startsWith('monster')) {
      return playerState.monsters.some(m => m.id === spawnId && m.captured);
    }
  }
  
  // Fallback to localStorage for legacy compatibility
  const state = loadState(identity);
  
  if (spawnType.startsWith('coin')) {
    return state.collectedCoins.has(spawnId);
  } else if (spawnType.startsWith('monster')) {
    return state.capturedMonsters.has(spawnId);
  }
  
  return state.interactedSpots.has(spawnId);
}

export function markSpawnCollected(identity: string, spawnId: string, spawnType: MockSpawn['type']): void {
  const state = loadState(identity);
  
  if (spawnType.startsWith('coin')) {
    state.collectedCoins.add(spawnId);
  } else if (spawnType.startsWith('monster')) {
    state.capturedMonsters.add(spawnId);
  } else {
    state.interactedSpots.add(spawnId);
  }
  
  saveState(identity, state);
}

export function getCapturedMonsters(identity: string, playerState?: PlayerState): Set<string> {
  // If canister-backed state is provided, use it as authoritative
  if (playerState) {
    return new Set(playerState.monsters.filter(m => m.captured).map(m => m.id));
  }
  
  // Fallback to localStorage
  const state = loadState(identity);
  return state.capturedMonsters;
}

export function getCollectedCoins(identity: string): Set<string> {
  const state = loadState(identity);
  return state.collectedCoins;
}

export function clearGameplayState(identity: string): void {
  const key = getStorageKey(identity);
  localStorage.removeItem(key);
}

export function canInteractWithSpawn(
  identity: string,
  spawn: MockSpawn,
  playerLat: number,
  playerLng: number,
  maxDistanceMeters: number = 10,
  playerState?: PlayerState
): { canInteract: boolean; reason?: string; distance: number } {
  // Check if already collected using canister state if available
  if (isSpawnCollected(identity, spawn.id, spawn.type, playerState)) {
    return {
      canInteract: false,
      reason: 'Already collected',
      distance: 0,
    };
  }
  
  // Calculate distance
  const distance = calculateDistance(playerLat, playerLng, spawn.latitude, spawn.longitude);
  
  // Check proximity (10m rule)
  if (distance > maxDistanceMeters) {
    return {
      canInteract: false,
      reason: `Too far (${distance.toFixed(1)}m away, need ≤${maxDistanceMeters}m)`,
      distance,
    };
  }
  
  return {
    canInteract: true,
    distance,
  };
}

// Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
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
