import { SiWhatsapp, SiX, SiTelegram, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const shareUrl = encodeURIComponent('https://quantumoneyar.app');
  const shareText = encodeURIComponent('Check out QuantumoneyAR – the AR crypto game on ICP!');

  const socialLinks = [
    {
      icon: SiWhatsapp,
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      label: 'Share on WhatsApp',
      color: 'hover:text-green-400',
    },
    {
      icon: SiX,
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      label: 'Share on X',
      color: 'hover:text-white',
    },
    {
      icon: SiTelegram,
      href: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
      label: 'Share on Telegram',
      color: 'hover:text-blue-400',
    },
    {
      icon: SiInstagram,
      href: `https://www.instagram.com/`,
      label: 'Follow on Instagram',
      color: 'hover:text-pink-400',
    },
  ];

  return (
    <footer className="w-full bg-black/80 border-t border-gold/20 py-2 flex flex-col items-center justify-center gap-1" style={{ minHeight: 52, maxHeight: 64 }}>
      <div className="flex items-center gap-4">
        {socialLinks.map(({ icon: Icon, href, label, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`text-gold/70 transition-colors ${color} text-lg`}
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
      <p className="text-xs text-gold/50 tracking-wide">By HTgamers</p>
    </footer>
  );
}
