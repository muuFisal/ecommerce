import React, { useEffect, useMemo, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useEngagement } from '../../context/EngagementContext';
import { useI18n } from '../../i18n/I18nContext';

const REASONS = [
  'just_browsing',
  'prices',
  'shipping',
  'not_sure',
  'other',
];

export const ExitIntentModal: React.FC = () => {
  const { t } = useI18n();
  const { logExitReason } = useEngagement();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>('just_browsing');
  const [note, setNote] = useState('');

  const shouldArm = useMemo(() => {
    // do not bother mobile users with exit-intent
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 768;
  }, []);

  useEffect(() => {
    if (!shouldArm) return;
    let shown = false;
    const onMouseOut = (e: MouseEvent) => {
      if (shown) return;
      // Trigger when user moves toward top (browser chrome)
      if (e.clientY <= 0) {
        shown = true;
        setOpen(true);
      }
    };
    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, [shouldArm]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <Card className="relative w-full max-w-lg rounded-[2rem] border-border-subtle bg-bg-elevated p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              {t('exit.kicker')}
            </p>
            <h3 className="mt-2 font-display text-2xl font-black text-text-main">
              {t('exit.title')}
            </h3>
            <p className="mt-1 text-sm text-text-muted">{t('exit.desc')}</p>
          </div>
          <button
            className="h-9 w-9 rounded-2xl border border-border-subtle bg-bg-base text-text-main hover:border-primary hover:text-primary"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            {REASONS.map((k) => (
              <button
                key={k}
                onClick={() => setReason(k)}
                className={
                  'rounded-2xl border px-4 py-3 text-left text-sm transition ' +
                  (reason === k
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border-subtle bg-bg-base text-text-main hover:border-primary/60')
                }
              >
                {t(`exit.reason.${k}`)}
              </button>
            ))}
          </div>

          {reason === 'other' ? (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[96px] w-full rounded-2xl border border-border-subtle bg-bg-base px-4 py-3 text-sm text-text-main outline-none focus:border-primary"
              placeholder={t('exit.notePlaceholder')}
            />
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="flex-1 py-3"
              onClick={() => {
                logExitReason(reason, note.trim() || undefined);
                setOpen(false);
              }}
            >
              {t('exit.submit')}
            </Button>
            <Button variant="secondary" className="flex-1 py-3" onClick={() => setOpen(false)}>
              {t('exit.stay')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
