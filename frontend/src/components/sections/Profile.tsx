import React, { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGameState } from '../../contexts/GameStateContext';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { Lock, Unlock, User, Trophy, Clock, RefreshCw, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function Profile() {
  const { identity } = useInternetIdentity();
  const { playerState, bonus, unlockedBalance, lockedBalance, remainingUnlocks, refresh, isLoading } = useGameState();
  const { data: userProfile } = useGetCallerUserProfile();
  const [activeTab, setActiveTab] = useState('overview');

  const isAuthenticated = !!identity;
  const xp = Number(playerState?.xp ?? 0);
  const coinLocks = playerState?.coinLocks ?? [];
  const monsters = playerState?.monsters ?? [];
  const capturedMonsters = monsters.filter(m => m.captured);
  const lockedCoins = coinLocks.filter(c => c.locked);

  const vestingProgress = bonus
    ? ((1000 - lockedBalance) / 1000) * 100
    : 0;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <User size={48} className="text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-300 mb-2">Login Required</h2>
        <p className="text-gray-500 text-sm">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black px-4 py-6 border-b border-yellow-500/20">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center">
            <User size={28} className="text-yellow-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-yellow-400 truncate">
              {userProfile?.name ?? 'Player'}
            </h1>
            <p className="text-gray-400 text-xs truncate">
              {identity?.getPrincipal().toString().slice(0, 20)}...
            </p>
          </div>
          <button
            onClick={refresh}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* XP bar */}
        <div className="max-w-lg mx-auto mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>XP: {xp}</span>
            <span>Level {Math.floor(xp / 100) + 1}</span>
          </div>
          <Progress value={(xp % 100)} className="h-2" />
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-lg mx-auto px-4 py-4 grid grid-cols-3 gap-3">
        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-center">
          <p className="text-yellow-400 font-bold text-lg">{xp}</p>
          <p className="text-gray-400 text-xs">XP</p>
        </div>
        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-center">
          <p className="text-purple-400 font-bold text-lg">{capturedMonsters.length}</p>
          <p className="text-gray-400 text-xs">Monsters</p>
        </div>
        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-center">
          <p className="text-blue-400 font-bold text-lg">{lockedCoins.length}</p>
          <p className="text-gray-400 text-xs">Locked Coins</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-lg mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-gray-900 border border-gray-700 mb-4">
            <TabsTrigger value="overview" className="flex-1 text-xs">Overview</TabsTrigger>
            <TabsTrigger value="vesting" className="flex-1 text-xs">Vesting</TabsTrigger>
            <TabsTrigger value="monsters" className="flex-1 text-xs">Monsters</TabsTrigger>
            <TabsTrigger value="coins" className="flex-1 text-xs">Coins</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-3">
            {bonus && (
              <div className="bg-gray-900/60 border border-yellow-500/30 rounded-xl p-4">
                <h3 className="text-yellow-400 font-semibold text-sm mb-3 flex items-center gap-2">
                  <Trophy size={16} />
                  QMY Balance
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3 text-center">
                    <Unlock size={16} className="text-green-400 mx-auto mb-1" />
                    <p className="text-green-400 font-bold">{unlockedBalance}</p>
                    <p className="text-gray-400 text-xs">Unlocked</p>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 text-center">
                    <Lock size={16} className="text-yellow-400 mx-auto mb-1" />
                    <p className="text-yellow-400 font-bold">{lockedBalance}</p>
                    <p className="text-gray-400 text-xs">Locked</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Vesting Tab */}
          <TabsContent value="vesting" className="space-y-3">
            {bonus ? (
              <>
                <div className="bg-gray-900/60 border border-yellow-500/30 rounded-xl p-4">
                  <h3 className="text-yellow-400 font-semibold text-sm mb-3 flex items-center gap-2">
                    <Clock size={16} />
                    Vesting Progress
                  </h3>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Unlocked: {1000 - lockedBalance} QMY</span>
                      <span>{vestingProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={vestingProgress} className="h-3" />
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Bonus</span>
                      <span className="text-yellow-300">1,000 QMY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Unlocked Now</span>
                      <span className="text-green-400">{unlockedBalance} QMY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Still Locked</span>
                      <span className="text-yellow-400">{lockedBalance} QMY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Unlock</span>
                      <span className="text-blue-400">100 QMY / 30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Remaining Periods</span>
                      <span className="text-purple-400">{remainingUnlocks} months</span>
                    </div>
                  </div>
                </div>

                {/* Schedule table */}
                <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
                  <h3 className="text-gray-300 font-semibold text-sm mb-3">Unlock Schedule</h3>
                  <div className="space-y-2">
                    {Array.from({ length: 9 }, (_, i) => {
                      const monthNum = i + 1;
                      const unlockDate = new Date();
                      unlockDate.setDate(unlockDate.getDate() + monthNum * 30);
                      const isPast = monthNum <= (9 - remainingUnlocks);
                      return (
                        <div
                          key={i}
                          className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg ${
                            isPast
                              ? 'bg-green-900/20 border border-green-500/20'
                              : 'bg-gray-800/40 border border-gray-700/40'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <ChevronRight size={10} className={isPast ? 'text-green-400' : 'text-gray-600'} />
                            <span className={isPast ? 'text-green-400' : 'text-gray-400'}>
                              Month {monthNum}
                            </span>
                          </div>
                          <span className={isPast ? 'text-green-300' : 'text-gray-400'}>
                            {unlockDate.toLocaleDateString()} — 100 QMY
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Lock size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No vesting data available</p>
              </div>
            )}
          </TabsContent>

          {/* Monsters Tab */}
          <TabsContent value="monsters" className="space-y-3">
            {capturedMonsters.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No monsters captured yet</p>
                <p className="text-xs mt-1">Use the AR camera to capture monsters!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {capturedMonsters.map((m) => (
                  <div key={m.id} className="bg-gray-900/60 border border-purple-500/30 rounded-xl p-3 text-center">
                    <p className="text-purple-400 font-semibold text-sm truncate">{m.name}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {m.captureTimestamp
                        ? new Date(Number(m.captureTimestamp) / 1_000_000).toLocaleDateString()
                        : 'Captured'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Coins Tab */}
          <TabsContent value="coins" className="space-y-3">
            {lockedCoins.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No coins locked yet</p>
                <p className="text-xs mt-1">Use the AR camera to lock coins!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {lockedCoins.map((c) => (
                  <div key={c.id} className="bg-gray-900/60 border border-yellow-500/30 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400 font-semibold text-sm">Coin #{c.id.slice(0, 8)}</p>
                      <p className="text-gray-500 text-xs">
                        {c.timestamp
                          ? `Locked: ${new Date(Number(c.timestamp) / 1_000_000).toLocaleDateString()}`
                          : 'Locked'}
                      </p>
                    </div>
                    <Lock size={16} className="text-yellow-400" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
