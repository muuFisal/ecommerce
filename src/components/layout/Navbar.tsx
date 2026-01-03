import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useCartContext } from "../../context/CartContext";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import nextwavLogo from "../../assets/logo.png"; // 👈 اللوجو

export const Navbar: React.FC = () => {
  const { mode, toggleMode } = useTheme();
  const { cart } = useCartContext();
  const { lang, setLang, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const isDark = mode === "dark";

  // خلفية عكس المود
  const headerBg = isDark ? "bg-white/95" : "bg-black/95";
  const brandText = isDark ? "text-neutral-900" : "text-neutral-50";
  const taglineText = isDark ? "text-neutral-500" : "text-neutral-400";

  const navLinkBase =
    "relative text-sm font-medium transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full " +
    (isDark
      ? "text-neutral-500 hover:text-neutral-900"
      : "text-neutral-300 hover:text-white");

  const activeNavText = isDark ? "text-neutral-900" : "text-white";

  const mobileLinkBase =
    "block py-1.5 text-sm font-medium " +
    (isDark ? "text-neutral-900" : "text-neutral-50");

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className={`z-40 border-b border-border-subtle/60 ${headerBg}`}>
      {/* الشريط الرئيسي */}
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Logo + Brand */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent">
              <img
                src={nextwavLogo}
                alt="NEXTWAV"
                className="h-9 w-9 rounded-full object-contain"
              />
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span
                className={`font-display text-base font-semibold ${brandText}`}
              >
                NEXTWAV
              </span>
              <span
                className={`text-[11px] uppercase tracking-[0.18em] ${taglineText}`}
              >
                {t('navbar.tagline')}
              </span>
            </div>
          </Link>

          {/* Navigation links - ديسكتوب فقط */}
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${navLinkBase} ${activeNavText}` : navLinkBase
              }
            >
              {t("nav.home")}
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? `${navLinkBase} ${activeNavText}` : navLinkBase
              }
            >
              {t("nav.shop")}
            </NavLink>
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                isActive ? `${navLinkBase} ${activeNavText}` : navLinkBase
              }
            >
              {t("nav.collections")}
            </NavLink>

            <NavLink
              to="/style-quiz"
              className={({ isActive }) =>
                isActive ? `${navLinkBase} ${activeNavText}` : navLinkBase
              }
            >
              {t("nav.styleQuiz")}
            </NavLink>

            <NavLink
              to="/drops"
              className={({ isActive }) =>
                isActive ? `${navLinkBase} ${activeNavText}` : navLinkBase
              }
            >
              {t("nav.drops")}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${navLinkBase} ${activeNavText}` : navLinkBase
              }
            >
              {t("nav.about")}
            </NavLink>
          </nav>
        </div>

        {/* الجزء اليمين */}
        {/* ديسكتوب */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Lang switch */}
          {/* <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="hidden items-center gap-1 rounded-2xl border border-border-subtle bg-bg-soft px-3 py-1.5 text-xs text-text-muted transition hover:border-primary hover:text-primary sm:inline-flex"
          >
            <span>{lang === "en" ? "AR" : "EN"}</span>
          </button> */}

          {/* Wishlist icon فقط */}
          <Link
            to="/wishlist"
            aria-label={t("nav.wishlist")}
            className="hidden items-center justify-center rounded-2xl border border-border-subtle bg-bg-soft px-3 py-1.5 text-sm text-text-muted transition hover:border-primary hover:text-primary sm:inline-flex"
          >
            <span>♡</span>
          </Link>

          {/* Cart icon فقط */}
          <Link
            to="/cart"
            aria-label={t("nav.cart")}
            className="hidden items-center justify-center rounded-2xl border border-border-subtle bg-bg-soft px-3 py-1.5 text-sm text-text-muted transition hover:border-primary hover:text-primary sm:inline-flex"
          >
            <span>🛒</span>
          </Link>

          {/* Theme toggle */}
          {/* <button
            type="button"
            onClick={toggleMode}
            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-border-subtle bg-bg-soft text-xs text-text-muted transition hover:border-primary hover:text-primary"
            aria-label="Toggle theme"
          >
            {mode === "dark" ? "☀️" : "🌙"}
          </button> */}

          {/* Auth buttons */}
          <Link
            to="/login"
            className="hidden items-center justify-center rounded-2xl border border-border-subtle bg-bg-soft px-3 py-1.5 text-xs text-text-muted transition hover:border-primary hover:text-primary sm:inline-flex"
          >
            {t("nav.signin")}
          </Link>
          <Link to="/register">
            <Button className="text-xs px-3 py-1.5">
              {t("nav.createAccount")}
            </Button>
          </Link>
        </div>

        {/* موبايل فقط: أيقونات مختصرة + زر المنيو */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* تبديل اللغة */}
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="inline-flex h-8 min-w-[36px] items-center justify-center rounded-2xl border border-border-subtle bg-bg-soft px-2 text-[11px] text-text-muted transition hover:border-primary hover:text-primary"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label={t("nav.wishlist")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-border-subtle bg-bg-soft text-xs text-text-muted transition hover:border-primary hover:text-primary"
          >
            ♡
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={t("nav.cart")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-border-subtle bg-bg-soft text-xs text-text-muted transition hover:border-primary hover:text-primary"
          >
            🛒
          </Link>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleMode}
            className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-border-subtle bg-bg-soft text-[11px] text-text-muted transition hover:border-primary hover:text-primary"
            aria-label="Toggle theme"
          >
            {mode === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-border-subtle bg-bg-soft text-[16px] text-text-main transition hover:border-primary hover:text-primary"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </Container>

      {/* قائمة الموبايل المنسدلة */}
      {isOpen && (
        <div
          className={`border-t border-border-subtle/60 ${headerBg} sm:hidden`}
        >
          <Container className="flex flex-col gap-1 py-3">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? `${mobileLinkBase} underline` : mobileLinkBase
              }
            >
              {t("nav.home")}
            </NavLink>

            <NavLink
              to="/shop"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? `${mobileLinkBase} underline` : mobileLinkBase
              }
            >
              {t("nav.shop")}
            </NavLink>

            <NavLink
              to="/collections"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? `${mobileLinkBase} underline` : mobileLinkBase
              }
            >
              {t("nav.collections")}
            </NavLink>

            <NavLink
              to="/style-quiz"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? `${mobileLinkBase} underline` : mobileLinkBase
              }
            >
              {t("nav.styleQuiz")}
            </NavLink>

            <NavLink
              to="/drops"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? `${mobileLinkBase} underline` : mobileLinkBase
              }
            >
              {t("nav.drops")}
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? `${mobileLinkBase} underline` : mobileLinkBase
              }
            >
              {t("nav.about")}
            </NavLink>

            <div className="mt-3 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full text-xs py-2">
                  {t("nav.signin")}
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" className="w-full text-xs py-2">
                  {t("nav.createAccount")}
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
