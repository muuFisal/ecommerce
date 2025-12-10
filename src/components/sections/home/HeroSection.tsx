import React, { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Container } from "../../ui/Container";
import { useI18n } from "../../../i18n/I18nContext";

type Banner = {
  id: number;
  imageUrl: string;
  titleKey: string;
  subtitleKey: string;
};

const BANNERS: Banner[] = [
  {
    id: 1,
    imageUrl:
      "https://images.pexels.com/photos/6311579/pexels-photo-6311579.jpeg?auto=compress&cs=tinysrgb&w=1200",
    titleKey: "hero.banner1.title",
    subtitleKey: "hero.banner1.subtitle",
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=1200",
    titleKey: "hero.banner2.title",
    subtitleKey: "hero.banner2.subtitle",
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/9775679/pexels-photo-9775679.jpeg?auto=compress&cs=tinysrgb&w=1200",
    titleKey: "hero.banner3.title",
    subtitleKey: "hero.banner3.subtitle",
  },
];

export const HeroSection: React.FC = () => {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (BANNERS.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const currentBanner = BANNERS[index];

  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pt-16 md:pb-20 lg:pb-28">
      <Container className="relative z-10 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
        {/* النص الأساسي */}
        <div className="space-y-7">
          <div className="space-y-3">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="max-w-xl text-sm sm:text-base text-text-muted">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button className="px-6 py-3 text-sm">{t("hero.shopNow")}</Button>
            <Button variant="secondary" className="px-5 py-3 text-sm">
              {t("hero.buildFit")}
            </Button>
          </div>

          {/* تم حذف بلوك المميزات تحت الأزرار */}
        </div>

        {/* بنرات إعلانية متحركة */}
        <div className="glass-card relative h-[320px] overflow-hidden rounded-3xl border border-border-subtle/60 bg-bg-elevated/40 sm:h-[360px]">
          {/* صورة البنر فقط بدون أي نص */}
          <img
            src={currentBanner.imageUrl}
            alt={t(currentBanner.titleKey)}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* دواير التنقّل بين الصور فقط */}
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
            {BANNERS.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 w-4 rounded-full transition ${
                  i === index ? "bg-primary" : "bg-bg-base/70"
                }`}
                aria-label={`Banner ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
