import Card from '@/components/ui/Card';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import Accordion from '@/components/ui/Accordion';

export const metadata = { title: 'Rechtsgebiete | Practice Areas | Uzmanlık Alanları' };

const iconMap: Record<string, string> = {
  family: '/images/icons/family-law.webp',
  labor: '/images/icons/work-contract.webp',
  immigration: '/images/icons/immigration.webp',
  traffic: '/images/icons/car-accident.webp',
  civil: '/images/icons/civil-law.webp'
};

export default async function PracticeAreasPage() {
  const t = await getTranslations('areas');
  const td = await getTranslations('areasDescriptions');
  const keys = ['family', 'labor', 'immigration', 'traffic', 'civil'] as const;

  return (
    <div className="container-safe py-16 space-y-10">
      <h1 className="text-3xl font-serif font-semibold">{t('title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {keys.map(k => (
          <Card key={k}>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-accent/60 bg-accent/10 p-1">
                <Image src={iconMap[k]} alt={t(k)} fill className="object-cover rounded-full" />
              </div>
              <div className="text-lg font-medium">{t(k)}</div>
            </div>
          </Card>
        ))}
      </div>

      <Accordion
        singleOpen
        items={keys.map(k => ({
          id: k,
          title: t(k),
          content: <p>{td(k)}</p>
        }))}
      />
    </div>
  );
}
