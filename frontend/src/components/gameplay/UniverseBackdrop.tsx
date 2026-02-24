interface UniverseBackdropProps {
  className?: string;
}

export function UniverseBackdrop({ className = '' }: UniverseBackdropProps) {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ 
        zIndex: 0,
        opacity: 0.3,
      }}
    >
      <img
        src="/assets/generated/animated-universe-background.dim_1920x1080.gif"
        alt=""
        className="w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
