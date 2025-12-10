import React, { useEffect, useRef, useState } from "react";
import { Container } from "../../ui/Container";
import { useI18n } from "../../../i18n/I18nContext";

type Category = {
  id: number;
  labelKey: string;
  tagKey: string;
  imageUrl: string;
  bgClass: string;
};

const mockCategories: Category[] = [
  {
    id: 1,
    labelKey: "categories.graphicTees",
    tagKey: "categories.tag.everydayHeat",
    imageUrl:
      "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bgClass: "bg-lime-700",
  },
  {
    id: 2,
    labelKey: "categories.oversizedHoodies",
    tagKey: "categories.tag.streetEssential",
    imageUrl:
      "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bgClass: "bg-amber-800",
  },
  {
    id: 3,
    labelKey: "categories.coordSets",
    tagKey: "categories.tag.fullFits",
    imageUrl:
      "https://images.pexels.com/photos/6311579/pexels-photo-6311579.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bgClass: "bg-sky-800",
  },
  {
    id: 4,
    labelKey: "categories.wholesaleBundles",
    tagKey: "categories.tag.forYourBrand",
    imageUrl:
      "https://images.pexels.com/photos/3738083/pexels-photo-3738083.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bgClass: "bg-fuchsia-800",
  },
];

export const CategoriesSection: React.FC = () => {
  const { t, lang } = useI18n();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);

  const arrow = lang === "ar" ? "←" : "→";

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScrollable = () => {
      setHasScroll(el.scrollWidth > el.clientWidth + 2);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  const handleArrowClick = () => {
    const el = scrollRef.current;
    if (!el) return;

    const distance = 200;
    const direction = lang === "ar" ? -distance : distance;

    el.scrollBy({
      left: direction,
      behavior: "smooth",
    });
  };

  return (
    <section className="pb-16">
      <Container className="space-y-6">
        {/* العنوان + زر كل الكاتيجوريز */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-main">
            {t("categories.title")}
          </h2>

          <button
            type="button"
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-primary"
          >
            {t("categories.action.viewAll")}
            <span className="text-base">{arrow}</span>
          </button>
        </div>

        {/* سكرول أفقي للكاتيجوريز */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 sm:pb-0 scroll-smooth snap-x snap-mandatory no-scrollbar px-4 sm:px-0 -mx-4 sm:mx-0"
            onScroll={() => {
               if (scrollRef.current) {
                 const el = scrollRef.current;
                 setHasScroll(el.scrollWidth > el.clientWidth);
               }
            }}
          >
            {mockCategories.map((cat) => (
              <div
                key={cat.id}
                className={`snap-center flex-shrink-0 w-[150px] sm:w-[170px] h-[230px] rounded-[26px] ${cat.bgClass} px-4 pt-4 pb-3 text-white flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20`}
              >
                {/* النص */}
                <div className="space-y-1 z-10">
                  <p className="text-sm font-semibold">{t(cat.labelKey)}</p>
                  <p className="text-[11px] opacity-80">{t(cat.tagKey)}</p>
                </div>

                {/* الصورة دائرية في المنتصف */}
                <div className="mt-auto mb-4 flex items-center justify-center">
                  <div className="h-[110px] w-[110px] rounded-full overflow-hidden bg-white/10 flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <img
                      src={cat.imageUrl}
                      alt={t(cat.labelKey)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Arrow Indicator */}
          {hasScroll && (
              <div 
                className={`absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none md:hidden
                  ${lang === 'ar' ? 'left-4' : 'right-4'}`}
              >
                  <div className="w-8 h-8 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center animate-pulse text-white shadow-lg border border-white/20">
                      {lang === 'ar' ? '←' : '→'}
                  </div>
              </div>
          )}
        </div>
      </Container>
    </section>
  );
};
