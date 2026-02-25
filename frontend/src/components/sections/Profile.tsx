import React, { useState, useRef } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGameState } from '../../contexts/GameStateContext';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../../hooks/useQueries';
import { ExternalBlob } from '../../backend';
import { Section } from '../../App';
import Footer from '../Footer';
import { Lock, Unlock, TrendingUp, Star, Shield, Camera, Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileProps {
  onNavigate?: (section: Section) => void;
}

type Tab = 'overview' | 'vesting' | 'monsters' | 'coins';

export default function Profile({ onNavigate }: ProfileProps) {
  const { identity } = useInternetIdentity();
  const { playerState, bonus, unlockedBalance, lockedBalance, remainingUnlocks, nextUnlockDate, isLoading } =
    useGameState();
  const { data: userProfile } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [photoUploading, setPhotoUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAuthenticated = !!identity;
  const xp = playerState ? Number(playerState.xp) : 0;
  const lockedCoins = playerState?.coinLocks.filter((c) => c.locked).length ?? 0;
  const unlockedCoins = playerState?.coinLocks.filter((c) => !c.locked).length ?? 0;
  const capturedMonsters = playerState?.monsters.filter((m) => m.captured).length ?? 0;

  const VESTING_MONTHS = Array.from({ length: 9 }, (_, i) => ({
    month: i + 1,
    amount: 100,
    unlocked: bonus ? Number(bonus.unlocksRemaining) <= 9 - i - 1 : false,
  }));

  const panelStyle = {
    background: 'rgba(255,215,0,0.06)',
    border: '1.5px solid rgba(255,215,0,0.3)',
    borderRadius: '12px',
    padding: '16px',
  };

  // Derive photo URL
  const photoUrl = userProfile?.photoUrl ? userProfile.photoUrl.getDirectURL() : null;

  // Handle photo upload
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile) return;

    setPhotoUploading(true);
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });

      await saveProfile.mutateAsync({
        name: userProfile.name,
        locale: userProfile.locale,
        gender: userProfile.gender,
        photoUrl: blob,
      });

      toast.success('Profile photo updated!');
    } catch (err) {
      toast.error('Failed to upload photo. Please try again.');
    } finally {
      setPhotoUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle name edit
  const startEditName = () => {
    setEditedName(userProfile?.name ?? '');
    setIsEditingName(true);
  };

  const cancelEditName = () => {
    setIsEditingName(false);
    setEditedName('');
  };

  const saveName = async () => {
    if (!userProfile || !editedName.trim()) return;
    try {
      await saveProfile.mutateAsync({
        name: editedName.trim(),
        locale: userProfile.locale,
        gender: userProfile.gender,
        photoUrl: userProfile.photoUrl,
      });
      setIsEditingName(false);
      toast.success('Display name updated!');
    } catch (err) {
      toast.error('Failed to update name. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center" style={{ background: 'transparent' }}>
        <p className="text-lg font-bold mb-4" style={{ color: '#FFD700' }}>
          Login to view your profile
        </p>
        {onNavigate && (
          <button
            onClick={() => onNavigate('hud')}
            className="px-6 py-2 rounded-lg font-bold"
            style={{ border: '1.5px solid #FFD700', color: '#FFD700', background: 'rgba(0,0,0,0.5)' }}
          >
            Go to Login
          </button>
        )}
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'vesting', label: 'Vesting' },
    { id: 'monsters', label: 'Monsters' },
    { id: 'coins', label: 'Coins' },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'transparent' }}>
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {/* Header / Avatar */}
        <div className="flex flex-col items-center gap-2 mb-4">
          {/* Avatar with photo upload */}
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center text-2xl font-bold"
              style={{ background: 'rgba(255,215,0,0.15)', border: '2px solid #FFD700', color: '#FFD700' }}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/assets/generated/avatar-default.dim_128x128.png"
                  alt="Default avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initial letter if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.textContent = userProfile?.name?.[0]?.toUpperCase() ?? '?';
                    }
                  }}
                />
              )}
            </div>

            {/* Edit photo button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={photoUploading}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{
                background: 'rgba(255,215,0,0.9)',
                border: '2px solid #000',
                color: '#000',
              }}
              title="Edit photo"
            >
              {photoUploading ? (
                <span className="text-[9px] font-bold">{uploadProgress}%</span>
              ) : (
                <Camera size={12} />
              )}
            </button>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />
          </div>

          {/* Display name with inline edit */}
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveName();
                    if (e.key === 'Escape') cancelEditName();
                  }}
                  className="text-lg font-bold rounded px-2 py-0.5 text-center"
                  style={{
                    background: 'rgba(255,215,0,0.1)',
                    border: '1.5px solid #FFD700',
                    color: '#FFD700',
                    outline: 'none',
                    maxWidth: '160px',
                  }}
                  autoFocus
                />
                <button
                  onClick={saveName}
                  disabled={saveProfile.isPending}
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(100,200,100,0.2)', border: '1px solid #64C864', color: '#64C864' }}
                >
                  <Check size={12} />
                </button>
                <button
                  onClick={cancelEditName}
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,100,100,0.2)', border: '1px solid #FF6464', color: '#FF6464' }}
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold" style={{ color: '#FFD700' }}>
                  {userProfile?.name ?? 'Player'}
                </h2>
                <button
                  onClick={startEditName}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700' }}
                  title="Edit display name"
                >
                  <Pencil size={11} />
                </button>
              </>
            )}
          </div>

          <p className="text-xs" style={{ color: 'rgba(255,215,0,0.5)' }}>
            {identity?.getPrincipal().toString().slice(0, 20)}…
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all"
              style={{
                background: activeTab === tab.id ? 'rgba(255,215,0,0.2)' : 'rgba(255,215,0,0.05)',
                border: `1px solid ${activeTab === tab.id ? '#FFD700' : 'rgba(255,215,0,0.2)'}`,
                color: activeTab === tab.id ? '#FFD700' : 'rgba(255,215,0,0.5)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-3">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <div style={panelStyle} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} style={{ color: '#64C864' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,215,0,0.6)' }}>XP</span>
                </div>
                <span className="text-2xl font-bold" style={{ color: '#64C864' }}>
                  {isLoading ? '…' : xp.toLocaleString()}
                </span>
              </div>

              <div style={panelStyle} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Star size={16} style={{ color: '#FFD700' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,215,0,0.6)' }}>Total QMY</span>
                </div>
                <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>
                  {isLoading ? '…' : (unlockedBalance + lockedBalance).toFixed(0)}
                </span>
              </div>

              <div style={panelStyle} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Unlock size={16} style={{ color: '#FFD700' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,215,0,0.6)' }}>Unlocked</span>
                </div>
                <span className="text-xl font-bold" style={{ color: '#FFD700' }}>
                  {isLoading ? '…' : unlockedBalance.toFixed(2)}
                </span>
              </div>

              <div style={panelStyle} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Lock size={16} style={{ color: '#C0C0C0' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,215,0,0.6)' }}>Locked</span>
                </div>
                <span className="text-xl font-bold" style={{ color: '#C0C0C0' }}>
                  {isLoading ? '…' : lockedBalance.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Gameplay stats */}
            <div style={panelStyle} className="flex flex-col gap-2">
              <h3 className="text-sm font-bold" style={{ color: '#FFD700' }}>Gameplay Stats</h3>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'rgba(255,215,0,0.6)' }}>Coins Locked</span>
                <span style={{ color: '#FFD700' }}>{lockedCoins}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'rgba(255,215,0,0.6)' }}>Coins Unlocked</span>
                <span style={{ color: '#C0C0C0' }}>{unlockedCoins}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'rgba(255,215,0,0.6)' }}>Monsters Captured</span>
                <span style={{ color: '#E0A0FF' }}>{capturedMonsters}</span>
              </div>
            </div>

            {/* XP rules */}
            <div style={panelStyle} className="flex flex-col gap-2">
              <h3 className="text-sm font-bold" style={{ color: '#FFD700' }}>XP Rules</h3>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'rgba(255,215,0,0.6)' }}>Lock 1 QMY</span>
                <span style={{ color: '#64C864' }}>+10 XP</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'rgba(255,215,0,0.6)' }}>Unlock 1 QMY</span>
                <span style={{ color: '#FF6464' }}>-15 XP</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'rgba(255,215,0,0.6)' }}>Capture Monster</span>
                <span style={{ color: '#64C864' }}>+20 XP</span>
              </div>
            </div>
          </div>
        )}

        {/* Vesting Tab */}
        {activeTab === 'vesting' && (
          <div className="flex flex-col gap-3">
            <div style={panelStyle}>
              <h3 className="text-sm font-bold mb-3" style={{ color: '#FFD700' }}>Vesting Progress</h3>
              {bonus ? (
                <>
                  <div className="flex justify-between text-xs mb-2" style={{ color: 'rgba(255,215,0,0.7)' }}>
                    <span>Unlocked: {bonus.unlocked.toFixed(0)} QMY</span>
                    <span>Remaining: {bonus.remainingLocked.toFixed(0)} QMY</span>
                  </div>
                  <div
                    className="w-full h-3 rounded-full overflow-hidden mb-2"
                    style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, bonus.percentageUnlocked * 100)}%`,
                        background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                      }}
                    />
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(255,215,0,0.5)' }}>
                    {bonus.nextUnlockMessage}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,215,0,0.5)' }}>
                    Unlocks remaining: {remainingUnlocks}
                  </p>
                </>
              ) : (
                <p className="text-xs" style={{ color: 'rgba(255,215,0,0.5)' }}>
                  No bonus claimed yet
                </p>
              )}
            </div>

            <div style={panelStyle}>
              <h3 className="text-sm font-bold mb-3" style={{ color: '#FFD700' }}>Monthly Schedule</h3>
              <div className="flex flex-col gap-2">
                {VESTING_MONTHS.map(({ month, amount, unlocked: isUnlocked }) => (
                  <div
                    key={month}
                    className="flex items-center justify-between text-xs py-1"
                    style={{ borderBottom: '1px solid rgba(255,215,0,0.1)' }}
                  >
                    <span style={{ color: 'rgba(255,215,0,0.6)' }}>Month {month}</span>
                    <span style={{ color: '#FFD700' }}>{amount} QMY</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: isUnlocked ? 'rgba(100,200,100,0.2)' : 'rgba(255,215,0,0.1)',
                        color: isUnlocked ? '#64C864' : 'rgba(255,215,0,0.5)',
                        border: `1px solid ${isUnlocked ? '#64C864' : 'rgba(255,215,0,0.2)'}`,
                      }}
                    >
                      {isUnlocked ? 'Unlocked' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Monsters Tab */}
        {activeTab === 'monsters' && (
          <div style={panelStyle}>
            <h3 className="text-sm font-bold mb-3" style={{ color: '#FFD700' }}>
              Captured Monsters ({capturedMonsters})
            </h3>
            {playerState?.monsters.filter((m) => m.captured).length === 0 ? (
              <p className="text-xs text-center py-4" style={{ color: 'rgba(255,215,0,0.4)' }}>
                No monsters captured yet. Use AR Camera to find them!
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {playerState?.monsters
                  .filter((m) => m.captured)
                  .map((monster) => (
                    <div
                      key={monster.id}
                      className="flex items-center justify-between p-2 rounded-lg"
                      style={{ background: 'rgba(180,0,255,0.1)', border: '1px solid rgba(180,0,255,0.3)' }}
                    >
                      <div className="flex items-center gap-2">
                        <Shield size={16} style={{ color: '#E0A0FF' }} />
                        <span className="text-sm font-bold" style={{ color: '#E0A0FF' }}>
                          {monster.name}
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: 'rgba(224,160,255,0.6)' }}>
                        Captured
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Coins Tab */}
        {activeTab === 'coins' && (
          <div style={panelStyle}>
            <h3 className="text-sm font-bold mb-3" style={{ color: '#FFD700' }}>
              Coin Locks ({playerState?.coinLocks.length ?? 0})
            </h3>
            {!playerState?.coinLocks.length ? (
              <p className="text-xs text-center py-4" style={{ color: 'rgba(255,215,0,0.4)' }}>
                No coin interactions yet. Use AR Camera to lock coins!
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {playerState?.coinLocks.map((coin) => (
                  <div
                    key={coin.id}
                    className="flex items-center justify-between p-2 rounded-lg"
                    style={{
                      background: coin.locked ? 'rgba(255,215,0,0.1)' : 'rgba(192,192,192,0.1)',
                      border: `1px solid ${coin.locked ? 'rgba(255,215,0,0.3)' : 'rgba(192,192,192,0.3)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {coin.locked ? (
                        <Lock size={14} style={{ color: '#FFD700' }} />
                      ) : (
                        <Unlock size={14} style={{ color: '#C0C0C0' }} />
                      )}
                      <span className="text-xs font-mono" style={{ color: coin.locked ? '#FFD700' : '#C0C0C0' }}>
                        {coin.id.slice(0, 12)}…
                      </span>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: coin.locked ? 'rgba(255,215,0,0.2)' : 'rgba(192,192,192,0.2)',
                        color: coin.locked ? '#FFD700' : '#C0C0C0',
                      }}
                    >
                      {coin.locked ? 'Locked' : 'Unlocked'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
