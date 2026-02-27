import React, { useEffect, useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGameState } from '../../contexts/GameStateContext';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { WelcomeBonusModal } from '../WelcomeBonusModal';
import HomeSpaceBackground from './HomeSpaceBackground';
import { Section } from '../../App';
import { ExternalLink, Lock, Unlock, Star, Zap, Map, Camera, User } from 'lucide-react';

interface HUDProps {
  onNavigate: (section: Section) => void;
}

export default function HUD({ onNavigate }: HUDProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { xp, lockedQMY, unlockedQMY, hasClaimed, triggerWelcomeBonus, isLoading } = useGameState();
  const { data: userProfile } = useGetCallerUserProfile();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [bonusClaimed, setBonusClaimed] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Trigger welcome bonus on first login
  useEffect(() => {
    if (isAuthenticated && !hasClaimed && !isLoading && !bonusClaimed) {
      setBonusClaimed(true);
      triggerWelcomeBonus().then(() => {
        setShowWelcomeModal(true);
      }).catch(() => {});
    }
  }, [isAuthenticated, hasClaimed, isLoading, bonusClaimed, triggerWelcomeBonus]);

  const displayName = userProfile?.name || identity?.getPrincipal().toString().slice(0, 8) + '...';

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden" style={{ minHeight: '100dvh' }}>
      {/* Space background */}
      <HomeSpaceBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto pb-20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
              alt="Quantumoney"
              className="w-8 h-8 object-contain"
            />
            <span className="text-gold font-bold text-lg tracking-wide font-display">
              Quantumoney AR
            </span>
          </div>
          <a
            href="https://quantumoney.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gold/70 hover:text-gold transition-colors border border-gold/30 rounded-full px-3 py-1"
          >
            <ExternalLink className="w-3 h-3" />
            Quantumoney.app
          </a>
        </div>

        {!isAuthenticated ? (
          /* Login screen */
          <div className="flex flex-col items-center justify-center flex-1 px-6 py-8">
            {/* QMY Coin display */}
            <div className="relative mb-8">
              <img
                src="/assets/generated/qmy-coin-3d.dim_256x256.png"
                alt="QMY Coin"
                className="w-40 h-40 object-contain drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 24px rgba(212,175,55,0.6))' }}
              />
            </div>

            <h1 className="text-3xl font-bold text-gold font-display text-center mb-2">
              Quantumoney AR
            </h1>
            <p className="text-white/60 text-center text-sm mb-8 max-w-xs">
              Explore the world, find QMY coins and monsters in augmented reality. Lock coins to earn vesting rewards.
            </p>

            {/* Welcome bonus info */}
            <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4 mb-8 w-full max-w-sm">
              <div className="text-center mb-3">
                <span className="text-gold font-bold text-sm">🎁 Welcome Bonus</span>
              </div>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">100</div>
                  <div className="text-xs text-white/50">XP Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">100</div>
                  <div className="text-xs text-white/50">QMY Unlocked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">900</div>
                  <div className="text-xs text-white/50">QMY Vesting</div>
                </div>
              </div>
              <p className="text-xs text-white/40 text-center mt-2">
                100 QMY unlocked every 30 days over 9 months
              </p>
            </div>

            <button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full max-w-sm py-4 rounded-2xl font-bold text-black text-lg
                bg-gradient-to-r from-yellow-400 to-amber-500
                shadow-lg shadow-yellow-500/30 active:scale-95 transition-all
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Login to Play'
              )}
            </button>
          </div>
        ) : (
          /* Authenticated home screen */
          <div className="flex flex-col px-4 py-2 gap-4">
            {/* Player greeting */}
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-gold/20">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <User className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{displayName}</div>
                <div className="text-gold/60 text-xs">Level {Math.floor(xp / 100) + 1} Explorer</div>
              </div>
              <div className="ml-auto flex items-center gap-1 bg-gold/10 rounded-full px-3 py-1">
                <Star className="w-3 h-3 text-gold" />
                <span className="text-gold font-bold text-sm">{xp} XP</span>
              </div>
            </div>

            {/* QMY Coin showcase — static, no floating animation */}
            <div className="flex items-center justify-center gap-4 py-2">
              <img
                src="/assets/generated/qmy-coin-3d.dim_256x256.png"
                alt="QMY Coin"
                className="w-20 h-20 object-contain"
                style={{ filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.5))' }}
              />
              <img
                src="/assets/generated/qmy-coin-3d.dim_256x256.png"
                alt="QMY Coin"
                className="w-28 h-28 object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.7))' }}
              />
              <img
                src="/assets/generated/qmy-coin-3d.dim_256x256.png"
                alt="QMY Coin"
                className="w-20 h-20 object-contain"
                style={{ filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.5))' }}
              />
            </div>

            {/* Balance cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-yellow-900/40 to-amber-900/20 border border-gold/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Unlock className="w-4 h-4 text-gold" />
                  <span className="text-xs text-white/60">Unlocked QMY</span>
                </div>
                {isLoading ? (
                  <div className="h-7 w-16 bg-gold/20 rounded animate-pulse" />
                ) : (
                  <div className="text-2xl font-bold text-gold">{unlockedQMY.toFixed(0)}</div>
                )}
              </div>
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-white/60" />
                  <span className="text-xs text-white/60">Locked QMY</span>
                </div>
                {isLoading ? (
                  <div className="h-7 w-16 bg-white/10 rounded animate-pulse" />
                ) : (
                  <div className="text-2xl font-bold text-white">{lockedQMY.toFixed(0)}</div>
                )}
              </div>
            </div>

            {/* Vesting info */}
            {hasClaimed && (
              <div className="bg-white/5 border border-gold/20 rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-gold" />
                  <span className="text-xs text-gold font-semibold">Vesting Schedule Active</span>
                </div>
                <p className="text-xs text-white/50">
                  900 QMY locked — 100 QMY unlocked every 30 days over 9 months
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => onNavigate('ar-camera')}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl
                  bg-gradient-to-br from-purple-900/60 to-violet-900/40
                  border border-purple-500/30 active:scale-95 transition-all"
              >
                <Camera className="w-6 h-6 text-purple-400" />
                <span className="text-xs font-semibold text-white">AR Camera</span>
                <span className="text-xs text-white/40">Lock &amp; Unlock QMY</span>
              </button>
              <button
                onClick={() => onNavigate('map')}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl
                  bg-gradient-to-br from-blue-900/60 to-cyan-900/40
                  border border-blue-500/30 active:scale-95 transition-all"
              >
                <Map className="w-6 h-6 text-blue-400" />
                <span className="text-xs font-semibold text-white">World Map</span>
                <span className="text-xs text-white/40">Find spawn points</span>
              </button>
            </div>

            {/* Visit Quantumoney.app */}
            <a
              href="https://quantumoney.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl
                bg-gold/10 border border-gold/30 text-gold font-semibold text-sm
                active:scale-95 transition-all hover:bg-gold/20"
            >
              <ExternalLink className="w-4 h-4" />
              Go to Quantumoney.app
            </a>

            {/* Canister info */}
            <div className="bg-white/3 border border-white/10 rounded-2xl p-3">
              <div className="text-xs text-white/40 font-semibold mb-2">Verified Canisters</div>
              <div className="space-y-1">
                {[
                  { label: 'Logic', id: 'ckmsk-taaaa-aaaah-atfca-cai' },
                  { label: 'QMY Ledger', id: '5o54h-giaaa-aaaad-aentq-cai' },
                  { label: 'Governance', id: 'nemlr-6aaaa-aaaan-q32la-cai' },
                ].map(({ label, id }) => (
                  <div key={id} className="flex items-center justify-between">
                    <span className="text-xs text-white/50">{label}</span>
                    <span className="text-xs text-gold/60 font-mono">{id.slice(0, 16)}...</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Welcome Bonus Modal */}
      {showWelcomeModal && (
        <WelcomeBonusModal onClose={() => setShowWelcomeModal(false)} />
      )}
    </div>
  );
}
