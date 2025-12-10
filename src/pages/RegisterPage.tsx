import React from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const RegisterPage: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="py-20 min-h-[80vh] flex items-center justify-center bg-bg-base/50">
      <Container className="flex justify-center w-full">
        <Card className="w-full max-w-[500px] rounded-[2.5rem] p-8 space-y-8 bg-bg-elevated border-border-subtle shadow-2xl relative overflow-hidden">
           {/* Decorative Blur */}
           <div className="absolute top-0 left-0 -ml-20 -mt-20 w-40 h-40 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"></div>

          <div className="space-y-3 text-center relative z-10">
            <h1 className="font-display text-3xl font-bold text-text-main">{t('register.title')}</h1>
            <p className="text-sm text-text-muted leading-relaxed max-w-[90%] mx-auto">
              {t('register.subtitle')}
            </p>
          </div>

          <form className="space-y-6 relative z-10">
              {/* Profile Image Upload UI */}
             <div className="flex justify-center">
                <div className="relative group cursor-pointer">
                    <div className="h-24 w-24 rounded-full bg-bg-base border-2 border-dashed border-border-subtle flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
                        <span className="text-2xl text-text-muted group-hover:text-primary transition-colors">📷</span>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </div>
                </div>
             </div>

            <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('register.fullName')}</label>
                    <input
                        type="text"
                        className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/50"
                        placeholder="John Doe"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('register.governorate')}</label>
                        <select className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all appearance-none">
                            <option value="">{t('register.selectGovernorate')}</option>
                            <option value="cairo">Cairo</option>
                            <option value="giza">Giza</option>
                            <option value="alex">Alexandria</option>
                        </select>
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('register.city')}</label>
                        <select className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all appearance-none">
                            <option value="">{t('register.selectCity')}</option>
                            <option value="nasr_city">Nasr City</option>
                            <option value="heliopolis">Heliopolis</option>
                            <option value="maadi">Maadi</option>
                        </select>
                    </div>
                </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('register.phone')}</label>
                    <input
                        type="tel"
                        className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/50"
                        placeholder="+20 1xx xxx xxxx"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('register.email')}</label>
                    <input
                        type="email"
                        className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/50"
                        placeholder="you@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('register.password')}</label>
                    <input
                        type="password"
                        className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/50"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <Button type="submit" fullWidth className="py-4 text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
              {t('register.submit')}
            </Button>
          </form>

          <div className="space-y-4 text-center relative z-10">
            <p className="text-xs font-medium text-text-muted">
                {t('register.hasAccount')}{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-bold ml-1">
                {t('register.signIn')}
                </Link>
            </p>
            <p className="text-[10px] text-text-muted max-w-xs mx-auto leading-relaxed opacity-60">
                {t('register.disclaimer')}
            </p>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default RegisterPage;