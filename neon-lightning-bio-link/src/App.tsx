import React, { useState, useEffect } from 'react';
import { LightningCanvas } from './components/LightningCanvas';
import { HeaderProfile } from './components/HeaderProfile';
import { MarqueeTicker } from './components/MarqueeTicker';
import { ActionButtons } from './components/ActionButtons';
import { BannerSlider } from './components/BannerSlider';
import { FooterSocials } from './components/FooterSocials';
import { ShareModal } from './components/ShareModal';
import { EditProfileModal } from './components/EditProfileModal';
import { INITIAL_PROFILE_DATA } from './data/defaultData';
import { ProfileData, BioButton } from './types';
import { soundManager } from './utils/audio';

const STORAGE_KEY = 'neon_bio_link_profile_v2';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure new logo is used if old unsplash default was saved
        if (!parsed.logoUrl || parsed.logoUrl.includes('unsplash.com')) {
          parsed.logoUrl = INITIAL_PROFILE_DATA.logoUrl;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_PROFILE_DATA;
  });

  const [isMuted, setIsMuted] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundManager.isMuted = nextState;
  };

  const handleSaveProfile = (newData: ProfileData) => {
    setProfile(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // ignore
    }
  };

  const handleButtonClick = (btn: BioButton) => {
    // Increment click counter
    setProfile((prev) => {
      const updatedButtons = prev.buttons.map((b) =>
        b.id === btn.id ? { ...b, clicks: (b.clicks || 0) + 1 } : b
      );
      const updatedProfile = { ...prev, buttons: updatedButtons };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }
      return updatedProfile;
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-slate-100 overflow-x-hidden font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Dynamic Procedural Background Lightning & Electric Sparks */}
      <LightningCanvas />

      {/* Cyber Blue Neon Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top radial blue glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-b from-cyan-600/25 via-blue-700/20 to-transparent blur-[120px] rounded-full" />

        {/* Center cyan pulse */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/15 blur-[140px] rounded-full" />

        {/* Bottom deep indigo aura */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-900/20 blur-[130px] rounded-full" />

        {/* Subtle Cyber Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main Glassmorphism Mobile-Optimized Bio Container */}
      <main className="relative z-10 flex flex-col items-center min-h-screen w-full max-w-xl mx-auto px-2 sm:px-4">
        {/* 1. Header with Logo & Controls */}
        <HeaderProfile
          profile={profile}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenShare={() => setIsShareOpen(true)}
          onOpenEdit={() => setIsEditOpen(true)}
        />

        {/* 2. Running Marquee Text (Text Marquee Berjalan) */}
        <MarqueeTicker text={profile.marqueeText} />

        {/* 3. 4 Interactive Animated Buttons with Electric Lightning Borders (4 Button dengan Visual Kilat) */}
        <ActionButtons
          buttons={profile.buttons}
          onButtonClick={handleButtonClick}
        />

        {/* 4. Responsive 3-Photo Banner Slider (Foto Banner Slide 3 Foto yang Responsif) */}
        <BannerSlider banners={profile.banners} />

        {/* 5. Social Media & Security Footer */}
        <FooterSocials socials={profile.socials} />
      </main>

      {/* Share & QR Code Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={profile.name}
      />

      {/* Live Profile & Links Customizer Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
