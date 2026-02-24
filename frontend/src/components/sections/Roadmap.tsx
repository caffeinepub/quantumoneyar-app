import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const roadmapItems = [
  {
    quarter: 'Q4 2025',
    status: 'completed',
    items: [
      'Desenvolvimento do protocolo core',
      'Auditoria de segurança inicial',
      'Lançamento do testnet',
      'Formação da equipe principal',
    ],
  },
  {
    quarter: 'Q1 2026',
    status: 'current',
    items: [
      'Lançamento do mainnet',
      'Venda pública de tokens',
      'Listagem em exchanges descentralizadas',
      'Lançamento do Gold Paper',
    ],
  },
  {
    quarter: 'Q2 2026',
    status: 'upcoming',
    items: [
      'Implementação do Quantum Yield',
      'Lançamento da governança DAO',
      'Parcerias estratégicas',
      'Listagem em exchanges centralizadas',
    ],
  },
  {
    quarter: 'Q3 2026',
    status: 'upcoming',
    items: [
      'Bridge para Ethereum',
      'Integração com metaversos',
      'Lançamento de NFT marketplace',
      'Expansão da equipe',
    ],
  },
  {
    quarter: 'Q4 2026',
    status: 'upcoming',
    items: [
      'Lançamento de produtos DeFi',
      'Bridge para Bitcoin',
      'Programa de grants para desenvolvedores',
      'Expansão global',
    ],
  },
  {
    quarter: '2027+',
    status: 'future',
    items: [
      'Ecossistema completo de aplicações',
      'Integração com sistemas financeiros tradicionais',
      'Expansão para novos mercados',
      'Inovações em tecnologia quântica',
    ],
  },
];

export default function Roadmap() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'current':
        return <Clock className="h-6 w-6 text-amber-400 animate-pulse" />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/30 bg-green-500/5';
      case 'current':
        return 'border-amber-500/30 bg-amber-500/5';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Roadmap
        </h1>
        <p className="text-lg text-muted-foreground">
          Nossa jornada rumo ao futuro das finanças descentralizadas
        </p>
      </div>

      <div className="mb-12">
        <img 
          src="/assets/generated/roadmap-timeline.dim_1000x300.png" 
          alt="Roadmap Timeline" 
          className="w-full rounded-lg border border-amber-500/20 shadow-lg"
        />
      </div>

      <div className="space-y-8">
        {roadmapItems.map((phase, index) => (
          <div key={phase.quarter} className="relative">
            {index !== roadmapItems.length - 1 && (
              <div className="absolute left-[19px] top-[60px] w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-amber-500/50 to-transparent" />
            )}
            <Card className={getStatusColor(phase.status)}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    {getStatusIcon(phase.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-amber-400">{phase.quarter}</h3>
                      <span className="text-sm text-muted-foreground capitalize">
                        {phase.status === 'completed' && 'Concluído'}
                        {phase.status === 'current' && 'Em Andamento'}
                        {phase.status === 'upcoming' && 'Próximo'}
                        {phase.status === 'future' && 'Futuro'}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Card className="mt-12 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Compromisso com a Comunidade</h3>
          <p className="text-muted-foreground">
            Nosso roadmap é dinâmico e evolui com base no feedback da comunidade. Através da governança 
            DAO, os holders de QMY têm voz ativa nas decisões sobre o futuro do projeto. Mantenha-se 
            atualizado através de nossos canais oficiais e participe das votações para moldar o futuro 
            do Quantumoney.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
