import React, { useState } from 'react';
import { Gift, Lock, Unlock, ChevronRight, X } from 'lucide-react';
import { useGameState } from '../contexts/GameStateContext';

interface WelcomeBonusModalProps {
  onDismiss: () => void;
}

export default function WelcomeBonusModal({ onDismiss }: WelcomeBonusModalProps) {
  const { bonus, refresh } = useGameState();
  const [dismissed, setDismissed] = useState(false);

  const unlocked = bonus?.unlocked ?? 100;
  const locked = bonus?.locked ?? 900;
  const unlocksRemaining = Number(bonus?.unlocksRemaining ?? 9);

  const handleDismiss = () => {
    setDismissed(true);
    refresh();
    onDismiss();
  };

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-gray-900 to-black border border-yellow-500/50 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-yellow-600/20 to-yellow-400/10 px-6 pt-6 pb-4 text-center">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
              <Gift className="text-yellow-400" size={32} />
            </div>
          </div>
          <h2 className="text-xl font-bold text-yellow-400">Welcome Bonus!</h2>
          <p className="text-gray-300 text-sm mt-1">Your registration reward is ready</p>
        </div>

        {/* Bonus breakdown */}
        <div className="px-6 py-4 space-y-3">
          {/* Total */}
          <div className="text-center mb-4">
            <span className="text-4xl font-bold text-yellow-400">1,000</span>
            <span className="text-yellow-300 ml-2 text-lg">QMY</span>
            <p className="text-gray-400 text-xs mt-1">Total Registration Bonus</p>
          </div>

          {/* Unlocked */}
          <div className="flex items-center justify-between bg-green-900/30 border border-green-500/30 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Unlock size={18} className="text-green-400" />
              <div>
                <p className="text-green-400 font-semibold text-sm">Unlocked Now</p>
                <p className="text-gray-400 text-xs">Available to play immediately</p>
              </div>
            </div>
            <span className="text-green-400 font-bold text-lg">{unlocked} QMY</span>
          </div>

          {/* Locked */}
          <div className="flex items-center justify-between bg-yellow-900/20 border border-yellow-500/30 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Lock size={18} className="text-yellow-400" />
              <div>
                <p className="text-yellow-400 font-semibold text-sm">Locked (Vesting)</p>
                <p className="text-gray-400 text-xs">Unlocks 100 QMY every 30 days</p>
              </div>
            </div>
            <span className="text-yellow-400 font-bold text-lg">{locked} QMY</span>
          </div>

          {/* Vesting schedule */}
          <div className="bg-gray-800/50 rounded-xl px-4 py-3">
            <p className="text-gray-300 text-xs font-semibold mb-2 flex items-center gap-1">
              <ChevronRight size={12} className="text-yellow-400" />
              Vesting Schedule
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Monthly unlock</span>
                <span className="text-yellow-300">100 QMY / 30 days</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Remaining periods</span>
                <span className="text-yellow-300">{unlocksRemaining} months</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Full unlock in</span>
                <span className="text-yellow-300">~9 months</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <button
            onClick={handleDismiss}
            className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-xl transition-all text-sm"
          >
            Start Playing with {unlocked} QMY!
          </button>
        </div>
      </div>
    </div>
  );
}
