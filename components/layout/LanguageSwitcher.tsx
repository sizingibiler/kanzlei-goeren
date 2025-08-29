"use client";

import {useLocale} from 'next-intl';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState, useEffect, useRef} from 'react';

const allLocales = ['de', 'en', 'tr'] as const;

type Locale = typeof allLocales[number];

export default function LanguageSwitcher() {
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (open && ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  const basePath = (pathname || '/').replace(/^\/(de|en|tr)(?=\/|$)/, '') || '/';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:border-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.toUpperCase()}
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-50" role="listbox">
          {allLocales.filter(l => l !== current).map(l => (
            <li key={l}>
              <Link
                className="block px-3 py-2 hover:bg-gray-50"
                href={`/${l}${basePath || '/'}`}
                onClick={() => setOpen(false)}
              >
                {l.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
