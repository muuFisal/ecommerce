import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nContext';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useEngagement } from '../context/EngagementContext';

type GItem = { id: string; image: string; caption: string; createdAt: string };

const LS_KEY = 'nassej.gallery';

const GalleryPage: React.FC = () => {
  const { t } = useI18n();
  const { addPoints } = useEngagement();
  const [items, setItems] = useLocalStorageState<GItem[]>(LS_KEY, []);
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');

  const add = () => {
    if (!image.trim()) return;
    const now = new Date();
    setItems((prev) => [
      {
        id: `${now.getTime()}`,
        image: image.trim(),
        caption: caption.trim(),
        createdAt: now.toISOString(),
      },
      ...prev,
    ]);
    setImage('');
    setCaption('');
    addPoints(20);
    alert(t('nassej.gallery.thanks'));
  };

  return (
    <section className="py-12">
      <Container className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{t('nassej.gallery.kicker')}</p>
          <h1 className="font-display text-3xl font-bold text-text-main">{t('nassej.gallery.title')}</h1>
          <p className="text-sm text-text-muted">{t('nassej.gallery.subtitle')}</p>
        </div>

        <Card className="rounded-3xl border-border-subtle bg-bg-elevated/30 p-6">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-muted">{t('nassej.gallery.imageUrl')}</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-2xl border border-border-subtle bg-bg-base/60 px-4 py-3 text-sm text-text-main outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-muted">{t('nassej.gallery.caption')}</label>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={t('nassej.gallery.captionPh')}
                className="w-full rounded-2xl border border-border-subtle bg-bg-base/60 px-4 py-3 text-sm text-text-main outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button onClick={add}>{t('nassej.gallery.submit')}</Button>
          </div>
        </Card>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.length ? (
            items.map((it) => (
              <Card key={it.id} className="overflow-hidden rounded-3xl border-border-subtle bg-bg-base/80">
                <div className="h-56 w-full overflow-hidden bg-bg-elevated">
                  <img src={it.image} alt={it.caption || 'gallery'} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-text-main">{it.caption || t('nassej.gallery.noCaption')}</p>
                  <p className="mt-1 text-xs text-text-muted">{new Date(it.createdAt).toLocaleString()}</p>
                  <button
                    type="button"
                    className="mt-3 text-xs font-semibold text-red-500 hover:underline"
                    onClick={() => setItems((prev) => prev.filter((x) => x.id !== it.id))}
                  >
                    {t('nassej.gallery.remove')}
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="rounded-3xl border-border-subtle bg-bg-elevated/30 p-6 md:col-span-2 lg:col-span-3">
              <p className="text-sm text-text-muted">{t('nassej.gallery.empty')}</p>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
};

export default GalleryPage;
