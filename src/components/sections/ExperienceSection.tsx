import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Img } from '../ui/Img';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import type { AssetKey } from '../../lib/assetManifest';

const STEPS: { n: string; title: string; text: string; asset: AssetKey; alt: string; bg: string; fg: string }[] = [
  {
    n: '1',
    title: 'Descobrir',
    text: 'A criança conhece a Lulu e sua história por meio da leitura — no seu tempo, do seu jeito.',
    asset: 'assets/lulu/lulu-reading',
    alt: 'Lulu lendo um livro aberto com atenção.',
    bg: '#cfedf3',
    fg: '#213363',
  },
  {
    n: '2',
    title: 'Explorar',
    text: 'Os materiais complementares permitem explorar atividades, comunicação, sentimentos e rotina.',
    asset: 'assets/lulu/lulu-calm-desk',
    alt: 'Lulu sentada à mesa com lápis e uma folha de desenho, sorrindo.',
    bg: '#f9e7f3',
    fg: '#6e2a61',
  },
  {
    n: '3',
    title: 'Conectar',
    text: 'Adultos e crianças compartilham momentos de interação, descoberta e aprendizado.',
    asset: 'assets/lulu/lulu-happy-arms',
    alt: 'Lulu feliz, com os braços abertos.',
    bg: '#c8d7cd',
    fg: '#213f2d',
  },
];

export function ExperienceSection() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 60%'] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="como-funciona" aria-labelledby="como-title" className="relative isolate overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="como-title"
          align="center"
          eyebrow="Como a experiência acontece"
          title="Descobrir, explorar, conectar"
          intro="Três momentos que podem acontecer em qualquer ordem e quantas vezes fizer sentido para cada criança."
        />

        <ol ref={ref} className="relative mt-16 grid gap-14 lg:mt-20 lg:grid-cols-3 lg:gap-10">
          {/* linha que se desenha com o scroll */}
          <svg aria-hidden="true" className="absolute top-[110px] left-[16%] hidden h-10 w-[68%] lg:block" viewBox="0 0 800 40" preserveAspectRatio="none">
            <path d="M0 20 C 130 -10, 270 50, 400 20 S 670 -10, 800 20" fill="none" stroke="#dcc9d6" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" />
            <motion.path
              d="M0 20 C 130 -10, 270 50, 400 20 S 670 -10, 800 20"
              fill="none"
              stroke="#bd51ab"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : draw }}
            />
          </svg>
          <svg aria-hidden="true" className="absolute top-0 left-[38px] h-full w-6 lg:hidden" viewBox="0 0 20 600" preserveAspectRatio="none">
            <path d="M10 0 V600" stroke="#dcc9d6" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
            <motion.path d="M10 0 V600" stroke="#bd51ab" strokeWidth="3" strokeLinecap="round" style={{ pathLength: reduce ? 1 : draw }} />
          </svg>

          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.15} className="relative grid grid-cols-[80px_1fr] gap-5 lg:grid-cols-1 lg:gap-0 lg:text-center">
              <div className="relative lg:mx-auto">
                <div
                  className="relative z-10 flex size-20 items-center justify-center overflow-hidden rounded-full ring-8 ring-cream lg:size-[220px]"
                  style={{ backgroundColor: s.bg }}
                >
                  <Img asset={s.asset} alt={s.alt} sizes="(min-width:1024px) 220px, 80px" className="h-[92%] w-auto translate-y-[6%] object-contain" />
                </div>
                <span
                  className="absolute -top-1 -right-1 z-20 inline-flex size-9 items-center justify-center rounded-full font-display text-lg font-extrabold text-white shadow-md lg:top-3 lg:right-3 lg:size-12 lg:text-2xl"
                  style={{ backgroundColor: s.fg }}
                  aria-hidden="true"
                >
                  {s.n}
                </span>
              </div>
              <div className="lg:mt-8">
                <h3 className="text-3xl font-bold sm:text-4xl" style={{ color: s.fg }}>
                  <span className="sr-only">Passo {s.n}: </span>
                  {s.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-ink/80 lg:mx-auto lg:max-w-xs">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
