import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, MapPin, Users, TrendingUp, DollarSign, AlertCircle, Lock, Unlock, Gift, Briefcase, Rocket, Building2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GlobalDistribution() {
  const { t } = useLanguage();

  // Gold Paper Aligned: 600M QMY Geographic Distribution (Visual Simulation)
  const distributionData = [
    { region: 'North America (NA)', spots: 150000000, percentage: 25, color: 'bg-blue-500' },
    { region: 'Europe (EU)', spots: 180000000, percentage: 30, color: 'bg-green-500' },
    { region: 'Asia', spots: 210000000, percentage: 35, color: 'bg-purple-500' },
    { region: 'South America', spots: 30000000, percentage: 5, color: 'bg-amber-500' },
    { region: 'Africa', spots: 24000000, percentage: 4, color: 'bg-red-500' },
    { region: 'Oceania', spots: 6000000, percentage: 1, color: 'bg-cyan-500' },
  ];

  // Pre-sale Phases (Visual Simulation)
  const preSalePhases = [
    {
      phase: 'Phase 1',
      allocation: '50,000,000 QMY',
      price: '0.001 ICP',
      status: 'completed',
      participants: 5000,
      visualOnly: true,
    },
    {
      phase: 'Phase 2',
      allocation: '75,000,000 QMY',
      price: '0.0015 ICP',
      status: 'completed',
      participants: 7500,
      visualOnly: true,
    },
    {
      phase: 'Phase 3',
      allocation: '100,000,000 QMY',
      price: '0.002 ICP',
      status: 'active',
      participants: 12000,
      visualOnly: true,
    },
    {
      phase: 'Phase 4',
      allocation: '75,000,000 QMY',
      price: '0.0025 ICP',
      status: 'upcoming',
      participants: 0,
      visualOnly: true,
    },
  ];

  // Distribution Pools (Visual Simulation)
  const distributionPools = [
    {
      name: 'Pré-venda',
      icon: DollarSign,
      allocation: 300000000,
      percentage: 30,
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-500',
      description: 'Tokens alocados para fases de pré-venda',
      vesting: '3-12 meses linear',
    },
    {
      name: 'Equipe',
      icon: Users,
      allocation: 150000000,
      percentage: 15,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-500',
      description: 'Tokens reservados para equipe e colaboradores',
      vesting: '12 meses lockup + 36 meses linear',
    },
    {
      name: 'Fundadores',
      icon: Rocket,
      allocation: 100000000,
      percentage: 10,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-500',
      description: 'Tokens alocados para fundadores do projeto',
      vesting: '12 meses lockup + 48 meses linear',
    },
    {
      name: 'Exchanges',
      icon: Building2,
      allocation: 50000000,
      percentage: 5,
      color: 'from-amber-500/20 to-yellow-500/20',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-500',
      description: 'Tokens reservados para listagem em exchanges',
      vesting: 'Imediato',
    },
  ];

  // Vesting Schedule (Visual Simulation)
  const vestingSchedule = [
    { category: 'Equipe & Consultores', percentage: 15, lockup: '12 meses', vesting: '36 meses linear', visualOnly: true },
    { category: 'Fundadores', percentage: 10, lockup: '12 meses', vesting: '48 meses linear', visualOnly: true },
    { category: 'Investidores Iniciais', percentage: 10, lockup: '6 meses', vesting: '24 meses linear', visualOnly: true },
    { category: 'Participantes Pré-venda', percentage: 30, lockup: '3 meses', vesting: '12 meses linear', visualOnly: true },
    { category: 'Venda Pública', percentage: 20, lockup: 'Nenhum', vesting: 'Imediato', visualOnly: true },
    { category: 'Ecossistema & Recompensas', percentage: 15, lockup: 'Nenhum', vesting: '48 meses linear', visualOnly: true },
  ];

  const totalDistributed = distributionData.reduce((sum, region) => sum + region.spots, 0);

  return (
    <div className="space-y-8 pb-24">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Distribuição Global QMY
        </h1>
        <p className="text-muted-foreground">Sistema de distribuição geográfica e tokenomics (Simulação Visual)</p>
      </div>

      {/* Visual Simulation Disclaimer - Prominent */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/50 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-8 w-8 text-blue-500 shrink-0 mt-1 animate-pulse" />
            <div className="space-y-2">
              <p className="text-lg font-bold text-blue-500">
                ⚠️ Aviso Importante - Simulação Visual Apenas
              </p>
              <p className="text-sm text-white/90 leading-relaxed">
                <strong>Todos os valores, mecânicas de tokens QMY, pools de distribuição, e sistemas de vesting apresentados 
                são simulações visuais apenas.</strong> Nenhuma transação real de criptomoeda é executada. 
                Esta aplicação está totalmente compatível com as diretrizes das lojas de aplicativos Android e iOS.
                Os dados exibidos são placeholders visuais para demonstração da arquitetura do sistema.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Supply Banner */}
      <Card className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4">
            <Globe className="h-12 w-12 text-amber-500" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Distribuição Geográfica Total (Visual)</p>
              <p className="text-5xl font-bold text-amber-500">600,000,000 QMY</p>
              <p className="text-xs text-white/60 mt-2">60,000 spots globais • Simulação visual apenas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="geographic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geographic">Geográfico</TabsTrigger>
          <TabsTrigger value="pools">Pools</TabsTrigger>
          <TabsTrigger value="presale">Pré-venda</TabsTrigger>
          <TabsTrigger value="vesting">Vesting</TabsTrigger>
        </TabsList>

        {/* Geographic Distribution Tab */}
        <TabsContent value="geographic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-amber-500" />
                Distribuição Geográfica - 600 Milhões QMY
              </CardTitle>
              <CardDescription>
                Representação visual de 600,000,000 QMY tokens distribuídos globalmente em 60,000 spots
                <Badge variant="outline" className="ml-2 text-blue-500 border-blue-500">Visual Apenas</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {distributionData.map((region) => (
                  <Card key={region.region}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-amber-500" />
                        {region.region}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Alocação</span>
                        <Badge variant="secondary" className="text-lg">
                          {(region.spots / 1_000_000).toFixed(0)}M QMY
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Percentual</span>
                          <span className="font-semibold">{region.percentage}%</span>
                        </div>
                        <Progress value={region.percentage} className="h-2" />
                      </div>
                      <Badge variant="outline" className="text-xs text-blue-500 border-blue-500">
                        Simulação Visual
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                    Resumo da Distribuição Geográfica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Distribuído</p>
                      <p className="text-2xl font-bold text-amber-500">{(totalDistributed / 1_000_000).toFixed(0)}M QMY</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total de Spots</p>
                      <p className="text-2xl font-bold text-amber-500">60,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">QMY por Spot</p>
                      <p className="text-2xl font-bold text-amber-500">10,000</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-500 border-blue-500">
                    ⚠️ Valores de simulação visual apenas
                  </Badge>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Pools Tab */}
        <TabsContent value="pools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-amber-500" />
                Pools de Distribuição
              </CardTitle>
              <CardDescription>
                Alocação de tokens por categoria
                <Badge variant="outline" className="ml-2 text-blue-500 border-blue-500">Visual Apenas</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {distributionPools.map((pool) => {
                  const Icon = pool.icon;
                  return (
                    <Card key={pool.name} className={`bg-gradient-to-br ${pool.color} ${pool.borderColor}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className={`text-lg flex items-center gap-2 ${pool.textColor}`}>
                            <Icon className="h-5 w-5" />
                            {pool.name}
                          </CardTitle>
                          <Badge variant="outline" className="text-blue-500 border-blue-500 text-xs">
                            Visual
                          </Badge>
                        </div>
                        <CardDescription>{pool.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Alocação</span>
                          <span className={`text-2xl font-bold ${pool.textColor}`}>
                            {(pool.allocation / 1_000_000).toFixed(0)}M QMY
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Percentual do Total</span>
                            <span className="font-semibold">{pool.percentage}%</span>
                          </div>
                          <Progress value={pool.percentage} className="h-2" />
                        </div>
                        <div className="pt-2 border-t border-white/10">
                          <p className="text-xs text-muted-foreground">Vesting</p>
                          <p className="text-sm font-semibold">{pool.vesting}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="mt-6 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-amber-500" />
                    Resumo dos Pools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {distributionPools.map((pool) => (
                      <div key={pool.name} className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">{pool.name}</p>
                        <p className={`text-xl font-bold ${pool.textColor}`}>
                          {pool.percentage}%
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <p className="text-xs text-white/80 leading-relaxed">
                      ⚠️ <strong>Aviso:</strong> Todos os pools e valores são simulações visuais. 
                      Nenhuma transação real de criptomoeda é executada.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pre-sale Tab */}
        <TabsContent value="presale" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-amber-500" />
                Fases de Pré-venda
              </CardTitle>
              <CardDescription>
                Cronograma de pré-venda e alocações
                <Badge variant="outline" className="ml-2 text-blue-500 border-blue-500">Visual Apenas</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {preSalePhases.map((phase) => (
                  <Card key={phase.phase} className={phase.status === 'active' ? 'border-amber-500' : ''}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{phase.phase}</CardTitle>
                          {phase.visualOnly && (
                            <Badge variant="outline" className="text-blue-500 border-blue-500 text-xs">
                              Visual
                            </Badge>
                          )}
                        </div>
                        <Badge
                          variant={
                            phase.status === 'completed'
                              ? 'secondary'
                              : phase.status === 'active'
                              ? 'default'
                              : 'outline'
                          }
                          className={phase.status === 'active' ? 'bg-amber-500' : ''}
                        >
                          {phase.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Alocação</div>
                          <div className="font-semibold">{phase.allocation}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Preço</div>
                          <div className="font-semibold">{phase.price}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Status</div>
                          <div className="font-semibold capitalize">{phase.status}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Participantes</div>
                          <div className="font-semibold">{phase.participants.toLocaleString()}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-500" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Preço Atual Pré-venda (Visual)</p>
                      <p className="text-4xl font-bold text-green-500">$0.002</p>
                      <Badge variant="outline" className="mt-2 text-blue-500 border-blue-500">
                        Simulação Visual
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vesting Tab */}
        <TabsContent value="vesting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-amber-500" />
                Cronograma de Vesting
              </CardTitle>
              <CardDescription>
                Períodos de lockup e liberação de tokens
                <Badge variant="outline" className="ml-2 text-blue-500 border-blue-500">Visual Apenas</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vestingSchedule.map((item) => (
                  <Card key={item.category}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{item.category}</CardTitle>
                        {item.visualOnly && (
                          <Badge variant="outline" className="text-blue-500 border-blue-500 text-xs">
                            Visual
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Alocação</div>
                          <div className="font-semibold text-amber-500">{item.percentage}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Lockup</div>
                          <div className="font-semibold">{item.lockup}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Período de Vesting</div>
                          <div className="font-semibold">{item.vesting}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-amber-500" />
                    Bônus Primeiros 100,000 Usuários
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                      <Unlock className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Desbloqueado</p>
                      <p className="text-2xl font-bold text-green-500">100 QMY</p>
                    </div>
                    <div className="text-center p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                      <Lock className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Bloqueado</p>
                      <p className="text-2xl font-bold text-amber-500">900 QMY</p>
                    </div>
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Desbloqueio</p>
                      <p className="text-2xl font-bold text-blue-500">100 QMY/mês</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <p className="text-xs text-white/80 leading-relaxed">
                      ⚠️ <strong>Aviso:</strong> Sistema de desbloqueio automático simulado de 100 QMY a cada 30 dias durante 9 meses. 
                      Simulação visual apenas, sem execução de lógica crypto real.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
