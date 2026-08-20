import React from 'react';
import { ShieldCheck, Zap, Volume2, VolumeX, Share2, Sparkles, SlidersHorizontal } from 'lucide-react';
import { ProfileData } from '../types';
import { RunningLightningBorder } from './RunningLightningBorder';
import { soundManager } from '../utils/audio';

interface HeaderProfileProps {
  profile: ProfileData;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenShare: () => void;
  onOpenEdit: () => void;
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({
  profile,
  isMuted,
  onToggleMute,
  onOpenShare,
  onOpenEdit,
}) => {
  return (
    <header className="relative flex flex-col items-center text-center pt-8 pb-4 px-4 w-full z-10">
      {/* Top Floating Utility Controls */}
      <div className="w-full max-w-md flex items-center justify-between mb-6 px-2">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300"></span>
          </span>
          <span className="text-[11px] font-semibold tracking-wider text-cyan-200">
            {profile.statusText || '⚡ 24/7 ONLINE VIP'}
          </span>
        </div>

        {/* Quick Action Tools */}
        <div className="flex items-center gap-2">
          {/* Sound FX Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={() => {
              onToggleMute();
              soundManager.playCyberClick();
            }}
            title={isMuted ? 'Nyalakan Efek Suara Kilat' : 'Matikan Suara'}
            className="p-2 rounded-xl bg-blue-950/70 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-md transition-all active:scale-95"
            aria-label="Sound Toggle"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-300 animate-pulse" />}
          </button>

          {/* Share Button */}
          <button
            id="btn-open-share"
            onClick={() => {
              soundManager.playCyberClick();
              onOpenShare();
            }}
            title="Bagikan Link / QR Code"
            className="p-2 rounded-xl bg-blue-950/70 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-md transition-all active:scale-95"
            aria-label="Share Link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Edit Customizer Button */}
          <button
            id="btn-open-edit-profile"
            onClick={() => {
              soundManager.playCyberClick();
              onOpenEdit();
            }}
            title="Kustomisasi Tampilan & Link"
            className="p-2 rounded-xl bg-cyan-900/50 border border-cyan-400/50 text-cyan-200 hover:text-white hover:bg-cyan-600/40 hover:border-cyan-300 hover:shadow-[0_0_18px_rgba(6,182,212,0.6)] backdrop-blur-md transition-all active:scale-95"
            aria-label="Edit Profile"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logo Section - Natural Fit & Electric Neon Glow */}
      <div className="relative group mb-4 flex items-center justify-center">
        {/* Outer Electric Glowing Aura behind Logo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-cyan-500/40 opacity-70 blur-2xl group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500 rounded-3xl" />

        {/* Logo Container with Running Lightning Effect & Subtle Glass Backing */}
        <div className="relative flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-blue-950/70 via-slate-950/80 to-blue-950/70 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] transition-all duration-300">
          {/* Running Electric Lightning Border */}
          <RunningLightningBorder color="cyan" speedMultiplier={0.75} />

          <img
            id="bio-profile-logo"
            src={profile.logoUrl}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-auto h-20 sm:h-24 max-w-[260px] sm:max-w-[320px] object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.7)] transform group-hover:scale-105 transition-transform duration-300 relative z-10"
          />

          {/* Floating Lightning Zap Badge */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-cyan-600 to-blue-500 text-white p-1.5 rounded-full border-2 border-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.9)] animate-bounce z-20">
            <Zap className="w-3.5 h-3.5 fill-cyan-200 text-cyan-100" />
          </div>

          {/* Mini Sparkles */}
          <div className="absolute -top-2 -left-2 bg-blue-900/80 p-1 rounded-full border border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.7)] z-20">
            <Sparkles className="w-3 h-3 text-cyan-300" />
          </div>
        </div>
      </div>

      {/* Brand Title with Verified Badge */}
      <div className="flex items-center justify-center gap-2 mb-1 flex-wrap">
        <h1
          id="bio-profile-name"
          className="text-2xl sm:text-3xl font-black tracking-tight text-white text-glow-cyan drop-shadow-md"
        >
          {profile.name}
        </h1>
        {profile.verified && (
          <span
            title="Terverifikasi Resmi"
            className="inline-flex items-center text-cyan-400 bg-cyan-950/60 p-1 rounded-full border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          >
            <ShieldCheck className="w-4 h-4 fill-cyan-400 text-slate-950" />
          </span>
        )}
      </div>

      {/* Username / Tagline */}
      <p id="bio-profile-tagline" className="text-sm font-medium text-cyan-300 tracking-wider mb-2">
        {profile.tagline}
      </p>

      {/* Bio Description Box */}
      <div className="max-w-md w-full px-4 py-2 rounded-xl bg-blue-950/40 border border-cyan-500/20 backdrop-blur-md shadow-inner text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
        {profile.bio}
      </div>
    </header>
  );
};
