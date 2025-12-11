import type { ThemeConfig } from '../types/theme';

const FALLBACK_THEME: ThemeConfig = {
  mode: 'dark',
  colors: {
    primary: '#22c55e',
    secondary: '#38bdf8',
    accent: '#f97316',
    primarySoft: 'rgba(34, 197, 94, 0.18)',
    background: '#020617',
    backgroundElevated: '#020617',
    backgroundSoft: '#030712',
    textMain: '#e5e7eb',
    textMuted: '#9ca3af',
    borderSubtle: 'rgba(148, 163, 184, 0.4)',
  },
  fonts: {
    display: 'Poppins, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif',
    body: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif',
  },
};

export async function fetchThemeConfig(): Promise<ThemeConfig> {
  // Since this is a frontend-only app, we skip the API call
  // and directly return the fallback theme configuration
  return FALLBACK_THEME;
}