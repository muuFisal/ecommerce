import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nContext';
import { Link, useNavigate } from 'react-router-dom';

type Step = 'email' | 'otp' | 'reset';

const ForgotPasswordPage: React.FC = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call to send OTP
        if (email) setStep('otp');
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call to verify OTP
        if (otp.length >= 4) {
            navigate('/reset-password');
        }
    };

    return (
        <section className="py-20 min-h-[70vh] flex items-center justify-center bg-bg-base/50">
            <Container className="flex justify-center w-full">
                <Card className="w-full max-w-[450px] rounded-[2.5rem] p-8 space-y-8 bg-bg-elevated border-border-subtle shadow-2xl relative overflow-hidden transition-all duration-500">
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                    {/* Step 1: Email Input */}
                    {step === 'email' && (
                        <>
                            <div className="space-y-3 text-center relative z-10 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h1 className="font-display text-3xl font-bold text-text-main">{t('forgot.title')}</h1>
                                <p className="text-sm text-text-muted leading-relaxed max-w-[90%] mx-auto">
                                    {t('forgot.subtitle')}
                                </p>
                            </div>
                            <form onSubmit={handleEmailSubmit} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">{t('forgot.emailLabel')}</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-2xl border border-border-subtle bg-bg-base px-5 py-3.5 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-muted/50"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <Button type="submit" fullWidth className="py-4 text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
                                    {t('forgot.submit')}
                                </Button>
                            </form>
                        </>
                    )}

                    {/* Step 2: OTP Input */}
                    {step === 'otp' && (
                        <>
                             <div className="space-y-3 text-center relative z-10 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h1 className="font-display text-3xl font-bold text-text-main">{t('forgot.otpTitle')}</h1>
                                <p className="text-sm text-text-muted leading-relaxed max-w-[90%] mx-auto">
                                    {t('forgot.otpSubtitle')}
                                </p>
                            </div>
                            <form onSubmit={handleOtpSubmit} className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                                <div className="space-y-2">
                                     <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={6}
                                        autoFocus
                                        className="w-full text-center text-3xl font-display font-bold tracking-[0.5em] rounded-2xl border border-border-subtle bg-bg-base px-5 py-4 text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-border-subtle"
                                        placeholder="••••••"
                                    />
                                </div>
                                <Button type="submit" fullWidth className="py-4 text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
                                    {t('forgot.verify')}
                                </Button>
                                 <button type="button" onClick={() => setStep('email')} className="w-full text-xs font-bold text-text-muted hover:text-primary transition-colors">
                                    {t('product.goBack')}
                                </button>
                            </form>
                        </>
                    )}

                    <div className="pt-2 text-center text-sm font-medium relative z-10 border-t border-border-subtle mt-4">
                         <Link to="/login" className="flex items-center justify-center gap-2 text-text-muted hover:text-primary transition-colors py-4">
                            <span>←</span> {t('forgot.back')}
                        </Link>
                    </div>
                </Card>
            </Container>
        </section>
    );
};

export default ForgotPasswordPage;