import '../global.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {Lato, Montserrat} from 'next/font/google';
import BreadcrumbsJsonLd from '@/components/seo/BreadcrumbsJsonLd';

const lato = Lato({subsets: ['latin'], weight: ['400', '700'], variable: '--font-sans'});
const montserrat = Montserrat({subsets: ['latin'], weight: ['600', '700'], variable: '--font-serif'});

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const base = new URL(process.env.SITE_URL || 'http://localhost:3000');
  const ogLocale = locale === 'de' ? 'de_DE' : locale === 'tr' ? 'tr_TR' : 'en_US';
  return {
    metadataBase: base,
    title: 'Kanzlei Gören',
    description: 'Professionelle Rechtsberatung in Weinheim, Mannheim und Worms',
    alternates: {
      canonical: `/${locale}`,
      languages: { de: '/de', en: '/en', tr: '/tr' }
    },
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      title: 'Kanzlei Gören',
      description: 'Professionelle Rechtsberatung in Weinheim, Mannheim und Worms',
      siteName: 'Kanzlei Gören',
      locale: ogLocale,
      images: ['/logo.jpeg']
    },
    icons: { icon: '/logo.jpeg' }
  };
}

export function generateStaticParams() {
  return [{locale: 'de'}, {locale: 'en'}, {locale: 'tr'}];
}

export default async function LocaleLayout({children, params: {locale}}: {children: React.ReactNode; params: {locale: string}}) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${lato.variable} ${montserrat.variable}`}>
        <a href="#main" className="skip-link">Skip to content</a>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <BreadcrumbsJsonLd />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
