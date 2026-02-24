export interface LegalSection {
  title: string;
  content: string | string[];
}

export interface LegalContent {
  title: string;
  lastUpdated: string;
  version: string;
  sections: LegalSection[];
}

export const termsContent: LegalContent = {
  title: 'Terms of Service',
  lastUpdated: 'January 2025',
  version: '1.0',
  sections: [
    {
      title: '1. Acceptance of Terms',
      content:
        'By accessing or using Quantumoney AR, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.',
    },
    {
      title: '2. Eligibility',
      content:
        'You must be at least 13 years of age to use this application. By using Quantumoney AR, you represent that you meet this age requirement.',
    },
    {
      title: '3. Simulated Features',
      content:
        'Quantumoney AR is a blockchain-based augmented reality game. QMY tokens are in-game assets on the Internet Computer blockchain. No real cryptocurrency transactions are executed unless explicitly stated.',
    },
    {
      title: '4. Acceptable Use',
      content: [
        '• Do not use the application for any illegal purpose.',
        '• Do not attempt to hack, reverse engineer, or disrupt the service.',
        '• Do not create multiple accounts to abuse bonuses or rewards.',
        '• Always be aware of your physical surroundings when using AR features.',
        '• Do not trespass on private property while playing.',
      ],
    },
    {
      title: '5. Intellectual Property',
      content:
        'All content, trademarks, and intellectual property in Quantumoney AR are owned by HTgamers. You are granted a limited, non-exclusive license to use the application for personal, non-commercial purposes.',
    },
    {
      title: '6. Disclaimers',
      content:
        'Quantumoney AR is provided "as is" without warranties of any kind. We do not guarantee uninterrupted service or the accuracy of in-game data. QMY token values are simulated and do not represent real financial instruments.',
    },
    {
      title: '7. Limitation of Liability',
      content:
        'HTgamers shall not be liable for any indirect, incidental, or consequential damages arising from your use of the application, including but not limited to personal injury while playing.',
    },
    {
      title: '8. Termination',
      content:
        'We reserve the right to terminate or suspend your access to Quantumoney AR at any time, with or without cause, including for violations of these Terms of Service.',
    },
    {
      title: '9. Governing Law',
      content:
        'These Terms of Service are governed by the laws of Portugal. Any disputes shall be resolved in the courts of Portugal.',
    },
    {
      title: '10. Contact',
      content:
        'For questions about these Terms of Service, please contact us at legal@htgamers.com.',
    },
  ],
};

export const privacyContent: LegalContent = {
  title: 'Privacy Policy',
  lastUpdated: 'January 2025',
  version: '1.0',
  sections: [
    {
      title: '1. Information We Collect',
      content:
        'We collect information you provide directly, such as your Internet Identity principal, in-game actions (XP, coin locks, monster captures), and device information necessary for AR functionality.',
    },
    {
      title: '2. How We Use Your Information',
      content: [
        '• To provide and improve the Quantumoney AR game experience.',
        '• To maintain your game progress and QMY token balances on the ICP blockchain.',
        '• To ensure fair play and prevent abuse.',
        '• To communicate important updates about the service.',
      ],
    },
    {
      title: '3. Location Data',
      content:
        'Your GPS location is used locally on your device to calculate distances to nearby spawns and AR objects. Location data is not stored on our servers or shared with third parties.',
    },
    {
      title: '4. Camera Data',
      content:
        'Camera access is used exclusively for the AR experience. No images or video are stored, transmitted, or processed beyond what is necessary for real-time AR rendering.',
    },
    {
      title: '5. Internet Identity',
      content:
        'We use Internet Identity for decentralized authentication. Your identity is controlled entirely by you. We do not collect email addresses, passwords, or personal identification information.',
    },
    {
      title: '6. Blockchain Data',
      content:
        'Game data stored on the ICP blockchain (XP, coin locks, captures) is publicly accessible by nature of blockchain technology. Your principal ID is pseudonymous.',
    },
    {
      title: '7. Data Retention',
      content:
        'Game data stored on the ICP blockchain is retained indefinitely as part of the decentralized ledger. Local device data (preferences, settings) can be cleared by uninstalling the application.',
    },
    {
      title: '8. Your Rights (GDPR/LGPD)',
      content: [
        '• Right to access your personal data.',
        '• Right to rectification of inaccurate data.',
        '• Right to erasure (where technically feasible given blockchain immutability).',
        '• Right to data portability.',
        '• Right to object to processing.',
      ],
    },
    {
      title: '9. Children\'s Privacy',
      content:
        'Quantumoney AR is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us.',
    },
    {
      title: '10. Contact',
      content:
        'For privacy-related inquiries or to exercise your rights, contact us at privacy@htgamers.com.',
    },
  ],
};

export const missionContent: LegalContent = {
  title: 'Our Mission',
  lastUpdated: 'January 2025',
  version: '1.0',
  sections: [
    {
      title: 'Vision',
      content:
        'Quantumoney AR aims to bridge the physical and digital worlds through augmented reality and blockchain technology, creating a new paradigm for location-based gaming and digital asset ownership.',
    },
    {
      title: 'Core Values',
      content: [
        '• Decentralization: All game data lives on the Internet Computer blockchain.',
        '• Transparency: Open tokenomics and verifiable on-chain mechanics.',
        '• Community: Built for and governed by the first 100,000 players.',
        '• Innovation: Pioneering AR + blockchain integration on ICP.',
        '• Accessibility: Free to play with a generous welcome bonus.',
      ],
    },
    {
      title: 'Technology Foundation',
      content:
        'Built on the Internet Computer Protocol (ICP), Quantumoney AR leverages the speed, security, and scalability of Web3 infrastructure to deliver a seamless gaming experience without traditional blockchain limitations.',
    },
    {
      title: 'Community Governance',
      content:
        'The first 100,000 registered players form the founding community. Through the DAO structure, these early adopters will have governance rights over future development, tokenomics adjustments, and platform evolution.',
    },
    {
      title: 'Roadmap',
      content:
        'Phase 1: Launch with welcome bonus distribution and AR coin locking. Phase 2: Monster capture mechanics and creature trading. Phase 3: DAO governance activation. Phase 4: Cross-chain bridge and exchange listings.',
    },
  ],
};

export const howItWorksContent: LegalContent = {
  title: 'How It Works',
  lastUpdated: 'January 2025',
  version: '1.0',
  sections: [
    {
      title: 'Getting Started',
      content:
        'Login with Internet Identity to create your account. First-time players among the first 100,000 receive a welcome bonus of 1,000 QMY: 100 unlocked immediately and 900 locked with monthly vesting.',
    },
    {
      title: 'QMY Tokens',
      content:
        'QMY (Quantumoney) is the in-game token on the Internet Computer blockchain. Unlocked QMY can be used immediately for in-game actions. Locked QMY vests at 100 QMY per 30 days over 9 months.',
    },
    {
      title: 'XP System',
      content: [
        '• Walk to earn XP: 1 XP per meter walked.',
        '• Lock a coin: +10 XP reward.',
        '• Unlock a coin: -15 XP cost.',
        '• Capture a monster: +20 XP reward.',
        '• Share on social media: +2 XP (max 10/day).',
        '• Your XP determines your capture radius: 1 XP = 1 meter.',
      ],
    },
    {
      title: 'AR Camera',
      content:
        'Open the AR Camera to see QMY coins and monsters overlaid on your real-world camera feed. Point your device at the world and tap Lock to lock nearby coins. Locked coins mature after 30 days and award +2 QMY on unlock.',
    },
    {
      title: 'Creatures',
      content:
        'Crypto-Quantum Creatures appear at points of interest worldwide. Capture them using the AR camera to earn XP and add them to your collection. Rarity determines XP reward: Common (10 XP), Rare (25 XP), Epic (50 XP), Legendary (100 XP).',
    },
    {
      title: 'Safety Guidelines',
      content: [
        '• Always be aware of your physical surroundings.',
        '• Never trespass on private property.',
        '• Do not use the app while driving or cycling.',
        '• Play with friends in unfamiliar areas.',
        '• Respect local laws and regulations.',
      ],
    },
    {
      title: 'Technical Requirements',
      content:
        'Quantumoney AR requires a modern smartphone with GPS, camera, and internet connectivity. For the best AR experience, use a device with a gyroscope and compass. The app works as a Progressive Web App (PWA) on both Android and iOS.',
    },
  ],
};

// Unified export for components that use legalContent
export const legalContent = {
  terms: termsContent,
  privacy: privacyContent,
  mission: missionContent,
  howItWorks: howItWorksContent,
};
