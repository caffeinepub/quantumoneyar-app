import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { privacyContent } from '../../../content/legalContent';

export default function PrivacyPolicy() {
  return (
    <div className="bg-black text-white pb-24 px-4 py-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-yellow-400 mb-1">{privacyContent.title}</h1>
        <p className="text-gray-500 text-xs mb-4">
          Last Updated: {privacyContent.lastUpdated} | Version {privacyContent.version}
        </p>
        <ScrollArea className="max-h-[70vh] pr-2">
          <div className="space-y-4">
            {privacyContent.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-yellow-300 font-semibold text-sm mb-1">{section.title}</h2>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-1">
                    {section.content.map((item, j) => (
                      <li key={j} className="text-gray-400 text-xs leading-relaxed">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-xs leading-relaxed">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
