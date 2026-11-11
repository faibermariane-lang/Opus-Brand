import { Timeline } from "@/components/interactive/Timeline";
import { SymbolMark } from "@/components/brand/SymbolMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="bg-deep grain arc-top overflow-hidden">
      <SymbolMark className="pointer-events-none absolute -top-[20%] -left-[22%] w-[60vw] max-w-[820px] opacity-[0.05]" strokeWidth={2.5} />
      <div className="container-x section-y">
        <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} id="como-title" tone="light" titleClassName="max-w-[16ch] text-cream" />
        <div className="mt-12 md:mt-16">
          <Timeline steps={howItWorks.steps} stepLabel={howItWorks.stepLabel} />
        </div>
        <Reveal className="mt-14 flex flex-col items-start gap-6 border-t border-cream/12 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-[clamp(1.35rem,2.2vw,1.9rem)] text-cream/90">{howItWorks.closing}</p>
          <Button href="#diagnostico" variant="gold" icon="arrow" magnetic>
            {howItWorks.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
