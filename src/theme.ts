/**
 * DeshiMart Premium Design System Tokens
 * Centered around elegant typography, generous whitespace, fluid motion,
 * and semantic design tokens mapping 1-to-1 with premium visual standards.
 */

export interface ColorToken {
  primary: string;       // Primary text & core actions
  secondary: string;     // Supporting text & accents
  accent: string;        // Interactive focus state
  surface: string;       // Card background
  border: string;        // Border lines
  badgeBg: string;       // Pill backdrop
  badgeText: string;     // Pill label
  gradient: string;      // Expressive elements
}

export interface DesignTokens {
  radius: {
    base: string;        // Standard cards (16px)
    large: string;       // Large modals, banners (24px)
    pill: string;        // Badges, circular buttons (9999px)
    button: string;      // Interactive buttons (12px)
  };
  shadow: {
    low: string;         // Elevation 1: subtle card resting state
    medium: string;      // Elevation 2: hover state, popovers
    high: string;        // Elevation 3: modals, slide-out drawer
    inner: string;       // Deep content container inset
  };
  spacing: {
    xs: string;          // 4px
    sm: string;          // 8px
    md: string;          // 12px
    lg: string;          // 16px
    xl: string;          // 24px
    xxl: string;         // 32px
    section: string;     // 48px to 64px
  };
  motion: {
    transition: string;  // Standard micro-interaction transition
    spring: string;      // Elegant card entrance curve
    hoverScale: string;  // Subtle scale-up for hover states
    activeScale: string; // Pressed feedback
  };
}

export const DESIGN_TOKENS: DesignTokens = {
  radius: {
    base: 'rounded-2xl', // 16px
    large: 'rounded-3xl', // 24px
    pill: 'rounded-full',
    button: 'rounded-xl', // 12px
  },
  shadow: {
    low: 'shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03),0_2px_4px_-1px_rgba(15,23,42,0.01)]',
    medium: 'shadow-[0_12px_30px_-4px_rgba(15,23,42,0.08),0_4px_12px_-2px_rgba(15,23,42,0.03)]',
    high: 'shadow-[0_24px_50px_-12px_rgba(15,23,42,0.16),0_8px_16px_-4px_rgba(15,23,42,0.04)]',
    inner: 'shadow-inner border border-slate-100/50 dark:border-slate-800/10',
  },
  spacing: {
    xs: 'p-1 sm:p-1.5',
    sm: 'p-2 sm:p-2.5',
    md: 'p-3 sm:p-3.5',
    lg: 'p-4 sm:p-5',
    xl: 'p-6 sm:p-8',
    xxl: 'p-8 sm:p-10',
    section: 'py-8 sm:py-12',
  },
  motion: {
    transition: 'transition-all duration-300 ease-out',
    spring: 'transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)',
    hoverScale: 'hover:scale-[1.02] hover:-translate-y-0.5',
    activeScale: 'active:scale-[0.98] active:translate-y-0',
  },
};

export interface TypographyTokens {
  heroTitle: string;
  sectionTitle: string;
  cardTitle: string;
  body: string;
  meta: string;
  price: string;
}

export const TYPOGRAPHY_TOKENS: TypographyTokens = {
  heroTitle: 'font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]',
  sectionTitle: 'font-heading text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white',
  cardTitle: 'font-sans text-[13px] sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 leading-tight',
  body: 'font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed',
  meta: 'font-sans text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium',
  price: 'font-sans text-sm sm:text-base md:text-lg font-black text-primary dark:text-emerald-400',
};

/**
 * Semantic mapping for product categories
 * Avoids raw coloring or randomized styling. Allows each category to project
 * a distinguished subconscious identity.
 */
export interface CategoryTheme {
  colorName: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  textLight: string;
  textDark: string;
  badgeLight: string;
  badgeDark: string;
  iconBgLight: string;
  iconBgDark: string;
  hoverTextLight: string;
  hoverTextDark: string;
  hoverBorderLight: string;
  hoverBorderDark: string;
  hoverBgLight: string;
  hoverBgDark: string;
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  '1': { // পাঞ্জাবি - Traditional Punjabi (Rich Amber / Gold)
    colorName: 'amber',
    bgLight: 'bg-amber-50/40',
    bgDark: 'dark:bg-amber-950/10',
    borderLight: 'border-amber-100/50',
    borderDark: 'dark:border-amber-900/10',
    textLight: 'text-amber-700',
    textDark: 'dark:text-amber-300',
    badgeLight: 'bg-amber-100/40 text-amber-800',
    badgeDark: 'dark:bg-amber-900/30 dark:text-amber-300',
    iconBgLight: 'bg-amber-50',
    iconBgDark: 'dark:bg-amber-950/30',
    hoverTextLight: 'group-hover:text-amber-700',
    hoverTextDark: 'dark:group-hover:text-amber-300',
    hoverBorderLight: 'group-hover:border-amber-400',
    hoverBorderDark: 'dark:group-hover:border-amber-500',
    hoverBgLight: 'group-hover:bg-amber-50/80',
    hoverBgDark: 'dark:group-hover:bg-amber-950/20',
  },
  '2': { // শাড়ি - Elegant Saree (Deep Rose)
    colorName: 'rose',
    bgLight: 'bg-rose-50/40',
    bgDark: 'dark:bg-rose-950/10',
    borderLight: 'border-rose-100/50',
    borderDark: 'dark:border-rose-900/10',
    textLight: 'text-rose-700',
    textDark: 'dark:text-rose-300',
    badgeLight: 'bg-rose-100/40 text-rose-800',
    badgeDark: 'dark:bg-rose-900/30 dark:text-rose-300',
    iconBgLight: 'bg-rose-50',
    iconBgDark: 'dark:bg-rose-950/30',
    hoverTextLight: 'group-hover:text-rose-700',
    hoverTextDark: 'dark:group-hover:text-rose-300',
    hoverBorderLight: 'group-hover:border-rose-400',
    hoverBorderDark: 'dark:group-hover:border-rose-500',
    hoverBgLight: 'group-hover:bg-rose-50/80',
    hoverBgDark: 'dark:group-hover:bg-rose-950/20',
  },
  '3': { // থ্রিপিস - Salwar Kameez / Three Piece (Fuchsia / Purple)
    colorName: 'fuchsia',
    bgLight: 'bg-fuchsia-50/40',
    bgDark: 'dark:bg-fuchsia-950/10',
    borderLight: 'border-fuchsia-100/50',
    borderDark: 'dark:border-fuchsia-900/10',
    textLight: 'text-fuchsia-700',
    textDark: 'dark:text-fuchsia-300',
    badgeLight: 'bg-fuchsia-100/40 text-fuchsia-800',
    badgeDark: 'dark:bg-fuchsia-900/30 dark:text-fuchsia-300',
    iconBgLight: 'bg-fuchsia-50',
    iconBgDark: 'dark:bg-fuchsia-950/30',
    hoverTextLight: 'group-hover:text-fuchsia-700',
    hoverTextDark: 'dark:group-hover:text-fuchsia-300',
    hoverBorderLight: 'group-hover:border-fuchsia-400',
    hoverBorderDark: 'dark:group-hover:border-fuchsia-500',
    hoverBgLight: 'group-hover:bg-fuchsia-50/80',
    hoverBgDark: 'dark:group-hover:bg-fuchsia-950/20',
  },
  '4': { // জুতা - Premium Footwear (Cobalt Blue)
    colorName: 'indigo',
    bgLight: 'bg-indigo-50/40',
    bgDark: 'dark:bg-indigo-950/10',
    borderLight: 'border-indigo-100/50',
    borderDark: 'dark:border-indigo-900/10',
    textLight: 'text-indigo-700',
    textDark: 'dark:text-indigo-300',
    badgeLight: 'bg-indigo-100/40 text-indigo-800',
    badgeDark: 'dark:bg-indigo-900/30 dark:text-indigo-300',
    iconBgLight: 'bg-indigo-50',
    iconBgDark: 'dark:bg-indigo-950/30',
    hoverTextLight: 'group-hover:text-indigo-700',
    hoverTextDark: 'dark:group-hover:text-indigo-300',
    hoverBorderLight: 'group-hover:border-indigo-400',
    hoverBorderDark: 'dark:group-hover:border-indigo-500',
    hoverBgLight: 'group-hover:bg-indigo-50/80',
    hoverBgDark: 'dark:group-hover:bg-indigo-950/20',
  },
  '5': { // ঘড়ি - Luxury Watches (Classic Slate / Metallic Gray)
    colorName: 'slate',
    bgLight: 'bg-slate-50/50',
    bgDark: 'dark:bg-slate-800/20',
    borderLight: 'border-slate-100',
    borderDark: 'dark:border-slate-800',
    textLight: 'text-slate-700',
    textDark: 'dark:text-slate-300',
    badgeLight: 'bg-slate-100 text-slate-800',
    badgeDark: 'dark:bg-slate-800/50 dark:text-slate-300',
    iconBgLight: 'bg-slate-100',
    iconBgDark: 'dark:bg-slate-800/30',
    hoverTextLight: 'group-hover:text-slate-750',
    hoverTextDark: 'dark:group-hover:text-slate-250',
    hoverBorderLight: 'group-hover:border-slate-400',
    hoverBorderDark: 'dark:group-hover:border-slate-500',
    hoverBgLight: 'group-hover:bg-slate-100/80',
    hoverBgDark: 'dark:group-hover:bg-slate-800/40',
  },
  '6': { // ব্যাগ - Handbags & Luggage (Tangerine / Terracotta)
    colorName: 'orange',
    bgLight: 'bg-orange-50/40',
    bgDark: 'dark:bg-orange-950/10',
    borderLight: 'border-orange-100/50',
    borderDark: 'dark:border-orange-900/10',
    textLight: 'text-orange-700',
    textDark: 'dark:text-orange-300',
    badgeLight: 'bg-orange-100/40 text-orange-800',
    badgeDark: 'dark:bg-orange-900/30 dark:text-orange-300',
    iconBgLight: 'bg-orange-50',
    iconBgDark: 'dark:bg-orange-950/30',
    hoverTextLight: 'group-hover:text-orange-700',
    hoverTextDark: 'dark:group-hover:text-orange-300',
    hoverBorderLight: 'group-hover:border-orange-400',
    hoverBorderDark: 'dark:group-hover:border-orange-500',
    hoverBgLight: 'group-hover:bg-orange-50/80',
    hoverBgDark: 'dark:group-hover:bg-orange-950/20',
  },
  '7': { // কসমেটিকস - Beauty & Cosmetics (Mint / Emerald Green)
    colorName: 'teal',
    bgLight: 'bg-teal-50/40',
    bgDark: 'dark:bg-teal-950/10',
    borderLight: 'border-teal-100/50',
    borderDark: 'dark:border-teal-900/10',
    textLight: 'text-teal-700',
    textDark: 'dark:text-teal-300',
    badgeLight: 'bg-teal-100/40 text-teal-800',
    badgeDark: 'dark:bg-teal-900/30 dark:text-teal-300',
    iconBgLight: 'bg-teal-50',
    iconBgDark: 'dark:bg-teal-950/30',
    hoverTextLight: 'group-hover:text-teal-700',
    hoverTextDark: 'dark:group-hover:text-teal-300',
    hoverBorderLight: 'group-hover:border-teal-400',
    hoverBorderDark: 'dark:group-hover:border-teal-500',
    hoverBgLight: 'group-hover:bg-teal-50/80',
    hoverBgDark: 'dark:group-hover:bg-teal-950/20',
  },
};

// Fallback category theme to guarantee error-free rendering
export const DEFAULT_CATEGORY_THEME: CategoryTheme = {
  colorName: 'emerald',
  bgLight: 'bg-emerald-50/40',
  bgDark: 'dark:bg-emerald-950/10',
  borderLight: 'border-emerald-100/50',
  borderDark: 'dark:border-emerald-900/10',
  textLight: 'text-brand-emerald',
  textDark: 'dark:text-emerald-400',
  badgeLight: 'bg-emerald-100/40 text-emerald-800',
  badgeDark: 'dark:bg-emerald-900/30 dark:text-emerald-300',
  iconBgLight: 'bg-emerald-50',
  iconBgDark: 'dark:bg-emerald-950/30',
  hoverTextLight: 'group-hover:text-brand-emerald',
  hoverTextDark: 'dark:group-hover:text-emerald-450',
  hoverBorderLight: 'group-hover:border-brand-emerald',
  hoverBorderDark: 'dark:group-hover:border-emerald-500',
  hoverBgLight: 'group-hover:bg-emerald-50/80',
  hoverBgDark: 'dark:group-hover:bg-emerald-950/20',
};

export const getCategoryTheme = (id: string): CategoryTheme => {
  return CATEGORY_THEMES[id] || DEFAULT_CATEGORY_THEME;
};

/**
 * Seasonal Campaigns (Data-driven Hero layouts)
 * These dynamically shift the primary presentation color, banner layout,
 * and slogan styling without breaking underlying brand equity.
 */
export interface SeasonalTheme {
  key: string;
  name: string;
  tagline: string;
  badge: string;
  gradient: string;
  accentClass: string;
  borderClass: string;
}

export const SEASONAL_THEMES: SeasonalTheme[] = [
  {
    key: 'default',
    name: 'দেশি মার্ট স্পেশাল',
    tagline: 'প্রতিদিনের প্রয়োজনীয় প্রিমিয়াম পণ্য সম্ভার',
    badge: 'নতুন কালেকশন',
    gradient: 'from-emerald-500/10 via-emerald-600/5 to-transparent',
    accentClass: 'text-brand-emerald dark:text-emerald-400',
    borderClass: 'border-brand-emerald/20 dark:border-slate-800',
  },
  {
    key: 'eid',
    name: 'ঈদ ফেস্ট',
    tagline: 'ঈদ হোক আনন্দময় ও স্টাইলিশ',
    badge: 'ঈদ কালেকশন ২০২৬',
    gradient: 'from-amber-500/10 via-amber-600/5 to-transparent',
    accentClass: 'text-amber-600 dark:text-amber-400',
    borderClass: 'border-amber-200/40 dark:border-amber-800/20',
  },
  {
    key: 'ramadan',
    name: 'রমজান কারিম',
    tagline: 'আত্মশুদ্ধি ও সৌভ্রাতৃত্বের মহিমান্বিত স্পিরিট',
    badge: 'রমজান স্পেশাল',
    gradient: 'from-teal-500/10 via-teal-600/5 to-transparent',
    accentClass: 'text-teal-600 dark:text-teal-400',
    borderClass: 'border-teal-200/40 dark:border-teal-800/20',
  },
  {
    key: 'pohela-boishakh',
    name: 'বৈশাখী মেলা',
    tagline: 'নতুন সাজে নববর্ষের প্রাণোচ্ছল উৎসব',
    badge: '১৪৩৩ বঙ্গাব্দ স্পেশাল',
    gradient: 'from-rose-500/10 via-red-600/5 to-transparent',
    accentClass: 'text-rose-600 dark:text-rose-400',
    borderClass: 'border-rose-200/40 dark:border-rose-800/20',
  },
  {
    key: 'winter',
    name: 'উইন্টার কালেকশন',
    tagline: 'শীতের আমেজে আধুনিক ও আরামদায়ক ট্রিম',
    badge: 'শীতের ফ্যাশন',
    gradient: 'from-sky-500/10 via-blue-600/5 to-transparent',
    accentClass: 'text-sky-600 dark:text-sky-400',
    borderClass: 'border-sky-200/40 dark:border-sky-800/20',
  },
];
