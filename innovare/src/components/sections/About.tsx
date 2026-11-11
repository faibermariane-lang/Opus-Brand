import { SymbolDraw } from "@/components/brand/SymbolDraw";
import { SymbolMark } from "@/components/brand/SymbolMark";
import { GoldLine } from "@/components/ui/GoldLine";
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

        <Reveal className="mt-16 md:mt-24">
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
        <div className="mt-24 grid gap-12 md:mt-36 lg:grid-cols-12">
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
        <RevealGroup className="mt-24 grid md:mt-32 md:grid-cols-3">
          {about.pillars.map((b, i) => (
            <RevealItem key={b.title} className={`relative py-8 md:px-10 md:py-4 ${i === 0 ? "md:pl-0" : ""}`}>
              {i > 0 ? (
                <>
                  <GoldLine className="absolute top-0 left-0 w-full md:hidden" />
                  <GoldLine vertical className="absolute top-0 left-0 hidden h-full md:block" delay={i * 0.15} />
                </>
              ) : null}
              <p className="font-display text-2xl italic text-olive">{b.title}</p>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-green-900/80">{b.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
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
      <div className="container-x section-y !pt-20 md:!pt-28">
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {about.values.map((v) => (
            <RevealItem key={v.title}>
              <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-gold/30 bg-cream-soft p-8 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-700 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-lift)] md:p-10">
                <SymbolMark className="absolute -right-16 -bottom-16 size-48 opacity-0 transition-opacity duration-1000 group-hover:opacity-[0.12]" strokeWidth={5} />
                <span className="flex size-12 items-center justify-center rounded-full border border-gold/50 text-olive transition-colors duration-700 group-hover:bg-gold group-hover:text-green-900">
                  <Icon name={v.icon} className="size-[22px]" />
                </span>
                <h3 className="h-card mt-10">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-green-900/75">{v.text}</p>
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
