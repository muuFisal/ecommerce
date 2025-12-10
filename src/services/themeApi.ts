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
  try {
    const res = await fetch('/api/theme', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.warn('[themeApi] Non-OK response, using fallback theme');
      return FALLBACK_THEME;
    }

    const data = await res.json();

    // Expecting backend to send same structure as ThemeConfig, but we
    // still merge with fallback to avoid missing fields causing crashes.
    const merged: ThemeConfig = {
      ...FALLBACK_THEME,
      ...data,
      colors: {
        ...FALLBACK_THEME.colors,
        ...(data.colors ?? {}),
      },
      fonts: {
        ...FALLBACK_THEME.fonts,
        ...(data.fonts ?? {}),
      },
    };

    return merged;
  } catch (error) {
    console.error('[themeApi] Failed to fetch theme from backend, using fallback.', error);
    return FALLBACK_THEME;
  }
}