import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
  tone?: 'default' | 'light';
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = 'left', id, tone = 'default', className = '' }: Props) {
  const center = align === 'center';
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <p
          className={`mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-extrabold tracking-wide ${
            tone === 'light' ? 'bg-white/15 text-white' : 'bg-white/70 text-magenta-600 ring-1 ring-magenta/15'
          }`}
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-[2.15rem] leading-[1.05] font-bold sm:text-5xl lg:text-[3.6rem] ${tone === 'light' ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {intro && (
        <div className={`mt-5 text-lg leading-relaxed sm:text-xl ${tone === 'light' ? 'text-white/85' : 'text-ink/75'} ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {intro}
        </div>
      )}
    </Reveal>
  );
}
