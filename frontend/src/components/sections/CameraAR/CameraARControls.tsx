import { Button } from '@/components/ui/button';
import { Camera, CameraOff } from 'lucide-react';

interface CameraARControlsProps {
  cameraActive: boolean;
  cameraLoading: boolean;
  onStartCamera: () => void;
  onStopCamera: () => void;
}

export function CameraARControls({
  cameraActive,
  cameraLoading,
  onStartCamera,
  onStopCamera,
}: CameraARControlsProps) {
  return (
    <div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-4"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0px)' }}
    >
      {!cameraActive ? (
        <Button
          onClick={onStartCamera}
          disabled={cameraLoading}
          className="bg-[#FFD700] text-black hover:bg-[#D4AF37] px-8 py-6 text-lg font-bold rounded-full shadow-lg"
        >
          <Camera className="h-6 w-6 mr-2" />
          {cameraLoading ? 'Starting...' : 'Start Camera'}
        </Button>
      ) : (
        <Button
          onClick={onStopCamera}
          disabled={cameraLoading}
          variant="destructive"
          className="px-8 py-6 text-lg font-bold rounded-full shadow-lg"
        >
          <CameraOff className="h-6 w-6 mr-2" />
          Stop Camera
        </Button>
      )}
    </div>
  );
}
