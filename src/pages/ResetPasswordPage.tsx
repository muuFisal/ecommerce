import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nContext';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
    const { t } = useI18n();
    const navigate = useNavigate();

    const handleResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call to reset password
        navigate('/login');
    };

    return (
        <section className="py-20 min-h-[70vh] flex items-center justify-center bg-bg-base/50">
            <Container className="flex justify-center w-full">
                <Card className="w-full max-w-[420px] rounded-[2.5rem] p-8 space-y-8 bg-bg-elevated border-border-subtle shadow-2xl relative overflow-hidden">
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-teal-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                    <div className="space-y-3 text-center relative z-10">
                        <h1 className="font-display text-3xl font-bold text-text-main">{t('forgot.resetTitle')}</h1>
                        <p className="text-sm text-text-muted leading-relaxed max-w-[90%] mx-auto">
                            {t('forgot.resetSubtitle')}
                        </p>
                    </div>

                    <form onSubmit={handleResetSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('forgot.newPassword')}</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/50"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('forgot.confirmPassword')}</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/50"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button type="submit" fullWidth className="py-4 text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
                            {t('forgot.resetButton')}
                        </Button>
                    </form>
                </Card>
            </Container>
        </section>
    );
};

export default ResetPasswordPage;
