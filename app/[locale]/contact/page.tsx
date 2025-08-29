import {getTranslations} from 'next-intl/server';
import ContactForm from '@/components/sections/ContactForm';

export const metadata = { title: 'Kontakt | Contact | İletişim' };

export default async function ContactPage() {
  const t = await getTranslations('contact');
  return (
    <div className="container-safe py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <section>
        <h1 className="text-3xl font-serif font-semibold">{t('title')}</h1>
        <ContactForm />
      </section>

      <section>
        <div className="space-y-4">
          <div className="font-semibold">{t('addresses.weinheim')}</div>
          <div className="text-text-secondary">Weinheim, Deutschland</div>
          <a className="text-primary underline text-sm" href="http://maps.google.com/maps?f=q&hl=de&geocode=&q=Bahnhofstrasse+18,+69469+Weinheim" target="_blank" rel="noopener noreferrer">In Google Maps öffnen</a>
          <div className="font-semibold pt-4">{t('addresses.mannheim')}</div>
          <div className="text-text-secondary">Mannheim, Deutschland</div>
          <a className="text-primary underline text-sm" href="https://maps.google.de/maps?q=c1+5+mannheim" target="_blank" rel="noopener noreferrer">In Google Maps öffnen</a>
          <div className="font-semibold pt-4">{t('addresses.worms')}</div>
          <div className="text-text-secondary">Worms, Deutschland</div>
          <a className="text-primary underline text-sm" href="https://maps.google.de/maps?q=Judengasse+3,+67547+Worms" target="_blank" rel="noopener noreferrer">In Google Maps öffnen</a>
        </div>
        <div className="mt-6 aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
          <iframe
            title="Weinheim Office"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2647.7927872269953!2d8.666!3d49.554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sde!4v1710000000000"
          />
        </div>
      </section>
    </div>
  );
}
