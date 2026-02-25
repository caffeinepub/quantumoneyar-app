import React from 'react';
import { calculateBearing, normalizeAngleDifference, projectToScreen } from './arMath';
import { getSpriteForObject } from './sprites';
import { useArInteractions } from '../../../hooks/useArInteractions';
import type { MockSpawn } from '../../../lib/mockSpawns';

interface Position {
  latitude: number;
  longitude: number;
}

interface OverlayLayerProps {
  visibleObjects: MockSpawn[];
  heading: number;
  position: Position;
}

export default function OverlayLayer({ visibleObjects, heading, position }: OverlayLayerProps) {
  const { isCoinLocked, isMonsterCaptured } = useArInteractions();

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30 }}>
      {visibleObjects.map((obj) => {
        // Calculate bearing from player to object
        const bearing = calculateBearing(
          position.latitude,
          position.longitude,
          obj.latitude,
          obj.longitude
        );

        // Project to screen using existing arMath signature: (bearing, userHeading)
        const pos = projectToScreen(bearing, heading);

        if (!pos.visible) return null;

        // pos.x is 0..1, convert to percentage
        const xPercent = pos.x * 100;

        const isMonsterType =
          obj.type === 'monster-common' ||
          obj.type === 'monster-rare' ||
          obj.type === 'monster-legendary';

        const locked = !isMonsterType && isCoinLocked(obj.id);
        const captured = isMonsterType && isMonsterCaptured(obj.id);

        const sprite = getSpriteForObject(obj);

        return (
          <div
            key={obj.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${xPercent}%`,
              top: '40%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="relative"
              style={{
                filter: locked
                  ? 'drop-shadow(0 0 8px #FFD700) brightness(1.3)'
                  : captured
                  ? 'drop-shadow(0 0 8px #B400FF) brightness(0.6) grayscale(0.5)'
                  : 'drop-shadow(0 0 6px rgba(255,215,0,0.6))',
                opacity: captured ? 0.5 : 1,
              }}
            >
              <img
                src={sprite}
                alt={obj.type}
                className="w-16 h-16 object-contain"
                draggable={false}
              />
              {locked && (
                <div
                  className="absolute -top-2 -right-2 text-xs font-bold px-1 rounded"
                  style={{ background: '#FFD700', color: '#000' }}
                >
                  🔒
                </div>
              )}
              {captured && (
                <div
                  className="absolute -top-2 -right-2 text-xs font-bold px-1 rounded"
                  style={{ background: '#B400FF', color: '#fff' }}
                >
                  ✓
                </div>
              )}
            </div>
            <span
              className="text-xs font-bold mt-1 px-2 py-0.5 rounded"
              style={{
                background: 'rgba(0,0,0,0.6)',
                color: locked ? '#FFD700' : captured ? '#E0A0FF' : '#fff',
                border: `1px solid ${locked ? '#FFD700' : captured ? '#B400FF' : 'rgba(255,255,255,0.3)'}`,
              }}
            >
              {isMonsterType ? obj.name : locked ? 'Locked' : 'QMY'}
            </span>
          </div>
        );
      })}
    </div>
  );
}
