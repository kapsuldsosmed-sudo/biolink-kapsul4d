import React, { useState } from 'react';
import {
  Instagram,
  Youtube,
  MessageSquare,
  Send,
  Check,
  Copy,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SocialLink } from '../types';
import { soundManager } from '../utils/audio';

interface FooterSocialsProps {
  socials: SocialLink[];
}

export const FooterSocials: React.FC<FooterSocialsProps> = ({ socials }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    soundManager.playCyberClick();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'whatsapp':
        return <MessageSquare className="w-5 h-5" />;
      case 'telegram':
        return <Send className="w-5 h-5" />;
      case 'tiktok':
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <footer className="w-full max-w-lg mx-auto mt-6 mb-12 px-4 text-center z-10">
      {/* Social Media Circular Floating Badges */}
      <div className="flex items-center justify-center gap-3.5 mb-6 flex-wrap">
        {socials.map((social) => (
          <a
            key={social.id}
            id={`bio-social-${social.platform}`}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playCyberClick()}
            title={social.label}
            className="group relative p-3 rounded-xl bg-blue-950/60 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_18px_rgba(6,182,212,0.6)] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
          >
            {getSocialIcon(social.platform)}
          </a>
        ))}
      </div>

      {/* Quick Copy Page Link Button */}
      <div className="mb-6 flex justify-center">
        <button
          id="btn-footer-copy-link"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 hover:text-white hover:border-cyan-300 hover:bg-cyan-900/60 hover:shadow-[0_0_18px_rgba(6,182,212,0.5)] backdrop-blur-md text-xs font-semibold tracking-wide transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-bold">Link Berhasil Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>Salin Tautan Bio Link</span>
            </>
          )}
        </button>
      </div>

      {/* Security & Authenticity Footnote */}
      <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-cyan-400/80 mb-3">
        <ShieldCheck className="w-4 h-4 text-cyan-300" />
        <span>Sistem Terverifikasi Enkripsi SSL 256-bit • Akses Aman Resmi</span>
      </div>

      {/* Animated Compact Footer Brand Badge: seo kriting x kapsul4d */}
      <div className="my-3.5 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.35)] backdrop-blur-md hover:border-cyan-300 hover:shadow-[0_0_22px_rgba(6,182,212,0.6)] transition-all">
          <Zap className="w-3 h-3 text-cyan-300 fill-cyan-300 animate-bounce" />
          <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase bg-gradient-to-r from-cyan-300 via-white to-sky-400 bg-clip-text text-transparent animate-text-shimmer drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
            seo kriting <span className="text-cyan-400 font-bold mx-0.5">×</span> kapsul4d
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      <p className="text-[10px] text-cyan-500/50">
        © {new Date().getFullYear()} Kapsul4D VIP Hub. All Rights Reserved.
      </p>
    </footer>
  );
};
