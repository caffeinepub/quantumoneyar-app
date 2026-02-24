import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from './contexts/LanguageContext';
import { SimulatedLocationProvider } from './contexts/SimulatedLocationContext';
import { GeolocationProvider } from './contexts/GeolocationContext';
import { GameStateProvider } from './contexts/GameStateContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SideDrawer from './components/SideDrawer';
import Footer from './components/Footer';
import HUD from './components/sections/HUD';
import Profile from './components/sections/Profile';
import CameraARPage from './components/sections/CameraAR/CameraARPage';
import LeafletMapPage from './components/sections/LeafletMapPage';
import RulesTutorial from './components/sections/RulesTutorial';
import BetaQAChecklist from './components/sections/BetaQAChecklist';
import Mission from './components/sections/legal/Mission';
import HowItWorks from './components/sections/legal/HowItWorks';
import Terms from './components/sections/legal/Terms';
import PrivacyPolicy from './components/sections/legal/PrivacyPolicy';
import DAOStructure from './components/sections/DAOStructure';
import { LegalModal } from './components/LegalModal';
import { hasAcceptedTerms, acceptTerms, migrateLegacyTermsAcceptance } from './lib/termsAcceptance';

export type Section =
  | 'hud'
  | 'profile'
  | 'ar-view'
  | 'map'
  | 'rules-tutorial'
  | 'beta-qa-checklist'
  | 'mission'
  | 'how-it-works'
  | 'terms'
  | 'privacy'
  | 'dao';

// Map URL paths to sections
const pathToSection: Record<string, Section> = {
  '/': 'hud',
  '/hud': 'hud',
  '/profile': 'profile',
  '/ar': 'ar-view',
  '/ar-view': 'ar-view',
  '/map': 'map',
  '/rules': 'rules-tutorial',
  '/rules-tutorial': 'rules-tutorial',
  '/qa': 'beta-qa-checklist',
  '/beta-qa-checklist': 'beta-qa-checklist',
  '/mission': 'mission',
  '/how-it-works': 'how-it-works',
  '/terms': 'terms',
  '/privacy': 'privacy',
  '/dao': 'dao',
};

// Map sections to URL paths
const sectionToPath: Record<Section, string> = {
  'hud': '/',
  'profile': '/profile',
  'ar-view': '/ar',
  'map': '/map',
  'rules-tutorial': '/rules',
  'beta-qa-checklist': '/qa',
  'mission': '/mission',
  'how-it-works': '/how-it-works',
  'terms': '/terms',
  'privacy': '/privacy',
  'dao': '/dao',
};

function AppContent() {
  const [activeSection, setActiveSection] = useState<Section>('hud');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(() => {
    migrateLegacyTermsAcceptance();
    return hasAcceptedTerms();
  });

  useEffect(() => {
    const path = window.location.pathname;
    const section = pathToSection[path] || 'hud';
    setActiveSection(section);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const section = pathToSection[path] || 'hud';
      setActiveSection(section);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    const path = sectionToPath[section];
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  const handleLegalAccept = () => {
    acceptTerms();
    setLegalAccepted(true);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'hud':
        return <HUD onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile />;
      case 'ar-view':
        return <CameraARPage onNavigate={handleNavigate} />;
      case 'map':
        return <LeafletMapPage />;
      case 'rules-tutorial':
        return <RulesTutorial />;
      case 'beta-qa-checklist':
        return <BetaQAChecklist />;
      case 'mission':
        return <Mission />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'dao':
        return <DAOStructure />;
      default:
        return <HUD onNavigate={handleNavigate} />;
    }
  };

  const showFooter = activeSection !== 'hud' && activeSection !== 'ar-view' && activeSection !== 'map';

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onMenuClick={() => setDrawerOpen(true)}
      />

      <main
        className="flex-1 flex flex-col"
        style={{
          paddingTop: '56px',
          paddingBottom: showFooter ? '0' : 'calc(64px + env(safe-area-inset-bottom))',
          minHeight: showFooter ? 'auto' : 'calc(100dvh - 56px - 64px - env(safe-area-inset-bottom))',
        }}
      >
        {renderSection()}
      </main>

      {showFooter && <Footer />}

      <BottomNav activeSection={activeSection} onNavigate={handleNavigate} />

      <SideDrawer
        activeSection={activeSection}
        onNavigate={handleNavigate}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />

      {!legalAccepted && (
        <LegalModal
          onAccept={handleLegalAccept}
          onNavigateToTerms={() => handleNavigate('terms')}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        <GeolocationProvider>
          <SimulatedLocationProvider>
            <GameStateProvider>
              <AppContent />
            </GameStateProvider>
          </SimulatedLocationProvider>
        </GeolocationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
