import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeConfig, ThemeMode } from '../types/theme';
import { fetchThemeConfig } from '../services/themeApi';

interface ThemeContextValue {
  /** User preference: light | dark | system */
  mode: ThemeMode;
  /** Resolved mode that is applied to the document: light | dark */
  resolvedMode: Exclude<ThemeMode, 'system'>;
  config: ThemeConfig | null;
  isLoading: boolean;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  /** Font key selected by user (or null to use backend/default) */
  fontKey: string | null;
  setFontKey: (fontKey: string | null) => void;
  /** Custom colors (primary/secondary) selected by user (or null to use backend/default) */
  colors: { primary: string; secondary: string } | null;
  setColors: (colors: { primary: string; secondary: string } | null) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'ecommerce-theme-mode';
const STORAGE_FONT_KEY = 'ecommerce-theme-font';
const STORAGE_COLORS_KEY = 'ecommerce-theme-colors';

function resolveMode(mode: ThemeMode): Exclude<ThemeMode, 'system'> {
  if (mode === 'system') {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  return mode;
}

function applyThemeToDocument(resolved: Exclude<ThemeMode, 'system'>) {
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add(resolved === 'light' ? 'theme-light' : 'theme-dark');
}

function applyTokensToDocument(config: ThemeConfig) {
  const root = document.documentElement;

  // Colors are mainly controlled via CSS classes (.theme-light / .theme-dark),
  // here we apply fonts coming from backend so you can remote-control typography.
  root.style.setProperty('--font-display', config.fonts.display);
  root.style.setProperty('--font-body', config.fonts.body);
}

function applyFontOverride(fontCss: string | null) {
  const root = document.documentElement;
  if (!fontCss) return;
  root.style.setProperty('--font-display', fontCss);
  root.style.setProperty('--font-body', fontCss);
}

function primarySoftFromHex(hex: string, alpha: number) {
  // Accepts #RRGGBB
  const normalized = hex.replace('#', '').trim();
  if (normalized.length !== 6) return `rgba(34, 197, 94, ${alpha})`;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyColorOverrides(colors: { primary: string; secondary: string } | null, resolvedMode: Exclude<ThemeMode, 'system'>) {
  const root = document.documentElement;
  if (!colors) return;
  const primary = colors.primary;
  const secondary = colors.secondary;
  root.style.setProperty('--color-primary', primary);
  root.style.setProperty('--color-secondary', secondary);

  // Adjust primary soft depending on mode so it stays readable.
  const alpha = resolvedMode === 'dark' ? 0.18 : 0.1;
  root.style.setProperty('--color-primary-soft', primarySoftFromHex(primary, alpha));
}

// 5 font options (loaded via Google Fonts in index.html)
export const FONT_OPTIONS: Array<{ key: string; label: string; css: string }> = [
  { key: 'inter', label: 'Inter', css: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  { key: 'poppins', label: 'Poppins', css: "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  { key: 'cairo', label: 'Cairo', css: "'Cairo', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  { key: 'tajawal', label: 'Tajawal', css: "'Tajawal', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  { key: 'rubik', label: 'Rubik', css: "'Rubik', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [resolvedMode, setResolvedMode] = useState<Exclude<ThemeMode, 'system'>>('dark');
  const [config, setConfig] = useState<ThemeConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fontKey, setFontKeyState] = useState<string | null>(null);
  const [colors, setColorsState] = useState<{ primary: string; secondary: string } | null>(null);

  useEffect(() => {
    const storedMode = (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? null;
    const storedFontKey = (localStorage.getItem(STORAGE_FONT_KEY) as string | null) ?? null;
    const storedColorsRaw = localStorage.getItem(STORAGE_COLORS_KEY);

    const initialMode: ThemeMode =
      storedMode === 'light' || storedMode === 'dark' || storedMode === 'system' ? storedMode : 'system';
    setModeState(initialMode);
    const initialResolved = resolveMode(initialMode);
    setResolvedMode(initialResolved);
    applyThemeToDocument(initialResolved);

    if (storedFontKey) {
      setFontKeyState(storedFontKey);
    }

    if (storedColorsRaw) {
      try {
        const parsed = JSON.parse(storedColorsRaw) as { primary?: string; secondary?: string };
        if (parsed?.primary && parsed?.secondary) {
          setColorsState({ primary: parsed.primary, secondary: parsed.secondary });
          applyColorOverrides({ primary: parsed.primary, secondary: parsed.secondary }, initialResolved);
        }
      } catch {
        // ignore
      }
    }

    (async () => {
      setIsLoading(true);
      const themeConfig = await fetchThemeConfig();
      setConfig(themeConfig);

      // If backend suggests a default mode and nothing stored yet.
      if (!storedMode && themeConfig.mode && themeConfig.mode !== 'system') {
        setModeState('system');
      }

      applyTokensToDocument(themeConfig);

      // Apply font override if exists
      if (storedFontKey) {
        const picked = FONT_OPTIONS.find((f) => f.key === storedFontKey)?.css ?? null;
        applyFontOverride(picked);
      }

      setIsLoading(false);
    })();
  }, []);

  // Keep in sync when OS preference changes while mode=system
  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return;
    const handler = () => {
      const nextResolved = resolveMode('system');
      setResolvedMode(nextResolved);
      applyThemeToDocument(nextResolved);
      applyColorOverrides(colors, nextResolved);
    };
    handler();
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, [mode, colors]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    const nextResolved = resolveMode(newMode);
    setResolvedMode(nextResolved);
    applyThemeToDocument(nextResolved);
    applyColorOverrides(colors, nextResolved);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const toggleMode = () => {
    // Simple toggle between dark/light. If currently system, toggle to dark.
    if (mode === 'system') return setMode('dark');
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const setFontKey = (nextKey: string | null) => {
    setFontKeyState(nextKey);
    if (!nextKey) {
      localStorage.removeItem(STORAGE_FONT_KEY);
      // Re-apply backend defaults if available
      if (config) applyTokensToDocument(config);
      return;
    }
    localStorage.setItem(STORAGE_FONT_KEY, nextKey);
    const picked = FONT_OPTIONS.find((f) => f.key === nextKey)?.css ?? null;
    applyFontOverride(picked);
  };

  const setColors = (next: { primary: string; secondary: string } | null) => {
    setColorsState(next);
    if (!next) {
      localStorage.removeItem(STORAGE_COLORS_KEY);
      // Reset to theme defaults by removing inline overrides.
      const root = document.documentElement;
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--color-secondary');
      root.style.removeProperty('--color-primary-soft');
      return;
    }
    localStorage.setItem(STORAGE_COLORS_KEY, JSON.stringify(next));
    applyColorOverrides(next, resolvedMode);
  };

  const value: ThemeContextValue = {
    mode,
    resolvedMode,
    config,
    isLoading,
    toggleMode,
    setMode,
    fontKey,
    setFontKey,
    colors,
    setColors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return ctx;
}