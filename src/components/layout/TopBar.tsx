import React from "react";
import { Container } from "../ui/Container";
import { useI18n } from "../../i18n/I18nContext";
import { useTheme } from "../../hooks/useTheme";

export const TopBar: React.FC = () => {
  const { t, lang } = useI18n();
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <div className={`
      relative overflow-hidden border-b transition-colors duration-300
      ${isDark ? "bg-zinc-950 text-white border-white/10" : "bg-zinc-100 text-zinc-800 border-zinc-200"}
    `}>
        {/* Abstract Background Element - Adaptive */}
        <div className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 to-transparent" />
        </div>

      <Container className="relative z-10 flex flex-col sm:flex-row items-center justify-between py-2 text-[10px] sm:text-xs font-medium tracking-wide">
        
        {/* Left: Scrollable Tagline / Promotion */}
        <div className="flex-1 overflow-hidden relative max-w-full sm:max-w-[50%] md:max-w-[60%] mask-linear-fade">
           <div className={`flex w-max items-center gap-8 ${lang === 'ar' ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
              {/* Content duplicated 4 times for smooth infinite scroll even on wide screens */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <p className={`whitespace-nowrap ${!isDark ? "font-semibold text-zinc-600" : "opacity-90"}`}>
                    {t("topbar.tagline")}
                  </p>
                </div>
              ))}
           </div>
           
           {/* Fade gradients for smooth edge appearance */}
           <div className={`absolute left-0 top-0 h-full w-8 bg-gradient-to-r to-transparent z-10 ${isDark ? "from-zinc-950" : "from-zinc-100"}`} />
           <div className={`absolute right-0 top-0 h-full w-8 bg-gradient-to-l to-transparent z-10 ${isDark ? "from-zinc-950" : "from-zinc-100"}`} />
        </div>

        {/* Right: Socials & Quick Links */}
        <div className={`flex items-center gap-4 mt-1.5 sm:mt-0 ${isDark ? "opacity-80" : "opacity-100 text-zinc-500"}`}>
           {/* Social Icons */}
           <div className="flex items-center gap-3">
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? "hover:text-pink-400" : "hover:text-pink-600 text-zinc-600"}`} aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
               </a>
               <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-black text-zinc-600"}`} aria-label="TikTok">
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                   </svg>
               </a>
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? "hover:text-blue-500" : "hover:text-blue-600 text-zinc-600"}`} aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
               </a>
           </div>

           <div className={`h-3 w-px hidden sm:block ${isDark ? "bg-white/20" : "bg-zinc-300"}`}></div>
           
           <a href="mailto:hello@nextwav.com" className="hover:text-primary transition-colors hidden sm:block">
             hello@nextwav.com
           </a>
        </div>
      </Container>
    </div>
  );
};
