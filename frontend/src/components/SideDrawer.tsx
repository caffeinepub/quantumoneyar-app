import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, Map, Camera, User, BookOpen, ClipboardCheck, Target, HelpCircle, FileText, Shield } from 'lucide-react';
import { Section } from '@/App';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

interface SideDrawerProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SideDrawer({ activeSection, onNavigate, open, onOpenChange }: SideDrawerProps) {
  const { t } = useLanguage();
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const handleNavigate = (section: Section) => {
    onNavigate(section);
    onOpenChange(false);
  };

  const handleDisconnect = async () => {
    await clear();
    queryClient.clear();
    onOpenChange(false);
  };

  const menuItems = [
    { id: 'hud' as Section, label: 'Home', icon: Home },
    { id: 'ar-view' as Section, label: 'Câmara AR', icon: Camera },
    { id: 'map' as Section, label: 'World Map', icon: Map },
    { id: 'profile' as Section, label: 'Profile', icon: User },
    { id: 'rules-tutorial' as Section, label: 'Rules & Tutorial', icon: BookOpen },
    { id: 'beta-qa-checklist' as Section, label: 'Beta QA Checklist', icon: ClipboardCheck },
  ];

  const infoItems = [
    { id: 'mission' as Section, label: 'Mission', icon: Target },
    { id: 'how-it-works' as Section, label: 'How It Works', icon: HelpCircle },
    { id: 'terms' as Section, label: 'Terms of Service', icon: FileText },
    { id: 'privacy' as Section, label: 'Privacy Policy', icon: Shield },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] sm:w-[320px] bg-black border-[#FFD700] overflow-y-auto">
        <SheetHeader className="border-b border-[#FFD700]/30 pb-4 mb-4">
          <SheetTitle className="flex flex-col items-start gap-1">
            <span className="text-xl font-bold text-[#FFD700]">Quantumoney AR</span>
            <span className="text-xs text-gray-400">Beta - Gameplay Only</span>
          </SheetTitle>
          {isAuthenticated && (
            <Button
              onClick={handleDisconnect}
              variant="outline"
              size="sm"
              className="w-full mt-2 border-red-500 text-red-500 hover:bg-red-500/10"
            >
              Logout
            </Button>
          )}
        </SheetHeader>

        <nav className="space-y-6">
          {/* Gameplay Section */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              Gameplay
            </h3>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={`w-full justify-start gap-3 ${
                      isActive 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                    onClick={() => handleNavigate(item.id)}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              Information
            </h3>
            <div className="space-y-1">
              {infoItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={`w-full justify-start gap-3 ${
                      isActive 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                    onClick={() => handleNavigate(item.id)}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
