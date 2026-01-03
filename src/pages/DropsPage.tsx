import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { products } from '../data/products';
import { useEngagement } from '../context/EngagementContext';
import { useI18n } from '../i18n/I18nContext';

// Demo secret code (can be replaced later from backend)
const SECRET_CODE = 'NASSEJDROP';

const DropsPage: React.FC = () => {
  const { t } = useI18n();
  const { unlockDrop, dropUnlocked, addPoints } = useEngagement();
  const [code, setCode] = useState('');

  const dropProducts = useMemo(() => products.filter((p) => p.onFlashSale || p.isRecommended), []);

  return (
    <section className="py-12">
      <Container className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{t('nassej.drops.kicker')}</p>
          <h1 className="font-display text-3xl font-bold text-text-main">{t('nassej.drops.title')}</h1>
          <p className="text-sm text-text-muted">{t('nassej.drops.subtitle')}</p>
        </div>

        {!dropUnlocked ? (
          <Card className="rounded-3xl border-border-subtle bg-bg-elevated/30 p-6">
            <p className="text-sm font-semibold text-text-main">{t('nassej.drops.enterCode')}</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t('nassej.drops.codePlaceholder')}
                className="w-full rounded-2xl border border-border-subtle bg-bg-soft px-4 py-3 text-sm text-text-main outline-none focus:border-primary"
              />
              <Button
                onClick={() => {
                  if (code.trim().toUpperCase() === SECRET_CODE) {
                    unlockDrop();
                    addPoints(25);
                    alert(t('nassej.drops.unlocked'));
                  } else {
                    alert(t('nassej.drops.wrongCode'));
                  }
                }}
              >
                {t('nassej.drops.unlock')}
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="rounded-3xl border-border-subtle bg-bg-elevated/30 p-6">
            <p className="text-sm font-semibold text-text-main">{t('nassej.drops.listTitle')}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {dropProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border-subtle bg-bg-base/60 p-4 hover:border-primary/40"
                >
                  <img src={p.image} alt={p.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-text-main">{p.name}</p>
                    <p className="text-xs text-text-muted">{t('nassej.drops.tapToView')}</p>
                  </div>
                  <span className="ms-auto rounded-full border border-border-subtle bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {t('nassej.drops.badge')}
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        )}
      </Container>
    </section>
  );
};

export default DropsPage;
