import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

const NAV = [
  { href: '#historia', label: 'A história' },
  { href: '#universo', label: 'Universo' },
  { href: '#kit', label: 'O kit' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#faq', label: 'Dúvidas' },
];

function Wordmark() {
  return (
    <a href="#inicio" className="group flex items-baseline gap-2 rounded-lg" aria-label="Lulu — a luz que brilha diferente, voltar ao início">
      <span className="font-display text-[1.9rem] leading-none font-extrabold text-magenta transition-transform duration-500 group-hover:-rotate-3">
        Lulu
      </span>
      <span className="hidden font-display text-sm leading-tight font-semibold text-magenta-600/80 sm:block">
        a luz que brilha
        <br />
        diferente
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 font-bold text-white focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-blush-50/85 shadow-[0_8px_30px_-18px_rgb(110_42_97/0.35)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-heart via-magenta to-sky-stroke"
          style={{ scaleX: reduce ? scrollYProgress : progress }}
        />
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Wordmark />
          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="rounded-full px-4 py-2 font-bold text-ink/80 transition-colors hover:bg-white/70 hover:text-magenta-600"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Button href="#oferta" event="cta_primary_click" eventParams={{ location: 'header' }} className="hidden min-h-11! px-5! py-2! text-base! sm:inline-flex">
              Quero o kit
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-12 items-center justify-center rounded-full bg-white/80 text-magenta-600 ring-1 ring-magenta/20 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" strokeWidth={2.6} /> : <Menu className="size-6" strokeWidth={2.6} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-blush-100 lg:hidden"
          >
            <nav aria-label="Navegação do menu" className="px-6 pt-6 pb-10">
              <ul className="flex flex-col gap-1">
                {NAV.concat({ href: '#oferta', label: 'Oferta' }).map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <a
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3.5 font-display text-3xl font-bold text-ink hover:bg-white/70 hover:text-magenta-600"
                    >
                      {n.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  href="#oferta"
                  size="lg"
                  arrow
                  className="w-full"
                  event="cta_primary_click"
                  eventParams={{ location: 'mobile_menu' }}
                  onClick={() => setOpen(false)}
                >
                  Quero conhecer o kit
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
