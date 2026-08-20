import React from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { RunningLightningBorder } from './RunningLightningBorder';

interface MarqueeTickerProps {
  text: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ text }) => {
  return (
    <div className="w-full max-w-lg mx-auto my-3 px-3 z-10">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/80 via-cyan-950/90 to-blue-950/80 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.35)] group">
        {/* Running Electric Lightning Border */}
        <RunningLightningBorder color="cyan" speedMultiplier={0.8} />

        {/* Left & Right gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center py-2.5 px-3 z-10 relative">
          {/* Left Lightning Flash Icon Badge */}
          <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 mr-2 rounded-lg bg-cyan-500/30 border border-cyan-400/70 shadow-[0_0_15px_rgba(6,182,212,0.7)] z-20">
            <Zap className="w-3.5 h-3.5 text-cyan-200 fill-cyan-300 animate-bounce" />
            <span className="text-[10px] font-black tracking-wider text-white uppercase text-glow-cyan hidden sm:inline">
              INFO VIP
            </span>
          </div>

          {/* Marquee Content */}
          <div className="relative overflow-hidden w-full select-none cursor-default">
            <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-semibold tracking-wide text-cyan-200">
              <span className="flex items-center gap-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 inline" />
                {text}
              </span>
              <span className="flex items-center gap-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 inline" />
                {text}
              </span>
              <span className="flex items-center gap-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 inline" />
                {text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

