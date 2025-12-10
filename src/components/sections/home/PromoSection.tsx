import React from "react";
import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button";
import { useI18n } from "../../../i18n/I18nContext";

export const PromoSection: React.FC = () => {
  const { t, lang } = useI18n();
  const arrow = lang === "ar" ? "←" : "→";

  return (
    <section className="pb-16">
      <Container className="space-y-6">
        {/* العنوان الأساسي */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-main">
            {t("promo.title")}
          </h2>
          <p className="hidden max-w-xs text-xs text-text-muted sm:block text-end">
            {t("promo.subtitle")}
          </p>
        </div>

        {/* الصف العلوي: بانرين كبار */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* بانر 1 */}
          <div className="relative overflow-hidden rounded-3xl shadow-lg bg-slate-900">
            <div className="flex h-56 sm:h-64 items-center justify-between px-6 py-4 gap-4">
              {/* النص على اليسار */}
              <div className="flex-1 max-w-[60%] text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                  {t("promo.top1.kicker")}
                </p>
                <h3 className="mt-1 text-base sm:text-lg font-semibold">
                  {t("promo.top1.title")}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/85">
                  {t("promo.top1.desc")}
                </p>

                <Button className="mt-3 inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-[11px] sm:text-xs bg-primary text-bg-base hover:bg-primary/90">
                  {t("promo.top1.cta")}
                  <span className="text-xs sm:text-sm">{arrow}</span>
                </Button>
              </div>

              {/* الصورة على اليمين – حجم ثابت وفي نص الارتفاع */}
              <div className="flex items-center justify-center">
                <div className="h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-2xl bg-bg-base">
                  <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt={t("promo.top1.title")}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* بانر 2 */}
          <div className="relative overflow-hidden rounded-3xl shadow-lg bg-amber-400">
            <div className="flex h-56 sm:h-64 items-center justify-between px-6 py-4 gap-4">
              {/* النص على اليسار */}
              <div className="flex-1 max-w-[60%] text-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900/70">
                  {t("promo.top2.kicker")}
                </p>
                <h3 className="mt-1 text-base sm:text-lg font-semibold">
                  {t("promo.top2.title")}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-900/80">
                  {t("promo.top2.desc")}
                </p>

                <Button
                  variant="secondary"
                  className="mt-3 inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-[11px] sm:text-xs bg-bg-base text-text-main hover:bg-bg-soft"
                >
                  {t("promo.top2.cta")}
                  <span className="text-xs sm:text-sm">{arrow}</span>
                </Button>
              </div>

              {/* الصورة على اليمين – نفس الحجم في البانرين */}
              <div className="flex items-center justify-center">
                <div className="h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-2xl bg-bg-base">
                  <img
                    src="https://images.pexels.com/photos/8438981/pexels-photo-8438981.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt={t("promo.top2.title")}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* البانر الكبير في الأسفل - صورة فقط */}
        <div className="overflow-hidden rounded-3xl shadow-lg">
          <img
            src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt={t("promo.bottom.title")}
            className="h-[220px] sm:h-[260px] md:h-[280px] w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
};
