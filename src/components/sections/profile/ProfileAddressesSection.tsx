import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { useI18n } from '../../../i18n/I18nContext';

export const ProfileAddressesSection: React.FC = () => {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [addresses, setAddresses] = useState([
      { id: 1, type: 'Home', street: '123 Fashion St, Detailed Address Here', city: 'Cairo', governorate: 'Cairo', phone1: '01000000001', phone2: '01200000002', isDefault: true },
      { id: 2, type: 'Work', street: 'Tech Park, Building C', city: '6th of October', governorate: 'Giza', phone1: '01100000003', phone2: '', isDefault: false },
  ]);

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-text-main">{t('profile.addresses.title')}</h2>
            <Button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-xs rounded-xl shadow-lg shadow-primary/20">
                {t('profile.addresses.add')}
            </Button>
       </div>
       
       <div className="grid gap-4 md:grid-cols-2">
           {addresses.map(addr => (
               <Card key={addr.id} className="relative p-6 rounded-[2rem] bg-bg-elevated border-border-subtle hover:border-primary/50 transition-colors group">
                   <div className="space-y-4">
                       <div className="flex justify-between items-start">
                           <span className="flex items-center gap-2">
                                <span className="font-bold text-text-main text-lg">{addr.type}</span>
                                {addr.isDefault && (
                                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                                        {t('profile.addresses.default')}
                                    </span>
                                )}
                           </span>
                           <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="text-text-muted hover:text-primary transition-colors p-1" title={t('profile.addresses.edit')}>✎</button>
                               <button className="text-text-muted hover:text-red-500 transition-colors p-1" title={t('profile.addresses.delete')}>🗑</button>
                           </div>
                       </div>
                       
                       <div className="text-sm text-text-muted space-y-2">
                           <p className="line-clamp-2">{addr.street}</p>
                           <p className="font-medium text-text-main">{addr.city}, {addr.governorate}</p>
                           <div className="pt-2 flex flex-col gap-1 text-xs">
                                <p>📞 {addr.phone1}</p>
                                {addr.phone2 && <p>📞 {addr.phone2}</p>}
                           </div>
                       </div>
                   </div>
               </Card>
           ))}
       </div>

       {/* Add Address Modal */}
       {isModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
               <Card className="w-full max-w-lg rounded-[2.5rem] bg-bg-elevated p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                    <h2 className="font-display text-2xl font-bold text-text-main mb-6">{t('profile.addresses.add')}</h2>
                    
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-text-muted">{t('profile.addresses.governorate')}</label>
                                <input type="text" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1" required />
                            </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-text-muted">{t('profile.addresses.city')}</label>
                                <input type="text" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-text-muted">{t('profile.addresses.detail')}</label>
                            <textarea className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 min-h-[80px]" required></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-text-muted">{t('profile.addresses.phone1')}</label>
                                <input type="tel" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1" required />
                            </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-text-muted">{t('profile.addresses.phone2')}</label>
                                <input type="tel" className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1" />
                            </div>
                        </div>

                        <div className="pt-6 flex gap-4">
                            <Button type="button" variant="secondary" fullWidth onClick={() => setIsModalOpen(false)} className="rounded-xl">
                                {t('profile.addresses.cancel')}
                            </Button>
                            <Button type="submit" fullWidth className="rounded-xl">
                                {t('profile.addresses.save')}
                            </Button>
                        </div>
                    </form>
               </Card>
           </div>
       )}
    </div>
  );
};
