import React from "react";
import { Container } from "../../ui/Container";
import { useI18n } from "../../../i18n/I18nContext";

type Brand = {
  id: number;
  name: string;
  logo: string;
};

const BRANDS: Brand[] = [
  { id: 1, name: "Framer", logo: "https://cdn.simpleicons.org/framer" },
  { id: 2, name: "Reddit", logo: "https://cdn.simpleicons.org/reddit" },
  { id: 3, name: "Airbnb", logo: "https://cdn.simpleicons.org/airbnb" },
  { id: 4, name: "Tesla", logo: "https://cdn.simpleicons.org/tesla" },
  { id: 5, name: "Uber", logo: "https://cdn.simpleicons.org/uber" },
  { id: 6, name: "Netflix", logo: "https://cdn.simpleicons.org/netflix" },
  { id: 7, name: "Mailchimp", logo: "https://cdn.simpleicons.org/mailchimp" },
  { id: 8, name: "Slack", logo: "https://cdn.simpleicons.org/slack" },
  { id: 9, name: "Medium", logo: "https://cdn.simpleicons.org/medium" },
  {
    id: 10,
    name: "Apple",
    logo: "https://cdn.simpleicons.org/apple",
  },
  { id: 11, name: "Vodafone", logo: "https://cdn.simpleicons.org/vodafone" },
  { id: 12, name: "Sony", logo: "https://cdn.simpleicons.org/sony" },
  { id: 13, name: "LG", logo: "https://cdn.simpleicons.org/lg" },
  { id: 14, name: "Shell", logo: "https://cdn.simpleicons.org/shell" },
  { id: 15, name: "Huawei", logo: "https://cdn.simpleicons.org/huawei" },
];

export const BrandsSection: React.FC = () => {
  const { t, lang } = useI18n();
  const arrow = lang === "ar" ? "←" : "→"; // For "View All" link
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2;
      const newScrollLeft =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
      // checkScroll will be triggered by onScroll event
    }
  };

  return (
    <section className="pb-16 pt-8">
      <Container className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-main">
            {t("brands.title")}
          </h2>

          <button
            type="button"
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:underline"
          >
            {t("brands.viewAll")}
            <span className="text-base leading-none">{arrow}</span>
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="relative group">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 rounded-full border border-border-subtle bg-bg-main p-2 shadow-lg transition hover:border-primary hover:text-primary hidden md:flex"
              aria-label="Scroll left"
            >
              <span className="sr-only">Previous</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={lang === 'ar' ? "rotate-180" : ""}>
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full border border-border-subtle bg-bg-main p-2 shadow-lg transition hover:border-primary hover:text-primary hidden md:flex"
              aria-label="Scroll right"
            >
              <span className="sr-only">Next</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={lang === 'ar' ? "rotate-180" : ""}>
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="
              grid
              grid-rows-2
              grid-flow-col
              gap-x-4
              gap-y-6
              overflow-x-auto
              scroll-smooth
              no-scrollbar
              pb-2
            "
          >
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="
                  group flex items-center gap-4 
                  rounded-xl border border-transparent 
                  bg-bg-soft/50 p-3 
                  transition-all duration-300
                  hover:border-border-subtle hover:bg-bg-soft
                  active:scale-[0.98]
                  w-[160px] sm:w-[200px] lg:w-[calc((100vw-4rem)/6)] xl:w-[220px]
                "
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 w-10 shrink-0 object-contain grayscale transition-all duration-300 group-hover:grayscale-0 sm:h-12 sm:w-12"
                  loading="lazy"
                />
                <span className="truncate text-sm font-semibold text-text-main sm:text-base">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
