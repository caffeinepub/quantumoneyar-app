export interface LevelInfo {
  level: number;
  xpRequired: number;
  xpForNext: number;
}

export function calculateLevel(xp: number): LevelInfo {
  const level = Math.floor(xp / 100) + 1;
  const xpRequired = (level - 1) * 100;
  const xpForNext = level * 100;
  
  return {
    level,
    xpRequired,
    xpForNext,
  };
}

export function detectLevelUp(oldXp: number, newXp: number): boolean {
  const oldLevel = calculateLevel(oldXp).level;
  const newLevel = calculateLevel(newXp).level;
  return newLevel > oldLevel;
}

export function getXpProgress(xp: number): number {
  const levelInfo = calculateLevel(xp);
  const xpInCurrentLevel = xp - levelInfo.xpRequired;
  const xpNeededForLevel = levelInfo.xpForNext - levelInfo.xpRequired;
  return (xpInCurrentLevel / xpNeededForLevel) * 100;
}

/**
 * Derives a conceptual rank label from XP/level (client-only)
 */
export function getRankFromXp(xp: number): string {
  if (xp < 100) return 'Novice';
  if (xp < 500) return 'Explorer';
  if (xp < 1000) return 'Adventurer';
  if (xp < 2500) return 'Veteran';
  if (xp < 5000) return 'Master';
  return 'Legend';
}
