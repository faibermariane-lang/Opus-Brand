import { Accordion } from "@/components/ui/Accordion";
import { Filled } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/site";

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-title" className="bg-cream-soft">
      <div className="container-x section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading title={faq.title} id="perguntas-title" titleClassName="max-w-[10ch]" />
        </div>
        <Reveal className="lg:col-span-8">
          <Accordion items={faq.items.map((it) => ({ q: it.q, a: <Filled text={it.a} /> }))} />
        </Reveal>
      </div>
    </section>
  );
}
