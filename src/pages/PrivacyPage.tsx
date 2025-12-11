import React from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { useI18n } from '../i18n/I18nContext';

const PrivacyPage: React.FC = () => {
    const { t } = useI18n();

  return (
    <section className="pb-20 pt-10">
      <Container className="space-y-8">
        {/* Header Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden min-h-[300px] flex items-end p-8 sm:p-12">
             <div className="absolute inset-0 bg-zinc-900">
                <img 
                    src="https://images.unsplash.com/photo-1616469829718-0faf16324280?auto=format&fit=crop&q=80&w=2070" 
                    alt="Privacy" 
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
             </div>
             <div className="relative z-10 space-y-4 max-w-2xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wider uppercase">
                    {t('privacy.legalTag')}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    {t('privacy.title')}
                </h1>
                <p className="text-white/80 text-sm font-medium">
                    {t('privacy.lastUpdated')}
                </p>
             </div>
        </div>

        {/* Content Section */}
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
             {/* Main Content */}
            <div className="space-y-6">
                 <Card className="rounded-[2rem] p-8 sm:p-10 space-y-8 bg-bg-elevated border-border-subtle shadow-sm">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-text-muted leading-relaxed">
                            {t('privacy.intro')}
                        </p>
                    </div>
                 </Card>

                 <div className="space-y-6">
                    {[1, 2, 3].map((section) => (
                        <Card key={section} className="rounded-[2rem] p-8 space-y-4 bg-bg-elevated border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                            <h2 className="font-display text-xl font-bold text-text-main">
                                {t(`privacy.section${section}.title`)}
                            </h2>
                            <p className="text-text-muted leading-relaxed">
                                {t(`privacy.section${section}.content`)}
                            </p>
                        </Card>
                    ))}
                 </div>
            </div>
            
            {/* Sidebar / Quick Links */}
             <div className="space-y-6">
                <Card className="rounded-[2rem] p-6 bg-primary/5 border-primary/10 space-y-4 sticky top-24">
                    <h3 className="font-bold text-text-main">{t('privacy.sidebar.title')}</h3>
                    <p className="text-sm text-text-muted">
                        If you have any questions about our privacy policy, please contact our support team.
                    </p>
                    <a href="mailto:privacy@nextwav.com" className="block w-full py-3 px-4 bg-bg-base rounded-xl text-center text-sm font-bold text-text-main hover:bg-bg-elevated transition-colors border border-border-subtle">
                        {t('privacy.sidebar.button')}
                    </a>
                </Card>
            </div>
        </div>
      </Container>
    </section>
  );
};

export default PrivacyPage;