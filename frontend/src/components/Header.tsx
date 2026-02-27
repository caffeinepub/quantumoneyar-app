import React, { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Menu, RefreshCw, User, LogOut, ChevronDown } from 'lucide-react';
import type { Section } from '../App';

interface HeaderProps {
  onMenuOpen?: () => void;
  onNavigate?: (section: Section) => void;
  currentSection?: Section;
}

export default function Header({ onMenuOpen, onNavigate, currentSection }: HeaderProps) {
  const { identity, clear, login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const { data: userProfile } = useGetCallerUserProfile();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    setDropdownOpen(false);
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['playerState'] });
    queryClient.invalidateQueries({ queryKey: ['claimBonus'] });
    queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
  };

  const displayName = userProfile?.name || 'Explorer';
  const photoUrl = userProfile?.photoUrl ? userProfile.photoUrl.getDirectURL() : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 border-b border-gold/20 safe-top" style={{ height: 48 }}>
      <div className="flex items-center justify-between h-full px-3">
        {/* Left: menu */}
        <button
          onClick={onMenuOpen}
          className="w-8 h-8 flex items-center justify-center text-gold/70 hover:text-gold transition-colors"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        {/* Center: logo */}
        <button
          onClick={() => onNavigate?.('hud')}
          className="flex items-center gap-1.5"
        >
          <img
            src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
            alt="Quantumoney"
            className="w-6 h-6"
          />
          <span className="text-gold font-bold text-xs tracking-wider font-orbitron">QMY AR</span>
        </button>

        {/* Right: auth + refresh */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleRefresh}
            className="w-7 h-7 flex items-center justify-center text-gold/50 hover:text-gold transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw size={13} />
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 bg-gold/10 border border-gold/20 rounded-lg px-2 py-1 hover:border-gold/40 transition-colors"
              >
                {photoUrl ? (
                  <img src={photoUrl} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <User size={12} className="text-gold" />
                )}
                <span className="text-gold text-xs max-w-[60px] truncate">{displayName}</span>
                <ChevronDown size={10} className="text-gold/50" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-black/95 border border-gold/20 rounded-xl shadow-gold overflow-hidden z-50 min-w-[140px]">
                  <button
                    onClick={() => { onNavigate?.('profile'); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-gold/70 hover:text-gold hover:bg-gold/10 transition-colors text-xs"
                  >
                    <User size={12} />
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors text-xs"
                  >
                    <LogOut size={12} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => login()}
              disabled={loginStatus === 'logging-in'}
              className="bg-gold text-black font-bold text-xs px-2 py-1 rounded-lg hover:bg-gold/80 transition-colors disabled:opacity-50"
            >
              {loginStatus === 'logging-in' ? '...' : 'Login'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
