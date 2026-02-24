/**
 * Quantumoney.app API client for frontend sync
 * MOCKED VERSION for frontend-only testing
 * Provides deterministic QMY balances, XP, and bonus history
 * XP mutation paths disabled - XP now comes from canister-backed state
 */

export interface QmyBalance {
  unlocked: number;
  locked: number;
  total: number;
}

export interface QmyBonusHistory {
  timestamp: number;
  amount: number;
  type: 'registration' | 'unlock' | 'reward';
  description: string;
}

export interface QmySyncData {
  balances: QmyBalance;
  xp: number;
  bonusHistory: QmyBonusHistory[];
  lastSync: number;
  available: boolean;
}

export interface QmySendRequest {
  toLoginId: string;
  amount: number;
}

export interface QmyReceiveRequest {
  fromLoginId: string;
}

export interface QmyTransferResponse {
  success: boolean;
  message: string;
  txId?: string;
}

const STORAGE_KEY_PREFIX = 'quantumoney_qmy_sync_';
const BONUS_AWARDED_KEY = 'quantumoney_bonus_awarded_';

interface StoredSyncData {
  balances: QmyBalance;
  xp: number;
  bonusHistory: QmyBonusHistory[];
  bonusAwarded: boolean;
}

function getStorageKey(principal: string): string {
  return `${STORAGE_KEY_PREFIX}${principal}`;
}

function getBonusAwardedKey(principal: string): string {
  return `${BONUS_AWARDED_KEY}${principal}`;
}

function loadStoredData(principal: string): StoredSyncData | null {
  const key = getStorageKey(principal);
  const stored = localStorage.getItem(key);
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  
  return null;
}

function saveStoredData(principal: string, data: StoredSyncData): void {
  const key = getStorageKey(principal);
  localStorage.setItem(key, JSON.stringify(data));
}

function hasBonusBeenAwarded(principal: string): boolean {
  const key = getBonusAwardedKey(principal);
  return localStorage.getItem(key) === 'true';
}

function markBonusAwarded(principal: string): void {
  const key = getBonusAwardedKey(principal);
  localStorage.setItem(key, 'true');
}

/**
 * Fetch synced balances, XP, and bonus history
 * MOCKED: Returns deterministic data with one-time registration bonus
 * XP is now visual-only and not used for gameplay
 */
export async function fetchQmySync(principal: string): Promise<QmySyncData> {
  try {
    const bonusAlreadyAwarded = hasBonusBeenAwarded(principal);
    let stored = loadStoredData(principal);
    
    if (!stored && !bonusAlreadyAwarded) {
      const now = Date.now();
      stored = {
        balances: {
          unlocked: 100,
          locked: 900,
          total: 1000,
        },
        xp: 0, // XP starts at 0, managed by canister
        bonusHistory: [
          {
            timestamp: now,
            amount: 1000,
            type: 'registration',
            description: 'Registration bonus: 100 unlocked + 900 locked QMY',
          },
        ],
        bonusAwarded: true,
      };
      
      saveStoredData(principal, stored);
      markBonusAwarded(principal);
    } else if (!stored) {
      stored = {
        balances: {
          unlocked: 100,
          locked: 900,
          total: 1000,
        },
        xp: 0,
        bonusHistory: [
          {
            timestamp: Date.now() - 86400000,
            amount: 1000,
            type: 'registration',
            description: 'Registration bonus: 100 unlocked + 900 locked QMY',
          },
        ],
        bonusAwarded: true,
      };
      saveStoredData(principal, stored);
    }
    
    return {
      balances: stored.balances,
      xp: stored.xp,
      bonusHistory: stored.bonusHistory,
      lastSync: Date.now(),
      available: true,
    };
  } catch (error) {
    console.error('QMY sync error:', error);
    
    return {
      balances: {
        unlocked: 0,
        locked: 0,
        total: 0,
      },
      xp: 0,
      bonusHistory: [],
      lastSync: Date.now(),
      available: false,
    };
  }
}

/**
 * Update balances (for testing/simulation)
 */
export function updateMockedBalances(principal: string, unlocked: number, locked: number): void {
  const stored = loadStoredData(principal);
  if (stored) {
    stored.balances = {
      unlocked,
      locked,
      total: unlocked + locked,
    };
    saveStoredData(principal, stored);
  }
}

/**
 * XP mutation disabled - XP is now managed by canister
 * This function is kept for compatibility but does nothing
 */
export function updateMockedXP(principal: string, xp: number): void {
  // Disabled: XP is now managed by canister
  console.warn('updateMockedXP is disabled - XP is managed by canister');
}

/**
 * UI-only send request (no real token movement)
 */
export async function sendQmy(request: QmySendRequest): Promise<QmyTransferResponse> {
  try {
    return {
      success: true,
      message: 'Send request submitted (UI-only, pending live token)',
      txId: `ui-${Date.now()}`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Send request failed',
    };
  }
}

/**
 * UI-only receive request (no real token movement)
 */
export async function receiveQmy(request: QmyReceiveRequest): Promise<QmyTransferResponse> {
  try {
    return {
      success: true,
      message: 'Receive request submitted (UI-only, pending live token)',
      txId: `ui-${Date.now()}`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Receive request failed',
    };
  }
}
