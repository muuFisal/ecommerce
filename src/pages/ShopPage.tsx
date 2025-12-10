import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { Category, Tag } from '../data/products';
import { PRODUCTS } from '../data/products';
import { useI18n } from '../i18n/I18nContext';

const ALL_TAGS: Tag[] = ['oversized', 'unisex', 'minimal', 'graphic', 'summer', 'winter'];

const ShopPage: React.FC = () => {
  const { t, lang } = useI18n();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(120);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = (tag: Tag) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const toggleWishlist = (id: number) => {
    setWishlistIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (p.price < minPrice || p.price > maxPrice) return false;
      if (activeTags.length > 0 && !activeTags.every((t) => p.tags.includes(t))) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, minPrice, maxPrice, activeTags, search]);

  return (
    <section className="py-10">
      <Container className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit space-y-4 rounded-3xl border border-border-subtle/60 bg-bg-elevated/80 p-4 md:space-y-6">
          {/* Mobile Filter Toggle Header */}
          <div 
            className="flex cursor-pointer items-center justify-between md:cursor-default"
            onClick={() => window.innerWidth < 768 && setShowFilters(!showFilters)}
          >
             <p className="text-xs uppercase tracking-[0.25em] text-text-muted">
              {t('shop.filter')}
            </p>
            <span className="text-text-muted md:hidden">
              {showFilters ? '−' : '+'}
            </span>
          </div>

          <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
             <div className="space-y-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('shop.searchPlaceholder')}
                  className="w-full rounded-2xl border border-border-subtle bg-bg-soft px-3 py-2 text-xs text-text-main outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-semibold text-text-main">{t('shop.category')}</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: t('categories.all') },
                    { key: 'hoodies', label: t('categories.oversizedHoodies') },
                    { key: 'tees', label: t('categories.graphicTees') },
                    { key: 'pants', label: t('categories.pants') },
                    { key: 'sets', label: t('categories.coordSets') },
                  ].map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setCategory(c.key as Category | 'all')}
                      className={`rounded-2xl border px-3 py-1 ${
                        category === c.key
                          ? 'border-primary bg-primary-soft text-primary'
                          : 'border-border-subtle bg-bg-soft text-text-muted hover:border-primary/60 hover:text-primary'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-semibold text-text-main">{t('shop.priceRange')}</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    className="w-full rounded-2xl border border-border-subtle bg-bg-soft px-3 py-1.5 text-xs text-text-main outline-none focus:border-primary"
                  />
                  <span className="text-text-muted">{t('shop.to')}</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
                    className="w-full rounded-2xl border border-border-subtle bg-bg-soft px-3 py-1.5 text-xs text-text-main outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-semibold text-text-main">{t('product.hashtags')}</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full border px-3 py-1 text-[11px] ${
                        activeTags.includes(tag)
                          ? 'border-primary bg-primary-soft text-primary'
                          : 'border-border-subtle bg-bg-soft text-text-muted hover:border-primary/60 hover:text-primary'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full py-2 text-xs"
                onClick={() => {
                  setSearch('');
                  setCategory('all');
                  setActiveTags([]);
                  setMinPrice(0);
                  setMaxPrice(120);
                }}
              >
                {t('shop.resetFilters')}
              </Button>
          </div>
        </aside>

        <div className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                {t('shop.explore')}
              </p>
              <h1 className="font-display text-2xl font-semibold text-text-main">
                {t('shop.title')}
              </h1>
              <p className="text-xs text-text-muted">
                {t('shop.showing')} {filtered.length} {t('shop.of')} {PRODUCTS.length} {t('shop.items')}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, index) => {
              const hasDiscount =
                product.flashSalePrice && product.flashSalePrice < product.price;

              const discountPercent = hasDiscount
                ? Math.round(
                    ((product.price - product.flashSalePrice!) / product.price) *
                      100
                  )
                : null;

              const reviewsCount = product.reviewsCount ?? 97;
              const rating = product.rating ?? 5;
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <Card
                  key={`${product.id}-${index}`}
                  className="group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-3xl border border-border-subtle/70 bg-bg-base/95 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* أيقونة المفضلة في أعلى يمين الكارت */}
                  <div className="pointer-events-auto absolute right-3 top-4 z-10">
                    <button
                      type="button"
                      className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md transition ${isWishlisted ? 'bg-primary text-bg-base' : 'bg-text-main text-bg-base hover:bg-primary'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                    >
                      {isWishlisted ? '♥' : '♡'}
                    </button>
                  </div>

                  {/* لينك تفاصيل المنتج (الصورة + الديتيلز) */}
                  <Link
                    to={`/products/${product.id}`}
                    className="flex flex-1 flex-col"
                  >
                    {/* الصورة */}
                    <div className="relative h-52 w-full overflow-hidden bg-bg-elevated">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* البيانات */}
                    <div className="flex flex-1 flex-col justify-between gap-3 border-t border-border-subtle/60 bg-bg-base/95 p-4">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                          {product.category}
                        </p>

                        <h3 className="text-base font-semibold text-text-main line-clamp-2">
                          {product.name}
                        </h3>

                        {/* الريفيوز: نجوم + كومنت + عدد */}
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <span className="text-amber-500">
                            {"★".repeat(rating)}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-border-subtle text-[10px]">
                              💬
                            </span>
                            <span>{reviewsCount}</span>
                          </span>
                        </div>

                         {/* عرض المقاسات والألوان كما طلب المستخدم */}
                         {(product.sizes || product.colors) && (
                          <div className="flex flex-wrap gap-2 pt-1">
                             {product.sizes && product.sizes.slice(0, 3).map((s) => (
                               <span key={s.value} className="text-[10px] uppercase border border-border-subtle px-1.5 py-0.5 rounded text-text-muted">
                                 {s.label}
                               </span>
                             ))}
                             {product.colors && product.colors.slice(0, 2).map((c) => (
                               <span key={c.value} className="h-4 w-4 rounded-full border border-border-subtle" style={{ backgroundColor: c.value === 'white' ? '#fff' : c.value === 'black' ? '#000' : c.value }} title={c.label}></span>
                             ))}
                          </div>
                        )}
                        
                        {/* الوصف القصير */}
                        <p className="text-xs text-text-muted line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>

                      {/* الأسعار + زر السلة */}
                      <div className="mt-1 flex items-end justify-between gap-2 text-xs">
                        <div className="space-y-1">
                          {hasDiscount && (
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                              <span className="line-through">
                                ${product.price}
                              </span>
                              <span className="rounded-md bg-primary-soft/30 px-2 py-0.5 text-[21px] font-semibold text-primary">
                                -{discountPercent}%
                              </span>
                            </div>
                          )}

                          <p className="text-xl font-semibold text-text-main">
                            ${product.flashSalePrice ?? product.price}
                          </p>
                        </div>

                        {/* زر إضافة للسلة */}
                        <button
                          type="button"
                          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-bg-base text-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform"
                          onClick={(e) => e.preventDefault()}
                        >
                          🛒
                        </button>
                      </div>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ShopPage;