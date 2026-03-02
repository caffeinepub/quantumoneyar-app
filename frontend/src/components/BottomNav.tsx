import React from 'react';
import { Home, Camera, Map, User, BookOpen, type LucideIcon } from 'lucide-react';
import type { Section } from '../App';

interface BottomNavProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

const NAV_ITEMS: { section: Section; icon: LucideIcon; label: string }[] = [
  { section: 'hud', icon: Home, label: 'Home' },
  { section: 'ar-view', icon: Camera, label: 'AR' },
  { section: 'map', icon: Map, label: 'Map' },
  { section: 'profile', icon: User, label: 'Profile' },
  { section: 'rules-tutorial', icon: BookOpen, label: 'Rules' },
];

export default function BottomNav({ currentSection, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-gold/20"
      style={{
        height: 56,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-center justify-around h-full px-1">
        {NAV_ITEMS.map(({ section, icon: Icon, label }) => {
          const isActive = currentSection === section;
          return (
            <button
              key={section}
              onClick={() => onNavigate(section)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                isActive ? 'text-gold' : 'text-gold/40 hover:text-gold/70'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[9px] font-medium leading-none">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
