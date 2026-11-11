"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { diagnostic, ufs } from "@/content/site";
import { EVENTS } from "@/lib/events";
import { EASE } from "@/lib/motion";
import { interpolate, whatsappUrl } from "@/lib/whatsapp";

type Answers = { phase: string; size: string; uf: string; channel: string };
const EMPTY: Answers = { phase: "", size: "", uf: "", channel: "" };

/**
 * Diagnóstico em 4 perguntas (uma por tela). Ao final monta a mensagem de WhatsApp
 * com as respostas. Acessível: fieldset/legend, rádios nativos, foco gerenciado e
 * anúncio de progresso.
 */
export function Diagnostic() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const legendRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const base = useId();
  const total = diagnostic.questions.length;
  const done = step >= total;

  // UF pré-selecionada a partir do mapa
  useEffect(() => {
    const on = (e: Event) => {
      const uf = (e as CustomEvent<string>).detail;
      if (uf) setAnswers((a) => ({ ...a, uf }));
    };
    window.addEventListener(EVENTS.uf, on);
    return () => window.removeEventListener(EVENTS.uf, on);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    legendRef.current?.focus({ preventScroll: true });
  }, [step]);

  const q = diagnostic.questions[Math.min(step, total - 1)];
  const key = q.id as keyof Answers;
  const value = answers[key];

  const go = (d: number) => {
    setDir(d);
    setStep((s) => Math.max(0, Math.min(total, s + d)));
  };

  const service = diagnostic.questions[0].options.find((o) => o.value === answers.phase)?.service ?? "";
  const message = interpolate(diagnostic.whatsappTemplate, { ...answers });

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -40 }),
  };

  return (
    <div className="glass relative overflow-hidden rounded-[32px] p-6 sm:p-10 md:p-12">
      {/* barra de progresso */}
      <div className="mb-10 flex items-center gap-5">
        <div
          className="relative h-px flex-1 bg-cream/15"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={Math.min(step + (done ? 0 : 1), total)}
          aria-label={interpolate(diagnostic.progress, { n: String(Math.min(step + 1, total)) })}
        >
          <motion.span
            className="absolute inset-y-0 left-0 block bg-gold"
            style={{ height: 2, top: -0.5 }}
            animate={{ width: `${(Math.min(step + (done ? 0 : 1), total) / total) * 100}%` }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </div>
        <p className="eyebrow shrink-0 text-cream/60" aria-live="polite">
          {interpolate(diagnostic.progress, { n: String(Math.min(step + 1, total)) })}
        </p>
      </div>

      <div className="relative min-h-[380px] sm:min-h-[330px]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          {!done ? (
            <motion.fieldset
              key={step}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: EASE }}
            >
              <legend className="contents">
                <h3 ref={legendRef} tabIndex={-1} className="font-display mb-8 text-[clamp(1.6rem,2.6vw,2.3rem)] leading-tight text-cream outline-none">
                  {q.label}
                </h3>
              </legend>

              {q.id === "uf" ? (
                <div className="max-w-sm">
                  <label htmlFor={`${base}-uf`} className="sr-only">{q.label}</label>
                  <select
                    id={`${base}-uf`}
                    value={answers.uf}
                    onChange={(e) => setAnswers((a) => ({ ...a, uf: e.target.value }))}
                    className="min-h-14 w-full rounded-full border border-cream/25 bg-green-900 px-6 text-base text-cream focus:border-gold"
                  >
                    <option value="">{diagnostic.ufPlaceholder}</option>
                    {ufs.map(([uf, name]) => (
                      <option key={uf} value={uf}>
                        {name} ({uf})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {q.options.map((o) => {
                    const id = `${base}-${q.id}-${o.value}`;
                    const checked = value === o.value;
                    return (
                      <label
                        key={o.value}
                        htmlFor={id}
                        className={`group flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 transition-[background-color,border-color,color] duration-500 ease-[var(--ease-out)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                          checked ? "border-gold bg-gold/15 text-cream" : "border-cream/15 text-cream/80 hover:border-gold/60"
                        }`}
                      >
                        <input
                          id={id}
                          type="radio"
                          name={`${base}-${q.id}`}
                          value={o.value}
                          checked={checked}
                          onChange={() => setAnswers((a) => ({ ...a, [key]: o.value }))}
                          className="sr-only"
                        />
                        <span aria-hidden="true" className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${checked ? "border-gold" : "border-cream/35"}`}>
                          <span className={`size-2.5 rounded-full bg-gold transition-transform duration-500 ${checked ? "scale-100" : "scale-0"}`} />
                        </span>
                        <span className="text-[0.98rem] leading-snug">{o.value}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              <div className="mt-10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={step === 0}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm text-cream/70 transition-colors hover:text-gold disabled:invisible"
                >
                  <Icon name="arrow" className="size-4 rotate-180" />
                  {diagnostic.back}
                </button>
                <Button onClick={() => go(1)} disabled={!value} variant="gold" icon="arrow">
                  {diagnostic.next}
                </Button>
              </div>
            </motion.fieldset>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              <h3 ref={legendRef} tabIndex={-1} className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight text-cream outline-none">
                {diagnostic.result.title}
              </h3>
              <p className="lead mt-6 max-w-xl text-cream/75">
                {interpolate(diagnostic.result.text, { service })}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Button href={whatsappUrl(message)} external variant="gold" icon="whatsapp" magnetic>
                  {diagnostic.result.cta}
                </Button>
                <button type="button" onClick={() => go(-1)} className="inline-flex min-h-11 items-center gap-2 text-sm text-cream/70 hover:text-gold">
                  <Icon name="arrow" className="size-4 rotate-180" />
                  {diagnostic.back}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
