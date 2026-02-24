import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // App
    'app.title': 'Quantumoney AR',
    'app.subtitle': 'by HTgamers',
    
    // Header
    'header.title': 'Quantumoney AR',
    'header.subtitle': 'HTgamers',
    'header.xp': 'XP',
    'header.level': 'Level',
    'header.available': 'Avail',
    'header.locked': 'Locked',
    'header.total': 'Total',
    'header.loading': 'Loading...',
    'header.connected': 'Connected',
    'header.disconnect': 'Disconnect',
    'header.login': 'Login',
    
    // Navigation
    'nav.home': 'Home',
    'nav.profile': 'Profile',
    'nav.ar': 'AR',
    'nav.map': 'Map',
    'nav.rules': 'Rules',
    'nav.dao': 'DAO',
    
    // AR
    'ar.authRequired': 'Authentication Required',
    'ar.authDesc': 'Please login to access AR mode',
    'ar.realGPS': 'Real GPS',
    'ar.simulatedGPS': 'Simulated GPS',
    'ar.redeem': 'Redeem',
    'ar.lockQMY': 'Lock QMY',
    'ar.noSpawn': 'No spawn selected',
    'ar.insufficientXP': 'Insufficient XP',
    'ar.need15XP': 'You need at least 15 XP to redeem',
    'ar.cannotCollect': 'Cannot collect',
    'ar.coinCollected': 'Coin collected!',
    'ar.monsterCaptured': 'Monster captured!',
    'ar.addedToCollection': 'added to collection',
    'ar.onlyCoins': 'Lock QMY only works with coins',
    'ar.cannotLock': 'Cannot lock',
    'ar.coinLocked': 'Coin locked!',
    'ar.lockedFor30Days': 'locked for 30 days',
    'ar.type': 'Type',
    'ar.reward': 'Reward',
    
    // Camera
    'camera.unavailable': 'Camera unavailable',
    'camera.unavailableDesc': 'You can still interact with nearby spawns. Gameplay continues without camera.',
    'camera.notSupported': 'Camera not supported on this device',
    'camera.startToSee': 'Start camera to see AR view',
    'camera.gameplayContinues': 'Gameplay continues without camera',
    'camera.preview': 'Camera Preview',
    'camera.start': 'Start Camera',
    'camera.starting': 'Starting...',
    'camera.retry': 'Try Again',
    
    // Legal
    'legal.welcome': 'Welcome to Quantumoney AR',
    'legal.welcomeDesc': 'Before you start, please review and accept the following',
    'legal.cameraPermission': 'Camera Permission',
    'legal.cameraDesc': 'Required for AR gameplay experience',
    'legal.acceptCamera': 'I accept camera access',
    'legal.requestCamera': 'Request Camera Permission',
    'legal.locationPermission': 'Location Permission',
    'legal.locationDesc': 'Required for GPS-based gameplay',
    'legal.acceptLocation': 'I accept location access',
    'legal.requestLocation': 'Request Location Permission',
    'legal.termsTitle': 'Terms & Conditions',
    'legal.termsDesc': 'Please read and accept our terms of service',
    'legal.acceptTerms': 'I accept the Terms & Conditions',
    'legal.readTerms': 'Read Full Terms',
    'legal.privacyTitle': 'Privacy Policy',
    'legal.privacyDesc': 'Learn how we protect your data',
    'legal.acceptPrivacy': 'I accept the Privacy Policy',
    'legal.cookiesTitle': 'Cookies & Local Storage',
    'legal.cookiesDesc': 'We use local storage to save your game progress',
    'legal.acceptCookies': 'I accept cookies and local storage',
    'legal.ageTitle': 'Age Confirmation',
    'legal.confirmAge': 'I confirm I am 13 years or older',
    'legal.disclaimer': 'By accepting, you agree to all terms and conditions. You can revoke permissions at any time in your browser settings.',
    'legal.acceptAndContinue': 'Accept and Continue',
    
    // Profile
    'profile.loginRequired': 'Login Required',
    'profile.loginDesc': 'Please login to view your profile',
    'profile.saved': 'Profile saved successfully',
    'profile.avatarUpdated': 'Avatar updated',
    'profile.level': 'Level',
    'profile.available': 'Available',
    'profile.locked': 'Locked',
    'profile.share': 'Share',
    'profile.print': 'Print',
    'profile.uploadPhoto': 'Upload Personal Photo',
    'profile.selectMonster': 'Select Captured Monster',
    'profile.name': 'Name',
    'profile.gender': 'Gender',
    'profile.save': 'Save',
    'profile.cancel': 'Cancel',
    'profile.edit': 'Edit Profile',
    'profile.sharesRemaining': 'Shares remaining today',
    'profile.monsters': 'Monsters',
    'profile.wallet': 'Wallet',
    
    // Share
    'share.limitReached': 'Share limit reached',
    'share.maxPerDay': 'Maximum 10 shares per 24 hours',
    'share.success': 'Shared successfully!',
    'share.copiedToClipboard': 'Link copied to clipboard',
    'share.failed': 'Share failed',
    
    // DAO
    'dao.title': 'DAO Governance',
    'dao.subtitle': 'Decentralized governance powered by QMY',
    'dao.proposals': 'Proposals',
    'dao.chat': 'Community Chat',
    'dao.preProposal': 'Pre-Proposal',
    'dao.active': 'Active',
    'dao.passed': 'Passed',
    'dao.failed': 'Failed',
    
    // Rules
    'rules.title': 'Rules & Tutorial',
    'rules.subtitle': 'Learn how to play Quantumoney AR',
    'rules.gameplay': 'Gameplay',
    'rules.rewards': 'Rewards',
    'rules.privacy': 'Privacy',
    'rules.tutorial': 'AR Tutorial',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  pt: {
    // App
    'app.title': 'Quantumoney AR',
    'app.subtitle': 'by HTgamers',
    
    // Header
    'header.title': 'Quantumoney AR',
    'header.subtitle': 'HTgamers',
    'header.xp': 'XP',
    'header.level': 'Nível',
    'header.available': 'Disp',
    'header.locked': 'Bloq',
    'header.total': 'Total',
    'header.loading': 'Carregando...',
    'header.connected': 'Conectado',
    'header.disconnect': 'Desconectar',
    'header.login': 'Entrar',
    
    // Navigation
    'nav.home': 'Início',
    'nav.profile': 'Perfil',
    'nav.ar': 'AR',
    'nav.map': 'Mapa',
    'nav.rules': 'Regras',
    'nav.dao': 'DAO',
    
    // AR
    'ar.authRequired': 'Autenticação Necessária',
    'ar.authDesc': 'Faça login para acessar o modo AR',
    'ar.realGPS': 'GPS Real',
    'ar.simulatedGPS': 'GPS Simulado',
    'ar.redeem': 'Resgatar',
    'ar.lockQMY': 'Bloquear QMY',
    'ar.noSpawn': 'Nenhum spawn selecionado',
    'ar.insufficientXP': 'XP Insuficiente',
    'ar.need15XP': 'Você precisa de pelo menos 15 XP para resgatar',
    'ar.cannotCollect': 'Não é possível coletar',
    'ar.coinCollected': 'Moeda coletada!',
    'ar.monsterCaptured': 'Monstro capturado!',
    'ar.addedToCollection': 'adicionado à coleção',
    'ar.onlyCoins': 'Bloquear QMY funciona apenas com moedas',
    'ar.cannotLock': 'Não é possível bloquear',
    'ar.coinLocked': 'Moeda bloqueada!',
    'ar.lockedFor30Days': 'bloqueada por 30 dias',
    'ar.type': 'Tipo',
    'ar.reward': 'Recompensa',
    
    // Camera
    'camera.unavailable': 'Câmera indisponível',
    'camera.unavailableDesc': 'Você ainda pode interagir com spawns próximos. O jogo continua sem câmera.',
    'camera.notSupported': 'Câmera não suportada neste dispositivo',
    'camera.startToSee': 'Inicie a câmera para ver a visão AR',
    'camera.gameplayContinues': 'O jogo continua sem câmera',
    'camera.preview': 'Visualização da Câmera',
    'camera.start': 'Iniciar Câmera',
    'camera.starting': 'Iniciando...',
    'camera.retry': 'Tentar Novamente',
    
    // Legal
    'legal.welcome': 'Bem-vindo ao Quantumoney AR',
    'legal.welcomeDesc': 'Antes de começar, revise e aceite o seguinte',
    'legal.cameraPermission': 'Permissão de Câmera',
    'legal.cameraDesc': 'Necessário para experiência de jogo AR',
    'legal.acceptCamera': 'Aceito acesso à câmera',
    'legal.requestCamera': 'Solicitar Permissão de Câmera',
    'legal.locationPermission': 'Permissão de Localização',
    'legal.locationDesc': 'Necessário para jogo baseado em GPS',
    'legal.acceptLocation': 'Aceito acesso à localização',
    'legal.requestLocation': 'Solicitar Permissão de Localização',
    'legal.termsTitle': 'Termos e Condições',
    'legal.termsDesc': 'Leia e aceite nossos termos de serviço',
    'legal.acceptTerms': 'Aceito os Termos e Condições',
    'legal.readTerms': 'Ler Termos Completos',
    'legal.privacyTitle': 'Política de Privacidade',
    'legal.privacyDesc': 'Saiba como protegemos seus dados',
    'legal.acceptPrivacy': 'Aceito a Política de Privacidade',
    'legal.cookiesTitle': 'Cookies e Armazenamento Local',
    'legal.cookiesDesc': 'Usamos armazenamento local para salvar seu progresso',
    'legal.acceptCookies': 'Aceito cookies e armazenamento local',
    'legal.ageTitle': 'Confirmação de Idade',
    'legal.confirmAge': 'Confirmo que tenho 13 anos ou mais',
    'legal.disclaimer': 'Ao aceitar, você concorda com todos os termos e condições. Você pode revogar permissões a qualquer momento nas configurações do navegador.',
    'legal.acceptAndContinue': 'Aceitar e Continuar',
    
    // Profile
    'profile.loginRequired': 'Login Necessário',
    'profile.loginDesc': 'Faça login para ver seu perfil',
    'profile.saved': 'Perfil salvo com sucesso',
    'profile.avatarUpdated': 'Avatar atualizado',
    'profile.level': 'Nível',
    'profile.available': 'Disponível',
    'profile.locked': 'Bloqueado',
    'profile.share': 'Compartilhar',
    'profile.print': 'Imprimir',
    'profile.uploadPhoto': 'Enviar Foto Pessoal',
    'profile.selectMonster': 'Selecionar Monstro Capturado',
    'profile.name': 'Nome',
    'profile.gender': 'Gênero',
    'profile.save': 'Salvar',
    'profile.cancel': 'Cancelar',
    'profile.edit': 'Editar Perfil',
    'profile.sharesRemaining': 'Compartilhamentos restantes hoje',
    'profile.monsters': 'Monstros',
    'profile.wallet': 'Carteira',
    
    // Share
    'share.limitReached': 'Limite de compartilhamentos atingido',
    'share.maxPerDay': 'Máximo de 10 compartilhamentos por 24 horas',
    'share.success': 'Compartilhado com sucesso!',
    'share.copiedToClipboard': 'Link copiado para área de transferência',
    'share.failed': 'Falha ao compartilhar',
    
    // DAO
    'dao.title': 'Governança DAO',
    'dao.subtitle': 'Governança descentralizada alimentada por QMY',
    'dao.proposals': 'Propostas',
    'dao.chat': 'Chat da Comunidade',
    'dao.preProposal': 'Pré-Proposta',
    'dao.active': 'Ativa',
    'dao.passed': 'Aprovada',
    'dao.failed': 'Rejeitada',
    
    // Rules
    'rules.title': 'Regras e Tutorial',
    'rules.subtitle': 'Aprenda como jogar Quantumoney AR',
    'rules.gameplay': 'Gameplay',
    'rules.rewards': 'Recompensas',
    'rules.privacy': 'Privacidade',
    'rules.tutorial': 'Tutorial AR',
    
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('quantumoney-language');
    if (saved && (saved === 'en' || saved === 'pt')) {
      return saved as Language;
    }
    
    // Default to English (EN-US) as global default
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('quantumoney-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
