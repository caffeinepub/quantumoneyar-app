const TOTAL_BONUS = 1000;
const INITIAL_UNLOCKED = 100;
const MONTHLY_UNLOCK = 100;
const UNLOCK_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
const TOTAL_UNLOCKS = 9;

export interface MonthlyUnlock {
  month: number;
  amount: number;
  date: Date;
  unlocked: boolean;
}

export interface BonusSchedule {
  totalBonus: number;
  unlocked: number;
  locked: number;
  nextUnlockDate: Date | null;
  monthlyUnlocks: MonthlyUnlock[];
  progressPercent: number;
}

export function calculateBonusSchedule(registrationTimestampNs: bigint): BonusSchedule {
  // Convert nanoseconds to milliseconds using BigInt arithmetic (no precision loss)
  const registrationMs = Number(registrationTimestampNs / 1_000_000n);
  const registrationDate = new Date(registrationMs);
  const now = Date.now();
  
  // Calculate elapsed time
  const elapsedMs = now - registrationMs;
  const unlocksCompleted = Math.min(Math.floor(elapsedMs / UNLOCK_INTERVAL_MS), TOTAL_UNLOCKS);
  
  const unlocked = INITIAL_UNLOCKED + (unlocksCompleted * MONTHLY_UNLOCK);
  const locked = Math.max(0, TOTAL_BONUS - unlocked);
  
  // Calculate next unlock date
  let nextUnlockDate: Date | null = null;
  if (unlocksCompleted < TOTAL_UNLOCKS) {
    const nextUnlockMs = registrationMs + ((unlocksCompleted + 1) * UNLOCK_INTERVAL_MS);
    nextUnlockDate = new Date(nextUnlockMs);
  }
  
  // Build monthly unlock series with explicit type
  const monthlyUnlocks: MonthlyUnlock[] = [];
  for (let i = 0; i < TOTAL_UNLOCKS; i++) {
    const unlockMs = registrationMs + ((i + 1) * UNLOCK_INTERVAL_MS);
    monthlyUnlocks.push({
      month: i + 1,
      amount: MONTHLY_UNLOCK,
      date: new Date(unlockMs),
      unlocked: i < unlocksCompleted,
    });
  }
  
  const progressPercent = (unlocked / TOTAL_BONUS) * 100;
  
  return {
    totalBonus: TOTAL_BONUS,
    unlocked,
    locked,
    nextUnlockDate,
    monthlyUnlocks,
    progressPercent,
  };
}
