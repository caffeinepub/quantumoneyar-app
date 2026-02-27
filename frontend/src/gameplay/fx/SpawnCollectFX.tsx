import React, { useEffect, useState } from 'react';

interface SpawnCollectFXProps {
  type: 'coin-lock' | 'monster-capture' | 'levelup';
  onComplete?: () => void;
}

export function SpawnCollectFX({ type, onComplete }: SpawnCollectFXProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  const config = {
    'coin-lock': {
      emoji: '🔒',
      text: '+10 XP',
      color: 'text-yellow-400',
      bg: 'bg-yellow-900/60',
      border: 'border-yellow-500/40',
    },
    'monster-capture': {
      emoji: '⚡',
      text: '+20 XP',
      color: 'text-purple-400',
      bg: 'bg-purple-900/60',
      border: 'border-purple-500/40',
    },
    'levelup': {
      emoji: '🌟',
      text: 'LEVEL UP!',
      color: 'text-gold',
      bg: 'bg-gold/20',
      border: 'border-gold/40',
    },
  }[type];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div
        className={`flex flex-col items-center gap-2 px-8 py-6 rounded-2xl border ${config.bg} ${config.border} animate-bounce`}
        style={{ animation: 'fadeInOut 1.5s ease-in-out forwards' }}
      >
        <span className="text-5xl">{config.emoji}</span>
        <span className={`text-2xl font-bold ${config.color}`}>{config.text}</span>
      </div>
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          20% { opacity: 1; transform: scale(1.1) translateY(0); }
          70% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.9) translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
