/**
 * QMY locking system — local cache only.
 * The canister is the source of truth for all lock/unlock operations.
 * This module is kept for legacy compatibility but does not call the canister.
 */

interface LockedCoin {
  amount: number;
  lockedAt: number;
  dueDate: number;
  resolved: boolean;
}

const LOCK_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const STORAGE_KEY_PREFIX = 'quantumoney_locked_coins_';

export function lockQMYCoin(principal: string, amount: number): void {
  const key = `${STORAGE_KEY_PREFIX}${principal}`;
  const stored = localStorage.getItem(key);
  const locks: LockedCoin[] = stored ? JSON.parse(stored) : [];

  const now = Date.now();
  const newLock: LockedCoin = {
    amount,
    lockedAt: now,
    dueDate: now + LOCK_DURATION_MS,
    resolved: false,
  };

  locks.push(newLock);
  localStorage.setItem(key, JSON.stringify(locks));
}

export function resolveMaturedLocks(principal: string): void {
  const key = `${STORAGE_KEY_PREFIX}${principal}`;
  const stored = localStorage.getItem(key);
  if (!stored) return;

  const locks: LockedCoin[] = JSON.parse(stored);
  const now = Date.now();

  const updatedLocks = locks.map(lock => {
    if (!lock.resolved && now >= lock.dueDate) {
      return { ...lock, resolved: true };
    }
    return lock;
  });

  localStorage.setItem(key, JSON.stringify(updatedLocks));
}

export function getLockedCoins(principal: string): LockedCoin[] {
  const key = `${STORAGE_KEY_PREFIX}${principal}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}
