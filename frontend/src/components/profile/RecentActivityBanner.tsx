import { Card, CardContent } from '@/components/ui/card';
import { Zap, Star, Gift } from 'lucide-react';

interface RecentActivity {
  type: 'collect' | 'capture' | 'levelup';
  message: string;
  timestamp: number;
}

interface RecentActivityBannerProps {
  activities: RecentActivity[];
}

export function RecentActivityBanner({ activities }: RecentActivityBannerProps) {
  if (activities.length === 0) return null;

  const latestActivity = activities[0];
  const timeSince = Math.floor((Date.now() - latestActivity.timestamp) / 1000);
  
  if (timeSince > 10) return null; // Only show for 10 seconds

  const getIcon = () => {
    switch (latestActivity.type) {
      case 'collect':
        return <Gift className="h-5 w-5 text-[#FFD700]" />;
      case 'capture':
        return <Star className="h-5 w-5 text-purple-400" />;
      case 'levelup':
        return <Zap className="h-5 w-5 text-green-400" />;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-[#FFD700]/20 to-[#D4AF37]/20 border-[#FFD700]/50 animate-slide-in">
      <CardContent className="p-3 flex items-center gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{latestActivity.message}</p>
          <p className="text-xs text-white/60">Just now</p>
        </div>
      </CardContent>
    </Card>
  );
}
