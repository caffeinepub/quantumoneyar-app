import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Globe, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGameState } from '@/contexts/GameStateContext';
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isAuthenticated = !!identity;
  const xp = Number(playerState?.xp ?? 0);

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
                <Button variant="outline" size="sm" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 h-9 text-xs px-2">
                  <span className="hidden sm:inline">Account</span>
                  <span className="sm:hidden">•••</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/95 border-[#FFD700]/30 min-w-[180px]">
                <div className="px-3 py-2 text-xs">
                  <p className="text-white/60 text-[10px]">QMY Balances</p>
                  <p className="text-green-500 font-bold text-sm">{unlockedBalance} Unlocked</p>
                  <p className="text-amber-500 font-bold text-sm">{lockedBalance} Locked</p>
                  <p className="text-white/60 text-[10px] mt-1">XP: {xp}</p>
                </div>
                <DropdownMenuSeparator className="bg-[#FFD700]/30" />
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
