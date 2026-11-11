import { SymbolDraw } from "@/components/brand/SymbolDraw";
import { SymbolMark } from "@/components/brand/SymbolMark";
import { PurposeTrio } from "@/components/interactive/PurposeTrio";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, fill, fillHints } from "@/content/site";

export function FounderCaption({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const filled = fill.founders.every((f) => f.name && f.role);
  return (
    <figcaption className={`flex flex-wrap gap-x-8 gap-y-2 text-sm ${tone === "light" ? "text-cream/70" : "text-green-900/60"}`}>
      {filled
        ? fill.founders.map((f) => (
            <span key={f.name}>
              <span className="font-display text-base font-semibold text-current">{f.name}</span>
              <span className="mx-2 opacity-50">·</span>
              {f.role}
            </span>
          ))
        : <Pending hint={fillHints.founders} />}
    </figcaption>
  );
}

/** Sobre: manifesto, fundadoras, propósito/missão/promessa, valores e o símbolo. */
export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="bg-linen relative">
      <div className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} id="sobre-title" className="lg:col-span-8" titleClassName="max-w-[18ch]" />
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="lead text-green-900/75">{about.support}</p>
          </Reveal>
        </div>

        <Reveal className="mt-10 md:mt-14">
          <figure className="space-y-4">
            <Photo
              src={about.photo.src}
              alt={about.photo.alt}
              width={about.photo.width}
              height={about.photo.height}
              sizes="(min-width: 1320px) 1208px, 92vw"
              shape="rounded"
              objectPosition="46% 28%"
              className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]"
            />
            <FounderCaption />
          </figure>
        </Reveal>

        {/* Manifesto */}
        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-1">
            <SymbolMark className="size-12 opacity-80" strokeWidth={10} />
          </div>
          <div className="space-y-8 lg:col-span-10">
            {about.manifesto.map((p, i) => (
              <RevealText
                key={i}
                as="p"
                text={p}
                className={`font-display leading-[1.22] tracking-[-0.012em] ${i === 0 ? "text-[clamp(1.75rem,3.4vw,3.1rem)]" : "text-[clamp(1.35rem,2.3vw,2.1rem)] text-green-900/80"}`}
              />
            ))}
          </div>
        </div>

        {/* Propósito, missão e promessa */}
        <Reveal className="mt-16 md:mt-24">
          <PurposeTrio items={about.pillars} />
        </Reveal>
      </div>

      {/* O que não prometemos */}
      <div className="border-y border-green-900/10 bg-cream-soft/60">
        <Reveal className="container-x py-14 md:py-20">
          <p className="font-display mx-auto max-w-4xl text-center text-[clamp(1.3rem,2.4vw,2.1rem)] leading-[1.35] text-green-900/80 italic">
            {about.notPromised}
          </p>
        </Reveal>
      </div>

      {/* Valores */}
      <div className="container-x pt-14 pb-[calc(var(--radius-arc)+48px)] md:pt-20">
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {about.values.map((v) => (
            <RevealItem key={v.title}>
              <article className="gold-card group relative h-full overflow-hidden rounded-[var(--radius-card)] p-8 text-green-900 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-700 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] md:p-10">
                <span aria-hidden="true" className="shine" />
                <SymbolMark className="absolute -right-14 -bottom-14 size-48 opacity-20 transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:rotate-45" stroke="var(--color-green-900)" strokeWidth={5} />
                <span className="flex size-12 items-center justify-center rounded-full bg-green-900 text-gold transition-transform duration-700 group-hover:scale-110">
                  <Icon name={v.icon} className="size-[22px]" />
                </span>
                <h3 className="h-card mt-10">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-green-900/80">{v.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* O símbolo */}
      <div className="bg-deep grain arc-top overflow-hidden" style={{ marginTop: 0 }}>
        <div className="container-x section-y grid items-center gap-14 lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-[460px] lg:col-span-5 lg:max-w-none">
            <SymbolDraw className="h-auto w-full" title="Símbolo Innovare" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow={about.symbol.eyebrow} title={about.symbol.title} id="simbolo-title" tone="light" titleClassName="text-cream" />
            <div className="mt-8 space-y-5">
              {about.symbol.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 * i}>
                  <p className="lead text-cream/75">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.25}>
              <a href={about.symbol.link.href} className="link-underline mt-10 inline-block pb-1 text-gold">
                {about.symbol.link.label}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
