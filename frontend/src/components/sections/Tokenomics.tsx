// Tokenomics section - intentionally untouched for this playability-only patch
// No functional changes made to tokenomics/distribution logic per patch requirements

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function Tokenomics() {
  // Distribution data
  const distributionData = [
    { name: 'Public Sale', value: 40, color: '#FFD700' },
    { name: 'Team & Advisors', value: 20, color: '#B8860B' },
    { name: 'Ecosystem Fund', value: 25, color: '#DAA520' },
    { name: 'Liquidity Pool', value: 10, color: '#F0E68C' },
    { name: 'Reserve', value: 5, color: '#BDB76B' },
  ];

  // Release schedule data
  const releaseData = [
    { month: 'Month 1', tokens: 10 },
    { month: 'Month 3', tokens: 20 },
    { month: 'Month 6', tokens: 35 },
    { month: 'Month 12', tokens: 55 },
    { month: 'Month 18', tokens: 75 },
    { month: 'Month 24', tokens: 90 },
    { month: 'Month 36', tokens: 100 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">
        Tokenomics
      </h1>

      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="release">Release Schedule</TabsTrigger>
          <TabsTrigger value="burn">Burn Mechanism</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-[#FFD700]">Token Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-bold text-[#FFD700]">Distribution Details</h3>
                {distributionData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded">
                    <span className="text-white">{item.name}</span>
                    <span className="text-[#FFD700] font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="release" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-[#FFD700]">Token Release Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={releaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#FFD700" />
                  <YAxis stroke="#FFD700" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #FFD700' }}
                    labelStyle={{ color: '#FFD700' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tokens" 
                    stroke="#FFD700" 
                    strokeWidth={3}
                    dot={{ fill: '#FFD700', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">Vesting Schedule</h3>
                <ul className="space-y-2 text-white">
                  <li>• <strong>Public Sale:</strong> 25% at TGE, linear vesting over 12 months</li>
                  <li>• <strong>Team & Advisors:</strong> 12-month cliff, 24-month linear vesting</li>
                  <li>• <strong>Ecosystem Fund:</strong> Released based on milestones</li>
                  <li>• <strong>Liquidity Pool:</strong> 50% at TGE, remainder over 6 months</li>
                  <li>• <strong>Reserve:</strong> Locked for 24 months, gradual release thereafter</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="burn" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-[#FFD700]">Burn Mechanism</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-black/50 rounded">
                <h3 className="text-lg font-bold text-[#FFD700] mb-2">Transaction Fee Burn</h3>
                <p className="text-white">
                  1% of every transaction is automatically burned, reducing total supply over time.
                </p>
              </div>

              <div className="p-4 bg-black/50 rounded">
                <h3 className="text-lg font-bold text-[#FFD700] mb-2">Quarterly Buyback & Burn</h3>
                <p className="text-white">
                  20% of protocol revenue is used for quarterly token buybacks and burns.
                </p>
              </div>

              <div className="p-4 bg-black/50 rounded">
                <h3 className="text-lg font-bold text-[#FFD700] mb-2">Deflationary Target</h3>
                <p className="text-white">
                  Target: Reduce total supply by 50% over 5 years through systematic burns.
                </p>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-[#FFD700]/20 to-[#B8860B]/20 rounded-lg border border-[#FFD700]">
                <h3 className="text-xl font-bold text-[#FFD700] mb-2">Projected Supply Reduction</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-white/70 text-sm">Year 1</p>
                    <p className="text-[#FFD700] text-2xl font-bold">-10%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-sm">Year 3</p>
                    <p className="text-[#FFD700] text-2xl font-bold">-30%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-sm">Year 5</p>
                    <p className="text-[#FFD700] text-2xl font-bold">-50%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-sm">Year 10</p>
                    <p className="text-[#FFD700] text-2xl font-bold">-70%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
