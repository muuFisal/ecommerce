import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { useI18n } from '../i18n/I18nContext';
import { ProfileInfoSection } from '../components/sections/profile/ProfileInfoSection';
import { ProfileOrdersSection } from '../components/sections/profile/ProfileOrdersSection';
import { ProfileAddressesSection } from '../components/sections/profile/ProfileAddressesSection';

const ProfilePage: React.FC = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'addresses'>('info');

  const tabs = [
    { id: 'info', label: t('profile.nav.info'), icon: '👤' },
    { id: 'orders', label: t('profile.nav.orders'), icon: '📦' },
    { id: 'addresses', label: t('profile.nav.addresses'), icon: '📍' },
  ];

  return (
    <div className="min-h-screen pb-20 pt-10 bg-bg-base/50">
      <Container className="space-y-8">
        <div className="flex items-center gap-4">
             <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                 <div className="h-full w-full rounded-full bg-bg-base flex items-center justify-center text-3xl">
                     👨‍💻
                 </div>
             </div>
             <div>
                 <h1 className="font-display text-3xl font-bold text-text-main">{t('profile.title')}</h1>
                 <p className="text-text-muted">Welcome back, Fisal</p>
             </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
          {/* Sidebar Navigation */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <Card className="p-2 rounded-[2rem] bg-bg-elevated border-border-subtle shadow-lg">
                <nav className="space-y-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200
                                ${activeTab === tab.id 
                                    ? 'bg-primary text-bg-base shadow-md shadow-primary/20' 
                                    : 'text-text-muted hover:bg-bg-base hover:text-text-main'}
                            `}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                    
                    <div className="h-px w-full bg-border-subtle/50 my-2"></div>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors">
                        <span className="text-lg">🚪</span>
                        {t('profile.nav.logout')}
                    </button>
                </nav>
            </Card>
            
            {/* Promo / Banner helper */}
            <div className="hidden lg:block p-6 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10 text-center">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Pro Tip</p>
                <p className="text-sm text-text-muted">Complete your profile to get 10% off your next order.</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="min-h-[500px]">
              {activeTab === 'info' && <ProfileInfoSection />}
              {activeTab === 'orders' && <ProfileOrdersSection />}
              {activeTab === 'addresses' && <ProfileAddressesSection />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;