import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface Planet {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  offsetY: number;
}

interface Comet {
  x: number;
  y: number;
  speed: number;
  length: number;
  active: boolean;
}

interface Coin {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'qmy' | 'icp';
  scale: number;
  rotation: number;
  driftX: number;
}

export default function HomeSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const cometsRef = useRef<Comet[]>([]);
  const coinsRef = useRef<Coin[]>([]);
  const lastCometTimeRef = useRef<number>(0);
  const lastCoinTimeRef = useRef<number>(0);
  const qmyImageRef = useRef<HTMLImageElement | null>(null);
  const icpImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Preload golden coin images
    const qmyImg = new Image();
    qmyImg.src = '/assets/generated/qmy-coin-gold.dim_128x128.png';
    qmyImageRef.current = qmyImg;

    const icpImg = new Image();
    icpImg.src = '/assets/generated/icp-coin-gold.dim_128x128.png';
    icpImageRef.current = icpImg;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars (120 stars for richer background)
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 120; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.15 + 0.05,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    };

    // Initialize planets (6 planets with gold/dark tones)
    const initPlanets = () => {
      planetsRef.current = [];
      const colors = ['#2D2000', '#1A1500', '#3D3000', '#4A3800', '#1E1800', '#2A2000'];
      for (let i = 0; i < 6; i++) {
        planetsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 55 + 25,
          speed: Math.random() * 0.06 + 0.02,
          color: colors[Math.floor(Math.random() * colors.length)],
          offsetY: 0,
        });
      }
    };

    // Initialize comets (3 comets)
    const initComets = () => {
      cometsRef.current = [];
      for (let i = 0; i < 3; i++) {
        cometsRef.current.push({
          x: -100,
          y: -100,
          speed: 0,
          length: 0,
          active: false,
        });
      }
    };

    initStars();
    initPlanets();
    initComets();

    // Animation loop
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;

      // Clear canvas with deep space background
      ctx.fillStyle = 'rgba(0, 0, 5, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with gentle twinkling
      starsRef.current.forEach((star) => {
        star.opacity += star.speed * (Math.random() > 0.5 ? 1 : -1);
        if (star.opacity > 1) star.opacity = 1;
        if (star.opacity < 0.2) star.opacity = 0.2;

        ctx.fillStyle = `rgba(255, 255, 220, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw planets with gentle floating motion
      planetsRef.current.forEach((planet) => {
        planet.offsetY += planet.speed;
        if (planet.offsetY > 10) planet.offsetY = -10;

        // Planet body
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y + planet.offsetY, planet.size, 0, Math.PI * 2);
        ctx.fill();

        // Planet ring glow (gold tint)
        const ringGrad = ctx.createRadialGradient(
          planet.x, planet.y + planet.offsetY, planet.size * 0.7,
          planet.x, planet.y + planet.offsetY, planet.size * 1.3
        );
        ringGrad.addColorStop(0, 'rgba(255,215,0,0.08)');
        ringGrad.addColorStop(1, 'rgba(255,215,0,0)');
        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y + planet.offsetY, planet.size * 1.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      });

      // Spawn occasional comets (every 8-14 seconds)
      if (timestamp - lastCometTimeRef.current > 8000 + Math.random() * 6000) {
        const inactiveComet = cometsRef.current.find((c) => !c.active);
        if (inactiveComet) {
          inactiveComet.x = Math.random() * canvas.width;
          inactiveComet.y = -50;
          inactiveComet.speed = Math.random() * 2.5 + 1.5;
          inactiveComet.length = Math.random() * 80 + 50;
          inactiveComet.active = true;
          lastCometTimeRef.current = timestamp;
        }
      }

      // Draw comets
      cometsRef.current.forEach((comet) => {
        if (!comet.active) return;

        comet.x += comet.speed * 0.6;
        comet.y += comet.speed;

        if (comet.y > canvas.height + 100) {
          comet.active = false;
        }

        const gradient = ctx.createLinearGradient(
          comet.x - comet.length * 0.3,
          comet.y - comet.length,
          comet.x,
          comet.y
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(255, 240, 180, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(comet.x - comet.length * 0.3, comet.y - comet.length);
        ctx.lineTo(comet.x, comet.y);
        ctx.stroke();

        // Comet head glow
        const headGlow = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 6);
        headGlow.addColorStop(0, 'rgba(255, 255, 200, 1)');
        headGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn floating golden coins (every 2-4 seconds, max 10 coins)
      if (
        timestamp - lastCoinTimeRef.current > 2000 + Math.random() * 2000 &&
        coinsRef.current.length < 10
      ) {
        coinsRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 60,
          size: 28,
          speed: Math.random() * 0.6 + 0.3,
          opacity: 0,
          type: Math.random() > 0.5 ? 'qmy' : 'icp',
          scale: 0.4,
          rotation: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.4,
        });
        lastCoinTimeRef.current = timestamp;
      }

      // Draw floating golden coins
      coinsRef.current = coinsRef.current.filter((coin) => {
        coin.y -= coin.speed;
        coin.x += coin.driftX;
        coin.scale = Math.min(1.2, coin.scale + 0.003);
        coin.rotation += 0.015;

        // Fade in at bottom, fade out near top
        if (coin.y > canvas.height * 0.7) {
          coin.opacity = Math.min(0.9, coin.opacity + 0.03);
        } else if (coin.y < canvas.height * 0.2) {
          coin.opacity = Math.max(0, coin.opacity - 0.015);
        }

        if (coin.opacity <= 0 && coin.y < canvas.height * 0.2) {
          return false;
        }
        if (coin.y < -100) {
          return false;
        }

        ctx.save();
        ctx.globalAlpha = coin.opacity;
        ctx.translate(coin.x, coin.y);
        ctx.rotate(coin.rotation);
        ctx.scale(coin.scale, coin.scale);

        const img = coin.type === 'qmy' ? qmyImageRef.current : icpImageRef.current;
        if (img && img.complete && img.naturalWidth > 0) {
          // Golden glow behind coin
          const glowGrad = ctx.createRadialGradient(0, 0, coin.size * 0.3, 0, 0, coin.size * 1.5);
          glowGrad.addColorStop(0, 'rgba(255, 215, 0, 0.35)');
          glowGrad.addColorStop(1, 'rgba(255, 165, 0, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(0, 0, coin.size * 1.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.drawImage(img, -coin.size, -coin.size, coin.size * 2, coin.size * 2);
        } else {
          // Fallback golden circle
          const coinColor = coin.type === 'qmy' ? '#FFD700' : '#29ABE2';
          const fallbackGrad = ctx.createRadialGradient(-coin.size * 0.3, -coin.size * 0.3, 0, 0, 0, coin.size);
          fallbackGrad.addColorStop(0, '#FFF0A0');
          fallbackGrad.addColorStop(0.5, coinColor);
          fallbackGrad.addColorStop(1, '#B8860B');
          ctx.fillStyle = fallbackGrad;
          ctx.beginPath();
          ctx.arc(0, 0, coin.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.font = `bold ${coin.size * 0.7}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(coin.type === 'qmy' ? 'Q' : 'I', 0, 0);
        }

        ctx.restore();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
