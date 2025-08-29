import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-safe py-20 text-center">
      <h1 className="text-3xl font-serif font-semibold">404</h1>
      <p className="mt-2 text-text-secondary">Seite nicht gefunden / Page not found / Sayfa bulunamadı</p>
      <div className="mt-6">
        <Link href="/" className="text-primary underline">Zurück zur Startseite</Link>
      </div>
    </div>
  );
}
