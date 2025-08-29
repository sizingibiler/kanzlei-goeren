import HeroSection from '@/components/sections/HeroSection';
import AboutSummarySection from '@/components/sections/AboutSummarySection';
import Card from '@/components/ui/Card';
import Image from 'next/image';
import {getTranslations, getLocale} from 'next-intl/server';
import Link from 'next/link';

export default async function Page() {
  const t = await getTranslations('home');
  const a = await getTranslations('areas');
  const locale = await getLocale();
  const items = [
    {key: 'family', icon: '/images/icons/family-law.webp'},
    {key: 'labor', icon: '/images/icons/work-contract.webp'},
    {key: 'immigration', icon: '/images/icons/immigration.webp'}
  ];

  return (
    <div>
      <HeroSection />
      <AboutSummarySection />

      <section className="container-safe py-20 relative">
        {/* Section header with decoration */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-accent/20 text-accent-700 rounded-full text-sm font-semibold mb-4">
            {t('expertiseSubtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('expertiseTitle')}
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-accent to-accent-dark mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <Card key={item.key} className="group cursor-pointer animate-fadeInUp" style={{animationDelay: `${idx * 100}ms`}}>
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon with premium styling */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent-dark/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative w-20 h-20 overflow-hidden rounded-full border-3 border-accent/40 bg-gradient-to-br from-accent/20 to-accent/10 p-2 group-hover:scale-110 transition-transform duration-300">
                    <Image 
                      src={item.icon} 
                      alt={a(item.key as any)} 
                      fill 
                      className="object-cover rounded-full group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                </div>
                
                {/* Title with hover effect */}
                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  {a(item.key as any)}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t('expertiseTagline')}
                </p>
                
                {/* Learn more link */}
                <Link href={`/${locale}/practice-areas#${item.key}`} className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all duration-300">
                  {t('learnMore')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
