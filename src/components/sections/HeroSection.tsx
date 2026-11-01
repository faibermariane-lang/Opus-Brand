import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Img } from '../ui/Img';
import { Decor } from '../ui/Decor';
import { Button } from '../ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();
  // Parallax discreto com o mouse (desativado em toque e em movimento reduzido)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const farX = useTransform(sx, (v) => v * 18);
  const farY = useTransform(sy, (v) => v * 12);
  const nearX = useTransform(sx, (v) => v * -10);
  const nearY = useTransform(sy, (v) => v * -6);

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, mx, my]);

  const fadeUp = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden bg-blush-100 pt-[96px] lg:min-h-[100svh] lg:pt-[72px]"
    >
      {/* luz suave — a metáfora central do livro */}
      <div
        aria-hidden="true"
        className="absolute top-[38%] right-[-10%] -z-10 size-[min(110vw,980px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.95)_0%,rgb(255_244_214/0.55)_32%,rgb(249_231_243/0)_68%)] lg:right-[-6%]"
      />

      {/* camada decorativa distante */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={{ x: farX, y: farY }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.5 }}>
          <Decor asset="assets/decorative/cloud-stroke" motion="float-slow" className="top-[14%] left-[46%] hidden w-[300px] opacity-90 lg:block" />
          <Decor asset="assets/decorative/cloud-stroke" motion="float-slow" delay={2} rotate={-6} className="top-[9%] right-[-40px] w-[200px] opacity-80 lg:w-[360px]" />
          <Decor asset="assets/decorative/cloud-stroke" motion="float-slow" delay={1} rotate={4} className="bottom-[12%] left-[-60px] hidden w-[280px] opacity-70 lg:block" />
        </motion.div>
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.02fr_1fr] lg:gap-4 lg:px-8">
        {/* Texto */}
        <div className="relative z-10 pt-6 pb-2 lg:pt-0 lg:pb-24">
          <motion.p
            {...fadeUp(0.1)}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-extrabold text-magenta-600 ring-1 ring-magenta/15 backdrop-blur"
          >
            <span aria-hidden="true">✦</span> Livro infantil + kit de recursos visuais
          </motion.p>
          <motion.h1
            id="hero-title"
            {...fadeUp(0.22)}
            className="text-[2.6rem] leading-[1.02] font-extrabold text-ink sm:text-6xl lg:text-[4.4rem] xl:text-[4.9rem]"
          >
            Cada criança tem uma maneira única de{' '}
            <span className="relative inline-block text-magenta">
              <span aria-hidden="true" className="absolute inset-x-[-6%] inset-y-[8%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(255_236_170/0.95),rgb(255_236_170/0))]" />
              iluminar
            </span>{' '}
            o mundo.
          </motion.h1>
          <motion.p {...fadeUp(0.38)} className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
            Conheça <strong className="font-extrabold text-magenta-600">Lulu</strong>, uma história sobre diferenças, descobertas e a
            beleza de enxergar o mundo por outras perspectivas.
          </motion.p>
          <motion.div {...fadeUp(0.52)} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#historia" size="lg" arrow event="cta_primary_click" eventParams={{ location: 'hero' }}>
              Conheça a Lulu
            </Button>
            <Button href="#kit" size="lg" variant="secondary" event="cta_primary_click" eventParams={{ location: 'hero_secondary' }}>
              Descubra o kit
            </Button>
          </motion.div>
          <motion.a
            href="#historia"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-14 hidden items-center gap-3 rounded-full text-sm font-extrabold text-magenta-600 lg:inline-flex"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/80 ring-1 ring-magenta/15">
              <ChevronDown aria-hidden="true" className={`size-5 ${reduce ? '' : 'animate-bounce'}`} strokeWidth={2.6} />
            </span>
            Role para entrar no universo da Lulu
          </motion.a>
        </div>

        {/* Lulu — protagonista */}
        <div className="relative mx-auto h-[min(108vw,500px)] w-full max-w-[560px] self-end sm:h-[560px] lg:h-[calc(100svh-72px)] lg:max-h-[860px] lg:max-w-none">
          <motion.div
            className="absolute inset-x-0 bottom-0 mx-auto w-[92%] sm:w-[88%] lg:w-[min(100%,700px)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 1.3, delay: 0.15, ease }}
          >
            <Img
              asset="assets/lulu/lulu-cover-smile"
              priority
              sizes="(min-width: 1024px) 700px, 92vw"
              alt="Lulu, a personagem do livro: menina de cabelos longos castanho-avermelhados, grandes olhos verdes, laço vermelho, camisa branca e gravata vermelha, sorrindo e olhando para cima."
              className="h-auto w-full drop-shadow-[0_30px_40px_rgb(110_42_97/0.18)]"
            />
          </motion.div>

          {/* camada decorativa próxima */}
          <motion.div aria-hidden="true" className="absolute inset-0" style={{ x: nearX, y: nearY }}>
            {[
              { a: 'assets/decorative/heart-pair-a' as const, c: 'top-[16%] left-[4%] w-[46px] sm:w-[62px] lg:top-[22%]', d: 0.9, r: -8 },
              { a: 'assets/decorative/heart-pair-b' as const, c: 'top-[34%] right-[2%] w-[58px] sm:w-[78px] lg:top-[40%]', d: 1.1, r: 6 },
              { a: 'assets/decorative/sparkle' as const, c: 'top-[8%] right-[22%] w-[22px] sm:w-[28px] lg:top-[16%]', d: 1.3, r: 10 },
              { a: 'assets/decorative/sparkle-b' as const, c: 'top-[44%] left-[0%] w-[18px] sm:w-[24px]', d: 1.5, r: -12 },
            ].map((el, i) => (
              <motion.div
                key={el.a}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: el.d, ease }}
              >
                <Decor asset={el.a} rotate={el.r} delay={i * 0.8} motion={el.a.includes('sparkle') ? 'twinkle' : 'float'} className={el.c} />
              </motion.div>
            ))}
          </motion.div>

          {/* dedicatória original do livro */}
          <motion.figure
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.9, delay: 1.2, ease }}
            className="absolute top-[4%] left-[2%] hidden max-w-[230px] rounded-[28px] rounded-bl-md bg-white/90 px-5 py-4 shadow-[0_16px_40px_-20px_rgb(110_42_97/0.5)] backdrop-blur sm:block lg:top-[13%] lg:left-[-6%]"
          >
            <blockquote className="font-display text-lg leading-snug font-bold text-magenta-600">
              “Para todas as crianças que brilham do seu <em>jeitinho único</em>.”
            </blockquote>
            <figcaption className="mt-1.5 text-xs font-bold tracking-wide text-ink/55 uppercase">Dedicatória do livro</figcaption>
          </motion.figure>
        </div>
      </div>

    </section>
  );
}
