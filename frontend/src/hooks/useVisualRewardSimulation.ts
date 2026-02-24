import { useEffect, useState } from 'react';
import { useInternetIdentity } from './useInternetIdentity';

interface VisualRewardSimulation {
  total: number;
  unlocked: number;
  locked: number;
  monthlyUnlock: number;
  nextUnlockDate: Date;
  daysUntilNextUnlock: number;
  progressPercent: number;
}

const TOTAL_REWARD = 1000;
const INITIAL_UNLOCKED = 100;
const INITIAL_LOCKED = 900;
const MONTHLY_UNLOCK = 100;
const UNLOCK_INTERVAL_DAYS = 30;
const TOTAL_UNLOCKS = 9;

export function useVisualRewardSimulation(): VisualRewardSimulation | null {
  const { identity } = useInternetIdentity();
  const [simulation, setSimulation] = useState<VisualRewardSimulation | null>(null);

  useEffect(() => {
    if (!identity) {
      setSimulation(null);
      return;
    }

    const principal = identity.getPrincipal().toString();
    const storageKey = `visual-reward-${principal}`;
    
    // Get or create registration timestamp
    let registrationTimestamp = localStorage.getItem(storageKey);
    if (!registrationTimestamp) {
      registrationTimestamp = Date.now().toString();
      localStorage.setItem(storageKey, registrationTimestamp);
    }

    const registrationDate = new Date(parseInt(registrationTimestamp));
    const now = new Date();
    const daysSinceRegistration = Math.floor((now.getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate how many unlocks have occurred
    const unlocksCompleted = Math.min(Math.floor(daysSinceRegistration / UNLOCK_INTERVAL_DAYS), TOTAL_UNLOCKS);
    
    const unlocked = INITIAL_UNLOCKED + (unlocksCompleted * MONTHLY_UNLOCK);
    const locked = Math.max(0, INITIAL_LOCKED - (unlocksCompleted * MONTHLY_UNLOCK));
    
    // Calculate next unlock date
    const nextUnlockNumber = unlocksCompleted + 1;
    const nextUnlockDate = new Date(registrationDate.getTime() + (nextUnlockNumber * UNLOCK_INTERVAL_DAYS * 24 * 60 * 60 * 1000));
    const daysUntilNextUnlock = Math.max(0, Math.ceil((nextUnlockDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    
    const progressPercent = (unlocked / TOTAL_REWARD) * 100;

    setSimulation({
      total: TOTAL_REWARD,
      unlocked,
      locked,
      monthlyUnlock: MONTHLY_UNLOCK,
      nextUnlockDate,
      daysUntilNextUnlock,
      progressPercent,
    });
  }, [identity]);

  return simulation;
}
