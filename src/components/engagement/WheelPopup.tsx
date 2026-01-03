import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useEngagement } from '../../context/EngagementContext';
import { useI18n } from '../../i18n/I18nContext';
import { WHEEL_PRIZES, type WheelPrize } from '../../config/wheel';

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = degToRad(angleDeg - 90);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

// Creates a pizza-slice path from center -> arc -> back to center
function describeSlice(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export const WheelPopup: React.FC = () => {
  const { t, lang } = useI18n();
  const { state, canShowWheel, grantWheelCoupon } = useEngagement();

  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0); // degrees
  const [copied, setCopied] = useState(false); // track copy state
  const spinTargetIndex = useRef<number | null>(null);

  const canShow = useMemo(() => canShowWheel(), [canShowWheel, state.lastWheelAt]);

  useEffect(() => {
    if (!canShow) return;
    const timer = setTimeout(() => setOpen(true), 12000);
    return () => clearTimeout(timer);
  }, [canShow]);

  // ✅ Dynamic segments — you control them from src/config/wheel.ts
  const segments: WheelPrize[] = WHEEL_PRIZES;
  const n = segments.length;
  const slice = 360 / n;

  /**
   * Weighted pick (dynamic probabilities).
   * - weights do NOT have to sum to 100 (we normalize).
   * - invalid/negative weights are treated as 0.
   */
  const pickIndex = () => {
    const weights = segments.map((p) => Math.max(0, Number(p.weight ?? 0)));
    const total = weights.reduce((a, b) => a + b, 0);
    if (total <= 0) return Math.floor(Math.random() * segments.length);

    const r = Math.random() * total;
    let acc = 0;
    for (let i = 0; i < weights.length; i++) {
      acc += weights[i];
      if (r <= acc) return i;
    }
    return weights.length - 1;
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const idx = pickIndex();
    spinTargetIndex.current = idx;

    // We want the selected slice center to land at the pointer (top / 0deg).
    const centerAngle = idx * slice + slice / 2;

    // Random wobble inside the slice to feel less “robotic”
    const wobble = (Math.random() - 0.5) * (slice * 0.45); // keep safely inside the slice
    const target = 360 - centerAngle + wobble;

    // Add multiple full spins
    const fullSpins = 6 + Math.floor(Math.random() * 3); // 6..8
    const nextRotation = rotation + fullSpins * 360 + target;

    setRotation(nextRotation);
  };

  const onSpinEnd = () => {
    if (!spinning) return;
    const idx = spinTargetIndex.current;
    if (idx == null) {
      setSpinning(false);
      return;
    }

    const selected = segments[idx];
    const expiresAt = new Date(Date.now() + 7 * 86400000).toISOString();
    grantWheelCoupon({ ...selected, expiresAt });

    setSpinning(false);
  };

  if (!open) return null;
  const coupon = state.wheelCoupon;

  const palette = ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444'];

  // Responsive label sizing based on segment count
  const labelSize = n <= 6 ? 18 : n <= 10 ? 15 : 13;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

      <Card className="relative w-full max-w-md rounded-[2rem] border-border-subtle bg-bg-elevated p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              {t('nassej.wheel.kicker')}
            </p>
            <h3 className="mt-2 font-display text-2xl font-black text-text-main">
              {t('nassej.wheel.title')}
            </h3>
            <p className="mt-1 text-sm text-text-muted">{t('nassej.wheel.desc')}</p>
          </div>
          <button
            className="h-9 w-9 rounded-2xl border border-border-subtle bg-bg-base text-text-main hover:border-primary hover:text-primary"
            onClick={() => setOpen(false)}
            aria-label={t('nassej.wheel.close')}
          >
            ✕
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-border-subtle bg-bg-base/50 p-4">
          {coupon ? (
            <div className="space-y-2">
              <p className="text-sm text-text-muted">{t('nassej.wheel.yourGift')}</p>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-black text-text-main">{coupon.code}</p>
                  <p className="text-xs text-text-muted">
                    {coupon.percent
                      ? `${t('nassej.wheel.percentPrefix')} ${coupon.percent}%`
                      : `${t('nassej.wheel.amountPrefix')} $${coupon.amount ?? 0}`}
                  </p>
                </div>

                <Button
                  className="text-xs"
                  onClick={async () => {
                    try {
                      await navigator.clipboard?.writeText(coupon.code);
                      setCopied(true);
                      
                      // Close modal after 1 second
                      setTimeout(() => {
                        setOpen(false);
                        // Reset copied state for next time
                        setTimeout(() => setCopied(false), 300);
                      }, 1000);
                    } catch (err) {
                      console.error('Failed to copy:', err);
                    }
                  }}
                  disabled={copied}
                >
                  {copied ? '✓ ' + t('nassej.wheel.copied') : t('nassej.wheel.copy')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Wheel */}
              <div className="relative mx-auto flex w-full max-w-[320px] items-center justify-center">
                {/* Pointer */}
                <div
                  className="absolute top-[-6px] z-10 h-0 w-0 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent border-b-primary drop-shadow"
                  aria-hidden
                />

                <div
                  className="relative h-[300px] w-[300px] rounded-full shadow-2xl"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), rgba(0,0,0,0.25))',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: spinning
                        ? 'transform 3.8s cubic-bezier(0.12, 0.75, 0.18, 1)'
                        : 'none',
                      willChange: 'transform',
                    }}
                    onTransitionEnd={onSpinEnd}
                  >
                    <svg viewBox="0 0 320 320" className="h-full w-full">
                      <defs>
                        <filter id="wheelShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
                        </filter>
                      </defs>

                      <g filter="url(#wheelShadow)">
                        {segments.map((seg, i) => {
                          const start = i * slice;
                          const end = (i + 1) * slice;
                          const fill = seg.color ?? palette[i % palette.length];

                          const mid = start + slice / 2;
                          const labelPos = polarToCartesian(160, 160, 105, mid);
                          const labelRotate = mid; // keeps label aligned with slice direction

                          // For Arabic, keep label upright-ish by flipping when on bottom half
                          const flip = lang === 'ar' && mid > 90 && mid < 270;

                          return (
                            <g key={`${seg.code}-${i}`}>
                              <path d={describeSlice(160, 160, 150, start, end)} fill={fill} />
                              <text
                                x={labelPos.x}
                                y={labelPos.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{
                                  fontSize: labelSize,
                                  fontWeight: 800,
                                  fill: 'rgba(255,255,255,0.95)',
                                  textShadow: '0 2px 8px rgba(0,0,0,0.35)',
                                }}
                                transform={`rotate(${flip ? labelRotate + 180 : labelRotate} ${labelPos.x} ${labelPos.y})`}
                              >
                                {seg.labelKey
                                  ? t(seg.labelKey)
                                  : seg.label
                                    ? seg.label
                                    : seg.percent
                                      ? `${seg.percent}%`
                                      : seg.code}
                              </text>
                            </g>
                          );
                        })}

                        {/* Inner hub */}
                        <circle cx="160" cy="160" r="52" fill="white" opacity="0.95" />
                        <circle cx="160" cy="160" r="50" fill="white" />
                        <text
                          x="160"
                          y="160"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{ fontSize: 14, fontWeight: 900, fill: '#111827' }}
                        >
                          {t('nassej.wheel.center')}
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <Button fullWidth className="py-3" onClick={spin} disabled={spinning}>
                {spinning ? t('nassej.wheel.spinning') : t('nassej.wheel.spin')}
              </Button>

              <p className="text-[11px] text-text-muted">{t('nassej.wheel.note')}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
