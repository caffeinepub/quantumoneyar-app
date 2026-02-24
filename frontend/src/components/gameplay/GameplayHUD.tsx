import { Card } from '@/components/ui/card';
import { TrendingUp, Navigation, Eye } from 'lucide-react';

interface GameplayHUDProps {
  xp: number;
  metersWalked: number;
  nearbySpawnsCount: number;
  detectionStatus?: { detected: boolean; confidence: number } | null;
}

export function GameplayHUD({ xp, metersWalked, nearbySpawnsCount, detectionStatus }: GameplayHUDProps) {
  return (
    <div 
      className="fixed top-20 right-4 z-30 pointer-events-auto"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      <Card className="bg-black/80 border-[#FFD700] backdrop-blur-sm p-3 min-w-[140px]">
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-[#FFD700]" />
              <span className="text-gray-400">XP:</span>
            </div>
            <span className="text-[#FFD700] font-bold">{xp}</span>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Navigation className="h-3 w-3 text-blue-400" />
              <span className="text-gray-400">Walk:</span>
            </div>
            <span className="text-white font-bold">{metersWalked}m</span>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <span className="text-gray-400">Nearby:</span>
            </div>
            <span className="text-green-400 font-bold">{nearbySpawnsCount}</span>
          </div>

          {detectionStatus && (
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#FFD700]/20">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-purple-400" />
                <span className="text-gray-400">AR:</span>
              </div>
              <span className={`font-bold ${detectionStatus.detected ? 'text-green-400' : 'text-gray-500'}`}>
                {detectionStatus.detected ? 'ON' : 'OFF'}
              </span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
