import React from 'react';
import {
  Globe,
  MessageCircle,
  Send,
  Gift,
  Zap,
  Shield,
  Flame,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BioButton } from '../types';
import { RunningLightningBorder } from './RunningLightningBorder';
import { soundManager } from '../utils/audio';

interface ActionButtonsProps {
  buttons: BioButton[];
  onButtonClick: (button: BioButton) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  buttons,
  onButtonClick,
}) => {
  const renderIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'globe':
        return <Globe className={className} />;
      case 'message-circle':
        return <MessageCircle className={className} />;
      case 'send':
        return <Send className={className} />;
      case 'gift':
        return <Gift className={className} />;
      case 'zap':
        return <Zap className={className} />;
      case 'shield':
        return <Shield className={className} />;
      case 'flame':
        return <Flame className={className} />;
      case 'sparkles':
      default:
        return <Sparkles className={className} />;
    }
  };

  const handleTrigger = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, btn: BioButton) => {
    soundManager.playElectricZap();

    // Trigger electrical spark particles
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      confetti({
        particleCount: 28,
        spread: 70,
        origin: { x, y },
        colors: ['#38bdf8', '#06b6d4', '#ffffff', '#60a5fa', '#93c5fd'],
        ticks: 200,
        gravity: 1.2,
        scalar: 0.85,
        shapes: ['circle'],
      });
    } catch {
      // fallback
    }

    onButtonClick(btn);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4 px-3 my-4 z-10">
      {buttons.slice(0, 4).map((button, index) => (
        <a
          key={button.id || `btn-${index}`}
          id={`bio-action-button-${index + 1}`}
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => handleTrigger(e, button)}
          className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900/80 to-blue-950/70 hover:from-cyan-950/90 hover:via-blue-900/80 hover:to-cyan-950/90 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] select-none overflow-hidden"
        >
          {/* Running Lightning Border (Kilatan Petir Berjalan Memutari Tepi Tombol) */}
          <RunningLightningBorder color={button.accentColor} speedMultiplier={1 + index * 0.1} />

          {/* Running Horizontal Electric Pulse Beam inside the Button */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl opacity-40 group-hover:opacity-75">
            <div
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -skew-x-12 animate-running-horizontal"
              style={{ animationDelay: `${index * 0.6}s` }}
            />
          </div>

          {/* Left: Icon Container with Electric Aura */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-950 to-blue-900 border border-cyan-400/50 text-cyan-300 group-hover:text-white group-hover:border-cyan-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.9)] shadow-inner transition-all duration-300 z-10 mr-3.5">
            {/* Pulsing Lightning Glow Behind Icon */}
            <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-sm group-hover:bg-cyan-400/50 transition-colors" />

            <div className="relative z-10 transform group-hover:scale-110 transition-transform">
              {renderIcon(button.icon, 'w-6 h-6')}
            </div>

            {/* Corner Mini Zap Flash */}
            <div className="absolute -top-1 -right-1 text-cyan-300 opacity-90 group-hover:opacity-100 animate-pulse">
              <Zap className="w-3 h-3 fill-cyan-300" />
            </div>
          </div>

          {/* Center: Title, Subtitle, & Badge */}
          <div className="flex-1 min-w-0 z-10 text-left">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h2 className="text-sm sm:text-base font-black tracking-wide text-white group-hover:text-cyan-200 transition-colors truncate">
                {button.title}
              </h2>

              {button.badge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/25 border border-cyan-400/70 text-cyan-200 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all">
                  <Zap className="w-2.5 h-2.5 fill-current animate-bounce" />
                  {button.badge}
                </span>
              )}
            </div>

            <p className="text-xs text-cyan-200/80 group-hover:text-cyan-100 truncate">
              {button.subtitle}
            </p>
          </div>

          {/* Right: Electric Chevron & Link Indicator */}
          <div className="flex-shrink-0 flex items-center gap-1 pl-2 z-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:border-cyan-200 group-hover:shadow-[0_0_18px_rgba(6,182,212,0.9)] transition-all">
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

