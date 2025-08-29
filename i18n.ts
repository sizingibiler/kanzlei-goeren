import {getRequestConfig} from 'next-intl/server';

export const locales = ['de', 'en', 'tr'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'de';

export default getRequestConfig(async ({requestLocale}) => {
  const all = (await import('./content/translations.json')).default as Record<Locale, any>;
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }
  return {
    locale: locale as Locale,
    messages: all[locale as Locale]
  };
});
