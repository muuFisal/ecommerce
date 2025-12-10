import React from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

import { useI18n } from '../i18n/I18nContext';

const LoginPage: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="py-20 min-h-[70vh] flex items-center justify-center bg-bg-base/50">
      <Container className="flex justify-center w-full">
        <Card className="w-full max-w-[420px] rounded-[2.5rem] p-8 space-y-8 bg-bg-elevated border-border-subtle shadow-2xl relative overflow-hidden">
          {/* Decorative Blur */}
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>

          <div className="space-y-3 text-center relative z-10">
            <h1 className="font-display text-3xl font-bold text-text-main">{t('login.title')}</h1>
            <p className="text-sm text-text-muted leading-relaxed max-w-[80%] mx-auto">
              {t('login.subtitle')}
            </p>
          </div>

          <form className="space-y-6 relative z-10">
            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('login.email')}</label>
                    <input
                        type="email"
                        className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/50"
                        placeholder="you@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('login.password')}</label>
                    <input
                        type="password"
                        className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/50"
                        placeholder="••••••••"
                    />
                </div>
            </div>
            
            <div className="flex items-center justify-between text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="h-4 w-4 rounded-md border-border-subtle bg-bg-base checked:bg-primary checked:border-primary transition-colors cursor-pointer" />
                <span className="text-text-muted group-hover:text-text-main transition-colors">{t('login.rememberMe')}</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:text-primary/80 transition-colors">
                {t('login.forgotPassword')}
              </Link>
            </div>

            <Button type="submit" fullWidth className="py-4 text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
              {t('login.submit')}
            </Button>
          </form>

          <div className="pt-2 text-center text-sm font-medium relative z-10">
            <span className="text-text-muted">{t('login.noAccount')}</span>{' '}
            <Link to="/register" className="text-primary hover:text-primary/80 transition-colors font-bold ml-1">
              {t('login.createAccount')}
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default LoginPage;