// Non-authoritative localStorage cache/mirror for AR interaction states.
// The canister-backed PlayerState is the source of truth.

const STORAGE_KEY = 'qmy_ar_interactions_v2';

interface ARInteractionsState {
  lockedCoins: Record<string, boolean>;
  capturedMonsters: Record<string, boolean>;
}

function loadState(): ARInteractionsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { lockedCoins: {}, capturedMonsters: {} };
}

function saveState(state: ARInteractionsState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Emit storage event for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
  } catch {
    // ignore
  }
}

export const arInteractionsStore = {
  getState(): ARInteractionsState {
    return loadState();
  },

  setLocked(coinId: string, locked: boolean) {
    const state = loadState();
    state.lockedCoins[coinId] = locked;
    saveState(state);
  },

  setCaptured(monsterId: string, captured: boolean) {
    const state = loadState();
    state.capturedMonsters[monsterId] = captured;
    saveState(state);
  },

  isCoinLocked(coinId: string): boolean {
    return loadState().lockedCoins[coinId] === true;
  },

  isMonsterCaptured(monsterId: string): boolean {
    return loadState().capturedMonsters[monsterId] === true;
  },

  syncFromPlayerState(playerState: {
    coinLocks: Array<{ id: string; locked: boolean }>;
    monsters: Array<{ id: string; captured: boolean }>;
  }) {
    const state: ARInteractionsState = { lockedCoins: {}, capturedMonsters: {} };
    for (const coin of playerState.coinLocks) {
      state.lockedCoins[coin.id] = coin.locked;
    }
    for (const monster of playerState.monsters) {
      state.capturedMonsters[monster.id] = monster.captured;
    }
    saveState(state);
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
