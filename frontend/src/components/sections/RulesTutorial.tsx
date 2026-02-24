import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, Coins, Camera, Map, Shield, Star } from 'lucide-react';

export default function RulesTutorial() {
  const [tab, setTab] = useState('basics');

  return (
    <div className="min-h-0 bg-black text-white pb-24 px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-5">
          <img
            src="/assets/generated/rules-tutorial-header.dim_600x200.png"
            alt="Rules"
            className="w-full max-w-xs mx-auto rounded-xl mb-3 opacity-80"
          />
          <h1 className="text-2xl font-bold text-yellow-400">How to Play</h1>
          <p className="text-gray-400 text-sm mt-1">Learn the Quantumoney AR game</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full bg-gray-900 border border-gray-700 mb-4 grid grid-cols-3">
            <TabsTrigger value="basics" className="text-xs">Basics</TabsTrigger>
            <TabsTrigger value="coins" className="text-xs">QMY Coins</TabsTrigger>
            <TabsTrigger value="ar" className="text-xs">AR Camera</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-3">
            {[
              { icon: <BookOpen size={18} className="text-yellow-400" />, title: 'Getting Started', desc: 'Login with Internet Identity to receive your 1,000 QMY welcome bonus. 100 QMY are immediately available to play.' },
              { icon: <Map size={18} className="text-blue-400" />, title: 'Explore the Map', desc: 'Use the map to find QMY coins and monsters near your location. Walk to them to interact.' },
              { icon: <Star size={18} className="text-purple-400" />, title: 'Earn XP', desc: 'Lock coins (+10 XP), capture monsters (+20 XP), and walk to earn experience points.' },
              { icon: <Shield size={18} className="text-green-400" />, title: 'Safety First', desc: 'Always be aware of your surroundings. Never trespass or put yourself in danger.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 flex gap-3">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="coins" className="space-y-3">
            {[
              { icon: <Coins size={18} className="text-yellow-400" />, title: 'Welcome Bonus', desc: '1,000 QMY on first login: 100 unlocked immediately + 900 locked with monthly vesting (100 QMY every 30 days for 9 months).' },
              { icon: <Coins size={18} className="text-green-400" />, title: 'Lock Coins', desc: 'Use the AR camera to lock QMY coins you find. Each lock costs 1 QMY and earns +10 XP.' },
              { icon: <Coins size={18} className="text-blue-400" />, title: 'Unlock Coins', desc: 'Unlock coins after 30 days to earn +2 QMY reward. Unlocking costs 15 XP.' },
              { icon: <Coins size={18} className="text-purple-400" />, title: 'Vesting Schedule', desc: 'Your 900 locked QMY unlock automatically: 100 QMY every 30 days over 9 months.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 flex gap-3">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="ar" className="space-y-3">
            {[
              { icon: <Camera size={18} className="text-yellow-400" />, title: 'Open AR Camera', desc: 'Tap the AR Camera button in the bottom navigation. Allow camera and location permissions.' },
              { icon: <Camera size={18} className="text-green-400" />, title: 'Find Coins', desc: 'Point your camera around to see QMY coins in AR. Gold coins are available, grey coins are already locked.' },
              { icon: <Camera size={18} className="text-blue-400" />, title: 'Lock a Coin', desc: 'When a coin is visible, tap the Lock button. You need at least 1 QMY unlocked balance.' },
              { icon: <Camera size={18} className="text-purple-400" />, title: 'Capture Monsters', desc: 'Rare monsters appear in AR. Capture them to earn XP and add them to your collection.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 flex gap-3">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
