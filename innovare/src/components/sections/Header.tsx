"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { SymbolMark } from "@/components/brand/SymbolMark";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { header, nav } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { EASE } from "@/lib/motion";

/** Header pílula flutuante: encolhe após 80px, scrollspy e menu mobile em tela cheia. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#inicio");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: seção cuja faixa cruza a linha de 35% da viewport.
  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-35% 0px -64% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menu mobile: trava a rolagem, Esc fecha, foco preso no painel.
  useEffect(() => {
    if (!open) return;
    const trigger = menuBtn.current;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a,button");
        const a = f[0];
        const z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <a href="#conteudo" className="sr-only-focusable fixed top-3 left-3 z-[80] rounded-full bg-gold px-5 py-3 text-sm font-medium text-green-900">
        {header.a11y.skip}
      </a>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-5 md:pt-5">
        <div
          className={`pointer-events-auto flex w-full max-w-[1240px] items-center justify-between gap-4 rounded-full border border-gold/35 bg-cream-soft/80 pr-2 pl-5 backdrop-blur-xl transition-[padding,box-shadow,max-width,background-color] duration-700 ease-[var(--ease-out)] md:pl-7 ${
            scrolled ? "py-1.5 shadow-[0_14px_40px_-22px_rgb(9_40_28/0.45)] lg:max-w-[1120px]" : "py-2.5"
          }`}
        >
          <a href="#inicio" aria-label={header.a11y.home} className="shrink-0" data-cursor="">
            <Logo variant="wordmark" className={`w-auto transition-[height] duration-700 ease-[var(--ease-out)] ${scrolled ? "h-[22px]" : "h-[26px]"}`} />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative block rounded-full px-3 py-2 text-[0.84rem] transition-colors duration-500 xl:px-4 ${
                        isActive ? "text-green-900" : "text-green-900/65 hover:text-green-900"
                      }`}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full border border-gold/50 bg-gold/15"
                          transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
                        />
                      ) : null}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Button href={whatsappUrl()} external variant="gold" magnetic className="!min-h-11 !px-5 !py-2.5 !text-[0.86rem]">
                {header.cta}
              </Button>
            </span>
            <button
              ref={menuBtn}
              type="button"
              className="flex min-h-11 items-center gap-2 rounded-full border border-green-900/15 px-4 text-sm font-medium text-green-900 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? header.a11y.closeMenu : header.a11y.openMenu}
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" className="size-5" />
              <span>{header.mobileMenuTitle}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={header.mobileMenuTitle}
            className="bg-deep grain fixed inset-0 z-[60] flex flex-col overflow-y-auto lg:hidden"
            initial={{ opacity: 0, clipPath: reduce ? "circle(150% at 100% 0%)" : "circle(0% at 92% 4%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 92% 4%)" }}
            exit={{ opacity: 0, clipPath: reduce ? "circle(150% at 100% 0%)" : "circle(0% at 92% 4%)" }}
            transition={{ duration: reduce ? 0.2 : 0.9, ease: EASE }}
          >
            <SymbolMark className="pointer-events-none absolute -right-[30%] -bottom-[18%] w-[110%] opacity-[0.07]" strokeWidth={3} />
            <div className="flex items-center justify-between px-6 pt-6">
              <p className="eyebrow text-gold">{header.mobileMenuTitle}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={header.a11y.closeMenu}
                className="flex size-12 items-center justify-center rounded-full border border-cream/25 text-cream"
              >
                <Icon name="close" className="size-5" />
              </button>
            </div>
            <nav aria-label="Menu" className="flex flex-1 flex-col justify-center px-6 py-10">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display block py-1.5 text-[clamp(2.1rem,9vw,3.2rem)] leading-[1.1] tracking-[-0.02em] text-cream transition-colors hover:text-gold"
                      initial={reduce ? { opacity: 0 } : { y: "110%" }}
                      animate={reduce ? { opacity: 1 } : { y: 0 }}
                      transition={{ duration: 0.9, ease: EASE, delay: reduce ? 0 : 0.25 + i * 0.06 }}
                    >
                      <span className="mr-4 align-middle font-sans text-xs tracking-[0.2em] text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-6 px-6 pb-8">
              <Button href={whatsappUrl()} external variant="gold" className="w-full">
                {header.cta}
              </Button>
              <p className="eyebrow text-center text-cream/60">{header.mobileMenuFooter}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
