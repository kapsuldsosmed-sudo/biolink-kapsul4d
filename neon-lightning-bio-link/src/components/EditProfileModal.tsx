import React, { useState } from 'react';
import { X, Save, RotateCcw, Image, Link, Type, Zap, Check } from 'lucide-react';
import { ProfileData, BioButton, BannerItem } from '../types';
import { INITIAL_PROFILE_DATA } from '../data/defaultData';
import { soundManager } from '../utils/audio';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (data: ProfileData) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [activeTab, setActiveTab] = useState<'profile' | 'buttons' | 'banners'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    soundManager.playElectricZap();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    soundManager.playCyberClick();
    if (confirm('Kembalikan ke data awal bawaan?')) {
      setFormData(INITIAL_PROFILE_DATA);
    }
  };

  const updateButton = (index: number, field: keyof BioButton, value: string) => {
    const updatedButtons = [...formData.buttons];
    updatedButtons[index] = { ...updatedButtons[index], [field]: value };
    setFormData({ ...formData, buttons: updatedButtons });
  };

  const updateBanner = (index: number, field: keyof BannerItem, value: string) => {
    const updatedBanners = [...formData.banners];
    updatedBanners[index] = { ...updatedBanners[index], [field]: value };
    setFormData({ ...formData, banners: updatedBanners });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl bg-gradient-to-b from-blue-950 to-slate-950 border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(6,182,212,0.4)] text-white overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/30 bg-blue-950/80">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            <h3 className="text-base font-bold text-white text-glow-cyan">
              Kustomisasi Bio Link
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playCyberClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-600 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-cyan-500/30 bg-slate-950/60 p-1 gap-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                : 'text-cyan-300 hover:bg-cyan-950/60'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            Profil & Teks
          </button>
          <button
            onClick={() => setActiveTab('buttons')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'buttons'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                : 'text-cyan-300 hover:bg-cyan-950/60'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            4 Tombol Link
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'banners'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                : 'text-cyan-300 hover:bg-cyan-950/60'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            3 Banner Slide
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left">
          {/* PROFILE & TEXT TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Nama Brand / Profil
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Username / Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  URL Logo Gambar
                </label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Bio Deskripsi
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Text Marquee Berjalan
                </label>
                <textarea
                  rows={2}
                  value={formData.marqueeText}
                  onChange={(e) => setFormData({ ...formData, marqueeText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* 4 BUTTONS TAB */}
          {activeTab === 'buttons' && (
            <div className="space-y-4">
              {formData.buttons.slice(0, 4).map((btn, idx) => (
                <div
                  key={btn.id || idx}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400">
                      ⚡ Tombol #{idx + 1}
                    </span>
                    <input
                      type="text"
                      placeholder="Badge (cth: HOT VIP)"
                      value={btn.badge || ''}
                      onChange={(e) => updateButton(idx, 'badge', e.target.value)}
                      className="px-2 py-1 rounded bg-slate-950 border border-cyan-500/30 text-[11px] text-cyan-200"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Judul Tombol"
                    value={btn.title}
                    onChange={(e) => updateButton(idx, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/40 text-xs text-white"
                  />

                  <input
                    type="text"
                    placeholder="Sub-judul / Keterangan"
                    value={btn.subtitle}
                    onChange={(e) => updateButton(idx, 'subtitle', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/40 text-xs text-cyan-100"
                  />

                  <input
                    type="text"
                    placeholder="Link URL Tujuan"
                    value={btn.url}
                    onChange={(e) => updateButton(idx, 'url', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/40 text-xs text-cyan-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 3 BANNERS TAB */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              {formData.banners.slice(0, 3).map((banner, idx) => (
                <div
                  key={banner.id || idx}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400">
                      🖼️ Banner Slide #{idx + 1}
                    </span>
                    <input
                      type="text"
                      placeholder="Tag Promo"
                      value={banner.tag}
                      onChange={(e) => updateBanner(idx, 'tag', e.target.value)}
                      className="px-2 py-1 rounded bg-slate-950 border border-cyan-500/30 text-[11px] text-cyan-200"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="URL Foto Banner"
                    value={banner.imageUrl}
                    onChange={(e) => updateBanner(idx, 'imageUrl', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/40 text-xs text-cyan-300"
                  />

                  <input
                    type="text"
                    placeholder="Judul Banner"
                    value={banner.title}
                    onChange={(e) => updateBanner(idx, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/40 text-xs text-white"
                  />

                  <input
                    type="text"
                    placeholder="Deskripsi Banner"
                    value={banner.description}
                    onChange={(e) => updateBanner(idx, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/40 text-xs text-cyan-100"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between p-4 border-t border-cyan-500/30 bg-blue-950/90">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 text-xs transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Awal
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all active:scale-95"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Berhasil Disimpan!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
