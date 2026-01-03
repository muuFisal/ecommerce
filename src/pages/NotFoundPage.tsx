import React from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const NotFoundPage: React.FC = () => {
  const { t } = useI18n();
  
  return (
    <section className="py-16">
      <Container className="flex flex-col items-center text-center space-y-5">
        <p className="text-xs uppercase tracking-[0.3em] text-text-muted">404</p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text-main">
          {t('notFound.title')}
        </h1>
        <p className="max-w-md text-sm text-text-muted">
          {t('notFound.description')}
        </p>
        <Link to="/">
          <Button className="px-5 py-2.5 text-xs">{t('notFound.backHome')}</Button>
        </Link>
      </Container>
    </section>
  );
};

export default NotFoundPage;