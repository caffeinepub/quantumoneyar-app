import { Home, User, Camera, Map, ClipboardCheck } from 'lucide-react';
import type { Section } from '../App';

interface BottomNavProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

export default function BottomNav({ activeSection, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'hud' as Section, icon: Home, label: 'Home' },
    { id: 'ar-view' as Section, icon: Camera, label: 'AR Camera' },
    { id: 'map' as Section, icon: Map, label: 'Map' },
    { id: 'profile' as Section, icon: User, label: 'Profile' },
    { id: 'beta-qa-checklist' as Section, icon: ClipboardCheck, label: 'QA' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t bg-black/95 backdrop-blur-sm"
      style={{
        height: '64px',
        borderColor: '#FFD700',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around h-full px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-0.5 px-1 py-1 rounded-lg transition-all min-w-[56px]"
              style={{
                color: isActive ? '#FFD700' : '#808080',
                backgroundColor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
              }}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
