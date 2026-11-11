import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { audience } from "@/content/site";

export function Audience() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-title" className="bg-linen arc-top">
      <div className="container-x section-y">
        <SectionHeading eyebrow={audience.eyebrow} title={audience.title} id="para-quem-title" titleClassName="max-w-[15ch]" />
        <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 md:mt-20">
          {audience.profiles.map((p, i) => (
            <RevealItem as="li" key={p.strong} className={`${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}>
              <article className="group flex h-full flex-col justify-between gap-10 rounded-[var(--radius-card)] border border-green-900/10 bg-cream-soft p-7 transition-[transform,border-color,box-shadow] duration-700 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-gold/70 hover:shadow-[var(--shadow-soft)] md:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-full border border-gold/50 text-olive transition-colors duration-700 group-hover:bg-gold group-hover:text-green-900">
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <span className="font-sans text-xs tracking-[0.2em] text-olive/70 tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[1.02rem] leading-relaxed text-green-900/70">
                  <strong className="font-display block text-[1.4rem] leading-tight font-normal text-green-900">{p.strong}</strong>
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
