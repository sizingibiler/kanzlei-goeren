import {getTranslations} from 'next-intl/server';

export const metadata = { title: 'Über Uns | About | Hakkımızda' };

export default async function AboutPage() {
  const n = await getTranslations('navigation');
  const t = await getTranslations('aboutPage');
  return (
    <div className="container-safe py-16 space-y-10">
      <div className="relative w-full h-[42svh] md:h-[46svh] rounded-lg overflow-hidden">
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet="/images/variants/about-concept-16x9-1280.webp 1280w, /images/variants/about-concept-16x9-1920.webp 1920w, /images/variants/about-concept-16x9-2560.webp 2560w"
            sizes="100vw"
          />
          <img
            src="/images/variants/about-concept-3x4-1080.webp"
            srcSet="/images/variants/about-concept-3x4-768.webp 768w, /images/variants/about-concept-3x4-1080.webp 1080w, /images/variants/about-concept-3x4-1440.webp 1440w"
            sizes="100vw"
            alt="About"
            className="w-full h-full object-cover object-[center_35%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
      <h1 className="text-3xl font-serif font-semibold">{n('about')}</h1>
      <p className="mt-4 text-text-secondary max-w-3xl leading-relaxed">{t('intro')}</p>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-4">
          <div className="font-semibold">{t('contact.name')}</div>
          <div className="text-text-secondary">{t('contact.tel')}</div>
          <div className="text-text-secondary">{t('contact.fax')}</div>
          <div className="text-text-secondary">{t('contact.email')}</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-semibold">{t('firm.title')}</h2>
        <p className="text-text-secondary max-w-3xl">{t('firm.text')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['weinheim','mannheim','worms'] as const).map(k => (
            <div key={k} className="rounded-xl border border-gray-200 bg-white p-5 shadow-card">
              <div className="font-medium">{t(`firm.offices.${k}.title`)}</div>
              <div className="text-text-secondary mt-2">{t(`firm.offices.${k}.address`)}</div>
              <div className="text-text-secondary mt-2">{t(`firm.offices.${k}.tel`)}</div>
              <div className="text-text-secondary">{t(`firm.offices.${k}.fax`)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
