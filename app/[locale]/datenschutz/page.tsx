import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Informationen zum Datenschutz'
};

export default function DatenschutzPage() {
  return (
    <div className="container-safe py-16">
      <h1 className="text-3xl font-serif font-semibold">Datenschutz</h1>
      <p className="mt-4 text-text-secondary max-w-3xl">
        Diese Seite beschreibt den Umgang mit personenbezogenen Daten. Bitte fügen Sie hier Ihre Datenschutzinformationen ein.
      </p>
    </div>
  );
}
