export type WheelPrize = {
  /** Stable id for analytics / storage */
  id: string;
  /** Coupon code to be stored & copied */
  code: string;
  /** UI label (fallback when labelKey is not provided) */
  label?: string;
  /** i18n key for label (recommended) */
  labelKey?: string;
  /** Discount percent OR fixed amount (one of them) */
  percent?: number;
  amount?: number;
  /**
   * Win weight. You control the probability by changing this number.
   * Example: 60 for 60%, and distribute the remaining weights across other prizes.
   * The wheel will normalize automatically (weights do NOT have to sum to 100).
   */
  weight: number;
  /** Optional custom color for the slice */
  color?: string;
};

/**
 * ✅ Edit this list to control:
 * - How many prizes are shown (4,5,6,12,13...)
 * - The probability of each prize via `weight`
 *
 * Notes:
 * - Keep `id` unique.
 * - Use either `percent` OR `amount`.
 */
export const WHEEL_PRIZES: WheelPrize[] = [
  {
    id: 'p20',
    code: 'NASSEJ-20',
    labelKey: 'nassej.wheel.prize.20',
    percent: 20,
    weight: 60,
  },
  {
    id: 'p10',
    code: 'NASSEJ-10',
    labelKey: 'nassej.wheel.prize.10',
    percent: 10,
    weight: 20,
  },
  {
    id: 'p5',
    code: 'NASSEJ-5',
    labelKey: 'nassej.wheel.prize.5',
    percent: 5,
    weight: 15,
  },
  {
    id: 'ship',
    code: 'FREE-SHIP',
    labelKey: 'nassej.wheel.prize.shipping',
    amount: 20,
    weight: 5,
  },
];
