import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { products } from '../data/products';
import type { Product } from '../data/products';
import { useI18n } from '../i18n/I18nContext';
import { useEngagement } from '../context/EngagementContext';

function pick(list: Product[], id?: number | null) {
  if (!id) return null;
  return list.find((p) => p.id === id) ?? null;
}

const OutfitBuilderPage: React.FC = () => {
  const { t } = useI18n();
  const { addPoints } = useEngagement();

  const tops = useMemo(() => products.filter((p) => p.category === 'hoodies' || p.category === 'tees'), []);
  const bottoms = useMemo(() => products.filter((p) => p.category === 'pants'), []);
  const sets = useMemo(() => products.filter((p) => p.category === 'sets'), []);

  const [topId, setTopId] = useState<number | null>(tops[0]?.id ?? null);
  const [bottomId, setBottomId] = useState<number | null>(bottoms[0]?.id ?? null);
  const [setId, setSetId] = useState<number | null>(null);

  const top = pick(tops, topId);
  const bottom = pick(bottoms, bottomId);
  const theSet = pick(sets, setId);

  const shareText = theSet
    ? `${t('nassej.outfit.sharePrefix')} ${theSet.name}`
    : `${t('nassej.outfit.sharePrefix')} ${top?.name ?? ''} + ${bottom?.name ?? ''}`;

  return (
    <section className="py-12">
      <Container className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{t('nassej.outfit.kicker')}</p>
          <h1 className="font-display text-3xl font-bold text-text-main">{t('nassej.outfit.title')}</h1>
          <p className="text-sm text-text-muted">{t('nassej.outfit.subtitle')}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-border-subtle bg-bg-elevated/30 p-6">
            <p className="text-sm font-bold text-text-main">{t('nassej.outfit.mode')}</p>

            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl border border-border-subtle bg-bg-base/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">{t('nassej.outfit.pickSet')}</p>
                <select
                  className="mt-2 w-full rounded-2xl border border-border-subtle bg-bg-soft px-4 py-3 text-sm text-text-main outline-none focus:border-primary"
                  value={setId ?? ''}
                  onChange={(e) => setSetId(e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">{t('nassej.outfit.none')}</option>
                  {sets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-text-muted">{t('nassej.outfit.setHint')}</p>
              </div>

              <div className={"rounded-2xl border border-border-subtle bg-bg-base/60 p-4 " + (theSet ? 'opacity-50' : '')}>
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">{t('nassej.outfit.pickPieces')}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <select
                    disabled={!!theSet}
                    className="w-full rounded-2xl border border-border-subtle bg-bg-soft px-4 py-3 text-sm text-text-main outline-none focus:border-primary disabled:cursor-not-allowed"
                    value={topId ?? ''}
                    onChange={(e) => setTopId(Number(e.target.value))}
                  >
                    {tops.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <select
                    disabled={!!theSet}
                    className="w-full rounded-2xl border border-border-subtle bg-bg-soft px-4 py-3 text-sm text-text-main outline-none focus:border-primary disabled:cursor-not-allowed"
                    value={bottomId ?? ''}
                    onChange={(e) => setBottomId(Number(e.target.value))}
                  >
                    {bottoms.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-2 text-xs text-text-muted">{t('nassej.outfit.piecesHint')}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => {
                    addPoints(10);
                    try {
                      navigator.clipboard.writeText(shareText);
                      alert(t('nassej.outfit.copied'));
                    } catch {
                      alert(shareText);
                    }
                  }}
                >
                  {t('nassej.outfit.copyShare')}
                </Button>
                <span className="text-xs text-text-muted">{t('nassej.outfit.pointsHint')}</span>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl border-border-subtle bg-bg-elevated/30 p-6">
            <p className="text-sm font-bold text-text-main">{t('nassej.outfit.preview')}</p>
            <div className="mt-4 grid gap-4">
              {theSet ? (
                <Link to={`/products/${theSet.id}`} className="group flex items-center gap-4 rounded-2xl border border-border-subtle bg-bg-base/60 p-4 hover:border-primary/40">
                  <img src={theSet.image} alt={theSet.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-text-main">{theSet.name}</p>
                    <p className="text-xs text-text-muted">{t('nassej.outfit.tapToOpen')}</p>
                  </div>
                </Link>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {top ? (
                    <Link to={`/products/${top.id}`} className="group rounded-2xl border border-border-subtle bg-bg-base/60 p-3 hover:border-primary/40">
                      <img src={top.image} alt={top.name} className="h-40 w-full rounded-xl object-cover" />
                      <p className="mt-2 text-xs font-semibold text-text-main line-clamp-2">{top.name}</p>
                    </Link>
                  ) : null}
                  {bottom ? (
                    <Link to={`/products/${bottom.id}`} className="group rounded-2xl border border-border-subtle bg-bg-base/60 p-3 hover:border-primary/40">
                      <img src={bottom.image} alt={bottom.name} className="h-40 w-full rounded-xl object-cover" />
                      <p className="mt-2 text-xs font-semibold text-text-main line-clamp-2">{bottom.name}</p>
                    </Link>
                  ) : null}
                </div>
              )}

              <div className="rounded-2xl border border-border-subtle bg-bg-base/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">{t('nassej.outfit.summary')}</p>
                <p className="mt-2 text-sm font-semibold text-text-main">{shareText}</p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default OutfitBuilderPage;
