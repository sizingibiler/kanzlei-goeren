import {PropsWithChildren, CSSProperties} from 'react';
import clsx from 'clsx';

export default function Card({children, className, style}: PropsWithChildren<{className?: string; style?: CSSProperties}>) {
  return (
    <div 
      className={clsx(
        'group relative rounded-2xl border border-gray-200/50 bg-white shadow-lg p-6 transition-all duration-300',
        'hover:-translate-y-2 hover:shadow-2xl hover:border-accent/30',
        'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-accent/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100',
        className
      )}
      style={style}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
