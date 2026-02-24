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

    // Preload coin images
    const qmyImg = new Image();
    qmyImg.src = '/assets/generated/qmy-coin.dim_128x128.png';
    qmyImageRef.current = qmyImg;

    const icpImg = new Image();
    icpImg.src = '/assets/generated/icp-coin.dim_128x128.png';
    icpImageRef.current = icpImg;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars (100 stars for richer background)
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 100; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.15 + 0.05,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    };

    // Initialize planets (8 planets)
    const initPlanets = () => {
      planetsRef.current = [];
      const colors = ['#4A5568', '#2D3748', '#1A202C', '#718096', '#A0AEC0'];
      for (let i = 0; i < 8; i++) {
        planetsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 50 + 30,
          speed: Math.random() * 0.08 + 0.03,
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

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars with gentle twinkling
      starsRef.current.forEach((star) => {
        star.opacity += star.speed * (Math.random() > 0.5 ? 1 : -1);
        if (star.opacity > 1) star.opacity = 1;
        if (star.opacity < 0.3) star.opacity = 0.3;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw planets with gentle floating motion
      planetsRef.current.forEach((planet) => {
        planet.offsetY += planet.speed;
        if (planet.offsetY > 8) planet.offsetY = -8;

        ctx.fillStyle = planet.color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y + planet.offsetY, planet.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Spawn occasional comets (every 10-15 seconds)
      if (timestamp - lastCometTimeRef.current > 10000 + Math.random() * 5000) {
        const inactiveComet = cometsRef.current.find((c) => !c.active);
        if (inactiveComet) {
          inactiveComet.x = Math.random() * canvas.width;
          inactiveComet.y = -50;
          inactiveComet.speed = Math.random() * 2 + 1.5;
          inactiveComet.length = Math.random() * 60 + 40;
          inactiveComet.active = true;
          lastCometTimeRef.current = timestamp;
        }
      }

      // Draw comets
      cometsRef.current.forEach((comet) => {
        if (!comet.active) return;

        comet.x += comet.speed * 0.5;
        comet.y += comet.speed;

        if (comet.y > canvas.height + 100) {
          comet.active = false;
        }

        const gradient = ctx.createLinearGradient(
          comet.x,
          comet.y - comet.length,
          comet.x,
          comet.y
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(200, 200, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y - comet.length);
        ctx.lineTo(comet.x, comet.y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn floating coins (every 1.5-3 seconds, max 12 coins)
      if (
        timestamp - lastCoinTimeRef.current > 1500 + Math.random() * 1500 &&
        coinsRef.current.length < 12
      ) {
        coinsRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 50,
          size: 30,
          speed: Math.random() * 0.8 + 0.5,
          opacity: 1,
          type: Math.random() > 0.5 ? 'qmy' : 'icp',
          scale: 0.5,
          rotation: Math.random() * Math.PI * 2,
        });
        lastCoinTimeRef.current = timestamp;
      }

      // Draw floating coins with images
      coinsRef.current = coinsRef.current.filter((coin) => {
        coin.y -= coin.speed;
        coin.scale += 0.004;
        coin.rotation += 0.02;
        coin.opacity -= 0.002;

        if (coin.opacity <= 0 || coin.y < -150) {
          return false;
        }

        ctx.save();
        ctx.globalAlpha = coin.opacity;
        ctx.translate(coin.x, coin.y);
        ctx.rotate(coin.rotation);
        ctx.scale(coin.scale, coin.scale);

        const img = coin.type === 'qmy' ? qmyImageRef.current : icpImageRef.current;
        if (img && img.complete) {
          ctx.drawImage(img, -coin.size, -coin.size, coin.size * 2, coin.size * 2);
        } else {
          // Fallback if image not loaded
          const coinColor = coin.type === 'qmy' ? '#FFD700' : '#29ABE2';
          ctx.fillStyle = coinColor;
          ctx.beginPath();
          ctx.arc(0, 0, coin.size, 0, Math.PI * 2);
          ctx.fill();
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
