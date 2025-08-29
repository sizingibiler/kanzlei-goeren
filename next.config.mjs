import createNextIntlPlugin from 'next-intl/plugin';

// This file configures the Next.js App Router project.
// next-intl plugin wires locale-aware routing using the config in ./i18n.ts
const withNextIntl = createNextIntlPlugin('./i18n.ts');

export default withNextIntl({
  reactStrictMode: true,
  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000'] }
  }
});
