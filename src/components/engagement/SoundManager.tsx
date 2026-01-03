import React, { useEffect } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

type SoundName = 'click' | 'success' | 'wish';

const LS_KEY = 'nassej.sound.enabled';

function getAudio(name: SoundName): HTMLAudioElement | null {
  // Tiny data-URI wav blips (very short) so we don't add asset files.
  const SOURCES: Record<SoundName, string> = {
    click:
      'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
    success:
      'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
    wish:
      'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  };
  try {
    return new Audio(SOURCES[name]);
  } catch {
    return null;
  }
}

export const SoundManager: React.FC = () => {
  const [enabled] = useLocalStorageState<boolean>(LS_KEY, false);

  useEffect(() => {
    const handler = (e: Event) => {
      if (!enabled) return;
      const ce = e as CustomEvent<{ name: SoundName }>;
      const name = ce.detail?.name ?? 'click';
      const a = getAudio(name);
      if (!a) return;
      a.volume = 0.25;
      a.play().catch(() => void 0);
    };
    window.addEventListener('nassej:sound', handler as any);
    return () => window.removeEventListener('nassej:sound', handler as any);
  }, [enabled]);

  return null;
};

export function dispatchSound(name: SoundName) {
  window.dispatchEvent(new CustomEvent('nassej:sound', { detail: { name } }));
}

export const SOUND_LS_KEY = LS_KEY;
