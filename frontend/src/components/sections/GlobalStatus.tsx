import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Coins, Flame } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock economic metrics for visual display
const MOCK_METRICS = {
  burnedAmount: 85000,
  plantedAmount: 1200000,
  redeemedAmount: 450000,
  registrationCount: 1247,
};

export default function GlobalStatus() {
  const { t } = useLanguage();

  const dailyXPData = [
    { day: 'Seg', xp: 12500 },
    { day: 'Ter', xp: 15200 },
    { day: 'Qua', xp: 18900 },
    { day: 'Qui', xp: 16700 },
    { day: 'Sex', xp: 21300 },
    { day: 'Sáb', xp: 25800 },
    { day: 'Dom', xp: 23400 },
  ];

  const qmyDistributionData = [
    { name: 'Disponível', value: 15000000, color: '#22c55e' },
    { name: 'Bloqueado', value: 45000000, color: '#f97316' },
    { name: 'Vesting', value: 90000000, color: '#3b82f6' },
    { name: 'Queimado', value: 5000000, color: '#ef4444' },
  ];

  const topPlayers = [
    { rank: 1, name: 'CryptoMaster', xp: 125000 },
    { rank: 2, name: 'QuantumHunter', xp: 118500 },
    { rank: 3, name: 'TokenCollector', xp: 112300 },
    { rank: 4, name: 'BlockchainPro', xp: 108900 },
    { rank: 5, name: 'ARExplorer', xp: 105600 },
    { rank: 6, name: 'MetaTrader', xp: 102400 },
    { rank: 7, name: 'CoinMiner', xp: 98700 },
    { rank: 8, name: 'DeFiKing', xp: 95300 },
    { rank: 9, name: 'NFTCollector', xp: 92100 },
    { rank: 10, name: 'Web3Pioneer', xp: 89500 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in p-4 sm:p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent" style={{ fontFamily: 'Inter, sans-serif' }}>
          Status Global
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">Estatísticas globais do jogo e ranking de jogadores</p>
      </div>

      {/* Global Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
        <Card className="glassmorphism-dark border-[#D4AF37]/30 hover:border-[#FFD700]/50 transition-all">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              <CardTitle className="text-xs sm:text-sm text-gray-300">Jogadores Registrados</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">
              {MOCK_METRICS.registrationCount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Total de contas criadas</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism-dark border-[#D4AF37]/30 hover:border-[#FFD700]/50 transition-all">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
              <CardTitle className="text-xs sm:text-sm text-gray-300">QMY Plantado</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl sm:text-3xl font-black text-green-400">
              {MOCK_METRICS.plantedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Total de tokens plantados</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism-dark border-[#D4AF37]/30 hover:border-[#FFD700]/50 transition-all">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
              <CardTitle className="text-xs sm:text-sm text-gray-300">QMY Resgatado</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {MOCK_METRICS.redeemedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Total de tokens resgatados</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism-dark border-[#D4AF37]/30 hover:border-[#FFD700]/50 transition-all">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
              <CardTitle className="text-xs sm:text-sm text-gray-300">QMY Queimado</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl sm:text-3xl font-black text-red-400">
              {MOCK_METRICS.burnedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Total de tokens queimados</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-7xl mx-auto">
        <Card className="glassmorphism-dark border-[#D4AF37]/30">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-[#FFD700] text-sm sm:text-base">XP Diário (Últimos 7 dias)</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Evolução do XP ganho pela comunidade</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyXPData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="day" stroke="#888" style={{ fontSize: '12px' }} />
                <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FFD700' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="xp" stroke="#FFD700" strokeWidth={2} name="XP" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glassmorphism-dark border-[#D4AF37]/30">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-[#FFD700] text-sm sm:text-base">Distribuição de QMY</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Status atual dos tokens</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={qmyDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {qmyDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FFD700', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Players Leaderboard */}
      <Card className="glassmorphism-dark border-[#D4AF37]/30 max-w-7xl mx-auto">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-[#FFD700] text-sm sm:text-base">🏆 Top 10 Jogadores</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Ranking por XP acumulado</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-2">
            {topPlayers.map((player) => (
              <div
                key={player.rank}
                className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-black/40 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <Badge
                    variant={player.rank <= 3 ? 'default' : 'outline'}
                    className={`shrink-0 ${
                      player.rank === 1
                        ? 'bg-yellow-500 text-black'
                        : player.rank === 2
                        ? 'bg-gray-400 text-black'
                        : player.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'border-gray-600 text-gray-400'
                    }`}
                  >
                    #{player.rank}
                  </Badge>
                  <span className="text-white font-medium text-sm sm:text-base truncate">{player.name}</span>
                </div>
                <div className="text-[#FFD700] font-bold text-sm sm:text-base shrink-0">
                  {player.xp.toLocaleString()} XP
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
