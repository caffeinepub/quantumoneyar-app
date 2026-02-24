import { updateMockedBalances, updateMockedXP } from './qmyApi';

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
  let totalReward = 0;
  let totalXPPenalty = 0;

  const updatedLocks = locks.map(lock => {
    if (!lock.resolved && now >= lock.dueDate) {
      // Lock matured: +2 QMY per coin, -30 XP
      totalReward += lock.amount * 2;
      totalXPPenalty += 30;
      return { ...lock, resolved: true };
    }
    return lock;
  });

  if (totalReward > 0) {
    // Update balances
    const currentBalances = JSON.parse(localStorage.getItem(`quantumoney_balances_${principal}`) || '{"unlocked":0,"locked":0}');
    const currentXP = JSON.parse(localStorage.getItem(`quantumoney_xp_${principal}`) || '0');
    
    updateMockedBalances(principal, currentBalances.unlocked + totalReward, currentBalances.locked);
    updateMockedXP(principal, Math.max(0, currentXP - totalXPPenalty));
  }

  localStorage.setItem(key, JSON.stringify(updatedLocks));
}

export function getLockedCoins(principal: string): LockedCoin[] {
  const key = `${STORAGE_KEY_PREFIX}${principal}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}
