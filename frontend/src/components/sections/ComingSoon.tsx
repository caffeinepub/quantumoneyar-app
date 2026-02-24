import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction, Home } from 'lucide-react';
import { Section } from '@/App';
import { useLanguage } from '../../contexts/LanguageContext';

interface ComingSoonProps {
  section: 'map' | 'ar';
  onNavigate: (section: Section) => void;
}

export default function ComingSoon({ section, onNavigate }: ComingSoonProps) {
  const { t } = useLanguage();

  const getSectionTitle = () => {
    const sectionMap: Record<string, string> = {
      map: t('nav.map'),
      ar: t('nav.ar'),
    };
    return sectionMap[section] || section;
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-amber-500/10">
              <Construction className="h-16 w-16 text-amber-500" />
            </div>
          </div>
          <CardTitle className="text-3xl mb-2">
            {getSectionTitle()}
          </CardTitle>
          <CardDescription className="text-lg">
            {t('comingSoon.title')}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground">
            {t('comingSoon.description')}
          </p>
          <Button 
            onClick={() => onNavigate('hud')}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            {t('comingSoon.backToHome')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
