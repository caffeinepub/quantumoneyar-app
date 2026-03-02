import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetClaimBonus, useClaimWelcomeBonus } from '../../hooks/useQueries';
import { WelcomeBonusModal } from '../WelcomeBonusModal';
import WelcomeBackModal from '../WelcomeBackModal';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Section } from '../../App';

interface HUDProps {
  onNavigate: (section: Section) => void;
}

function SmallCoin() {
  const meshRef = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  useFrame((_, delta) => {
    t.current += delta;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.5;
      meshRef.current.position.y = Math.sin(t.current * 2) * 0.1;
    }
  });
  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.9, 0.9, 0.18, 48]} />
      <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.08} />
    </mesh>
  );
}

export default function HUD({ onNavigate }: HUDProps) {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const { data: bonus, isFetched: bonusFetched } = useGetClaimBonus();
  const claimWelcomeBonus = useClaimWelcomeBonus();

  const [showBonusModal, setShowBonusModal] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [bonusTriggered, setBonusTriggered] = useState(false);

  useEffect(() => {
    if (!identity || !bonusFetched || bonusTriggered) return;
    setBonusTriggered(true);

    if (bonus) {
      // Already registered — show welcome back
      setShowWelcomeBack(true);
    } else {
      // New user — claim bonus then show modal
      claimWelcomeBonus.mutate(undefined, {
        onSuccess: () => setShowBonusModal(true),
        onError: () => setShowBonusModal(true),
      });
    }
  }, [identity, bonusFetched, bonus, bonusTriggered, claimWelcomeBonus]);

  const navItems: { label: string; section: Section; emoji: string }[] = [
    { label: t('arCamera') || 'AR Camera', section: 'ar-camera', emoji: '📷' },
    { label: t('map') || 'Map', section: 'map', emoji: '🗺️' },
    { label: t('profile') || 'Profile', section: 'profile', emoji: '👤' },
    { label: t('rules') || 'Rules', section: 'rules-tutorial', emoji: '📖' },
    { label: t('dao') || 'DAO', section: 'dao', emoji: '🏛️' },
  ];

  return (
    <div className="relative flex min-h-[85vh] flex-col items-center bg-black px-4 py-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/assets/generated/animated-universe-background.dim_1920x1080.gif"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* 3D Coin */}
        <div style={{ width: 160, height: 160, pointerEvents: 'none' }} className="mb-2">
          <Canvas
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            style={{ background: 'transparent' }}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[3, 3, 3]} intensity={2.5} color="#FFD700" />
            <pointLight position={[-2, -2, 2]} intensity={1} color="#FFA500" />
            <SmallCoin />
          </Canvas>
        </div>

        <h2 className="mb-1 font-display text-2xl font-bold text-gold">
          QUANTUMONEY AR
        </h2>
        <p className="mb-6 text-xs text-gold/60">
          {t('hudSubtitle') || 'Your QMY Game Hub'}
        </p>

        {/* Balance display */}
        {bonus && (
          <div className="mb-6 grid w-full grid-cols-2 gap-3">
            <div className="rounded-xl border border-gold/20 bg-gold/5 p-3 text-center">
              <p className="text-xs text-gold/50">{t('unlockedQMY') || 'Unlocked QMY'}</p>
              <p className="font-display text-lg font-bold text-gold">
                {bonus.unlocked.toFixed(0)}
              </p>
            </div>
            <div className="rounded-xl border border-gold/20 bg-gold/5 p-3 text-center">
              <p className="text-xs text-gold/50">{t('lockedQMY') || 'Locked QMY'}</p>
              <p className="font-display text-lg font-bold text-amber-400">
                {bonus.locked.toFixed(0)}
              </p>
            </div>
          </div>
        )}

        {/* Navigation grid */}
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
          {navItems.map(({ label, section, emoji }) => (
            <button
              key={section}
              onClick={() => onNavigate(section)}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-gold/20 bg-gold/5 p-4 transition-all hover:border-gold/50 hover:bg-gold/10 active:scale-95"
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-center text-xs font-medium text-gold/80">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showBonusModal && (
        <WelcomeBonusModal onClose={() => setShowBonusModal(false)} />
      )}
      {showWelcomeBack && (
        <WelcomeBackModal onClose={() => setShowWelcomeBack(false)} />
      )}
    </div>
  );
}
