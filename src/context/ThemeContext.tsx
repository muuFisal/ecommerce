import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeConfig, ThemeMode } from '../types/theme';
import { fetchThemeConfig } from '../services/themeApi';

interface ThemeContextValue {
  mode: ThemeMode;
  config: ThemeConfig | null;
  isLoading: boolean;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'ecommerce-theme-mode';

function applyThemeToDocument(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add(mode === 'light' ? 'theme-light' : 'theme-dark');
}

function applyTokensToDocument(config: ThemeConfig) {
  const root = document.documentElement;

  // Colors are mainly controlled via CSS classes (.theme-light / .theme-dark),
  // here we apply fonts coming from backend so you can remote-control typography.
  root.style.setProperty('--font-display', config.fonts.display);
  root.style.setProperty('--font-body', config.fonts.body);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [config, setConfig] = useState<ThemeConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedMode = (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? null;
    if (storedMode === 'light' || storedMode === 'dark') {
      setModeState(storedMode);
      applyThemeToDocument(storedMode);
    } else {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      const initialMode: ThemeMode = prefersDark ? 'dark' : 'light';
      setModeState(initialMode);
      applyThemeToDocument(initialMode);
    }

    (async () => {
      setIsLoading(true);
      const themeConfig = await fetchThemeConfig();
      setConfig(themeConfig);

      // If backend suggests a default mode and nothing stored yet.
      if (!storedMode && themeConfig.mode) {
        setModeState(themeConfig.mode);
        applyThemeToDocument(themeConfig.mode);
      }

      applyTokensToDocument(themeConfig);
      setIsLoading(false);
    })();
  }, []);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    applyThemeToDocument(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const value: ThemeContextValue = {
    mode,
    config,
    isLoading,
    toggleMode,
    setMode,
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