import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  offset: number;
}

interface Comet {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  timer: number;
}

export default function HomeSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const stars: Star[] = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Planets
    const planets: Planet[] = [
      { x: 0.15, y: 0.2, radius: 18, color: '#b8860b', speed: 0.0003, offset: 0 },
      { x: 0.8, y: 0.15, radius: 12, color: '#8b6914', speed: 0.0005, offset: 1 },
      { x: 0.7, y: 0.75, radius: 22, color: '#d4af37', speed: 0.0002, offset: 2 },
    ];

    // Comets
    const comets: Comet[] = Array.from({ length: 3 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.5,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 0.003 + 0.002,
      angle: Math.PI / 6,
      opacity: 0,
      active: false,
      timer: Math.random() * 300,
    }));

    let frame = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#000000');
      bg.addColorStop(1, '#0a0500');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Stars
      stars.forEach((star) => {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity + twinkle * 0.2;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 180, ${Math.max(0, alpha)})`;
        ctx.fill();
      });

      // Planets
      planets.forEach((planet) => {
        const wobble = Math.sin(frame * planet.speed + planet.offset) * 3;
        const px = planet.x * w + wobble;
        const py = planet.y * h + wobble * 0.5;

        // Glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, planet.radius * 2.5);
        glow.addColorStop(0, planet.color + '40');
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(px, py, planet.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Planet body
        const grad = ctx.createRadialGradient(px - planet.radius * 0.3, py - planet.radius * 0.3, 0, px, py, planet.radius);
        grad.addColorStop(0, planet.color + 'ff');
        grad.addColorStop(0.7, planet.color + 'cc');
        grad.addColorStop(1, '#00000088');
        ctx.beginPath();
        ctx.arc(px, py, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.ellipse(px, py, planet.radius * 1.8, planet.radius * 0.4, 0.3, 0, Math.PI * 2);
        ctx.strokeStyle = planet.color + '60';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Comets
      comets.forEach((comet) => {
        if (!comet.active) {
          comet.timer--;
          if (comet.timer <= 0) {
            comet.active = true;
            comet.x = -0.1;
            comet.y = Math.random() * 0.6;
            comet.opacity = 0;
            comet.timer = 200 + Math.random() * 400;
          }
          return;
        }

        comet.x += comet.speed;
        comet.y += comet.speed * 0.3;
        comet.opacity = Math.min(1, comet.opacity + 0.05);

        if (comet.x > 1.2) {
          comet.active = false;
          comet.opacity = 0;
        }

        const cx = comet.x * w;
        const cy = comet.y * h;
        const tailX = cx - Math.cos(comet.angle) * comet.length;
        const tailY = cy - Math.sin(comet.angle) * comet.length;

        const cometGrad = ctx.createLinearGradient(tailX, tailY, cx, cy);
        cometGrad.addColorStop(0, `rgba(212, 175, 55, 0)`);
        cometGrad.addColorStop(1, `rgba(255, 240, 180, ${comet.opacity * 0.8})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 200, ${comet.opacity})`;
        ctx.fill();
      });

      frame++;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
