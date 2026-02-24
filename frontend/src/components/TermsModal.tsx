import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { termsContent } from '@/content/legalContent';
import { hasAcceptedTerms, acceptTerms } from '@/lib/termsAcceptance';

interface TermsModalProps {
  onAccept: () => void;
  onNavigateToTerms: () => void;
}

export function TermsModal({ onAccept, onNavigateToTerms }: TermsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasAcceptedTerms()) {
      setIsOpen(true);
    }
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    
    if (isAtBottom && !hasScrolledToEnd) {
      setHasScrolledToEnd(true);
    }
  };

  const handleAccept = () => {
    acceptTerms();
    setIsOpen(false);
    onAccept();
  };

  const handleOpenFullTerms = () => {
    acceptTerms();
    setIsOpen(false);
    onNavigateToTerms();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
      style={{ backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.key === 'Escape' && e.preventDefault()}
    >
      <div 
        className="relative w-[90%] max-w-2xl bg-black border-2 rounded-lg shadow-2xl flex flex-col"
        style={{ 
          maxHeight: '80vh',
          borderColor: '#D4AF37',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b" style={{ borderColor: '#D4AF37' }}>
          <h2 className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
            {termsContent.title}
          </h2>
          <p className="text-sm mt-1" style={{ color: '#808080' }}>
            Quantumoney AR - Beta Version
          </p>
        </div>

        {/* Scroll instruction */}
        <div className="px-6 py-2 text-xs" style={{ color: '#808080' }}>
          Scroll to the end to enable the "Accept" button
        </div>

        {/* Scrollable Content */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 py-4"
          style={{ 
            scrollBehavior: 'smooth',
          }}
        >
          <div className="space-y-4 text-sm" style={{ color: '#CCCCCC' }}>
            {termsContent.sections.map((section, index) => (
              <section key={index}>
                <h3 className="font-semibold text-base mb-2" style={{ color: '#D4AF37' }}>
                  {section.title}
                </h3>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-1 leading-relaxed">
                    {section.content.map((item, i) => (
                      <li key={i} className={item.startsWith('•') ? 'pl-2' : ''}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="leading-relaxed">
                    {section.content}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="px-6 py-4 border-t space-y-2" style={{ borderColor: '#D4AF37' }}>
          <Button
            onClick={handleOpenFullTerms}
            variant="outline"
            className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Full Terms Page
          </Button>
          
          <Button
            onClick={handleAccept}
            disabled={!hasScrolledToEnd}
            className="w-full bg-[#D4AF37] text-black hover:bg-[#B8860B] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {hasScrolledToEnd ? 'Accept Terms' : 'Scroll to End to Accept'}
          </Button>
        </div>
      </div>
    </div>
  );
}
