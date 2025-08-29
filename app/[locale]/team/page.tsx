import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

export const metadata = { title: 'Unser Team | Our Team | Ekibimiz' };

export default async function TeamPage() {
  const t = await getTranslations('team');
  const td = await getTranslations('teamDetails');
  return (
    <div className="container-safe py-16 space-y-10">
      <h1 className="text-3xl font-serif font-semibold">{t('title')}</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="relative aspect-square md:aspect-[3/4] w-full overflow-hidden rounded-2xl md:col-span-1 ring-1 ring-black/5 shadow-md bg-white">
          <Image src="/images/meral.webp" alt={t('meral.name')} fill className="object-cover object-[center_32%]" sizes="(min-width: 768px) 33vw, 100vw" priority />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold">{td('name')}</h2>
          <p className="mt-3 text-text-secondary leading-relaxed">{td('bio1')}</p>
          <p className="mt-3 text-text-secondary leading-relaxed">{td('bio2')}</p>
          <p className="mt-3 text-xs text-text-secondary">{td('footer')}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg md:col-span-1">
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">J. Armbruster</div>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold">{t('armbruster.name')}</h2>
          <p className="mt-3 text-text-secondary leading-relaxed">{t('armbruster.bio')}</p>
        </div>
      </section>
    </div>
  );
}
