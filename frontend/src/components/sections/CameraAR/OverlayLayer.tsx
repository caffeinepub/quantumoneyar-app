import React from 'react';
import { SpawnItem } from '../../../backend';
import { getSpriteForType } from './sprites';
import { calculateBearing, projectToScreen } from './arMath';
import { calculateDistance } from '../../../lib/haversine';

interface Position {
  latitude: number;
  longitude: number;
}

interface OverlayLayerProps {
  spawns: SpawnItem[];
  position: Position;
  heading: number;
  isCoinLocked: (id: string) => boolean;
  isMonsterCaptured: (id: string) => boolean;
}

export function OverlayLayer({
  spawns,
  position,
  heading,
  isCoinLocked,
  isMonsterCaptured,
}: OverlayLayerProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {spawns.map((spawn) => {
        const bearing = calculateBearing(
          position.latitude,
          position.longitude,
          spawn.latitude,
          spawn.longitude
        );
        const { x, y, visible } = projectToScreen(bearing, heading);

        if (!visible) return null;

        const dist = calculateDistance(
          position.latitude,
          position.longitude,
          spawn.latitude,
          spawn.longitude
        );

        const isCoin = spawn.spawnType === 'coin';
        const isMonster = spawn.spawnType === 'monster';
        const locked = isCoin && isCoinLocked(spawn.id);
        const captured = isMonster && isMonsterCaptured(spawn.id);

        // Determine sprite type
        let spriteType: string;
        if (isCoin) {
          spriteType = locked ? 'coin-locked' : 'coin-unlocked';
        } else if (isMonster) {
          const attrs = spawn.attributes || '';
          if (attrs.includes('level:5') || attrs.includes('legendary')) {
            spriteType = 'monster-legendary';
          } else if (attrs.includes('level:3') || attrs.includes('rare')) {
            spriteType = 'monster-rare';
          } else {
            spriteType = 'monster-common';
          }
        } else {
          spriteType = 'coin-unlocked';
        }

        const sprite = getSpriteForType(spriteType);
        const size = Math.max(40, 80 - dist / 3);

        return (
          <div
            key={spawn.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="flex flex-col items-center gap-1">
              <img
                src={sprite}
                alt={spawn.itemType}
                style={{ width: size, height: size }}
                className={`object-contain drop-shadow-lg ${
                  captured ? 'opacity-40 grayscale' : ''
                } ${locked ? 'opacity-80' : ''}`}
              />
              <div className="bg-black/60 rounded-full px-2 py-0.5 text-center">
                <div className="text-xs font-bold text-white leading-tight">
                  {spawn.itemType.replace('Quantumon_', '').replace('QMY_', 'QMY ')}
                </div>
                <div className="text-xs text-gold/80">{Math.round(dist)}m</div>
                {locked && <div className="text-xs text-yellow-400">🔒</div>}
                {captured && <div className="text-xs text-green-400">✓</div>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
