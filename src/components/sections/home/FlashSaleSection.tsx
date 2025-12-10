import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { Link } from 'react-router-dom';
import { useI18n } from '../../../i18n/I18nContext';

export const FlashSaleSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="pb-16">
      <Container>
        <div className="glass-card flex flex-col items-start justify-between gap-4 rounded-3xl border border-primary/40 bg-gradient-to-r from-primary-soft via-bg-elevated/90 to-secondary/20 p-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {t('section.flashSale')}
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-main">
              {t('flash.title')}
            </h2>
            <p className="text-xs text-text-muted">{t('flash.description')}</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex gap-2 text-center text-[11px] text-text-main">
              <div className="min-w-[3rem] rounded-2xl bg-bg-base/80 px-2 py-1.5">
                <div className="font-semibold">12</div>
                <div className="text-[9px] text-text-muted">Hours</div>
              </div>
              <div className="min-w-[3rem] rounded-2xl bg-bg-base/80 px-2 py-1.5">
                <div className="font-semibold">45</div>
                <div className="text-[9px] text-text-muted">Minutes</div>
              </div>
              <div className="min-w-[3rem] rounded-2xl bg-bg-base/80 px-2 py-1.5">
                <div className="font-semibold">18</div>
                <div className="text-[9px] text-text-muted">Seconds</div>
              </div>
            </div>
            <Link to="/flash-sale">
              <Button className="px-4 py-2 text-xs">{t('flash.shopNow')}</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};