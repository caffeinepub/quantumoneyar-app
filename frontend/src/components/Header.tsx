import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Globe, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGameState } from '@/contexts/GameStateContext';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Section } from '@/App';

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  onMenuClick: () => void;
}

export default function Header({ activeSection, onNavigate, onMenuClick }: HeaderProps) {
  const { t, language, setLanguage } = useLanguage();
  const { identity, clear } = useInternetIdentity();
  const { unlockedBalance, lockedBalance, playerState, refresh } = useGameState();
  const { data: userProfile } = useGetCallerUserProfile();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isAuthenticated = !!identity;
  const xp = Number(playerState?.xp ?? 0);

  // Derive photo URL from profile
  const photoUrl = userProfile?.photoUrl ? userProfile.photoUrl.getDirectURL() : null;
  const displayName = userProfile?.name ?? 'Player';

  const handleLogout = async () => {
    await clear();
    onNavigate('hud');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#FFD700]/30 safe-top">
      <div className="flex items-center justify-between px-3 py-2 h-14">
        {/* Left: Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-[#FFD700] hover:bg-[#FFD700]/10 h-9 w-9"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Center: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
            alt="Quantumoney AR"
            className="h-8 w-8"
          />
          <h1 className="text-base font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent hidden sm:block">
            Quantumoney AR
          </h1>
        </div>

        {/* Right: Language, Refresh, Auth */}
        <div className="flex items-center gap-1">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#FFD700] hover:bg-[#FFD700]/10 h-9 w-9">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/95 border-[#FFD700]/30">
              <DropdownMenuItem onClick={() => setLanguage('en')} className="text-white hover:bg-[#FFD700]/10">
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('pt')} className="text-white hover:bg-[#FFD700]/10">
                Português
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Refresh Button (when authenticated) */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-[#FFD700] hover:bg-[#FFD700]/10 h-9 w-9"
              title="Refresh balances"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          )}

          {/* Auth Dropdown */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 h-9 text-xs px-2 gap-1.5"
                >
                  {/* Avatar thumbnail */}
                  <div
                    className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-[9px] font-bold"
                    style={{ background: 'rgba(255,215,0,0.2)', border: '1px solid #FFD700' }}
                  >
                    {photoUrl ? (
                      <img src={photoUrl} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <img
                        src="/assets/generated/avatar-default.dim_128x128.png"
                        alt="avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) parent.textContent = displayName[0]?.toUpperCase() ?? '?';
                        }}
                      />
                    )}
                  </div>
                  <span className="hidden sm:inline max-w-[80px] truncate">{displayName}</span>
                  <span className="sm:hidden">•••</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/95 border-[#FFD700]/30 min-w-[200px]">
                {/* Profile info */}
                <div className="px-3 py-2 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(255,215,0,0.15)', border: '1.5px solid #FFD700', color: '#FFD700' }}
                  >
                    {photoUrl ? (
                      <img src={photoUrl} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <img
                        src="/assets/generated/avatar-default.dim_128x128.png"
                        alt="avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) parent.textContent = displayName[0]?.toUpperCase() ?? '?';
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-[#FFD700] font-bold text-sm leading-tight">{displayName}</p>
                    <p className="text-white/40 text-[10px]">XP: {xp.toLocaleString()}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-[#FFD700]/30" />
                <div className="px-3 py-2 text-xs">
                  <p className="text-white/60 text-[10px]">QMY Balances</p>
                  <p className="text-green-500 font-bold text-sm">{unlockedBalance} Unlocked</p>
                  <p className="text-amber-500 font-bold text-sm">{lockedBalance} Locked</p>
                </div>
                <DropdownMenuSeparator className="bg-[#FFD700]/30" />
                <DropdownMenuItem
                  onClick={() => onNavigate('profile')}
                  className="text-[#FFD700] hover:bg-[#FFD700]/10"
                >
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-red-500/10">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="text-white/60 text-xs hidden sm:block">Not logged in</div>
          )}
        </div>
      </div>
    </header>
  );
}
