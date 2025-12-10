import React from "react";
import { Container } from "../../ui/Container";
import { Card } from "../../ui/Card";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../../data/products";
import { useI18n } from "../../../i18n/I18nContext";

export const RecommendedProductsSection: React.FC = () => {
  const { t, lang } = useI18n();
  const arrow = lang === "ar" ? "←" : "→";

  const recommended = PRODUCTS.filter((p: any) => p.isRecommended);
  const items =
    recommended.length > 0
      ? recommended.slice(0, 4)
      : [...PRODUCTS, ...PRODUCTS].slice(0, 4);

  if (!items.length) return null;

  return (
    <section className="pb-16">
      <Container className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-main">
            {t("section.recommended")}
          </h2>

          <Link
            to="/shop"
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-text-muted hover:text-primary"
          >
            {t("actions.viewAll") ?? "View all"}
            <span className="text-base">{arrow}</span>
          </Link>
        </div>
      </Container>

      {/* الكروت: على الموبايل full width مع scroll، على الديسكتوب جوه Container */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-4">
        {items.map((product, index) => {
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
              className="group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-3xl border border-border-subtle/70 bg-bg-base/95 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl flex-shrink-0 w-[85vw] max-w-[340px] snap-center"
            >
              <div className="pointer-events-auto absolute right-3 top-4 z-10">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-text-main text-bg-base shadow-md hover:bg-primary transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  ♥
                </button>
              </div>

              <Link
                to={`/products/${product.id}`}
                className="flex flex-1 flex-col"
              >
                <div className="relative h-44 w-full overflow-hidden bg-bg-elevated">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-3 border-t border-border-subtle/60 bg-bg-base/95 p-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                      {product.category}
                    </p>

                    <h3 className="text-base font-semibold text-text-main line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 text-x text-text-muted">
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
                    
                    <p className="text-xs text-text-muted line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

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

      {/* الكروت على الديسكتوب: Grid عادي جوه Container */}
      <Container className="hidden md:block">
        <div className="grid gap-5 grid-cols-3 lg:grid-cols-4">
          {items.map((product, index) => {
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
                className="group relative flex h-full min-h-[390px] md:min-h-[410px] flex-col overflow-hidden rounded-3xl border border-border-subtle/70 bg-bg-base/95 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="pointer-events-auto absolute right-3 top-4 z-10">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-text-main text-bg-base shadow-md hover:bg-primary transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ♥
                  </button>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="flex flex-1 flex-col"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-bg-elevated">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-3 border-t border-border-subtle/60 bg-bg-base/95 p-4">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                        {product.category}
                      </p>

                      <h3 className="text-base font-semibold text-text-main line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 text-x text-text-muted">
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
                      
                      <p className="text-xs text-text-muted line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>

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
      </Container>
    </section>
  );
};
