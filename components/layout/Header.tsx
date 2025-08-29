"use client";

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations, useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';
import {useState, useMemo, useEffect, useRef} from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const nav = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/practice-areas', key: 'areas'},
  {href: '/team', key: 'team'},
  {href: '/contact', key: 'contact'}
];

export default function Header() {
  const t = useTranslations('navigation');
  const tHome = useTranslations('home');
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const lockY = useRef(0);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Robust scroll lock for iOS/Android when menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = document.body;
    const html = document.documentElement as HTMLElement;
    if (open) {
      lockY.current = window.scrollY || 0;
      html.style.overscrollBehaviorY = 'none';
      body.style.position = 'fixed';
      body.style.top = `-${lockY.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
    } else {
      html.style.overscrollBehaviorY = '';
      body.style.position = '';
      const y = lockY.current;
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      window.scrollTo(0, y);
    }
  }, [open]);

  const isActive = (to: string) => {
    const full = `/${locale}${to}`.replace(/\/+/, '/');
    return pathname === full || pathname?.startsWith(full + '/');
  };

  const items = useMemo(() => nav.map(item => ({...item, label: t(item.key as any)})), [t]);

  return (
    <header className="w-full border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="container-safe h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/logo.webp" alt="Kanzlei Gören" width={40} height={40} className="rounded-sm" />
          <span className="font-semibold tracking-wide">Kanzlei Gören</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {items.map(i => (
            <Link
              key={i.key}
              href={`/${locale}${i.href}`}
              className={`pb-1 transition-all ${isActive(i.href) ? 'text-primary border-b-2 border-accent' : 'text-text-secondary hover:text-primary'}`}
            >
              {i.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <button
          aria-label="Menu"
          aria-expanded={open}
          className={`md:hidden relative w-10 h-10 rounded-lg border-2 transition-all duration-300 ${
            open ? 'border-accent bg-accent/10' : 'border-gray-300 hover:border-accent/50'
          }`}
          onClick={() => setOpen(v => !v)}
        >
          <span className="sr-only">Toggle Menu</span>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
            <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay with slide animation */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${open ? 'visible' : 'invisible'}`}
        aria-hidden={!open}
      >
        {/* Background overlay */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        
        {/* Menu panel sliding from top */}
        <div
          ref={menuRef}
          className={`absolute top-0 left-0 right-0 bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{
            maxHeight: '85vh',
            paddingTop: 'env(safe-area-inset-top)',
          }}
        >
          <div className="overflow-y-auto overscroll-contain" style={{maxHeight: 'calc(85vh - env(safe-area-inset-top))' }}>
            <div className="px-6 py-4">
              {/* Menu Header */}
              <div className="flex items-center justify-between pb-4 border-b border-accent/20">
                <Link href={`/${locale}`} className="flex items-center gap-3" onClick={() => setOpen(false)}>
                  <div className="relative w-10 h-10 ring-2 ring-accent/30 rounded-lg overflow-hidden">
                    <Image src="/logo.webp" alt="Kanzlei Gören" fill className="object-cover" />
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Kanzlei Gören</span>
                </Link>
                <button 
                  aria-label="Close menu" 
                  onClick={() => setOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
                >
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Menu Items */}
              <nav className="mt-6 space-y-1">
                {items.map((item, idx) => (
                  <Link 
                    key={item.key} 
                    href={`/${locale}${item.href}`} 
                    onClick={() => setOpen(false)} 
                    className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all hover:bg-accent/10 hover:text-primary hover:translate-x-2 ${
                      isActive(item.href) ? 'bg-accent/15 text-primary border-l-4 border-accent' : 'text-text-secondary'
                    }`}
                    style={{animationDelay: `${idx * 50}ms`}}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              {/* Language Switcher */}
              <div className="mt-6 pt-6 border-t border-accent/20">
                <div className="px-4">
                  <p className="text-sm text-text-secondary mb-3 font-medium">{tHome('language')}</p>
                  <LanguageSwitcher />
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="mt-6 p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl">
                <p className="text-sm font-medium text-primary mb-2">{tHome('quickContact')}</p>
                <a href="tel:+4922342009639" className="text-accent-600 font-semibold hover:text-accent-700">+49 223 42 00 96 39</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
