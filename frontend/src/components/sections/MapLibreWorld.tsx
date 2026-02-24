import StaticWorldMap from './StaticWorldMap';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function MapLibreWorld() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Card className="bg-black/80 border-[#FFD700]">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-[#FFD700] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#FFD700] mb-2">
              Authentication Required
            </h2>
            <p className="text-white">Please login to access the world map</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <StaticWorldMap />;
}
