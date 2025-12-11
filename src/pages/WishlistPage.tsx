import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nContext';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const WishlistPage: React.FC = () => {
    const { t } = useI18n();

    // Mock Wishlist Data (using some products)
    const [wishlistItems, setWishlistItems] = useState(products.slice(0, 4));

    const removeItem = (id: number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-bg-base/50">
                <Container className="text-center space-y-6">
                    <div className="mx-auto h-24 w-24 rounded-full bg-bg-elevated flex items-center justify-center text-4xl shadow-inner text-red-400">
                        ♥
                    </div>
                    <h1 className="font-display text-2xl font-bold text-text-main">{t('wishlist.empty')}</h1>
                    <p className="text-text-muted max-w-sm mx-auto">{t('wishlist.emptyDesc')}</p>
                    <Link to="/shop">
                        <Button className="mt-4 px-8 py-3 rounded-xl">{t('shop.explore')}</Button>
                    </Link>
                </Container>
            </div>
        );
    }

    return (
        <section className="min-h-screen py-12 bg-bg-base/50">
            <Container className="space-y-8">
                <div className="flex items-center gap-4 border-b border-border-subtle pb-6">
                    <h1 className="font-display text-3xl font-bold text-text-main">{t('wishlist.title')}</h1>
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{wishlistItems.length} items</span>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_350px] items-start">
                    {/* Wishlist Items List */}
                    <div className="space-y-4">
                        {wishlistItems.map((item) => (
                            <Card key={item.id} className="group flex flex-col sm:flex-row gap-6 p-5 rounded-[2rem] border-transparent bg-bg-elevated/50 hover:bg-bg-elevated transition-colors shadow-sm">
                                {/* Image */}
                                <Link to={`/products/${item.id}`} className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-bg-base">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Status Badge Mini */}
                                    <div className="absolute bottom-2 left-2 z-20">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block shadow-lg shadow-emerald-500/50"></span>
                                    </div>
                                </Link>

                                {/* Info & Actions Wrapper */}
                                <div className="flex flex-1 items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex flex-col gap-1">
                                            <Link to={`/products/${item.id}`} className="font-display text-lg font-bold text-text-main hover:text-primary transition-colors line-clamp-1">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-text-muted">{item.category}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 pt-1">
                                             <p className="font-bold text-lg text-text-main tabular-nums">
                                                ${item.price}
                                            </p>
                                             {/* Stock Status text */}
                                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                                {t('wishlist.stock')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 shrink-0 border-l border-border-subtle pl-4 ml-2">
                                        <button 
                                            className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-bg-base shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                                            title={t('wishlist.addToCart')}
                                        >
                                            <span className="text-lg">🛒</span>
                                        </button>

                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="h-10 w-10 flex items-center justify-center rounded-xl bg-bg-base border border-border-subtle text-text-muted hover:text-red-500 hover:border-red-500/30 transition-colors"
                                            title={t('wishlist.remove')}
                                        >
                                            <span className="text-lg">🗑</span>
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Sidebar / Promo Area */}
                    <div className="sticky top-24 space-y-6">
                         <Card className="relative overflow-hidden p-8 rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-black text-white border-0 shadow-2xl">
                            {/* Background Image Overlay */}
                            <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600" className="h-full w-full object-cover grayscale" alt="Fashion" />
                            </div>
                            
                            <div className="relative z-10 space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Editor's Pick</p>
                                    <h2 className="font-display text-3xl font-bold leading-tight">{t('wishlist.promo.title')}</h2>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('wishlist.promo.desc')}
                                </p>
                                <Button fullWidth variant="primary" className="bg-white text-black hover:bg-gray-200 border-none rounded-xl font-bold">
                                    {t('wishlist.promo.cta')}
                                </Button>
                            </div>
                         </Card>

                         {/* Mini Category Links */}
                         <Card className="p-6 rounded-[2rem] bg-bg-elevated/50 border border-border-subtle">
                             <h3 className="font-bold text-text-main mb-4">Quick Browse</h3>
                             <div className="flex flex-wrap gap-2">
                                 {['Hoodies', 'Tees', 'Pants', 'Accessories', 'New Drops'].map(tag => (
                                     <Link key={tag} to="/shop">
                                         <span className="px-3 py-1.5 rounded-lg bg-bg-base border border-border-subtle text-xs font-medium text-text-muted hover:text-primary hover:border-primary/30 transition-colors inline-block cursor-pointer">
                                             {tag}
                                         </span>
                                     </Link>
                                 ))}
                             </div>
                         </Card>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WishlistPage;