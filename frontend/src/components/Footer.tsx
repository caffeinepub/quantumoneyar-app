import React from 'react';
import { SiWhatsapp, SiTelegram, SiInstagram, SiX } from 'react-icons/si';

const SHARE_TEXT = encodeURIComponent('🚀 Descobre o Quantumoney AR – coleta QMY coins no mundo real! ');
const SHARE_URL = encodeURIComponent('https://quantumoneyar.app');

const socialLinks = [
  {
    label: 'WhatsApp',
    icon: SiWhatsapp,
    href: `https://wa.me/?text=${SHARE_TEXT}${SHARE_URL}`,
    color: 'hover:text-green-400',
  },
  {
    label: 'X',
    icon: SiX,
    href: `https://twitter.com/intent/tweet?text=${SHARE_TEXT}&url=${SHARE_URL}`,
    color: 'hover:text-white',
  },
  {
    label: 'Telegram',
    icon: SiTelegram,
    href: `https://t.me/share/url?url=${SHARE_URL}&text=${SHARE_TEXT}`,
    color: 'hover:text-blue-400',
  },
  {
    label: 'Instagram',
    icon: SiInstagram,
    href: `https://www.instagram.com/`,
    color: 'hover:text-pink-400',
  },
];

export default function Footer() {
  return (
    <footer
      className="w-full flex items-center justify-center gap-4 py-2 px-4 flex-wrap"
      style={{
        background: 'rgba(0,0,0,0.55)',
        borderTop: '1px solid rgba(255,215,0,0.18)',
        minHeight: '44px',
      }}
    >
      {/* Social share links */}
      {socialLinks.map(({ label, icon: Icon, href, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className={`text-gold transition-colors duration-200 ${color} text-xl`}
          style={{ color: '#FFD700' }}
        >
          <Icon size={20} />
        </a>
      ))}

      {/* Divider */}
      <span style={{ color: 'rgba(255,215,0,0.3)', fontSize: '12px' }}>|</span>

      {/* ICP Reference */}
      <a
        href="https://internetcomputer.org"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 transition-opacity hover:opacity-80"
        aria-label="Powered by Internet Computer"
        title="Powered by ICP"
      >
        <img
          src="/assets/generated/icp-coin-gold.dim_128x128.png"
          alt="ICP"
          style={{ width: '18px', height: '18px', objectFit: 'contain' }}
        />
        <span style={{ color: '#FFD700', fontSize: '11px', fontWeight: 600, letterSpacing: '0.03em' }}>
          Powered by ICP
        </span>
      </a>
    </footer>
  );
}
