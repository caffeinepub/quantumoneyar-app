import React from 'react';
import { calculateBearing, normalizeAngleDifference, projectToScreen } from './arMath';
import { getSpriteForObject } from './sprites';
import type { MockSpawn } from '@/lib/mockSpawns';

interface OverlayLayerProps {
  visibleObjects: MockSpawn[];
  userHeading: number;
  isCoinLocked: (coinId: string) => boolean;
}

export function OverlayLayer({
  visibleObjects,
  userHeading,
  isCoinLocked,
}: OverlayLayerProps) {
  const screenWidth = window.innerWidth;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {visibleObjects.map((obj) => {
        // Use a fixed reference point for bearing (center of screen)
        // projectToScreen returns { x: number (0-1), visible: boolean }
        const bearing = calculateBearing(0, 0, obj.latitude, obj.longitude);
        const pos = projectToScreen(bearing, userHeading);

        if (!pos.visible) return null;

        const sprite = getSpriteForObject(obj);
        const isCoin = obj.type === 'coin-unlocked' || obj.type === 'coin-locked';
        const isLocked = isCoin && isCoinLocked(obj.id);
        const screenX = pos.x * screenWidth;
        const screenY = window.innerHeight * 0.45; // Fixed vertical center

        return (
          <div
            key={obj.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: screenX, top: screenY }}
          >
            <div className="relative flex flex-col items-center">
              {/* Sprite image */}
              <img
                src={sprite}
                alt={obj.name}
                className={`w-12 h-12 drop-shadow-lg ${
                  isLocked
                    ? 'filter brightness-75 saturate-50'
                    : 'animate-pulse'
                }`}
              />
              {/* Lock indicator */}
              {isLocked && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs">🔒</span>
                </div>
              )}
              {/* Label */}
              <span className="mt-1 text-xs text-white bg-black/60 rounded px-1 py-0.5 whitespace-nowrap">
                {isLocked ? '🔒 Locked' : obj.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
