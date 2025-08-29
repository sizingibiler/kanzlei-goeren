"use client";

import Link from 'next/link';
import {useLocale} from 'next-intl';
import clsx from 'clsx';
import {ButtonHTMLAttributes, PropsWithChildren} from 'react';

type Props = PropsWithChildren<{
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}> & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({href, variant = 'primary', className, children, ...rest}: Props) {
  const locale = useLocale();
  const classes = clsx(
    'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95',
    variant === 'primary' && 'bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary shadow-lg hover:shadow-xl',
    variant === 'secondary' && 'bg-gradient-to-r from-accent to-accent-dark text-primary hover:from-accent-dark hover:to-accent ring-2 ring-accent/30 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30',
    className
  );

  if (href) {
    const normalized = href.startsWith('/') ? href : `/${href}`;
    const withLocale = `/${locale}${normalized}`.replace(/\/+/, '/');
    return (
      <Link href={withLocale} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
