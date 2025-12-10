import React, { useState } from "react";
import { Container } from "../../ui/Container";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useI18n } from "../../../i18n/I18nContext";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  createdAt: string;
}

const PAGE_SIZE = 4;

const PANEL_COLORS = [
  "bg-lime-700",
  "bg-amber-800",
  "bg-sky-800",
  "bg-fuchsia-800",
];

export const TestimonialsSection: React.FC = () => {
  const { t, lang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const [items, setItems] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Omar",
      role: "Streetwear Fan",
      message: "The vibe of the store feels like a global brand already.",
      createdAt: "1 day ago",
    },
    {
      id: 2,
      name: "Sara",
      role: "Designer",
      message: "Clean design, easy to imagine real products living here.",
      createdAt: "3 days ago",
    },
    {
      id: 3,
      name: "Yousef",
      role: "Customer",
      message: "Excited to see this platform go live with real drops.",
      createdAt: "1 week ago",
    },
    {
      id: 4,
      name: "Laila",
      role: "Brand Owner",
      message: "Love the mix between global streetwear and local culture.",
      createdAt: "2 weeks ago",
    },
    {
      id: 5,
      name: "Ahmed",
      role: "Developer",
      message: "Smooth experience and a clean interface. Feels premium.",
      createdAt: "1 month ago",
    },
    {
      id: 6,
      name: "Mona",
      role: "Photographer",
      message: "Colors, layout, and vibe are all on point.",
      createdAt: "1 month ago",
    },
  ]);

  const [page, setPage] = useState(0);
  const pagesCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setItems((prev) => [
      {
        id: prev.length + 1,
        name: name.trim() || "Anonymous",
        role: role.trim() || (t("community.roleLabel") as string) || "Customer",
        message: message.trim(),
        createdAt: "Just now",
      },
      ...prev,
    ]);

    setName("");
    setRole("");
    setMessage("");
    setIsOpen(false);
    setPage(0);
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + pagesCount) % pagesCount);
  };

  const handleNext = () => {
    setPage((prev) => (prev + 1) % pagesCount);
  };

  const start = page * PAGE_SIZE;
  const visibleOnHome = items.slice(start, start + PAGE_SIZE);

  const arrowLeft = lang === "ar" ? "→" : "←";
  const arrowRight = lang === "ar" ? "←" : "→";

  const getInitial = (fullName: string) =>
    fullName.trim().slice(0, 2).toUpperCase();

  return (
    <section className="pb-16">
      <Container className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-text-muted">
              {t("section.community")}
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-main">
              {t("section.communityTitle")}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle text-xs text-text-muted hover:border-primary hover:text-primary transition"
              >
                {arrowLeft}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle text-xs text-text-muted hover:border-primary hover:text-primary transition"
              >
                {arrowRight}
              </button>
            </div>

            <Button
              className="px-4 py-2 text-xs"
              onClick={() => setIsOpen(true)}
            >
              {t("community.addComment")}
            </Button>
          </div>
        </div>
      </Container>

      {/* التعليقات: على الموبايل full width مع scroll، على الديسكتوب جوه Container */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 px-4">
        {visibleOnHome.map((item, idx) => {
          const colorClass =
            PANEL_COLORS[(start + idx) % PANEL_COLORS.length];

          return (
            <Card
              key={item.id}
              className="flex min-h-[190px] flex-col overflow-hidden rounded-3xl border border-border-subtle/60 bg-bg-base/95 shadow-sm flex-shrink-0 w-[90vw] max-w-[400px] snap-center"
            >
              <div className="flex flex-1 items-center bg-bg-elevated/60 px-6 py-6">
                <div className="space-y-3 text-sm">
                  <div className="text-4xl text-text-muted/30">"</div>
                  <p className="text-sm leading-relaxed text-text-main/90">
                    {item.message}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    {item.createdAt}
                  </p>
                </div>
              </div>

              <div
                className={`relative flex w-full items-center justify-center ${colorClass} text-white noise-bg`}
              >
                <div className="flex flex-col items-center gap-3 py-6 px-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-xl font-semibold text-white shadow-sm backdrop-blur-sm border border-white/10">
                    {getInitial(item.name)}
                  </div>
                  <div className="text-center text-sm z-10">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-[11px] opacity-90">
                      {item.role ||
                        (t("community.roleLabel") as string) ||
                        "Customer"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* التعليقات على الديسكتوب: Grid عادي جوه Container */}
      <Container className="hidden md:block">
        <div className="grid gap-6 md:grid-cols-2">
          {visibleOnHome.map((item, idx) => {
            const colorClass =
              PANEL_COLORS[(start + idx) % PANEL_COLORS.length];

            return (
              <Card
                key={item.id}
                className="flex min-h-[190px] flex-col overflow-hidden rounded-3xl border border-border-subtle/60 bg-bg-base/95 shadow-sm md:flex-row"
              >
                <div className="flex flex-1 items-center bg-bg-elevated/60 px-6 py-6">
                  <div className="space-y-3 text-sm">
                    <div className="text-4xl text-text-muted/30">"</div>
                    <p className="text-sm leading-relaxed text-text-main/90">
                      {item.message}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {item.createdAt}
                    </p>
                  </div>
                </div>

                <div
                  className={`relative flex w-full items-center justify-center ${colorClass} text-white md:w-1/3 noise-bg`}
                >
                  <div className="flex flex-col items-center gap-3 py-6 px-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-xl font-semibold text-white shadow-sm backdrop-blur-sm border border-white/10">
                      {getInitial(item.name)}
                    </div>
                    <div className="text-center text-sm z-10">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-[11px] opacity-90">
                        {item.role ||
                          (t("community.roleLabel") as string) ||
                          "Customer"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="glass-card relative w-full max-w-lg rounded-3xl border border-border-subtle/70 bg-bg-elevated/95 p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-semibold text-text-main">
                {t("community.modalTitle")}
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-sm text-text-muted hover:text-primary"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="text-xs text-text-muted">
                  {t("community.nameOptional")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-border-subtle/70 bg-bg-base/70 px-3 py-2 text-xs text-text-main outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text-muted">
                  {t("community.roleLabel") ?? "Job title (optional)"}
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-2xl border border-border-subtle/70 bg-bg-base/70 px-3 py-2 text-xs text-text-main outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text-muted">
                  {t("community.comment")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-border-subtle/70 bg-bg-base/70 px-3 py-2 text-xs text-text-main outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-2 text-xs">
                <Button type="submit" className="px-4 py-2 text-xs">
                  {t("community.submit")}
                </Button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-border-subtle px-3 py-2 text-[11px] text-text-muted hover:border-primary hover:text-primary"
                >
                  {t("community.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
