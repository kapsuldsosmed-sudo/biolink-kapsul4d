import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Share2, Send, MessageSquare } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (!isOpen) return null;

  const handleCopy = () => {
    soundManager.playCyberClick();
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`⚡ Kunjungi Link Resmi: ${currentUrl}`)}`, '_blank');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent('⚡ Link Resmi Terverifikasi')}`, '_blank');
  };

  // QR Code URL via reliable QR generator
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl || 'https://cyberneon.vip')}&color=06b6d4&bgcolor=030712`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-blue-950 to-slate-950 border-2 border-cyan-400/60 p-6 shadow-[0_0_50px_rgba(6,182,212,0.4)] text-center text-white">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playCyberClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-600 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Share2 className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white text-glow-cyan">
            Bagikan Bio Link VIP
          </h3>
        </div>
        <p className="text-xs text-cyan-200/80 mb-5">{title}</p>

        {/* QR Code Container with Glowing Frame */}
        <div className="mx-auto w-48 h-48 p-2 rounded-2xl bg-slate-950 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] mb-5 flex items-center justify-center">
          <img
            src={qrCodeUrl}
            alt="QR Code Link"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Copy Input Bar */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-cyan-500/40 mb-4">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent text-xs text-cyan-200 outline-none px-2 truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(6,182,212,0.6)]"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Tersalin' : 'Salin'}
          </button>
        </div>

        {/* Share Quick Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all text-xs font-semibold"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            onClick={shareTelegram}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-950/60 border border-blue-500/50 text-blue-300 hover:bg-blue-600 hover:text-white transition-all text-xs font-semibold"
          >
            <Send className="w-4 h-4" />
            Telegram
          </button>
        </div>
      </div>
    </div>
  );
};
