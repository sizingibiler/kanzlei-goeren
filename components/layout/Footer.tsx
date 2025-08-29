"use client";
import Link from 'next/link';
import {useTranslations, useLocale} from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const n = useTranslations('navigation');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="container-safe py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <div className="text-xl font-semibold">Kanzlei Gören</div>
          <p className="mt-3 text-text-secondary max-w-sm">{t('rights').replace('2025', String(year))}</p>
        </div>
        <div>
          <div className="font-semibold mb-3">{t('quickLinks')}</div>
          <ul className="space-y-2 text-text-secondary">
            <li><Link href={`/${locale}`}>{n('home')}</Link></li>
            <li><Link href={`/${locale}/about`}>{n('about')}</Link></li>
            <li><Link href={`/${locale}/contact`}>{n('contact')}</Link></li>
            <li><Link href={`/${locale}/impressum`}>{t('impressum')}</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Offices</div>
          <ul className="space-y-2 text-text-secondary">
            <li>Weinheim</li>
            <li>Mannheim</li>
            <li>Worms</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-sm text-text-secondary">
        {t('rights').replace('2025', String(year))}
      </div>
    </footer>
  );
}
