import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Target, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const competitorData = [
  { name: 'QMY', marketCap: 50, tps: 1000, fees: 0.0001, score: 95 },
  { name: 'Competitor A', marketCap: 200, tps: 100, fees: 0.01, score: 75 },
  { name: 'Competitor B', marketCap: 150, tps: 500, fees: 0.005, score: 80 },
  { name: 'Competitor C', marketCap: 300, tps: 50, fees: 0.02, score: 70 },
];

const marketGrowth = [
  { year: '2024', defi: 100, metaverse: 80 },
  { year: '2025', defi: 180, metaverse: 150 },
  { year: '2026', defi: 320, metaverse: 280 },
  { year: '2027', defi: 550, metaverse: 480 },
];

export default function MarketAnalysis() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Análise de Mercado
        </h1>
        <p className="text-lg text-muted-foreground">
          Posicionamento competitivo e oportunidades
        </p>
      </div>

      <div className="mb-12">
        <img 
          src="/assets/generated/market-analysis-template.dim_800x600.png" 
          alt="Market Analysis" 
          className="w-full rounded-lg border border-amber-500/20 shadow-lg"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-amber-400" />
              Mercado Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400 mb-1">$2.5T</div>
            <div className="text-sm text-muted-foreground">DeFi + Metaverso 2026</div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-amber-400" />
              Mercado Alvo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400 mb-1">$250B</div>
            <div className="text-sm text-muted-foreground">Segmento acessível</div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5 text-amber-400" />
              Meta de Participação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400 mb-1">1%</div>
            <div className="text-sm text-muted-foreground">$2.5B em 3 anos</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Crescimento do Mercado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 191, 36, 0.1)" />
                <XAxis dataKey="year" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="defi" fill="#f59e0b" name="DeFi ($B)" />
                <Bar dataKey="metaverse" fill="#fbbf24" name="Metaverso ($B)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Análise Competitiva</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Market Cap ($M)</TableHead>
                  <TableHead>TPS</TableHead>
                  <TableHead>Taxas ($)</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitorData.map((competitor) => (
                  <TableRow key={competitor.name} className={competitor.name === 'QMY' ? 'bg-amber-500/5' : ''}>
                    <TableCell className="font-medium">
                      {competitor.name === 'QMY' && (
                        <span className="text-amber-400">{competitor.name}</span>
                      )}
                      {competitor.name !== 'QMY' && competitor.name}
                    </TableCell>
                    <TableCell>{competitor.marketCap}</TableCell>
                    <TableCell>{competitor.tps.toLocaleString()}</TableCell>
                    <TableCell>${competitor.fees}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${competitor.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{competitor.score}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-12 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
        <CardHeader>
          <CardTitle>Vantagens Competitivas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-amber-400">Tecnologia Superior</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>10x mais rápido que concorrentes principais</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Taxas 100x menores</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Escalabilidade ilimitada</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-amber-400">Modelo Econômico</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>APY competitivo e sustentável</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Mecanismos deflacionários</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Governança descentralizada real</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-amber-400">Ecossistema</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Parcerias estratégicas estabelecidas</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Integração com metaversos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Comunidade ativa e engajada</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-amber-400">Experiência do Usuário</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Interface intuitiva e moderna</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Onboarding simplificado</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>Suporte multilíngue</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Oportunidades de Mercado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">Expansão DeFi</h3>
              <p className="text-sm text-muted-foreground">
                O mercado DeFi continua crescendo exponencialmente, com previsão de atingir $1T até 2027. 
                O QMY está posicionado para capturar uma parcela significativa deste crescimento.
              </p>
            </div>
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">Adoção do Metaverso</h3>
              <p className="text-sm text-muted-foreground">
                Com a crescente adoção de mundos virtuais, a demanda por moedas digitais nativas do 
                metaverso está explodindo. O QMY oferece a infraestrutura perfeita para estas economias.
              </p>
            </div>
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <h3 className="font-semibold mb-2">Mercados Emergentes</h3>
              <p className="text-sm text-muted-foreground">
                Países em desenvolvimento estão adotando criptomoedas rapidamente. Nossa estratégia de 
                baixas taxas e alta velocidade é ideal para estes mercados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
