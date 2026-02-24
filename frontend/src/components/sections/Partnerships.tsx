import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Handshake, Network } from 'lucide-react';

const partners = [
  { name: 'DeFi Protocol Alpha', category: 'DeFi', description: 'Integração de liquidez e yield farming' },
  { name: 'Metaverse World', category: 'Metaverso', description: 'Economia virtual e NFTs' },
  { name: 'Exchange Global', category: 'Exchange', description: 'Listagem e trading de QMY' },
  { name: 'Blockchain Bridge', category: 'Infraestrutura', description: 'Ponte cross-chain' },
  { name: 'Wallet Provider', category: 'Wallet', description: 'Suporte nativo para QMY' },
  { name: 'Oracle Network', category: 'Dados', description: 'Feeds de preços confiáveis' },
];

export default function Partnerships() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Parcerias e Integrações
        </h1>
        <p className="text-lg text-muted-foreground">
          Construindo um ecossistema colaborativo
        </p>
      </div>

      <Card className="mb-12 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-2xl">Nossa Estratégia de Parcerias</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Acreditamos que o sucesso no ecossistema blockchain depende de colaboração. Buscamos 
            parcerias estratégicas que agreguem valor real aos nossos usuários e expandam as 
            possibilidades do Quantumoney.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4">
              <Building2 className="h-12 w-12 text-amber-400 mb-3" />
              <h3 className="font-semibold mb-2">Protocolos DeFi</h3>
              <p className="text-sm text-muted-foreground">
                Integração com principais plataformas de finanças descentralizadas
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Network className="h-12 w-12 text-amber-400 mb-3" />
              <h3 className="font-semibold mb-2">Infraestrutura</h3>
              <p className="text-sm text-muted-foreground">
                Parcerias técnicas para escalabilidade e interoperabilidade
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Handshake className="h-12 w-12 text-amber-400 mb-3" />
              <h3 className="font-semibold mb-2">Ecossistema</h3>
              <p className="text-sm text-muted-foreground">
                Colaborações com projetos complementares e inovadores
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {partners.map((partner, index) => (
          <Card key={index} className="border-amber-500/20 hover:border-amber-500/50 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/generated/partnership-icon-transparent.dim_150x150.png" 
                  alt={partner.name}
                  className="h-12 w-12"
                />
                <div>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <div className="text-sm text-amber-400">{partner.category}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{partner.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Integrações Técnicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">Wallets Suportadas</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  Plug Wallet
                </span>
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  Internet Identity
                </span>
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  Stoic Wallet
                </span>
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  NFID
                </span>
              </div>
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">Exchanges</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  ICPSwap
                </span>
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  Sonic DEX
                </span>
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  Em breve: CEXs
                </span>
              </div>
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">Protocolos DeFi</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  Lending Protocol
                </span>
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  Yield Aggregator
                </span>
                <span className="px-3 py-1 bg-background border border-amber-500/20 rounded-full text-sm">
                  Liquidity Pools
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
        <CardHeader>
          <CardTitle>Torne-se um Parceiro</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Estamos sempre abertos a novas parcerias que agreguem valor ao ecossistema Quantumoney. 
            Se você representa um projeto ou empresa interessada em colaborar, entre em contato conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 bg-background border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-1">Requisitos</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Projeto estabelecido e auditado</li>
                <li>• Alinhamento de valores</li>
                <li>• Benefício mútuo claro</li>
              </ul>
            </div>
            <div className="flex-1 p-4 bg-background border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-1">Benefícios</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Acesso à nossa comunidade</li>
                <li>• Suporte técnico</li>
                <li>• Marketing conjunto</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
