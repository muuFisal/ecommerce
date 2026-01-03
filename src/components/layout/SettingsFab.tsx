import React, { useEffect, useMemo, useState } from 'react';
import { Languages, Laptop, Moon, Palette, Settings, Sun, Type, X } from 'lucide-react';
import { useThemeContext, FONT_OPTIONS } from '../../context/ThemeContext';
import { useI18n } from '../../i18n/I18nContext';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { SOUND_LS_KEY } from '../engagement/SoundManager';

const COLOR_PRESETS: Array<{ primary: string; secondary: string }> = [
  { primary: '#22c55e', secondary: '#38bdf8' },
  { primary: '#a855f7', secondary: '#22c55e' },
  { primary: '#f97316', secondary: '#0ea5e9' },
  { primary: '#ef4444', secondary: '#f59e0b' },
  { primary: '#14b8a6', secondary: '#6366f1' },
];

function isValidHexColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export const SettingsFab: React.FC = () => {
  const { lang, t, setLang } = useI18n();
  const {
    mode,
    resolvedMode,
    setMode,
    fontKey,
    setFontKey,
    colors,
    setColors,
    autoDarkByTime,
    setAutoDarkByTime,
  } = useThemeContext();

  const [soundsEnabled, setSoundsEnabled] = useLocalStorageState<boolean>(SOUND_LS_KEY, false);

  const [open, setOpen] = useState(false);
  const side = lang === 'ar' ? 'right' : 'left';
  const isRTL = lang === 'ar';

  const currentColors = colors ?? { primary: '#22c55e', secondary: '#38bdf8' };
  const [primary, setPrimary] = useState(currentColors.primary);
  const [secondary, setSecondary] = useState(currentColors.secondary);

  // ✅ Resolve actual theme (dark/light) to style native selects/options correctly
  const [isDarkResolved, setIsDarkResolved] = useState(false);
  useEffect(() => {
    setIsDarkResolved(resolvedMode === 'dark');
  }, [resolvedMode]);

  useEffect(() => {
    // Keep local inputs in sync when colors change from elsewhere.
    const c = colors ?? { primary: '#22c55e', secondary: '#38bdf8' };
    setPrimary(c.primary);
    setSecondary(c.secondary);
  }, [colors]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const fontLabel = useMemo(() => {
    const found = FONT_OPTIONS.find((f) => f.key === (fontKey ?? ''));
    return found?.label ?? FONT_OPTIONS[0].label;
  }, [fontKey]);

  const applyColors = (p: string, s: string) => {
    if (isValidHexColor(p) && isValidHexColor(s)) {
      setColors({ primary: p, secondary: s });
    }
  };

  // ✅ Styling for native <option> to avoid unreadable dropdown in dark mode
  const optionStyle: React.CSSProperties = isDarkResolved
    ? { backgroundColor: '#0b1220', color: '#ffffff' }
    : { backgroundColor: '#ffffff', color: '#0f172a' };

  // ✅ RTL-safe toggle knob positioning (no translate-x; use left/right)
  const toggleKnobPosition = (enabled: boolean) => {
    // LTR: off = left, on = right
    // RTL: off = right, on = left
    if (isRTL) {
      return enabled ? 'left-1' : 'right-1';
    }
    return enabled ? 'right-1' : 'left-1';
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        aria-label={t('settings.title')}
        onClick={() => setOpen((v) => !v)}
        className={
          `fixed bottom-6 ${side}-6 z-50 inline-flex h-12 w-12 items-center justify-center ` +
          `rounded-full border border-border-subtle bg-bg-elevated/90 shadow-lg backdrop-blur ` +
          `transition hover:scale-[1.03] active:scale-[0.98]`
        }
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Side panel */}
      <div
        className={`fixed inset-0 z-50 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        {/* overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* drawer */}
        <div
          className={
            `absolute bottom-6 ${side}-6 ` +
            `w-[340px] max-w-[calc(100vw-3rem)] sm:w-[380px] md:w-[420px] ` +
            `max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-4rem)] ` +
            `rounded-2xl flex flex-col ` +
            `border border-border-subtle bg-bg-elevated/98 shadow-2xl backdrop-blur ` +
            `ring-1 ring-black/10 dark:ring-white/10 ` +
            `transition-transform duration-200 ${
              open ? 'translate-x-0' : side === 'left' ? '-translate-x-4' : 'translate-x-4'
            }`
          }
          style={{ opacity: open ? 1 : 0 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Header - Fixed */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle shrink-0">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-text-muted" />
              <div className="font-display text-sm font-semibold">{t('settings.title')}</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('settings.title')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-bg-base/70 hover:bg-bg-base"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="space-y-4 px-4 py-4 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
            {/* Theme */}
            <div className="rounded-2xl border border-border-subtle bg-bg-base/70 dark:bg-bg-base/40 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Palette className="h-4 w-4 text-text-muted" />
                <span>{t('settings.theme')}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('system')}
                  className={
                    `flex items-center justify-center gap-2 rounded-xl border px-2 py-2 text-sm ` +
                    `${mode === 'system'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
                      : 'border-border-subtle bg-bg-elevated/60 hover:bg-bg-elevated'}`
                  }
                >
                  <Laptop className="h-4 w-4" />
                  {t('settings.theme.system')}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('light')}
                  className={
                    `flex items-center justify-center gap-2 rounded-xl border px-2 py-2 text-sm ` +
                    `${mode === 'light'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
                      : 'border-border-subtle bg-bg-elevated/60 hover:bg-bg-elevated'}`
                  }
                >
                  <Sun className="h-4 w-4" />
                  {t('settings.theme.light')}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('dark')}
                  className={
                    `flex items-center justify-center gap-2 rounded-xl border px-2 py-2 text-sm ` +
                    `${mode === 'dark'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
                      : 'border-border-subtle bg-bg-elevated/60 hover:bg-bg-elevated'}`
                  }
                >
                  <Moon className="h-4 w-4" />
                  {t('settings.theme.dark')}
                </button>
              </div>

              {/* Auto dark by time */}
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-bg-elevated/60 px-3 py-2">
                <div className="text-xs">
                  <p className="font-semibold text-text-main">{t('settings.autoDarkByTime')}</p>
                  <p className="text-[11px] text-text-muted">{t('settings.autoDarkByTimeDesc')}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setAutoDarkByTime(!autoDarkByTime)}
                  className={
                    'relative h-8 w-14 rounded-full border transition ' +
                    (autoDarkByTime ? 'border-primary bg-primary/20' : 'border-border-subtle bg-bg-base')
                  }
                  aria-label={t('settings.autoDarkByTime')}
                >
                  <span
                    className={
                      'absolute top-1 h-6 w-6 rounded-full transition-all duration-200 ' +
                      toggleKnobPosition(autoDarkByTime) +
                      ' ' +
                      (autoDarkByTime ? 'bg-primary' : 'bg-text-main')
                    }
                  />
                </button>
              </div>
            </div>

            {/* Language */}
            <div className="rounded-2xl border border-border-subtle bg-bg-base/70 dark:bg-bg-base/40 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Languages className="h-4 w-4 text-text-muted" />
                <span>{t('settings.language')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={
                    `rounded-xl border px-3 py-2 text-sm ` +
                    `${lang === 'en'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
                      : 'border-border-subtle bg-bg-elevated/60 hover:bg-bg-elevated'}`
                  }
                >
                  {t('settings.language.en')}
                </button>
                <button
                  type="button"
                  onClick={() => setLang('ar')}
                  className={
                    `rounded-xl border px-3 py-2 text-sm ` +
                    `${lang === 'ar'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
                      : 'border-border-subtle bg-bg-elevated/60 hover:bg-bg-elevated'}`
                  }
                >
                  {t('settings.language.ar')}
                </button>
              </div>
            </div>

            {/* Font */}
            <div className="rounded-2xl border border-border-subtle bg-bg-base/70 dark:bg-bg-base/40 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Type className="h-4 w-4 text-text-muted" />
                <span>{t('settings.font')}</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={fontKey ?? ''}
                  onChange={(e) => setFontKey(e.target.value || null)}
                  style={{ colorScheme: isDarkResolved ? 'dark' : 'light' }}
                  className={
                    `h-10 w-full rounded-xl border border-border-subtle px-3 text-sm outline-none transition-colors ` +
                    `cursor-pointer ` +
                    `bg-bg-elevated/70 text-text-main ` +
                    `hover:bg-bg-elevated hover:border-[var(--color-primary)]/50 ` +
                    `focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20`
                  }
                >
                  <option value="" style={optionStyle}>{fontLabel}</option>
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.key} value={f.key} style={optionStyle}>
                      {f.label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setFontKey(null)}
                  className={
                    `h-10 whitespace-nowrap rounded-xl border border-border-subtle px-3 text-sm transition-colors ` +
                    `bg-bg-elevated/60 text-text-main ` +
                    `hover:bg-bg-elevated hover:border-[var(--color-primary)]/50`
                  }
                >
                  {t('settings.reset')}
                </button>
              </div>

              <div
                className="mt-2 text-xs text-text-muted"
                style={{ fontFamily: FONT_OPTIONS.find((f) => f.key === fontKey)?.css }}
              >
                Aa — {fontKey ? FONT_OPTIONS.find((f) => f.key === fontKey)?.label : fontLabel}
              </div>
            </div>

            {/* Sounds */}
            <div className="rounded-2xl border border-border-subtle bg-bg-base/70 dark:bg-bg-base/40 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <span className="text-text-muted">🔊</span>
                <span>{t('settings.sounds')}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-bg-elevated/60 px-3 py-2">
                <div className="text-xs">
                  <p className="font-semibold text-text-main">{t('settings.soundsOn')}</p>
                  <p className="text-[11px] text-text-muted">{t('settings.soundsDesc')}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSoundsEnabled(!soundsEnabled)}
                  className={
                    'relative h-8 w-14 rounded-full border transition ' +
                    (soundsEnabled ? 'border-primary bg-primary/20' : 'border-border-subtle bg-bg-base')
                  }
                  aria-label={t('settings.sounds')}
                >
                  <span
                    className={
                      'absolute top-1 h-6 w-6 rounded-full transition-all duration-200 ' +
                      toggleKnobPosition(soundsEnabled) +
                      ' ' +
                      (soundsEnabled ? 'bg-primary' : 'bg-text-main')
                    }
                  />
                </button>
              </div>
            </div>

            {/* Colors */}
            <div className="rounded-2xl border border-border-subtle bg-bg-base/70 dark:bg-bg-base/40 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Palette className="h-4 w-4 text-text-muted" />
                <span>{t('settings.colors')}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label
                  className={
                    `flex items-center justify-between gap-2 rounded-xl border border-border-subtle px-3 py-2 text-sm transition-colors cursor-pointer ` +
                    `bg-bg-elevated/60 ` +
                    `hover:bg-bg-elevated hover:border-[var(--color-primary)]/50`
                  }
                >
                  <span className="text-text-muted">{t('settings.primary')}</span>
                  <input
                    type="color"
                    value={primary}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPrimary(v);
                      applyColors(v, secondary);
                    }}
                    className="h-7 w-10 cursor-pointer bg-transparent"
                  />
                </label>

                <label
                  className={
                    `flex items-center justify-between gap-2 rounded-xl border border-border-subtle px-3 py-2 text-sm transition-colors cursor-pointer ` +
                    `bg-bg-elevated/60 ` +
                    `hover:bg-bg-elevated hover:border-[var(--color-primary)]/50`
                  }
                >
                  <span className="text-text-muted">{t('settings.secondary')}</span>
                  <input
                    type="color"
                    value={secondary}
                    onChange={(e) => {
                      const v = e.target.value;
                      setSecondary(v);
                      applyColors(primary, v);
                    }}
                    className="h-7 w-10 cursor-pointer bg-transparent"
                  />
                </label>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2">
                  {COLOR_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPrimary(p.primary);
                        setSecondary(p.secondary);
                        setColors({ primary: p.primary, secondary: p.secondary });
                      }}
                      className={
                        `h-9 w-9 rounded-xl border border-border-subtle transition-colors ` +
                        `bg-bg-elevated/60 ` +
                        `hover:bg-bg-elevated hover:border-[var(--color-primary)]/50`
                      }
                      aria-label={`preset-${idx}`}
                    >
                      <span
                        className="mx-auto block h-5 w-5 rounded-full"
                        style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})` }}
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setColors(null)}
                  className={
                    `h-9 rounded-xl border border-border-subtle px-3 text-sm transition-colors ` +
                    `bg-bg-elevated/60 text-text-main ` +
                    `hover:bg-bg-elevated hover:border-[var(--color-primary)]/50`
                  }
                >
                  {t('settings.reset')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
