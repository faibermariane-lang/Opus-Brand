import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { track, type TrackEvent } from '../../lib/analytics';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';

const styles: Record<Variant, string> = {
  primary:
    'bg-magenta-600 text-white shadow-[0_10px_0_-2px_var(--color-magenta-800),0_18px_30px_-12px_rgb(110_42_97/0.55)] hover:-translate-y-0.5 hover:shadow-[0_12px_0_-2px_var(--color-magenta-800),0_24px_36px_-14px_rgb(110_42_97/0.6)] active:translate-y-1 active:shadow-[0_4px_0_-2px_var(--color-magenta-800),0_8px_16px_-10px_rgb(110_42_97/0.5)]',
  secondary:
    'bg-white text-magenta-600 ring-2 ring-magenta-600/25 hover:ring-magenta-600/60 hover:-translate-y-0.5 shadow-[0_10px_24px_-14px_rgb(110_42_97/0.45)]',
  ghost: 'text-magenta-600 underline decoration-2 underline-offset-[6px] decoration-heart/60 hover:decoration-magenta-600 px-1!',
  light: 'bg-white text-magenta-600 hover:-translate-y-0.5 shadow-[0_10px_0_-2px_rgb(0_0_0/0.12),0_20px_34px_-14px_rgb(0_0_0/0.35)]',
};

export type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
  event?: TrackEvent;
  eventParams?: Record<string, string | number | boolean>;
  arrow?: boolean;
  size?: 'md' | 'lg';
};

/** Link com aparência de botão (CTAs navegam para seções ou para o checkout). */
export function Button({
  variant = 'primary',
  children,
  className = '',
  event,
  eventParams,
  arrow = false,
  size = 'md',
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        if (event) track(event, { label: typeof children === 'string' ? children : undefined, ...eventParams });
        onClick?.(e);
      }}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-display font-bold tracking-wide transition-all duration-300 ease-(--ease-soft) select-none ${
        size === 'lg' ? 'px-6 py-4 text-[1.05rem] sm:px-8 sm:text-xl' : 'px-6 py-3 text-base sm:text-lg'
      } ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.6} />
      )}
    </a>
  );
}
