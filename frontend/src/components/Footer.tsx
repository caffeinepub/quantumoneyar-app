import { SiWhatsapp, SiX, SiTelegram, SiInstagram } from 'react-icons/si';

const shareUrl = encodeURIComponent('https://quantumoneyar.app');
const shareText = encodeURIComponent('🚀 Quantumoney AR – Collect QMY coins in Augmented Reality!');

const SOCIAL_LINKS = [
  {
    href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
    icon: SiWhatsapp,
    label: 'Share on WhatsApp',
    color: 'hover:text-green-400',
  },
  {
    href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    icon: SiX,
    label: 'Share on X',
    color: 'hover:text-white',
  },
  {
    href: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    icon: SiTelegram,
    label: 'Share on Telegram',
    color: 'hover:text-blue-400',
  },
  {
    href: 'https://www.instagram.com/quantumoneyar/',
    icon: SiInstagram,
    label: 'Instagram',
    color: 'hover:text-pink-400',
  },
];

export default function Footer() {
  return (
    <footer className="flex h-14 items-center justify-between border-t border-gold/10 bg-black/80 px-4 backdrop-blur-sm">
      <span className="text-xs text-gold/40">By HTgamers</span>
      <div className="flex items-center gap-3">
        {SOCIAL_LINKS.map(({ href, icon: Icon, label, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`text-gold/50 transition-colors ${color}`}
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </footer>
  );
}
