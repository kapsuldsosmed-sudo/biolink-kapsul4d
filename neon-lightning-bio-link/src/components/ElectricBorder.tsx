import React from 'react';

interface ElectricBorderProps {
  color?: 'cyan' | 'blue' | 'indigo' | 'purple' | 'emerald';
  active?: boolean;
}

export const ElectricBorder: React.FC<ElectricBorderProps> = ({
  color = 'cyan',
}) => {
  const getGradientByColor = () => {
    switch (color) {
      case 'emerald':
        return 'from-emerald-400 via-cyan-400 to-teal-200';
      case 'indigo':
        return 'from-indigo-400 via-sky-400 to-blue-300';
      case 'purple':
        return 'from-cyan-400 via-blue-500 to-indigo-300';
      case 'blue':
        return 'from-blue-400 via-cyan-300 to-sky-500';
      case 'cyan':
      default:
        return 'from-cyan-300 via-sky-400 to-blue-500';
    }
  };

  return (
    <div className="absolute -inset-[2px] rounded-2xl overflow-hidden pointer-events-none z-0">
      {/* Rotating Conic Electric Energy */}
      <div
        className={`absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#38bdf8_320deg,#ffffff_340deg,#06b6d4_360deg)] animate-electric-border opacity-75 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Outer Glow Halo */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getGradientByColor()} opacity-25 blur-[6px] group-hover:opacity-60 group-hover:blur-[10px] transition-all duration-300`}
      />

      {/* SVG Lightning Arcs along the borders */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`electric-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Top edge electric zig-zag */}
        <path
          d="M 10 2 L 40 4 L 45 1 L 90 3 L 130 1 L 180 3 L 230 1 L 280 3 L 340 1"
          stroke={`url(#electric-grad-${color})`}
          strokeWidth="1.5"
          fill="none"
          className="animate-pulse"
        />

        {/* Bottom edge electric zig-zag */}
        <path
          d="M 20 calc(100% - 2px) L 70 calc(100% - 4px) L 110 calc(100% - 1px) L 170 calc(100% - 3px) L 240 calc(100% - 1px) L 320 calc(100% - 3px)"
          stroke={`url(#electric-grad-${color})`}
          strokeWidth="1.5"
          fill="none"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};
