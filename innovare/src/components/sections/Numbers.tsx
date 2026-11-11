import { Counter } from "@/components/interactive/Counter";
import { SymbolMark } from "@/components/brand/SymbolMark";
import { Pending, fillValue } from "@/components/ui/Pending";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { fillHints, numbers, showNumbers } from "@/content/site";

/** Faixa de números. Só usa contadores com dados reais (`showNumbers` em site.ts). */
export function Numbers() {
  return (
    <section aria-label={numbers.a11yTitle} className="bg-deep grain arc-top overflow-hidden">
      <SymbolMark className="pointer-events-none absolute top-1/2 -right-[10%] w-[44vw] max-w-[620px] -translate-y-1/2 opacity-[0.06]" strokeWidth={3} />
      <div className="container-x pt-20 pb-[calc(var(--radius-arc)+64px)] md:pt-28">
        <RevealGroup as="ul" className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {showNumbers
            ? numbers.withData.map((n, i) => {
                const key = n.value.match(/^\{(\w+)\}$/)?.[1];
                const v = key ? fillValue(key) : n.value;
                return (
                  <RevealItem as="li" key={n.label} className={`px-0 lg:px-8 ${i > 0 ? "lg:border-l lg:border-gold/20" : "lg:pl-0"}`}>
                    <p className="font-display text-[clamp(2.8rem,5vw,4.4rem)] leading-none text-gold">
                      {v ? <Counter value={v} suffix={n.suffix} /> : <Pending hint={fillHints[key ?? ""] ?? ""} className="text-base" />}
                    </p>
                    <p className="mt-3 text-cream/70">{n.label}</p>
                  </RevealItem>
                );
              })
            : numbers.qualitative.map((n, i) => (
                <RevealItem as="li" key={n.strong} className={`px-0 lg:px-8 ${i > 0 ? "lg:border-l lg:border-gold/20" : "lg:pl-0"}`}>
                  <span aria-hidden="true" className="mb-6 block h-px w-10 bg-gold" />
                  <p className="font-display text-[clamp(1.6rem,2.3vw,2.1rem)] leading-tight text-cream">{n.strong}</p>
                  <p className="mt-2 text-cream/65">{n.text}</p>
                </RevealItem>
              ))}
        </RevealGroup>
      </div>
    </section>
  );
}
