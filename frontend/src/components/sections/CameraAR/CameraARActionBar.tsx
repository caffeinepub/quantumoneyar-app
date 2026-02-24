import React from 'react';
import { Lock, Unlock, Loader2 } from 'lucide-react';

interface CameraARActionBarProps {
  onLock: () => void;
  onUnlock: () => void;
  canLock: boolean;
  canUnlock: boolean;
  isLocking: boolean;
  isUnlocking: boolean;
  unlockedBalance: number;
}

export default function CameraARActionBar({
  onLock,
  onUnlock,
  canLock,
  canUnlock,
  isLocking,
  isUnlocking,
  unlockedBalance,
}: CameraARActionBarProps) {
  return (
    <div
      className="absolute bottom-16 left-0 right-0 z-20 flex items-center justify-center gap-4 px-4"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Lock button */}
      <button
        onClick={onLock}
        disabled={!canLock || isLocking}
        className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all shadow-lg ${
          canLock && !isLocking
            ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-400'
            : 'bg-gray-800/80 text-gray-500 border border-gray-600 cursor-not-allowed'
        }`}
      >
        {isLocking ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Lock size={16} />
        )}
        <span>Lock</span>
        {unlockedBalance > 0 && (
          <span className={`text-xs ${canLock ? 'text-black/70' : 'text-gray-600'}`}>
            ({unlockedBalance})
          </span>
        )}
      </button>

      {/* Unlock button */}
      <button
        onClick={onUnlock}
        disabled={!canUnlock || isUnlocking}
        className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all shadow-lg ${
          canUnlock && !isUnlocking
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400'
            : 'bg-gray-800/80 text-gray-500 border border-gray-600 cursor-not-allowed'
        }`}
      >
        {isUnlocking ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Unlock size={16} />
        )}
        <span>Unlock</span>
      </button>
    </div>
  );
}
