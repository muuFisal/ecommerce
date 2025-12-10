import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nContext';
import { useNavigate } from 'react-router-dom';

const VerifyAccountPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length >= 4) {
        // Simulate verification success
        // In a real app, this would verify with backend
        navigate('/login');
    }
  };

  return (
    <section className="py-20 min-h-[70vh] flex items-center justify-center bg-bg-base/50">
      <Container className="flex justify-center w-full">
        <Card className="w-full max-w-[420px] rounded-[2.5rem] p-8 space-y-8 bg-bg-elevated border-border-subtle shadow-2xl relative overflow-hidden">
           {/* Decorative Blur */}
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none"></div>

          <div className="space-y-3 text-center relative z-10">
            <h1 className="font-display text-3xl font-bold text-text-main">{t('verify.title')}</h1>
            <p className="text-sm text-text-muted leading-relaxed max-w-[90%] mx-auto">
              {t('verify.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1 text-center block">
                    {t('verify.enterCode')}
                </label>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    className="w-full text-center text-3xl font-display font-bold tracking-[0.5em] rounded-2xl border border-border-subtle bg-bg-base px-5 py-4 text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-border-subtle"
                    placeholder="••••••"
                />
            </div>

            <Button type="submit" fullWidth className="py-4 text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
              {t('verify.submit')}
            </Button>
            
            <button type="button" className="w-full text-xs font-bold text-text-muted hover:text-primary transition-colors uppercase tracking-widest">
                {t('verify.resend')}
            </button>
          </form>
        </Card>
      </Container>
    </section>
  );
};

export default VerifyAccountPage;