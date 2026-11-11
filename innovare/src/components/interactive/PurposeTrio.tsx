"use client";
import { useState } from "react";
import { SymbolMark } from "@/components/brand/SymbolMark";

type Item = { title: string; text: string };

/**
 * Propósito, missão e promessa: ao passar o mouse, focar ou tocar, o bloco se expande
 * em verde-escuro com o símbolo dourado; os demais recuam.
 */
export function PurposeTrio({ items }: { items: Item[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <ul className="flex flex-col gap-3 md:h-[300px] md:flex-row" onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}>
      {items.map((b, i) => {
        const on = active === i;
        const dim = active !== null && !on;
        return (
          <li
            key={b.title}
            tabIndex={0}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(on ? null : i)}
            data-cursor=""
            className={`group relative flex min-w-0 cursor-default flex-col justify-end overflow-hidden rounded-[var(--radius-card)] border p-7 transition-[flex-grow,background-color,border-color,opacity,color] duration-[900ms] ease-[var(--ease-out)] md:basis-0 md:p-9 ${
              on ? "border-green-900 bg-green-900 text-cream" : "border-gold/40 bg-cream-soft text-green-900"
            } ${dim ? "opacity-60" : ""}`}
            style={{ flexGrow: on ? 1.8 : 1 }}
          >
            <SymbolMark
              className={`absolute -top-10 -right-10 size-44 transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-out)] ${on ? "rotate-45 opacity-40" : "rotate-0 opacity-15"}`}
              strokeWidth={5}
            />
            <span aria-hidden="true" className="font-display absolute top-7 left-7 text-sm tracking-[0.2em] text-gold md:top-9 md:left-9">
              0{i + 1}
            </span>
            <p className={`font-display text-[clamp(1.6rem,2.4vw,2.2rem)] italic transition-colors duration-700 ${on ? "text-gold" : "text-olive"}`}>{b.title}</p>
            <p className={`mt-3 max-w-sm text-[1.05rem] leading-relaxed transition-colors duration-700 ${on ? "text-cream/85" : "text-green-900/75"}`}>{b.text}</p>
            <span aria-hidden="true" className={`mt-6 block h-px origin-left bg-gold transition-transform duration-[1100ms] ease-[var(--ease-out)] ${on ? "scale-x-100" : "scale-x-0"}`} />
          </li>
        );
      })}
    </ul>
  );
}
