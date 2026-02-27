// Non-authoritative localStorage cache for AR coin lock and monster capture states.
// Synced from canister PlayerState on every fetch.

const STORAGE_KEY = 'arInteractionsStore';

interface ArInteractionsState {
  lockedCoins: string[];
  capturedMonsters: string[];
}

function load(): ArInteractionsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        lockedCoins: Array.isArray(parsed.lockedCoins) ? parsed.lockedCoins : [],
        capturedMonsters: Array.isArray(parsed.capturedMonsters) ? parsed.capturedMonsters : [],
      };
    }
  } catch {}
  return { lockedCoins: [], capturedMonsters: [] };
}

function save(state: ArInteractionsState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Emit storage event for cross-component sync
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
  } catch {}
}

export const arInteractionsStore = {
  getAll(): { lockedCoins: Set<string>; capturedMonsters: Set<string> } {
    const state = load();
    return {
      lockedCoins: new Set(state.lockedCoins),
      capturedMonsters: new Set(state.capturedMonsters),
    };
  },

  isCoinLocked(id: string): boolean {
    return load().lockedCoins.includes(id);
  },

  isMonsterCaptured(id: string): boolean {
    return load().capturedMonsters.includes(id);
  },

  lockCoin(id: string) {
    const state = load();
    if (!state.lockedCoins.includes(id)) {
      state.lockedCoins.push(id);
      save(state);
    }
  },

  unlockCoin(id: string) {
    const state = load();
    state.lockedCoins = state.lockedCoins.filter((c) => c !== id);
    save(state);
  },

  captureMonster(id: string) {
    const state = load();
    if (!state.capturedMonsters.includes(id)) {
      state.capturedMonsters.push(id);
      save(state);
    }
  },

  syncFromIds(lockedCoinIds: string[], capturedMonsterIds: string[]) {
    save({
      lockedCoins: lockedCoinIds,
      capturedMonsters: capturedMonsterIds,
    });
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
