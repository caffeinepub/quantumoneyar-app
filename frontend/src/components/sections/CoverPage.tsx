import React from 'react';
import type { Section } from '../../App';

interface CoverPageProps {
  onNavigate: (section: Section) => void;
}

export default function CoverPage({ onNavigate }: CoverPageProps) {
  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '85vh' }}
    >
      {/* Background */}
      <img
        src="/assets/generated/animated-universe-background.dim_1920x1080.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-4 py-8 text-center">
        <img
          src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
          alt="Quantumoney"
          className="w-24 h-24 drop-shadow-2xl"
        />

        <div>
          <h1 className="text-4xl font-bold text-yellow-400 tracking-widest drop-shadow-lg">
            QUANTUMONEY
          </h1>
          <p className="text-yellow-300/80 text-sm mt-1 tracking-wide">
            AR Blockchain Game · Internet Computer
          </p>
          <p className="text-gray-400 text-xs mt-1">1,000,000,000 QMY · HTgamers</p>
        </div>

        <div className="animate-bounce mt-2">
          <img
            src="/assets/generated/qmy-coin-3d-floating-transparent.dim_400x400.png"
            alt="QMY"
            className="w-20 h-20 drop-shadow-xl"
          />
        </div>

        <button
          onClick={() => onNavigate('hud')}
          className="mt-2 px-10 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-full text-base transition-all shadow-xl"
        >
          Enter Game
        </button>

        <p className="text-gray-500 text-xs">By HTgamers · Powered by Internet Computer</p>
      </div>
    </div>
  );
}
