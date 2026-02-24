import { useEffect, useState, useRef } from 'react';

interface DetectionResult {
  detected: boolean;
  confidence: number;
  lastUpdate: number;
}

export function usePrototypeDetection(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isActive: boolean
) {
  const [result, setResult] = useState<DetectionResult>({
    detected: false,
    confidence: 0,
    lastUpdate: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameDataRef = useRef<Uint8ClampedArray | null>(null);

  useEffect(() => {
    if (!isActive || !videoRef.current) {
      setResult({ detected: false, confidence: 0, lastUpdate: Date.now() });
      return;
    }

    // Create hidden canvas for frame sampling
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
      canvasRef.current.width = 160;
      canvasRef.current.height = 120;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let frameCount = 0;

    const detectFrame = () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) {
        animationFrameRef.current = requestAnimationFrame(detectFrame);
        return;
      }

      frameCount++;
      
      // Sample every 10 frames (~3 times per second at 30fps)
      if (frameCount % 10 !== 0) {
        animationFrameRef.current = requestAnimationFrame(detectFrame);
        return;
      }

      try {
        // Draw current frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple motion/change detection
        let changeScore = 0;
        if (lastFrameDataRef.current) {
          const prev = lastFrameDataRef.current;
          let totalDiff = 0;
          const sampleStep = 4; // Sample every 4th pixel for performance
          
          for (let i = 0; i < data.length; i += sampleStep * 4) {
            const rDiff = Math.abs(data[i] - prev[i]);
            const gDiff = Math.abs(data[i + 1] - prev[i + 1]);
            const bDiff = Math.abs(data[i + 2] - prev[i + 2]);
            totalDiff += (rDiff + gDiff + bDiff) / 3;
          }
          
          const avgDiff = totalDiff / (data.length / (sampleStep * 4));
          changeScore = Math.min(avgDiff / 50, 1); // Normalize to 0-1
        }

        // Calculate brightness variance (simple object presence indicator)
        let brightness = 0;
        for (let i = 0; i < data.length; i += 4) {
          brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
        const avgBrightness = brightness / (data.length / 4);
        
        // Variance calculation
        let variance = 0;
        for (let i = 0; i < data.length; i += 4) {
          const pixelBrightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          variance += Math.pow(pixelBrightness - avgBrightness, 2);
        }
        variance = variance / (data.length / 4);
        const varianceScore = Math.min(variance / 5000, 1); // Normalize

        // Combine scores (motion + variance)
        const confidence = (changeScore * 0.6 + varianceScore * 0.4);
        const detected = confidence > 0.3; // Threshold for "detection"

        setResult({
          detected,
          confidence: Math.round(confidence * 100) / 100,
          lastUpdate: Date.now(),
        });

        // Store current frame for next comparison
        lastFrameDataRef.current = new Uint8ClampedArray(data);
      } catch (err) {
        console.warn('Detection frame processing error:', err);
      }

      animationFrameRef.current = requestAnimationFrame(detectFrame);
    };

    animationFrameRef.current = requestAnimationFrame(detectFrame);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, videoRef]);

  return result;
}
