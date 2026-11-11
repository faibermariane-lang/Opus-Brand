import { SymbolMark } from "@/components/brand/SymbolMark";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tenders } from "@/content/site";

/** Licitações: destaque em verde-escuro, entregas em cartões dourados e faixa de CTA do edital. */
export function Tenders() {
  return (
    <section id="licitacoes" aria-labelledby="licitacoes-title" className="bg-deep grain arc-top overflow-hidden">
      <div className="container-x section-y">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading eyebrow={tenders.eyebrow} title={tenders.title} id="licitacoes-title" tone="light" className="lg:col-span-7" titleClassName="max-w-[22ch] text-cream" />
          <div className="space-y-4 lg:col-span-5">
            {tenders.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className="text-[1.02rem] leading-relaxed text-cream/75">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {tenders.deliverables.map((d, i) => (
            <RevealItem as="li" key={d.text}>
              <div className="gold-card group relative flex min-h-36 flex-col justify-between gap-6 sm:aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] p-6 text-green-900 transition-[transform,box-shadow] duration-700 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] md:p-7">
                <span aria-hidden="true" className="shine" />
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-green-900 text-gold transition-transform duration-700 ease-[var(--ease-out)] group-hover:rotate-[-12deg] group-hover:scale-110">
                    <Icon name={d.icon} className="size-[22px]" />
                  </span>
                  <span aria-hidden="true" className="font-display text-sm tracking-[0.2em] text-green-900/60">0{i + 1}</span>
                </div>
                <p className="font-display text-[1.3rem] leading-snug">{d.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-6" delay={0.1}>
          <aside className="relative flex flex-col gap-6 overflow-hidden rounded-[var(--radius-card)] bg-olive p-8 text-cream md:flex-row md:items-center md:justify-between md:p-10">
            <SymbolMark className="absolute -top-24 -left-16 size-72 opacity-15" stroke="var(--color-cream)" strokeWidth={4} />
            <div className="relative flex items-center gap-5">
              <span className="hidden size-14 shrink-0 items-center justify-center rounded-full border border-gold-light/60 text-gold-light sm:flex">
                <Icon name="seal" className="size-7" />
              </span>
              <p className="font-display text-[clamp(1.45rem,2.2vw,2rem)] leading-tight">{tenders.card.text}</p>
            </div>
            <Button href="#contato" subject="licitacoes" variant="cream" icon="arrow" className="relative shrink-0" magnetic>
              {tenders.card.cta}
            </Button>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
