import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Info } from 'lucide-react';
import { kitItems, type KitItem } from '../../content/content';
import { Img } from '../ui/Img';
import { Decor } from '../ui/Decor';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { track } from '../../lib/analytics';

/* --------------------------------------------------------------
 * Composições visuais de cada recurso.
 * Usam apenas ilustrações originais do livro. Quando houver fotos
 * reais do material, preencha `photo` em content.ts.
 * -------------------------------------------------------------- */

function Frame({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="relative flex-1">{children}</div>
      <figcaption className="mt-4 flex items-start gap-2 text-sm font-semibold text-ink/60">
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {caption}
      </figcaption>
    </figure>
  );
}

const paper = 'overflow-hidden rounded-[18px] bg-white shadow-[0_30px_50px_-28px_rgb(43_38_51/0.55)] ring-1 ring-black/5';

function KitVisual({ item }: { item: KitItem }) {
  if (item.photo) {
    return (
      <Frame caption={`Foto do material: ${item.title}.`}>
        <Img asset={item.photo} alt={item.title} className={`${paper} h-full w-full object-cover`} sizes="(min-width:1024px) 640px, 92vw" />
      </Frame>
    );
  }
  switch (item.id) {
    case 'calendario':
      return (
        <Frame caption="Atividade “Meu Calendário da Rotina”, presente no livro. Fotos do calendário do kit em breve.">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
            <div className={`${paper} absolute inset-[6%_10%_4%_4%] -rotate-2`}>
              <Img
                asset="assets/illustrations/p16-atividades-rotina-emocoes"
                alt="Página de atividade do livro: quadro 'Meu Calendário da Rotina' com colunas Manhã, Tarde e Noite."
                sizes="(min-width:1024px) 900px, 160vw"
                className="h-full w-[205%] max-w-none object-cover object-left"
              />
            </div>
            <Decor asset="assets/decorative/sparkle" motion="twinkle" className="top-[0%] right-[6%] w-12" rotate={8} />
            <Decor asset="assets/decorative/sparkle-b" motion="twinkle" delay={1} className="top-[30%] right-[1%] w-8" />
            <Decor asset="assets/decorative/sparkle" motion="twinkle" delay={2} className="right-[12%] bottom-[2%] w-10" rotate={-14} />
          </div>
        </Frame>
      );
    case 'caderno':
      return (
        <Frame caption="Páginas de atividades do universo da Lulu: “Desenhe o Mundo da Lulu” e “Minha Lista de Conforto”.">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
            <div className={`${paper} absolute inset-[2%_2%_26%_14%] rotate-3`}>
              <Img
                asset="assets/illustrations/p16-atividades-rotina-emocoes"
                alt=""
                sizes="(min-width:1024px) 560px, 92vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className={`${paper} absolute inset-[22%_12%_2%_0%] -rotate-2`}>
              <Img
                asset="assets/illustrations/p15-atividades-desenho-conforto"
                alt="Página de atividades do livro: espaço para desenhar o mundo da Lulu e lista de conforto com som, cheiro, lugar, objeto e pessoa que acalma."
                sizes="(min-width:1024px) 560px, 92vw"
                className="h-full w-full object-cover"
              />
            </div>
            <Decor asset="assets/decorative/heart-pair-b" className="right-[2%] bottom-[6%] w-14" rotate={8} />
          </div>
        </Frame>
      );
    case 'interacao':
      return (
        <Frame caption="Representação ilustrativa com a Lulu. Fotos do livro de interação em breve.">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
            <div aria-hidden="true" className="absolute inset-[10%_14%_0_14%] rounded-t-full bg-[#b8ccbf]" />
            <Img
              asset="assets/lulu/lulu-happy-arms"
              alt="Lulu sorrindo com os braços abertos."
              sizes="(min-width:1024px) 420px, 70vw"
              className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2"
            />
            <span aria-hidden="true" className="absolute top-[4%] left-[0%] flex h-16 w-24 animate-float items-center justify-center gap-1.5 rounded-[50%] bg-white shadow-lg">
              <i className="size-2.5 rounded-full bg-forest" />
              <i className="size-2.5 rounded-full bg-forest" />
              <i className="size-2.5 rounded-full bg-forest" />
            </span>
            <span aria-hidden="true" className="absolute top-[14%] right-[0%] flex h-16 w-24 animate-float items-center justify-center rounded-[50%] bg-white text-2xl text-bow shadow-lg [animation-delay:1.4s]">
              ♥
            </span>
          </div>
        </Frame>
      );
    case 'comunicacao':
      return (
        <Frame caption="Cena do livro: a professora mostra, com calma, um cartão visual para a Lulu. Fotos dos cartões do kit em breve.">
          <div className={`${paper} relative mx-auto aspect-[1191/652] w-full max-w-[620px]`}>
            <Img
              asset="assets/illustrations/p10-cartao-da-professora"
              alt="Ilustração do livro: a mão da professora segura um cartão escrito 'Vamos sair um pouco?'. Texto: 'A professora viu Lulu. Pegou um cartão e mostrou devagar. Lulu respirou fundo. Ela sabia que podia confiar.'"
              sizes="(min-width:1024px) 1100px, 180vw"
              className="h-full w-full object-cover"
            />
          </div>
        </Frame>
      );
    case 'emocoes': {
      const faces = [
        { a: 'assets/lulu/lulu-happy-arms' as const, bg: '#c8d7cd', r: -12, x: '-146%' },
        { a: 'assets/lulu/lulu-worried' as const, bg: '#f9e7f3', r: -4, x: '-84%' },
        { a: 'assets/lulu/lulu-thinking' as const, bg: '#fff3e7', r: 4, x: '-16%' },
        { a: 'assets/lulu/lulu-calm-desk' as const, bg: '#cfedf3', r: 12, x: '46%' },
      ];
      return (
        <Frame caption="Composição ilustrativa com expressões da Lulu presentes no livro. Fotos das cartas em breve.">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
            {faces.map((f, i) => (
              <motion.div
                key={f.a}
                initial={{ opacity: 0, rotate: 0, x: '-50%', y: 20 }}
                animate={{ opacity: 1, rotate: f.r, x: f.x, y: i === 1 || i === 2 ? -10 : 10 }}
                transition={{ duration: 0.8, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[12%] left-1/2 aspect-[3/4] w-[32%] origin-bottom overflow-hidden rounded-[18px] p-2 shadow-[0_24px_40px_-24px_rgb(43_38_51/0.6)] ring-4 ring-white"
                style={{ backgroundColor: f.bg }}
              >
                <Img asset={f.a} alt="" sizes="240px" className="h-full w-full object-cover object-top" />
              </motion.div>
            ))}
          </div>
        </Frame>
      );
    }
    default:
      return null;
  }
}

export function KitSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = kitItems[active];

  const select = (i: number) => {
    setActive(i);
    track('kit_item_explore', { item: kitItems[i].id, position: i + 1 });
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let n = active;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (active + 1) % kitItems.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (active - 1 + kitItems.length) % kitItems.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = kitItems.length - 1;
    select(n);
    tabs.current[n]?.focus();
  };

  return (
    <section id="kit" aria-labelledby="kit-title" className="grain relative isolate overflow-hidden bg-blush-50 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute top-0 right-0 -z-10 h-[70%] w-[60%] rounded-bl-[200px] bg-blush-100" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="kit-title"
          eyebrow="O kit de recursos visuais"
          title={
            <>
              Cinco recursos para levar a Lulu <span className="text-magenta">para o dia a dia</span>
            </>
          }
          intro="Cada material foi pensado para um momento diferente: organizar a rotina, criar, conversar, se comunicar e falar sobre sentimentos. Escolha um recurso para conhecer."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          {/* seletor */}
          <Reveal className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div
              role="tablist"
              aria-label="Recursos do kit"
              aria-orientation="vertical"
              onKeyDown={onKey}
              className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {kitItems.map((k, i) => {
                const sel = i === active;
                return (
                  <button
                    key={k.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${k.id}`}
                    aria-selected={sel}
                    aria-controls="kit-panel"
                    tabIndex={sel ? 0 : -1}
                    onClick={() => select(i)}
                    className={`group relative flex shrink-0 snap-start items-center gap-4 rounded-[24px] px-5 py-4 text-left transition-all duration-500 ease-(--ease-soft) lg:px-6 lg:py-5 ${
                      sel ? 'bg-white shadow-[0_20px_40px_-26px_rgb(110_42_97/0.55)] ring-2' : 'bg-white/45 ring-1 ring-black/5 hover:bg-white/80'
                    }`}
                    style={sel ? { ['--tw-ring-color' as string]: `${k.color}40` } : undefined}
                  >
                    <span
                      className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold transition-colors duration-500"
                      style={{ backgroundColor: sel ? k.color : k.soft, color: sel ? 'white' : k.color }}
                    >
                      {k.number}
                    </span>
                    <span className="max-w-[13rem] font-display text-lg leading-tight font-bold text-ink lg:max-w-none lg:text-xl">
                      {k.title}
                    </span>
                    {sel && !reduce && (
                      <motion.span
                        layoutId="kit-indicator"
                        aria-hidden="true"
                        className="absolute top-1/2 right-5 hidden size-2.5 -translate-y-1/2 rounded-full lg:block"
                        style={{ backgroundColor: k.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* palco */}
          <Reveal delay={0.1} className="min-w-0">
            <div
              id="kit-panel"
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              tabIndex={0}
              className="relative overflow-hidden rounded-[36px] p-6 transition-colors duration-700 sm:p-10"
              style={{ backgroundColor: item.soft }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-8"
                >
                  <KitVisual item={item} />
                  <div>
                    <p className="font-display text-sm font-extrabold tracking-[0.2em] uppercase" style={{ color: item.color }}>
                      Recurso {item.number} de 05
                    </p>
                    <h3 className="mt-2 text-3xl leading-tight font-bold sm:text-4xl" style={{ color: item.color }}>
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink/80">{item.summary}</p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3 font-semibold text-ink/85">
                          <span
                            className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: item.color }}
                          >
                            <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-3 text-center">
          <Button href="#oferta" size="lg" arrow event="cta_primary_click" eventParams={{ location: 'after_kit' }}>
            Quero conhecer o kit da Lulu
          </Button>
          <p className="text-sm font-semibold text-ink/60">Veja tudo o que acompanha o livro.</p>
        </Reveal>
      </div>
    </section>
  );
}
