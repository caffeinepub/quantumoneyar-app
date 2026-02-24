import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, TrendingUp, Copy, CheckCircle, Database, PieChart as PieChartIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useState } from 'react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

// Quantumoney Build 205 - Dedicated Vesting Page with Professional Design
const CANISTER_IDS = {
  GAME: 'ippxc-5iaaa-aaaae-qgwqq-cai',
  DAO: 'x5shd-hqaaa-aaaap-qrdgq-cai',
} as const;

const VESTING_CONFIG = {
  TOTAL_VESTING: 700_000_000n,
  ALREADY_UNLOCKED: 100_000_000n,
  NEXT_UNLOCK_DATE: '2026-02-20',
  NEXT_UNLOCK_AMOUNT: 50_000_000n,
  PROGRESS_PERCENT: 14,
} as const;

const LUXURY_GOLD_PALETTE = {
  LOCKED: '#CD853F',
  UNLOCKED: '#22c55e',
  PENDING: '#FFD700',
} as const;

export default function Vesting() {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    toast.success('Hash copiado!');
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const copyCanisterId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Copiado!', {
      description: 'ID do canister copiado',
    });
  };

  // Vesting data: 700M QMY total, 100M already unlocked, 14% progress
  const vestingUnlocks = [
    { date: '2026-02-20', amount: 50_000_000, percent: 21.43, remaining: '30 dias', hash: '0x1a2b3c4d...', status: 'pending' },
    { date: '2026-03-20', amount: 50_000_000, percent: 28.57, remaining: '60 dias', hash: '0x2b3c4d5e...', status: 'pending' },
    { date: '2026-04-20', amount: 50_000_000, percent: 35.71, remaining: '90 dias', hash: '0x3c4d5e6f...', status: 'pending' },
    { date: '2026-05-20', amount: 50_000_000, percent: 42.86, remaining: '120 dias', hash: '0x4d5e6f7g...', status: 'pending' },
    { date: '2026-06-20', amount: 50_000_000, percent: 50.00, remaining: '150 dias', hash: '0x5e6f7g8h...', status: 'pending' },
    { date: '2026-07-20', amount: 50_000_000, percent: 57.14, remaining: '180 dias', hash: '0x6f7g8h9i...', status: 'pending' },
    { date: '2026-08-20', amount: 50_000_000, percent: 64.29, remaining: '210 dias', hash: '0x7g8h9i0j...', status: 'pending' },
    { date: '2026-09-20', amount: 50_000_000, percent: 71.43, remaining: '240 dias', hash: '0x8h9i0j1k...', status: 'pending' },
    { date: '2026-10-20', amount: 50_000_000, percent: 78.57, remaining: '270 dias', hash: '0x9i0j1k2l...', status: 'pending' },
    { date: '2026-11-20', amount: 50_000_000, percent: 85.71, remaining: '300 dias', hash: '0xa1b2c3d4...', status: 'pending' },
    { date: '2026-12-20', amount: 50_000_000, percent: 92.86, remaining: '330 dias', hash: '0xb2c3d4e5...', status: 'pending' },
    { date: '2027-01-20', amount: 50_000_000, percent: 100.00, remaining: '360 dias', hash: '0xc3d4e5f6...', status: 'pending' },
  ];

  const progressData = [
    { month: 'Jan', vested: 700_000_000, unlocked: 100_000_000 },
    { month: 'Fev', vested: 700_000_000, unlocked: 150_000_000 },
    { month: 'Mar', vested: 700_000_000, unlocked: 200_000_000 },
    { month: 'Abr', vested: 700_000_000, unlocked: 250_000_000 },
    { month: 'Mai', vested: 700_000_000, unlocked: 300_000_000 },
    { month: 'Jun', vested: 700_000_000, unlocked: 350_000_000 },
    { month: 'Jul', vested: 700_000_000, unlocked: 400_000_000 },
    { month: 'Ago', vested: 700_000_000, unlocked: 450_000_000 },
    { month: 'Set', vested: 700_000_000, unlocked: 500_000_000 },
    { month: 'Out', vested: 700_000_000, unlocked: 550_000_000 },
    { month: 'Nov', vested: 700_000_000, unlocked: 600_000_000 },
    { month: 'Dez', vested: 700_000_000, unlocked: 650_000_000 },
    { month: 'Jan 27', vested: 700_000_000, unlocked: 700_000_000 },
  ];

  const distributionData = [
    { name: 'Bloqueado', value: 600_000_000, color: LUXURY_GOLD_PALETTE.LOCKED },
    { name: 'Desbloqueado', value: 100_000_000, color: LUXURY_GOLD_PALETTE.UNLOCKED },
  ];

  const monthlyUnlockData = vestingUnlocks.map(unlock => ({
    month: unlock.date.slice(5, 7) + '/' + unlock.date.slice(0, 4),
    amount: unlock.amount / 1_000_000,
  }));

  if (!identity) {
    return (
      <div className="w-full min-h-screen p-4 space-y-6 golden-paper-bg safe-top safe-bottom" style={{ paddingBottom: '120px', maxHeight: '88vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <Card className="max-w-md mx-auto bg-black/80 border-black">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-[#D4AF37]/10">
                <Clock className="h-16 w-16 text-[#FFD700]" />
              </div>
            </div>
            <CardTitle className="text-[#FFD700]">Login Necessário</CardTitle>
            <CardDescription className="text-white/80">
              Conecte sua carteira para visualizar seu cronograma de vesting
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const totalVested = Number(VESTING_CONFIG.TOTAL_VESTING);
  const totalUnlocked = Number(VESTING_CONFIG.ALREADY_UNLOCKED);
  const percentUnlocked = VESTING_CONFIG.PROGRESS_PERCENT;
  const nextUnlock = VESTING_CONFIG.NEXT_UNLOCK_DATE;
  const nextUnlockAmount = Number(VESTING_CONFIG.NEXT_UNLOCK_AMOUNT);

  return (
    <div className="w-full min-h-screen p-4 space-y-8 golden-paper-bg safe-top safe-bottom" style={{ paddingBottom: '120px', maxHeight: '88vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <div className="text-center space-y-4 px-4">
        <div className="flex justify-center mb-4">
          <Clock className="h-20 w-20 md:h-24 md:w-24 text-[#FFD700]" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold break-words text-black">
          Vesting QMY
        </h1>
        <p className="text-base md:text-xl text-black/80 max-w-3xl mx-auto break-words">
          Cronograma Detalhado de Desbloqueio de Tokens
        </p>
      </div>

      {/* Canister IDs */}
      <Card className="bg-black/80 border-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg text-[#FFD700]">
            <Database className="h-5 w-5 shrink-0" />
            <span className="break-words">Informações dos Canisters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#FFD700] break-words">Game Canister ID</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <code className="flex-1 min-w-0 px-3 py-2 bg-black rounded text-xs md:text-sm font-mono break-all text-[#FFD700] border border-[#FFD700]">
                  {CANISTER_IDS.GAME}
                </code>
                <Button size="icon" variant="outline" onClick={() => copyCanisterId(CANISTER_IDS.GAME)} className="shrink-0 border-[#FFD700] text-[#FFD700]">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#FFD700] break-words">DAO Canister ID</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <code className="flex-1 min-w-0 px-3 py-2 bg-black rounded text-xs md:text-sm font-mono break-all text-[#FFD700] border border-[#FFD700]">
                  {CANISTER_IDS.DAO}
                </code>
                <Button size="icon" variant="outline" onClick={() => copyCanisterId(CANISTER_IDS.DAO)} className="shrink-0 border-[#FFD700] text-[#FFD700]">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black/80 border-black">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-[#FFD700]">Total em Vesting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">700M QMY</div>
            <p className="text-xs text-white/60 mt-1">700 milhões de tokens QMY (70%)</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-black">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-[#FFD700]">Já Desbloqueado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-green-400">100M QMY</div>
            <p className="text-xs text-white/60 mt-1">{percentUnlocked}% liberado (10%)</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-black">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-[#FFD700]">Próximo Desbloqueio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-400">{nextUnlock}</div>
            <p className="text-xs text-white/60 mt-1">{nextUnlockAmount / 1_000_000}M QMY serão liberados</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="bg-black/80 border-black">
        <CardHeader>
          <CardTitle className="text-[#FFD700]">Progresso de Desbloqueio</CardTitle>
          <CardDescription className="text-white/80">
            Progresso cumulativo de desbloqueio ao longo de 12 meses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Desbloqueado</span>
              <span className="text-[#FFD700] font-bold">{percentUnlocked}%</span>
            </div>
            <Progress value={percentUnlocked} className="h-3" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/80">Total Vested:</span>
              <span className="ml-2 text-[#FFD700] font-bold">700M QMY</span>
            </div>
            <div>
              <span className="text-white/80">Desbloqueio Mensal:</span>
              <span className="ml-2 text-green-400 font-bold">50M QMY</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribution Pie Chart */}
      <Card className="bg-black/80 border-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#FFD700]">
            <PieChartIcon className="h-5 w-5" />
            Distribuição Bloqueado vs Desbloqueado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #FFD700', borderRadius: '8px' }}
                labelStyle={{ color: '#FFD700' }}
                formatter={(value: number) => `${(value / 1_000_000).toFixed(1)}M QMY`}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="square" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Progress Line Chart */}
      <Card className="bg-black/80 border-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#FFD700]">
            <TrendingUp className="h-5 w-5" />
            Progresso de Vesting ao Longo do Tempo
          </CardTitle>
          <CardDescription className="text-white/80">Total vested vs desbloqueado ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D4AF37" opacity={0.1} />
              <XAxis dataKey="month" stroke="#D4AF37" />
              <YAxis stroke="#D4AF37" tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0A0A0A', 
                  border: '1px solid #D4AF37',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => `${(value / 1_000_000).toFixed(1)}M QMY`}
              />
              <Legend />
              <Line type="monotone" dataKey="vested" stroke="#FFD700" strokeWidth={2} name="Total Vested" />
              <Line type="monotone" dataKey="unlocked" stroke="#22c55e" strokeWidth={2} name="Desbloqueado" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Unlock Bar Chart */}
      <Card className="bg-black/80 border-black">
        <CardHeader>
          <CardTitle className="text-[#FFD700]">Desbloqueios Mensais</CardTitle>
          <CardDescription className="text-white/80">50M QMY desbloqueados a cada mês</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyUnlockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D4AF37" opacity={0.1} />
              <XAxis dataKey="month" stroke="#D4AF37" />
              <YAxis stroke="#D4AF37" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0A0A0A', 
                  border: '1px solid #D4AF37',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => `${value}M QMY`}
              />
              <Bar dataKey="amount" fill="#FFD700" name="QMY Desbloqueado" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vesting Schedule Table */}
      <Card className="bg-black/80 border-black">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-[#FFD700]">
                <Clock className="h-5 w-5" />
                Cronograma de Desbloqueio
              </CardTitle>
              <CardDescription className="text-white/80">12 períodos de desbloqueio mensal de 50M QMY</CardDescription>
            </div>
            <Button 
              disabled={totalUnlocked === 0}
              className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black font-bold"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Reivindicar Desbloqueado
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-[#FFD700]/30 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/10 border-[#FFD700]/30">
                    <TableHead className="text-[#FFD700]">Data de Desbloqueio</TableHead>
                    <TableHead className="text-[#FFD700]">Quantidade QMY</TableHead>
                    <TableHead className="text-[#FFD700]">% Liberado</TableHead>
                    <TableHead className="text-[#FFD700]">Tempo Restante</TableHead>
                    <TableHead className="text-[#FFD700]">TX Hash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vestingUnlocks.map((unlock, index) => (
                    <TableRow key={index} className="border-[#FFD700]/20">
                      <TableCell className="font-medium text-white">{unlock.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/40">
                          {(unlock.amount / 1_000_000).toFixed(0)}M QMY
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">{unlock.percent.toFixed(2)}%</TableCell>
                      <TableCell className="text-white/80">{unlock.remaining}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(unlock.hash, `hash-${index}`)}
                          className="gap-2 text-blue-400 hover:text-blue-300"
                        >
                          {copiedHash === `hash-${index}` ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                          <span className="font-mono text-xs">{unlock.hash}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
