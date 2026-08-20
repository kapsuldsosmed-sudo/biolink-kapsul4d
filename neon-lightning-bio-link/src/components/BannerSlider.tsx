import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap, ExternalLink, Maximize2, X } from 'lucide-react';
import { BannerItem } from '../types';
import { RunningLightningBorder } from './RunningLightningBorder';
import { soundManager } from '../utils/audio';

interface BannerSliderProps {
  banners: BannerItem[];
}

export const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<BannerItem | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Ensure we display 3 slides seamlessly
  const slides = banners.length > 0 ? banners.slice(0, 3) : [];

  // Auto-play interval
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const handleNext = () => {
    soundManager.playCyberClick();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    soundManager.playCyberClick();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <section className="w-full max-w-lg mx-auto my-5 px-3 z-10">
      {/* Section Header with Neon Lightning Badge */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
            <Zap className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300" />
          </div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-200 text-glow-cyan">
            BANNER & PROMO RESMI
          </span>
        </div>

        {/* Slide Counter Badge */}
        <div className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-950/80 border border-cyan-500/30 text-cyan-300">
          {currentIndex + 1} / {slides.length}
        </div>
      </div>

      {/* Main Glass Slider Container */}
      <div
        id="bio-banner-slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-2xl bg-slate-950/80 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.35)] group"
      >
        {/* Running Electric Lightning Border */}
        <RunningLightningBorder color="cyan" speedMultiplier={0.9} />

        {/* Carousel Image Track (Smart Responsive Aspect Ratio) */}
<div className="relative w-full aspect-[16/9] sm:aspect-[16/8] min-h-[180px] sm:min-h-[220px] overflow-hidden bg-slate-950/90 flex items-center justify-center">
  {slides.map((slide, index) => (
    <div
      key={slide.id || index}
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
      }`}
    >
      {/* 1. Latar Belakang Blur Otomatis (Agar gambar ukuran apapun tetap estetik dan tidak ada ruang kosong) */}
      <img
        src={slide.imageUrl}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-40 select-none pointer-events-none"
      />

      {/* 2. Gambar Utama Responsif (Otomatis menyesuaikan layar, tajam, dan tidak gepeng) */}
      <img
        src={slide.imageUrl}
        alt={slide.title}
        referrerPolicy="no-referrer"
        className="relative z-10 w-full h-full object-cover sm:object-cover object-center select-none"
        loading="lazy"
      />

      {/* 3. Lapisan Gradasi Gelap (Agar teks banner di atas gambar selalu terbaca jelas) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />

      {/* 4. Teks Informasi Banner yang Responsif */}
      <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-5 flex flex-col justify-end text-left z-20">
        {slide.tag && (
          <span className="inline-flex items-center gap-1 self-start mb-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-cyan-500/30 border border-cyan-400/80 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.6)] backdrop-blur-sm">
            <Zap className="w-2.5 h-2.5 fill-current" />
            {slide.tag}
          </span>
        )}

        <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide drop-shadow-md leading-tight">
          {slide.title}
        </h3>

        <p className="text-xs text-cyan-100/85 line-clamp-2 mt-0.5 drop-shadow">
          {slide.description}
        </p>
      </div>
    </div>
  ))}
</div>

          {/* Lightbox / Zoom Trigger Icon */}
          <button
            id="btn-banner-lightbox"
            onClick={() => {
              soundManager.playCyberClick();
              setLightboxImage(currentSlide);
            }}
            title="Perbesar Gambar Banner"
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-950/70 border border-cyan-400/40 text-cyan-300 hover:text-white hover:bg-cyan-600/60 hover:shadow-[0_0_12px_rgba(6,182,212,0.8)] backdrop-blur-md z-20 transition-all active:scale-95"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Left Arrow Button */}
        <button
          id="btn-banner-prev"
          onClick={handlePrev}
          title="Slide Sebelumnya"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-950/75 border border-cyan-400/50 text-cyan-300 hover:text-white hover:bg-cyan-500 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] backdrop-blur-md z-20 transition-all opacity-80 group-hover:opacity-100 active:scale-90"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow Button */}
        <button
          id="btn-banner-next"
          onClick={handleNext}
          title="Slide Selanjutnya"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-950/75 border border-cyan-400/50 text-cyan-300 hover:text-white hover:bg-cyan-500 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] backdrop-blur-md z-20 transition-all opacity-80 group-hover:opacity-100 active:scale-90"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-2.5 right-4 flex items-center gap-1.5 z-20">
          {slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              id={`btn-banner-dot-${dotIdx + 1}`}
              onClick={() => {
                soundManager.playCyberClick();
                setCurrentIndex(dotIdx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex
                  ? 'w-6 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)]'
                  : 'w-2 bg-cyan-900/80 border border-cyan-500/40 hover:bg-cyan-700'
              }`}
              aria-label={`Slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative max-w-2xl w-full rounded-2xl bg-slate-900 border-2 border-cyan-400/70 p-2 shadow-[0_0_50px_rgba(6,182,212,0.5)]">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-cyan-500 text-slate-950 font-bold border-2 border-white shadow-[0_0_15px_rgba(6,182,212,0.8)] hover:scale-110 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={lightboxImage.imageUrl}
              alt={lightboxImage.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-xl object-contain max-h-[70vh]"
            />

            <div className="p-4 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/50">
                  {lightboxImage.tag}
                </span>
                <h4 className="text-base font-bold text-white text-glow-cyan">
                  {lightboxImage.title}
                </h4>
              </div>
              <p className="text-xs text-cyan-100/80">
                {lightboxImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
