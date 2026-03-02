import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';

interface TocSection {
  id: string;
  title: string;
}

interface LegalTableOfContentsProps {
  sections: TocSection[];
  title?: string;
}

export default function LegalTableOfContents({ sections, title = 'Contents' }: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const SectionList = () => (
    <ul className="space-y-1">
      {sections.map((s) => (
        <li key={s.id}>
          <button
            onClick={() => handleClick(s.id)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-all ${
              activeId === s.id
                ? 'bg-gold/20 font-semibold text-gold'
                : 'text-gold/60 hover:bg-gold/10 hover:text-gold'
            }`}
          >
            {s.title}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-20 w-56 rounded-2xl border border-gold/20 bg-black/60 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2 text-gold">
            <List size={16} />
            <span className="font-display text-sm font-semibold uppercase tracking-wider">
              {title}
            </span>
          </div>
          <SectionList />
        </div>
      </aside>

      {/* Mobile collapsible */}
      <div className="mb-4 lg:hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-gold/30 bg-black/60 px-4 py-3 text-gold backdrop-blur-sm"
        >
          <span className="flex items-center gap-2 font-display text-sm font-semibold">
            <List size={16} />
            {title}
          </span>
          {mobileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {mobileOpen && (
          <div className="mt-1 rounded-xl border border-gold/20 bg-black/80 p-3 backdrop-blur-sm">
            <SectionList />
          </div>
        )}
      </div>
    </>
  );
}
