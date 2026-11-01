import { useCallback, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bookSpreads } from '../../content/content';
import { Img } from '../ui/Img';
import { Decor } from '../ui/Decor';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { track } from '../../lib/analytics';

function BookViewer() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const total = bookSpreads.length;
  const go = useCallback(
    (next: number) => {
      const n = (next + total) % total;
      setState(([cur]) => [n, n > cur ? 1 : -1]);
      track('book_page_view', { page: n + 1 });
    },
    [total],
  );
  const spread = bookSpreads[index];

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  };

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Algumas páginas do livro"
      onKeyDown={onKey}
    >
      <div
        className="relative overflow-hidden rounded-[18px] shadow-[0_40px_80px_-40px_rgb(33_51_99/0.55),0_0_0_10px_white,0_0_0_11px_rgb(33_51_99/0.08)] transition-colors duration-700 sm:rounded-[26px]"
        style={{ backgroundColor: spread.bg, aspectRatio: '1191 / 652' }}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
            transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Img asset={spread.asset} alt={spread.alt} sizes="(min-width: 1280px) 1100px, 94vw" className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
        {/* vinco central do livro */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[9%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(0_0_0/0.07)_45%,rgb(0_0_0/0.12)_50%,rgb(255_255_255/0.18)_52%,transparent)]"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="min-h-8 font-display text-xl font-bold text-navy sm:text-2xl" aria-live="polite">
          <span className="mr-3 font-sans text-sm font-extrabold tracking-widest text-ink-blue/70 tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {spread.caption}
        </p>
        <div className="flex items-center gap-3">
          <div className="mr-2 hidden items-center gap-1.5 sm:flex" aria-hidden="true">
            {bookSpreads.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${i === index ? 'w-7 bg-navy' : 'w-2 bg-navy/25'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Página anterior"
            className="inline-flex size-12 items-center justify-center rounded-full bg-white text-navy shadow-[0_8px_20px_-12px_rgb(33_51_99/0.6)] ring-1 ring-navy/10 transition hover:-translate-x-0.5 hover:bg-navy hover:text-white"
          >
            <ChevronLeft className="size-6" strokeWidth={2.6} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Próxima página"
            className="inline-flex size-12 items-center justify-center rounded-full bg-navy text-white shadow-[0_8px_20px_-12px_rgb(33_51_99/0.6)] transition hover:translate-x-0.5"
          >
            <ChevronRight className="size-6" strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function StorySection() {
  return (
    <section id="historia" aria-labelledby="historia-title" className="relative isolate overflow-hidden bg-sky-100 pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* blobs orgânicos como os do livro */}
      <svg aria-hidden="true" className="absolute -top-24 -left-40 -z-10 w-[680px] text-sky-200" viewBox="0 0 600 500">
        <path fill="currentColor" d="M88 96c60-70 190-92 290-52s178 112 160 214-110 196-238 210S38 400 20 300 28 166 88 96z" />
      </svg>
      <svg aria-hidden="true" className="absolute right-[-180px] bottom-[18%] -z-10 w-[560px] text-sky-200/80" viewBox="0 0 600 500">
        <path
          fill="currentColor"
          stroke="#87bde7"
          strokeWidth="4"
          d="M120 70c80-50 220-40 300 30s120 170 70 250-170 120-270 100S30 360 30 260 40 120 120 70z"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Lulu de corpo inteiro, como na página 2 do livro */}
          <Reveal className="relative order-2 mx-auto w-full max-w-[420px] lg:order-1">
            <div aria-hidden="true" className="absolute inset-x-[6%] bottom-[1%] h-[11%] rounded-[50%] bg-lavender" />
            <Img
              asset="assets/lulu/lulu-full-crayon"
              sizes="(min-width: 1024px) 420px, 80vw"
              alt="Lulu de corpo inteiro, de uniforme escolar, segurando um giz lilás e olhando para o céu com um sorriso tranquilo."
              className="relative mx-auto h-auto w-[78%]"
            />
            <Decor asset="assets/decorative/note-triple" className="top-[6%] left-[-2%] w-[78px]" rotate={-8} />
            <Decor asset="assets/decorative/note-clef" className="top-[30%] right-[-4%] w-[46px]" rotate={8} delay={1.4} motion="float-slow" />
            <Decor asset="assets/decorative/note-green" className="bottom-[26%] left-[0%] w-[44px]" rotate={-4} delay={2.2} />
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-extrabold tracking-wide text-ink-blue ring-1 ring-navy/10">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-current" /> A história
              </p>
              <h2 id="historia-title" className="text-[2.15rem] leading-[1.05] font-bold text-navy sm:text-5xl lg:text-[3.6rem]">
                Uma história para enxergar o mundo de outro jeito
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="relative mt-8 border-l-[6px] border-sky-stroke pl-6 font-display text-2xl leading-snug font-semibold text-ink-blue sm:text-[1.9rem]">
                Nem todo mundo enxerga, sente ou experimenta o mundo da mesma maneira. E é justamente isso que torna cada pessoa
                especial.
              </blockquote>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.15} className="rounded-[28px] bg-white/75 p-6 ring-1 ring-navy/5 backdrop-blur">
                <h3 className="text-2xl font-bold text-navy">Essa é a Lulu.</h3>
                <p className="mt-2 text-[1.05rem] leading-relaxed text-ink/80">
                  Ela gosta de olhar para o céu, ouvir músicas suaves e ficar no balanço. E, mais do que tudo, ama desenhar.
                </p>
              </Reveal>
              <Reveal delay={0.25} className="rounded-[28px] bg-white/75 p-6 ring-1 ring-navy/5 backdrop-blur sm:translate-y-8">
                <h3 className="text-2xl font-bold text-navy">Do jeitinho dela.</h3>
                <p className="mt-2 text-[1.05rem] leading-relaxed text-ink/80">
                  Lulu tem seus próprios interesses, preferências e formas de se expressar. Quando o mundo fica barulhento demais, ela
                  precisa de calma — e tudo bem.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.3} className="mt-12 max-w-xl text-lg leading-relaxed text-ink/80">
              <p>
                A história não ensina que uma criança precisa mudar para caber no mundo. Ela mostra que existem{' '}
                <span className="hl font-bold text-navy">muitas maneiras de sentir, aprender, brincar e se comunicar</span>.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Espie o livro */}
        <div className="mt-24 sm:mt-32">
          <Reveal className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-display text-lg font-bold text-ink-blue">Espie o livro</p>
              <h3 className="text-3xl font-bold text-navy sm:text-4xl">Algumas páginas da Lulu</h3>
            </div>
            <p className="max-w-sm text-ink/70">Use as setas para folhear. Ilustrações e textos originais do livro.</p>
          </Reveal>
          <Reveal>
            <BookViewer />
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="font-display text-2xl font-bold text-navy">A história não termina na última página.</p>
          <Button href="#kit" arrow event="cta_primary_click" eventParams={{ location: 'after_story' }}>
            Descubra o kit da Lulu
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
