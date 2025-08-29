"use client";

import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';

export default function BreadcrumbsJsonLd() {
  const pathname = usePathname() || '/';
  const locale = useLocale();
  const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000';

  const parts = pathname.replace(/\/$/, '').split('/').filter(Boolean);
  const segments = parts.slice(1); // remove locale
  const items = [{
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: `${base}/${locale}`
  }];
  segments.forEach((seg, i) => {
    const url = `${base}/${locale}/${segments.slice(0, i + 1).join('/')}`;
    items.push({ '@type': 'ListItem', position: i + 2, name: seg, item: url });
  });

  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  } as const;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(json)}} />
  );
}

