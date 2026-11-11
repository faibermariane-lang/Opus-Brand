"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Step = { title: string; text: string };

/**
 * Linha do tempo com scrub (GSAP + ScrollTrigger): a linha dourada se desenha com a
 * rolagem e cada passo acende ao ser alcançado. Horizontal em md+, vertical no mobile.
 */
export function Timeline({ steps, stepLabel }: { steps: Step[]; stepLabel: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [progressStep, setReached] = useState(-1);
  const reduce = useReducedMotion();
  const reached = reduce ? steps.length - 1 : progressStep;

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let kill: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { "--p": 0 },
          {
            "--p": 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              end: "bottom 50%",
              scrub: 0.9,
              onUpdate: (self) => {
                const n = steps.length - 1;
                setReached(self.progress <= 0.001 ? -1 : Math.min(n, Math.floor(self.progress * n + 0.08)));
              },
            },
          },
        );
      }, el);
      kill = () => ctx.revert();
    })();
    return () => {
      cancelled = true;
      kill?.();
    };
  }, [steps.length]);

  return (
    <ol ref={listRef} className="relative grid gap-12 pl-14 md:grid-cols-4 md:gap-8 md:pt-16 md:pl-0" style={{ "--p": 0 } as React.CSSProperties}>
      {/* trilho + linha (horizontal) */}
      <span aria-hidden="true" className="absolute top-[23px] right-[12%] left-[0] hidden h-px bg-cream/15 md:block" />
      <span aria-hidden="true" className="absolute top-[23px] right-[12%] left-[0] hidden h-px origin-left bg-gold md:block" style={{ transform: "scaleX(var(--p))" }} />
      {/* trilho + linha (vertical) */}
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[23px] w-px bg-cream/15 md:hidden" />
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[23px] w-px origin-top bg-gold md:hidden" style={{ transform: "scaleY(var(--p))" }} />

      {steps.map((s, i) => {
        const on = i <= reached;
        return (
          <li key={s.title} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-0 -left-14 flex size-12 items-center justify-center rounded-full border font-display text-lg transition-[background-color,border-color,color,box-shadow] duration-[900ms] ease-[var(--ease-out)] md:-top-16 md:left-0 ${
                on ? "border-gold bg-gold text-green-900 shadow-[0_0_0_8px_rgb(213_178_111/0.12)]" : "border-cream/25 bg-green-900 text-cream/60"
              }`}
            >
              {i + 1}
            </span>
            <div className={`transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)] md:pt-8 ${on ? "opacity-100" : "opacity-45 md:translate-y-2"}`}>
              <p className="eyebrow text-gold">
                {stepLabel} {i + 1}
              </p>
              <h3 className="h-card mt-3 text-cream">{s.title}</h3>
              <p className="mt-4 max-w-xs leading-relaxed text-cream/70">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
