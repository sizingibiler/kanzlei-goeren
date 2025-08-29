"use client";

import {useState} from 'react';
import {useTranslations} from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || 'Failed');
      setOk(true);
      form.reset();
    } catch (err: any) {
      setOk(false);
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4">
      <input name="name" className="border border-gray-300 rounded-md p-3" placeholder={t('form.name')} required />
      <input name="email" className="border border-gray-300 rounded-md p-3" type="email" placeholder={t('form.email')} required />
      <input name="phone" className="border border-gray-300 rounded-md p-3" placeholder={t('form.phone')} />
      <input name="subject" className="border border-gray-300 rounded-md p-3" placeholder={t('form.subject')} required />
      <textarea name="message" className="border border-gray-300 rounded-md p-3 min-h-32" placeholder={t('form.message')} required />
      <button disabled={loading} className="bg-primary text-white rounded-md px-5 py-2.5 w-fit hover:bg-secondary disabled:opacity-60">
        {loading ? '...' : t('form.send')}
      </button>
      {ok && <div className="text-green-700">Nachricht wurde gesendet.</div>}
      {ok === false && <div className="text-red-700">{error || 'Fehler beim Senden.'}</div>}
    </form>
  );
}
