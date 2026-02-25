import React, { useState, useEffect } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useClaimBonus, useGetClaimBonus } from '../../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Section } from '../../App';
import WelcomeBonusModal from '../WelcomeBonusModal';
import Footer from '../Footer';
import HomeSpaceBackground from './HomeSpaceBackground';
import { Loader2 } from 'lucide-react';

interface HUDProps {
  onNavigate: (section: Section) => void;
}

export default function HUD({ onNavigate }: HUDProps) {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: bonus, isLoading: bonusLoading } = useGetClaimBonus();
  const claimBonus = useClaimBonus();

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [bonusClaimed, setBonusClaimed] = useState(false);

  // Auto-claim bonus for new users
  useEffect(() => {
    if (
      isAuthenticated &&
      profileFetched &&
      !bonusLoading &&
      bonus === null &&
      !bonusClaimed &&
      !claimBonus.isPending
    ) {
      claimBonus.mutate(undefined, {
        onSuccess: () => {
          setBonusClaimed(true);
          setShowWelcomeModal(true);
        },
      });
    }
  }, [isAuthenticated, profileFetched, bonus, bonusLoading, bonusClaimed, claimBonus]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (err: unknown) {
      const error = err as Error;
      if (error?.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  if (isInitializing) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center" style={{ background: '#000' }}>
        <Loader2 size={32} className="animate-spin" style={{ color: '#FFD700' }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'transparent', position: 'relative' }}>
      {/* Dynamic space background — only on HUD/Home */}
      <HomeSpaceBackground />

      {showWelcomeModal && (
        <WelcomeBonusModal onClose={() => setShowWelcomeModal(false)} />
      )}

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6" style={{ position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <img
            src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
            alt="Quantumoney AR"
            className="w-24 h-24 object-contain"
          />
          <h1 className="text-3xl font-bold tracking-widest" style={{ color: '#FFD700' }}>
            QUANTUMONEY AR
          </h1>
          <p className="text-sm text-center" style={{ color: 'rgba(255,215,0,0.6)' }}>
            Collect QMY coins in the real world
          </p>
        </div>

        {isAuthenticated ? (
          <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            {/* User info */}
            <div
              className="w-full p-4 rounded-xl flex flex-col gap-2"
              style={{
                background: 'rgba(255,215,0,0.08)',
                border: '1.5px solid rgba(255,215,0,0.4)',
              }}
            >
              <p className="text-sm font-bold" style={{ color: '#FFD700' }}>
                {userProfile?.name ?? 'Player'}
              </p>
              {bonus && (
                <div className="flex justify-between text-xs" style={{ color: 'rgba(255,215,0,0.7)' }}>
                  <span>Unlocked: {bonus.unlocked.toFixed(2)} QMY</span>
                  <span>Locked: {bonus.locked.toFixed(2)} QMY</span>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={() => onNavigate('ar-view')}
              className="w-full py-3 rounded-xl font-bold text-base transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#000',
              }}
            >
              📷 AR Camera
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="w-full py-3 rounded-xl font-bold text-base transition-all active:scale-95"
              style={{
                background: 'rgba(255,215,0,0.1)',
                border: '1.5px solid #FFD700',
                color: '#FFD700',
              }}
            >
              🗺️ World Map
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="w-full py-3 rounded-xl font-bold text-base transition-all active:scale-95"
              style={{
                background: 'rgba(255,215,0,0.1)',
                border: '1.5px solid #FFD700',
                color: '#FFD700',
              }}
            >
              👤 Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-xl text-sm transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            <p className="text-sm text-center" style={{ color: 'rgba(255,215,0,0.6)' }}>
              Login to start collecting QMY coins and earn XP
            </p>
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl font-bold text-base transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#000',
              }}
            >
              {isLoggingIn && <Loader2 size={18} className="animate-spin" />}
              {isLoggingIn ? 'Logging in…' : 'Login with Internet Identity'}
            </button>
          </div>
        )}
      </main>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
