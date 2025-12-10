import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { useI18n } from '../i18n/I18nContext';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const CollectionsPage: React.FC = () => {
    const { t, lang } = useI18n();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const collections = [
        {
            id: 'summer-2025',
            name: t('collections.summer2025'),
            description: t('collections.summerDesc'),
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000',
            itemCount: 24,
            year: '2025',
            tags: ['Streetwear', 'Breathable', 'Bold'],
            colors: ['#F59E0B', '#10B981', '#ffffff'],
            status: 'Live Now'
        },
        {
            id: 'winter-2025',
            name: t('collections.winter2025'),
            description: t('collections.winterDesc'),
            image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&q=80&w=1000',
            itemCount: 18,
            year: '2025',
            tags: ['Heavyweight', 'Fleece', 'Oversized'],
            colors: ['#1e293b', '#64748b', '#000000'],
             status: 'Coming Soon'
        },
         {
            id: 'exclusive',
            name: t('collections.exclusive'),
             description: t('collections.exclusiveDesc'),
            image: 'https://images.unsplash.com/photo-1550995694-3f5f4a68139d?auto=format&fit=crop&q=80&w=1000',
            itemCount: 12,
            year: 'Limited',
             tags: ['Collabs', 'Rare', 'One-off'],
            colors: ['#7c3aed', '#db2777', '#ffffff'],
             status: 'Selling Fast'
        }
    ];

  return (
    <div className="min-h-screen pb-20 bg-bg-base">
        {/* Header Section */}
        <section className="relative overflow-hidden bg-bg-elevated py-16 md:py-24 border-b border-border-subtle/50">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <Container className="relative z-10 text-center space-y-4">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary border border-primary/20 backdrop-blur-sm">
                    {t('nav.collections')}
                </span>
                <h1 className="font-display text-4xl md:text-6xl font-black text-text-main tracking-tight uppercase">
                    {t('collections.heroTitle')}
                </h1>
                <p className="max-w-xl mx-auto text-base md:text-lg text-text-muted/80 leading-relaxed font-light">
                   {t('collections.heroSubtitle')}
                </p>
            </Container>
             {/* Decorative Elements */}
            <div className="absolute top-1/2 -left-10 h-72 w-72 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 -right-10 h-96 w-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none"></div>
        </section>

      <Container className="space-y-16 -mt-8 relative z-20">
        <div className="flex flex-col gap-12">
             {collections.map((collection, index) => (
                <div 
                    key={collection.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredId(collection.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    {/* Connection Line */}
                    {index !== collections.length - 1 && (
                         <div className="absolute left-8 top-full h-12 w-px bg-border-subtle/50 md:left-1/2 -ml-px hidden md:block"></div>
                    )}

                    <Card className={`
                        grid md:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] border-transparent shadow-2xl transition-all duration-700 h-auto md:h-[550px]
                        ${hoveredId === collection.id ? 'shadow-primary/20 scale-[1.01]' : 'shadow-soft'}
                    `}>
                        {/* Image Section */}
                        <div className={`relative h-[300px] md:h-full w-full overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                             <div className="absolute inset-0 bg-gray-900/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                             <img 
                                src={collection.image} 
                                alt={collection.name} 
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            
                             {/* Status Badge */}
                            <div className="absolute top-6 left-6 z-20">
                                <span className={`
                                    px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg border border-white/10
                                    ${collection.status === 'Live Now' ? 'bg-emerald-500/90 text-white' : 
                                      collection.status === 'Selling Fast' ? 'bg-red-500/90 text-white' : 'bg-gray-900/80 text-white'}
                                `}>
                                    {collection.status}
                                </span>
                            </div>

                             {/* Year Big Label */}
                            <div className="absolute bottom-4 right-6 z-20 md:bottom-8 md:right-8">
                                <span className="text-8xl font-black text-white/10 select-none">
                                    {collection.year}
                                </span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col justify-between p-8 md:p-14 bg-bg-elevated relative overflow-hidden">
                             {/* Background Pattern */}
                             <div className="absolute right-0 top-0 opacity-[0.03] text-9xl">❖</div>

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-4">
                                     <div className="flex items-center gap-3">
                                        <div className="h-px flex-1 bg-border-subtle"></div>
                                        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{t('collections.featured')}</span>
                                     </div>
                                    <h2 className="font-display text-4xl md:text-5xl font-black text-text-main leading-none">
                                        {collection.name}
                                    </h2>
                                    <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-md">
                                        {collection.description}
                                    </p>
                                </div>

                                {/* Mood / Colors */}
                                <div className="space-y-3">
                                    <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{t('collections.mood')}</span>
                                    <div className="flex items-center gap-3">
                                        {collection.colors.map(color => (
                                            <div key={color} className="h-8 w-8 rounded-full border border-border-subtle shadow-sm" style={{ backgroundColor: color }}></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {collection.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-bg-soft rounded-lg text-xs font-medium text-text-muted border border-border-subtle">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-between border-t border-border-subtle/50 pt-8 relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-text-main font-display">{collection.itemCount}</span>
                                    <span className="text-xs text-text-muted uppercase tracking-wider">{t('collections.pieces')}</span>
                                </div>
                                
                                <Link to={`/shop?collection=${collection.id}`}>
                                    <Button className="rounded-full px-8 py-4 h-auto text-sm group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-primary/10 hover:shadow-primary/30">
                                        {t('collections.exploreDrop')} 
                                        {lang === 'ar' ? <span className="mr-2">←</span> : <span className="ml-2">→</span>}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
             ))}
        </div>
      </Container>
    </div>
  );
};

export default CollectionsPage;