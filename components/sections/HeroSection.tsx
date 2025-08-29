"use client";

import Button from '@/components/ui/Button';
import {useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';

export default function HeroSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');

  // Smooth, battery-friendly parallax: rAF + IntersectionObserver and disabled on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return; // disable on mobile

    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Progress of the section within viewport (-1 .. 1)
      const progress = Math.max(-1, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const y = progress * 80; // max 80px translate
      setOffset(y);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        setEnabled(visible);
        if (visible) {
          update();
          window.addEventListener('scroll', onScroll, {passive: true});
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      },
      {rootMargin: '200px'}
    );

    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Detect aspect ratio for optimal image selection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const detectAspectRatio = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ratio = vw / vh;
      
      // Determine the closest standard aspect ratio
      if (ratio >= 3.5) setAspectRatio('32:9');
      else if (ratio >= 2.33) setAspectRatio('21:9');
      else if (ratio >= 1.9) setAspectRatio('2:1');
      else if (ratio >= 1.7) setAspectRatio('16:9');
      else if (ratio >= 1.55) setAspectRatio('16:10');
      else if (ratio >= 1.45) setAspectRatio('3:2');
      else if (ratio >= 1.25) setAspectRatio('4:3');
      else setAspectRatio('3:4');
    };
    
    detectAspectRatio();
    window.addEventListener('resize', detectAspectRatio);
    return () => window.removeEventListener('resize', detectAspectRatio);
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate h-[100svh] min-h-[600px] max-h-[900px] flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 will-change-transform bg-gradient-to-br from-primary/95 to-secondary/95"
        style={{transform: `translateY(${enabled ? offset : 0}px) scale(1.1)`}}
      >
        <picture>
          {/* 32:9 super-ultrawide */}
          <source media="(min-aspect-ratio: 32/9)" srcSet="/images/variants/hero-background-32x9-2560.webp 2560w, /images/variants/hero-background-32x9-3440.webp 3440w, /images/variants/hero-background-32x9-3840.webp 3840w" sizes="100vw" type="image/webp" />
          {/* 21:9 ultrawide */}
          <source media="(min-aspect-ratio: 21/9)" srcSet="/images/variants/hero-background-21x9-1920.webp 1920w, /images/variants/hero-background-21x9-2560.webp 2560w, /images/variants/hero-background-21x9-3440.webp 3440w" sizes="100vw" type="image/webp" />
          {/* 2:1 very wide */}
          <source media="(min-aspect-ratio: 2/1)" srcSet="/images/variants/hero-background-2x1-1440.webp 1440w, /images/variants/hero-background-2x1-1920.webp 1920w, /images/variants/hero-background-2x1-2560.webp 2560w" sizes="100vw" type="image/webp" />
          {/* 16:10 (common monitors) */}
          <source media="(min-aspect-ratio: 16/10)" srcSet="/images/variants/hero-background-16x10-1600.webp 1600w, /images/variants/hero-background-16x10-1920.webp 1920w, /images/variants/hero-background-16x10-2560.webp 2560w" sizes="100vw" type="image/webp" />
          {/* 16:9 standard */}
          <source media="(min-aspect-ratio: 16/9)" srcSet="/images/variants/hero-background-16x9-1280.webp 1280w, /images/variants/hero-background-16x9-1920.webp 1920w, /images/variants/hero-background-16x9-2560.webp 2560w" sizes="100vw" type="image/webp" />
          {/* 3:2 classic */}
          <source media="(min-aspect-ratio: 3/2)" srcSet="/images/variants/hero-background-3x2-1440.webp 1440w, /images/variants/hero-background-3x2-1800.webp 1800w, /images/variants/hero-background-3x2-2160.webp 2160w" sizes="100vw" type="image/webp" />
          {/* 4:3 classic */}
          <source media="(min-aspect-ratio: 4/3)" srcSet="/images/variants/hero-background-4x3-1440.webp 1440w, /images/variants/hero-background-4x3-1920.webp 1920w, /images/variants/hero-background-4x3-2048.webp 2048w" sizes="100vw" type="image/webp" />
          {/* Tall / mobile fallback */}
          <img 
            src="/images/variants/hero-background-3x4-1080.webp" 
            srcSet="/images/variants/hero-background-3x4-768.webp 768w, /images/variants/hero-background-3x4-1080.webp 1080w, /images/variants/hero-background-3x4-1440.webp 1440w" 
            sizes="100vw" 
            alt="Law office" 
            className="w-full h-full object-cover object-center" 
            loading="eager" 
            decoding="async" 
            fetchPriority="high" 
          />
        </picture>
      </div>
      {/* Enhanced gradient overlay with golden accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-primary/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-transparent to-accent/10" />

      <div className="container-safe relative z-10 py-20 md:py-28 text-white">
        <div className="animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold drop-shadow-lg max-w-4xl leading-[1.1] bg-gradient-to-r from-white to-accent/90 bg-clip-text text-transparent">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 text-lg md:text-xl lg:text-2xl max-w-3xl text-white/95 font-light leading-relaxed drop-shadow-md">
            {t('heroSubtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href="/contact"
              variant="secondary"
              className="bg-gradient-to-r from-accent to-accent/80 text-primary hover:from-accent/90 hover:to-accent/70 ring-2 ring-accent/50 shadow-lg shadow-accent/25 px-8 py-3 text-base font-semibold transform hover:scale-105 transition-all"
            >
              {t('cta')}
            </Button>
            <Button
              href="/about"
              className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 ring-2 ring-white/30 px-8 py-3 text-base"
            >
              {t('aboutSummaryCta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
