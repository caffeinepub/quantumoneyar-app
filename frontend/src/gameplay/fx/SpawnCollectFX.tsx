import { useEffect, useState } from 'react';

interface SpawnCollectFXProps {
  type: 'spawn' | 'collect' | 'levelup';
  onComplete?: () => void;
}

export function SpawnCollectFX({ type, onComplete }: SpawnCollectFXProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, type === 'levelup' ? 2000 : 1000);

    return () => clearTimeout(timer);
  }, [type, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {type === 'spawn' && (
        <div className="spawn-fx">
          <img
            src="/assets/generated/fx-particles-gold.dim_512x512.png"
            alt=""
            className="w-64 h-64 animate-fade-in"
          />
        </div>
      )}
      {type === 'collect' && (
        <div className="collect-fx">
          <img
            src="/assets/generated/fx-particles-gold.dim_512x512.png"
            alt=""
            className="w-48 h-48 animate-burst"
          />
        </div>
      )}
      {type === 'levelup' && (
        <div className="levelup-fx">
          <div className="text-6xl font-bold text-[#FFD700] animate-level-up">
            LEVEL UP!
          </div>
          <img
            src="/assets/generated/fx-particles-gold.dim_512x512.png"
            alt=""
            className="w-64 h-64 animate-burst absolute"
          />
        </div>
      )}
    </div>
  );
}
