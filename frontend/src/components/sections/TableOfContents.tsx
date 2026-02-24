import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Section } from '../../App';
import { Camera, Globe, User, BookOpen } from 'lucide-react';

interface TableOfContentsProps {
  onNavigate: (section: Section) => void;
}

export default function TableOfContents({ onNavigate }: TableOfContentsProps) {
  const sections: { id: Section; title: string; description: string; icon: any }[] = [
    { id: 'ar-view', title: 'AR Camera', description: 'Augmented reality gameplay', icon: Camera },
    { id: 'map', title: 'World Map', description: 'Spawn visualization map', icon: Globe },
    { id: 'profile', title: 'Profile', description: 'Player profile and stats', icon: User },
    { id: 'rules-tutorial', title: 'Rules & Tutorial', description: 'Game rules and how to play', icon: BookOpen },
  ];

  return (
    <div className="w-full p-4 space-y-6 golden-paper-bg safe-top safe-bottom" style={{ paddingTop: '90px', paddingBottom: '80px', flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <BookOpen className="h-20 w-20 text-[#FFD700] mx-auto" />
          <h1 className="text-4xl font-bold text-black">Table of Contents</h1>
          <p className="text-xl text-black/80">
            Navigate through all available sections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card 
                key={section.id} 
                className="bg-black/10 border-black/20 hover:border-[#FFD700] transition-colors cursor-pointer"
                onClick={() => onNavigate(section.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-black">
                    <Icon className="h-5 w-5 text-[#FFD700]" />
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-black/70">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-[#FFD700] text-black hover:bg-[#D4AF37]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(section.id);
                    }}
                  >
                    View Section
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
