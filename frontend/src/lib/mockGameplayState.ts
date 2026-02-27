/**
 * CLIENT-SIDE FALLBACK CACHE ONLY.
 * The canister PlayerState is the source of truth.
 * This module is used only as a fallback when the canister is unreachable.
 * Do NOT write gameplay state here without first calling the canister.
 */

import type { PlayerState } from '../backend';

const STORAGE_KEY = 'qmy_gameplay_state_cache';

interface LocalGameplayState {
  xp: number;
  collectedCoins: string[];
  capturedMonsters: string[];
  lockedCoins: string[];
}

function loadState(): LocalGameplayState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { xp: 0, collectedCoins: [], capturedMonsters: [], lockedCoins: [] };
    return JSON.parse(raw);
  } catch {
    return { xp: 0, collectedCoins: [], capturedMonsters: [], lockedCoins: [] };
  }
}

function saveState(state: LocalGameplayState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore
  }
}

let cachedState: LocalGameplayState = loadState();

export const mockGameplayState = {
  getState(): LocalGameplayState {
    return cachedState;
  },

  /**
   * Sync the local cache with the authoritative canister PlayerState.
   * Always call this after receiving a fresh PlayerState from the canister.
   */
  syncFromCanister(playerState: PlayerState) {
    cachedState = {
      xp: Number(playerState.xp),
      collectedCoins: [],
      capturedMonsters: playerState.monsters
        .filter((m) => m.captured)
        .map((m) => m.id),
      lockedCoins: playerState.coinLocks
        .filter((c) => c.locked)
        .map((c) => c.id),
    };
    saveState(cachedState);
  },

  getXP(): number {
    return cachedState.xp;
  },

  isCoinCollected(coinId: string): boolean {
    return cachedState.collectedCoins.includes(coinId);
  },

  isCoinLocked(coinId: string): boolean {
    return cachedState.lockedCoins.includes(coinId);
  },

  isMonsterCaptured(monsterId: string): boolean {
    return cachedState.capturedMonsters.includes(monsterId);
  },
};

/**
 * Legacy function kept for backward compatibility.
 * Use mockGameplayState.isMonsterCaptured() or isCoinLocked() instead.
 */
export function isSpawnCollected(principal: string, spawnId: string, spawnType: string): boolean {
  if (spawnType.startsWith('monster')) {
    return cachedState.capturedMonsters.includes(spawnId);
  }
  return cachedState.lockedCoins.includes(spawnId);
}
