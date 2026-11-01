import { motion, useReducedMotion } from 'motion/react';
import { BookOpen, CalendarCheck, MessageCircleHeart, NotebookPen, Smile, IdCard } from 'lucide-react';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { Decor } from '../ui/Decor';
import { Button } from '../ui/Button';

const ORBIT = [
  { label: 'Calendário visual', Icon: CalendarCheck, pos: 'top-[2%] left-[-4%]', bg: '#cfedf3', fg: '#213363' },
  { label: 'Caderno de atividades', Icon: NotebookPen, pos: 'top-[6%] right-[-6%]', bg: '#f9e7f3', fg: '#a3418f' },
  { label: 'Livro de interação', Icon: BookOpen, pos: 'top-[46%] right-[-10%]', bg: '#c8d7cd', fg: '#213f2d' },
  { label: 'Cartões de comunicação', Icon: IdCard, pos: 'bottom-[4%] right-[4%]', bg: '#e4edfb', fg: '#3f577b' },
  { label: 'Cartas das emoções', Icon: Smile, pos: 'bottom-[12%] left-[-8%]', bg: '#f2e3f6', fg: '#874599' },
];

const MOMENTS = [
  'Na leitura compartilhada',
  'Na organização da rotina',
  'Nas conversas sobre sentimentos',
  'Na comunicação do dia a dia',
  'Em casa e na escola',
];

export function BookSection() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="experiencia-title" className="relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32">
      {/* brilho / estrelas suaves */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_75%_45%,rgb(135_129_183/0.55),transparent_70%)]" />
      <Decor asset="assets/decorative/sparkle" motion="twinkle" className="top-[7%] left-[44%] w-6 opacity-80" />
      <Decor asset="assets/decorative/sparkle-b" motion="twinkle" delay={1.5} className="top-[70%] left-[46%] w-5 opacity-70" />
      <Decor asset="assets/decorative/sparkle" motion="twinkle" delay={2.6} rotate={20} className="right-[6%] bottom-[10%] w-5 opacity-70" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-extrabold tracking-wide text-teal-100 ring-1 ring-white/15">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-current" /> Muito mais que uma história
            </p>
            <h2 id="experiencia-title" className="text-[2.15rem] leading-[1.05] font-bold sm:text-5xl lg:text-[3.6rem]">
              Uma história que continua <span className="text-swirl-yellow">muito além</span> da leitura.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              O livro é acompanhado por recursos visuais que ampliam as possibilidades de interação entre crianças e adultos. Uma
              experiência pensada para diferentes momentos do cotidiano.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 flex flex-wrap gap-3" aria-label="Momentos do cotidiano">
              {MOMENTS.map((m) => (
                <li key={m} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 font-bold text-white/90 ring-1 ring-white/15">
                  <MessageCircleHeart aria-hidden="true" className="size-4 text-heart" strokeWidth={2.6} />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <Button href="#kit" variant="light" arrow event="cta_primary_click" eventParams={{ location: 'experience_intro' }}>
              Conheça cada recurso
            </Button>
          </Reveal>
        </div>

        {/* livro no centro, recursos ao redor */}
        <Reveal className="relative mx-auto w-full max-w-[560px] px-6 py-10 sm:px-14 sm:py-16">
          <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-white/25">
            <circle cx="200" cy="200" r="170" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 10" strokeLinecap="round" />
            <circle cx="200" cy="200" r="118" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 9" strokeLinecap="round" />
          </svg>
          <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(255_243_200/0.6),transparent_70%)] blur-2xl" />
          <motion.div
            className="relative overflow-hidden rounded-[30px] shadow-[0_40px_70px_-30px_rgb(0_0_0/0.6)] ring-8 ring-white/10"
            initial={reduce ? false : { rotate: -4, scale: 0.94 }}
            whileInView={{ rotate: -2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Img
              asset="assets/products/mockup-livro-capa"
              sizes="(min-width: 1024px) 460px, 80vw"
              alt="Mockup do livro 'Lulu — a luz que brilha diferente' com a capa ilustrada da personagem."
              className="aspect-[4/3.4] h-auto w-full scale-[1.35] object-cover"
            />
          </motion.div>
          <ul className="contents" aria-label="Recursos que acompanham o livro">
            {ORBIT.map(({ label, Icon, pos, bg, fg }, i) => (
              <motion.li
                key={label}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute ${pos} hidden sm:block`}
              >
                <span
                  className="inline-flex animate-float items-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold whitespace-nowrap shadow-[0_14px_28px_-14px_rgb(0_0_0/0.6)]"
                  style={{ backgroundColor: bg, color: fg, animationDelay: `${i * 0.9}s` }}
                >
                  <Icon aria-hidden="true" className="size-4" strokeWidth={2.6} /> {label}
                </span>
              </motion.li>
            ))}
          </ul>
          {/* mobile: lista simples */}
          <ul className="relative mt-8 grid grid-cols-1 gap-2 sm:hidden" aria-label="Recursos que acompanham o livro">
            {ORBIT.map(({ label, Icon, bg, fg }) => (
              <li key={label} className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold" style={{ backgroundColor: bg, color: fg }}>
                <Icon aria-hidden="true" className="size-4" strokeWidth={2.6} /> {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
