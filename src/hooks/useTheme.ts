import { useThemeContext } from '../context/ThemeContext';

export function useTheme() {
  const { mode, config, isLoading, toggleMode, setMode } = useThemeContext();

  return {
    mode,
    config,
    isLoading,
    toggleMode,
    setMode,
    isDark: mode === 'dark',
    isLight: mode === 'light',
  };
}