import { SiFacebook, SiX, SiInstagram, SiLinkedin } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-black/90 text-white py-6 border-t border-[#FFD700]/20 safe-bottom">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Social Sharing Options */}
          <div className="flex gap-6">
            <a
              href="https://facebook.com/htgamers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#FFD700] transition-colors"
              aria-label="Facebook"
            >
              <SiFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/htgamers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#FFD700] transition-colors"
              aria-label="X (Twitter)"
            >
              <SiX className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com/htgamers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#FFD700] transition-colors"
              aria-label="Instagram"
            >
              <SiInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/company/htgamers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#FFD700] transition-colors"
              aria-label="LinkedIn"
            >
              <SiLinkedin className="h-6 w-6" />
            </a>
          </div>

          {/* By HTgamers Text */}
          <div className="text-center text-sm text-gray-400">
            <p>By HTgamers</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
