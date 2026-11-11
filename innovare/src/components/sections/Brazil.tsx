import { BrazilMap } from "@/components/interactive/BrazilMap";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brazil } from "@/content/site";

export function Brazil() {
  return (
    <section id="brasil" aria-labelledby="brasil-title" className="bg-linen arc-top">
      <div className="container-x section-y grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={brazil.eyebrow} title={brazil.title} id="brasil-title" titleClassName="max-w-[14ch]" />
          <Reveal delay={0.15}>
            <p className="lead mt-8 text-green-900/75">{brazil.text}</p>
          </Reveal>
          <RevealGroup as="ul" className="mt-12 space-y-0 border-t border-green-900/12">
            {brazil.highlights.map((h) => (
              <RevealItem as="li" key={h.title} className="flex items-start gap-5 border-b border-green-900/12 py-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/60 text-olive">
                  <Icon name={h.icon} className="size-5" />
                </span>
                <p className="pt-2 leading-relaxed text-green-900/75">
                  <strong className="font-display mr-1.5 text-[1.2rem] font-normal text-green-900">{h.title}</strong>
                  {h.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <BrazilMap />
        </Reveal>
      </div>
    </section>
  );
}
