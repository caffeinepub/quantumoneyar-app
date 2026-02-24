import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Database, Lock } from 'lucide-react';

export default function TechnicalAppendix() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Apêndice Técnico
        </h1>
        <p className="text-lg text-muted-foreground">
          Especificações técnicas e fórmulas
        </p>
      </div>

      <div className="mb-12">
        <img 
          src="/assets/generated/technical-background.dim_1000x700.jpg" 
          alt="Technical Background" 
          className="w-full rounded-lg border border-amber-500/20 shadow-lg opacity-50"
        />
      </div>

      <Tabs defaultValue="formulas" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="formulas">Fórmulas</TabsTrigger>
          <TabsTrigger value="specs">Especificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="formulas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-amber-400" />
                Fórmulas Matemáticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <h3 className="font-semibold mb-3">Cálculo de Staking Rewards</h3>
                <div className="bg-background p-4 rounded border border-amber-500/20 font-mono text-sm mb-2">
                  R = (S × APY × T) / 365
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Onde:</p>
                  <p>• R = Recompensa diária</p>
                  <p>• S = Quantidade em staking</p>
                  <p>• APY = Taxa anual de rendimento</p>
                  <p>• T = Tempo em dias</p>
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <h3 className="font-semibold mb-3">Taxa de Queima</h3>
                <div className="bg-background p-4 rounded border border-amber-500/20 font-mono text-sm mb-2">
                  B = (F × 0.5) + (E × 0.02)
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Onde:</p>
                  <p>• B = Tokens queimados</p>
                  <p>• F = Total de taxas coletadas</p>
                  <p>• E = Reserva do ecossistema</p>
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <h3 className="font-semibold mb-3">Poder de Voto</h3>
                <div className="bg-background p-4 rounded border border-amber-500/20 font-mono text-sm mb-2">
                  V = (Q × M) / T
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Onde:</p>
                  <p>• V = Poder de voto</p>
                  <p>• Q = Quantidade de tokens em staking</p>
                  <p>• M = Multiplicador de tempo (1-2x)</p>
                  <p>• T = Total de tokens em staking</p>
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <h3 className="font-semibold mb-3">APY Dinâmico</h3>
                <div className="bg-background p-4 rounded border border-amber-500/20 font-mono text-sm mb-2">
                  APY = BASE_APY × (1 - (S / MAX_S) × 0.5)
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Onde:</p>
                  <p>• BASE_APY = 18% (taxa base)</p>
                  <p>• S = Total em staking</p>
                  <p>• MAX_S = Supply máximo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-amber-400" />
                Especificações Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2">Blockchain</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Plataforma: Internet Computer</p>
                    <p>• Consenso: Chain Key Technology</p>
                    <p>• Finalidade: 2 segundos</p>
                    <p>• TPS: 1.000.000+</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2">Smart Contracts</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Linguagem: Motoko</p>
                    <p>• Padrão: ICRC-1/ICRC-2</p>
                    <p>• Upgradeable: Sim</p>
                    <p>• Auditado: Sim</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2">Token</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Nome: Quantumoney</p>
                    <p>• Símbolo: QMY</p>
                    <p>• Decimais: 8</p>
                    <p>• Supply: 1.000.000.000</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <h3 className="font-semibold mb-2">Performance</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Latência: &lt;100ms</p>
                    <p>• Taxa de sucesso: 99.99%</p>
                    <p>• Uptime: 99.9%</p>
                    <p>• Custo/tx: $0.0001</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-amber-400" />
                Segurança e Auditorias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <h3 className="font-semibold mb-3">Auditorias Realizadas</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-background border border-amber-500/20 rounded">
                    <span className="text-sm">Auditoria de Smart Contracts</span>
                    <span className="text-xs text-green-500">✓ Aprovado</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background border border-amber-500/20 rounded">
                    <span className="text-sm">Análise de Segurança</span>
                    <span className="text-xs text-green-500">✓ Aprovado</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background border border-amber-500/20 rounded">
                    <span className="text-sm">Teste de Penetração</span>
                    <span className="text-xs text-green-500">✓ Aprovado</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <h3 className="font-semibold mb-3">Medidas de Segurança</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>Multi-signature para operações críticas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>Timelock para atualizações de contratos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>Rate limiting para prevenir ataques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>Monitoramento 24/7 de transações suspeitas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>Bug bounty program com recompensas até $100k</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Dados de Simulação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-500/20">
                  <th className="text-left p-3">Cenário</th>
                  <th className="text-right p-3">Usuários</th>
                  <th className="text-right p-3">TPS</th>
                  <th className="text-right p-3">Latência</th>
                  <th className="text-right p-3">Custo/tx</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-amber-500/10">
                  <td className="p-3">Baixa Carga</td>
                  <td className="text-right p-3">1.000</td>
                  <td className="text-right p-3">100</td>
                  <td className="text-right p-3">50ms</td>
                  <td className="text-right p-3">$0.00005</td>
                </tr>
                <tr className="border-b border-amber-500/10">
                  <td className="p-3">Carga Média</td>
                  <td className="text-right p-3">100.000</td>
                  <td className="text-right p-3">10.000</td>
                  <td className="text-right p-3">80ms</td>
                  <td className="text-right p-3">$0.0001</td>
                </tr>
                <tr className="border-b border-amber-500/10">
                  <td className="p-3">Alta Carga</td>
                  <td className="text-right p-3">1.000.000</td>
                  <td className="text-right p-3">100.000</td>
                  <td className="text-right p-3">120ms</td>
                  <td className="text-right p-3">$0.00015</td>
                </tr>
                <tr>
                  <td className="p-3">Pico Extremo</td>
                  <td className="text-right p-3">10.000.000</td>
                  <td className="text-right p-3">1.000.000</td>
                  <td className="text-right p-3">200ms</td>
                  <td className="text-right p-3">$0.0002</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
        <CardHeader>
          <CardTitle>Recursos Adicionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-background border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">Documentação Técnica</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Acesse nossa documentação completa para desenvolvedores
              </p>
              <div className="text-xs text-amber-400">docs.quantumoney.io</div>
            </div>
            <div className="p-4 bg-background border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Código-fonte aberto e transparente
              </p>
              <div className="text-xs text-amber-400">github.com/quantumoney</div>
            </div>
            <div className="p-4 bg-background border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">API Reference</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Integre o QMY em suas aplicações
              </p>
              <div className="text-xs text-amber-400">api.quantumoney.io</div>
            </div>
            <div className="p-4 bg-background border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">SDK</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Ferramentas para desenvolvedores
              </p>
              <div className="text-xs text-amber-400">npm install @quantumoney/sdk</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
