import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Gift, Lock, Unlock, TrendingUp } from 'lucide-react';

interface WelcomeBonusModalProps {
  onClose: () => void;
}

const VESTING_MONTHS = Array.from({ length: 9 }, (_, i) => ({
  month: i + 1,
  amount: 100,
  cumulative: (i + 1) * 100,
}));

export default function WelcomeBonusModal({ onClose }: WelcomeBonusModalProps) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
    queryClient.invalidateQueries({ queryKey: ['playerState'] });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[200] p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: 'rgba(10,10,10,0.95)',
          border: '2px solid #FFD700',
          boxShadow: '0 0 40px rgba(255,215,0,0.3)',
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <Gift size={40} style={{ color: '#FFD700' }} />
          <h2 className="text-xl font-bold text-center" style={{ color: '#FFD700' }}>
            Welcome Bonus!
          </h2>
          <p className="text-sm text-center" style={{ color: 'rgba(255,215,0,0.7)' }}>
            You've received your registration bonus
          </p>
        </div>

        {/* Bonus breakdown */}
        <div className="flex flex-col gap-3">
          <div
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)' }}
          >
            <div className="flex items-center gap-2">
              <Unlock size={18} style={{ color: '#FFD700' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFD700' }}>
                Unlocked Now
              </span>
            </div>
            <span className="font-bold text-lg" style={{ color: '#FFD700' }}>
              100 QMY
            </span>
          </div>

          <div
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ background: 'rgba(192,192,192,0.1)', border: '1px solid rgba(192,192,192,0.3)' }}
          >
            <div className="flex items-center gap-2">
              <Lock size={18} style={{ color: '#C0C0C0' }} />
              <span className="text-sm font-semibold" style={{ color: '#C0C0C0' }}>
                Vesting (9 months)
              </span>
            </div>
            <span className="font-bold text-lg" style={{ color: '#C0C0C0' }}>
              900 QMY
            </span>
          </div>

          <div
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ background: 'rgba(100,200,100,0.1)', border: '1px solid rgba(100,200,100,0.3)' }}
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={18} style={{ color: '#64C864' }} />
              <span className="text-sm font-semibold" style={{ color: '#64C864' }}>
                Bonus XP
              </span>
            </div>
            <span className="font-bold text-lg" style={{ color: '#64C864' }}>
              +100 XP
            </span>
          </div>
        </div>

        {/* Vesting schedule */}
        <div>
          <p className="text-xs font-bold mb-2" style={{ color: 'rgba(255,215,0,0.7)' }}>
            Monthly Vesting Schedule (100 QMY/month)
          </p>
          <div className="flex gap-1 flex-wrap">
            {VESTING_MONTHS.map(({ month }) => (
              <div
                key={month}
                className="flex items-center justify-center w-7 h-7 rounded text-xs font-bold"
                style={{
                  background: 'rgba(255,215,0,0.1)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  color: '#FFD700',
                }}
              >
                {month}
              </div>
            ))}
          </div>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            100 QMY unlocked each month for 9 months
          </p>
        </div>

        {/* Total */}
        <div
          className="flex items-center justify-between p-3 rounded-lg"
          style={{ background: 'rgba(255,215,0,0.15)', border: '1.5px solid #FFD700' }}
        >
          <span className="font-bold" style={{ color: '#FFD700' }}>
            Total Bonus
          </span>
          <span className="font-bold text-xl" style={{ color: '#FFD700' }}>
            1,000 QMY
          </span>
        </div>

        <button
          onClick={handleClose}
          className="w-full py-3 rounded-xl font-bold text-base transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#000',
          }}
        >
          Start Playing!
        </button>
      </div>
    </div>
  );
}
