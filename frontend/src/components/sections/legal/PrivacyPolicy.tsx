import { useMemo } from 'react';
import { privacyContent } from '../../../content/legalContent';
import LegalTableOfContents from '../../legal/LegalTableOfContents';
import BackToTopButton from '../../legal/BackToTopButton';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = useMemo(
    () =>
      privacyContent.sections.map((s, i) => ({
        id: `privacy-section-${i}`,
        title: s.title,
      })),
    []
  );

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white">
      {/* Page header */}
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <div className="mb-3 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Shield className="text-gold" size={24} />
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold text-gold md:text-4xl">
          {privacyContent.title}
        </h1>
        {privacyContent.lastUpdated && (
          <p className="mt-2 text-sm text-gold/50">
            Last updated: {privacyContent.lastUpdated}
          </p>
        )}
      </div>

      {/* Layout: sidebar + content */}
      <div className="mx-auto flex max-w-4xl gap-8">
        <LegalTableOfContents sections={sections} title="Sections" />

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="space-y-8">
            {privacyContent.sections.map((section, i) => (
              <section
                key={i}
                id={`privacy-section-${i}`}
                className="scroll-mt-20 rounded-2xl border border-gold/10 bg-black/40 p-5 backdrop-blur-sm"
              >
                <h2 className="mb-3 font-display text-lg font-bold text-gold md:text-xl">
                  {section.title}
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-white/75">
                  {Array.isArray(section.content)
                    ? section.content.map((para, j) => (
                        <p key={j}>{para}</p>
                      ))
                    : <p>{section.content}</p>}
                </div>
              </section>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 rounded-xl border border-gold/10 bg-gold/5 p-4 text-center text-xs text-gold/50">
            © {new Date().getFullYear()} Quantumoney AR · All rights reserved
          </div>
        </main>
      </div>

      <BackToTopButton />
    </div>
  );
}
