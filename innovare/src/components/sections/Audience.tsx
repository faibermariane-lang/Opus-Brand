import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { audience } from "@/content/site";

/** Para quem: cinco perfis em cartões dourados compactos, com brilho e ícone que gira no hover. */
export function Audience() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-title" className="bg-linen arc-top">
      <div className="container-x pt-[clamp(48px,5.5vw,84px)] pb-[calc(var(--radius-arc)+40px)]">
        <SectionHeading eyebrow={audience.eyebrow} title={audience.title} id="para-quem-title" titleClassName="lg:whitespace-nowrap" />
        <RevealGroup as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {audience.profiles.map((p, i) => (
            <RevealItem as="li" key={p.strong} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <article className="gold-card group relative flex h-full flex-col gap-6 overflow-hidden rounded-[24px] p-6 text-green-900 transition-[transform,box-shadow] duration-700 ease-[var(--ease-out)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]">
                <span aria-hidden="true" className="shine" />
                <span className="flex size-11 items-center justify-center rounded-full bg-green-900 text-gold transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:rotate-[360deg]">
                  <Icon name={p.icon} className="size-5" />
                </span>
                <p className="text-[0.95rem] leading-relaxed text-green-900/75">
                  <strong className="font-display mb-1 block text-[1.2rem] leading-tight font-normal text-green-900">{p.strong}</strong>
                  {p.text}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
