import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { useI18n } from "../../i18n/I18nContext";
import { useTheme } from "../../hooks/useTheme";
import nextwavLogo from "../../assets/logo.png";
import { Button } from "../ui/Button";

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const { mode } = useTheme();
  const [email, setEmail] = useState("");

  const isDark = mode === "dark";

  const bgClass = isDark ? "bg-white/95" : "bg-black";
  const headingClass = isDark ? "text-neutral-900" : "text-neutral-50";
  const textMutedClass = isDark ? "text-neutral-500" : "text-neutral-400";
  const borderClass = isDark ? "border-neutral-200" : "border-white/10";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for future API integration
    console.log("Subscribe email:", email);
    setEmail("");
    alert("Thank you for subscribing!"); // Simple feedback for now
  };

  return (
    <footer className={`border-t ${borderClass} ${bgClass} pt-16 pb-12`}>
      <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="relative h-12 w-12 overflow-hidden rounded-full bg-transparent">
              <img
                src={nextwavLogo}
                alt="NEXTWAV"
                className="h-full w-full object-contain"
              />
            </div>
            <span className={`font-display text-2xl font-bold tracking-tight ${headingClass}`}>
              NEXTWAV
            </span>
          </div>
          <p className={`max-w-xs text-sm leading-relaxed ${textMutedClass}`}>
            {t("footer.about")}
          </p>
          <div className="flex gap-4">
            {/* Facebook */}
            <a href="#" className={`h-10 w-10 rounded-full flex items-center justify-center border ${borderClass} hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all group ${textMutedClass}`}>
              <svg className="w-5 h-5 fill-current transition-colors" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a href="#" className={`h-10 w-10 rounded-full flex items-center justify-center border ${borderClass} hover:bg-black hover:border-black hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-black transition-all group ${textMutedClass}`}>
              <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" className={`h-10 w-10 rounded-full flex items-center justify-center border ${borderClass} hover:bg-[#E4405F] hover:border-[#E4405F] hover:text-white transition-all group ${textMutedClass}`}>
               <svg className="w-5 h-5 fill-current transition-colors" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
               </svg>
            </a>

            {/* TikTok */}
            <a href="#" className={`h-10 w-10 rounded-full flex items-center justify-center border ${borderClass} hover:bg-black hover:border-black hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-black transition-all group ${textMutedClass}`}>
              <svg className="w-5 h-5 fill-current transition-colors" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div className="space-y-6">
          <h3 className={`font-display text-lg font-semibold ${headingClass}`}>{t("footer.explore")}</h3>
          <ul className={`space-y-3 text-sm ${textMutedClass}`}>
            <li><Link to="/" className="hover:text-primary transition-colors">{t("nav.home")}</Link></li>
            <li><Link to="/shop" className="hover:text-primary transition-colors">{t("nav.shop")}</Link></li>
            <li><Link to="/collections" className="hover:text-primary transition-colors">{t("nav.collections")}</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">{t("nav.about")}</Link></li>
          </ul>
        </div>

         {/* Support Links */}
         <div className="space-y-6">
          <h3 className={`font-display text-lg font-semibold ${headingClass}`}>{t("footer.support")}</h3>
          <ul className={`space-y-3 text-sm ${textMutedClass}`}>
            <li><Link to="/terms" className="hover:text-primary transition-colors">{t("nav.terms")}</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">{t("nav.privacy")}</Link></li>
            <li><a href="mailto:support@nextwav.com" className="hover:text-primary transition-colors">{t("footer.contactSupport")}</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="space-y-6">
            <h3 className={`font-display text-lg font-semibold ${headingClass}`}>{t("footer.newsletter.title")}</h3>
            <p className={`text-sm ${textMutedClass}`}>
                {t("footer.newsletter.subtitle")}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("footer.newsletter.placeholder")}
                        className={`w-full rounded-xl border ${borderClass} bg-transparent px-4 py-3 text-sm ${headingClass} placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all`}
                    />
                </div>
                <Button type="submit" fullWidth className="py-3 text-sm font-bold rounded-xl">
                    {t("footer.newsletter.button")}
                </Button>
            </form>
        </div>

      </Container>
      
      {/* Copyright / Bottom Bar */}
      <Container className={`mt-16 pt-8 border-t ${borderClass}`}>
         <div className={`flex flex-col md:flex-row justify-between items-center gap-4 text-xs ${textMutedClass}`}>
            <p>© 2025 NEXTWAV. All rights reserved.</p>
            <p>Designed for the new generation.</p>
         </div>
      </Container>
    </footer>
  );
};
