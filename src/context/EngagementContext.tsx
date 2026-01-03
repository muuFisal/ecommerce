import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

// Stored coupon can come from the Lucky Wheel (dynamic prizes).
// Keep it flexible to allow new prize fields later without breaking old data.
type Coupon = {
  id?: string;
  code: string;
  label?: string;
  labelKey?: string;
  percent?: number;
  amount?: number;
  expiresAt?: string;
};

export type EmotionKey = 'love' | 'okay' | 'meh' | 'sad' | 'angry';

export type EngagementState = {
  points: number;
  level: number;
  lastWheelAt?: number;
  wheelCoupon?: Coupon | null;
  productViews: Record<string, number>; // productId -> count
  emotionRatings: Record<string, EmotionKey>; // productId -> emotion
  exitReasons: Array<{ at: number; reason: string; note?: string }>;
  unlockedDrops: string[]; // drop codes or ids
  vipUnlocked: boolean;
};

const DEFAULT_STATE: EngagementState = {
  points: 0,
  level: 1,
  wheelCoupon: null,
  productViews: {},
  emotionRatings: {},
  exitReasons: [],
  unlockedDrops: [],
  vipUnlocked: false,
};

type EngagementContextValue = {
  state: EngagementState;
  addPoints: (amount: number, reason?: string) => void;
  trackView: (productId: string) => number;
  setEmotion: (productId: string, emotion: EmotionKey) => void;
  logExitReason: (reason: string, note?: string) => void;
  canShowWheel: () => boolean;
  grantWheelCoupon: (coupon: Coupon) => void;
  unlockDrop: (code: string) => void;
  unlockVip: () => void;
};

const Ctx = createContext<EngagementContextValue | undefined>(undefined);

function computeLevel(points: number): number {
  // Simple leveling: 0-199 -> L1, 200-499 -> L2, 500-999 -> L3, 1000+ -> L4
  if (points >= 1000) return 4;
  if (points >= 500) return 3;
  if (points >= 200) return 2;
  return 1;
}

export const EngagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useLocalStorageState<EngagementState>('nassej.engagement', DEFAULT_STATE);

  const value = useMemo<EngagementContextValue>(() => {
    const addPoints = (amount: number) => {
      setState((prev) => {
        const points = Math.max(0, (prev.points ?? 0) + amount);
        const level = computeLevel(points);
        return { ...prev, points, level };
      });
    };

    const trackView = (productId: string) => {
      let next = 0;
      setState((prev) => {
        const current = prev.productViews?.[productId] ?? 0;
        next = current + 1;
        return {
          ...prev,
          productViews: { ...(prev.productViews ?? {}), [productId]: next },
        };
      });
      // small reward for engagement (only for first few views per product)
      if (next <= 3) addPoints(2);
      return next;
    };

    const setEmotion = (productId: string, emotion: EmotionKey) => {
      setState((prev) => ({
        ...prev,
        emotionRatings: { ...(prev.emotionRatings ?? {}), [productId]: emotion },
      }));
      addPoints(5);
    };

    const logExitReason = (reason: string, note?: string) => {
      setState((prev) => ({
        ...prev,
        exitReasons: [{ at: Date.now(), reason, note }, ...(prev.exitReasons ?? [])].slice(0, 50),
      }));
    };

    const canShowWheel = () => {
      const last = state.lastWheelAt ?? 0;
      const days = 3; // show at most once every 3 days
      return Date.now() - last > days * 24 * 60 * 60 * 1000;
    };

    const grantWheelCoupon = (coupon: Coupon) => {
      setState((prev) => ({ ...prev, lastWheelAt: Date.now(), wheelCoupon: coupon }));
      addPoints(10);
    };

    const unlockDrop = (code: string) => {
      setState((prev) => ({
        ...prev,
        unlockedDrops: Array.from(new Set([...(prev.unlockedDrops ?? []), code])),
      }));
      addPoints(15);
    };

    const unlockVip = () => {
      setState((prev) => ({ ...prev, vipUnlocked: true }));
      addPoints(25);
    };

    return {
      state,
      addPoints,
      trackView,
      setEmotion,
      logExitReason,
      canShowWheel,
      grantWheelCoupon,
      unlockDrop,
      unlockVip,
    };
  }, [setState, state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useEngagement() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useEngagement must be used within EngagementProvider');
  return ctx;
}
