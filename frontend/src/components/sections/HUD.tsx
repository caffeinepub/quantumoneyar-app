import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { useGameState } from '../../contexts/GameStateContext';
import WelcomeBonusModal from '../WelcomeBonusModal';
import type { Section } from '../../App';

interface HUDProps {
  onNavigate: (section: Section) => void;
}

const BONUS_MODAL_KEY = 'qmy_bonus_modal_shown_v1';

export default function HUD({ onNavigate }: HUDProps) {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { bonus, refresh, unlockedBalance } = useGameState();

  const [showBonusModal, setShowBonusModal] = useState(false);
  const [claimingBonus, setClaimingBonus] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const principal = identity?.getPrincipal().toString();

  // Claim bonus on first login
  useEffect(() => {
    if (!isAuthenticated || !actor || !principal) return;
    if (bonus !== null) return;
    if (claimingBonus) return;

    const modalShownKey = `${BONUS_MODAL_KEY}_${principal}`;
    const alreadyShown = localStorage.getItem(modalShownKey);

    const tryClaimBonus = async () => {
      setClaimingBonus(true);
      try {
        await actor.claimBonus();
        refresh();
        if (!alreadyShown) {
          setShowBonusModal(true);
        }
      } catch {
        // Already claimed or limit reached - just refresh
        refresh();
      } finally {
        setClaimingBonus(false);
      }
    };

    tryClaimBonus();
  }, [isAuthenticated, actor, principal, bonus, claimingBonus, refresh]);

  // Show modal when bonus is loaded for first time
  useEffect(() => {
    if (!bonus || !principal) return;
    const modalShownKey = `${BONUS_MODAL_KEY}_${principal}`;
    const alreadyShown = localStorage.getItem(modalShownKey);
    if (!alreadyShown && bonus.hasTokens) {
      setShowBonusModal(true);
    }
  }, [bonus, principal]);

  const handleDismissBonus = useCallback(() => {
    if (principal) {
      const modalShownKey = `${BONUS_MODAL_KEY}_${principal}`;
      localStorage.setItem(modalShownKey, 'true');
    }
    setShowBonusModal(false);
    refresh();
  }, [principal, refresh]);

  // Space background canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000010';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,200,${s.opacity})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleLogin = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (err: unknown) {
        const error = err as Error;
        if (error?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/generated/home-ambient-music.dim_1024x1024.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicOn(!musicOn);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] overflow-hidden bg-black">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Universe GIF overlay */}
      <img
        src="/assets/generated/animated-universe-background.dim_1920x1080.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 py-8 text-center">
        {/* Logo */}
        <img
          src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
          alt="Quantumoney"
          className="w-20 h-20 drop-shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">QUANTUMONEY</h1>
          <p className="text-gray-400 text-sm mt-1">AR Blockchain Game</p>
        </div>

        {/* Floating QMY coin */}
        <div className="animate-bounce">
          <img
            src="/assets/generated/qmy-coin-3d-floating-transparent.dim_400x400.png"
            alt="QMY Coin"
            className="w-24 h-24 drop-shadow-xl"
          />
        </div>

        {/* Balance display for authenticated users */}
        {isAuthenticated && bonus && (
          <div className="flex gap-3">
            <div className="bg-green-900/40 border border-green-500/40 rounded-xl px-4 py-2 text-center">
              <p className="text-green-400 font-bold text-lg">{unlockedBalance}</p>
              <p className="text-gray-400 text-xs">QMY Unlocked</p>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl px-4 py-2 text-center">
              <p className="text-yellow-400 font-bold text-lg">{bonus.locked}</p>
              <p className="text-gray-400 text-xs">QMY Locked</p>
            </div>
          </div>
        )}

        {/* Login / Enter Game */}
        {!isAuthenticated ? (
          <button
            onClick={handleLogin}
            disabled={isLoggingIn || isInitializing}
            className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-full text-base transition-all disabled:opacity-50 shadow-lg"
          >
            {isLoggingIn ? 'Logging in...' : isInitializing ? 'Loading...' : 'Login to Play'}
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => onNavigate('ar-view')}
              className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-full text-base transition-all shadow-lg"
            >
              🎮 Play AR Game
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('map')}
                className="px-4 py-2 bg-gray-800/80 border border-gray-600 hover:border-yellow-500 text-gray-300 hover:text-yellow-400 rounded-full text-sm transition-all"
              >
                🗺️ Map
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className="px-4 py-2 bg-gray-800/80 border border-gray-600 hover:border-yellow-500 text-gray-300 hover:text-yellow-400 rounded-full text-sm transition-all"
              >
                👤 Profile
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-gray-800/80 border border-gray-600 hover:border-red-500 text-gray-300 hover:text-red-400 rounded-full text-sm transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Music toggle */}
        <button
          onClick={toggleMusic}
          className="text-gray-500 hover:text-yellow-400 text-xs transition-colors"
        >
          {musicOn ? '🔊 Music On' : '🔇 Music Off'}
        </button>
      </div>

      {/* Welcome Bonus Modal */}
      {showBonusModal && <WelcomeBonusModal onDismiss={handleDismissBonus} />}
    </div>
  );
}
