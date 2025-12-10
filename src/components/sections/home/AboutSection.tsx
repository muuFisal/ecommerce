import React from 'react';
import { Container } from '../../ui/Container';
import { Card } from '../../ui/Card';
import { useI18n } from '../../../i18n/I18nContext';

export const AboutSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="pb-16">
      <Container className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
            {t('section.about')}
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-main">
            {t('section.aboutTitle')}
          </h2>
          <p className="text-sm text-text-muted">{t('section.aboutParagraph1')}</p>
          <p className="text-sm text-text-muted">{t('section.aboutParagraph2')}</p>
        </div>
        <Card className="space-y-3 rounded-3xl p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
            {t('section.aboutCardTitle')}
          </p>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>{t('section.aboutCardLine1')}</li>
            <li>{t('section.aboutCardLine2')}</li>
            <li>{t('section.aboutCardLine3')}</li>
            <li>{t('section.aboutCardLine4')}</li>
          </ul>
        </Card>
      </Container>
    </section>
  );
};