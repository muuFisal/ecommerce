import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { useI18n } from '../../../i18n/I18nContext';

export const CTASection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="pb-20">
      <Container>
        <div className="glass-card flex flex-col gap-6 rounded-[2rem] border border-border-subtle/70 bg-gradient-to-r from-bg-elevated/90 via-bg-elevated/80 to-bg-soft/90 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="space-y-3 lg:max-w-2xl">
            <div className="inline-flex rounded-full bg-primary/10 px-3 py-1">
               <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary">
                 {t('cta.brand.kicker')}
               </p>
            </div>
            <h3 className="font-display text-2xl font-bold leading-tight text-text-main sm:text-3xl">
              {t('cta.brand.title')}
            </h3>
            <p className="text-sm leading-relaxed text-text-muted sm:text-base">
              {t('cta.brand.desc')}
            </p>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-shrink-0">
            <Button className="w-full sm:w-auto px-6 py-3 text-sm font-semibold shadow-lg shadow-primary/20">
                {t('cta.brand.waitlist')}
            </Button>
            <Button variant="ghost" className="w-full sm:w-auto px-6 py-3 text-sm font-medium hover:bg-bg-base/50">
              {t('cta.brand.contact')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};