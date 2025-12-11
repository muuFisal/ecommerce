import React, { useEffect, useState } from "react";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useI18n } from "../i18n/I18nContext";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const { t } = useI18n();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="flex gap-4 text-center">
      <div className="flex flex-col items-center justify-center rounded-2xl bg-bg-soft min-w-[80px] py-4 border-2 border-primary/20 shadow-xl">
        <span className="text-3xl font-black font-display text-primary">
          {formatTime((timeLeft as any).hours || 0)}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted mt-1">
          Hrs
        </span>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl bg-bg-soft min-w-[80px] py-4 border-2 border-primary/20 shadow-xl">
        <span className="text-3xl font-black font-display text-primary">
          {formatTime((timeLeft as any).minutes || 0)}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted mt-1">
          Min
        </span>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl bg-bg-soft min-w-[80px] py-4 border-2 border-primary/20 shadow-xl">
        <span className="text-3xl font-black font-display text-primary">
          {formatTime((timeLeft as any).seconds || 0)}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted mt-1">
          Sec
        </span>
      </div>
    </div>
  );
};

const FlashSalePage: React.FC = () => {
  const { addToCart } = useCartContext();
  const { role } = useAuthContext();
  const { t, lang } = useI18n();
  const flashItems = products.filter((p) => p.onFlashSale);

  // Set a target date 24 hours from now for demo purposes
  // In a real app, this would come from the backend or the product data
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 24);

  return (
    <section className="py-10">
      <Container className="space-y-10">
        {/* Special Flash Sale Header/Banner */}
        {/* Special Flash Sale Header/Banner */}
        <div className="relative overflow-hidden rounded-[3rem] border border-primary/30 bg-gradient-to-br from-bg-elevated via-bg-base to-bg-elevated p-8 md:p-14 shadow-2xl">
          <div className="absolute inset-0 bg-primary/5"></div>
          {/* Enhanced decorative blobs */}
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 h-96 w-96 rounded-full bg-primary/30 blur-[100px] opacity-70"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 h-96 w-96 rounded-full bg-secondary/30 blur-[100px] opacity-70"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary border border-primary/20 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="tracking-wide uppercase">{t("flash.title").split("•")[0]}</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-black text-text-main leading-[1.1] tracking-tight drop-shadow-sm">
                {t("flash.title")}
              </h1>
              <p className="text-lg text-text-muted/90 font-medium leading-relaxed max-w-lg">
                {t("flash.description")}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4 bg-bg-base/40 p-6 rounded-3xl border border-white/5 backdrop-blur-sm shadow-inner">
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-text-muted">Ending in</p>
                <CountdownTimer targetDate={targetDate} />
            </div>
          </div>
        </div>

        {/* Products Grid - Using standard Card design */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {flashItems.map((product, index) => {
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

            return (
              <Card
                key={`${product.id}-${index}`}
                className="group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-3xl border border-border-subtle/70 bg-bg-base/95 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                  {/* Special Offer Badge */}
                  <div className="absolute left-0 top-6 z-20 bg-red-600 pl-3 pr-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg rounded-r-lg">
                      Flash Deal
                  </div>

                {/* Wishlist Icon */}
                <div className="pointer-events-auto absolute right-3 top-4 z-10">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-text-main text-bg-base shadow-md hover:bg-primary transition"
                     onClick={(e) => e.stopPropagation()}
                  >
                    ♥
                  </button>
                </div>

                {/* Product Link */}
                <Link
                  to={`/products/${product.id}`}
                  className="flex flex-1 flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-bg-elevated">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between gap-3 border-t border-border-subtle/60 bg-bg-base/95 p-4">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                        {product.category}
                      </p>

                      <h3 className="text-base font-semibold text-text-main line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Reviews */}
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
                      
                      {/* Detailed Offer Section inside Card */}
                       <div className="my-2 rounded-xl bg-primary-soft/20 p-2 border border-primary/10">
                           <div className="flex items-center justify-between">
                               <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Special Offer</span>
                               <span className="text-[10px] font-bold text-red-500">Only 2 left</span>
                           </div>
                           <p className="mt-1 text-[10px] text-text-muted leading-tight">
                               Extra {discountPercent}% off for the next 24 hours only.
                           </p>
                       </div>

                      {/* Short Description */}
                      <p className="text-xs text-text-muted line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-2 flex items-end justify-between gap-2 text-xs">
                      <div className="space-y-1">
                        {hasDiscount && (
                          <div className="flex items-center gap-2 text-xs text-text-muted">
                            <span className="line-through">
                              ${product.price}
                            </span>
                            <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-[21px] font-bold text-red-500">
                              -{discountPercent}%
                            </span>
                          </div>
                        )}

                        <p className="text-2xl font-bold text-text-main">\n                          {role === 'trader' && product.seriesConfig?.isSeriesProduct ? `Series Price: $${product.seriesConfig.wholesalePricePerSeries} (${product.seriesConfig.totalPieces} pcs)` : role === 'trader' && product.wholesalePrice ? `Wholesale: $${product.wholesalePrice}` : `$${product.flashSalePrice ?? product.price}`}\n                        </p>
                      </div>

                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-bg-base text-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform"
                        onClick={() => addToCart(product, 1)}
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

        {flashItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-semibold text-text-main">No active flash sales</h3>
              <p className="text-text-muted max-w-md mx-auto mt-2">Check back later or subscribe to our newsletter to get notified about the next drop.</p>
              <Link to="/shop" className="mt-6 px-6 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition">
                  Browse Shop
              </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FlashSalePage;