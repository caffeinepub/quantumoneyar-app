import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-24 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-black/80 text-gold shadow-gold backdrop-blur-sm transition-all hover:bg-gold/20 active:scale-95"
    >
      <ArrowUp size={18} />
    </button>
  );
}
