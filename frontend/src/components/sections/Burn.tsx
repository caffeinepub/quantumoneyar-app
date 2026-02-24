import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Flame, TrendingDown, Copy, CheckCircle, AlertTriangle, Database } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';
import { toast } from 'sonner';

const CANISTER_IDS = {
  GAME: 'ippxc-5iaaa-aaaae-qgwqq-cai',
  DAO: 'x5shd-hqaaa-aaaap-qrdgq-cai',
} as const;

const QMY_TOKEN_SUPPLY = {
  MAX_SUPPLY: 1_000_000_000n,
  GEOGRAPHIC_DISTRIBUTION: 200_000_000n,
} as const;

// Mock economic metrics for visual display
const MOCK_METRICS = {
  burnedAmount: 85000,
  plantedAmount: 1200000,
  redeemedAmount: 450000,
  registrationCount: 1247,
};

export default function Burn() {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const [burnAmount, setBurnAmount] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const isAdmin = false;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    toast.success('Hash copiado!');
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const copyCanisterId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Copied!', { description: 'Canister ID copied to clipboard' });
  };

  const burnHistory = [
    { date: '2025-01-15', amount: 50000, reason: 'Queima Trimestral', hash: '0xabc123...' },
    { date: '2025-01-10', amount: 25000, reason: 'Queima de Penalidade', hash: '0xdef456...' },
    { date: '2025-01-05', amount: 10000, reason: 'Queima Manual', hash: '0xghi789...' },
  ];

  const totalSupply = Number(QMY_TOKEN_SUPPLY.MAX_SUPPLY);
  const burnedAmount = MOCK_METRICS.burnedAmount;
  const currentSupply = totalSupply - burnedAmount;
  const deflationPercent = totalSupply > 0 ? ((burnedAmount / totalSupply) * 100).toFixed(2) : '0.00';
  const burnsToday = 1;

  const burnByType = [
    { name: 'Queima Trimestral', value: 50000, color: '#ef4444' },
    { name: 'Penalidade', value: 25000, color: '#f97316' },
    { name: 'Manual', value: 10000, color: '#dc2626' },
  ];

  const burnTimeline = [
    { month: 'Jan', burned: 85000, supply: totalSupply - 85000 },
    { month: 'Fev', burned: 85000, supply: totalSupply - 85000 },
    { month: 'Mar', burned: 85000, supply: totalSupply - 85000 },
  ];

  const handleBurn = () => {
    if (!burnAmount || Number(burnAmount) <= 0) {
      toast.error('Quantidade inválida', { description: 'Digite uma quantidade válida para queimar' });
      return;
    }
    toast.success('Queima executada!', { description: `${burnAmount} QMY foram queimados permanentemente` });
    setBurnAmount('');
  };

  if (!identity) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <Card className="max-w-md glassmorphism-dark border-red-500/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-red-500/10">
                <Flame className="h-16 w-16 text-red-500" />
              </div>
            </div>
            <CardTitle className="text-red-500">Login Necessário</CardTitle>
            <CardDescription className="text-gray-400">
              Conecte sua carteira para visualizar o histórico de queima
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent" style={{ fontFamily: 'Inter, sans-serif' }}>
          Queima de Tokens
        </h1>
        <p className="text-gray-400">Histórico e analytics de queima deflacionária</p>
      </div>

      {/* Canister IDs */}
      <Card className="glassmorphism-dark border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg text-red-500">
            <Database className="h-5 w-5 flex-shrink-0" />
            <span className="break-words">Informações dos Canisters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-400 break-words">Game Canister ID</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <code className="flex-1 min-w-0 px-3 py-2 bg-black/50 rounded text-xs md:text-sm font-mono break-all text-red-400">
                  {CANISTER_IDS.GAME}
                </code>
                <Button size="icon" variant="outline" onClick={() => copyCanisterId(CANISTER_IDS.GAME)} className="flex-shrink-0 border-red-500/30">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-400 break-words">DAO Canister ID</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <code className="flex-1 min-w-0 px-3 py-2 bg-black/50 rounded text-xs md:text-sm font-mono break-all text-red-400">
                  {CANISTER_IDS.DAO}
                </code>
                <Button size="icon" variant="outline" onClick={() => copyCanisterId(CANISTER_IDS.DAO)} className="flex-shrink-0 border-red-500/30">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glassmorphism-dark border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-300">Fornecimento Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-400">{currentSupply.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">QMY em circulação</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism-dark border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-300">Total Queimado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-red-500">{burnedAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">QMY queimados permanentemente</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism-dark border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-300">Deflação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-orange-500">{deflationPercent}%</div>
            <p className="text-xs text-gray-500 mt-1">Do fornecimento total</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism-dark border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-300">Queimas Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-yellow-500">{burnsToday}</div>
            <p className="text-xs text-gray-500 mt-1">Transações de queima</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism-dark border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-500 text-sm">Histórico de Queima</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={burnTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" style={{ fontSize: '12px' }} />
                <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ef4444' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="burned" stroke="#ef4444" strokeWidth={2} name="Queimado" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glassmorphism-dark border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-500 text-sm">Queima por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={burnByType} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {burnByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ef4444', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Burn History Table */}
      <Card className="glassmorphism-dark border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-500 text-sm">Histórico de Queimas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Data</TableHead>
                <TableHead className="text-gray-400">Quantidade</TableHead>
                <TableHead className="text-gray-400">Motivo</TableHead>
                <TableHead className="text-gray-400">Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {burnHistory.map((burn, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-300 text-sm">{burn.date}</TableCell>
                  <TableCell className="text-red-400 font-bold text-sm">{burn.amount.toLocaleString()} QMY</TableCell>
                  <TableCell className="text-gray-300 text-sm">{burn.reason}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(burn.hash, `burn-${index}`)}
                      className="text-gray-400 hover:text-white text-xs"
                    >
                      {copiedHash === `burn-${index}` ? (
                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 mr-1" />
                      )}
                      {burn.hash}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Admin Burn Interface */}
      {isAdmin && (
        <Card className="glassmorphism-dark border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-5 w-5" />
              Admin: Queima Manual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                type="number"
                placeholder="Quantidade de QMY"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
                className="bg-black/50 border-red-500/30 text-white"
              />
              <Button onClick={handleBurn} className="bg-red-600 hover:bg-red-700 text-white">
                <Flame className="h-4 w-4 mr-2" />
                Queimar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
