import React, { useMemo, useState } from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nContext';
import { useEngagement } from '../context/EngagementContext';

type Answer = { key: string; labelKey: string; weight: Record<string, number> };

const QUESTIONS = [
  {
    key: 'vibe',
    titleKey: 'nassej.quiz.q1.title',
    answers: [
      { key: 'minimal', labelKey: 'nassej.quiz.q1.a1', weight: { minimal: 2 } },
      { key: 'graphic', labelKey: 'nassej.quiz.q1.a2', weight: { graphic: 2 } },
      { key: 'cozy', labelKey: 'nassej.quiz.q1.a3', weight: { winter: 2, oversized: 1 } },
      { key: 'summer', labelKey: 'nassej.quiz.q1.a4', weight: { summer: 2 } },
    ],
  },
  {
    key: 'fit',
    titleKey: 'nassej.quiz.q2.title',
    answers: [
      { key: 'oversized', labelKey: 'nassej.quiz.q2.a1', weight: { oversized: 2 } },
      { key: 'regular', labelKey: 'nassej.quiz.q2.a2', weight: { minimal: 1 } },
      { key: 'unisex', labelKey: 'nassej.quiz.q2.a3', weight: { unisex: 2 } },
    ],
  },
] as const;

const StyleQuizPage: React.FC = () => {
  const { t } = useI18n();
  const { addPoints } = useEngagement();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const done = Object.keys(answers).length === QUESTIONS.length;

  const result = useMemo(() => {
    const score: Record<string, number> = {};
    for (const q of QUESTIONS) {
      const chosen = answers[q.key];
      const a = q.answers.find((x) => x.key === chosen) as Answer | undefined;
      if (!a) continue;
      for (const [k, v] of Object.entries(a.weight)) score[k] = (score[k] ?? 0) + v;
    }
    const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 3).map(([k]) => k);
  }, [answers]);

  return (
    <section className="py-12">
      <Container className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{t('nassej.quiz.kicker')}</p>
          <h1 className="font-display text-3xl font-bold text-text-main">{t('nassej.quiz.title')}</h1>
          <p className="text-sm text-text-muted">{t('nassej.quiz.subtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {QUESTIONS.map((q) => (
            <Card key={q.key} className="rounded-3xl border-border-subtle bg-bg-elevated/40 p-6">
              <p className="text-sm font-bold text-text-main">{t(q.titleKey)}</p>
              <div className="mt-4 grid gap-2">
                {q.answers.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: a.key }))}
                    className={
                      'rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ' +
                      (answers[q.key] === a.key
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-border-subtle bg-bg-base/60 text-text-main hover:border-primary/40')
                    }
                  >
                    {t(a.labelKey)}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="rounded-3xl border-border-subtle bg-bg-elevated/30 p-6">
          {!done ? (
            <p className="text-sm text-text-muted">{t('nassej.quiz.progress')}</p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-bold text-text-main">{t('nassej.quiz.resultTitle')}</p>
              <div className="flex flex-wrap gap-2">
                {result.map((k) => (
                  <span key={k} className="rounded-full border border-border-subtle bg-bg-base/60 px-3 py-1 text-xs font-semibold text-text-main">
                    #{k}
                  </span>
                ))}
              </div>
              <Button
                className="mt-2"
                onClick={() => {
                  addPoints(15);
                  alert(t('nassej.quiz.pointsWon'));
                }}
              >
                {t('nassej.quiz.claim')}
              </Button>
            </div>
          )}
        </Card>
      </Container>
    </section>
  );
};

export default StyleQuizPage;
