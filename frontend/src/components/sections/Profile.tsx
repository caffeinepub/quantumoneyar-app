import React, { useState, useRef } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGameState } from '../../contexts/GameStateContext';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { ExternalBlob } from '../../backend';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { User, Star, Lock, Unlock, Zap, Camera, Edit2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { xp, lockedQMY, unlockedQMY, capturedMonsters, lockedCoins, vestingSchedule, isLoading } = useGameState();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayName = userProfile?.name || 'Explorer';
  const principal = identity?.getPrincipal().toString() ?? '';

  const setDisplayNameMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Not authenticated');
      await actor.setDisplayName(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Display name updated!');
      setEditingName(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const setProfilePhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!actor) throw new Error('Not authenticated');
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      await actor.setProfilePhoto(blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      setUploadProgress(null);
      toast.success('Profile photo updated!');
    },
    onError: (e: Error) => {
      setUploadProgress(null);
      toast.error(e.message);
    },
  });

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setDisplayNameMutation.mutate(nameInput.trim());
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhotoMutation.mutate(file);
  };

  const photoUrl = userProfile?.photoUrl ? userProfile.photoUrl.getDirectURL() : null;
  const level = Math.floor(xp / 100) + 1;

  if (!identity) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white p-8 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gold mb-2">Login Required</h2>
        <p className="text-white/60 text-sm">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black text-white overflow-y-auto pb-20">
      {/* Profile header */}
      <div className="relative bg-gradient-to-b from-gold/10 to-transparent px-4 pt-6 pb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full border-2 border-gold overflow-hidden bg-gold/10 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-gold/60" />
              )}
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gold flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-3 h-3 text-black" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Name & level */}
          <div className="flex-1">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-white/10 border border-gold/30 rounded-lg px-2 py-1 text-white text-sm flex-1"
                  placeholder="Display name"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  disabled={setDisplayNameMutation.isPending}
                  className="p-1 text-green-400"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={() => setEditingName(false)} className="p-1 text-red-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">{displayName}</span>
                <button
                  onClick={() => { setNameInput(displayName); setEditingName(true); }}
                  className="p-1 text-gold/60 hover:text-gold"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="text-gold/60 text-xs">Level {level} Explorer</div>
            <div className="text-white/30 text-xs font-mono mt-1">
              {principal.slice(0, 20)}...
            </div>
          </div>
        </div>

        {uploadProgress !== null && (
          <div className="mt-3">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gold/60 mt-1">Uploading... {uploadProgress}%</p>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 px-4 mb-4">
        <div className="bg-white/5 rounded-xl p-3 text-center border border-gold/20">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-3 h-3 text-gold" />
          </div>
          {isLoading ? (
            <div className="h-6 w-10 bg-gold/20 rounded animate-pulse mx-auto" />
          ) : (
            <div className="text-xl font-bold text-gold">{xp}</div>
          )}
          <div className="text-xs text-white/40">XP</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center border border-gold/20">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Unlock className="w-3 h-3 text-gold" />
          </div>
          {isLoading ? (
            <div className="h-6 w-10 bg-gold/20 rounded animate-pulse mx-auto" />
          ) : (
            <div className="text-xl font-bold text-gold">{unlockedQMY.toFixed(0)}</div>
          )}
          <div className="text-xs text-white/40">Unlocked</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Lock className="w-3 h-3 text-white/60" />
          </div>
          {isLoading ? (
            <div className="h-6 w-10 bg-white/10 rounded animate-pulse mx-auto" />
          ) : (
            <div className="text-xl font-bold text-white">{lockedQMY.toFixed(0)}</div>
          )}
          <div className="text-xs text-white/40">Locked</div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="flex-1 px-4">
        <TabsList className="w-full bg-white/5 border border-white/10 mb-4">
          <TabsTrigger value="overview" className="flex-1 text-xs">Overview</TabsTrigger>
          <TabsTrigger value="vesting" className="flex-1 text-xs">Vesting</TabsTrigger>
          <TabsTrigger value="monsters" className="flex-1 text-xs">Monsters</TabsTrigger>
          <TabsTrigger value="coins" className="flex-1 text-xs">Coins</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-3">
            <div className="bg-white/5 rounded-xl p-4 border border-gold/20">
              <h3 className="text-gold font-semibold text-sm mb-3">Game Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Monsters Captured</span>
                  <span className="text-white font-semibold">{capturedMonsters.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Coins Locked</span>
                  <span className="text-white font-semibold">{lockedCoins.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Total QMY</span>
                  <span className="text-gold font-semibold">{(lockedQMY + unlockedQMY).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-white/60 font-semibold text-sm mb-3">Canister IDs</h3>
              <div className="space-y-2">
                {[
                  { label: 'Logic', id: 'ckmsk-taaaa-aaaah-atfca-cai' },
                  { label: 'QMY Ledger', id: '5o54h-giaaa-aaaad-aentq-cai' },
                  { label: 'Governance', id: 'nemlr-6aaaa-aaaan-q32la-cai' },
                  { label: 'Gold Paper', id: 'whu4t-kiaaa-aaaah-qsc5q-cai' },
                  { label: 'Frontend', id: 'crjop-jyaaa-aaaah-atfaq-cai' },
                ].map(({ label, id }) => (
                  <div key={id} className="flex items-center justify-between">
                    <span className="text-xs text-white/50">{label}</span>
                    <span className="text-xs text-gold/60 font-mono">{id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vesting">
          <div className="space-y-2">
            {vestingSchedule.length === 0 ? (
              <div className="text-center py-8 text-white/40 text-sm">
                No vesting schedule yet. Claim your welcome bonus to start.
              </div>
            ) : (
              vestingSchedule.map((entry, i) => {
                const unlockDate = new Date(Number(entry.unlockTimestamp) / 1_000_000);
                const now = new Date();
                const isUnlocked = entry.unlocked || unlockDate <= now;
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      isUnlocked
                        ? 'bg-gold/10 border-gold/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Installment {Number(entry.installmentNumber)}
                      </div>
                      <div className="text-xs text-white/40">
                        {unlockDate.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${isUnlocked ? 'text-gold' : 'text-white/60'}`}>
                        {entry.amount.toFixed(0)} QMY
                      </div>
                      <div className={`text-xs ${isUnlocked ? 'text-green-400' : 'text-white/40'}`}>
                        {isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="monsters">
          <div className="space-y-2">
            {capturedMonsters.length === 0 ? (
              <div className="text-center py-8 text-white/40 text-sm">
                No monsters captured yet. Use the AR camera to find and capture monsters!
              </div>
            ) : (
              capturedMonsters.map((id) => (
                <div key={id} className="flex items-center gap-3 p-3 bg-purple-900/20 rounded-xl border border-purple-500/20">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">{id}</div>
                    <div className="text-xs text-purple-400">Captured</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="coins">
          <div className="space-y-2">
            {lockedCoins.length === 0 ? (
              <div className="text-center py-8 text-white/40 text-sm">
                No coins locked yet. Use the AR camera to find and lock QMY coins!
              </div>
            ) : (
              lockedCoins.map((id) => (
                <div key={id} className="flex items-center gap-3 p-3 bg-gold/10 rounded-xl border border-gold/20">
                  <img
                    src="/assets/generated/qmy-coin-3d.dim_256x256.png"
                    alt="QMY"
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">{id}</div>
                    <div className="text-xs text-gold">Locked — earning vesting</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
