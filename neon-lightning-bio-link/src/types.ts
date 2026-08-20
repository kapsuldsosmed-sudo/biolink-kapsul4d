export interface BioButton {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  url: string;
  icon: 'globe' | 'message-circle' | 'send' | 'gift' | 'zap' | 'shield' | 'flame' | 'sparkles';
  accentColor: 'cyan' | 'blue' | 'indigo' | 'purple' | 'emerald';
  clicks: number;
}

export interface BannerItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  tag: string;
  linkUrl?: string;
}

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'whatsapp' | 'telegram' | 'twitter';
  url: string;
  label: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  bio: string;
  logoUrl: string;
  verified: boolean;
  statusText: string;
  marqueeText: string;
  buttons: BioButton[];
  banners: BannerItem[];
  socials: SocialLink[];
}
