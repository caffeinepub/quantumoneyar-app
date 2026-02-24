import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Network, Lock, Zap } from 'lucide-react';

export default function Technology() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Tecnologia
        </h1>
        <p className="text-lg text-muted-foreground">
          Infraestrutura blockchain de última geração
        </p>
      </div>

      <div className="mb-12">
        <img 
          src="/assets/generated/blockchain-network-golden.dim_800x600.jpg" 
          alt="Blockchain Network" 
          className="w-full rounded-lg border border-amber-500/20 shadow-lg"
        />
      </div>

      <Tabs defaultValue="blockchain" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="interop">Interoperabilidade</TabsTrigger>
          <TabsTrigger value="scale">Escalabilidade</TabsTrigger>
        </TabsList>

        <TabsContent value="blockchain" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-amber-400" />
                Internet Computer Protocol (ICP)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                O Quantumoney é construído sobre a Internet Computer, uma blockchain de terceira geração 
                que oferece velocidade web e escalabilidade ilimitada.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400 mb-1">2s</div>
                  <div className="text-sm text-muted-foreground">Finalidade de transação</div>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400 mb-1">$0.0001</div>
                  <div className="text-sm text-muted-foreground">Custo médio por transação</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-amber-400" />
                Contratos Inteligentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nossos contratos inteligentes são escritos em Motoko, uma linguagem moderna e segura 
                projetada especificamente para a Internet Computer.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Auditoria Completa:</strong> Todos os contratos passam por auditorias 
                    rigorosas de segurança
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Upgradeable:</strong> Arquitetura modular permite atualizações seguras
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Gas-Free:</strong> Usuários não pagam taxas de gas para interações
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interop" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-amber-400" />
                Interoperabilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                O QMY suporta integração nativa com múltiplas blockchains através de bridges 
                descentralizadas e protocolos de comunicação cross-chain.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg text-center">
                  <div className="font-semibold mb-1">Ethereum</div>
                  <div className="text-xs text-muted-foreground">Bridge Nativa</div>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg text-center">
                  <div className="font-semibold mb-1">Bitcoin</div>
                  <div className="text-xs text-muted-foreground">ckBTC Integration</div>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg text-center">
                  <div className="font-semibold mb-1">Polkadot</div>
                  <div className="text-xs text-muted-foreground">Cross-chain Protocol</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scale" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                Escalabilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                A arquitetura do Quantumoney foi projetada para escalar horizontalmente, 
                suportando milhões de usuários simultâneos sem degradação de performance.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400 mb-1">1M+</div>
                  <div className="text-sm text-muted-foreground">Transações por segundo</div>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400 mb-1">∞</div>
                  <div className="text-sm text-muted-foreground">Capacidade de crescimento</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
        <CardHeader>
          <CardTitle>Segurança e Conformidade</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            A segurança é nossa prioridade máxima. Implementamos as melhores práticas da indústria 
            e mantemos conformidade com regulamentações internacionais.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-sm">Auditorias de segurança trimestrais</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-sm">Bug bounty program ativo</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-sm">Conformidade com GDPR e regulamentações locais</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
