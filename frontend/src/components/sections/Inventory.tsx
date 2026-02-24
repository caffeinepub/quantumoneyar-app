import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Star, Coins, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function Inventory() {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();

  const mockCreatures = [
    { id: 1, name: 'Legendary Phoenix', rarity: 'legendary', level: 15, captured: '2026-01-15' },
    { id: 2, name: 'Epic Dragon', rarity: 'epic', level: 12, captured: '2026-01-14' },
    { id: 3, name: 'Rare Griffin', rarity: 'rare', level: 8, captured: '2026-01-13' },
    { id: 4, name: 'Common Sprite', rarity: 'common', level: 5, captured: '2026-01-12' },
  ];

  const mockItems = [
    { id: 1, name: 'Energy Potion', quantity: 15, type: 'consumable' },
    { id: 2, name: 'XP Boost', quantity: 5, type: 'boost' },
    { id: 3, name: 'Rare Lure', quantity: 3, type: 'lure' },
  ];

  const mockAchievements = [
    { id: 1, name: 'First Collector', description: 'Collected your first creature', unlocked: true },
    { id: 2, name: 'Explorer', description: 'Visited 25+ collection spots', unlocked: true },
    { id: 3, name: 'Level Master', description: 'Reached level 10', unlocked: true },
    { id: 4, name: 'Legendary Hunter', description: 'Capture a legendary creature', unlocked: false },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-purple-500 to-pink-500';
      case 'epic':
        return 'from-purple-400 to-blue-500';
      case 'rare':
        return 'from-blue-400 to-cyan-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  if (!identity) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-amber-500/10">
                <Package className="h-16 w-16 text-amber-500" />
              </div>
            </div>
            <CardTitle>{t('inventory.loginRequired')}</CardTitle>
            <CardDescription>{t('inventory.loginDescription')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          {t('inventory.title')}
        </h1>
        <p className="text-muted-foreground">{t('inventory.subtitle')}</p>
      </div>

      <Tabs defaultValue="creatures" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="creatures" className="gap-2">
            <Star className="h-4 w-4" />
            {t('inventory.creatures')}
          </TabsTrigger>
          <TabsTrigger value="items" className="gap-2">
            <Package className="h-4 w-4" />
            {t('inventory.items')}
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Award className="h-4 w-4" />
            {t('inventory.achievements')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creatures" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('inventory.collectedCreatures')}</CardTitle>
              <CardDescription>
                {mockCreatures.length} {t('inventory.creaturesTotal')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockCreatures.map((creature) => (
                  <Card key={creature.id} className="overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${getRarityColor(creature.rarity)}`} />
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{creature.name}</CardTitle>
                        <Badge className={`bg-gradient-to-r ${getRarityColor(creature.rarity)} text-white`}>
                          {creature.rarity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('inventory.level')}</span>
                        <span className="font-semibold">{creature.level}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('inventory.captured')}</span>
                        <span className="font-semibold">{creature.captured}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('inventory.yourItems')}</CardTitle>
              <CardDescription>{t('inventory.itemsDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 rounded-lg border border-border bg-card hover:border-amber-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Package className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">{item.type}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      x{item.quantity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('inventory.yourAchievements')}</CardTitle>
              <CardDescription>
                {mockAchievements.filter(a => a.unlocked).length} / {mockAchievements.length} {t('inventory.unlocked')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-start gap-3 p-4 rounded-lg border ${
                      achievement.unlocked
                        ? 'border-amber-500/50 bg-amber-500/5'
                        : 'border-border bg-muted/50 opacity-60'
                    }`}
                  >
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      achievement.unlocked ? 'bg-amber-500' : 'bg-muted'
                    }`}>
                      <Award className={`h-6 w-6 ${achievement.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold flex items-center gap-2">
                        {achievement.name}
                        {achievement.unlocked && (
                          <Badge variant="default" className="bg-green-500">
                            {t('inventory.unlocked')}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
