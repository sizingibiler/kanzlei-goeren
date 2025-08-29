import type {MetadataRoute} from 'next';
import {locales} from '../i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
  const pages = ['', 'about', 'practice-areas', 'team', 'contact', 'impressum', 'datenschutz'];
  const entries: MetadataRoute.Sitemap = [];

  for (const l of locales) {
    for (const p of pages) {
      const url = `${baseUrl}/${l}${p ? '/' + p : ''}`;
      entries.push({ url, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 });
    }
  }
  return entries;
}
