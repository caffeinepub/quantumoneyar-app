import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CoinMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.2;
      meshRef.current.position.y = Math.sin(time.current * 1.5) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <cylinderGeometry args={[1, 1, 0.18, 64]} />
      <meshStandardMaterial
        color="#FFD700"
        metalness={0.95}
        roughness={0.08}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function CoinEdge() {
  return (
    <mesh>
      <torusGeometry args={[1, 0.09, 16, 64]} />
      <meshStandardMaterial
        color="#FFA500"
        metalness={0.98}
        roughness={0.05}
      />
    </mesh>
  );
}

interface QMY3DCoinProps {
  size?: number;
  className?: string;
}

export default function QMY3DCoin({ size = 200, className = '' }: QMY3DCoinProps) {
  return (
    <div
      style={{ width: size, height: size, pointerEvents: 'none' }}
      className={className}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={2.5} color="#FFD700" />
        <pointLight position={[-3, -2, 2]} intensity={1.2} color="#FFA500" />
        <spotLight
          position={[0, 5, 2]}
          angle={0.4}
          penumbra={0.5}
          intensity={3}
          color="#FFFFFF"
        />
        <CoinMesh />
        <CoinEdge />
      </Canvas>
    </div>
  );
}
