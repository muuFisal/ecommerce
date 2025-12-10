export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  primarySoft: string;
  background: string;
  backgroundElevated: string;
  backgroundSoft: string;
  textMain: string;
  textMuted: string;
  borderSubtle: string;
}

export interface ThemeFonts {
  display: string;
  body: string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  colors: ThemeColors;
  fonts: ThemeFonts;
}