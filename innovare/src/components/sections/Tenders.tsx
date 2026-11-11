import { SymbolMark } from "@/components/brand/SymbolMark";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tenders } from "@/content/site";

/** Licitações: seção de destaque em verde-escuro com cartão lateral em oliva. */
export function Tenders() {
  return (
    <section id="licitacoes" aria-labelledby="licitacoes-title" className="bg-deep grain arc-top overflow-hidden">
      <div className="container-x section-y grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow={tenders.eyebrow} title={tenders.title} id="licitacoes-title" tone="light" titleClassName="max-w-[17ch] text-cream" />
          <div className="mt-8 max-w-2xl space-y-5">
            {tenders.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className="lead text-cream/75">{p}</p>
              </Reveal>
            ))}
          </div>
          <RevealGroup as="ul" className="mt-12 grid gap-3 sm:grid-cols-2">
            {tenders.deliverables.map((d) => (
              <RevealItem as="li" key={d.text} className="glass flex items-center gap-4 rounded-[22px] p-5 transition-colors duration-700 hover:border-gold/50">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon name={d.icon} className="size-5" />
                </span>
                <span className="text-[0.98rem] text-cream/90">{d.text}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={0.2}>
          <aside className="relative overflow-hidden rounded-[var(--radius-card)] bg-olive p-9 text-cream shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] md:p-11">
            <SymbolMark className="absolute -top-20 -right-20 size-64 opacity-20" stroke="var(--color-cream)" strokeWidth={4} />
            <Icon name="seal" className="relative size-9 text-gold-light" />
            <p className="font-display relative mt-10 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.15]">{tenders.card.text}</p>
            <Button href="#contato" subject="licitacoes" variant="cream" icon="arrow" className="relative mt-10 w-full sm:w-auto" magnetic>
              {tenders.card.cta}
            </Button>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
