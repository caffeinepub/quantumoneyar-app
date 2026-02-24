export type HistoryEventType = 'coin-collect' | 'creature-capture' | 'level-up' | 'bonus-unlock';

export interface HistoryEvent {
  id: string;
  type: HistoryEventType;
  spotType?: string;
  rarity?: number;
  timestamp: number;
  areaBucketId?: string;
  xpGained?: number;
  qmyGained?: number;
}

export interface ComputedStats {
  totalCoinsCollected: number;
  totalCreaturesCaptured: number;
  totalXpEarned: number;
  totalQmyEarned: number;
  areasVisited: number;
  spotsVisited: number;
  currentLevel: number;
  currentXp: number;
}
