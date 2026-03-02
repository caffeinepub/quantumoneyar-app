import { useLanguage } from '../../contexts/LanguageContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingCoin() {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgeRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.0;
      meshRef.current.position.y = Math.sin(time.current * 1.2) * 0.2;
    }
    if (edgeRef.current) {
      edgeRef.current.rotation.y += delta * 1.0;
      edgeRef.current.position.y = Math.sin(time.current * 1.2) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1.2, 1.2, 0.22, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.97}
          roughness={0.06}
          envMapIntensity={2}
        />
      </mesh>
      <mesh ref={edgeRef}>
        <torusGeometry args={[1.2, 0.11, 16, 64]} />
        <meshStandardMaterial
          color="#FFA500"
          metalness={0.99}
          roughness={0.04}
        />
      </mesh>
    </group>
  );
}

interface CoverPageProps {
  onNavigate: (section: string) => void;
}

export default function CoverPage({ onNavigate }: CoverPageProps) {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-black px-4">
      {/* Animated universe background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/assets/generated/animated-universe-background.dim_1920x1080.gif"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <img
          src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
          alt="Quantumoney AR"
          className="mb-2 h-20 w-20 object-contain drop-shadow-lg"
        />

        {/* 3D Coin */}
        <div
          className="my-2"
          style={{ width: 220, height: 220, pointerEvents: 'none' }}
        >
          <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            style={{ background: 'transparent' }}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[4, 4, 4]} intensity={3} color="#FFD700" />
            <pointLight position={[-3, -2, 2]} intensity={1.5} color="#FFA500" />
            <spotLight
              position={[0, 6, 3]}
              angle={0.35}
              penumbra={0.5}
              intensity={4}
              color="#FFFFFF"
            />
            <FloatingCoin />
          </Canvas>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl font-bold text-gold drop-shadow-lg md:text-5xl">
          QUANTUMONEY AR
        </h1>
        <p className="mt-2 max-w-xs text-sm text-gold/70 md:text-base">
          {t('coverSubtitle') || 'Collect QMY coins in Augmented Reality'}
        </p>

        {/* Enter button */}
        <button
          onClick={() => onNavigate('hud')}
          className="mt-8 rounded-full border-2 border-gold bg-gold/10 px-10 py-3 font-display text-lg font-bold text-gold shadow-gold transition-all hover:bg-gold/20 active:scale-95"
        >
          {t('enterGame') || 'Enter Game'}
        </button>
      </div>
    </div>
  );
}
