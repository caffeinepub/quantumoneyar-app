import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function VisualSimulationNotice() {
  return (
    <Alert className="bg-amber-500/10 border-amber-500/30">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertDescription className="text-sm text-white/80">
        <strong>Visual Simulation / Placeholder:</strong> This screen displays visual-only data for demonstration purposes. 
        No real cryptocurrency transactions or wallet connections are executed. 
        Fully compliant with Google Play and Apple App Store guidelines.
      </AlertDescription>
    </Alert>
  );
}
