/**
 * Demoted localStorage store to a non-authoritative cache/mirror
 * No rules enforcement, no XP checks, no unlock limits
 * Store only the last known canister state snapshot needed for existing non-React consumers
 */

export interface CoinLockState {
  coinId: string;
  lockedBy: string;
  lockedAt: number;
  isLocked: boolean;
}

export interface UnlockCounter {
  count: number;
  timestamps: number[];
}

interface ArInteractionsState {
  coinLocks: Record<string, CoinLockState>;
  unlockCounters: Record<string, UnlockCounter>;
  currentlyUnlocked: Record<string, string | null>;
}

const STORAGE_KEY = 'quantumoney_ar_interactions';

function loadState(): ArInteractionsState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to default
    }
  }
  return {
    coinLocks: {},
    unlockCounters: {},
    currentlyUnlocked: {},
  };
}

function saveState(state: ArInteractionsState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event('ar-interactions-changed'));
}

export function getCoinLockState(coinId: string): CoinLockState | null {
  const state = loadState();
  return state.coinLocks[coinId] || null;
}

export function isCoinLocked(coinId: string): boolean {
  const lockState = getCoinLockState(coinId);
  return lockState?.isLocked || false;
}

// Mirror functions for non-authoritative cache updates
export function mirrorCoinLock(coinId: string, principal: string): void {
  const state = loadState();
  state.coinLocks[coinId] = {
    coinId,
    lockedBy: principal,
    lockedAt: Date.now(),
    isLocked: true,
  };
  saveState(state);
}

export function mirrorCoinUnlock(coinId: string): void {
  const state = loadState();
  if (state.coinLocks[coinId]) {
    state.coinLocks[coinId].isLocked = false;
  }
  saveState(state);
}

export function subscribeToArInteractions(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener('storage', handler);
  window.addEventListener('ar-interactions-changed', handler);
  
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('ar-interactions-changed', handler);
  };
}
