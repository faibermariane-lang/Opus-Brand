import { Diagnostic } from "@/components/interactive/Diagnostic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { diagnostic } from "@/content/site";

export function DiagnosticSection() {
  return (
    <section id="diagnostico" aria-labelledby="diagnostico-title" className="bg-deep grain arc-top">
      <div className="container-x section-y grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={diagnostic.eyebrow} title={diagnostic.title} id="diagnostico-title" tone="light" titleClassName="max-w-[13ch] text-cream" />
          <Reveal delay={0.15}>
            <p className="lead mt-8 max-w-md text-cream/70">{diagnostic.support}</p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <Diagnostic />
        </Reveal>
      </div>
    </section>
  );
}
