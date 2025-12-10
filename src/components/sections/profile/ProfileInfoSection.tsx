import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { useI18n } from '../../../i18n/I18nContext';

export const ProfileInfoSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <Card className="p-6 rounded-[2rem] bg-bg-elevated border-border-subtle space-y-8">
        <h2 className="font-display text-xl font-bold text-text-main">{t('profile.info.title')}</h2>
        
        {/* Profile Image */}
        <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 rounded-full bg-bg-base border-2 border-primary/20 p-1">
                <img 
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200" 
                    alt="Profile" 
                    className="h-full w-full rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    ✎
                </button>
            </div>
            <div className="space-y-2">
                <h3 className="font-bold text-text-main">{t('profile.info.image')}</h3>
                <Button variant="secondary" className="text-xs px-4 py-2 rounded-xl h-auto">{t('profile.info.upload')}</Button>
            </div>
        </div>

        <div className="h-px bg-border-subtle/50 w-full"></div>

        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase">{t('profile.info.name')}</label>
                <input type="text" defaultValue="Fisal Ahmed" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase">{t('profile.info.email')}</label>
                <input type="email" defaultValue="fisal@example.com" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
            </div>
             <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase">{t('profile.info.phone')}</label>
                <input type="tel" defaultValue="+20 123 456 7890" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
            </div>
        </div>
        
        <div className="flex justify-end pt-4">
            <Button className="px-6 py-2.5 rounded-xl">{t('profile.info.save')}</Button>
        </div>
      </Card>

      {/* Change Password */}
      <Card className="p-6 rounded-[2rem] bg-bg-elevated border-border-subtle space-y-6">
        <h2 className="font-display text-xl font-bold text-text-main">{t('profile.password.title')}</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
             <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase">{t('profile.password.current')}</label>
                <input type="password" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
            </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
             <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase">{t('profile.password.new')}</label>
                <input type="password" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
            </div>
             <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase">{t('profile.password.confirm')}</label>
                <input type="password" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
            </div>
        </div>
        
        <div className="flex justify-end">
            <Button variant="secondary" className="px-6 py-2.5 rounded-xl">{t('profile.info.save')}</Button>
        </div>
      </Card>
    </div>
  );
};
