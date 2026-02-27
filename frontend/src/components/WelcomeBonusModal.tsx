import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { X, Lock, Unlock, Star, Zap } from 'lucide-react';

interface WelcomeBonusModalProps {
  onClose: () => void;
}

export function WelcomeBonusModal({ onClose }: WelcomeBonusModalProps) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['playerState'] });
    queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
    queryClient.invalidateQueries({ queryKey: ['vestingSchedule'] });
    onClose();
  };

  const vestingMonths = Array.from({ length: 9 }, (_, i) => ({
    month: i + 1,
    amount: 100,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-b from-yellow-950 to-black border border-gold/40 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl shadow-gold/20">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-yellow-600/30 to-amber-600/20 px-6 pt-6 pb-4 text-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-5xl mb-2">🎁</div>
          <h2 className="text-xl font-bold text-gold font-display">Welcome Bonus!</h2>
          <p className="text-white/60 text-sm mt-1">You've received your starter pack</p>
        </div>

        {/* Bonus breakdown */}
        <div className="px-6 py-4 space-y-3">
          {/* XP */}
          <div className="flex items-center gap-3 bg-gold/10 rounded-xl p-3 border border-gold/20">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="text-gold font-bold text-lg">+100 XP</div>
              <div className="text-white/50 text-xs">Experience Points</div>
            </div>
          </div>

          {/* Unlocked QMY */}
          <div className="flex items-center gap-3 bg-green-900/20 rounded-xl p-3 border border-green-500/20">
            <div className="w-10 h-10 rounded-full bg-green-900/40 flex items-center justify-center">
              <Unlock className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-green-400 font-bold text-lg">100 QMY Unlocked</div>
              <div className="text-white/50 text-xs">Available immediately</div>
            </div>
          </div>

          {/* Locked QMY */}
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">900 QMY Locked</div>
              <div className="text-white/50 text-xs">Released over 9 months</div>
            </div>
          </div>

          {/* Vesting schedule */}
          <div className="bg-white/3 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-gold text-xs font-semibold">Vesting Schedule</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {vestingMonths.map(({ month, amount }) => (
                <div key={month} className="text-center bg-white/5 rounded-lg py-1">
                  <div className="text-xs text-white/40">M{month}</div>
                  <div className="text-xs font-bold text-gold">{amount}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/30 text-center mt-2">
              100 QMY unlocked every 30 days
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <button
            onClick={handleClose}
            className="w-full py-3 rounded-2xl font-bold text-black
              bg-gradient-to-r from-yellow-400 to-amber-500
              shadow-lg shadow-yellow-500/30 active:scale-95 transition-all"
          >
            Start Playing! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
