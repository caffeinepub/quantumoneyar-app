/**
 * VISUAL FALLBACK ONLY — NOT THE SOURCE OF TRUTH.
 * This module is used only as a visual fallback when the canister is unavailable.
 * All real balances, XP, and history come from the canister via actor.getPlayerState()
 * and actor.getClaimBonus(). Do NOT treat qmyApi as authoritative.
 * The welcome bonus is delivered by the canister claimBonus() method, not here.
 */

export interface QmySyncData {
  balance: number;
  lockedBalance: number;
  xp: number;
  history: QmyHistoryEntry[];
}

export interface QmyHistoryEntry {
  type: string;
  amount: number;
  timestamp: number;
  description: string;
}

export interface QmySendRequest {
  fromPrincipal: string;
  toLoginId: string;
  amount: number;
}

export interface QmyReceiveRequest {
  principal: string;
  amount: number;
}

export interface QmyTransferResponse {
  success: boolean;
  message: string;
  newBalance?: number;
}

const STORAGE_KEY = 'qmy_api_cache';

interface QmyApiCache {
  balance: number;
  lockedBalance: number;
  xp: number;
  history: QmyHistoryEntry[];
}

function loadCache(): QmyApiCache {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { balance: 0, lockedBalance: 0, xp: 0, history: [] };
    return JSON.parse(raw);
  } catch {
    return { balance: 0, lockedBalance: 0, xp: 0, history: [] };
  }
}

let cache: QmyApiCache = loadCache();

export const qmyApi = {
  getBalance(): number {
    return cache.balance;
  },

  getLockedBalance(): number {
    return cache.lockedBalance;
  },

  getXP(): number {
    return cache.xp;
  },

  getBonusHistory(): QmyHistoryEntry[] {
    return cache.history;
  },

  /** Update the visual cache from canister data. Call after every canister fetch. */
  syncFromCanister(data: { balance: number; lockedBalance: number; xp: number }) {
    cache = { ...cache, ...data };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    } catch {
      // Ignore
    }
  },
};

/**
 * Fallback fetch — returns cached data only. Not authoritative.
 */
export async function fetchQmySync(_principal: string): Promise<QmySyncData> {
  return {
    balance: cache.balance,
    lockedBalance: cache.lockedBalance,
    xp: cache.xp,
    history: cache.history,
  };
}

/**
 * UI-only send — not a real transfer. Visual only.
 */
export async function sendQmy(request: QmySendRequest): Promise<QmyTransferResponse> {
  return {
    success: false,
    message: 'Transfers are processed on-chain. Please use the main Quantumoney.app.',
  };
}

/**
 * UI-only receive — not a real transfer. Visual only.
 */
export async function receiveQmy(request: QmyReceiveRequest): Promise<QmyTransferResponse> {
  return {
    success: false,
    message: 'Transfers are processed on-chain. Please use the main Quantumoney.app.',
  };
}
