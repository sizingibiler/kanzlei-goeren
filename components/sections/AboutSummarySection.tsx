"use client";

import Image from 'next/image';
import Button from '@/components/ui/Button';
import {useTranslations} from 'next-intl';

export default function AboutSummarySection() {
  const t = useTranslations('home');
  return (
    <section className="container-safe py-20">
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-white to-accent/5 backdrop-blur rounded-3xl p-8 md:p-12 shadow-2xl border border-accent/20">
          {/* Image Section with Golden Frame */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-dark/20 rounded-3xl transform rotate-3 scale-105" />
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl ring-4 ring-accent/30 shadow-2xl bg-white transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/meral.webp"
                alt="Meral Gören"
                fill
                className="object-cover object-[center_32%] hover:scale-110 transition-transform duration-700"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              {/* Elegant overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-1 bg-accent/20 text-accent-700 rounded-full text-sm font-semibold mb-4">
                {t('expertLegalCounsel')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                {t('aboutSummaryTitle')}
              </h2>
            </div>
            
            <p className="text-lg text-text-secondary leading-relaxed">
              {t('aboutSummaryText')}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/about" variant="primary">
                {t('aboutSummaryCta')}
              </Button>
              <Button href="/contact" variant="secondary">
                {t('cta')}
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-accent/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">15+</div>
                <div className="text-sm text-text-secondary">{t('yearsExperience')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1000+</div>
                <div className="text-sm text-text-secondary">{t('casesWon')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">98%</div>
                <div className="text-sm text-text-secondary">{t('successRate')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
