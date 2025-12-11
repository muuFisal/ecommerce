import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { findProductById } from '../data/products';
import { useI18n } from '../i18n/I18nContext';
import { RecommendedProductsSection } from '../components/sections/home/RecommendedProductsSection';
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';

interface ProductComment {
  id: number;
  author: string;
  message: string;
  rating: number; // Added rating
  createdAt: string;
}

const ProductDetailPage: React.FC = () => {
  const { addToCart } = useCartContext();
  const { role } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const numericId = Number(id);
  const product = findProductById(numericId);

  // Mock comments with ratings
  const [comments, setComments] = useState<ProductComment[]>([
    {
      id: 1,
      author: 'Alex',
      message: 'Love the fit on this one, fabric feels premium.',
      rating: 5,
      createdAt: '2 days ago',
    },
    {
      id: 2,
      author: 'Lara',
      message: 'Colors match the photos and sizing is accurate.',
      rating: 4,
      createdAt: '5 days ago',
    },
  ]);

  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5); // Default rating

  if (!product) {
    return (
      <section className="py-20">
        <Container className="space-y-4 text-center">
          <p className="text-lg text-text-muted">{t('product.notFound')}</p>
          <Button onClick={() => navigate(-1)} className="px-6 py-2">
            {t('product.goBack')}
          </Button>
        </Container>
      </section>
    );
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setComments((prev) => [
      {
        id: prev.length + 1,
        author: author || t('product.anonymous'),
        message: message.trim(),
        rating,
        createdAt: t('product.justNow'),
      },
      ...prev,
    ]);
    setAuthor('');
    setMessage('');
    setRating(5);
  };

  const hasDiscount = product.flashSalePrice && product.flashSalePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.flashSalePrice!) / product.price) * 100)
    : null;

  return (
    <div className="min-h-screen pb-20 pt-10">
      <Container className="space-y-12">
        {/* Hero Section: Image + Details */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          {/* Left: Image Gallery (Single Image for now) */}
          <div className="overflow-hidden rounded-[2.5rem] bg-bg-elevated border border-border-subtle/50 shadow-soft">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover max-h-[600px] transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <span className="rounded-full bg-bg-soft px-3 py-1 text-[10px] uppercase font-bold tracking-[0.2em] text-primary border border-primary/20">
                  {product.category}
                </span>
                {hasDiscount && (
                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-[10px] font-bold text-red-500 border border-red-500/20">
                        -{discountPercent}% {t('product.off')}
                    </span>
                )}
              </div>
              
              <h1 className="font-display text-4xl font-bold text-text-main leading-tight md:text-5xl">
                {product.name}
              </h1>

              <div className="flex items-end gap-3 pt-2">
                <p className="font-display text-4xl font-bold text-text-main">\n                  {role === 'trader' && product.seriesConfig?.isSeriesProduct ? `Series Price: $${product.seriesConfig.wholesalePricePerSeries} (${product.seriesConfig.totalPieces} pcs)` : role === 'trader' && product.wholesalePrice ? `Wholesale: $${product.wholesalePrice}` : `$${product.flashSalePrice ?? product.price}`}\n                </p>
                {hasDiscount && (
                   <div className="flex flex-col leading-none pb-1">
                      <span className="text-sm text-text-muted line-through decoration-red-500/50 decoration-2">
                        ${product.price}
                      </span>
                  </div>
                )}
              </div>
              
                 <div className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="text-amber-500 tracking-widest text-base">{"★".repeat(product.rating || 5)}</span>
                    <span>({product.reviewsCount || 4.8} {t('product.reviewsCount')})</span>
                </div>
            </div>

            <p className="text-base leading-relaxed text-text-muted/90">
                {product.longDescription}
            </p>

            <div className="h-px w-full bg-border-subtle/50 my-2"></div>


            {/* Hashtags / Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {t('product.hashtags')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/shop?tag=${tag}`}
                      className="rounded-full border border-border-subtle px-3 py-1 text-xs font-medium text-text-muted hover:border-primary hover:text-primary transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Selectors */}
            <div className="space-y-6">
                {/* Size */}
               {product.sizes && (
                   <div className="space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                      {t('product.availableSizes')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size.value}
                          className="flex h-10 w-12 items-center justify-center rounded-xl border border-border-subtle bg-bg-base/50 text-sm font-medium transition-all hover:bg-primary hover:text-bg-base hover:border-primary focus:bg-primary focus:text-bg-base focus:border-primary"
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>
               )}

              {/* Color */}
               {product.colors && (
                  <div className="space-y-3">
                     <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                      {t('product.colors')}
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((color) => (
                         <button
                          key={color.value}
                          className="h-10 w-10 rounded-full border-2 border-border-subtle shadow-sm transition-transform hover:scale-110 focus:scale-110 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-base"
                          style={{ backgroundColor: color.value === 'white' ? '#ffffff' : color.value === 'black' ? '#000000' : color.value }}
                          title={color.label}
                        />
                      ))}
                    </div>
                  </div>
               )}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button className="flex-1 py-4 text-sm shadow-xl shadow-primary/20" onClick={() => addToCart(product, 1)}>\n                {t('product.addToCart')}\n              </Button>
              <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-subtle bg-bg-elevated text-2xl transition-colors hover:bg-bg-soft hover:text-red-500">
                ♥
              </button>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border-subtle/50 to-transparent"></div>

        {/* Reviews Section - Redesigned */}
        <div className="grid gap-10 md:grid-cols-[1fr_400px]">
          
          {/* Reviews List */}
          <div className="space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-text-main">
                    {t('product.reviews')} <span className="text-lg text-text-muted font-normal">({comments.length})</span>
                </h3>
             </div>

             <div className="grid gap-4">
                {comments.map((comment) => (
                    <Card key={comment.id} className="p-6 rounded-[2rem] border-transparent bg-bg-elevated/50 hover:bg-bg-elevated transition-colors">
                        <div className="flex items-start justify-between gap-4">
                             <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg font-bold text-primary border border-primary/10">
                                    {comment.author.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-main">{comment.author}</h4>
                                    <div className="flex text-amber-500 text-xs my-1">
                                         {"★".repeat(comment.rating)}
                                          {"☆".repeat(5 - comment.rating)}
                                    </div>
                                    <p className="text-sm text-text-muted/90 mt-1 leading-relaxed">{comment.message}</p>
                                </div>
                             </div>
                             <span className="text-xs text-text-muted whitespace-nowrap">{comment.createdAt}</span>
                        </div>
                    </Card>
                ))}
             </div>
          </div>

          {/* Add Review Form */}
          <div className="relative">
              <div className="sticky top-10">
                  <Card className="rounded-[2.5rem] p-6 border-border-subtle/50 shadow-lg bg-bg-elevated/30 backdrop-blur-sm">
                      <h3 className="font-display text-lg font-bold text-text-main mb-4">
                          {t('product.writeReview')}
                      </h3>
                      
                      <form onSubmit={handleAddComment} className="space-y-4 text-sm">
                           {/* Rating Selector */}
                           <div className="space-y-2">
                               <label className="text-xs font-semibold text-text-muted">{t('product.rating')}</label>
                               <div className="flex gap-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      type="button"
                                      onClick={() => setRating(star)}
                                      className={`text-2xl transition-transform hover:scale-110 ${rating >= star ? 'text-amber-500' : 'text-border-subtle'}`}
                                    >
                                      ★
                                    </button>
                                  ))}
                               </div>
                           </div>

                          <div className="space-y-2">
                              <label className="text-xs font-semibold text-text-muted">{t('product.yourName')}</label>
                              <input
                                  type="text"
                                  value={author}
                                  onChange={(e) => setAuthor(e.target.value)}
                                  className="w-full rounded-xl border border-border-subtle bg-bg-base/70 px-4 py-3 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                                  placeholder={t('community.nameOptional')}
                              />
                          </div>

                           <div className="space-y-2">
                              <label className="text-xs font-semibold text-text-muted">{t('product.reviews')}</label>
                              <textarea
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  rows={4}
                                  className="w-full rounded-xl border border-border-subtle bg-bg-base/70 px-4 py-3 text-sm text-text-main outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                                  placeholder={t('product.placeholderReview')}
                              />
                          </div>

                          <Button type="submit" fullWidth className="mt-2 py-3 rounded-xl">
                              {t('product.postReview')}
                          </Button>
                      </form>
                  </Card>
              </div>
          </div>

        </div>

        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors pl-2">
             <span>←</span> {t('product.backToShop')}
        </Link>
      </Container>
      
      {/* Related Products */}
      <div className="mt-20 border-t border-border-subtle/30 pt-16">
         <RecommendedProductsSection />
      </div>
    </div>
  );
};

export default ProductDetailPage;