import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { pillars } from "@/content/site";

/** Faixa de pilares logo abaixo do hero. */
export function Pillars() {
  return (
    <section id="pilares" aria-label="Pilares" className="bg-green-900 text-cream">
      <div className="container-x">
        <div className="gold-hairline opacity-40" />
        <RevealGroup as="ul" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <RevealItem
              as="li"
              key={p.title}
              className={`flex items-center gap-5 py-8 lg:justify-center lg:py-12 ${i > 0 ? "border-t border-gold/20 sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-gold/20 sm:pl-8 lg:pl-0" : ""} ${i === 2 ? "sm:border-t sm:border-gold/20 lg:border-t-0 lg:border-l" : ""} ${i === 3 ? "sm:border-t lg:border-t-0" : ""}`}
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold">
                <Icon name={p.icon} className="size-[22px]" />
              </span>
              <span>
                <span className="font-display block text-[1.2rem] leading-tight">{p.title}</span>
                <span className="mt-1 block text-sm text-cream/60">{p.text}</span>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
