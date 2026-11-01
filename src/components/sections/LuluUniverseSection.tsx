import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import { universeItems } from '../../content/content';
import { Img } from '../ui/Img';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { track } from '../../lib/analytics';

/** Linhas sinuosas como as das páginas 5 e 12 do livro. */
export function Swirls({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${className}`}>
      <g fill="none" strokeLinecap="round" strokeWidth="34" opacity="0.38">
        <path stroke="#94d894" d="M-40 140c160-80 260 40 220 160s-120 200 20 260 220-60 300-140" />
        <path stroke="#d9a2d9" d="M480 -30c40 110 160 130 280 90s240-40 300 40 180 70 260 0 200-30 200-30" />
        <path stroke="#eae87c" d="M1480 520c-120-40-220 40-200 140s-60 180-180 170-160 90-140 160" />
        <path stroke="#d9a2d9" d="M-60 820c120-40 220 20 260 90" />
      </g>
    </svg>
  );
}

export function LuluUniverseSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const select = (i: number, how: string) => {
    if (i === active) return;
    setActive(i);
    track('universe_item_explore', { item: universeItems[i].id, how });
  };

  return (
    <section id="universo" aria-labelledby="universo-title" className="relative isolate overflow-hidden bg-cream py-24 sm:py-32">
      <Swirls />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="universo-title"
          eyebrow="Descubra o universo da Lulu"
          title={
            <>
              O que faz a Lulu <span className="text-magenta">brilhar</span>
            </>
          }
          intro="Quatro pedacinhos do jeito como a Lulu experimenta o mundo. Toque ou passe o mouse em cada um para saber mais."
        />

        <Reveal className="mt-14">
          <ul className="flex flex-col gap-4 lg:h-[560px] lg:flex-row">
            {universeItems.map((item, i) => {
              const open = i === active;
              return (
                <motion.li
                  key={item.id}
                  layout={!reduce}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-[32px] shadow-[0_24px_50px_-34px_rgb(43_38_51/0.55)] ring-1 ring-black/5"
                  style={{ backgroundColor: item.tint, flex: open ? '2.2 1 0%' : '1 1 0%' }}
                  onMouseEnter={() => window.matchMedia('(pointer: fine)').matches && select(i, 'hover')}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`universo-${item.id}`}
                    onClick={() => select(i, 'click')}
                    onFocus={() => select(i, 'focus')}
                    className="relative flex h-full w-full flex-col text-left focus-visible:outline-offset-[-6px]"
                  >
                    <div
                      className={`relative w-full overflow-hidden transition-[height] duration-700 ease-(--ease-soft) ${
                        open ? 'h-56 sm:h-72 lg:h-[58%]' : 'h-28 sm:h-36 lg:h-[62%]'
                      }`}
                    >
                      <Img
                        asset={item.asset}
                        alt=""
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-(--ease-soft)"
                        style={{ objectPosition: item.objectPosition, transform: open ? 'scale(1.02)' : 'scale(1.12)' }}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1/2"
                        style={{ background: `linear-gradient(to top, ${item.tint}, transparent)` }}
                      />
                    </div>
                    <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          lang="pt-BR"
                          className={`leading-tight font-bold hyphens-auto [overflow-wrap:anywhere] ${open ? 'text-2xl sm:text-[1.75rem]' : 'text-2xl lg:text-xl xl:text-[1.35rem]'}`}
                          style={{ color: item.accent }}
                        >
                          {item.title}
                        </h3>
                        <span
                          aria-hidden="true"
                          className={`mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/80 transition-transform duration-500 ${
                            open ? 'rotate-45' : ''
                          }`}
                          style={{ color: item.accent }}
                        >
                          <Plus className="size-5" strokeWidth={2.8} />
                        </span>
                      </div>
                      <p className={`mt-2 text-[1.02rem] leading-relaxed text-ink/80 ${open ? '' : 'lg:line-clamp-3'}`}>{item.short}</p>
                      <div
                        id={`universo-${item.id}`}
                        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-(--ease-soft) ${
                          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="mt-3 text-[1.02rem] leading-relaxed text-ink/80">{item.more}</p>
                          <p className="mt-4 font-display text-lg font-semibold" style={{ color: item.accent }}>
                            {item.quote} <span className="font-sans text-xs font-bold tracking-wider uppercase opacity-60">— do livro</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
