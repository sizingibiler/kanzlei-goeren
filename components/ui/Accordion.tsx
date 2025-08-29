"use client";

import {useState} from 'react';
import clsx from 'clsx';

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export default function Accordion({items, singleOpen = true, defaultOpenId}: {items: AccordionItem[]; singleOpen?: boolean; defaultOpenId?: string}) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const isOpen = prev.includes(id);
      if (singleOpen) return isOpen ? [] : [id];
      return isOpen ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  return (
    <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
      {items.map((it, idx) => {
        const open = openIds.includes(it.id);
        const buttonId = `acc-btn-${it.id}`;
        const regionId = `acc-panel-${it.id}`;
        return (
          <div key={it.id} className={clsx('p-4 md:p-5', idx === 0 && 'rounded-t-xl', idx === items.length - 1 && 'rounded-b-xl')}>
            <button
              id={buttonId}
              className="w-full flex items-center justify-between text-left font-medium"
              aria-controls={regionId}
              aria-expanded={open}
              onClick={() => toggle(it.id)}
            >
              <span>{it.title}</span>
              <span className={clsx('ml-4 inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 text-sm transition-transform', open && 'rotate-45')}>+</span>
            </button>
            <div
              id={regionId}
              role="region"
              aria-labelledby={buttonId}
              className={clsx('grid transition-all', open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0')}
            >
              <div className="overflow-hidden text-text-secondary leading-relaxed">
                {it.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
