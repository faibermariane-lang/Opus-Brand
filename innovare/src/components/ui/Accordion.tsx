"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { EASE } from "@/lib/motion";

export type AccordionItem = { q: string; a: React.ReactNode };

/** Acordeão acessível (botão + região), "+" que gira e altura animada. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const reduce = useReducedMotion();
  return (
    <div className="border-t border-green-900/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={i} className="border-b border-green-900/15">
            <h3 className="font-display text-[clamp(1.2rem,1.9vw,1.6rem)] leading-snug tracking-[-0.01em]">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-500 hover:text-olive md:py-7"
                data-cursor=""
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-sans text-xs tracking-[0.2em] text-olive tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.q}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative flex size-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-700 ease-[var(--ease-out)] ${isOpen ? "rotate-45 border-gold bg-gold" : "border-green-900/20 group-hover:border-gold"}`}
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0.2 : 0.75, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="lead max-w-2xl pb-8 pl-0 text-green-900/75 md:pl-[3.25rem]">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
