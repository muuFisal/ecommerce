import React from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nContext';

const AboutPage: React.FC = () => {
    const { t } = useI18n();

  return (
    <div className="min-h-screen bg-bg-base pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {/* Parallax Background */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1600')"
            }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-black/40" />
        </div>

        <Container className="relative z-10 flex h-full flex-col justify-center text-center">
            <span className="mb-4 inline-block mx-auto rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md border border-white/20">
            {t('section.about')}
            </span>
          <h1 className="font-display text-5xl font-black text-white md:text-8xl tracking-tight drop-shadow-2xl">
            {t('section.aboutTitle')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-white/90 leading-relaxed font-light drop-shadow-md">
            {t('section.aboutParagraph1')}
          </p>
        </Container>
      </section>

      <Container className="space-y-24 py-20">
        
        {/* Story Section */}
        <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-primary"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('about.story.title')}</span>
                 </div>
                <h2 className="font-display text-4xl font-bold text-text-main leading-tight">
                    {t('about.story.heading')}
                </h2>
                <p className="text-lg text-text-muted leading-relaxed">
                    {t('about.story.desc')}
                </p>
                <div className="pt-4">
                     <p className="text-sm font-semibold text-text-main border-l-4 border-primary pl-4 py-1 italic">
                        "{t('section.aboutParagraph2')}"
                    </p>
                </div>
            </div>
            <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl opacity-50"></div>
                <img 
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800"
                    alt="{t('about.story.imageAlt')}"
                    className="relative rounded-[2.5rem] shadow-2xl border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-700"
                />
            </div>
        </div>

        {/* Values Section */}
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h2 className="font-display text-3xl font-bold text-text-main">{t('about.values.title')}</h2>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                 {[
                     {
                         title: t('about.value1.title'),
                         desc: t('about.value1.desc'),
                         icon: '💎'
                     },
                     {
                         title: t('about.value2.title'),
                         desc: t('about.value2.desc'),
                         icon: '🤝'
                     },
                     {
                         title: t('about.value3.title'),
                         desc: t('about.value3.desc'),
                         icon: '🌍'
                     }
                 ].map((value, idx) => (
                    <Card key={idx} className="group p-8 rounded-[2rem] border-border-subtle hover:border-primary/50 transition-colors bg-bg-elevated/50 text-center space-y-4">
                        <div className="h-16 w-16 mx-auto rounded-2xl bg-bg-soft flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                            {value.icon}
                        </div>
                        <h3 className="text-xl font-bold text-text-main">{value.title}</h3>
                        <p className="text-text-muted">{value.desc}</p>
                    </Card>
                 ))}
            </div>
        </div>

        {/* Contact Section */}
        <section className="relative overflow-hidden rounded-[3rem] bg-text-main px-8 py-20 text-bg-base md:px-16">
            <div className="absolute top-0 right-0 -m-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 -m-20 h-64 w-64 rounded-full bg-secondary/20 blur-[100px]"></div>

            <div className="relative z-10 grid gap-12 md:grid-cols-2 items-center">
                <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/80">{t('about.contact.title')}</span>
                    <h2 className="font-display text-4xl md:text-5xl font-black leading-tight">
                        {t('about.contact.heading')}
                    </h2>
                    <p className="text-lg text-white/70 max-w-md">
                        {t('about.contact.desc')}
                    </p>
                </div>

                <div className="grid gap-6">
                    <a href="mailto:{t('about.contact.emailValue')}" className="group flex items-center gap-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-text-main">
                            ✉️
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-white/50">{t('about.contact.email')}</p>
                            <p className="text-lg font-bold">hello@nextwav.com</p>
                        </div>
                    </a>

                    <div className="flex items-center gap-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                            📍
                        </div>
                         <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-white/50">{t('about.contact.location')}</p>
                            <p className="text-lg font-bold">{t('about.contact.locationValue')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </Container>
    </div>
  );
};

export default AboutPage;