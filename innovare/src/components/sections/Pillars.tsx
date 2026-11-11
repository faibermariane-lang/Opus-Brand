"use client";
import { useState } from "react";
import { Coin3D } from "@/components/brand/Coin3D";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { pillars } from "@/content/site";

/** Régua de serviços em moedas 3D: inclinam com o ponteiro e viram mostrando o símbolo. */
export function Pillars() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="pilares" aria-label="Pilares" className="bg-green-900 text-cream">
      <div className="container-x py-12 md:py-16">
        <RevealGroup as="ul" className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <RevealItem as="li" key={p.title}>
              <div
                className="group flex cursor-default flex-col items-center text-center"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onClick={() => setActive((a) => (a === i ? null : i))}
                data-cursor=""
              >
                <div className="relative">
                  <span aria-hidden="true" className={`absolute -bottom-3 left-1/2 h-3 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/40 blur-md transition-all duration-700 ${active === i ? "w-1/2 opacity-60" : "opacity-90"}`} />
                  <div className={`transition-transform duration-700 ease-[var(--ease-out)] ${active === i ? "-translate-y-2" : ""}`}>
                    <Coin3D icon={p.icon} flipped={active === i} className="relative size-24 md:size-28" />
                  </div>
                </div>
                <p className={`font-display mt-6 text-[1.25rem] leading-tight transition-colors duration-500 ${active === i ? "text-gold" : ""}`}>{p.title}</p>
                <p className="mt-1 text-sm text-cream/60">{p.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
