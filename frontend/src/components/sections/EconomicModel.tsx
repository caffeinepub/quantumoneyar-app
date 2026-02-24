import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Users, Wallet } from 'lucide-react';

export default function EconomicModel() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Modelo Econômico: Quantum Yield
        </h1>
        <p className="text-lg text-muted-foreground">
          Sistema inovador de geração de valor sustentável
        </p>
      </div>

      <div className="mb-12">
        <img 
          src="/assets/generated/quantum-yield-flow.dim_700x500.png" 
          alt="Quantum Yield Flow" 
          className="w-full rounded-lg border border-amber-500/20 shadow-lg"
        />
      </div>

      <Card className="mb-12 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-2xl">O que é Quantum Yield?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Quantum Yield é nosso mecanismo proprietário de geração de rendimentos que combina staking, 
            liquidez e governança para criar um ecossistema econômico sustentável e lucrativo para todos 
            os participantes.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-background border border-amber-500/20 rounded-lg text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">12-18%</div>
              <div className="text-sm text-muted-foreground">APY Base</div>
            </div>
            <div className="p-4 bg-background border border-amber-500/20 rounded-lg text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">+5%</div>
              <div className="text-sm text-muted-foreground">Bônus de Governança</div>
            </div>
            <div className="p-4 bg-background border border-amber-500/20 rounded-lg text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">+3%</div>
              <div className="text-sm text-muted-foreground">Bônus de Liquidez</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-400" />
              Holders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Recebem recompensas de staking
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Participam da governança
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Beneficiam-se da valorização
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-amber-400" />
              Staking Pools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Geram rendimentos
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Fornecem liquidez
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Estabilizam o preço
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-400" />
              Treasury
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Financia desenvolvimento
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Suporta marketing
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Reserva de emergência
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Fluxo de Valor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <div className="font-semibold mb-1">1. Taxas de Transação</div>
                <div className="text-sm text-muted-foreground">0.3% de cada transação</div>
              </div>
              <ArrowRight className="h-5 w-5 text-amber-400 shrink-0" />
              <div className="flex-1 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <div className="font-semibold mb-1">2. Distribuição</div>
                <div className="text-sm text-muted-foreground">50% queima, 30% staking, 20% treasury</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <div className="font-semibold mb-1">3. Staking Rewards</div>
                <div className="text-sm text-muted-foreground">Distribuídos proporcionalmente</div>
              </div>
              <ArrowRight className="h-5 w-5 text-amber-400 shrink-0" />
              <div className="flex-1 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <div className="font-semibold mb-1">4. Reinvestimento</div>
                <div className="text-sm text-muted-foreground">Holders podem reinvestir ou sacar</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-12">
        <img 
          src="/assets/generated/staking-pool-diagram.dim_600x400.png" 
          alt="Staking Pool Diagram" 
          className="w-full rounded-lg border border-amber-500/20 shadow-lg"
        />
      </div>

      <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
        <CardHeader>
          <CardTitle>Sustentabilidade do Modelo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            O Quantum Yield foi projetado para ser sustentável a longo prazo, equilibrando recompensas 
            atrativas com mecanismos de controle de inflação:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
              <div>
                <strong className="text-amber-400">Queima Deflacionária:</strong> Redução constante do supply através de queimas automáticas
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
              <div>
                <strong className="text-amber-400">Ajuste Dinâmico:</strong> APY ajustado automaticamente baseado na taxa de participação
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
              <div>
                <strong className="text-amber-400">Diversificação de Receitas:</strong> Múltiplas fontes de receita para o treasury
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
