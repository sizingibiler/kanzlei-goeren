import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Rechtliche Hinweise'
};

export default async function ImpressumPage() {
  const t = await getTranslations('impressumPage');
  return (
    <div className="container-safe py-16 prose prose-slate max-w-none">
      <h1 className="text-3xl font-serif font-semibold not-prose">{t('title')}</h1>
      <div className="mt-6 text-text-secondary">
        <p>{t('provider')}</p>
        <p>{t('address')}</p>
        <p>{t('phone')}</p>
        <p>{t('fax')}</p>
        <p>{t('email')}</p>
        <p className="mt-4">{t('purpose')}</p>
        <p>{t('copyright')}</p>
        <p>{t('profession')}</p>
        <p>{t('authority')}</p>
        <p>{t('rules')}</p>
        <p className="mt-4">{t('liability')}</p>
        <p className="mt-4 text-xs">{t('footer')}</p>
      </div>
    </div>
  );
}
